#!/usr/bin/env python3
"""Zip a source folder (default: dist/), copy it to a remote machine over SSH, and extract it there."""

import argparse
import shlex
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

DEFAULT_SOURCE = Path(__file__).resolve().parent.parent / "dist"


def make_zip(source: Path, archive: Path) -> None:
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(source.rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(source))


def run(cmd: list[str]) -> None:
    print("+", " ".join(shlex.quote(part) for part in cmd))
    subprocess.run(cmd, check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", help="SSH target, e.g. user@example.com")
    parser.add_argument("remote_dir", help="Remote document root, e.g. public_html")
    parser.add_argument(
        "-s", "--source", type=Path, default=DEFAULT_SOURCE, help="Local folder to deploy (default: dist/)"
    )
    parser.add_argument("-p", "--port", default="22", help="SSH port (default: 22)")
    args = parser.parse_args()

    source = args.source.resolve()
    if not source.is_dir():
        print(f"Source folder not found: {source}", file=sys.stderr)
        return 1
    if not (source / "index.html").is_file():
        print(f"{source}/index.html not found. Run `npm run build` first.", file=sys.stderr)
        return 1

    remote_dir = shlex.quote(args.remote_dir)
    if args.remote_dir.strip().rstrip("/") in ("", ".", "..", "~"):
        print(f"Refusing to use unsafe remote dir: {args.remote_dir!r}", file=sys.stderr)
        return 1

    names = sorted(p.name for p in source.iterdir())
    base = args.remote_dir.rstrip("/")
    probe = "; ".join(f"[ -e {shlex.quote(f'{base}/{n}')} ] && echo {shlex.quote(n)}" for n in names)
    result = subprocess.run(
        ["ssh", "-p", args.port, args.target, f"{probe}; true"], capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Could not check remote directory (ssh failed):\n{result.stderr}", file=sys.stderr)
        return 1
    existing = [n for n in result.stdout.splitlines() if n in names]
    if existing:
        print(f"These items already exist in {args.target}:{args.remote_dir}:")
        for n in existing:
            print(f"  {n}")
        answer = input("Remove them before deploying? [y/N] ")
        if answer.strip().lower() not in ("y", "yes"):
            print("Aborted.")
            return 1

    remote_zip = "mcc-site.zip"
    with tempfile.TemporaryDirectory() as tmp:
        archive = Path(tmp) / remote_zip
        make_zip(source, archive)
        run(["scp", "-P", args.port, str(archive), f"{args.target}:{remote_zip}"])

    remote_cmd = (
        f"mkdir -p {remote_dir} && "
        + "".join(f"rm -rf {shlex.quote(f'{base}/{n}')} && " for n in existing)
        + f"unzip -o {remote_zip} -d {remote_dir} && "
        f"rm {remote_zip}"
    )
    run(["ssh", "-p", args.port, args.target, remote_cmd])
    print(f"Deployed {source} to {args.target}:{args.remote_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
