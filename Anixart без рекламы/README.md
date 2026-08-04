# 🚫 Anixart без рекламы (Desktop EXE & Android APK)

Полное удаление рекламы из **Anixart** для **Windows (AnixApp.exe)** и **Android (Anixart.apk)**.

---

## 📱 Android APK (Готовый файл)

Готовый подписанный APK без рекламы сохранён на вашем компьютере:

1. `D:\Downloads\Telegram Desktop\Anixart_NoAds.apk`
2. `c:\Antsgravity\Anime_app\Anixart_NoAds.apk`

### Что удалено из APK:
- 🚫 **Нижний рекламный баннер (Yandex Ads)** — контейнер полностью сжат до 0dp (`visibility: gone`), пустых мест нет.
- 🚫 **Полноэкранные Interstitial-объявления** — функция показа перед/после просмотра серий заблокирована.
- 🚫 **Реклама в видеоплеере и Kodik** — серверные флаги и скрипты вырезаны, домены внесены в `adblock.txt`.
- 🚫 **Раздел «Управление рекламой»** — полностью удалён из меню настроек приложения.
- 🚫 **Рекламные SDK (Yandex Mobile Ads, Appodeal и др.)** — вызовы заблокированы на уровне байткода smali.

---

## 💻 Windows Desktop (EXE / app.asar)

Модуль блокировки рекламы для настольной версии:
- `ad-blocker.js`
- `session-headers.js`

Патч блокирует все рекламные сети на сетевом уровне Electron без нарушения работы плеера.

---

## 🛠️ Скрипт для сборки APK (patch_apk.py)

В папке также доступен скрипт `patch_apk.py`, который автоматически модифицирует Smali-код и XML-верстку распакованного APK-файла.

```bash
python patch_apk.py
```

---

## 🤝 Автор
[1Haritono/Anime_app](https://github.com/1Haritono/Anime_app)
