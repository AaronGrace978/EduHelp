#!/usr/bin/env bash
# Aaron Grace, M.Ed. — Steam Deck Konsole installer / launcher
#
# PUBLIC REPO — paste in Konsole from home (~):
#   curl -fsSL -o ~/steam-deck-konsole.sh \
#     https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/steam-deck-konsole.sh
#   chmod +x ~/steam-deck-konsole.sh
#   bash ~/steam-deck-konsole.sh
#
# Or from a clone:
#   bash scripts/steam-deck-konsole.sh
#
# Optional:
#   APPIMAGE=/path/to/file.AppImage bash ~/steam-deck-konsole.sh
#   bash ~/steam-deck-konsole.sh --launch-only
#   bash ~/steam-deck-konsole.sh --no-launch

set -euo pipefail

APP_NAME="Aaron Grace, M.Ed."
APP_SLUG="AaronGrace-MEd"
VERSION="${VERSION:-1.0.0}"
REPO="${REPO:-AaronGrace978/EduHelp}"
TAG="${TAG:-v${VERSION}}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/Applications/${APP_SLUG}}"
DESKTOP_DIR="${XDG_DESKTOP_DIR:-$HOME/Desktop}"
APPIMAGE_NAME="${APP_SLUG}-${VERSION}-amd64.AppImage"
INSTALLED_APPIMAGE="${INSTALL_DIR}/${APPIMAGE_NAME}"
# Direct public release URL (no token)
PUBLIC_APPIMAGE_URL="${PUBLIC_APPIMAGE_URL:-https://github.com/${REPO}/releases/download/${TAG}/Aaron.Grace.M.Ed._${VERSION}_amd64.AppImage}"
LAUNCH_AFTER=1
LAUNCH_ONLY=0

for arg in "$@"; do
  case "$arg" in
    --launch-only) LAUNCH_ONLY=1 ;;
    --no-launch) LAUNCH_AFTER=0 ;;
    --help|-h)
      cat <<EOF
${APP_NAME} — Steam Deck Konsole helper

Usage:
  bash $0                 Download AppImage + install + launch
  bash $0 --launch-only   Launch existing install only
  bash $0 --no-launch     Install only, do not launch

Env:
  APPIMAGE=/path/to.AppImage   Use a local file instead of downloading
  VERSION=1.0.0
  TAG=v1.0.0
EOF
      exit 0
      ;;
  esac
done

say() { printf '\n\033[1;36m==>\033[0m %s\n' "$*"; }
ok() { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing command: $1"
}

detect_deck() {
  if [[ -f /etc/os-release ]] && grep -qi 'steam\|holo' /etc/os-release; then
    ok "SteamOS / Deck-like environment detected"
  else
    warn "Not clearly SteamOS — continuing anyway"
  fi
}

ensure_fuse() {
  if [[ -e /dev/fuse ]]; then
    ok "FUSE available for AppImage"
    return
  fi
  warn "No /dev/fuse — AppImage may still work on Deck Desktop"
}

download_appimage() {
  local dest="$1"
  need_cmd curl
  say "Downloading AppImage (public release ${TAG})"
  echo "    ${PUBLIC_APPIMAGE_URL}"
  if curl -fL --retry 3 --retry-delay 2 -o "$dest" "$PUBLIC_APPIMAGE_URL"; then
    ok "Downloaded to ${dest}"
    return
  fi

  # Fallback: query release API for any amd64 AppImage (public, no token)
  say "Direct URL failed — looking up AppImage on release API"
  need_cmd python3
  local api="https://api.github.com/repos/${REPO}/releases/tags/${TAG}"
  local json url
  json="$(curl -fsSL -H "Accept: application/vnd.github+json" "$api")" \
    || die "Could not fetch ${TAG}. Open https://github.com/${REPO}/releases/tag/${TAG} in Firefox and download the AppImage."

  url="$(python3 - "$json" <<'PY'
import json, sys
data = json.loads(sys.argv[1])
ranked = []
for a in data.get("assets") or []:
    name = (a.get("name") or "")
    lower = name.lower()
    if not lower.endswith(".appimage"):
        continue
    score = 0
    if "amd64" in lower or "x86_64" in lower:
        score += 2
    if "aaron.grace" in lower or "aarongrace" in lower:
        score += 1
    ranked.append((score, a.get("browser_download_url") or ""))
ranked.sort(key=lambda t: t[0], reverse=True)
if not ranked or not ranked[0][1]:
    raise SystemExit(1)
print(ranked[0][1])
PY
)" || die "No AppImage on ${TAG}."

  say "Downloading ${url}"
  curl -fL --retry 3 -o "$dest" "$url" || die "Download failed"
  ok "Downloaded to ${dest}"
}

install_desktop_entry() {
  local desktop_file="${DESKTOP_DIR}/${APP_SLUG}.desktop"
  local apps_file="${HOME}/.local/share/applications/${APP_SLUG}.desktop"
  mkdir -p "$DESKTOP_DIR" "${HOME}/.local/share/applications"

  local helper="${INSTALL_DIR}/launch.sh"
  cat >"$helper" <<EOF
#!/usr/bin/env bash
exec "${INSTALLED_APPIMAGE}" "\$@"
EOF
  chmod +x "$helper"

  cat >"$apps_file" <<EOF
[Desktop Entry]
Type=Application
Version=1.0
Name=${APP_NAME}
Comment=Ultimate college toolkit — Banner, PowerFAIDS, disability support, books, RMP
Exec=${helper}
Icon=applications-education
Terminal=false
Categories=Education;Office;
StartupNotify=true
EOF
  cp "$apps_file" "$desktop_file"
  chmod +x "$desktop_file" "$apps_file" || true
  ok "Desktop launcher: ${desktop_file}"
}

launch_app() {
  [[ -x "$INSTALLED_APPIMAGE" ]] || die "Not installed yet: ${INSTALLED_APPIMAGE}"
  say "Launching ${APP_NAME}"
  nohup "$INSTALLED_APPIMAGE" >/tmp/${APP_SLUG}.log 2>&1 &
  ok "Started (log: /tmp/${APP_SLUG}.log)"
  ok "Tip: Add Non-Steam Game → ${INSTALLED_APPIMAGE}"
}

install_app() {
  mkdir -p "$INSTALL_DIR"
  detect_deck
  ensure_fuse

  if [[ -n "${APPIMAGE:-}" ]]; then
    [[ -f "$APPIMAGE" ]] || die "APPIMAGE not found: $APPIMAGE"
    say "Installing local AppImage"
    cp -f "$APPIMAGE" "$INSTALLED_APPIMAGE"
  elif [[ -f "$INSTALLED_APPIMAGE" ]]; then
    ok "Existing install found — refreshing desktop entry"
  else
    download_appimage "$INSTALLED_APPIMAGE"
  fi

  chmod +x "$INSTALLED_APPIMAGE"
  install_desktop_entry
  ok "Installed to ${INSTALLED_APPIMAGE}"
}

main() {
  say "${APP_NAME} — Steam Deck Konsole"
  if [[ "$LAUNCH_ONLY" -eq 1 ]]; then
    launch_app
    exit 0
  fi
  install_app
  if [[ "$LAUNCH_AFTER" -eq 1 ]]; then
    launch_app
  else
    ok "Install complete. Launch later with: bash $0 --launch-only"
  fi
}

main
