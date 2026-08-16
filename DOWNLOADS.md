# Aaron Grace, M.Ed. — Downloads (v1.0.0)

**Release:** https://github.com/AaronGrace978/EduHelp/releases/tag/v1.0.0

> Repo is **private** — sign into GitHub (or use `GH_TOKEN`) to download.

---

## Downloads by platform

| Platform | File | Link |
| -------- | ---- | ---- |
| **macOS Apple Silicon** | `Aaron.Grace.M.Ed._1.0.0_aarch64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_aarch64.dmg) |
| **macOS Intel** | `Aaron.Grace.M.Ed._1.0.0_x64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64.dmg) |
| **Windows installer** | `Aaron.Grace.M.Ed._1.0.0_x64_en-US.msi` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64_en-US.msi) |
| **Windows setup** | `Aaron.Grace.M.Ed._1.0.0_x64-setup.exe` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64-setup.exe) |
| **Linux AppImage** (Deck / portable) | `Aaron.Grace.M.Ed._1.0.0_amd64.AppImage` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_amd64.AppImage) |
| **Linux .deb** | `Aaron.Grace.M.Ed._1.0.0_amd64.deb` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_amd64.deb) |
| **Linux .rpm** | `Aaron.Grace.M.Ed.-1.0.0-1.x86_64.rpm` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed.-1.0.0-1.x86_64.rpm) |
| **Steam Deck script** | `steam-deck-konsole.sh` | on the [release page](https://github.com/AaronGrace978/EduHelp/releases/tag/v1.0.0) |

---

## Steam Deck — paste this in Konsole (from `~`)

You do **not** need a git clone.  
`bash scripts/steam-deck-konsole.sh` only works inside a cloned repo folder — from `~` that path does not exist.

### One paste (recommended)

1. Create a GitHub token with **repo** scope: https://github.com/settings/tokens  
2. In Desktop Mode → **Konsole**, paste (replace the token):

```bash
export GH_TOKEN=ghp_PASTE_YOUR_TOKEN_HERE

# Download the Deck installer into your home folder
ASSET_API=$(curl -fsSL \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/AaronGrace978/EduHelp/releases/tags/v1.0.0 \
  | python3 -c 'import sys,json; a=json.load(sys.stdin)["assets"]; print(next(x["url"] for x in a if x["name"]=="steam-deck-konsole.sh"))')

curl -fL -H "Authorization: Bearer $GH_TOKEN" -H "Accept: application/octet-stream" \
  -o ~/steam-deck-konsole.sh "$ASSET_API"

chmod +x ~/steam-deck-konsole.sh
GH_TOKEN="$GH_TOKEN" bash ~/steam-deck-konsole.sh
```

That saves `~/steam-deck-konsole.sh`, downloads the AppImage, creates a Desktop launcher, and starts the app.

### Already have the AppImage in Downloads

```bash
export GH_TOKEN=ghp_PASTE_YOUR_TOKEN_HERE
# (run the same ASSET_API + curl block above first, once)
APPIMAGE=~/Downloads/Aaron.Grace.M.Ed._1.0.0_amd64.AppImage bash ~/steam-deck-konsole.sh
```

### Later launches

```bash
bash ~/steam-deck-konsole.sh --launch-only
```

Installs to: `~/Applications/AaronGrace-MEd/`

---

## Install notes (desktop)

### macOS
Open the `.dmg` → drag into Applications → right-click → Open the first time if Gatekeeper prompts.

### Windows
Run the `.msi` or `_x64-setup.exe`.

### Linux
```bash
chmod +x Aaron.Grace.M.Ed._1.0.0_amd64.AppImage
./Aaron.Grace.M.Ed._1.0.0_amd64.AppImage
```
