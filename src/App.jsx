import React, { useState, useEffect } from 'react';
import {
  Search, Home, Grid2x2, Flame, BookOpen, Bookmark, Download,
  User, Settings, Bell, Users, Calendar, X, Minus, Square,
  Star, Play, ArrowLeft, Cloud, Copy, Check, RefreshCw, Smartphone, Monitor
} from 'lucide-react';
import {
  MOCK_USER_PROFILE, MOCK_ANIME_CATALOG, MOCK_SCHEDULE,
  MOCK_RELATED_RELEASES
} from './data';
import Player from './Player';
import { getPairingCode, setPairingCode } from './syncService';

const TABS = ['Моя вкладка', 'Аниме', 'Дунхуа', 'Последнее', 'Онгоинги', 'Анонсы', 'Завершённые', 'Фильмы', 'OVA'];
const NAV_ITEMS = [
  { id: 'home',        label: 'Главная',    Icon: Home },
  { id: 'discover',    label: 'Обзор',      Icon: Grid2x2 },
  { id: 'popular',     label: 'Популярное', Icon: Flame },
  { id: 'collections', label: 'Коллекции',  Icon: BookOpen },
  { id: 'bookmarks',   label: 'Закладки',   Icon: Bookmark },
  { id: 'downloads',   label: 'Загрузки',   Icon: Download },
];

// IPC bridge (works only in Electron)
const ipc = () => {
  try { return window.require('electron').ipcRenderer; } catch { return null; }
};

