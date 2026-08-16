# Aaron Grace, M.Ed. — Downloads (v1.0.0)

Official desktop builds ship as **GitHub Release** assets on tag `v1.0.0`.

**Release page:** https://github.com/AaronGrace978/EduHelp/releases (draft **Aaron Grace, M.Ed. v1.0.0**)

Linux assets already attached to the draft:

- [AaronGrace-MEd-1.0.0-amd64.AppImage](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/AaronGrace-MEd-1.0.0-amd64.AppImage) (preferred for Steam Deck)
- [AaronGrace-MEd-1.0.0-amd64.deb](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/AaronGrace-MEd-1.0.0-amd64.deb)
- [AaronGrace-MEd-1.0.0-1.x86_64.rpm](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/AaronGrace-MEd-1.0.0-1.x86_64.rpm)

> Draft releases may use an `untagged-…` URL until published. Mac / Windows installers attach when the `release` GitHub Action finishes.

---

## What to download

| Platform | Download asset (look for these names on the release) | Notes |
| -------- | ---------------------------------------------------- | ----- |
| **macOS Apple Silicon** (M1/M2/M3/M4) | `Aaron Grace M.Ed._1.0.0_aarch64.dmg` | Open `.dmg`, drag app to Applications |
| **macOS Intel** | `Aaron Grace M.Ed._1.0.0_x64.dmg` | Same install flow |
| **Windows x64** | `Aaron Grace M.Ed._1.0.0_x64_en-US.msi` (or `.exe`) | Run installer; allow SmartScreen if prompted |
| **Linux x64 (.AppImage)** | `Aaron Grace M.Ed._1.0.0_amd64.AppImage` | `chmod +x` then double-click / run |
| **Linux x64 (.deb)** | `Aaron Grace M.Ed._1.0.0_amd64.deb` | Debian/Ubuntu: `sudo dpkg -i …` |
| **Linux x64 (.rpm)** | `Aaron Grace M.Ed.-1.0.0-1.x86_64.rpm` | Fedora/RHEL: `sudo rpm -i …` |
| **Steam Deck** | Linux **AppImage** + Konsole script below | Desktop Mode |

Exact filenames can vary slightly by Tauri bundler version — prefer the asset whose name matches your OS/arch.

---

## Steam Deck (Konsole)

1. Switch to **Desktop Mode**.
2. Open **Konsole**.
3. From a clone of this repo:

```bash
bash scripts/steam-deck-konsole.sh
```

Or copy `scripts/steam-deck-konsole.sh` to the Deck and run it.

**Private release download**

```bash
GH_TOKEN=YOUR_GITHUB_TOKEN bash scripts/steam-deck-konsole.sh
```

**Already have the AppImage**

```bash
APPIMAGE=~/Downloads/AaronGrace-MEd-1.0.0-amd64.AppImage bash scripts/steam-deck-konsole.sh
```

The script installs to `~/Applications/AaronGrace-MEd/`, drops a Desktop launcher, and starts the app.

**Launch later**

```bash
bash scripts/steam-deck-konsole.sh --launch-only
```

**Add to Steam (Game Mode)**  
Steam → Games → Add a Non-Steam Game → Browse → select the AppImage under `~/Applications/AaronGrace-MEd/`.

---

## How the release assets are produced

GitHub Actions workflow: [`.github/workflows/release.yml`](.github/workflows/release.yml)

Triggers:

- Tag push: `v1.0.0`
- Push to `release` branch
- Manual: Actions → **release** → Run workflow

Builds:

- macOS `aarch64-apple-darwin`
- macOS `x86_64-apple-darwin`
- Linux `ubuntu-22.04`
- Windows `windows-latest`
