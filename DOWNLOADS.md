# Aaron Grace, M.Ed. — Downloads (v1.1.0)

**Release:** https://github.com/AaronGrace978/EduHelp/releases/tag/v1.1.0

> Repo is **private** — sign into GitHub (or use `GH_TOKEN`) to download.

---

## Downloads by platform

| Platform | File | Link |
| -------- | ---- | ---- |
| **macOS Apple Silicon** | `Aaron.Grace.M.Ed._1.1.0_aarch64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_aarch64.dmg) |
| **macOS Intel** | `Aaron.Grace.M.Ed._1.1.0_x64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_x64.dmg) |
| **Windows installer** | `Aaron.Grace.M.Ed._1.1.0_x64_en-US.msi` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_x64_en-US.msi) |
| **Windows setup** | `Aaron.Grace.M.Ed._1.1.0_x64-setup.exe` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_x64-setup.exe) |
| **Linux AppImage** (Deck / portable) | `Aaron.Grace.M.Ed._1.1.0_amd64.AppImage` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_amd64.AppImage) |
| **Linux .deb** | `Aaron.Grace.M.Ed._1.1.0_amd64.deb` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed._1.1.0_amd64.deb) |
| **Linux .rpm** | `Aaron.Grace.M.Ed.-1.1.0-1.x86_64.rpm` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/v1.1.0/Aaron.Grace.M.Ed.-1.1.0-1.x86_64.rpm) |

Optional macOS app archives: `_aarch64.app.tar.gz` / `_x64.app.tar.gz` on the same release page.

---

## What's new in 1.1.0

- Org hierarchy (President → Deans → Directors)
- Admin workload queues
- System harness (Banner, PowerFAIDS, Oracle, SQL, and more)
- Professor mirror with AI + TA coverage

---

## Install notes

### macOS
Open the `.dmg` → drag **Aaron Grace M.Ed.** into Applications → launch (right-click → Open the first time if Gatekeeper prompts).

### Windows
Run the `.msi` or `_x64-setup.exe`. Allow SmartScreen / UAC if prompted.

### Linux
```bash
chmod +x Aaron.Grace.M.Ed._1.1.0_amd64.AppImage
./Aaron.Grace.M.Ed._1.1.0_amd64.AppImage
```
Or: `sudo dpkg -i Aaron.Grace.M.Ed._1.1.0_amd64.deb`

---

## Steam Deck — Konsole script

Desktop Mode → open **Konsole**:

```bash
# from a clone of this repo
bash scripts/steam-deck-konsole.sh
```

**Private download with token**

```bash
GH_TOKEN=YOUR_GITHUB_TOKEN bash scripts/steam-deck-konsole.sh
```

**Already downloaded the AppImage**

```bash
APPIMAGE=~/Downloads/Aaron.Grace.M.Ed._1.1.0_amd64.AppImage bash scripts/steam-deck-konsole.sh
```

What the script does:
- installs into `~/Applications/AaronGrace-MEd/`
- creates a Desktop + app-menu launcher
- launches the app (use `--launch-only` later, `--no-launch` to skip)

**Add to Game Mode:** Steam → Games → Add a Non-Steam Game → browse to the AppImage under `~/Applications/AaronGrace-MEd/`.

---

## Rebuild / republish

Workflow: [`.github/workflows/release.yml`](.github/workflows/release.yml)
