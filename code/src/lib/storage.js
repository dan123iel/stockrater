// pondex localStorage abstraction
export const KEYS = {
  PROFILE: 'pondex_profile',
  FMP_KEY: 'pondex_fmp_key',
  GROQ_KEY: 'pondex_groq_key',
  PORTFOLIO: 'pondex_portfolio',
  THESES: 'pondex_theses',
  IDEAS_CACHE: 'pondex_ideas_cache',
  CHAT: (ticker) => `pondex_chat_${ticker.toUpperCase()}`,
  ANALYSIS_CACHE: (ticker) => `pondex_analysis_${ticker.toUpperCase()}`,
};

export const get = (key) => { try { const val = localStorage.getItem(key); return val ? JSON.parse(val) : null; } catch { return null; } };
export const set = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
export const remove = (key) => { try { localStorage.removeItem(key); } catch {} };

export const getProfile = () => get(KEYS.PROFILE);
export const setProfile = (profile) => set(KEYS.PROFILE, profile);
export const getFmpKey = () => { try { return localStorage.getItem(KEYS.FMP_KEY) || ''; } catch { return ''; } };
export const setFmpKey = (key) => { try { localStorage.setItem(KEYS.FMP_KEY, key); } catch {} };
export const getGroqKey = () => { try { return localStorage.getItem(KEYS.GROQ_KEY) || ''; } catch { return ''; } };
export const setGroqKey = (key) => { try { localStorage.setItem(KEYS.GROQ_KEY, key); } catch {} };
export const getPortfolio = () => get(KEYS.PORTFOLIO) || [];
export const setPortfolio = (portfolio) => set(KEYS.PORTFOLIO, portfolio);
export const getTheses = () => get(KEYS.THESES) || {};
export const getThesis = (ticker) => { const all = getTheses(); return all[ticker.toUpperCase()] || null; };
export const setThesis = (ticker, thesis) => { const all = getTheses(); all[ticker.toUpperCase()] = thesis; set(KEYS.THESES, all); };
export const getChat = (ticker) => (get(KEYS.CHAT(ticker)) || []).slice(-50);
export const setChat = (ticker, messages) => set(KEYS.CHAT(ticker), messages.slice(-50));
export const getIdeasCache = () => get(KEYS.IDEAS_CACHE);
export const setIdeasCache = (data) => set(KEYS.IDEAS_CACHE, { ...data, lastUpdated: new Date().toISOString() });
