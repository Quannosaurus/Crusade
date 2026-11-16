#!/usr/bin/env python3
"""Encrypts the daily love notes for the love theme into src/love.enc.json.

Usage:  python3 tools/encrypt_love.py [path/to/love.txt]
  - love.txt: one note per line (blank lines and lines starting with # are skipped).
    It is listed in .gitignore. Never commit it.
  - The love code is asked for at the prompt (hidden, twice). It is never taken from
    an argument or a file, and it is checked against LOVEH in src/app.js first.
  - Needs: pip install cryptography
Then run python3 tools/build.py, test, commit src/love.enc.json and the build.
Only the number of notes is printed, never their text.
"""
import base64, getpass, hashlib, json, os, re, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(R, 'src', 'app.js')
OUT = os.path.join(R, 'src', 'love.enc.json')


def params():
    s = open(APP, encoding='utf-8').read()
    salt = re.search(r'LOVESALT="([^"]+)"', s).group(1)
    it = int(re.search(r'LOVEIT=(\d+)', s).group(1))
    loveh = int(re.search(r'var LOVEH=(\d+);', s).group(1))
    return salt, it, loveh


def code_hash(x):
    h = 2166136261
    for ch in x:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def derive(code, salt, it):
    return hashlib.pbkdf2_hmac('sha256', code.strip().encode('utf-8'), salt.encode('utf-8'), it, 32)


def encrypt_json(notes, code, salt=None, it=None):
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    if salt is None or it is None:
        salt, it, _ = params()
    iv = os.urandom(12)
    pt = json.dumps(notes, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    ct = AESGCM(derive(code, salt, it)).encrypt(iv, pt, None)
    return json.dumps({'v': 1, 'iv': base64.b64encode(iv).decode(), 'ct': base64.b64encode(ct).decode()})


def read_notes(path):
    with open(path, encoding='utf-8') as f:
        return [l.strip() for l in f if l.strip() and not l.lstrip().startswith('#')]


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(R, 'love.txt')
    if not os.path.exists(src):
        sys.exit('No notes file at %s (one note per line).' % src)
    try:
        import cryptography  # noqa: F401
    except ImportError:
        sys.exit('Missing package: pip install cryptography')
    notes = read_notes(src)
    if not notes:
        sys.exit('The notes file is empty.')
    salt, it, loveh = params()
    code = getpass.getpass('Love code: ')
    if getpass.getpass('Again: ') != code:
        sys.exit('The codes do not match.')
    if code_hash('crusade:' + code.strip()) != loveh:
        sys.exit('That is not the love code of the app (LOVEH does not match). Nothing written.')
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(encrypt_json(notes, code, salt, it) + '\n')
    print('Encrypted %d notes into src/love.enc.json. Now run: python3 tools/build.py' % len(notes))


if __name__ == '__main__':
    main()
