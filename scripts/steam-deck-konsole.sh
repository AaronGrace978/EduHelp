#!/usr/bin/env bash
# Aaron Grace, M.Ed. — Steam Deck Konsole installer / launcher
#
# FROM HOME ON STEAM DECK (no git clone):
#   export GH_TOKEN=ghp_xxx
#   ASSET_API=$(curl -fsSL -H "Authorization: Bearer $GH_TOKEN" -H "Accept: application/vnd.github+json" \
#     https://api.github.com/repos/AaronGrace978/EduHelp/releases/tags/v1.0.0 \
#     | python3 -c 'import sys,json; a=json.load(sys.stdin)["assets"]; print(next(x["url"] for x in a if x["name"]=="steam-deck-konsole.sh"))')
#   curl -fL -H "Authorization: Bearer $GH_TOKEN" -H "Accept: application/octet-stream" \
#     -o ~/steam-deck-konsole.sh "$ASSET_API"
#   chmod +x ~/steam-deck-konsole.sh && GH_TOKEN=$GH_TOKEN bash ~/steam-deck-konsole.sh
#
# FROM A REPO CLONE:
#   bash scripts/steam-deck-konsole.sh
#
# Optional:
#   APPIMAGE=/path/to/file.AppImage bash steam-deck-konsole.sh
#   bash steam-deck-konsole.sh --launch-only
#   bash steam-deck-konsole.sh --no-launch

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
  bash $0                 Install (download or copy) + launch
  bash $0 --launch-only   Launch existing install only
  bash $0 --no-launch     Install only, do not launch

Env:
  APPIMAGE=/path/to.AppImage   Use a local AppImage instead of GitHub
  GH_TOKEN=...                 Token for private release downloads
  VERSION=1.0.0                Release version
  TAG=v1.0.0                   Release tag override
  REPO=AaronGrace978/EduHelp   GitHub repo
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
    warn "Not clearly SteamOS — continuing anyway (works on most Linux desktops)"
  fi
}

ensure_fuse() {
  if [[ -e /dev/fuse ]]; then
    ok "FUSE available for AppImage"
    return
  fi
  warn "No /dev/fuse — AppImage may need: flatpak / extract mode"
  warn "On Deck Desktop, AppImages usually still work."
}

download_from_github() {
  local dest="$1"
  local api="https://api.github.com/repos/${REPO}/releases/tags/${TAG}"
  local auth=()
  if [[ -n "${GH_TOKEN:-}" ]]; then
    auth=(-H "Authorization: Bearer ${GH_TOKEN}" -H "X-GitHub-Api-Version: 2022-11-28")
  fi

  say "Looking up release ${TAG} on ${REPO}"
  need_cmd curl
  need_cmd python3

  local json
  if ! json="$(curl -fsSL "${auth[@]}" -H "Accept: application/vnd.github+json" "$api")"; then
    die "Could not fetch release ${TAG}. For a private repo set GH_TOKEN, or pass APPIMAGE=/path/to.AppImage"
  fi

  local url
  url="$(python3 - "$json" <<'PY'
import json, sys
data = json.loads(sys.argv[1])
assets = data.get("assets") or []
prefer = ("appimage", "amd64", "x86_64", "linux")
picked = None
# Prefer CI-named AppImage, then any AppImage
ranked = []
for a in assets:
    name = (a.get("name") or "")
    lower = name.lower()
    if not lower.endswith(".appimage"):
        continue
    score = 0
    if "amd64" in lower or "x86_64" in lower:
        score += 2
    if "aaron.grace" in lower or "aarongrace" in lower:
        score += 1
    ranked.append((score, a))
ranked.sort(key=lambda t: t[0], reverse=True)
if not ranked:
    raise SystemExit("no AppImage asset on release")
picked = ranked[0][1]
print(picked["url"])
print(picked.get("name") or "AaronGrace-MEd.AppImage")
PY
)" || die "No AppImage asset found on ${TAG}. Publish the Linux build first."

  local asset_api asset_name
  asset_api="$(printf '%s\n' "$url" | sed -n '1p')"
  asset_name="$(printf '%s\n' "$url" | sed -n '2p')"

  say "Downloading ${asset_name}"
  curl -fL "${auth[@]}" -H "Accept: application/octet-stream" "$asset_api" -o "$dest"
  ok "Downloaded to ${dest}"
}

install_desktop_entry() {
  local desktop_file="${DESKTOP_DIR}/${APP_SLUG}.desktop"
  local apps_file="${HOME}/.local/share/applications/${APP_SLUG}.desktop"
  mkdir -p "$DESKTOP_DIR" "${HOME}/.local/share/applications"

  local exec_line="${INSTALLED_APPIMAGE}"
  # Prefer launching via this script so env stays consistent
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
  ok "App menu entry: ${apps_file}"
}

launch_app() {
  [[ -x "$INSTALLED_APPIMAGE" ]] || die "Not installed yet: ${INSTALLED_APPIMAGE}"
  say "Launching ${APP_NAME}"
  # Detach from Konsole so closing the terminal doesn't kill the app
  nohup "$INSTALLED_APPIMAGE" >/tmp/${APP_SLUG}.log 2>&1 &
  ok "Started (log: /tmp/${APP_SLUG}.log)"
  ok "Tip: in Desktop Mode, pin the desktop icon — or Add Non-Steam Game → pick the AppImage"
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
    download_from_github "$INSTALLED_APPIMAGE"
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
