# Aaron Grace, M.Ed. — Downloads (v1.0.0)

**Release (public):** https://github.com/AaronGrace978/EduHelp/releases/tag/v1.0.0

No token needed — the repo is public.

---

## Downloads by platform

| Platform | Download |
| -------- | -------- |
| **macOS Apple Silicon** | [`.dmg`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_aarch64.dmg) |
| **macOS Intel** | [`.dmg`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64.dmg) |
| **Windows** | [`.msi`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64_en-US.msi) · [setup `.exe`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_x64-setup.exe) |
| **Linux / Steam Deck** | [`.AppImage`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_amd64.AppImage) · [`.deb`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed._1.0.0_amd64.deb) · [`.rpm`](https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/Aaron.Grace.M.Ed.-1.0.0-1.x86_64.rpm) |

---

## Steam Deck — paste in Konsole (from `~`)

No clone. No token. Just paste:

```bash
curl -fsSL -o ~/steam-deck-konsole.sh \
  https://github.com/AaronGrace978/EduHelp/releases/download/v1.0.0/steam-deck-konsole.sh
chmod +x ~/steam-deck-konsole.sh
bash ~/steam-deck-konsole.sh
```

That downloads the installer, pulls the AppImage from the public release, puts a launcher on your Desktop, and starts the app.

**Later:**
```bash
bash ~/steam-deck-konsole.sh --launch-only
```

**Or Firefox:** open the [release page](https://github.com/AaronGrace978/EduHelp/releases/tag/v1.0.0) → download the `.AppImage` → double-click / Properties → Allow executing → run it.

---

## Why `bash scripts/...` failed

`scripts/steam-deck-konsole.sh` only exists **inside a git clone**. From `~` that path is not there — use the `curl` commands above instead.
