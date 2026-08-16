#!/usr/bin/env bash
# Aaron Grace, M.Ed. — one-shot Steam Deck bootstrap (run from ~)
#
# Paste in Konsole (Desktop Mode):
#
#   export GH_TOKEN=ghp_your_token_here
#   curl -fsSL -H "Authorization: Bearer $GH_TOKEN" \
#     -H "Accept: application/octet-stream" \
#     -o ~/steam-deck-konsole.sh \
#     "https://api.github.com/repos/AaronGrace978/EduHelp/releases/assets/ASSET_ID"
#
# Prefer the commands in DOWNLOADS.md — this file documents the flow.

set -euo pipefail

REPO="${REPO:-AaronGrace978/EduHelp}"
TAG="${TAG:-v1.0.0}"
SCRIPT_OUT="${SCRIPT_OUT:-$HOME/steam-deck-konsole.sh}"

die() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }
say() { printf '\n\033[1;36m==>\033[0m %s\n' "$*"; }

[[ -n "${GH_TOKEN:-}" ]] || die "Set GH_TOKEN first (private repo), e.g. export GH_TOKEN=ghp_..."

need() { command -v "$1" >/dev/null 2>&1 || die "Missing: $1"; }
need curl
need python3

say "Finding steam-deck-konsole.sh on ${REPO} ${TAG}"
API="https://api.github.com/repos/${REPO}/releases/tags/${TAG}"
JSON="$(curl -fsSL \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "$API")" || die "Could not read release ${TAG}"

ASSET_API="$(python3 - "$JSON" <<'PY'
import json, sys
data = json.loads(sys.argv[1])
for a in data.get("assets") or []:
    if (a.get("name") or "") == "steam-deck-konsole.sh":
        print(a["url"])
        raise SystemExit
raise SystemExit("steam-deck-konsole.sh not found on release — upload it or clone the repo")
PY
)"

say "Downloading installer to ${SCRIPT_OUT}"
curl -fL \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/octet-stream" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "$ASSET_API" -o "$SCRIPT_OUT"
chmod +x "$SCRIPT_OUT"

say "Running installer"
exec bash "$SCRIPT_OUT" "$@"
