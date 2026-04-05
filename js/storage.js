// LocalStorage Manager
// All data is stored locally under the 'ptapp_' namespace

'use strict';

const DB = {
  PREFIX: 'ptapp_',
  VERSION: 2, // Data schema version

  // ── Initialization & Migration ─────────────────────────────────────────
  init() {
    const storedVersion = parseInt(localStorage.getItem(this.PREFIX + 'version') || '1');
    if (storedVersion < this.VERSION) {
      this._migrate(storedVersion);
      localStorage.setItem(this.PREFIX + 'version', String(this.VERSION));
    }
  },

  _migrate(fromVersion) {
    if (fromVersion < 2) {
      // Migrate SM-2 card states to enhanced SRS format
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.PREFIX + 'card_')) {
          try {
            const state = JSON.parse(localStorage.getItem(key));
            if (state && !state.phase) {
              const migrated = SRS.migrateFromSM2(state);
              localStorage.setItem(key, JSON.stringify(migrated));
            }
          } catch (e) { /* skip corrupt entries */ }
        }
      }

      // Add new profile fields
      const profile = this.getProfile();
      if (!profile.streakFreezes) profile.streakFreezes = 2;
      if (!profile.weeklyGoal) profile.weeklyGoal = 5;
      if (!profile.theme) profile.theme = 'dark';
      this.saveProfile(profile);
    }
  },

  // ── Card SRS states ────────────────────────────────────────────────────
  getCardState(cardId) {
    const raw = localStorage.getItem(this.PREFIX + 'card_' + cardId);
    return raw ? JSON.parse(raw) : null;
  },

  setCardState(cardId, state) {
    localStorage.setItem(this.PREFIX + 'card_' + cardId, JSON.stringify(state));
  },

  getAllCardStates() {
    const states = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX + 'card_')) {
        const id = key.replace(this.PREFIX + 'card_', '');
        states[id] = JSON.parse(localStorage.getItem(key));
      }
    }
    return states;
  },

  // ── User profile ───────────────────────────────────────────────────────
  getProfile() {
    const raw = localStorage.getItem(this.PREFIX + 'profile');
    const defaults = {
      streak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      totalCardsReviewed: 0,
      totalCorrect: 0,
      currentUnit: 1,
      sessionsCompleted: 0,
      streakFreezes: 2,
      weeklyGoal: 5,
      theme: 'dark',
      createdAt: new Date().toISOString()
    };
    if (!raw) return defaults;
    const stored = JSON.parse(raw);
    return { ...defaults, ...stored };
  },

  saveProfile(profile) {
    localStorage.setItem(this.PREFIX + 'profile', JSON.stringify(profile));
  },

  // ── Streak logic ───────────────────────────────────────────────────────
  updateStreak() {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (profile.lastStudyDate === today) {
      return profile; // Already counted today
    }

    if (profile.lastStudyDate === yesterday) {
      profile.streak += 1;
    } else if (profile.lastStudyDate && profile.lastStudyDate < yesterday) {
      // Missed a day — check for streak freeze
      const daysMissed = Math.floor((new Date(today) - new Date(profile.lastStudyDate)) / 86400000) - 1;
      if (daysMissed === 1 && profile.streakFreezes > 0) {
        profile.streakFreezes -= 1;
        profile.streak += 1; // Freeze preserves streak
      } else {
        profile.streak = 1; // Reset streak
      }
    } else {
      profile.streak = 1;
    }

    // Track longest streak
    if (profile.streak > (profile.longestStreak || 0)) {
      profile.longestStreak = profile.streak;
    }

    // Replenish freeze every 7 days
    if (profile.streak > 0 && profile.streak % 7 === 0 && profile.streakFreezes < 3) {
      profile.streakFreezes += 1;
    }

    profile.lastStudyDate = today;
    this.saveProfile(profile);
    return profile;
  },

  // ── Daily stats (for charts) ───────────────────────────────────────────
  saveDailyStats(stats) {
    const today = new Date().toISOString().split('T')[0];
    const key = this.PREFIX + 'daily_' + today;
    const existing = this.getDailyStats(today);
    const merged = {
      correct: (existing.correct || 0) + (stats.correct || 0),
      wrong: (existing.wrong || 0) + (stats.wrong || 0),
      seen: (existing.seen || 0) + (stats.seen || 0),
      newLearned: (existing.newLearned || 0) + (stats.newLearned || 0),
      sessions: (existing.sessions || 0) + 1,
      minutes: (existing.minutes || 0) + (stats.minutes || 0)
    };
    localStorage.setItem(key, JSON.stringify(merged));
  },

  getDailyStats(dateStr) {
    const raw = localStorage.getItem(this.PREFIX + 'daily_' + dateStr);
    return raw ? JSON.parse(raw) : {};
  },

  getDailyStatsRange(days) {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({ date: dateStr, ...this.getDailyStats(dateStr) });
    }
    return result;
  },

  // ── Session history ────────────────────────────────────────────────────
  saveSession(session) {
    const sessions = this.getSessions();
    sessions.unshift({
      ...session,
      date: new Date().toISOString()
    });
    // Keep last 90 sessions
    if (sessions.length > 90) sessions.pop();
    localStorage.setItem(this.PREFIX + 'sessions', JSON.stringify(sessions));
  },

  getSessions() {
    const raw = localStorage.getItem(this.PREFIX + 'sessions');
    return raw ? JSON.parse(raw) : [];
  },

  // ── Unit progress ──────────────────────────────────────────────────────
  getUnitProgress(unitId, allCards) {
    const unitCards = allCards.filter(c => c.unit === unitId);
    if (unitCards.length === 0) return 0;

    let totalMastery = 0;
    unitCards.forEach(card => {
      const state = this.getCardState(card.id);
      totalMastery += SRS.masteryScore(state);
    });

    return Math.round(totalMastery / unitCards.length);
  },

  // ── Study calendar (for streak heatmap) ────────────────────────────────
  getStudyDates(days) {
    const dates = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const stats = this.getDailyStats(dateStr);
      dates[dateStr] = stats.seen || 0;
    }
    return dates;
  },

  // ── Export / Import ────────────────────────────────────────────────────
  exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) {
        data[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(data);
  },

  importData(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      Object.entries(data).forEach(([key, value]) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.setItem(key, value);
        }
      });
      return true;
    } catch {
      return false;
    }
  },

  clearAll() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
  }
};
