// Aprender Português — Main App Logic
'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// PRONUNCIATION HINTS — for difficult EP words
// ══════════════════════════════════════════════════════════════════════════════

const PRON_HINTS = {
  'não':'[nãw̃]','sim':'[sĩ]','obrigado':'[obriˈgadu]','obrigada':'[obriˈgadɐ]',
  'desculpe':'[dɨʃˈkulpɨ]','bom dia':'[bõ ˈdiɐ]','boa tarde':'[boɐ ˈtardɨ]',
  'boa noite':'[boɐ ˈnojtɨ]','por favor':'[pur fɐˈvor]','água':'[ˈagwɐ]',
  'trabalho':'[trɐˈbaʎu]','filho':'[ˈfiʎu]','vinho':'[ˈviɲu]','amanhã':'[ɐmɐˈɲã]',
  'também':'[tɐ̃ˈbɐ̃j̃]','pão':'[pãw̃]','mão':'[mãw̃]','irmão':'[irˈmãw̃]',
  'coração':'[kurɐˈsãw̃]','informação':'[ĩfurmɐˈsãw̃]','estação':'[ɨʃtɐˈsãw̃]',
  'telemóvel':'[tɛlɨˈmɔvɛl]','autocarro':'[awtɔˈkaru]','pequeno-almoço':'[pɨˈkenu alˈmosu]',
  'casa de banho':'[ˈkazɐ dɨ ˈbaɲu]','saudade':'[sawˈdadɨ]',
  'chave':'[ˈʃavɨ]','conhecer':'[kuɲɨˈser]','exercício':'[ezɨrˈsisju]',
  'cozinha':'[kuˈziɲɐ]','hoje':'[ˈoʒɨ]','gente':'[ˈʒẽtɨ]',
  'lhe':'[ʎɨ]','senhor':'[sɨˈɲor]','senhora':'[sɨˈɲorɐ]',
  'ontem':'[ˈõtɐ̃j̃]','homem':'[ˈɔmɐ̃j̃]','viagem':'[viˈaʒɐ̃j̃]',
  'começar':'[kumɨˈsar]','esquecer':'[ɨʃkɨˈser]','querer':'[kɨˈrer]',
  'perceber':'[pɨrsɨˈber]','dizer':'[diˈzer]','fazer':'[fɐˈzer]',
};

// ══════════════════════════════════════════════════════════════════════════════
// CARD ENGINE — Build flat card list from lesson + extra data
// ══════════════════════════════════════════════════════════════════════════════

