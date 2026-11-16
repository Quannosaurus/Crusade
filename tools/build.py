# Builds the app from src/: the PWA into the repo root (served by GitHub Pages) and a single-file copy into .build/index.html (for tests).
import re,shutil,os,glob
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));B=R+'/src';O=R
# Love notes: only the ciphertext from src/love.enc.json (made by tools/encrypt_love.py) is embedded, never plaintext.
import json
LM='var LOVEENC=null; /*@LOVEENC@*/'
LE=B+'/love.enc.json'
LJ='var LOVEENC='+(json.dumps(json.load(open(LE)),separators=(',',':')) if os.path.exists(LE) else 'null')+';'
os.makedirs(O+'/fonts',exist_ok=True);os.makedirs(R+'/.build',exist_ok=True)
single=open(B+'/head.html').read()+'\n<script>\n'+open(B+'/pics.js').read()+'\n'+open(B+'/app.js').read().replace(LM,LJ)+'\n</script>\n</body>\n</html>\n'
open(R+'/.build/index.html','w').write(single)
h=open(B+'/head.html').read()
css=re.search(r'<style>([\s\S]*?)</style>',h).group(1)
fonts=''
for fam,file,wt in [('Cinzel','cinzel',600),('Cinzel','cinzel',800),('Source Sans 3','source-sans-3',400),('Source Sans 3','source-sans-3',600),('Source Sans 3','source-sans-3',700)]:
    fn='%s-latin-%d-normal.woff2'%(file,wt)
    shutil.copy(B+'/fonts/'+fn,O+'/fonts/'+fn)
    fonts+="@font-face{font-family:'%s';font-style:normal;font-weight:%d;font-display:swap;src:url(fonts/%s) format('woff2')}\n"%(fam,wt,fn)
open(O+'/app.css','w').write(fonts+css)
for lic in glob.glob(B+'/fonts/LICENSE-*'): shutil.copy(lic,O+'/fonts/')
csp="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'"
# Safety net: drop any <link> that points off-site (preconnect, remote stylesheets). The app loads nothing external.
h=re.sub(r'<link\b[^>]*\bhref="(?:https?:)?//[^"]*"[^>]*>\n?','',h)
h=re.sub(r'<link rel="icon"[^>]*>\n<link rel="apple-touch-icon"[^>]*>\n','',h)
h=re.sub(r'<style>[\s\S]*?</style>','<link rel="stylesheet" href="app.css">',h)
h=h.replace('<meta charset="utf-8">','<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="%s">\n<meta name="referrer" content="no-referrer">\n<link rel="icon" type="image/svg+xml" href="icon.svg">\n<link rel="apple-touch-icon" href="icon-192.png">\n<link rel="manifest" href="manifest.webmanifest">'%csp,1)
assert 'Content-Security-Policy' in h
open(O+'/index.html','w').write(h+'\n<script src="app.js"></script>\n</body>\n</html>\n')
js=open(B+'/pics.js').read()+'\n'+open(B+'/app.js').read().replace(LM,LJ)+'\nif("serviceWorker" in navigator&&window.top===window.self){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}\n'
open(O+'/app.js','w').write(js)
import hashlib
ver=hashlib.sha256((h+js+fonts+css).encode()).hexdigest()[:8]
files=['./','index.html','app.js','app.css','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png']+['fonts/'+os.path.basename(f) for f in glob.glob(O+'/fonts/*.woff2')]
open(O+'/sw.js','w').write('''// Offline cache. Network first, cache as fallback, so new versions arrive whenever you are online.
const C="crusade-%s";
const FILES=%s;
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));});
'''%(ver,str(files).replace("'",'"')))
open(O+'/manifest.webmanifest','w').write('''{
  "name": "Crusade Training Book",
  "short_name": "Crusade",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#0c0c0d",
  "theme_color": "#0c0c0d",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
    {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
  ]
}
''')
for f in ['icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png']: shutil.copy(B+'/icons/'+f,O+'/'+f)
print('ok',ver)
