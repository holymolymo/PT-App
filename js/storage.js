// LocalStorage Manager
// All data is stored locally under the 'ptapp_' namespace

const DB = {
  PREFIX: 'ptapp_',

  // ── Card SM-2 states ───────────────────────────────────────────────────
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
    return raw ? JSON.parse(raw) : {
      streak: 0,
      lastStudyDate: null,
      totalCardsReviewed: 0,
      totalCorrect: 0,
      currentUnit: 1,
      sessionsCompleted: 0,
      createdAt: new Date().toISOString()
    };
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
    } else if (profile.lastStudyDate !== today) {
      profile.streak = 1; // Reset streak
    }

    profile.lastStudyDate = today;
    this.saveProfile(profile);
    return profile;
  },

  // ── Session history ────────────────────────────────────────────────────
  saveSession(session) {
    const sessions = this.getSessions();
    sessions.unshift({
      ...session,
      date: new Date().toISOString()
    });
    // Keep last 30 sessions
    if (sessions.length > 30) sessions.pop();
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
      totalMastery += SM2.masteryScore(state);
    });

    return Math.round(totalMastery / unitCards.length);
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