const CardEngine = {
  _cache: null,

  // Build all cards from all data sources
  buildAll() {
    if (this._cache) return this._cache;
    const cards = [];

    // From book lessons
    LESSONS.forEach(lesson => {
      // Vocabulary cards
      (lesson.vocabulary || []).forEach(v => {
        // PT → DE
        cards.push({
          id: v.id + '_ptde',
          unit: lesson.id,
          source: 'book',
          type: 'vocab',
          dir: 'pt-de',
          question: v.pt,
          answer: v.de,
          hint: v.cat,
          explanation: v.expl || null,
          raw: v
        });
        // DE → PT
        cards.push({
          id: v.id + '_dept',
          unit: lesson.id,
          source: 'book',
          type: 'vocab',
          dir: 'de-pt',
          question: v.de,
          answer: v.pt,
          hint: v.cat,
          explanation: v.expl || null,
          raw: v
        });
      });

      // Phrase cards
      (lesson.phrases || []).forEach(p => {
        cards.push({
          id: p.id + '_ptde',
          unit: lesson.id,
          source: 'book',
          type: 'phrase',
          dir: 'pt-de',
          question: p.pt,
          answer: p.de,
          explanation: p.expl || null,
          raw: p
        });
        cards.push({
          id: p.id + '_dept',
          unit: lesson.id,
          source: 'book',
          type: 'phrase',
          dir: 'de-pt',
          question: p.de,
          answer: p.pt,
          explanation: p.expl || null,
          raw: p
        });
      });

      // Grammar/conjugation cards
      (lesson.grammar || []).forEach(g => {
        if (g.type === 'conjugation') {
          const pronouns = Object.keys(g.forms);
          pronouns.forEach(pronoun => {
            cards.push({
              id: g.id + '_' + pronoun.replace(/\//g, ''),
              unit: lesson.id,
              source: 'book',
              type: 'conjugation',
              verb: g.verb,
              tense: g.tense,
              pronoun,
              question: `${g.verb} → ${pronoun}`,
              answer: g.forms[pronoun],
              tenseLabel: this._tenseLabel(g.tense),
              explanation: g.note || null,
              raw: g
            });
          });
        } else if (g.type === 'rule') {
          cards.push({
            id: g.id,
            unit: lesson.id,
            source: 'book',
            type: 'rule',
            question: g.title,
            answer: g.rule,
            examples: g.examples || [],
            explanation: g.note || null,
            raw: g
          });
        }
      });
    });

    // Extra vocab (not in book units — unit 0 = extra)
    (EXTRA_VOCAB || []).forEach(v => {
      cards.push({
        id: v.id + '_ptde',
        unit: 0, source: 'extra', type: 'vocab', dir: 'pt-de',
        question: v.pt, answer: v.de, hint: v.cat,
        explanation: v.note || null, raw: v
      });
      cards.push({
        id: v.id + '_dept',
        unit: 0, source: 'extra', type: 'vocab', dir: 'de-pt',
        question: v.de, answer: v.pt, hint: v.cat,
        explanation: v.note || null, raw: v
      });
    });

    // Extra phrases
    (EXTRA_PHRASES || []).forEach(p => {
      cards.push({
        id: p.id + '_ptde',
        unit: 0,
        source: 'extra',
        type: 'phrase',
        dir: 'pt-de',
        question: p.pt,
        answer: p.de,
        context: p.ctx,
        raw: p
      });
      cards.push({
        id: p.id + '_dept',
        unit: 0,
        source: 'extra',
        type: 'phrase',
        dir: 'de-pt',
        question: p.de,
        answer: p.pt,
        context: p.ctx,
        raw: p
      });
    });

    // Extra verbs — conjugation cards (presente only for integration)
    (EXTRA_VERBS || []).forEach(v => {
      const tenses = ['presente', 'perfeito', 'imperfeito'];
      tenses.forEach(t => {
        if (!v[t]) return;
        Object.keys(v[t]).forEach(pronoun => {
          const existingId = `ev${v.id.replace('ev','')}_${t}_${pronoun.replace(/\//g,'')}`;
          // Only add if not already in lessons
          cards.push({
            id: 'xv_' + v.id + '_' + t + '_' + pronoun.replace(/[ /]/g,''),
            unit: 0,
            source: 'extra',
            type: 'conjugation',
            verb: v.inf,
            tense: t,
            pronoun,
            question: `${v.inf} → ${pronoun}`,
            answer: v[t][pronoun],
            tenseLabel: this._tenseLabel(t),
            explanation: v.note || null,
            raw: v
          });
        });
      });
    });

    // From topic modules
    (typeof MODULES !== 'undefined' ? MODULES : []).forEach(mod => {
      (mod.vocabulary || []).forEach(v => {
        // PT → DE
        cards.push({
          id: v.id + '_ptde', unit: mod.id, source: 'module', type: 'vocab', dir: 'pt-de',
          question: v.pt, answer: v.de, hint: v.cat,
          explanation: null, cefr: v.cefr, freq: v.freq, raw: v
        });
        // DE → PT
        cards.push({
          id: v.id + '_dept', unit: mod.id, source: 'module', type: 'vocab', dir: 'de-pt',
          question: v.de, answer: v.pt, hint: v.cat,
          explanation: null, cefr: v.cefr, freq: v.freq, raw: v
        });
        // Context cards (fill-in-the-blank)
        if (v.contexts) {
          v.contexts.forEach((ctx, ci) => {
            const blank = ctx.replace(new RegExp(v.pt.split('/')[0].trim().split(' ').sort((a,b)=>b.length-a.length)[0], 'i'), '___');
            if (blank !== ctx) {
              cards.push({
                id: v.id + '_ctx' + ci, unit: mod.id, source: 'module', type: 'context',
                question: blank, answer: v.pt, hint: v.cat,
                explanation: `Vollständig: ${ctx}`, cefr: v.cefr, freq: v.freq,
                contextSentence: ctx, raw: v
              });
            }
          });
        }
      });

      (mod.phrases || []).forEach(p => {
        cards.push({
          id: p.id + '_ptde', unit: mod.id, source: 'module', type: 'phrase', dir: 'pt-de',
          question: p.pt, answer: p.de, explanation: null, raw: p
        });
        cards.push({
          id: p.id + '_dept', unit: mod.id, source: 'module', type: 'phrase', dir: 'de-pt',
          question: p.de, answer: p.pt, explanation: null, raw: p
        });
      });

      (mod.grammar || []).forEach(g => {
        if (g.type === 'conjugation') {
          Object.keys(g.forms).forEach(pronoun => {
            cards.push({
              id: g.id + '_' + pronoun.replace(/\//g, ''),
              unit: mod.id, source: 'module', type: 'conjugation',
              verb: g.verb, tense: g.tense, pronoun,
              question: `${g.verb} → ${pronoun}`, answer: g.forms[pronoun],
              tenseLabel: this._tenseLabel(g.tense), explanation: g.note || null, raw: g
            });
          });
        } else if (g.type === 'rule') {
          cards.push({
            id: g.id, unit: mod.id, source: 'module', type: 'rule',
            question: g.title, answer: g.rule,
            examples: g.examples || [], explanation: g.note || null, raw: g
          });
        }
      });
    });

    this._cache = cards;
    return cards;
  },

  _tenseLabel(t) {
    return {
      presente: 'Präsens',
      perfeito: 'Perfekt',
      imperfeito: 'Imperfekt',
      futuro_ir: 'Zukunft (ir+Inf.)'
    }[t] || t;
  },

  // Get cards for a specific unit
  forUnit(unitId) {
    return this.buildAll().filter(c => c.unit === unitId);
  },

  // Get cards due for review today
  getDueCards(maxCount = 20) {
    const all = this.buildAll();
    const due = all.filter(c => {
      if (c.source === 'extra' && !this._isExtraUnlocked(c)) return false;
      // Skip cards from locked modules
      if (c.source === 'module' && !this._isModuleUnlocked(c.unit)) return false;
      const state = DB.getCardState(c.id);
      return SRS.isDue(state) && state !== null; // only previously seen cards
    });
    return this._shuffle(due).slice(0, maxCount);
  },

  // Get cards currently in learning/relearning phase (short intervals)
  getLearningCards(maxCount = 10) {
    const all = this.buildAll();
    const learning = all.filter(c => {
      const state = DB.getCardState(c.id);
      if (!state) return false;
      if (c.source === 'extra' && !this._isExtraUnlocked(c)) return false;
      if (c.source === 'module' && !this._isModuleUnlocked(c.unit)) return false;
      return SRS.isLearning(state) && SRS.isDue(state);
    });
    return this._shuffle(learning).slice(0, maxCount);
  },

  // Get "young" cards — seen but with low mastery, for reinforcement
  getYoungCards(unitId, maxCount = 8) {
    const unitCards = this.forUnit(unitId);
    const young = unitCards.filter(c => {
      const state = DB.getCardState(c.id);
      if (!state) return false;
      // Cards with low mastery (< 40%) and not currently due
      const mastery = SRS.masteryScore(state);
      return mastery < 40 && mastery > 0 && !SRS.isDue(state);
    });
    return this._shuffle(young).slice(0, maxCount);
  },

  // Get new cards from the current unit with smart interleaving
  getNewCards(unitId, maxCount = 15) {
    const unitCards = this.forUnit(unitId);
    let unseen = unitCards.filter(c => DB.getCardState(c.id) === null);

    // Lesson sessions are pure — no module cards mixed in.
    // Modules are studied separately via the Learn tab module selector.

    // Smart interleaving: group by type, then alternate
    const buckets = {
      vocab: unseen.filter(c => c.type === 'vocab'),
      phrase: unseen.filter(c => c.type === 'phrase'),
      grammar: unseen.filter(c => c.type === 'conjugation' || c.type === 'rule'),
      context: unseen.filter(c => c.type === 'context')
    };

    const result = [];
    let lastType = null;
    let sameTypeCount = 0;
    const typeOrder = ['vocab', 'grammar', 'phrase', 'context', 'vocab', 'vocab', 'grammar'];
    let typeIdx = 0;

    while (result.length < maxCount) {
      // Pick next type from rotation
      let picked = false;
      for (let attempts = 0; attempts < 4; attempts++) {
        const type = typeOrder[(typeIdx + attempts) % typeOrder.length];
        if (buckets[type] && buckets[type].length > 0) {
          // Direction alternation for vocab: avoid same direction in a row
          let card;
          if (type === 'vocab' && result.length > 0) {
            const lastDir = result[result.length - 1].dir;
            const opposite = buckets[type].find(c => c.dir !== lastDir);
            card = opposite || buckets[type][0];
            buckets[type] = buckets[type].filter(c => c !== card);
          } else {
            card = buckets[type].shift();
          }

          // Max 3 same-type in a row
          if (card.type === lastType) {
            sameTypeCount++;
            if (sameTypeCount >= 3) { typeIdx++; continue; }
          } else {
            sameTypeCount = 1;
            lastType = card.type;
          }

          result.push(card);
          picked = true;
          typeIdx++;
          break;
        }
        typeIdx++;
      }
      if (!picked) break; // All buckets empty
    }

    return result.slice(0, maxCount);
  },

  // Determine current learning unit
  getCurrentUnit() {
    const profile = DB.getProfile();
    return profile.currentUnit || 1;
  },

  // Check if unit should be unlocked (previous unit ≥ 80% mastered)
  checkUnlocks() {
    const all = this.buildAll();
    // Book lessons: sequential unlock at 80%
    LESSONS.forEach((lesson, i) => {
      if (i === 0) return;
      const prevUnit = LESSONS[i - 1];
      const progress = DB.getUnitProgress(prevUnit.id, all);
      if (progress >= 80) lesson.unlocked = true;
    });
    // Modules: unlock based on prerequisite unit progress
    if (typeof MODULES !== 'undefined') {
      MODULES.forEach(mod => {
        if (mod.prereqUnit === null || mod.prereqUnit === undefined) {
          mod.unlocked = true; // No prereq = always unlocked (Module 1)
          return;
        }
        const progress = DB.getUnitProgress(mod.prereqUnit, all);
        mod.unlocked = progress >= (mod.prereqPct || 50);
      });
    }
  },

  _isModuleUnlocked(moduleId) {
    if (typeof MODULES === 'undefined') return false;
    const mod = MODULES.find(m => m.id === moduleId);
    return mod ? mod.unlocked : false;
  },

  _isExtraUnlocked(card) {
    // Extra cards unlock when unit 3+ is started
    const profile = DB.getProfile();
    return profile.currentUnit >= 3;
  },

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // Generate multiple choice options (3 wrong + 1 correct)
  getChoices(card) {
    const all = this.buildAll();
    const correct = card.answer;
    const pool = all
      .filter(c => c.type === card.type && c.id !== card.id && c.answer !== correct)
      .map(c => c.answer);
    const shuffledPool = this._shuffle(pool);
    const wrongs = [...new Set(shuffledPool)].slice(0, 3);
    while (wrongs.length < 3) wrongs.push('—');
    const options = this._shuffle([correct, ...wrongs]);
    return options;
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// SESSION — Manages a single 30-min learning session
// ══════════════════════════════════════════════════════════════════════════════

const Session = {
  phase: null,       // 'review' | 'new' | 'summary'
  queue: [],
  currentIdx: 0,
  stats: { correct: 0, wrong: 0, seen: 0 },
  phaseStats: { review: { correct:0, wrong:0 }, new: { correct:0, wrong:0 } },
  startTime: null,
  _recentResults: [],  // Rolling accuracy tracker (last 10)

  start() {
    this._moduleId = null;
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this._recentResults = [];
    this.startTime = Date.now();
    DB.updateStreak();
    this._startReviewPhase();
  },

  startModule(moduleId) {
    this._moduleId = moduleId;
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this._recentResults = [];
    this.startTime = Date.now();
    DB.updateStreak();
    // Module sessions: review due module cards first, then new cards
    this.phase = 'new';
    let newCards = CardEngine.getNewCards(moduleId, 15);
    // If few unseen cards, add young cards for reinforcement
    if (newCards.length < 5) {
      const youngCards = CardEngine.getYoungCards(moduleId, 15 - newCards.length);
      newCards = [...newCards, ...youngCards];
    }
    // Also prepend any due review cards from this module
    const moduleDue = CardEngine.buildAll().filter(c => {
      if (c.unit !== moduleId) return false;
      const state = DB.getCardState(c.id);
      return state && SRS.isDue(state);
    });
    const combined = [...CardEngine._shuffle(moduleDue).slice(0, 10), ...newCards];
    const seen = new Set();
    this.queue = combined.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; });
    this.currentIdx = 0;
    if (this.queue.length === 0) {
      this._startSummary();
      return;
    }
    const mod = MODULES.find(m => m.id === moduleId);
    UI.showPhase('new', newCards.length, mod ? mod.title : '');
  },

  _startReviewPhase() {
    this.phase = 'review';
    // Get due review cards + learning cards (short intervals)
    const dueCards = CardEngine.getDueCards(20);
    const learningCards = CardEngine.getLearningCards(10);
    const combined = [...learningCards, ...dueCards];
    // Deduplicate
    const seen = new Set();
    this.queue = combined.filter(c => { if (seen.has(c.id)) return false; seen.add(c.id); return true; });
    this.currentIdx = 0;
    if (this.queue.length === 0) {
      this._startNewPhase();
      return;
    }
    UI.showPhase('review', this.queue.length);
  },

  _startNewPhase() {
    this.phase = 'new';
    const unitId = this._moduleId || CardEngine.getCurrentUnit();
    let newCards = CardEngine.getNewCards(unitId, 12);

    // If no unseen cards left in this unit, try to pull "young" cards
    // (cards seen but with low mastery) for reinforcement
    if (newCards.length < 5) {
      const youngCards = CardEngine.getYoungCards(unitId, 12 - newCards.length);
      newCards = [...newCards, ...youngCards];
    }

    this.queue = newCards;
    this.currentIdx = 0;
    if (newCards.length === 0) {
      this._startSummary();
      return;
    }
    UI.showPhase('new', newCards.length);
  },

  _startSummary() {
    this.phase = 'summary';
    const duration = Math.round((Date.now() - this.startTime) / 1000 / 60);
    const sessionData = {
      stats: this.stats,
      phaseStats: this.phaseStats,
      duration,
      unit: CardEngine.getCurrentUnit()
    };
    DB.saveSession(sessionData);

    // Save daily stats for charts
    DB.saveDailyStats({
      correct: this.stats.correct,
      wrong: this.stats.wrong,
      seen: this.stats.seen,
      newLearned: this.phaseStats.new.correct + this.phaseStats.new.wrong,
      minutes: duration
    });

    // Update profile
    const profile = DB.getProfile();
    profile.totalCardsReviewed += this.stats.seen;
    profile.totalCorrect += this.stats.correct;
    profile.sessionsCompleted += 1;
    DB.saveProfile(profile);

    UI.showSummary(sessionData);
  },

  _showCard() {
    if (this.currentIdx >= this.queue.length) {
      if (this.phase === 'review') {
        UI.showPhaseTransition('new');
      } else {
        this._startSummary();
      }
      return;
    }
    const card = this.queue[this.currentIdx];
    const progress = { current: this.currentIdx + 1, total: this.queue.length };
    UI.showCard(card, progress);
  },

  // Called when user answers a card
  answer(card, quality) {
    const state = DB.getCardState(card.id) || {};
    const newState = SRS.calc(quality, state);
    DB.setCardState(card.id, newState);

    const correct = quality >= 3;
    this.stats.seen++;
    if (correct) this.stats.correct++; else this.stats.wrong++;
    this.phaseStats[this.phase][correct ? 'correct' : 'wrong']++;

    // Rolling accuracy tracker (last 10)
    this._recentResults.push(correct ? 1 : 0);
    if (this._recentResults.length > 10) this._recentResults.shift();

    // If wrong, re-add card to end of queue (once)
    if (!correct && !card._retried) {
      const retry = { ...card, _retried: true };
      this.queue.push(retry);
    }

    // Adaptive: if accuracy drops below 65%, inject easier review cards
    if (this.phase === 'new' && this._recentResults.length >= 5) {
      const recentPct = this._recentResults.reduce((a,b) => a+b, 0) / this._recentResults.length;
      if (recentPct < 0.65 && !card._easyInserted) {
        // Insert an easy review card (already mastered) to boost confidence
        const easyCards = CardEngine.buildAll().filter(c => {
          const s = DB.getCardState(c.id);
          return s && s.repetitions >= 2 && s.lastQuality >= 4 && c.type === 'vocab';
        });
        if (easyCards.length > 0) {
          const easy = CardEngine._shuffle(easyCards)[0];
          easy._easyInserted = true;
          this.queue.splice(this.currentIdx + 1, 0, easy);
        }
      }
    }

    this.currentIdx++;
    this._showCard();
  },

  // Skip to summary
  end() {
    this._startSummary();
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// UI — Renders all screens and cards
// ══════════════════════════════════════════════════════════════════════════════

const UI = {
  currentScreen: 'home',

  // ── Navigation ────────────────────────────────────────────────────────
  navigateTo(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-' + screen).classList.add('active');
    document.querySelector(`[data-screen="${screen}"]`)?.classList.add('active');
    this.currentScreen = screen;

    if (screen === 'home') this.renderHome();
    if (screen === 'progress') this.renderProgress();
    if (screen === 'settings') this.renderSettings();
  },

  // ── Home Screen ────────────────────────────────────────────────────────
  renderHome() {
    CardEngine.checkUnlocks();
    const profile = DB.getProfile();
    const all = CardEngine.buildAll();
    const due = all.filter(c => {
      const state = DB.getCardState(c.id);
      return SRS.isDue(state) && state !== null;
    }).length;
    const seen = all.filter(c => DB.getCardState(c.id) !== null).length;
    const unitId = CardEngine.getCurrentUnit();
    const lesson = LESSONS.find(l => l.id === unitId);
    const unitProgress = DB.getUnitProgress(unitId, all);

    const el = document.getElementById('home-content');
    const today = new Date().toLocaleDateString('de-DE', {weekday:'long', day:'numeric', month:'long'});
    el.innerHTML = `
      <div class="home-header">
        <div class="greeting">${this._greeting()}</div>
        <div class="date-label">${today}</div>
      </div>

      <div class="streak-card card">
        <div class="streak-icon">🔥</div>
        <div class="streak-info">
          <div class="streak-num">${profile.streak}</div>
          <div class="streak-label">Tage in Folge</div>
        </div>
        <div class="streak-stats">
          <div class="mini-stat"><span>${seen}</span><span>gelernt</span></div>
          <div class="mini-stat"><span>${due}</span><span>fällig</span></div>
        </div>
      </div>

      <div class="unit-card card">
        <div class="unit-badge" style="background:${lesson?.color||'#006B3C'}">
          Lektion ${unitId}
        </div>
        <div class="unit-info">
          <div class="unit-title">${lesson?.title || '—'}</div>
          <div class="unit-sub">${lesson?.subtitle || ''}</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" style="width:${unitProgress}%;background:${lesson?.color||'#006B3C'}"></div>
          </div>
          <div class="progress-pct">${unitProgress}% beherrscht</div>
        </div>
      </div>

      ${due > 0 ? `<div class="due-banner card"><span>📅</span><span><b>${due} Karten</b> zur Wiederholung fällig</span></div>` : ''}

      ${seen === 0 ? `
        <button class="btn-primary start-session-btn" onclick="App.startModuleSession('m1')" style="background:linear-gradient(135deg,#006B3C,#00914f)">
          Erste Schritte starten →
        </button>
        <div class="quick-tips card" style="font-size:13px;color:var(--text2)">
          Tipp: Starte mit den wichtigsten Überlebens-Phrasen, bevor du in die Lektionen eintauchst!
        </div>
      ` : `
        <button class="btn-primary start-session-btn" onclick="App.startSession()">
          Heute lernen →
        </button>
      `}

      <div class="quick-tips card">
        <div class="tip-title">Tipp des Tages</div>
        <div class="tip-text">${this._dailyTip()}</div>
      </div>
    `;
  },

  _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia! 👋';
    if (h < 18) return 'Boa tarde! 👋';
    return 'Boa noite! 👋';
  },

  _dailyTip() {
    const tips = [
      'Im Europäischen Portugiesisch sagt man <b>autocarro</b> statt ônibus, und <b>telemóvel</b> statt celular.',
      'Das reflexive Verb <b>chamar-se</b> bedeutet wörtlich "sich nennen". Eu chamo-me Ana = Ich nenne mich Ana.',
      '<b>obrigado</b> (Männer) vs. <b>obrigada</b> (Frauen) – das sagt die sprechende Person nach ihrem eigenen Geschlecht!',
      'Im Europäischen Portugiesisch verwendet man <b>estar a + Infinitiv</b> für "gerade tun" – Estou a comer = Ich esse gerade.',
      'Die Zahlen 16-19 heißen auf Europäisch-Portugiesisch <b>dezasseis, dezassete, dezoito, dezanove</b> (nicht "dezesseis"!).',
      '<b>Saudade</b> – das einzigartige portugiesische Wort für eine Art wehmütiger Sehnsucht nach etwas oder jemandem.',
      'Beim Einkaufen: <b>Faz favor</b> um jemanden anzusprechen – höflicher als "hé".',
      'Die Vergangenheitsform <b>fui</b> ist BEIDE Verben: von ser (ich war) UND von ir (ich ging). Kontext entscheidet!',
    ];
    const day = new Date().getDate();
    return tips[day % tips.length];
  },

  // ── Session UI ─────────────────────────────────────────────────────────
  showPhase(phase, totalCards, customTitle) {
    const labels = {
      review: { title:'Wiederholung', icon:'🔄', desc:`${totalCards} fällige Karten auffrischen` },
      new:    { title: customTitle || 'Neuer Stoff', icon:'✨', desc: customTitle ? `${totalCards} Karten aus diesem Modul` : `Neue Inhalte aus der aktuellen Lektion` }
    };
    const l = labels[phase];
    const el = document.getElementById('learn-content');
    el.innerHTML = `
      <div class="phase-intro">
        <div class="phase-icon">${l.icon}</div>
        <h2>${l.title}</h2>
        <p>${l.desc}</p>
        <div class="phase-indicator">
          <span class="${phase==='review'?'active':''}">🔄 Wiederholung</span>
          <span class="${phase==='new'?'active':''}">✨ Neuer Stoff</span>
          <span>📊 Auswertung</span>
        </div>
        <button class="btn-primary" onclick="Session._showCard()">Los geht's!</button>
      </div>
    `;
  },

  showPhaseTransition(nextPhase) {
    const el = document.getElementById('learn-content');
    const stats = Session.phaseStats.review;
    const pct = stats.correct + stats.wrong > 0
      ? Math.round(stats.correct / (stats.correct + stats.wrong) * 100) : 0;
    el.innerHTML = `
      <div class="phase-transition">
        <div class="phase-icon">✅</div>
        <h2>Wiederholung abgeschlossen!</h2>
        <div class="result-circle ${pct>=70?'green':pct>=40?'orange':'red'}">${pct}%</div>
        <p>${stats.correct} richtig, ${stats.wrong} falsch</p>
        <p class="motivate">${this._motivate(pct)}</p>
        <button class="btn-primary" onclick="Session._startNewPhase()">Weiter zu: Neuer Stoff ✨</button>
      </div>
    `;
  },

  showCard(card, progress) {
    const el = document.getElementById('learn-content');
    const isConj = card.type === 'conjugation';
    const isRule = card.type === 'rule';
    const pct = Math.round((progress.current - 1) / progress.total * 100);

    const isContext = card.type === 'context';

    let questionHTML = '';
    if (isConj) {
      questionHTML = `
        <div class="card-label">Konjugiere auf Portugiesisch</div>
        <div class="card-tense-badge">${card.tenseLabel}</div>
        <div class="card-verb">${card.verb}</div>
        <div class="card-pronoun">${card.pronoun} →</div>
      `;
    } else if (isRule) {
      // Grammar rules shown as study cards with examples — learner rates understanding
      const exHTML = card.examples ? card.examples.slice(0,3).map(e => `<div class="rule-example">${e}</div>`).join('') : '';
      questionHTML = `
        <div class="card-label">Grammatik</div>
        <div class="card-question-text" style="font-size:20px">${card.question}</div>
        <div class="rule-content">${card.answer}</div>
        ${exHTML ? `<div class="rule-examples">${exHTML}</div>` : ''}
        ${card.explanation ? `<div class="rule-note">${card.explanation}</div>` : ''}
      `;
    } else if (isContext) {
      questionHTML = `
        <div class="card-label">Ergänze das fehlende Wort</div>
        ${card.hint ? `<div class="card-cat-badge">${card.hint}</div>` : ''}
        <div class="card-question-text">${card.question}</div>
      `;
    } else {
      const isDE = card.dir === 'de-pt';
      const pronHint = !isDE ? this._getPronHint(card.question) : '';
      questionHTML = `
        <div class="card-label">${isDE ? 'Auf Portugiesisch:' : 'Was bedeutet:'}</div>
        ${card.hint ? `<div class="card-cat-badge">${card.hint}</div>` : ''}
        <div class="card-question-text">${card.question}</div>
        ${pronHint ? `<div class="pron-hint">${pronHint}</div>` : ''}
      `;
    }

    // Use multiple choice for vocab/phrases, free input for conjugation/context
    // Rule cards use self-rating (study card pattern)
    let answerHTML = '';
    if (isRule) {
      answerHTML = `
        <div class="rule-rating">
          <div class="rule-rating-prompt">Wie gut hast du diese Regel verstanden?</div>
          <div class="rating-buttons">
            <button class="rating-btn rating-again" onclick="Session.answer(Session.queue[Session.currentIdx], 1)">
              <span class="rating-label">Nochmal</span><span class="rating-interval">Wiederhole</span>
            </button>
            <button class="rating-btn rating-good" onclick="Session.answer(Session.queue[Session.currentIdx], 4)">
              <span class="rating-label">Verstanden</span><span class="rating-interval">Weiter</span>
            </button>
            <button class="rating-btn rating-easy" onclick="Session.answer(Session.queue[Session.currentIdx], 5)">
              <span class="rating-label">Kann ich!</span><span class="rating-interval">Selten zeigen</span>
            </button>
          </div>
        </div>
      `;
    } else if (isConj || isContext) {
      answerHTML = `
        <div class="answer-input-wrap">
          <input type="text" id="card-input" class="card-input"
            placeholder="${isConj ? 'Form eingeben…' : isContext ? 'Fehlendes Wort…' : 'Antwort eingeben…'}"
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            onkeydown="if(event.key==='Enter') UI.checkInput()">
          <button class="btn-check" onclick="UI.checkInput()">Prüfen</button>
        </div>
      `;
    } else {
      const choices = CardEngine.getChoices(card);
      answerHTML = `
        <div class="choices">
          ${choices.map((c, i) => `
            <button class="choice-btn" onclick="UI.selectChoice(this, '${this._esc(c)}', '${this._esc(card.answer)}')">${c}</button>
          `).join('')}
        </div>
      `;
    }

    el.innerHTML = `
      <div class="card-header">
        <div class="card-progress-bar">
          <div class="card-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="card-counter">${progress.current} / ${progress.total}</div>
        <button class="btn-end-session" onclick="UI.confirmEndSession()">✕</button>
      </div>
      <div class="card-wrap" id="card-wrap">
        <div class="card card-face">
          ${questionHTML}
        </div>
        ${answerHTML}
      </div>
    `;

    // Auto-focus input if text mode
    if (isConj || isRule) {
      setTimeout(() => document.getElementById('card-input')?.focus(), 100);
    }
  },

  checkInput() {
    const input = document.getElementById('card-input');
    if (!input) return;
    const userAnswer = input.value.trim();
    const card = Session.queue[Session.currentIdx];
    const correct = card.answer;
    const isCorrect = userAnswer.toLowerCase() === correct.toLowerCase() ||
      this._normalize(userAnswer) === this._normalize(correct);
    // Store user answer for feedback display
    card._userAnswer = userAnswer;
    // Check for near-miss (accent/case only)
    if (!isCorrect && this._normalize(userAnswer) === this._normalize(correct)) {
      card._nearMiss = 'accent'; // Only accents wrong
    }
    this._showFeedback(card, isCorrect, isCorrect ? 4 : 1);
  },

  selectChoice(btn, chosen, correct) {
    const card = Session.queue[Session.currentIdx];
    const isCorrect = chosen === correct;
    document.querySelectorAll('.choice-btn').forEach(b => {
      b.disabled = true;
      if (b.textContent === correct) b.classList.add('correct');
      else if (b === btn && !isCorrect) b.classList.add('wrong');
    });
    setTimeout(() => this._showFeedback(card, isCorrect, isCorrect ? 4 : 1), 400);
  },

  _showFeedback(card, isCorrect, quality) {
    const el = document.getElementById('learn-content');
    const emoji = isCorrect
      ? ['🎉','✅','⭐','🙌','🔥'][Math.floor(Math.random()*5)]
      : '💪';
    const msg = isCorrect
      ? ['Super!','Sehr gut!','Genau richtig!','Das sitzt!','Perfekt!'][Math.floor(Math.random()*5)]
      : 'Fast!';

    // Build user-answer diff for wrong text inputs
    let userAnswerHTML = '';
    if (!isCorrect && card._userAnswer) {
      const diff = this._diffAnswer(card._userAnswer, card.answer);
      userAnswerHTML = `<div class="feedback-user-answer">
        <span class="feedback-user-label">Deine Antwort:</span>
        <span class="feedback-user-text">${diff}</span>
      </div>`;
    }

    const explanationHTML = card.explanation
      ? `<div class="explanation"><span>💡</span><span>${card.explanation}</span></div>` : '';

    const examplesHTML = card.examples && card.examples.length
      ? `<div class="examples">${card.examples.map(e=>`<div class="example">• ${e}</div>`).join('')}</div>` : '';

    // Get next intervals for button labels
    const cardState = DB.getCardState(card.id) || {};
    const intervals = SRS.nextIntervals(cardState);
    const leechBadge = cardState.leech ? '<div class="leech-badge">🩸 Schwierige Karte</div>' : '';

    el.innerHTML = `
      <div class="feedback-wrap ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
        <div class="feedback-emoji">${emoji}</div>
        <div class="feedback-title">${msg}</div>
        ${leechBadge}
        ${userAnswerHTML}
        <div class="feedback-answer-card">
          <div class="feedback-label">${card.type==='conjugation'?'Richtige Form:':'Richtige Antwort:'}</div>
          <div class="feedback-answer">${card.answer}</div>
          ${card.type==='conjugation'?`<div class="feedback-verb">${card.verb} (${card.tenseLabel}), ${card.pronoun}</div>`:''}
          ${this._getPronHint(card.type==='conjugation'?card.verb:card.answer)?`<div class="pron-hint">${this._getPronHint(card.type==='conjugation'?card.verb:card.answer)}</div>`:''}
        </div>
        ${explanationHTML}
        ${examplesHTML}
        <div class="rating-buttons">
          <button class="rating-btn rating-again">
            <span class="rating-label">Nochmal</span>
            <span class="rating-interval">${intervals.again}</span>
          </button>
          <button class="rating-btn rating-good">
            <span class="rating-label">Gut</span>
            <span class="rating-interval">${intervals.good}</span>
          </button>
          <button class="rating-btn rating-easy">
            <span class="rating-label">Super!</span>
            <span class="rating-interval">${intervals.easy}</span>
          </button>
        </div>
      </div>
    `;
    const c = card;
    el.querySelector('.rating-again').onclick = () => Session.answer(c, 1);
    el.querySelector('.rating-good').onclick  = () => Session.answer(c, 4);
    el.querySelector('.rating-easy').onclick  = () => Session.answer(c, 5);
  },

  showSummary(data) {
    const el = document.getElementById('learn-content');
    const pct = data.stats.seen > 0
      ? Math.round(data.stats.correct / data.stats.seen * 100) : 0;
    const profile = DB.getProfile();
    const all = CardEngine.buildAll();
    const unitId = CardEngine.getCurrentUnit();
    const unitProg = DB.getUnitProgress(unitId, all);

    // Update current unit if ≥80%
    if (unitProg >= 80 && unitId < 14) {
      const p = DB.getProfile();
      if (p.currentUnit === unitId) {
        p.currentUnit = unitId + 1;
        DB.saveProfile(p);
      }
    }

    const weakAreas = this._getWeakAreas(all);

    el.innerHTML = `
      <div class="summary">
        <div class="summary-header">
          <div class="summary-icon">📊</div>
          <h2>Session beendet!</h2>
          <div class="summary-duration">${data.duration} Minuten</div>
        </div>

        <div class="result-circle ${pct>=80?'green':pct>=50?'orange':'red'}">${pct}%</div>

        <div class="summary-stats">
          <div class="stat-box">
            <span class="stat-num">${data.stats.correct}</span>
            <span class="stat-lbl">Richtig</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">${data.stats.wrong}</span>
            <span class="stat-lbl">Falsch</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">${data.stats.seen}</span>
            <span class="stat-lbl">Gesamt</span>
          </div>
        </div>

        <div class="summary-message card">
          <p>${this._motivate(pct)}</p>
        </div>

        ${weakAreas.length ? `
          <div class="weak-areas card">
            <div class="weak-title">🎯 Mehr Übung braucht:</div>
            ${weakAreas.map(w=>`<div class="weak-item">• ${w}</div>`).join('')}
          </div>
        ` : ''}

        <div class="unit-progress-summary card">
          <div>Lektion ${unitId}: ${unitProg}% beherrscht</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" style="width:${unitProg}%"></div>
          </div>
        </div>

        <div class="summary-buttons">
          <button class="btn-primary" onclick="App.startSession()">Nochmal lernen</button>
          <button class="btn-secondary" onclick="UI.navigateTo('home')">Zurück zum Start</button>
        </div>
      </div>
    `;
  },

  _getWeakAreas(all) {
    const weak = [];
    all.forEach(card => {
      const state = DB.getCardState(card.id);
      if (state && state.lastQuality <= 2 && state.repetitions > 0) {
        weak.push(card.raw?.pt || card.question);
      }
    });
    return [...new Set(weak)].slice(0, 5);
  },

  // ── Progress Screen ────────────────────────────────────────────────────
  renderProgress() {
    const el = document.getElementById('progress-content');
    const all = CardEngine.buildAll();
    const profile = DB.getProfile();
    const totalPct = profile.totalCardsReviewed > 0
      ? Math.round(profile.totalCorrect / profile.totalCardsReviewed * 100) : 0;
    const seen = all.filter(c => DB.getCardState(c.id) !== null).length;

    // Streak heatmap (last 12 weeks)
    const heatmapHTML = this._renderHeatmap(84);

    // Accuracy chart (last 14 days)
    const chartHTML = this._renderAccuracyChart(14);

    // Units list
    const allUnits = [...LESSONS, ...(typeof MODULES !== 'undefined' ? MODULES : [])];
    const unitsHTML = allUnits.map(lesson => {
      const prog = DB.getUnitProgress(lesson.id, all);
      const unitCards = all.filter(c => c.unit === lesson.id).length;
      const unitSeen = all.filter(c => c.unit === lesson.id && DB.getCardState(c.id)).length;
      const isLocked = !lesson.unlocked && lesson.id > 1 && !String(lesson.id).startsWith('m');
      const isModLocked = String(lesson.id).startsWith('m') && !lesson.unlocked;
      const locked = isLocked || isModLocked;
      const prereqHint = locked && lesson.prereqLabel ? lesson.prereqLabel : '';
      return `
        <div class="unit-row card ${locked ? 'locked' : ''}">
          <div class="unit-num" style="background:${lesson.color}">${lesson.id}</div>
          <div class="unit-row-info">
            <div class="unit-row-title">${lesson.title}</div>
            <div class="unit-row-sub">${locked && prereqHint ? prereqHint : unitSeen + '/' + unitCards + ' Karten'}</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar" style="width:${prog}%;background:${lesson.color}"></div>
            </div>
          </div>
          <div class="unit-row-pct">${locked ? '🔒' : prog + '%'}</div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="progress-header">
        <h2>Dein Fortschritt</h2>
        <div class="overall-stats">
          <div class="stat-box">
            <span class="stat-num" style="color:var(--orange)">${profile.streak}</span>
            <span class="stat-lbl">Streak</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">${seen}</span>
            <span class="stat-lbl">Gelernt</span>
          </div>
          <div class="stat-box">
            <span class="stat-num" style="color:${totalPct>=70?'var(--green)':totalPct>=40?'var(--orange)':'var(--red)'}">${totalPct}%</span>
            <span class="stat-lbl">Genauigkeit</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">${profile.sessionsCompleted}</span>
            <span class="stat-lbl">Sessions</span>
          </div>
        </div>
      </div>

      <div class="chart-section">
        <div class="chart-title">Aktivität</div>
        ${heatmapHTML}
      </div>

      ${chartHTML}

      <div class="chart-section">
        <div class="chart-title">Lektionen & Module</div>
      </div>
      <div class="units-list">${unitsHTML}</div>
    `;
  },

  _renderHeatmap(days) {
    const studyDates = DB.getStudyDates(days);
    const weeks = Math.ceil(days / 7);
    const dayLabels = ['Mo','','Mi','','Fr','','So'];
    let cells = '';
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days + 1);
    // Adjust to Monday
    const startDay = startDate.getDay();
    const offset = startDay === 0 ? 6 : startDay - 1;
    startDate.setDate(startDate.getDate() - offset);

    for (let d = 0; d < weeks * 7; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().split('T')[0];
      const count = studyDates[dateStr] || 0;
      const todayStr = today.toISOString().split('T')[0];
      const isFuture = dateStr > todayStr;
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 10) level = 2;
      if (count >= 25) level = 3;
      if (count >= 50) level = 4;
      const col = Math.floor(d / 7);
      const row = d % 7;
      cells += `<rect x="${col * 15}" y="${row * 15}" width="12" height="12" rx="3"
        class="heatmap-cell heatmap-${isFuture ? 'empty' : 'l' + level}"
        ${!isFuture && count > 0 ? `data-date="${dateStr}" data-count="${count}"` : ''}/>`;
    }

    return `
      <div class="heatmap-wrap">
        <svg width="${weeks * 15}" height="105" viewBox="0 0 ${weeks * 15} 105">
          ${cells}
        </svg>
      </div>
    `;
  },

  _renderAccuracyChart(days) {
    const data = DB.getDailyStatsRange(days);
    const hasData = data.some(d => d.seen > 0);
    if (!hasData) return '';

    const maxSeen = Math.max(...data.map(d => d.seen || 0), 1);
    const barWidth = Math.floor(100 / days);

    const bars = data.map((d, i) => {
      const height = d.seen ? Math.max(4, (d.seen / maxSeen) * 80) : 0;
      const pct = d.seen > 0 ? Math.round((d.correct || 0) / d.seen * 100) : 0;
      const color = pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--red)';
      const dayLabel = new Date(d.date).toLocaleDateString('de', {weekday:'narrow'});
      return `
        <div class="bar-col" style="width:${barWidth}%">
          <div class="bar-fill" style="height:${height}%;background:${d.seen ? color : 'transparent'}"></div>
          <div class="bar-label">${dayLabel}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="chart-section">
        <div class="chart-title">Letzte ${days} Tage</div>
        <div class="bar-chart">${bars}</div>
      </div>
    `;
  },

  // ── Settings Screen ────────────────────────────────────────────────────
  renderSettings() {
    const el = document.getElementById('settings-content');
    const profile = DB.getProfile();
    const currentTheme = profile.theme || 'dark';
    el.innerHTML = `
      <div class="settings-header"><h2>Einstellungen</h2></div>
      <div class="settings-list">
        <div class="settings-section">
          <div class="settings-label">Erscheinungsbild</div>
          <div class="theme-toggle">
            <button class="theme-option ${currentTheme==='dark'?'active':''}" onclick="App.setTheme('dark')">Dunkel</button>
            <button class="theme-option ${currentTheme==='light'?'active':''}" onclick="App.setTheme('light')">Hell</button>
            <button class="theme-option ${currentTheme==='auto'?'active':''}" onclick="App.setTheme('auto')">Auto</button>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-label">Daten</div>
          <button class="settings-btn" onclick="App.exportData()">Daten exportieren</button>
          <button class="settings-btn" onclick="App.importData()">Daten importieren</button>
          <button class="settings-btn danger" onclick="App.resetProgress()">Fortschritt zurücksetzen</button>
        </div>
        <div class="settings-section">
          <div class="settings-label">App</div>
          <div class="settings-info">Aprender Português<br>Version 2.0<br>Europäisches Portugiesisch A1/A2<br>${CardEngine.buildAll().length} Lernkarten</div>
        </div>
        <div class="settings-section">
          <div class="settings-label">Bewertungs-System</div>
          <div class="settings-info">
            <b>Nochmal</b> — Karte wird kurz wiederholt<br>
            <b>Gut</b> — Normaler Wiederholungsrhythmus<br>
            <b>Super!</b> — Längeres Intervall bis zur nächsten Wiederholung
          </div>
        </div>
      </div>
    `;
  },

  // ── Helpers ────────────────────────────────────────────────────────────
  confirmEndSession() {
    if (confirm('Session beenden?')) {
      Session.end();
    }
  },

  _motivate(pct) {
    if (pct >= 90) return 'Fantastisch! Du bist auf einem Super-Level! 🏆';
    if (pct >= 70) return 'Sehr gut! Das macht sich bezahlt! 💪';
    if (pct >= 50) return 'Gut gemacht! Wiederholung ist der Schlüssel 🗝️';
    return 'Weiter so! Fehler sind der beste Lehrer. Morgen klappt es besser! 🌱';
  },

  _esc(s) {
    return (s || '').replace(/'/g, "\\'");
  },

  _normalize(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  },

  _diffAnswer(userText, correctText) {
    // Highlight character differences between user answer and correct answer
    const u = userText.split('');
    const c = correctText.toLowerCase().split('');
    let result = '';
    for (let i = 0; i < u.length; i++) {
      if (i < c.length && u[i].toLowerCase() === c[i]) {
        result += u[i];
      } else {
        result += `<span class="diff-wrong">${u[i]}</span>`;
      }
    }
    if (result === userText) {
      // No char-level diff found — maybe accent issue
      return `${userText} <span class="diff-hint">(Akzente prüfen!)</span>`;
    }
    return result;
  },

  _getPronHint(text) {
    if (!text) return '';
    const lower = text.toLowerCase().trim();
    // Try exact match
    if (PRON_HINTS[lower]) return PRON_HINTS[lower];
    // Strip articles (o/a/os/as/um/uma) and try again
    const noArticle = lower.replace(/^(o|a|os|as|um|uma|uns|umas)\s+/, '').trim();
    if (PRON_HINTS[noArticle]) return PRON_HINTS[noArticle];
    // Try each word in the text
    const words = lower.split(/[\s/,]+/);
    for (const w of words) {
      if (w.length > 2 && PRON_HINTS[w]) return PRON_HINTS[w];
    }
    return '';
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// APP — Entry point
// ══════════════════════════════════════════════════════════════════════════════

const App = {
  init() {
    // Initialize storage (run migrations)
    DB.init();

    // Apply saved theme
    const profile = DB.getProfile();
    document.documentElement.setAttribute('data-theme', profile.theme || 'dark');

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // Tab bar navigation
    document.querySelectorAll('.tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen === 'learn') {
          // Go to learn screen but don't start session automatically
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
          document.getElementById('screen-learn').classList.add('active');
          btn.classList.add('active');
          App.showLearnMenu();
        } else {
          UI.navigateTo(screen);
        }
      });
    });

    // Init data
    CardEngine.checkUnlocks();
    UI.renderHome();
  },

  showLearnMenu() {
    const el = document.getElementById('learn-content');
    CardEngine.checkUnlocks();
    const modules = typeof MODULES !== 'undefined' ? MODULES : [];
    const modulesHTML = modules.map(m => {
      const locked = !m.unlocked;
      return `
        <button class="conv-item card ${locked ? 'locked' : ''}" ${locked ? '' : `onclick="App.startModuleSession('${m.id}')"`}>
          <span class="conv-icon" style="font-size:24px;width:36px;height:36px;border-radius:8px;background:${m.color};display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px">${m.id}</span>
          <div class="conv-info">
            <div class="conv-title">${m.title}</div>
            <div class="conv-sub">${locked && m.prereqLabel ? m.prereqLabel : m.subtitle}</div>
          </div>
          ${locked ? '<span>🔒</span>' : '<span style="color:var(--accent)">→</span>'}
        </button>
      `;
    }).join('');

    el.innerHTML = `
      <div class="pre-session">
        <div class="mode-toggle">
          <button class="mode-btn active">Karten</button>
          <button class="mode-btn" onclick="Conversation.showList()">Gespräche</button>
        </div>

        <div class="pre-icon">📚</div>
        <h2>Lerneinheit starten</h2>

        <div class="chart-title" style="width:100%;text-align:left;margin-top:8px">Buch-Lektion</div>
        <div class="session-plan">
          <div>🔄 Wiederholung fälliger Karten</div>
          <div>✨ Neuer Stoff aus der aktuellen Lektion</div>
          <div>📊 Auswertung & Fortschritt</div>
        </div>
        <button class="btn-primary" onclick="App.startSession()">Buch-Session starten</button>

        <div class="chart-title" style="width:100%;text-align:left;margin-top:16px">Themen-Module</div>
        <div style="width:100%;display:flex;flex-direction:column;gap:8px">
          ${modulesHTML}
        </div>
      </div>
    `;
  },

  startSession() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');
    Session.start();
  },

  startModuleSession(moduleId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');
    Session.startModule(moduleId);
  },

  exportData() {
    const data = DB.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portugiesisch_fortschritt.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        if (DB.importData(evt.target.result)) {
          alert('Daten erfolgreich importiert!');
          UI.renderHome();
        } else {
          alert('Fehler beim Import.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const profile = DB.getProfile();
    profile.theme = theme;
    DB.saveProfile(profile);
    UI.renderSettings();
  },

  resetProgress() {
    if (confirm('Wirklich ALLES zurücksetzen? Das kann nicht rückgängig gemacht werden!')) {
      DB.clearAll();
      CardEngine._cache = null;
      LESSONS.forEach((l, i) => l.unlocked = i === 0);
      UI.navigateTo('home');
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// CONVERSATION ENGINE — Scaffolded dialogue practice
// ══════════════════════════════════════════════════════════════════════════════

const Conversation = {
  current: null,
  nodeIdx: 0,
  messages: [],
  score: { correct: 0, total: 0 },

  _getConvProgress(convId) {
    const raw = localStorage.getItem('ptapp_conv_' + convId);
    return raw ? JSON.parse(raw) : null;
  },

  _saveConvProgress(convId, score) {
    const existing = this._getConvProgress(convId) || { attempts: 0, bestPct: 0 };
    const pct = score.total > 0 ? Math.round(score.correct / score.total * 100) : 0;
    localStorage.setItem('ptapp_conv_' + convId, JSON.stringify({
      attempts: existing.attempts + 1,
      bestPct: Math.max(existing.bestPct, pct),
      lastPct: pct,
      lastDate: new Date().toISOString().split('T')[0]
    }));
  },

  showList() {
    const el = document.getElementById('learn-content');
    const convs = typeof CONVERSATIONS !== 'undefined' ? CONVERSATIONS : [];

    // Sort: unplayed first, then by lowest score, then played
    const sorted = [...convs].sort((a, b) => {
      const pa = this._getConvProgress(a.id);
      const pb = this._getConvProgress(b.id);
      if (!pa && pb) return -1;
      if (pa && !pb) return 1;
      if (pa && pb) return pa.bestPct - pb.bestPct;
      return 0;
    });

    const listHTML = sorted.map(c => {
      const prog = this._getConvProgress(c.id);
      let badge = '';
      let sub = c.subtitle;
      if (prog) {
        const color = prog.bestPct >= 70 ? 'var(--green)' : prog.bestPct >= 40 ? 'var(--orange)' : 'var(--red)';
        badge = `<span style="font-size:13px;font-weight:700;color:${color}">${prog.bestPct}%</span>`;
        sub = `${prog.attempts}x geübt — Beste: ${prog.bestPct}%`;
      } else {
        badge = `<span class="conv-diff">Neu</span>`;
      }
      return `
        <button class="conv-item card" onclick="Conversation.start('${c.id}')">
          <span class="conv-icon">${c.icon}</span>
          <div class="conv-info">
            <div class="conv-title">${c.title}</div>
            <div class="conv-sub">${sub}</div>
          </div>
          ${badge}
        </button>
      `;
    }).join('');

    const completedCount = convs.filter(c => this._getConvProgress(c.id)).length;

    el.innerHTML = `
      <div class="conv-header">
        <div class="mode-toggle">
          <button class="mode-btn" onclick="App.showLearnMenu()">Karten</button>
          <button class="mode-btn active">Gespräche</button>
        </div>
        <h2>Gespräche üben</h2>
        <p style="color:var(--text2);font-size:14px;margin-top:4px">${completedCount}/${convs.length} abgeschlossen — Lerne durch echte Dialoge</p>
      </div>
      <div class="conv-list">${listHTML}</div>
    `;
  },

  start(convId) {
    const convs = typeof CONVERSATIONS !== 'undefined' ? CONVERSATIONS : [];
    this.current = convs.find(c => c.id === convId);
    if (!this.current) return;
    this.nodeIdx = 0;
    this.messages = [];
    this.score = { correct: 0, total: 0 };
    this._processNode(this.current.nodes[0].id);
  },

  _findNode(nodeId) {
    return this.current.nodes.find(n => n.id === nodeId);
  },

  _processNode(nodeId) {
    if (nodeId === 'end') {
      this._showEnd();
      return;
    }
    const node = this._findNode(nodeId);
    if (!node) return;

    if (node.speaker === 'npc' && node.type === 'say') {
      this.messages.push({ speaker: 'npc', pt: node.pt, de: node.de });
      this._render();
      // Auto-advance after short delay
      setTimeout(() => this._processNode(node.next), 800);
    } else if (node.speaker === 'learner') {
      this.messages.push({ speaker: 'prompt', text: node.prompt });
      this._render(node);
    }
  },

  selectOption(nodeId, optIdx) {
    const node = this._findNode(nodeId);
    const opt = node.options[optIdx];
    this.score.total++;
    // Remove prompt
    this.messages = this.messages.filter(m => m.speaker !== 'prompt');

    if (opt.correct) {
      this.score.correct++;
      this.messages.push({ speaker: 'learner', pt: opt.pt, de: opt.de });
      this._render();
      setTimeout(() => this._processNode(opt.next || node.next), 600);
    } else {
      this.messages.push({ speaker: 'learner', pt: opt.pt, de: opt.de, wrong: true });
      this.messages.push({ speaker: 'system', text: opt.feedback });
      this._render();
      // Show prompt again after delay
      setTimeout(() => {
        this.messages = this.messages.filter(m => m.speaker !== 'system');
        this._processNode(nodeId);
      }, 2000);
    }
  },

  submitText(nodeId) {
    const input = document.getElementById('conv-input');
    if (!input) return;
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    const node = this._findNode(nodeId);
    this.score.total++;
    // Remove prompt
    this.messages = this.messages.filter(m => m.speaker !== 'prompt');

    // Check keywords
    const normalized = UI._normalize(text);
    const matched = node.keywords.some(kw => normalized.includes(UI._normalize(kw)));

    this.messages.push({ speaker: 'learner', pt: input.value, wrong: !matched });

    if (matched) {
      this.score.correct++;
      this._render();
      setTimeout(() => this._processNode(node.next), 600);
    } else {
      this.messages.push({ speaker: 'system', text: `Tipp: ${node.hint || node.answer}` });
      this._render();
      setTimeout(() => {
        this.messages = this.messages.filter(m => m.speaker !== 'system');
        this._processNode(nodeId);
      }, 2500);
    }
  },

  _render(activeNode) {
    const el = document.getElementById('learn-content');
    const msgsHTML = this.messages.map(m => {
      if (m.speaker === 'npc') {
        return `<div class="chat-bubble chat-npc">
          <div class="chat-pt">${m.pt}</div>
          <div class="chat-de">${m.de}</div>
        </div>`;
      }
      if (m.speaker === 'learner') {
        return `<div class="chat-bubble chat-learner ${m.wrong ? 'chat-wrong' : ''}">
          <div class="chat-pt">${m.pt}</div>
          ${m.de ? `<div class="chat-de">${m.de}</div>` : ''}
        </div>`;
      }
      if (m.speaker === 'prompt') {
        return `<div class="chat-prompt">${m.text}</div>`;
      }
      if (m.speaker === 'system') {
        return `<div class="chat-system">${m.text}</div>`;
      }
      return '';
    }).join('');

    let inputHTML = '';
    if (activeNode && activeNode.type === 'choose') {
      inputHTML = `<div class="chat-choices">
        ${activeNode.options.map((opt, i) => `
          <button class="chat-choice-btn" onclick="Conversation.selectOption('${activeNode.id}', ${i})">${opt.pt}</button>
        `).join('')}
      </div>`;
    } else if (activeNode && activeNode.type === 'write') {
      inputHTML = `<div class="chat-input-wrap">
        <input type="text" id="conv-input" class="chat-input" placeholder="Antwort schreiben..."
          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          onkeydown="if(event.key==='Enter') Conversation.submitText('${activeNode.id}')">
        <button class="chat-send-btn" onclick="Conversation.submitText('${activeNode.id}')">→</button>
      </div>`;
    }

    el.innerHTML = `
      <div class="chat-header">
        <button class="btn-end-session" onclick="Conversation.showList()">←</button>
        <div class="chat-header-info">
          <span>${this.current.icon} ${this.current.title}</span>
          <span class="chat-diff">${this.current.difficulty}</span>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages">${msgsHTML}</div>
      ${inputHTML}
    `;

    // Scroll to bottom
    const msgs = document.getElementById('chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;

    // Focus input
    if (activeNode && activeNode.type === 'write') {
      setTimeout(() => document.getElementById('conv-input')?.focus(), 100);
    }
  },

  _showEnd() {
    const pct = this.score.total > 0 ? Math.round(this.score.correct / this.score.total * 100) : 0;
    // Save progress
    this._saveConvProgress(this.current.id, this.score);
    const prog = this._getConvProgress(this.current.id);

    const el = document.getElementById('learn-content');
    el.innerHTML = `
      <div class="conv-end">
        <div class="feedback-emoji">${pct >= 70 ? '🎉' : pct >= 40 ? '💪' : '🌱'}</div>
        <h2>Gespräch beendet!</h2>
        <div class="result-circle ${pct>=70?'green':pct>=40?'orange':'red'}">${pct}%</div>
        <p>${this.score.correct} von ${this.score.total} richtig</p>
        ${prog && prog.bestPct > pct ? `<p style="font-size:13px;color:var(--text3)">Dein Rekord: ${prog.bestPct}%</p>` : ''}
        ${prog && prog.bestPct <= pct && prog.attempts > 1 ? `<p style="font-size:13px;color:var(--green);font-weight:600">Neuer Rekord!</p>` : ''}
        <p class="motivate">${UI._motivate(pct)}</p>
        <button class="btn-primary" onclick="Conversation.start('${this.current.id}')">Nochmal üben</button>
        <button class="btn-secondary" onclick="Conversation.showList()" style="margin-top:8px">Zurück zur Liste</button>
      </div>
    `;
  }
};

// Expose to global scope so inline onclick handlers can reach them
window.App = App;
window.UI = UI;
window.Session = Session;
window.CardEngine = CardEngine;
window.Conversation = Conversation;

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
