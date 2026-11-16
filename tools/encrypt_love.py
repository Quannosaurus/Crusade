#!/usr/bin/env python3
"""Encrypts the daily love notes for the love theme into src/love.enc.json.

Usage:  python3 tools/encrypt_love.py [path/to/love.txt]
  - love.txt: one note per line (blank lines and lines starting with # are skipped).
    It is listed in .gitignore. Never commit it.
  - The love code is any text of at least 12 characters (spaces at both ends are
    ignored). It is asked for at the prompt (hidden, twice), never taken from an
    argument or a file, and never checked against or stored as a hash.
  - Every run draws a fresh random salt, so every run also needs the code again
    on each phone (once).
  - Needs: pip install cryptography
Then run python3 tools/build.py, test, commit src/love.enc.json and the build.
Only the number of notes is printed, never their text.

File format (v2): {"v":2,"salt","it","iv","ct","viv","vct"} (base64 fields).
  key = PBKDF2-SHA256(code, salt, it) -> 32 bytes
  ct  = AES-GCM(key, iv, notes as JSON)
  vct = AES-GCM(key, viv, VERIFIER) - the app accepts a code only if this decrypts.
"""
import base64, getpass, hashlib, json, os, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(R, 'src', 'love.enc.json')
VERIFIER = 'crusade-love-verifier-v2'   # must match LOVEVER in src/app.js
ITERATIONS = 600000                    # must match LOVEIT in src/app.js
MIN_LEN = 12                           # must match LOVEMIN in src/app.js


def check_code(code):
    code = code.strip()
    if len(code) < MIN_LEN:
        raise ValueError('The code needs at least %d characters.' % MIN_LEN)
    return code


def derive(code, salt, it=ITERATIONS):
    return hashlib.pbkdf2_hmac('sha256', check_code(code).encode('utf-8'), salt, it, 32)


def encrypt_json(notes, code, it=ITERATIONS):
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    salt = os.urandom(16)
    aes = AESGCM(derive(code, salt, it))
    iv, viv = os.urandom(12), os.urandom(12)
    pt = json.dumps(notes, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    b = lambda x: base64.b64encode(x).decode()
    return json.dumps({'v': 2, 'salt': b(salt), 'it': it,
                       'iv': b(iv), 'ct': b(aes.encrypt(iv, pt, None)),
                       'viv': b(viv), 'vct': b(aes.encrypt(viv, VERIFIER.encode('utf-8'), None))})


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
    code = getpass.getpass('Love code (at least %d characters): ' % MIN_LEN)
    try:
        check_code(code)
    except ValueError as e:
        sys.exit(str(e) + ' Nothing written.')
    if getpass.getpass('Again: ') != code:
        sys.exit('The codes do not match. Nothing written.')
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(encrypt_json(notes, code) + '\n')
    print('Encrypted %d notes into src/love.enc.json. Now run: python3 tools/build.py' % len(notes))


if __name__ == '__main__':
    main()
