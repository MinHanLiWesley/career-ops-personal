# Setup on a new machine

This personal repo (`MinHanLiWesley/career-ops-personal`) is your private working state. Use these steps when switching computers.

## 1. Clone

```bash
git clone https://github.com/MinHanLiWesley/career-ops-personal.git ~/Desktop/career-ops
cd ~/Desktop/career-ops
```

If you want the upstream santifer template as a fallback (for pulling future system updates), add it as a second remote:

```bash
git remote add upstream https://github.com/santifer/career-ops.git
```

So you end up with `origin` = your private repo (push here), `upstream` = santifer's public template (pull selectively if needed).

## 2. Restore Claude memory

Memory was snapshotted into the repo at `claude-memory/`. Claude Code expects it at `~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory/`.

```bash
mkdir -p ~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory
cp -R claude-memory/. ~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory/
```

Symlink alternative (changes in `~/.claude` reflect in repo, and vice versa):

```bash
rm -rf ~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory
ln -s "$PWD/claude-memory" ~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory
```

The symlink approach makes future memory updates show up in `git status` automatically; the copy approach requires re-syncing manually.

## 3. Install build dependencies

For `./build-resume.sh` to work you need:

- **TinyTeX or full TeX Live** (for `pdflatex`)
  - macOS quick install: `brew install --cask mactex-no-gui` or `curl -sL "https://yihui.org/tinytex/install-bin-unix.sh" | sh`
- **poppler** (for `pdftoppm`, used to render PNG previews)
  - macOS: `brew install poppler`
- **Node.js 18+** (for the `*.mjs` scanner/tracker scripts)

Smoke test:

```bash
./build-resume.sh output/google-teammatch
```

If a PDF lands in `output/google-teammatch/Min-Han_Li_Resume_google-teammatch.pdf` and `previews/page-1.png` regenerates, you're good.

## 4. Day-to-day sync workflow

After making changes on either machine:

```bash
git add <specific files>
git commit -m "..."
git push origin main          # NB: origin = your private repo
```

On the other machine, before starting work:

```bash
git pull origin main
# if memory is symlinked, it's already current
# if memory is copied, re-run step 2
```

## 5. Memory drift between machines

Claude Code writes to `~/.claude` continuously. If you forget to commit memory changes before switching machines, you'll have divergent memory.

Mitigations:
- **Symlink approach (recommended):** memory edits show up as repo changes immediately, so `git status` reminds you.
- **Manual approach:** before quitting on machine A, `cp -R ~/.claude/projects/-Users-liminhan-Desktop-career-ops/memory/. claude-memory/ && git add claude-memory && git commit -m "sync memory" && git push`.

## 6. What is NOT in this repo

- API keys / secrets (none should be — check `config/profile.yml` is still gitignored)
- Per-machine Claude Code settings (`.claude/settings.local.json` is gitignored)
- The actual Claude Code app config (login, model selection, etc.) — those live in `~/.claude` outside `projects/`

## 7. Reminder: origin is your private repo

On both machines, `git remote -v` should show:

```
origin    https://github.com/MinHanLiWesley/career-ops-personal.git (push)
upstream  https://github.com/santifer/career-ops.git (fetch only, optional)
```

Never push to `upstream`. If you ever pull from `upstream` to get system updates, do it on a side branch and merge selectively.
