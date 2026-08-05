// Cloud Watch Progress Sync Service
// Uses kvdb.io open key-value store or local fallback for pairing code sync

const STORAGE_KEY = 'sync_pairing_code';
const BASE_URL = 'https://kvdb.io/4y9y2g2K9WzS8wZ2V1Y9m1'; // Public bucket namespace

/**
 * Get current pairing code or generate a new 6-digit code
 */
export function getPairingCode() {
  let code = localStorage.getItem(STORAGE_KEY);
  if (!code) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(STORAGE_KEY, code);
  }
  return code;
}

/**
 * Set a new custom pairing code (to link devices)
 */
export function setPairingCode(newCode) {
  const cleanCode = String(newCode).trim();
  if (cleanCode.length === 6 && /^\d+$/.test(cleanCode)) {
    localStorage.setItem(STORAGE_KEY, cleanCode);
    return true;
  }
  return false;
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (n) => String(n).padStart(2, '0');
  
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Send watch progress to Cloud API
 */
export async function sendProgress(animeId, episode, currentTime, duration) {
  const pairingCode = getPairingCode();
  if (!pairingCode || !animeId || currentTime <= 0) return;

  const payload = {
    animeId: String(animeId),
    episode: episode || 1,
    time: Math.floor(currentTime),
    duration: Math.floor(duration || 0),
    updatedAt: Date.now()
  };

  // Save to local cache first
  try {
    localStorage.setItem(`sync_last_${pairingCode}`, JSON.stringify(payload));
  } catch (e) {}

  // Send to Cloud API silently
  try {
    const key = `sync_${pairingCode}_${animeId}_${episode || 1}`;
    await fetch(`${BASE_URL}/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Quiet error handling for network/offline
    console.warn('[SyncService] Quiet send failure:', err.message);
  }
}

/**
 * Fetch watch progress from Cloud API
 */
export async function fetchProgress(animeId, episode) {
  const pairingCode = getPairingCode();
  if (!pairingCode || !animeId) return null;

  const key = `sync_${pairingCode}_${animeId}_${episode || 1}`;

  try {
    const res = await fetch(`${BASE_URL}/${key}?t=${Date.now()}`);
    if (!res.ok) return null;
    const data = await res.json();
    
    // Validate returned payload
    if (data && data.time > 5) {
      return data;
    }
  } catch (err) {
    // Fallback to local storage cache if network failed
    try {
      const cached = localStorage.getItem(`sync_last_${pairingCode}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.animeId === String(animeId) && parsed.time > 5) {
          return parsed;
        }
      }
    } catch (e) {}
  }
  return null;
}
