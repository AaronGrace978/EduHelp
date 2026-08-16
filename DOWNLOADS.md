# Aaron Grace, M.Ed. — Downloads (v1.0.0)

**Draft release (publish when ready):**  
https://github.com/AaronGrace978/EduHelp/releases/tag/untagged-1a64b0aff3e19ebc4b33

> Repo is **private** — sign into GitHub (or use `GH_TOKEN`) to download.  
> After you click **Publish release**, links become `/releases/download/v1.0.0/…`.

---

## Downloads by platform

| Platform | File | Link |
| -------- | ---- | ---- |
| **macOS Apple Silicon** | `Aaron.Grace.M.Ed._1.0.0_aarch64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_aarch64.dmg) |
| **macOS Intel** | `Aaron.Grace.M.Ed._1.0.0_x64.dmg` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_x64.dmg) |
| **Windows installer** | `Aaron.Grace.M.Ed._1.0.0_x64_en-US.msi` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_x64_en-US.msi) |
| **Windows setup** | `Aaron.Grace.M.Ed._1.0.0_x64-setup.exe` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_x64-setup.exe) |
| **Linux AppImage** (Deck / portable) | `Aaron.Grace.M.Ed._1.0.0_amd64.AppImage` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_amd64.AppImage) |
| **Linux .deb** | `Aaron.Grace.M.Ed._1.0.0_amd64.deb` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed._1.0.0_amd64.deb) |
| **Linux .rpm** | `Aaron.Grace.M.Ed.-1.0.0-1.x86_64.rpm` | [Download](https://github.com/AaronGrace978/EduHelp/releases/download/untagged-1a64b0aff3e19ebc4b33/Aaron.Grace.M.Ed.-1.0.0-1.x86_64.rpm) |

Optional macOS app archives: `_aarch64.app.tar.gz` / `_x64.app.tar.gz` on the same release page.

---

## Install notes

### macOS
Open the `.dmg` → drag **Aaron Grace M.Ed.** into Applications → launch (right-click → Open the first time if Gatekeeper prompts).

### Windows
Run the `.msi` or `_x64-setup.exe`. Allow SmartScreen / UAC if prompted.

### Linux
```bash
chmod +x Aaron.Grace.M.Ed._1.0.0_amd64.AppImage
./Aaron.Grace.M.Ed._1.0.0_amd64.AppImage
```
Or: `sudo dpkg -i Aaron.Grace.M.Ed._1.0.0_amd64.deb`

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
APPIMAGE=~/Downloads/Aaron.Grace.M.Ed._1.0.0_amd64.AppImage bash scripts/steam-deck-konsole.sh
```

What the script does:
- installs into `~/Applications/AaronGrace-MEd/`
- creates a Desktop + app-menu launcher
- launches the app (use `--launch-only` later, `--no-launch` to skip)

**Add to Game Mode:** Steam → Games → Add a Non-Steam Game → browse to the AppImage under `~/Applications/AaronGrace-MEd/`.

---

## Rebuild / republish

Workflow: [`.github/workflows/release.yml`](.github/workflows/release.yml)  
Latest successful multi-platform run: https://github.com/AaronGrace978/EduHelp/actions/runs/31961738923
