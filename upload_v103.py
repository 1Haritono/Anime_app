import urllib.request, json, os

# Токен берётся из переменной окружения GITHUB_TOKEN
# Установите: $env:GITHUB_TOKEN = "ваш_токен"
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '')
if not GITHUB_TOKEN:
    raise ValueError("Переменная окружения GITHUB_TOKEN не задана!")

headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Python-Release-Uploader'
}

# Создаём релиз v1.0.3
url = 'https://api.github.com/repos/1Haritono/Anime_app/releases'
body = (
    "## What's Changed\n"
    "- Исправлен чёрный экран: добавлен base ./ в Vite для корректных путей в Electron\n"
    "- Интерфейс теперь полностью загружается после установки\n"
    "- Бордовый 3D Gold ярлык на рабочем столе\n\n"
    "**Full Changelog**: https://github.com/1Haritono/Anime_app/compare/v1.0.2...v1.0.3"
)
data = json.dumps({
    'tag_name': 'v1.0.3',
    'name': 'AniKingHub v1.0.3 — Рабочий интерфейс',
    'body': body,
    'draft': False,
    'prerelease': False
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers=headers, method='POST')
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode())
    release_id = res.get('id')
    print('RELEASE_ID:', release_id)

# Загружаем файл
upload_url = f'https://uploads.github.com/repos/1Haritono/Anime_app/releases/{release_id}/assets?name=AniKingHub-Setup-1.0.0.exe'
with open(r'C:\Antsgravity\Anime_app\dist_installer\AniKingHub Setup 1.0.0.exe', 'rb') as f:
    file_data = f.read()
print(f'Uploading {len(file_data)//1024//1024}MB...')

headers2 = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Content-Type': 'application/octet-stream',
    'User-Agent': 'Python-Release-Uploader'
}
req2 = urllib.request.Request(upload_url, data=file_data, headers=headers2, method='POST')
with urllib.request.urlopen(req2) as resp2:
    res2 = json.loads(resp2.read().decode())
    print('OK:', res2.get('browser_download_url'))
