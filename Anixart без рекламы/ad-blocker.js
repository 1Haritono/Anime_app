'use strict';

/**
 * Ad Blocker — блокирует рекламные запросы на уровне Electron session.
 * Перехватывает ВСЕ запросы через onBeforeRequest и отменяет обращения
 * к известным рекламным доменам и сетям.
 */

// ─── Список рекламных доменов для блокировки ────────────────────────────────
const AD_DOMAINS = [
  // Яндекс реклама
  'an.yandex.ru', 'yandexadexchange.net', 'yabs.yandex.ru',
  'awaps.yandex.ru', 'banners.adfox.ru', 'adfox.ru', 'adfox.me',
  'bs.yandex.ru',

  // Google реклама
  'googlesyndication.com', 'doubleclick.net', 'googleadservices.com',
  'google-analytics.com', 'googletagmanager.com', 'googletagservices.com',
  'pagead2.googlesyndication.com', 'tpc.googlesyndication.com',
  'adtrafficquality.google',

  // myTarget / VK реклама
  'mytarget.ru', 'top.mail.ru', 'r.mail.ru', 'target.my.com',

  // Общие рекламные сети
  'adnxs.com', 'advertising.com', 'ads.yahoo.com', 'adsrvr.org',
  'adroll.com', 'criteo.com', 'criteo.net',
  'taboola.com', 'taboolasyndication.com', 'realsrv.com',
  'outbrain.com', 'pubmatic.com', 'openx.net', 'openx.com',
  'appnexus.com', 'rubiconproject.com', 'contextweb.com',
  'bidswitch.net', 'smartadserver.com', 'smaato.net', 'smaato.com',
  'indexexchange.com', 'lijit.com', 'sovrn.com',
  'casalemedia.com', 'amazon-adsystem.com', 'moatads.com',
  'scorecardresearch.com', 'quantserve.com', 'quantcast.com',
  '3lift.com', 'triplelift.com', 'sharethrough.com',
  'spotxchange.com', 'spotx.tv', 'springserve.com',
  'teads.tv', 'teads.com', 'beachfront.com',
  'improvedigital.com', 'emxdgt.com',

  // Российские рекламные сети
  'begun.ru', 'adriver.ru', 'smi2.ru', 'smi2.net',
  'relap.io', 'tns-counter.ru', 'weborama.fr', 'weborama.com',
  'soloway.ru', 'rtb.sape.ru',

  // Домены из скриншотов пользователя
  'samara.dom.ru', 'rabota.vtb.ru', 'msctod234.ru',

  // Трекеры и аналитика
  'segment.io', 'segment.com', 'amplitude.com',
  'mixpanel.com', 'hotjar.com', 'fullstory.com',
  'appsflyer.com', 'branch.io', 'adjust.com',
  'kochava.com', 'connect.facebook.net',
  'analytics.tiktok.com', 'ads.tiktok.com',

  // Appodeal и мобильные рекламные SDK
  'appodeal.com', 'ironsrc.com', 'unityads.unity3d.com',
  'chartboost.com', 'vungle.com', 'applovin.com',
  'inmobi.com', 'flurry.com',

  // Прочие
  'popads.net', 'popcash.net', 'propellerads.com',
  'revcontent.com', 'mgid.com', 'adcolony.com',
  'media.net', 'zedo.com', 'undertone.com',
  'mathtag.com', 'bluekai.com', 'demdex.net',
  'omtrdc.net', 'everesttech.net',
];

// ─── Паттерны в URL для блокировки ──────────────────────────────────────────
const AD_URL_PATTERNS = [
  '/ads/serve', '/adserver/', '/advertisement/',
  'pagead', 'doubleclick', 'adclick',
  'popunder', 'clickunder', 'pop.js',
];

/**
 * Проверяет, является ли URL рекламным.
 * @param {string} url
 * @returns {boolean}
 */
function isAdUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch (_) {
    return false;
  }

  const host = parsed.hostname.replace(/^www\./, '');

  // Проверяем домен и все поддомены
  if (AD_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) {
    return true;
  }

  // Проверяем паттерны в полном URL
  const lowerUrl = url.toLowerCase();
  if (AD_URL_PATTERNS.some((p) => lowerUrl.includes(p))) {
    return true;
  }

  return false;
}

/**
 * Настраивает блокировку рекламы для сессии Electron.
 * Вызывается из setupSessionRequestHeaders().
 * @param {Electron.Session} ses
 */
function setupAdBlocker(ses) {
  ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, (details, callback) => {
    if (isAdUrl(details.url)) {
      callback({ cancel: true });
    } else {
      callback({});
    }
  });
}

module.exports = { setupAdBlocker, isAdUrl };
