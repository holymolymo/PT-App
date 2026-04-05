// Enhanced Spaced Repetition System
// Inspired by Anki/FSRS with learning steps, lapse tracking, and leech detection
// Replaces basic SM-2 with a more sophisticated scheduling algorithm

'use strict';

const SRS = {
  // Learning steps in minutes (new cards cycle through these before graduating)
  LEARNING_STEPS: [1, 10],
  // Relearning steps in minutes (lapsed cards cycle through these)
  RELEARNING_STEPS: [10],
  // Graduating interval (days) when card finishes learning steps
  GRADUATING_INTERVAL: 1,
  // Easy interval (days) when pressing "easy" on a new card
  EASY_INTERVAL: 4,
  // Minimum interval (days) after a lapse
  MIN_LAPSE_INTERVAL: 1,
  // Lapse interval multiplier (e.g. 0.5 = halve the interval on lapse)
  LAPSE_INTERVAL_MULT: 0.5,
  // Leech threshold (number of lapses before flagging)
  LEECH_THRESHOLD: 8,
  // Maximum interval (days)
  MAX_INTERVAL: 365,
  // Default ease factor for new cards
  DEFAULT_EASE: 2.5,
  // Minimum ease factor
  MIN_EASE: 1.3,
  // Maximum ease factor
  MAX_EASE: 3.5,

  /**
   * Calculate the next review state for a card
   * @param {number} quality - 1=again, 3=hard, 4=good, 5=easy
   * @param {object} state - Current card state (or empty for new card)
   * @returns {object} New card state
   */
  calc(quality, state) {
    const q = Math.max(1, Math.min(5, quality));
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Initialize defaults for new cards
    let {
      phase = 'learning',
      step = 0,
      interval = 0,
      repetitions = 0,
      easeFactor = this.DEFAULT_EASE,
      lapses = 0,
      leech = false
    } = state || {};

    let newState = { phase, step, interval, repetitions, easeFactor, lapses, leech };

    if (phase === 'learning' || phase === 'relearning') {
      newState = this._processLearning(q, newState, phase);
    } else {
      // phase === 'review'
      newState = this._processReview(q, newState);
    }

    // Clamp ease factor
    newState.easeFactor = Math.max(this.MIN_EASE, Math.min(this.MAX_EASE,
      Math.round(newState.easeFactor * 100) / 100));

    // Clamp interval
    newState.interval = Math.min(this.MAX_INTERVAL, Math.max(0, newState.interval));

    // Check leech
    if (newState.lapses >= this.LEECH_THRESHOLD) {
      newState.leech = true;
    }

    // Set scheduling times
    newState.lastReview = today;
    newState.lastQuality = q;

    if (newState.phase === 'learning' || newState.phase === 'relearning') {
      // Schedule by minutes (use ISO timestamp)
      const steps = newState.phase === 'learning' ? this.LEARNING_STEPS : this.RELEARNING_STEPS;
      const stepMinutes = steps[newState.step] || steps[steps.length - 1];
      const dueTime = new Date(now.getTime() + stepMinutes * 60 * 1000);
      newState.dueTime = dueTime.toISOString();
      newState.dueDate = today; // also set dueDate so isDue() works for same-day
    } else {
      // Schedule by days
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + newState.interval);
      newState.dueDate = dueDate.toISOString().split('T')[0];
      newState.dueTime = null;
    }

    return newState;
  },

  /**
   * Process a card in learning or relearning phase
   */
  _processLearning(quality, state, phase) {
    const steps = phase === 'learning' ? this.LEARNING_STEPS : this.RELEARNING_STEPS;
    const s = { ...state };

    if (quality < 3) {
      // Again: reset to first step
      s.step = 0;
    } else if (quality === 5) {
      // Easy: graduate immediately with easy interval
      s.phase = 'review';
      s.interval = phase === 'learning' ? this.EASY_INTERVAL : Math.max(this.MIN_LAPSE_INTERVAL, Math.round(state.interval * this.LAPSE_INTERVAL_MULT));
      s.repetitions = (s.repetitions || 0) + 1;
      s.step = 0;
    } else {
      // Good/Hard: advance to next step
      s.step = (s.step || 0) + 1;
      if (s.step >= steps.length) {
        // Graduate: move to review
        s.phase = 'review';
        if (phase === 'learning') {
          s.interval = this.GRADUATING_INTERVAL;
        } else {
          // Relearning: use reduced previous interval
          s.interval = Math.max(this.MIN_LAPSE_INTERVAL, Math.round(state.interval * this.LAPSE_INTERVAL_MULT));
        }
        s.repetitions = (s.repetitions || 0) + 1;
        s.step = 0;
      }
    }

    return s;
  },

  /**
   * Process a card in review phase
   */
  _processReview(quality, state) {
    const s = { ...state };

    if (quality < 3) {
      // Lapse: card failed review
      s.lapses = (s.lapses || 0) + 1;
      s.phase = 'relearning';
      s.step = 0;
      s.repetitions = 0;
      // Ease factor penalty (less aggressive than basic SM-2)
      s.easeFactor = s.easeFactor - 0.20;
    } else {
      // Passed review
      if (quality === 3) {
        // Hard: multiply by 1.2 (less than ease factor), reduce ease
        s.interval = Math.max(s.interval + 1, Math.round(s.interval * 1.2));
        s.easeFactor = s.easeFactor - 0.15;
      } else if (quality === 4) {
        // Good: standard interval growth
        s.interval = Math.round(s.interval * s.easeFactor);
        // No ease change for "Good"
      } else if (quality === 5) {
        // Easy: larger interval growth, increase ease
        s.interval = Math.round(s.interval * s.easeFactor * 1.3);
        s.easeFactor = s.easeFactor + 0.15;
      }

      // Ensure minimum 1-day growth
      if (s.interval <= state.interval) {
        s.interval = state.interval + 1;
      }

      s.repetitions = (s.repetitions || 0) + 1;

      // Add fuzz for intervals > 2 days to prevent card clustering
      if (s.interval > 2) {
        s.interval = this._fuzzInterval(s.interval);
      }
    }

    return s;
  },

  /**
   * Add ±5% random variance to prevent card clustering
   */
  _fuzzInterval(interval) {
    const fuzz = Math.max(1, Math.round(interval * 0.05));
    const delta = Math.floor(Math.random() * (fuzz * 2 + 1)) - fuzz;
    return Math.max(1, interval + delta);
  },

  /**
   * Check if a card is due for review
   * @param {object} state - Card state
   * @returns {boolean}
   */
  isDue(state) {
    if (!state) return true; // Never reviewed = due

    // Learning/relearning cards: check by timestamp
    if ((state.phase === 'learning' || state.phase === 'relearning') && state.dueTime) {
      return new Date() >= new Date(state.dueTime);
    }

    // Review cards: check by date
    if (!state.dueDate) return true;
    const today = new Date().toISOString().split('T')[0];
    return state.dueDate <= today;
  },

  /**
   * Check if a card is in active learning (not yet graduated to review)
   */
  isLearning(state) {
    return state && (state.phase === 'learning' || state.phase === 'relearning');
  },

  /**
   * Get mastery percentage (0-100)
   * Considers: repetitions, interval, ease factor, and lapses
   */
  masteryScore(state) {
    if (!state || !state.repetitions) return 0;

    // Weight: 40% repetitions, 40% interval, 20% stability (low lapses + high ease)
    const repScore = Math.min(state.repetitions / 5, 1) * 40;
    const intervalScore = Math.min(state.interval / 30, 1) * 40;

    // Stability: penalize high lapse count, reward high ease
    const easePct = (state.easeFactor - this.MIN_EASE) / (this.MAX_EASE - this.MIN_EASE);
    const lapsePenalty = Math.max(0, 1 - (state.lapses || 0) / 10);
    const stabilityScore = ((easePct + lapsePenalty) / 2) * 20;

    return Math.round(repScore + intervalScore + stabilityScore);
  },

  /**
   * Get estimated next review intervals for each button
   * @param {object} state - Current card state
   * @returns {object} { again, hard, good, easy } with human-readable strings
   */
  nextIntervals(state) {
    const s = state || {};
    const phase = s.phase || 'learning';

    if (phase === 'learning' || phase === 'relearning') {
      const steps = phase === 'learning' ? this.LEARNING_STEPS : this.RELEARNING_STEPS;
      const currentStep = s.step || 0;
      return {
        again: this._formatMinutes(steps[0]),
        hard: null, // not shown for learning
        good: currentStep + 1 >= steps.length
          ? this._formatDays(phase === 'learning' ? this.GRADUATING_INTERVAL : Math.max(1, Math.round((s.interval || 1) * this.LAPSE_INTERVAL_MULT)))
          : this._formatMinutes(steps[currentStep + 1] || steps[steps.length - 1]),
        easy: this._formatDays(phase === 'learning' ? this.EASY_INTERVAL : Math.max(1, Math.round((s.interval || 1) * this.LAPSE_INTERVAL_MULT)))
      };
    }

    // Review phase
    const ef = s.easeFactor || this.DEFAULT_EASE;
    const iv = s.interval || 1;
    return {
      again: this._formatMinutes(this.RELEARNING_STEPS[0]),
      hard: this._formatDays(Math.max(iv + 1, Math.round(iv * 1.2))),
      good: this._formatDays(Math.round(iv * ef)),
      easy: this._formatDays(Math.round(iv * ef * 1.3))
    };
  },

  _formatMinutes(m) {
    if (m < 60) return `${m}m`;
    return `${Math.round(m / 60)}h`;
  },

  _formatDays(d) {
    if (d === 1) return '1T';
    if (d < 30) return `${d}T`;
    if (d < 365) return `${Math.round(d / 30)}M`;
    return `${Math.round(d / 365)}J`;
  },

  /**
   * Migrate a card state from old SM-2 format to new SRS format
   * @param {object} oldState - SM-2 card state
   * @returns {object} Enhanced SRS card state
   */
  migrateFromSM2(oldState) {
    if (!oldState) return null;
    // If already migrated, skip
    if (oldState.phase) return oldState;

    return {
      phase: 'review',
      step: 0,
      interval: oldState.interval || 1,
      repetitions: oldState.repetitions || 0,
      easeFactor: oldState.easeFactor || this.DEFAULT_EASE,
      lapses: 0,
      leech: false,
      dueDate: oldState.dueDate || new Date().toISOString().split('T')[0],
      dueTime: null,
      lastReview: oldState.lastReview || new Date().toISOString().split('T')[0],
      lastQuality: oldState.lastQuality || 4
    };
  },

  // Map user button to quality score (kept for backward compatibility)
  buttonToQuality: { again: 1, hard: 3, good: 4, easy: 5 }
};
