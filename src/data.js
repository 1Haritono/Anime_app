// Mock Data Engine for AnixApp + Multi-sources
export const MOCK_USER_PROFILE = {
  username: "1Hariton",
  avatar: "https://avatars.githubusercontent.com/u/10240000?v=4",
  status: "+1 в сети",
  registration: "25 апр. 2023",
  stats: {
    animeTotal: 353,
    episodesTotal: 4132,
    watchTime: "1 д. 2 ч.",
    friends: 3,
    watching: 8,
    planned: 156,
    watched: 189,
    onHold: 0,
    dropped: 0,
  }
};

export const MOCK_ANIME_CATALOG = [
  {
    id: 1,
    title: "История электричества в двадцатом веке",
    episodes: "4 эп.",
    year: "2026",
    rating: "4.8",
    poster: "https://shikimori.one/system/animes/original/37734.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 2,
    title: "100 девушек, которые очень-очень-очень-очень...",
    episodes: "4 эп.",
    year: "2026",
    rating: "4.5",
    poster: "https://shikimori.one/system/animes/original/54714.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 3,
    title: "Самый сильный в мире заступник: Страна...",
    episodes: "4 эп.",
    year: "2026",
    rating: "3.4",
    poster: "https://shikimori.one/system/animes/original/58564.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 4,
    title: "Хоть я и бездарная злодейка: Сказка о том,...",
    episodes: "3 эп.",
    year: "2026",
    rating: "4.8",
    poster: "https://shikimori.one/system/animes/original/57668.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 5,
    title: "Копэн",
    episodes: "69 эп.",
    year: "2025",
    rating: "4.6",
    poster: "https://shikimori.one/system/animes/original/40546.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 6,
    title: "Дигимоны: Битбрейк",
    episodes: "40 эп.",
    year: "2025",
    rating: "3.6",
    poster: "https://shikimori.one/system/animes/original/58231.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 7,
    title: "Железный котелок Жана!",
    episodes: "4 эп.",
    year: "2026",
    rating: "4.7",
    poster: "https://shikimori.one/system/animes/original/58912.jpg",
    statusBadge: null,
    category: "Аниме"
  },
  {
    id: 8,
    title: "Богиня благословляет этот прекрасный мир 4",
    episodes: "Скоро",
    year: "2027 • Анонс",
    rating: null,
    poster: "https://shikimori.one/system/animes/original/57224.jpg",
    statusBadge: null,
    category: "Анонсы"
  },
  {
    id: 9,
    title: "Вперёд, отряд мистики!",
    episodes: "4 эп.",
    year: "2026",
    rating: "4.3",
    poster: "https://shikimori.one/system/animes/original/56891.jpg",
    statusBadge: "В ПЛАНАХ",
    category: "Аниме"
  },
  {
    id: 10,
    title: "Ты и я — полные противоположности 2",
    episodes: "4 эп.",
    year: "2026",
    rating: "4.8",
    poster: "https://shikimori.one/system/animes/original/57112.jpg",
    statusBadge: null,
    category: "Аниме"
  }
];

export const MOCK_SCHEDULE = [
  {
    id: 1,
    title: "Аккуратная и симпатичная...",
    episodes: "3 из 12 эп",
    day: "Понедельник",
    poster: "https://shikimori.one/system/animes/original/52000.jpg",
    season: "зима 2026 г.",
    type: "Сериал"
  },
  {
    id: 2,
    title: "Тайная битва за престол...",
    episodes: "3 из 12 эп",
    day: "Понедельник",
    poster: "https://shikimori.one/system/animes/original/53000.jpg",
    season: "зима 2026 г.",
    type: "Сериал"
  },
  {
    id: 3,
    title: "Противостояние святого",
    episodes: "150 из 180 эп",
    day: "Понедельник",
    poster: "https://shikimori.one/system/animes/original/54000.jpg",
    season: "зима 2026 г.",
    type: "Сериал"
  },
  {
    id: 4,
    title: "Рыцарь-скелет вступает в...",
    episodes: "3 из 12 эп",
    day: "Понедельник",
    poster: "https://shikimori.one/system/animes/original/55000.jpg",
    season: "зима 2026 г.",
    type: "Сериал"
  }
];

export const MOCK_RELATED_RELEASES = [
  {
    id: 101,
    title: "Реинкарнация безработного: История о приключениях в другом мире — Сезон 1 (Часть 1)",
    episodes: "11 эп",
    rating: "4.8 ★",
    season: "зима 2021 г.",
    type: "Сериал",
    status: "просмотрено",
    poster: "https://shikimori.one/system/animes/original/39535.jpg",
    description: "Бывает в жизни невезение. Только тридцатичетырёхлетний отаку-неудачник решил изменить свою жизнь..."
  },
  {
    id: 102,
    title: "Реинкарнация безработного: История о приключениях в другом мире — Сезон 1 (Часть 2)",
    episodes: "12 эп",
    rating: "4.9 ★",
    season: "осень 2021 г.",
    type: "Сериал",
    status: "просмотрено",
    poster: "https://shikimori.one/system/animes/original/45576.jpg",
    description: "Продолжение путешествия Рудеуса и Эрис по Демоническому контененту после телепортации..."
  }
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
