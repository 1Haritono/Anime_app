# 🚫 Anixart без рекламы (Desktop)

Патч для настольного клиента **AnixApp** (Windows), который полностью блокирует рекламу на уровне Electron без сторонних расширений.

---

## 📋 Что блокирует

- 🚫 Яндекс Реклама (an.yandex.ru, adfox.ru и др.)
- 🚫 Google Ads (googlesyndication.com, doubleclick.net и др.)
- 🚫 myTarget / VK Реклама (mytarget.ru, top.mail.ru и др.)
- 🚫 50+ международных рекламных сетей (Taboola, Criteo, Outbrain и др.)
- 🚫 Трекеры и аналитика (Hotjar, Amplitude, AppsFlyer и др.)
- 🚫 Мобильные рекламные SDK (Appodeal, AppLovin, IronSource и др.)

---

## 🛠️ Как применить патч

### Требования
- Установленный [AnixApp](https://anixart.tv/) для Windows
- Установленный [Node.js](https://nodejs.org/)

### Шаги

**1. Установите инструмент для работы с .asar**
```bash
npm install -g @electron/asar
```

**2. Найдите файлы приложения**
```
C:\Users\<ВашПользователь>\AppData\Local\Programs\anixapp\resources\
```

**3. Сделайте резервную копию**
```powershell
Copy-Item "app.asar" "app.asar.backup"
```

**4. Распакуйте app.asar**
```bash
npx @electron/asar extract app.asar app_extracted
```

**5. Скопируйте файлы патча**

Скопируйте из этой папки:
- `ad-blocker.js` → `app_extracted\electron\setup\ad-blocker.js`
- `session-headers.js` → `app_extracted\electron\setup\session-headers.js`

**6. Запакуйте обратно**
```bash
npx @electron/asar pack app_extracted app.asar
```

**7. Запустите AnixApp — реклама исчезнет!** 🎉

---

## 🔄 Откат к оригиналу

Если что-то пошло не так:
```powershell
Copy-Item "app.asar.backup" "app.asar" -Force
```

---

## 📁 Файлы патча

| Файл | Описание |
|---|---|
| `ad-blocker.js` | Модуль блокировки рекламы (список доменов + логика) |
| `session-headers.js` | Модифицированный файл сессии с подключённым блокировщиком |

---

## ⚠️ Важно

- После каждого **обновления AnixApp** патч нужно применять заново
- Патч не нарушает работу плеера и навигации
- Блокировка происходит **на уровне сети** — запросы к рекламным серверам отменяются до загрузки

---

## 🤝 Автор

Патч создан для личного использования.  
Репозиторий: [1Haritono/Anime_app](https://github.com/1Haritono/Anime_app)
