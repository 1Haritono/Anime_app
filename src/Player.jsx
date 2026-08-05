import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Zap, Sparkles, Users, RotateCcw, Cloud, Check
} from 'lucide-react';
import { sendProgress, fetchProgress, formatTime } from './syncService';

export default function Player({ 
  _source, 
  title, 
  animeId = 'anime_1',
  episode = 1,
  savedSpeed, 
  savedQuality, 
  onSpeedChange, 
  onQualityChange,
  watchTogetherActive,
  onSyncEvent 
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(savedSpeed || 1.0);
  const [quality, setQuality] = useState(savedQuality || '1080p');
  const [upscaleEnabled, setUpscaleEnabled] = useState(true);

  // Cloud Sync state
  const [remoteBookmark, setRemoteBookmark] = useState(null);
  const [showSyncPrompt, setShowSyncPrompt] = useState(false);

  // Speed Options including high speed multipliers
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0];
  const qualityOptions = ['1080p', '720p', '480p', '4K (Torrent)'];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  // Check Cloud Sync Bookmark on Mount
  useEffect(() => {
    let isMounted = true;
    const checkCloudSync = async () => {
      const activeId = animeId || title || 'current_anime';
      const data = await fetchProgress(activeId, episode);
      if (isMounted && data && data.time > 5) {
        setRemoteBookmark(data);
        setShowSyncPrompt(true);
      }
    };
    checkCloudSync();
    return () => { isMounted = false; };
  }, [animeId, title, episode]);

  // Periodic Auto-Sync Progress (Every 10 seconds)
  useEffect(() => {
    const activeId = animeId || title || 'current_anime';
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const cur = videoRef.current.currentTime;
        const dur = videoRef.current.duration;
        if (cur > 3) {
          sendProgress(activeId, episode, cur, dur);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [animeId, title, episode, isPlaying]);

  // Save Progress on Unmount or Pause
  const handlePauseOrUnmount = () => {
    if (videoRef.current && videoRef.current.currentTime > 3) {
      const activeId = animeId || title || 'current_anime';
      sendProgress(activeId, episode, videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  const handleSpeedSelect = (newSpeed) => {
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
    if (onSpeedChange) onSpeedChange(newSpeed);
    if (watchTogetherActive && onSyncEvent) {
      onSyncEvent({ type: 'SPEED_CHANGE', speed: newSpeed });
    }
  };

  const handleSeamlessQualitySwitch = (newQuality) => {
    const savedTime = videoRef.current ? videoRef.current.currentTime : 0;
    const wasPlaying = isPlaying;
    setQuality(newQuality);
    if (onQualityChange) onQualityChange(newQuality);

    // Seamlessly restore playback time without pausing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = savedTime;
        if (wasPlaying) videoRef.current.play();
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      handlePauseOrUnmount();
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const applyRemoteBookmark = () => {
    if (videoRef.current && remoteBookmark) {
      videoRef.current.currentTime = remoteBookmark.time;
      videoRef.current.play();
      setIsPlaying(true);
    }
    setShowSyncPrompt(false);
  };

  return (
    <div className="player-container" style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      {/* Video element with canvas upscale overlay simulated */}
      <video
        ref={videoRef}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: upscaleEnabled ? 'contrast(1.08) saturate(1.15) sharpen(1px)' : 'none'
        }}
        onPause={() => { setIsPlaying(false); handlePauseOrUnmount(); }}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
      />

      {/* Cloud Sync Floating Resume Prompt (Glassmorphism UI) */}
      {showSyncPrompt && remoteBookmark && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          background: 'rgba(18, 18, 28, 0.88)',
          border: '1px solid rgba(124, 77, 255, 0.5)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(124, 77, 255, 0.3)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '20px 24px',
          textAlign: 'center',
          color: '#fff',
          maxWidth: '360px',
          width: '90%',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c4dff, #00e676)',
            marginBottom: '12px',
            color: '#fff'
          }}>
            <Cloud size={24} />
          </div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 'bold' }}>Синхронизация прогресса</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#ccc', lineHeight: '1.4' }}>
            Найдена метка с другого устройства: <strong style={{ color: '#00e676' }}>{formatTime(remoteBookmark.time)}</strong>
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={applyRemoteBookmark}
              style={{
                background: 'linear-gradient(135deg, #7c4dff, #651fff)',
                border: 'none',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <Check size={16} /> Продолжить
            </button>
            <button
              onClick={() => setShowSyncPrompt(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ccc',
                padding: '10px 14px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                justifyContent: 'center'
              }}
            >
              <RotateCcw size={14} /> С начала
            </button>
          </div>
        </div>
      )}

      {/* Anime4K AI Upscale Active Indicator */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: upscaleEnabled ? 'linear-gradient(135deg, #7c4dff, #00e676)' : 'rgba(0,0,0,0.6)',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backdropFilter: 'blur(8px)'
      }}>
        <Sparkles size={14} />
        {upscaleEnabled ? 'Anime4K AI Upscale ACTIVE (1080P/4K)' : 'Стандартное качество'}
      </div>

      {/* Watch Together Indicator */}
      {watchTogetherActive && (
        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(124, 77, 255, 0.9)',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Users size={14} />
          Совместный просмотр (Синхронно)
        </div>
      )}

      {/* Overlay Player Controls */}
      <div className="player-controls">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <span style={{ fontSize: '13px', color: '#ccc' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Speed Selection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#aaa', marginRight: '4px' }}>Скорость:</span>
            <div className="speed-selector">
              {speedOptions.map((s) => (
                <button
                  key={s}
                  className={`speed-btn ${speed === s ? 'active' : ''}`}
                  onClick={() => handleSpeedSelect(s)}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Quality & Upscale Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              value={quality}
              onChange={(e) => handleSeamlessQualitySwitch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {qualityOptions.map(q => <option key={q} value={q} style={{ background: '#181a22' }}>{q}</option>)}
            </select>

            <button
              onClick={() => setUpscaleEnabled(!upscaleEnabled)}
              title="Переключить AI Улучшение Качества"
              style={{
                background: upscaleEnabled ? '#7c4dff' : 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Zap size={14} /> AI 1080P
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