export default function App() {
  const [activePage, setActivePage]       = useState('home');
  const [activeTab, setActiveTab]         = useState('Аниме');
  const [scheduleOpen, setScheduleOpen]   = useState(true);
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [playerOpen, setPlayerOpen]       = useState(false);
  const [currentSpeed, setCurrentSpeed]   = useState(1.0);
  const [currentQuality, setCurrentQuality] = useState('1080p');
  const [_watchTogether, _setWatchTogether] = useState(false);
  const [updateInfo, setUpdateInfo]       = useState(null);

  // Cloud Sync state in Settings
  const [pairingCode, setPairingCodeState] = useState(getPairingCode());
  const [inputCode, setInputCode]         = useState('');
  const [copied, setCopied]               = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // Update notification via IPC
  useEffect(() => {
    const r = ipc();
    if (!r) return;
    const handler = (_, info) => setUpdateInfo(info);
    r.on('update_available', handler);
    return () => r.removeListener('update_available', handler);
  }, []);

  const handleOpenUpdate = () => {
    const r = ipc();
    if (r && updateInfo?.url) r.send('open_release_url', updateInfo.url);
    else if (updateInfo?.url) window.open(updateInfo.url, '_blank');
  };

  // Window controls
  const winControl = (action) => { const r = ipc(); if (r) r.send(`window-${action}`); };

  // Copy pairing code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Link new pairing code
  const handleLinkCode = () => {
    if (setPairingCode(inputCode)) {
      setPairingCodeState(inputCode.trim());
      setSyncStatusMsg('✅ Устройство успешно привязано!');
      setInputCode('');
    } else {
      setSyncStatusMsg('❌ Введите корректный 6-значный цифровой код');
    }
    setTimeout(() => setSyncStatusMsg(''), 4000);
  };

  // Generate new code
  const handleRegenerateCode = () => {
    const newC = Math.floor(100000 + Math.random() * 900000).toString();
    setPairingCode(newC);
    setPairingCodeState(newC);
    setSyncStatusMsg('🔄 Сгенерирован новый код');
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

  // Filter catalog
  const filteredCatalog = MOCK_ANIME_CATALOG.filter(a => {
    const matchTab = activeTab === 'Моя вкладка' || activeTab === 'Аниме'
      ? ['Аниме', 'Дунхуа'].includes(a.category)
      : a.category === activeTab || a.category === 'Аниме';
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch && (activeTab === 'Моя вкладка' ? true : matchTab);
  });

  // ─── PLAYER VIEW ──────────────────────────────────────────
  if (playerOpen && selectedAnime) {
    return (
      <div className="app-root">
        <div className="titlebar">
          <button className="titlebar-back" onClick={() => setPlayerOpen(false)}>
            <ArrowLeft size={16} /> {selectedAnime.title}
          </button>
          <div className="titlebar-controls">
            <button onClick={() => winControl('minimize')}><Minus size={12}/></button>
            <button onClick={() => winControl('maximize')}><Square size={11}/></button>
            <button className="close-btn" onClick={() => winControl('close')}><X size={12}/></button>
          </div>
        </div>
        <Player
          source={null}
          title={selectedAnime.title}
          animeId={selectedAnime.id}
          episode={1}
          savedSpeed={currentSpeed}
          savedQuality={currentQuality}
          onSpeedChange={setCurrentSpeed}
          onQualityChange={setCurrentQuality}
          watchTogetherActive={false}
          onSyncEvent={() => {}}
        />
      </div>
    );
  }

  // ─── ANIME DETAIL VIEW ────────────────────────────────────
  if (selectedAnime && !playerOpen) {
    return (
      <div className="app-root">
        {/* Titlebar */}
        <div className="titlebar">
          <button className="titlebar-back" onClick={() => setSelectedAnime(null)}>
            <ArrowLeft size={16} /> Назад
          </button>
          <div className="titlebar-controls">
            <button onClick={() => winControl('minimize')}><Minus size={12}/></button>
            <button onClick={() => winControl('maximize')}><Square size={11}/></button>
            <button className="close-btn" onClick={() => winControl('close')}><X size={12}/></button>
          </div>
        </div>

        {/* Detail */}
        <div className="detail-view">
          {/* Banner */}
          <div className="detail-banner" style={{ backgroundImage: `url(${selectedAnime.poster})` }}>
            <div className="detail-banner-overlay" />
          </div>

          <div className="detail-body">
            {/* Left: poster + play */}
            <div className="detail-left">
              <img className="detail-poster" src={selectedAnime.poster} alt={selectedAnime.title} />
              <button className="play-btn" onClick={() => setPlayerOpen(true)}>
                <Play size={20} fill="white" /> Смотреть
              </button>
              <div className="detail-badges">
                {selectedAnime.dub && <span className="badge badge-dub">DUB</span>}
                {selectedAnime.sub && <span className="badge badge-sub">SUB</span>}
              </div>
            </div>

            {/* Right: info */}
            <div className="detail-info">
              <div className="detail-category">{selectedAnime.category}</div>
              <h1 className="detail-title">{selectedAnime.title}</h1>
              <div className="detail-meta-row">
                {selectedAnime.rating && (
                  <span className="detail-rating">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" /> {selectedAnime.rating}
                  </span>
                )}
                <span className="detail-meta-pill">{selectedAnime.episodes}</span>
                <span className="detail-meta-pill">{selectedAnime.year}</span>
              </div>

              {/* Related releases */}
              <div className="detail-section-title">Связанные релизы</div>
              <div className="related-list">
                {MOCK_RELATED_RELEASES.map(r => (
                  <div key={r.id} className="related-card">
                    <img src={r.poster} alt={r.title} className="related-poster" />
                    <div className="related-info">
                      <div className="related-title">{r.title}</div>
                      <div className="related-meta">{r.episodes} · {r.season} · {r.type}</div>
                      <span className={`status-pill status-${r.status}`}>{r.status}</span>
                    </div>
                    <div className="related-rating"><Star size={12} fill="#f59e0b" color="#f59e0b" /> {r.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN VIEW ───────────────────────────────────────────
  return (
    <div className="app-root">
      {/* ── TITLEBAR ── */}
      <div className="titlebar">
        <div className="titlebar-logo">
          <svg viewBox="0 0 40 40" width="22" height="22" fill="#a78bfa">
            <path d="M5 30 L10 15 H15 L20 30 H17 L15.5 25 H9.5 L8 30Z M11 22 H15 L13 16Z"/>
            <circle cx="23" cy="13" r="2.5"/>
            <circle cx="28" cy="11" r="3"/>
            <circle cx="33" cy="13" r="2.5"/>
            <path d="M23 15.5 L26 23 L28 17 L30 23 L33 15.5 L35 29H21Z"/>
          </svg>
          <span>AniKingHub</span>
        </div>
        <div className="titlebar-controls">
          {updateInfo && (
            <button className="update-pill" onClick={handleOpenUpdate} title={`Обновление v${updateInfo.version}`}>
              ↓ v{updateInfo.version}
            </button>
          )}
          <button onClick={() => winControl('minimize')}><Minus size={12}/></button>
          <button onClick={() => winControl('maximize')}><Square size={11}/></button>
          <button className="close-btn" onClick={() => winControl('close')}><X size={12}/></button>
        </div>
      </div>

      <div className="app-body">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo" onClick={() => setActivePage('home')}>
            <div className="sidebar-logo-icon">
              <svg viewBox="0 0 512 512" width="28" height="28" fill="white">
                <g>
                  <path d="M65 360 L115 200 H155 L205 360 H170 L158 318 H112 L100 360Z M121 286 H149 L135 236Z"/>
                  <circle cx="218" cy="212" r="10"/>
                  <circle cx="256" cy="190" r="12"/>
                  <circle cx="294" cy="212" r="10"/>
                  <path d="M218 222 L236 270 L256 214 L276 270 L294 222 L310 326H202Z"/>
                  <rect x="202" y="342" width="108" height="18" rx="4"/>
                  <path d="M307 200H337V264H381V200H411V360H381V292H337V360H307Z"/>
                </g>
              </svg>
            </div>
            <span className="sidebar-logo-text">AниKingHub</span>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`sidebar-item ${activePage === id ? 'active' : ''}`}
                onClick={() => setActivePage(id)}
              >
                <Icon size={19} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <button className={`sidebar-item ${activePage === 'profile' ? 'active' : ''}`} onClick={() => setActivePage('profile')}>
              <User size={19}/><span>Профиль</span>
            </button>
            <button className={`sidebar-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => setActivePage('settings')}>
              <Settings size={19}/><span>Настройки</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="main-area">
          {/* Search + actions bar */}
          <div className="topbar">
            <div className="search-box">
              <Search size={16} color="#6b7280" />
              <input
                type="text"
                placeholder="Поиск аниме, персонажей..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="topbar-actions">
              <button className="topbar-btn" title="Друзья" onClick={() => setActivePage('profile')}>
                <Users size={18}/>
              </button>
              <button
                className={`topbar-btn ${scheduleOpen ? 'active' : ''}`}
                title="Расписание"
                onClick={() => setScheduleOpen(!scheduleOpen)}
              >
                <Calendar size={18}/>
              </button>
              <button className="topbar-btn" title="Уведомления">
                <Bell size={18}/>
              </button>
              <div className="user-chip" onClick={() => setActivePage('profile')}>
                <img
                  src={MOCK_USER_PROFILE.avatar}
                  alt={MOCK_USER_PROFILE.username}
                  className="user-avatar-img"
                  onError={e => { e.target.style.display='none'; }}
                />
                <div>
                  <div className="user-chip-name">{MOCK_USER_PROFILE.username}</div>
                  <div className="user-chip-status">{MOCK_USER_PROFILE.status}</div>
                </div>
              </div>
              <button className="topbar-btn" title="Настройки" onClick={() => setActivePage('settings')}>
                <Settings size={18}/>
              </button>
            </div>
          </div>

          {/* Settings Page */}
          {activePage === 'settings' ? (
            <div className="settings-page" style={{ padding: '24px', overflowY: 'auto', flex: 1, color: '#fff' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={24} color="#a78bfa" /> Настройки
              </h2>

              {/* Cloud Watch Progress Sync Section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #7c4dff, #00e676)',
                      padding: '10px',
                      borderRadius: '12px',
                      display: 'flex',
                      color: '#fff'
                    }}>
                      <Cloud size={22} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Синхронизация устройств (Cloud Watch Sync)</h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#9ca3af' }}>
                        Продолжайте просмотр с той же секунды на телефоне (Android) и компьютере (PC).
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 230, 118, 0.15)',
                    border: '1px solid rgba(0, 230, 118, 0.4)',
                    color: '#00e676',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676' }}></span>
                    Синхронизация активна
                  </div>
                </div>

                {syncStatusMsg && (
                  <div style={{
                    background: 'rgba(124, 77, 255, 0.2)',
                    border: '1px solid #7c4dff',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '13px'
                  }}>
                    {syncStatusMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {/* Current Pairing Code Box */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Smartphone size={15} /> Ваш код связки устройств:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        letterSpacing: '4px',
                        color: '#a78bfa',
                        fontFamily: 'monospace'
                      }}>
                        {pairingCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        title="Скопировать код"
                        style={{
                          background: copied ? '#00e676' : 'rgba(167, 139, 250, 0.2)',
                          border: '1px solid rgba(167, 139, 250, 0.4)',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Скопировано!' : 'Копировать'}
                      </button>
                      <button
                        onClick={handleRegenerateCode}
                        title="Сгенерировать новый код"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#aaa',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6b7280' }}>
                      Введите этот 6-значный код на втором устройстве для автоматической синхронизации.
                    </p>
                  </div>

                  {/* Connect another device */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Monitor size={15} /> Подключить другое устройство:
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Код (например: 739102)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#fff',
                          padding: '8px 12px',
                          fontSize: '16px',
                          letterSpacing: '2px',
                          fontFamily: 'monospace',
                          width: '100%',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={handleLinkCode}
                        style={{
                          background: 'linear-gradient(135deg, #7c4dff, #651fff)',
                          border: 'none',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '13px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Связать
                      </button>
                    </div>
                    <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6b7280' }}>
                      Введите код, отображаемый в настройках вашего смартфона или ПК.
                    </p>
                  </div>
                </div>
              </div>

              {/* Other settings section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Воспроизведение и качество</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{ fontSize: '14px', color: '#ccc' }}>По умолчанию качество:</label>
                  <select
                    value={currentQuality}
                    onChange={(e) => setCurrentQuality(e.target.value)}
                    style={{
                      background: '#1a1b26',
                      border: '1px solid #444',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '8px'
                    }}
                  >
                    <option value="1080p">1080p Full HD (AI Upscale)</option>
                    <option value="720p">720p HD</option>
                    <option value="480p">480p SD</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Content tabs */}
              <div className="tabs-row">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Catalog grid + schedule */}
              <div className="content-area">
                <div className="catalog-scroll">
                  {filteredCatalog.length === 0 ? (
                    <div className="empty-state">Ничего не найдено</div>
                  ) : (
                    <div className="anime-grid">
                      {filteredCatalog.map(anime => (
                        <div
                          key={anime.id}
                          className="anime-card"
                          onClick={() => setSelectedAnime(anime)}
                        >
                          <div className="anime-card-poster">
                            <img
                              src={anime.poster}
                              alt={anime.title}
                              loading="lazy"
                              onError={e => {
                                e.target.src = `https://via.placeholder.com/200x280/1a1a2e/a78bfa?text=${encodeURIComponent(anime.title.slice(0,8))}`;
                              }}
                            />
                            {anime.rating && (
                              <div className="rating-badge">
                                <Star size={9} fill="currentColor"/> {anime.rating}
                              </div>
                            )}
                            <div className="card-dub-badges">
                              {anime.dub && <span className="dub-badge">DUB</span>}
                              {anime.sub && <span className="sub-badge">SUB</span>}
                            </div>
                            <div className="card-hover-overlay">
                              <Play size={32} fill="white" color="white"/>
                            </div>
                          </div>
                          <div className="anime-card-info">
                            <div className="anime-card-title">{anime.title}</div>
                            <div className="anime-card-meta">{anime.episodes} · {anime.year}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Schedule panel */}
                {scheduleOpen && (
                  <aside className="schedule-panel">
                    <div className="schedule-header">
                      <span>Расписание</span>
                      <button className="schedule-pin">Япония &amp; Китай ›</button>
                    </div>
                    <div className="schedule-list">
                      {MOCK_SCHEDULE.map(item => (
                        <div key={item.id} className="schedule-item">
                          <div className="schedule-poster">
                            <img
                              src={item.poster}
                              alt={item.title}
                              loading="lazy"
                              onError={e => { e.target.style.background='#2a2a3e'; e.target.src=''; }}
                            />
                          </div>
                          <div className="schedule-info">
                            <div className="schedule-title">{item.title}</div>
                            <div className="schedule-eps">{item.episodes}</div>
                            <div className="schedule-season">{item.season}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </aside>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
