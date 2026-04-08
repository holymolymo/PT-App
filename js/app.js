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
          // Study card (shown first encounter)
          cards.push({
            id: g.id,
            unit: lesson.id, source: 'book', type: 'rule',
            question: g.title, answer: g.rule,
            examples: g.examples || [], explanation: g.note || null, raw: g
          });
          // Generate exercise cards from examples
          this._generateRuleExercises(g, lesson.id, 'book', cards);
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
          this._generateRuleExercises(g, mod.id, 'module', cards);
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

  // Generate exercise cards from a grammar rule's examples
  _generateRuleExercises(g, unitId, source, cards) {
    const examples = g.examples || [];
    if (examples.length === 0) return;

    examples.forEach((ex, i) => {
      // Parse example: "Sou do Porto (= de + o Porto)" or "Sou do Porto. (Ich komme aus Porto.)"
      // Try to extract PT and DE parts
      const parenMatch = ex.match(/^(.+?)\s*\((.+?)\)\s*$/);
      let ptPart = '', dePart = '', rawPt = '';

      if (parenMatch) {
        rawPt = parenMatch[1].trim();
        dePart = parenMatch[2].trim();
        // Clean "= " prefix from DE part
        dePart = dePart.replace(/^=\s*/, '');
        ptPart = rawPt.replace(/[.!?]$/, '').trim();
      } else {
        // No parentheses — skip this example for exercises
        return;
      }

      if (!ptPart || ptPart.length < 3) return;

      // 1. TRANSLATE exercise (DE → PT)
      if (dePart && dePart.length > 3 && !dePart.includes('→') && !dePart.includes('|')) {
        cards.push({
          id: g.id + '_tr' + i, unit: unitId, source,
          type: 'rule-exercise', exerciseType: 'translate',
          question: dePart, answer: ptPart,
          hint: g.title, explanation: g.note || null,
          ruleTitle: g.title, ruleId: g.id, raw: g
        });
      }

      // 2. FILLBLANK exercise — blank out a key word (longest word > 2 chars)
      const words = ptPart.split(/\s+/);
      if (words.length >= 3) {
        // Pick the word most likely to be the grammar target (not articles/pronouns)
        const skipWords = new Set(['eu','tu','ele','ela','nós','eles','elas','você','vocês','o','a','os','as','um','uma','de','em','no','na','do','da','e','é','que','se','não']);
        let blankIdx = -1;
        let maxLen = 0;
        words.forEach((w, wi) => {
          const clean = w.replace(/[.,!?]/g, '').toLowerCase();
          if (clean.length > maxLen && !skipWords.has(clean)) {
            maxLen = clean.length;
            blankIdx = wi;
          }
        });
        if (blankIdx >= 0) {
          const blankWord = words[blankIdx].replace(/[.,!?]/g, '');
          const blanked = words.map((w, wi) => wi === blankIdx ? '___' : w).join(' ');
          cards.push({
            id: g.id + '_fb' + i, unit: unitId, source,
            type: 'rule-exercise', exerciseType: 'fillblank',
            question: blanked, answer: blankWord,
            hint: g.title, explanation: `Vollständig: ${ptPart}`,
            ruleTitle: g.title, ruleId: g.id, raw: g
          });
        }
      }

      // 3. BUILD exercise — scramble words (only for sentences with 3+ words)
      if (words.length >= 3 && words.length <= 8) {
        const scrambled = this._shuffle([...words]).join(' / ');
        // Only if scrambled is different from original
        if (scrambled.replace(/ \/ /g, ' ') !== ptPart) {
          cards.push({
            id: g.id + '_bd' + i, unit: unitId, source,
            type: 'rule-exercise', exerciseType: 'build',
            question: scrambled, answer: ptPart,
            hint: g.title, explanation: g.note || null,
            ruleTitle: g.title, ruleId: g.id, raw: g
          });
        }
      }
    });
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
      if (progress >= 60) lesson.unlocked = true; // 60% — don't hold learners back
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
    this._smartConvId = null;
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this._recentResults = [];
    this._sessionSeenIds = new Set();
    this.startTime = Date.now();
    DB.updateStreak();
    this._startReviewPhase();
  },

  startSmart(dueCards, newCards, convId) {
    this._moduleId = null;
    this._smartConvId = convId;
    this._smartNewCards = newCards;
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this._recentResults = [];
    this._sessionSeenIds = new Set();
    this.startTime = Date.now();
    DB.updateStreak();

    // Phase 1: Review
    this.phase = 'review';
    this.queue = dueCards;
    this.currentIdx = 0;
    if (dueCards.length === 0) {
      this._smartStartNew();
      return;
    }
    UI.showPhase('review', dueCards.length);
  },

  _smartStartNew() {
    // Phase 2: New content
    this.phase = 'new';
    const newCards = (this._smartNewCards || []).filter(c => !this._sessionSeenIds.has(c.id));
    this.queue = newCards;
    this.currentIdx = 0;
    if (newCards.length === 0) {
      this._smartStartConv();
      return;
    }
    UI.showPhase('new', newCards.length);
  },

  _smartStartConv() {
    // Phase 3: Conversation (if available)
    if (this._smartConvId) {
      // Show transition screen before conversation
      const el = document.getElementById('learn-content');
      const conv = CONVERSATIONS.find(c => c.id === this._smartConvId);
      el.innerHTML = `
        <div class="phase-transition">
          <div class="phase-icon">💬</div>
          <h2>Jetzt anwenden!</h2>
          <p>Übe das Gelernte in einem echten Gespräch</p>
          <div class="card" style="display:flex;align-items:center;gap:12px;width:100%;margin:8px 0">
            <span style="font-size:28px">${conv?.icon || '💬'}</span>
            <div>
              <div style="font-weight:700">${conv?.title || ''}</div>
              <div style="font-size:13px;color:var(--text2)">${conv?.subtitle || ''}</div>
            </div>
          </div>
          <button class="btn-primary" onclick="Conversation.start('${this._smartConvId}'); Conversation._onEndCallback = function() { Session._startSummary(); };">Gespräch starten</button>
          <button class="btn-secondary" onclick="Session._startSummary()" style="margin-top:8px">Überspringen</button>
        </div>
      `;
    } else {
      this._startSummary();
    }
  },

  startModule(moduleId) {
    this._moduleId = moduleId;
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this._recentResults = [];
    this._sessionSeenIds = new Set();
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
    // Get due review cards only (NOT learning cards — those stay for next session)
    const dueCards = CardEngine.getDueCards(15);
    // Filter out any cards already seen in this session
    this.queue = dueCards.filter(c => !this._sessionSeenIds.has(c.id));
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
    // Cap new cards at 8 per session (research: 5-10 optimal for language learning)
    let newCards = CardEngine.getNewCards(unitId, 8);
    // Filter out cards already seen this session
    newCards = newCards.filter(c => !this._sessionSeenIds.has(c.id));

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
        if (this._smartConvId !== undefined) {
          // Smart session: transition to new phase
          UI.showPhaseTransition('new', true);
        } else {
          UI.showPhaseTransition('new');
        }
      } else {
        if (this._smartConvId !== undefined) {
          // Smart session: go to conversation phase
          this._smartStartConv();
        } else {
          this._startSummary();
        }
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

    // Track this card as seen in this session (prevent within-session repeats)
    this._sessionSeenIds.add(card.id);

    // Error analysis tracking
    if (typeof AI !== 'undefined') {
      if (correct) AI.errorAnalysis.trackSuccess(card);
      else AI.errorAnalysis.trackError(card);
    }

    // Rolling accuracy tracker (last 10)
    this._recentResults.push(correct ? 1 : 0);
    if (this._recentResults.length > 10) this._recentResults.shift();

    // Wrong cards are NOT re-queued within the session.
    // SRS handles re-scheduling to a future date. This prevents the loop.

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

      <button class="btn-primary start-session-btn" onclick="${seen === 0 ? "App.startModuleSession('m1')" : `App.startLesson(${CardEngine.getCurrentUnit()})`}">
        ${seen === 0 ? 'Erste Schritte starten →' : 'Weiter lernen →'}
      </button>
      ${due > 0 && seen > 0 ? `<button class="btn-secondary" onclick="App.startReviewSession()" style="margin-top:8px">${due} Karten wiederholen</button>` : ''}

      ${typeof AI !== 'undefined' ? AI.errorAnalysis.renderReport() : ''}

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

  showPhaseTransition(nextPhase, isSmart) {
    const el = document.getElementById('learn-content');
    const stats = Session.phaseStats.review;
    const pct = stats.correct + stats.wrong > 0
      ? Math.round(stats.correct / (stats.correct + stats.wrong) * 100) : 0;
    const nextAction = isSmart ? 'Session._smartStartNew()' : 'Session._startNewPhase()';
    el.innerHTML = `
      <div class="phase-transition">
        <div class="phase-icon">✅</div>
        <h2>Wiederholung abgeschlossen!</h2>
        <div class="result-circle ${pct>=70?'green':pct>=40?'orange':'red'}">${pct}%</div>
        <p>${stats.correct} richtig, ${stats.wrong} falsch</p>
        <p class="motivate">${this._motivate(pct)}</p>
        <button class="btn-primary" onclick="${nextAction}">Weiter zu: Neuer Stoff ✨</button>
      </div>
    `;
  },

  showCard(card, progress) {
    const el = document.getElementById('learn-content');
    const isConj = card.type === 'conjugation';
    const isRule = card.type === 'rule';
    const isRuleExercise = card.type === 'rule-exercise';
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
    } else if (isRuleExercise) {
      // Active grammar exercises
      const typeLabels = {
        translate: 'Übersetze auf Portugiesisch',
        fillblank: 'Ergänze das fehlende Wort',
        build: 'Bilde den Satz'
      };
      const typeBadges = {
        translate: '🔄 Übersetzen',
        fillblank: '✏️ Lückentext',
        build: '🧩 Satz bilden'
      };
      // Generate hint for fillblank: show German translation or letter hint
      let letterHint = '';
      if (card.exerciseType === 'fillblank' && card.answer) {
        const allCards = CardEngine.buildAll();
        const ptWord = card.answer.toLowerCase();
        // Try exact match, then partial match, then any card containing the word
        const match = allCards.find(c => c.type === 'vocab' && c.dir === 'pt-de' && c.question.toLowerCase() === ptWord)
          || allCards.find(c => c.type === 'vocab' && c.dir === 'pt-de' && c.question.toLowerCase().includes(ptWord))
          || allCards.find(c => (c.type === 'phrase' || c.type === 'vocab') && c.dir === 'pt-de' && c.question.toLowerCase().includes(ptWord));
        if (match) {
          letterHint = `<div class="letter-hint">🇩🇪 ${match.answer}</div>`;
        } else if (card.explanation) {
          // Use explanation as fallback hint
          letterHint = `<div class="letter-hint">💡 ${card.explanation.substring(0, 60)}</div>`;
        } else {
          letterHint = `<div class="letter-hint">${card.answer[0].toUpperCase()}${'·'.repeat(card.answer.length - 1)} (${card.answer.length} Buchst.)</div>`;
        }
      }
      questionHTML = `
        <div class="card-label">${typeLabels[card.exerciseType] || 'Grammatik-Übung'}</div>
        <div class="exercise-badge">${typeBadges[card.exerciseType] || 'Übung'}</div>
        <div class="card-cat-badge">${card.hint || card.ruleTitle}</div>
        <div class="card-question-text" style="font-size:${card.exerciseType === 'build' ? '18' : '22'}px">${card.question}</div>
        ${letterHint}
      `;
    } else if (isRule) {
      // Grammar rules — smart formatting with tables for structured content
      const ruleHTML = this._formatRule(card.answer);
      const exHTML = card.examples ? this._formatExamples(card.examples) : '';
      questionHTML = `
        <div class="card-label">Grammatik</div>
        <div class="card-question-text" style="font-size:20px">${card.question}</div>
        ${ruleHTML}
        ${exHTML}
        ${card.explanation ? `<div class="rule-note">${card.explanation}</div>` : ''}
      `;
    } else if (isContext) {
      // Show German translation as hint for context cards
      const ctxDE = card.raw?.de || '';
      const ctxHint = ctxDE ? `<div class="letter-hint">🇩🇪 ${ctxDE}</div>` : card.answer ? `<div class="letter-hint">${card.answer[0].toUpperCase()}${'·'.repeat(card.answer.length - 1)}</div>` : '';
      questionHTML = `
        <div class="card-label">Ergänze das fehlende Wort</div>
        ${card.hint ? `<div class="card-cat-badge">${card.hint}</div>` : ''}
        <div class="card-question-text">${card.question}</div>
        ${ctxHint}
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
    } else if (isRuleExercise) {
      const placeholder = card.exerciseType === 'translate' ? 'Übersetzung eingeben…'
        : card.exerciseType === 'fillblank' ? 'Fehlendes Wort…'
        : 'Satz eingeben…';
      answerHTML = `
        <div class="answer-input-wrap">
          <input type="text" id="card-input" class="card-input"
            placeholder="${placeholder}"
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            onkeydown="if(event.key==='Enter') UI.checkInput()">
          <button class="btn-check" onclick="UI.checkInput()">Prüfen</button>
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
    if (isConj || isRuleExercise || isContext) {
      setTimeout(() => document.getElementById('card-input')?.focus(), 100);
    }
  },

  checkInput() {
    const input = document.getElementById('card-input');
    if (!input) return;
    const userAnswer = input.value.trim();
    const card = Session.queue[Session.currentIdx];

    // Use flexible matching with alternatives and typo tolerance
    const result = this.checkAnswer(userAnswer, card.answer, card.alts || []);
    card._userAnswer = userAnswer;
    card._matchType = result.match;

    const isCorrect = result.match !== 'wrong';
    const quality = result.quality;

    // Show typo note if applicable
    if (result.match === 'typo' || result.match === 'typo-alt') {
      card._typoNote = true;
    }

    this._showFeedback(card, isCorrect, quality);
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

    // Build user-answer feedback
    let userAnswerHTML = '';
    if (card._typoNote && isCorrect) {
      userAnswerHTML = `<div class="feedback-user-answer">
        <span class="feedback-user-label" style="color:var(--orange)">Fast perfekt! Tippfehler:</span>
        <span class="feedback-user-text">${card._userAnswer}</span>
      </div>`;
    } else if (!isCorrect && card._userAnswer) {
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
    if (unitProg >= 60 && unitId < 14) {
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
          <button class="btn-primary" onclick="App.startLesson(${CardEngine.getCurrentUnit()})">Nächste Lektion →</button>
          <button class="btn-secondary" onclick="App.startReviewSession()">Karten wiederholen</button>
          <button class="btn-secondary" onclick="UI.navigateTo('home')">Fertig für heute ✓</button>
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
          <div class="settings-label">AI-Gespräche</div>
          <div class="settings-info" style="display:flex;flex-direction:column;gap:8px">
            <span style="font-size:13px">Anthropic API Key für AI-Gespräche & Spracherkennung</span>
            <input type="password" id="settings-api-key" class="card-input" style="font-size:14px"
              placeholder="sk-ant-..." value="${typeof AI !== 'undefined' && AI.hasApiKey() ? '••••••••••••' : ''}"
              onfocus="this.value = typeof AI !== 'undefined' ? AI.getApiKey() : ''"
              onblur="if(this.value && !this.value.startsWith('••')) { AI.setApiKey(this.value); this.value='••••••••••••'; }">
            <span style="font-size:11px;color:var(--text3)">Key bleibt lokal auf deinem Gerät.</span>
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

  _formatRule(ruleText) {
    if (!ruleText) return '';
    // If rule contains | separators → render as table
    if (ruleText.includes('|')) {
      const parts = ruleText.split('|').map(p => p.trim()).filter(p => p);
      // Check if parts have structure like "key (value)" or "key = value"
      const rows = parts.map(p => {
        const match = p.match(/^(.+?)\s*\((.+?)\)$/) || p.match(/^(.+?)\s*=\s*(.+)$/);
        if (match) {
          return `<tr><td class="rule-cell-pt">${match[1].trim()}</td><td class="rule-cell-de">${match[2].trim()}</td></tr>`;
        }
        return `<tr><td class="rule-cell-pt" colspan="2">${p}</td></tr>`;
      });
      return `<table class="rule-table">${rows.join('')}</table>`;
    }
    // If rule contains → or : → format as definition
    if (ruleText.includes('→') || (ruleText.includes(':') && ruleText.length > 30)) {
      const lines = ruleText.split(/[,;]/).map(p => p.trim()).filter(p => p);
      if (lines.length > 1) {
        return `<div class="rule-list">${lines.map(l => `<div class="rule-list-item">${l}</div>`).join('')}</div>`;
      }
    }
    return `<div class="rule-content">${ruleText}</div>`;
  },

  _formatExamples(examples) {
    if (!examples || examples.length === 0) return '';
    const rows = examples.map(ex => {
      // Try to split PT (DE) format
      const match = ex.match(/^(.+?)\s*\((.+?)\)$/);
      if (match) {
        return `<tr><td class="ex-pt">${match[1].trim()}</td><td class="ex-de">${match[2].trim()}</td></tr>`;
      }
      // Try PT → DE or PT = DE
      const arrow = ex.match(/^(.+?)\s*[→=]\s*(.+)$/);
      if (arrow) {
        return `<tr><td class="ex-pt">${arrow[1].trim()}</td><td class="ex-de">${arrow[2].trim()}</td></tr>`;
      }
      return `<tr><td class="ex-pt" colspan="2">${ex}</td></tr>`;
    });
    return `<table class="rule-examples-table">${rows.join('')}</table>`;
  },

  // Levenshtein distance for typo tolerance
  _levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({length: m + 1}, (_, i) => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
        // Damerau: transposition
        if (i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) {
          dp[i][j] = Math.min(dp[i][j], dp[i-2][j-2] + cost);
        }
      }
    }
    return dp[m][n];
  },

  // Flexible answer checking: exact → alternatives → typo tolerance
  checkAnswer(userText, correctText, alternatives) {
    const user = userText.trim();
    const correct = correctText.trim();
    const userNorm = this._normalize(user);
    const correctNorm = this._normalize(correct);

    // Layer 1: Exact match (normalized)
    if (userNorm === correctNorm) return { match: 'exact', quality: 4 };

    // Layer 2: Check alternatives
    const alts = alternatives || [];
    for (const alt of alts) {
      if (this._normalize(alt.trim()) === userNorm) return { match: 'alt', quality: 4 };
    }

    // Layer 3: Typo tolerance (Levenshtein)
    const maxDist = correct.length <= 4 ? 1 : correct.length <= 9 ? 1 : correct.length <= 14 ? 2 : 3;
    const dist = this._levenshtein(userNorm, correctNorm);
    if (dist <= maxDist) return { match: 'typo', quality: 3, dist };

    // Also check against alternatives with typo tolerance
    for (const alt of alts) {
      const altDist = this._levenshtein(userNorm, this._normalize(alt.trim()));
      const altMax = alt.length <= 4 ? 1 : alt.length <= 9 ? 1 : 2;
      if (altDist <= altMax) return { match: 'typo-alt', quality: 3, dist: altDist };
    }

    // Layer 4: Wrong
    return { match: 'wrong', quality: 1 };
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
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
          document.getElementById('screen-learn').classList.add('active');
          btn.classList.add('active');
          App.showLearnHub();
        } else {
          UI.navigateTo(screen);
        }
      });
    });

    // Init data
    CardEngine.checkUnlocks();
    UI.renderHome();
  },

  showLearnHub(activeTab) {
    const el = document.getElementById('learn-content');
    const tab = activeTab || 'lernen';

    const tabs = [
      {id:'lernen', label:'Lernen'},
      {id:'ueben', label:'Üben'},
      {id:'entdecken', label:'Entdecken'},
    ];
    const tabBar = `<div class="learn-tabs">${tabs.map(t =>
      `<button class="learn-tab ${t.id === tab ? 'active' : ''}" onclick="App.showLearnHub('${t.id}')">${t.label}</button>`
    ).join('')}</div>`;

    let content = '';
    if (tab === 'lernen') content = this._learnHubLernen();
    else if (tab === 'ueben') content = this._learnHubUeben();
    else if (tab === 'entdecken') content = this._learnHubEntdecken();

    el.innerHTML = tabBar + content;
  },

  _learnHubLernen() {
    CardEngine.checkUnlocks();
    const all = CardEngine.buildAll();
    const unitId = CardEngine.getCurrentUnit();
    const lesson = LESSONS.find(l => l.id === unitId);
    const unitProg = DB.getUnitProgress(unitId, all);
    const unitCards = all.filter(c => c.unit === unitId);
    const seenCount = unitCards.filter(c => DB.getCardState(c.id)).length;

    // Build lesson path
    const pathHTML = LESSONS.map(l => {
      const prog = DB.getUnitProgress(l.id, all);
      const isCurrent = l.id === unitId;
      const isLocked = !l.unlocked && l.id > 1;
      const isDone = prog >= 60;
      return `<div class="path-node ${isCurrent ? 'path-current' : ''} ${isLocked ? 'path-locked' : ''} ${isDone ? 'path-done' : ''}"
        ${!isLocked ? `onclick="App.startLesson(${l.id})"` : ''}>
        <div class="path-badge" style="background:${l.color}">${isDone ? '✓' : l.id}</div>
        <div class="path-info">
          <div class="path-title">${l.title}</div>
          <div class="path-sub">${isLocked ? '🔒' : prog + '%'}</div>
        </div>
      </div>`;
    }).join('');

    return `<div class="learn-hub-section">
      <div class="learn-hub-card card" onclick="App.startSmartSession()" style="cursor:pointer">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:36px">🚀</div>
          <div style="flex:1">
            <div style="font-size:17px;font-weight:800">Nächste Lektion</div>
            <div style="font-size:13px;color:var(--text2);margin-top:2px">
              Lektion ${unitId}: ${lesson?.title || ''} · ${seenCount}/${unitCards.length} Karten
            </div>
          </div>
          <div style="color:var(--accent);font-size:20px;font-weight:700">→</div>
        </div>
        <div class="progress-bar-wrap" style="margin-top:10px">
          <div class="progress-bar" style="width:${unitProg}%;background:${lesson?.color||'var(--accent)'}"></div>
        </div>
      </div>

      <div class="chart-title" style="margin-top:16px">Lernpfad</div>
      <div class="path-list">${pathHTML}</div>
    </div>`;
  },

  _learnHubUeben() {
    const all = CardEngine.buildAll();
    const due = all.filter(c => { const s = DB.getCardState(c.id); return s && SRS.isDue(s); }).length;

    // Weakness info
    const weakHTML = typeof AI !== 'undefined' ? AI.errorAnalysis.renderReport() : '';

    // Quick practice options
    const convs = typeof CONVERSATIONS !== 'undefined' ? CONVERSATIONS : [];
    const unplayed = convs.filter(c => !Conversation._getConvProgress(c.id));
    const suggestedConv = unplayed.length > 0 ? unplayed[0] : convs[0];

    return `<div class="learn-hub-section">
      ${due > 0 ? `
        <div class="learn-hub-card card" onclick="App.startReviewSession()" style="cursor:pointer">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-size:36px">🔄</div>
            <div style="flex:1">
              <div style="font-size:17px;font-weight:800">Wiederholung</div>
              <div style="font-size:13px;color:var(--text2)">${due} Karten fällig</div>
            </div>
            <div style="color:var(--accent);font-size:20px;font-weight:700">→</div>
          </div>
        </div>
      ` : `<div class="card" style="text-align:center;padding:20px;color:var(--text2)">
        <div style="font-size:32px;margin-bottom:8px">✅</div>
        <div style="font-weight:600">Keine Karten fällig!</div>
        <div style="font-size:13px;margin-top:4px">Komm morgen wieder oder lerne neue Inhalte.</div>
      </div>`}

      ${weakHTML}

      <div class="chart-title" style="margin-top:16px">Gespräch üben</div>
      ${suggestedConv ? `
        <div class="conv-item card" onclick="Conversation.start('${suggestedConv.id}')" style="cursor:pointer">
          <span class="conv-icon">${suggestedConv.icon}</span>
          <div class="conv-info">
            <div class="conv-title">${suggestedConv.title}</div>
            <div class="conv-sub">${suggestedConv.subtitle}</div>
          </div>
          <span style="color:var(--accent)">→</span>
        </div>
      ` : ''}
      <button class="btn-secondary" onclick="Conversation.showList()" style="margin-top:8px;font-size:13px">Alle ${convs.length} Gespräche →</button>
    </div>`;
  },

  _learnHubEntdecken() {
    // Combined vocab + grammar browser
    return `<div class="learn-hub-section">
      <div class="chart-title">Vokabeln nach Thema</div>
      ${this._learnHubVocab()}
      <div class="chart-title" style="margin-top:16px">Grammatik nach Lektion</div>
      ${this._learnHubGrammar()}
    </div>`;
  },

  _learnHubSmart() {
    CardEngine.checkUnlocks();
    const all = CardEngine.buildAll();
    const due = all.filter(c => { const s = DB.getCardState(c.id); return s && SRS.isDue(s); }).length;
    const unitId = CardEngine.getCurrentUnit();
    const lesson = LESSONS.find(l => l.id === unitId);
    const unitProg = DB.getUnitProgress(unitId, all);
    const profile = DB.getProfile();

    return `
      <div class="learn-hub-section">
        <div class="learn-hub-card card" onclick="App.startSmartSession()" style="cursor:pointer">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-size:36px">🚀</div>
            <div style="flex:1">
              <div style="font-size:17px;font-weight:800">Smart Session starten</div>
              <div style="font-size:13px;color:var(--text2);margin-top:2px">
                ${due > 0 ? `${due} Karten fällig` : 'Neue Karten lernen'}
                 · Lektion ${unitId}: ${unitProg}%
              </div>
            </div>
            <div style="color:var(--accent);font-size:20px">→</div>
          </div>
        </div>

        <div class="chart-title" style="margin-top:16px">Aktuelle Lektion</div>
        <div class="card" style="display:flex;gap:12px;align-items:center">
          <div class="unit-badge" style="background:${lesson?.color||'#006B3C'}">${unitId}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px">${lesson?.title || '—'}</div>
            <div style="font-size:12px;color:var(--text2)">${lesson?.subtitle || ''}</div>
            <div class="progress-bar-wrap" style="margin-top:6px">
              <div class="progress-bar" style="width:${unitProg}%;background:${lesson?.color||'#006B3C'}"></div>
            </div>
          </div>
          <div style="font-size:15px;font-weight:800">${unitProg}%</div>
        </div>

        ${typeof AI !== 'undefined' && AI.errorAnalysis.getWeaknesses(3).length > 0 ? `
          <div class="chart-title" style="margin-top:16px">Schwächen gezielt üben</div>
          <div class="card" onclick="App.startWeaknessSession()" style="cursor:pointer;display:flex;align-items:center;gap:12px">
            <div style="font-size:24px">🎯</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:14px">Schwächen-Training</div>
              <div style="font-size:12px;color:var(--text2)">Karten üben, die dir schwer fallen</div>
            </div>
            <div style="color:var(--accent)">→</div>
          </div>
        ` : ''}
      </div>
    `;
  },

  _learnHubVocab() {
    const cards = CardEngine.buildAll();
    const catMap = {};
    cards.filter(c => c.hint && (c.type === 'vocab' || c.type === 'phrase')).forEach(c => {
      if (!catMap[c.hint]) catMap[c.hint] = { total: 0, seen: 0 };
      catMap[c.hint].total++;
      if (DB.getCardState(c.id)) catMap[c.hint].seen++;
    });

    const sections = {
      'Grundlagen': ['essencial','básico','expressões','emergência'],
      'Menschen': ['profissões','nationalidades','países','família','descrição física','carácter','cabelo','olhos','social'],
      'Essen & Trinken': ['comida','alimentação','bebidas','restaurante','refeições'],
      'Einkaufen & Kleidung': ['compras','roupa','comércio'],
      'Unterwegs': ['transportes','direções','localização','lugares','hotel'],
      'Alltag & Freizeit': ['actividades','rotina','tempo','lazer','cultura','sentimentos','desporto'],
      'Gesundheit': ['corpo','saúde','farmácia'],
      'Kommunikation': ['comunicação','tecnologia','burocracia','habitação'],
    };

    const usedCats = new Set();
    let html = '';
    Object.entries(sections).forEach(([title, cats]) => {
      const validCats = cats.filter(c => catMap[c]);
      if (!validCats.length) return;
      const catsHTML = validCats.map(cat => {
        usedCats.add(cat);
        const d = catMap[cat];
        const pct = d.total > 0 ? Math.round(d.seen / d.total * 100) : 0;
        return `<button class="vocab-cat-btn card" onclick="App.startCategorySession('${UI._esc(cat)}')">
          <div class="vocab-cat-info"><div class="vocab-cat-name">${cat}</div><div class="vocab-cat-count">${d.seen}/${d.total}</div></div>
          <div class="vocab-cat-bar-wrap"><div class="vocab-cat-bar" style="width:${pct}%"></div></div>
        </button>`;
      }).join('');
      html += `<div class="vocab-section"><div class="chart-title">${title}</div><div class="vocab-cats">${catsHTML}</div></div>`;
    });

    // Uncategorized
    const uncat = Object.keys(catMap).filter(k => !usedCats.has(k));
    if (uncat.length) {
      html += `<div class="vocab-section"><div class="chart-title">Weitere</div><div class="vocab-cats">${uncat.map(cat => {
        const d = catMap[cat]; const pct = d.total > 0 ? Math.round(d.seen / d.total * 100) : 0;
        return `<button class="vocab-cat-btn card" onclick="App.startCategorySession('${UI._esc(cat)}')"><div class="vocab-cat-info"><div class="vocab-cat-name">${cat}</div><div class="vocab-cat-count">${d.seen}/${d.total}</div></div><div class="vocab-cat-bar-wrap"><div class="vocab-cat-bar" style="width:${pct}%"></div></div></button>`;
      }).join('')}</div></div>`;
    }

    const totalVocab = Object.values(catMap).reduce((s,d) => s+d.total, 0);
    const totalSeen = Object.values(catMap).reduce((s,d) => s+d.seen, 0);
    return `<div class="learn-hub-section">
      <p style="color:var(--text2);font-size:14px;margin-bottom:12px">${totalSeen}/${totalVocab} Wörter gelernt</p>
      ${html}
    </div>`;
  },

  _learnHubGrammar() {
    const cards = CardEngine.buildAll();
    CardEngine.checkUnlocks();

    // Group grammar by unit
    const unitGrammar = {};
    cards.filter(c => c.type === 'rule').forEach(c => {
      if (!unitGrammar[c.unit]) unitGrammar[c.unit] = [];
      unitGrammar[c.unit].push(c);
    });

    let html = '';
    LESSONS.forEach(lesson => {
      const rules = unitGrammar[lesson.id] || [];
      if (!rules.length) return;
      const isLocked = !lesson.unlocked && lesson.id > 1;

      const rulesHTML = rules.map(r => {
        const state = DB.getCardState(r.id);
        const mastery = SRS.masteryScore(state);
        const color = mastery >= 70 ? 'var(--green)' : mastery >= 30 ? 'var(--orange)' : 'var(--text3)';
        const dot = mastery >= 70 ? '✓' : mastery > 0 ? '◐' : '○';
        return `<div class="grammar-item" onclick="App.startGrammarSession('${r.id}')" style="cursor:pointer">
          <span style="color:${color};font-size:12px;width:16px">${dot}</span>
          <span style="flex:1;font-size:13px;font-weight:500">${r.question}</span>
          <span style="font-size:11px;color:${color};font-weight:700">${mastery}%</span>
        </div>`;
      }).join('');

      html += `
        <div class="card ${isLocked ? 'locked' : ''}" style="margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div class="unit-num" style="background:${lesson.color};width:28px;height:28px;font-size:11px">${lesson.id}</div>
            <div style="font-weight:700;font-size:14px;flex:1">${lesson.title}</div>
            ${isLocked ? '<span>🔒</span>' : ''}
          </div>
          ${isLocked ? '' : rulesHTML}
        </div>`;
    });

    return `<div class="learn-hub-section">
      <p style="color:var(--text2);font-size:14px;margin-bottom:12px">${cards.filter(c => c.type === 'rule').length} Grammatikregeln · Tippe auf eine Regel zum Üben</p>
      ${html}
    </div>`;
  },

  _learnHubConv() {
    const convs = typeof CONVERSATIONS !== 'undefined' ? CONVERSATIONS : [];
    const sorted = [...convs].sort((a, b) => {
      const pa = Conversation._getConvProgress(a.id);
      const pb = Conversation._getConvProgress(b.id);
      if (!pa && pb) return -1;
      if (pa && !pb) return 1;
      if (pa && pb) return pa.bestPct - pb.bestPct;
      return 0;
    });

    const completedCount = convs.filter(c => Conversation._getConvProgress(c.id)).length;
    const listHTML = sorted.map(c => {
      const prog = Conversation._getConvProgress(c.id);
      let badge = prog
        ? `<span style="font-size:13px;font-weight:700;color:${prog.bestPct >= 70 ? 'var(--green)' : prog.bestPct >= 40 ? 'var(--orange)' : 'var(--red)'}">${prog.bestPct}%</span>`
        : `<span class="conv-diff">Neu</span>`;
      let sub = prog ? `${prog.attempts}x geübt · Beste: ${prog.bestPct}%` : c.subtitle;
      return `<button class="conv-item card" onclick="Conversation.start('${c.id}')">
        <span class="conv-icon">${c.icon}</span>
        <div class="conv-info"><div class="conv-title">${c.title}</div><div class="conv-sub">${sub}</div></div>
        ${badge}
      </button>`;
    }).join('');

    return `<div class="learn-hub-section">
      <p style="color:var(--text2);font-size:14px;margin-bottom:12px">${completedCount}/${convs.length} abgeschlossen</p>
      <div class="conv-list">${listHTML}</div>
    </div>`;
  },

  // Start a session for a specific grammar rule + its exercises
  startGrammarSession(ruleId) {
    const cards = CardEngine.buildAll();
    const ruleCard = cards.find(c => c.id === ruleId && c.type === 'rule');
    const exercises = cards.filter(c => c.type === 'rule-exercise' && c.ruleId === ruleId);
    if (!ruleCard) return;

    const queue = [ruleCard, ...CardEngine._shuffle(exercises).slice(0, 8)];

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    Session._moduleId = null;
    Session.stats = { correct: 0, wrong: 0, seen: 0 };
    Session.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    Session._recentResults = [];
    Session._sessionSeenIds = new Set();
    Session._smartConvId = undefined;
    Session.startTime = Date.now();
    Session.phase = 'new';
    Session.queue = queue;
    Session.currentIdx = 0;
    DB.updateStreak();
    UI.showPhase('new', queue.length, ruleCard.question);
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
          <button class="mode-btn active">Lektionen</button>
          <button class="mode-btn" onclick="App.showVocabBrowser()">Vokabeln</button>
          <button class="mode-btn" onclick="Conversation.showList()">Gespräche</button>
          <button class="mode-btn" onclick="AI.conversation.showScenarios()">AI Chat</button>
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

  showVocabBrowser() {
    const el = document.getElementById('learn-content');
    const cards = CardEngine.buildAll();

    // Group by category
    const catMap = {};
    cards.filter(c => c.hint && (c.type === 'vocab' || c.type === 'phrase')).forEach(c => {
      if (!catMap[c.hint]) catMap[c.hint] = { cards: [], seen: 0, mastered: 0 };
      catMap[c.hint].cards.push(c);
      const state = DB.getCardState(c.id);
      if (state) {
        catMap[c.hint].seen++;
        if (SRS.masteryScore(state) >= 70) catMap[c.hint].mastered++;
      }
    });

    // Group categories into thematic sections
    const sections = {
      'Grundlagen': ['essencial','básico','expressões','emergência'],
      'Menschen': ['profissões','nationalidades','países','família','descrição física','carácter','cabelo','olhos','tratamento','social'],
      'Essen & Trinken': ['comida','alimentação','bebidas','restaurante','refeições'],
      'Einkaufen': ['compras','roupa','comércio'],
      'Unterwegs': ['transportes','direções','localização','lugares','hotel'],
      'Alltag': ['actividades','rotina','tempo','lazer','cultura','sentimentos','desporto'],
      'Gesundheit': ['corpo','saúde','farmácia'],
      'Kommunikation': ['comunicação','tecnologia','cartas','telefone','burocracia','habitação'],
      'Sprache': ['números','cores','objectos','advérbios lugar','advérbios tempo','preposições','pronomes','artigos','nomes','adjectivos','questões'],
    };

    let sectionsHTML = '';
    const usedCats = new Set();

    Object.entries(sections).forEach(([sectionTitle, catKeys]) => {
      const catsInSection = catKeys.filter(k => catMap[k]);
      if (catsInSection.length === 0) return;

      const catsHTML = catsInSection.map(cat => {
        usedCats.add(cat);
        const data = catMap[cat];
        const total = data.cards.length;
        const pct = total > 0 ? Math.round(data.seen / total * 100) : 0;
        const masteredPct = total > 0 ? Math.round(data.mastered / total * 100) : 0;
        const color = masteredPct >= 70 ? 'var(--green)' : masteredPct >= 30 ? 'var(--orange)' : 'var(--text3)';
        return `
          <button class="vocab-cat-btn card" onclick="App.startCategorySession('${UI._esc(cat)}')">
            <div class="vocab-cat-info">
              <div class="vocab-cat-name">${cat}</div>
              <div class="vocab-cat-count">${data.seen}/${total} Wörter</div>
            </div>
            <div class="vocab-cat-bar-wrap">
              <div class="vocab-cat-bar" style="width:${pct}%;background:${color}"></div>
            </div>
          </button>
        `;
      }).join('');

      sectionsHTML += `
        <div class="vocab-section">
          <div class="chart-title">${sectionTitle}</div>
          <div class="vocab-cats">${catsHTML}</div>
        </div>
      `;
    });

    // Add any uncategorized categories
    const uncategorized = Object.keys(catMap).filter(k => !usedCats.has(k));
    if (uncategorized.length > 0) {
      const uncatHTML = uncategorized.map(cat => {
        const data = catMap[cat];
        const total = data.cards.length;
        const pct = total > 0 ? Math.round(data.seen / total * 100) : 0;
        return `
          <button class="vocab-cat-btn card" onclick="App.startCategorySession('${UI._esc(cat)}')">
            <div class="vocab-cat-info">
              <div class="vocab-cat-name">${cat}</div>
              <div class="vocab-cat-count">${data.seen}/${total}</div>
            </div>
            <div class="vocab-cat-bar-wrap">
              <div class="vocab-cat-bar" style="width:${pct}%"></div>
            </div>
          </button>
        `;
      }).join('');
      sectionsHTML += `<div class="vocab-section"><div class="chart-title">Weitere</div><div class="vocab-cats">${uncatHTML}</div></div>`;
    }

    const totalVocab = Object.values(catMap).reduce((sum, d) => sum + d.cards.length, 0);
    const totalSeen = Object.values(catMap).reduce((sum, d) => sum + d.seen, 0);

    el.innerHTML = `
      <div class="pre-session">
        <div class="mode-toggle">
          <button class="mode-btn" onclick="App.showLearnMenu()">Lektionen</button>
          <button class="mode-btn active">Vokabeln</button>
          <button class="mode-btn" onclick="Conversation.showList()">Gespräche</button>
        </div>
        <h2>Vokabeln entdecken</h2>
        <p style="color:var(--text2);font-size:14px">${totalSeen}/${totalVocab} Wörter gelernt — Wähle eine Kategorie</p>
        ${sectionsHTML}
      </div>
    `;
  },

  startWeaknessSession() {
    if (typeof AI === 'undefined') return;
    const cards = AI.errorAnalysis.getTargetedCards(15);
    if (cards.length === 0) { alert('Keine Schwächen erkannt! Lerne weiter.'); return; }

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    Session._moduleId = null;
    Session.stats = { correct: 0, wrong: 0, seen: 0 };
    Session.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    Session._recentResults = [];
    Session._sessionSeenIds = new Set();
    Session.startTime = Date.now();
    Session.phase = 'new';
    Session.queue = cards;
    Session.currentIdx = 0;
    DB.updateStreak();
    UI.showPhase('new', cards.length, 'Schwächen üben');
  },

  startCategorySession(category) {
    // Vocab browser sessions use the same SRS system — progress counts everywhere
    const cards = CardEngine.buildAll().filter(c => c.hint === category && (c.type === 'vocab' || c.type === 'phrase'));
    if (cards.length === 0) return;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    // Mix unseen and weak cards
    const unseen = cards.filter(c => !DB.getCardState(c.id));
    const weak = cards.filter(c => {
      const state = DB.getCardState(c.id);
      return state && SRS.masteryScore(state) < 50;
    });
    const due = cards.filter(c => {
      const state = DB.getCardState(c.id);
      return state && SRS.isDue(state);
    });

    let queue = [...CardEngine._shuffle(due), ...CardEngine._shuffle(unseen), ...CardEngine._shuffle(weak)];
    // Deduplicate
    const seenIds = new Set();
    queue = queue.filter(c => { if (seenIds.has(c.id)) return false; seenIds.add(c.id); return true; });
    queue = queue.slice(0, 15);

    if (queue.length === 0) {
      alert('Alle Wörter in dieser Kategorie gemeistert!');
      return;
    }

    Session._moduleId = null;
    Session.stats = { correct: 0, wrong: 0, seen: 0 };
    Session.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    Session._recentResults = [];
    Session._sessionSeenIds = new Set();
    Session.startTime = Date.now();
    Session.phase = 'new';
    Session.queue = queue;
    Session.currentIdx = 0;
    DB.updateStreak();
    UI.showPhase('new', queue.length, category);
  },

  // Conversation-to-lesson mapping for smart sessions
  _convForUnit: {
    1:'conv4', 2:'conv4', 3:'conv2', 4:'conv6', 5:'conv16', 6:'conv1',
    7:'conv15', 8:'conv10', 9:'conv5', 10:'conv7', 11:'conv8', 12:'conv17',
    13:'conv8', 14:'conv10'
  },

  startSmartSession() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    CardEngine.checkUnlocks();
    const unitId = CardEngine.getCurrentUnit();

    // Phase 1: Collect due cards (all sources, max 12)
    const dueCards = CardEngine.getDueCards(12);

    // Phase 2: Collect new cards from current lesson (max 8)
    const newCards = CardEngine.getNewCards(unitId, 8);

    // Phase 3: Pick matching conversation
    const convId = this._convForUnit[unitId] || null;
    const convAvailable = convId && typeof CONVERSATIONS !== 'undefined' &&
      CONVERSATIONS.find(c => c.id === convId);

    // Start the smart session
    Session.startSmart(dueCards, newCards, convAvailable ? convId : null);
  },

  startLesson(unitId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    // Build a structured lesson with 4 phases
    const unitCards = CardEngine.forUnit(unitId);
    const unseen = unitCards.filter(c => !DB.getCardState(c.id));
    const weak = unitCards.filter(c => { const s = DB.getCardState(c.id); return s && SRS.masteryScore(s) < 50; });

    // Phase 1: Introduction (5 cards, recognition = multiple choice)
    const introCards = CardEngine._shuffle(unseen.filter(c => c.type === 'vocab' || c.type === 'phrase')).slice(0, 5);
    // Phase 2: Practice (8 cards, mixed types)
    const practiceCards = CardEngine._shuffle([
      ...unseen.filter(c => c.type === 'conjugation' || c.type === 'rule-exercise').slice(0, 4),
      ...unseen.filter(c => c.type === 'context').slice(0, 2),
      ...CardEngine._shuffle(weak).slice(0, 2)
    ]).slice(0, 8);
    // Phase 3: Production (5 cards, DE→PT direction + conjugations)
    const prodCards = CardEngine._shuffle([
      ...unseen.filter(c => c.dir === 'de-pt').slice(0, 3),
      ...unseen.filter(c => c.type === 'rule-exercise' && c.exerciseType === 'translate').slice(0, 2)
    ]).slice(0, 5);

    const allCards = [...introCards, ...practiceCards, ...prodCards];
    // Deduplicate
    const seenIds = new Set();
    const queue = allCards.filter(c => { if (seenIds.has(c.id)) return false; seenIds.add(c.id); return true; });

    if (queue.length === 0) {
      // All cards seen — start review instead
      this.startReviewSession();
      return;
    }

    // Pick matching conversation for Phase 4
    const convId = this._convForUnit[unitId];

    Session._moduleId = null;
    Session._smartConvId = convId || null;
    Session.stats = { correct: 0, wrong: 0, seen: 0 };
    Session.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    Session._recentResults = [];
    Session._sessionSeenIds = new Set();
    Session.startTime = Date.now();
    Session.phase = 'new';
    Session.queue = queue;
    Session.currentIdx = 0;
    DB.updateStreak();

    const lesson = LESSONS.find(l => l.id === unitId);
    UI.showPhase('new', queue.length, lesson ? `Lektion ${unitId}: ${lesson.title}` : '');
  },

  startReviewSession() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');

    const dueCards = CardEngine.getDueCards(20);
    if (dueCards.length === 0) {
      document.getElementById('learn-content').innerHTML = `
        <div class="pre-session" style="padding-top:60px">
          <div style="font-size:48px">✅</div>
          <h2>Alles wiederholt!</h2>
          <p style="color:var(--text2)">Keine Karten fällig. Komm morgen wieder oder lerne neue Inhalte.</p>
          <button class="btn-primary" onclick="App.showLearnHub()">Zurück</button>
        </div>`;
      return;
    }

    Session._moduleId = null;
    Session._smartConvId = undefined;
    Session.stats = { correct: 0, wrong: 0, seen: 0 };
    Session.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    Session._recentResults = [];
    Session._sessionSeenIds = new Set();
    Session.startTime = Date.now();
    Session.phase = 'review';
    Session.queue = dueCards;
    Session.currentIdx = 0;
    DB.updateStreak();
    UI.showPhase('review', dueCards.length);
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
          <button class="mode-btn" onclick="App.showLearnMenu()">Lektionen</button>
          <button class="mode-btn" onclick="App.showVocabBrowser()">Vokabeln</button>
          <button class="mode-btn active">Gespräche</button>
          <button class="mode-btn" onclick="AI.conversation.showScenarios()">AI Chat</button>
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

  _onEndCallback: null, // Called after conversation ends (for smart sessions)

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
        ${this._onEndCallback ? `
          <button class="btn-primary" onclick="Conversation._onEndCallback(); Conversation._onEndCallback = null;">Weiter zur Auswertung →</button>
        ` : `
          <button class="btn-primary" onclick="Conversation.start('${this.current.id}')">Nochmal üben</button>
          <button class="btn-secondary" onclick="Conversation.showList()" style="margin-top:8px">Zurück zur Liste</button>
        `}
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
