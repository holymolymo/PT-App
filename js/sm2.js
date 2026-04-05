// SM-2 Spaced Repetition Algorithm
// Based on SuperMemo SM-2 by Piotr Wozniak

const SM2 = {
  // Calculate next review based on quality rating
  // quality: 0 = blackout, 1 = wrong, 2 = wrong but familiar,
  //          3 = correct with difficulty, 4 = correct, 5 = perfect
  calc(quality, state) {
    const q = Math.max(0, Math.min(5, quality));
    let { interval = 0, repetitions = 0, easeFactor = 2.5 } = state || {};

    if (q < 3) {
      // Failed – reset
      interval = 1;
      repetitions = 0;
    } else {
      // Passed
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
    if (easeFactor > 4.0) easeFactor = 4.0;

    // Calculate due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);

    return {
      interval,
      repetitions,
      easeFactor: Math.round(easeFactor * 100) / 100,
      dueDate: dueDate.toISOString().split('T')[0],
      lastReview: new Date().toISOString().split('T')[0],
      lastQuality: q
    };
  },

  // Check if a card is due for review today
  isDue(state) {
    if (!state || !state.dueDate) return true; // Never reviewed = due
    const today = new Date().toISOString().split('T')[0];
    return state.dueDate <= today;
  },

  // Get mastery percentage (0-100)
  // A card is "mastered" when: repetitions >= 3 AND interval >= 21
  masteryScore(state) {
    if (!state || state.repetitions === 0) return 0;
    const repScore = Math.min(state.repetitions / 5, 1) * 50;
    const intervalScore = Math.min(state.interval / 30, 1) * 50;
    return Math.round(repScore + intervalScore);
  },

  // Map user button to quality score
  // 'again' = 1, 'hard' = 3, 'good' = 4, 'easy' = 5
  buttonToQuality: { again: 1, hard: 3, good: 4, easy: 5 }
};
