// Mock Data Engine for AniKingHub
export const MOCK_USER_PROFILE = {
  username: "1Hariton",
  avatar: "https://avatars.githubusercontent.com/u/10240000?v=4",
  status: "+1 в сети",
  registration: "25 апр. 2023",
  stats: {
    animeTotal: 353, episodesTotal: 4132, watchTime: "1 д. 2 ч.",
    friends: 3, watching: 8, planned: 156, watched: 189, onHold: 0, dropped: 0,
  }
};

export const MOCK_ANIME_CATALOG = [
  { id: 1,  title: "Клинок, рассекающий демонов",  episodes: "26 эп.", year: "2019", rating: "9.2", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/38000.jpg", category: "Аниме" },
  { id: 2,  title: "Атака Титанов",                episodes: "94 эп.", year: "2013", rating: "9.0", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/16498.jpg", category: "Аниме" },
  { id: 3,  title: "Hunter x Hunter",              episodes: "148 эп.", year: "2011", rating: "9.0", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/11061.jpg", category: "Аниме" },
  { id: 4,  title: "Моя геройская академия",       episodes: "138 эп.", year: "2016", rating: "8.4", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/31964.jpg", category: "Аниме" },
  { id: 5,  title: "Джудзюцу Кайсэн",             episodes: "48 эп.", year: "2020", rating: "8.8", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/40748.jpg", category: "Аниме" },
  { id: 6,  title: "Человек-бензопила",            episodes: "26 эп.", year: "2022", rating: "8.6", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/44511.jpg", category: "Аниме" },
  { id: 7,  title: "Клинок, рассекающий демонов: Тренировочный лагерь", episodes: "7 эп.", year: "2021", rating: "8.9", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/44081.jpg", category: "Аниме" },
  { id: 8,  title: "Наруто: Шippuden",             episodes: "500 эп.", year: "2007", rating: "8.7", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/1735.jpg",  category: "Аниме" },
  { id: 9,  title: "Врата Ада",                    episodes: "15 эп.", year: "2023", rating: "8.3", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/51535.jpg", category: "Аниме" },
  { id: 10, title: "Синий Экзорцист",              episodes: "25 эп.", year: "2011", rating: "8.1", dub: true, sub: false, poster: "https://shikimori.one/system/animes/original/9919.jpg",  category: "Аниме" },
  { id: 11, title: "Re: Zero",                     episodes: "50 эп.", year: "2016", rating: "8.9", dub: false, sub: true, poster: "https://shikimori.one/system/animes/original/31240.jpg", category: "Аниме" },
  { id: 12, title: "Sword Art Online",             episodes: "25 эп.", year: "2012", rating: "8.2", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/11757.jpg", category: "Аниме" },
  { id: 13, title: "Токийский Гуль",               episodes: "12 эп.", year: "2014", rating: "8.2", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/22319.jpg", category: "Аниме" },
  { id: 14, title: "Берсерк",                      episodes: "25 эп.", year: "1997", rating: "9.1", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/33.jpg",    category: "Аниме" },
  { id: 15, title: "Bleach: TYBW",                 episodes: "52 эп.", year: "2022", rating: "9.0", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/41467.jpg", category: "Аниме" },
  { id: 16, title: "Противостояние Святого",       episodes: "151 эп.", year: "2023", rating: "8.4", dub: false, sub: true, poster: "https://shikimori.one/system/animes/original/49596.jpg", category: "Онгоинги" },
  { id: 17, title: "Магическая Битва 2",           episodes: "26 эп.", year: "2023", rating: "8.7", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/51009.jpg", category: "Аниме" },
  { id: 18, title: "Сказание о пастухе богов",     episodes: "19 эп.", year: "2023", rating: "8.1", dub: false, sub: true, poster: "https://shikimori.one/system/animes/original/50709.jpg", category: "Аниме" },
  { id: 19, title: "Бездомный бог 2",              episodes: "13 эп.", year: "2015", rating: "8.5", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/28735.jpg", category: "Аниме" },
  { id: 20, title: "Fullmetal Alchemist: Brotherhood", episodes: "64 эп.", year: "2009", rating: "9.5", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/5114.jpg", category: "Аниме" },
  { id: 21, title: "Steins;Gate",                  episodes: "25 эп.", year: "2011", rating: "9.3", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/9253.jpg",  category: "Аниме" },
  { id: 22, title: "Код Гиасс",                   episodes: "25 эп.", year: "2006", rating: "9.0", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/1575.jpg",  category: "Аниме" },
  { id: 23, title: "Overlord IV",                  episodes: "13 эп.", year: "2022", rating: "8.4", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/48895.jpg", category: "Аниме" },
  { id: 24, title: "Непокорённый Дракон",          episodes: "12 эп.", year: "2023", rating: "8.0", dub: false, sub: true, poster: "https://shikimori.one/system/animes/original/52688.jpg", category: "Аниме" },
  // Дунхуа (Chinese anime)
  { id: 31, title: "Неортодоксальный монах", episodes: "108 эп.", year: "2022", rating: "8.6", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/48569.jpg", category: "Дунхуа" },
  { id: 32, title: "Духовный меч Пика Небес", episodes: "40 эп.", year: "2023", rating: "8.2", dub: false, sub: true, poster: "https://shikimori.one/system/animes/original/52250.jpg", category: "Дунхуа" },
  // Фильмы
  { id: 41, title: "Клинок: Поезд бесконечности", episodes: "Фильм", year: "2020", rating: "9.3", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/41370.jpg", category: "Фильмы" },
  { id: 42, title: "Ваше имя",                    episodes: "Фильм", year: "2016", rating: "9.4", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/32281.jpg", category: "Фильмы" },
  { id: 43, title: "Унесённые призраками",         episodes: "Фильм", year: "2001", rating: "9.5", dub: true, sub: true, poster: "https://shikimori.one/system/animes/original/199.jpg",  category: "Фильмы" },
  // Анонсы
  { id: 51, title: "Богиня благословляет этот прекрасный мир 4", episodes: "Скоро", year: "2027 · Анонс", rating: null, dub: false, sub: false, poster: "https://shikimori.one/system/animes/original/57224.jpg", category: "Анонсы" },
];

export const MOCK_SCHEDULE = [
  { id: 1, title: "Клинок, рассекающий демонов", episodes: "26 из 26", day: "Пн", time: "10:00", poster: "https://shikimori.one/system/animes/original/38000.jpg", season: "зима 2026 г." },
  { id: 2, title: "Атака Титанов", episodes: "94 из 94", day: "Пн", time: "14:30", poster: "https://shikimori.one/system/animes/original/16498.jpg", season: "зима 2026 г." },
  { id: 3, title: "Противостояние Святого", episodes: "151 из 180", day: "Сб", time: "18:15", poster: "https://shikimori.one/system/animes/original/49596.jpg", season: "зима 2026 г." },
  { id: 4, title: "Врата Ада", episodes: "8 из 15", day: "Сб", time: "09:00", poster: "https://shikimori.one/system/animes/original/51535.jpg", season: "весна 2026 г." },
];

export const MOCK_RELATED_RELEASES = [
  { id: 101, title: "Реинкарнация безработного: История о приключениях в другом мире — Сезон 1 (Часть 1)", episodes: "11 эп", rating: "4.8", season: "зима 2021 г.", type: "Сериал", status: "просмотрено", poster: "https://shikimori.one/system/animes/original/39535.jpg", description: "Бывает в жизни невезение. Только тридцатичетырёхлетний отаку-неудачник решил изменить свою жизнь..." },
  { id: 102, title: "Реинкарнация безработного: История о приключениях в другом мире — Сезон 1 (Часть 2)", episodes: "12 эп", rating: "4.9", season: "осень 2021 г.", type: "Сериал", status: "просмотрено", poster: "https://shikimori.one/system/animes/original/45576.jpg", description: "Продолжение путешествия Рудеуса и Эрис по Демоническому контененту после телепортации..." },
];

export const MOCK_ICON_THEMES = [
  { id: 'dark-white', category: 'Тёмные темы', name: 'Тёмная (Белая корона)', bg: '#000000', crown: '#ffffff', text: '#ffffff', previewBg: '#000000' },
  { id: 'dark-burgundy-gold-3d', category: '3D Золотая Корона', name: 'Бордо 3D Голд (Главная)', bg: '#6b0d25', crown: 'gold-3d', text: '#ffffff', previewBg: '#6b0d25' }
];

export const MOCK_SOURCES = [
  { id: "anixart", name: "Anixart CDN (1080p)" },
  { id: "animego", name: "AnimeGo Player" },
  { id: "yummy", name: "YummyAnime" },
  { id: "kinogo", name: "Kinogo.ec" },
  { id: "jutsu", name: "Jut.su (Skip Opening)" },
  { id: "anilibria", name: "AniLibria HD" },
  { id: "seena", name: "Seena Playlist" },
  { id: "torrent", name: "WebTorrent 1080p HEVC" }
];
