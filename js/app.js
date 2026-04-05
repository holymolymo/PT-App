// Aprender Português — Main App Logic
'use strict';

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
        unit: 0,
        source: 'extra',
        type: 'vocab',
        dir: 'pt-de',
        question: v.pt,
        answer: v.de,
        hint: v.cat,
        explanation: v.note || null,
        raw: v
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
      const state = DB.getCardState(c.id);
      return SM2.isDue(state) && state !== null; // only previously seen cards
    });
    return this._shuffle(due).slice(0, maxCount);
  },

  // Get new cards from the current unit
  getNewCards(unitId, maxCount = 15) {
    const unitCards = this.forUnit(unitId);
    const unseen = unitCards.filter(c => DB.getCardState(c.id) === null);
    // Interleave: alternate vocab and grammar
    const vocab = unseen.filter(c => c.type === 'vocab' || c.type === 'phrase');
    const grammar = unseen.filter(c => c.type === 'conjugation' || c.type === 'rule');
    const mixed = [];
    const maxV = Math.ceil(maxCount * 0.6);
    const maxG = maxCount - maxV;
    vocab.slice(0, maxV).forEach((c, i) => {
      mixed.push(c);
      if (grammar[i]) mixed.push(grammar[i]);
    });
    // Fill remaining
    grammar.slice(Math.floor(maxCount * 0.5)).forEach(c => {
      if (mixed.length < maxCount) mixed.push(c);
    });
    return mixed.slice(0, maxCount);
  },

  // Determine current learning unit
  getCurrentUnit() {
    const profile = DB.getProfile();
    return profile.currentUnit || 1;
  },

  // Check if unit should be unlocked (previous unit ≥ 80% mastered)
  checkUnlocks() {
    const all = this.buildAll();
    LESSONS.forEach((lesson, i) => {
      if (i === 0) return; // First unit always unlocked
      const prevUnit = LESSONS[i - 1];
      const progress = DB.getUnitProgress(prevUnit.id, all);
      if (progress >= 80) {
        lesson.unlocked = true;
      }
    });
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

  start() {
    this.stats = { correct: 0, wrong: 0, seen: 0 };
    this.phaseStats = { review:{correct:0,wrong:0}, new:{correct:0,wrong:0} };
    this.startTime = Date.now();
    DB.updateStreak();
    this._startReviewPhase();
  },

  _startReviewPhase() {
    this.phase = 'review';
    const dueCards = CardEngine.getDueCards(20);
    this.queue = dueCards;
    this.currentIdx = 0;
    if (dueCards.length === 0) {
      // No due cards — jump straight to new content
      this._startNewPhase();
      return;
    }
    UI.showPhase('review', dueCards.length);
    this._showCard();
  },

  _startNewPhase() {
    this.phase = 'new';
    const unitId = CardEngine.getCurrentUnit();
    const newCards = CardEngine.getNewCards(unitId, 12);
    this.queue = newCards;
    this.currentIdx = 0;
    if (newCards.length === 0) {
      this._startSummary();
      return;
    }
    UI.showPhase('new', newCards.length);
    this._showCard();
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
        UI.showPhaseTransition('new', () => this._startNewPhase());
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
    const newState = SM2.calc(quality, state);
    DB.setCardState(card.id, newState);

    const correct = quality >= 3;
    this.stats.seen++;
    if (correct) this.stats.correct++; else this.stats.wrong++;
    this.phaseStats[this.phase][correct ? 'correct' : 'wrong']++;

    // If wrong, re-add card to end of queue (once)
    if (!correct && !card._retried) {
      const retry = { ...card, _retried: true };
      this.queue.push(retry);
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
      return SM2.isDue(state) && state !== null;
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

      <button class="btn-primary start-session-btn" onclick="App.startSession()">
        Heute lernen →
      </button>

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
  showPhase(phase, totalCards) {
    const labels = {
      review: { title:'Wiederholung', icon:'🔄', desc:`${totalCards} fällige Karten auffrischen` },
      new:    { title:'Neuer Stoff', icon:'✨', desc:`Neue Inhalte aus der aktuellen Lektion` }
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

  showPhaseTransition(nextPhase, onContinue) {
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

    let questionHTML = '';
    if (isConj) {
      questionHTML = `
        <div class="card-label">Konjugiere auf Portugiesisch</div>
        <div class="card-tense-badge">${card.tenseLabel}</div>
        <div class="card-verb">${card.verb}</div>
        <div class="card-pronoun">${card.pronoun} →</div>
      `;
    } else if (isRule) {
      questionHTML = `
        <div class="card-label">Grammatikregel</div>
        <div class="card-question-text">${card.question}</div>
      `;
    } else {
      const isDE = card.dir === 'de-pt';
      questionHTML = `
        <div class="card-label">${isDE ? 'Auf Portugiesisch:' : 'Was bedeutet:'}</div>
        ${card.hint ? `<div class="card-cat-badge">${card.hint}</div>` : ''}
        <div class="card-question-text">${card.question}</div>
      `;
    }

    // Use multiple choice for vocab/phrases, free input for conjugation
    let answerHTML = '';
    if (isConj || isRule) {
      answerHTML = `
        <div class="answer-input-wrap">
          <input type="text" id="card-input" class="card-input"
            placeholder="${isConj ? 'Form eingeben…' : 'Antwort eingeben…'}"
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
    const userAnswer = input.value.trim().toLowerCase();
    const card = Session.queue[Session.currentIdx];
    const correct = card.answer.toLowerCase();
    const isCorrect = userAnswer === correct ||
      this._normalize(userAnswer) === this._normalize(correct);
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

    const explanationHTML = card.explanation
      ? `<div class="explanation"><span>💡</span><span>${card.explanation}</span></div>` : '';

    const examplesHTML = card.examples && card.examples.length
      ? `<div class="examples">${card.examples.map(e=>`<div class="example">• ${e}</div>`).join('')}</div>` : '';

    el.innerHTML = `
      <div class="feedback-wrap ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
        <div class="feedback-emoji">${emoji}</div>
        <div class="feedback-title">${msg}</div>
        ${!isCorrect ? `<div class="feedback-wrong-answer">Du: ${Session.queue[Session.currentIdx].lastUserAnswer || '?'}</div>` : ''}
        <div class="feedback-answer-card">
          <div class="feedback-label">${card.type==='conjugation'?'Richtige Form:':'Richtige Antwort:'}</div>
          <div class="feedback-answer">${card.answer}</div>
          ${card.type==='conjugation'?`<div class="feedback-verb">${card.verb} (${card.tenseLabel}), ${card.pronoun}</div>`:''}
        </div>
        ${explanationHTML}
        ${examplesHTML}
        <div class="rating-buttons">
          <button class="rating-btn rating-again" onclick="Session.answer(Session.queue[Session.currentIdx-1||0], 1)">Nochmal</button>
          <button class="rating-btn rating-good"  onclick="Session.answer(Session.queue[Session.currentIdx-1||0], 4)">Gut</button>
          <button class="rating-btn rating-easy"  onclick="Session.answer(Session.queue[Session.currentIdx-1||0], 5)">Super!</button>
        </div>
      </div>
    `;
    // Prevent double-fire by storing the card reference before currentIdx increments
    // Rating buttons reference queue[currentIdx] but Session.answer increments after call
    // We store a closure with the right card
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

    const unitsHTML = LESSONS.map(lesson => {
      const prog = DB.getUnitProgress(lesson.id, all);
      const unitCards = all.filter(c => c.unit === lesson.id).length;
      const seen = all.filter(c => c.unit === lesson.id && DB.getCardState(c.id)).length;
      const isLocked = !lesson.unlocked && lesson.id > 1;
      return `
        <div class="unit-row card ${isLocked ? 'locked' : ''}">
          <div class="unit-num" style="background:${lesson.color}">${lesson.id}</div>
          <div class="unit-row-info">
            <div class="unit-row-title">${lesson.title}</div>
            <div class="unit-row-sub">${seen}/${unitCards} Karten gesehen</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar" style="width:${prog}%;background:${lesson.color}"></div>
            </div>
          </div>
          <div class="unit-row-pct">${isLocked ? '🔒' : prog + '%'}</div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="progress-header">
        <h2>Dein Fortschritt</h2>
        <div class="overall-stats">
          <div class="stat-box"><span>${profile.streak}</span><span>🔥 Streak</span></div>
          <div class="stat-box"><span>${profile.sessionsCompleted}</span><span>Sessions</span></div>
          <div class="stat-box"><span>${totalPct}%</span><span>Genauigkeit</span></div>
        </div>
      </div>
      <div class="units-list">${unitsHTML}</div>
    `;
  },

  // ── Settings Screen ────────────────────────────────────────────────────
  renderSettings() {
    const el = document.getElementById('settings-content');
    el.innerHTML = `
      <div class="settings-header"><h2>Einstellungen</h2></div>
      <div class="settings-list">
        <div class="settings-section">
          <div class="settings-label">Daten</div>
          <button class="settings-btn" onclick="App.exportData()">📤 Daten exportieren</button>
          <button class="settings-btn" onclick="App.importData()">📥 Daten importieren</button>
          <button class="settings-btn danger" onclick="App.resetProgress()">⚠️ Fortschritt zurücksetzen</button>
        </div>
        <div class="settings-section">
          <div class="settings-label">App-Info</div>
          <div class="settings-info">Aprender Português 1<br>Version 1.0<br>Europäisches Portugiesisch A1/A2</div>
        </div>
        <div class="settings-section">
          <div class="settings-label">Hilfe</div>
          <div class="settings-info">
            <b>Bewertungs-System:</b><br>
            🔴 Nochmal = Karte kommt morgen wieder<br>
            🟡 Gut = In einigen Tagen<br>
            🟢 Super! = In einigen Wochen
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
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// APP — Entry point
// ══════════════════════════════════════════════════════════════════════════════

const App = {
  init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
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
          document.getElementById('learn-content').innerHTML = `
            <div class="pre-session">
              <div class="pre-icon">📚</div>
              <h2>Hey, bereit für heute?</h2>
              <p>Lass uns loslegen! Deine 30-Minuten-Session wartet.</p>
              <div class="session-plan">
                <div>🔄 <b>10 Min</b> – Wiederholung</div>
                <div>✨ <b>15 Min</b> – Neuer Stoff</div>
                <div>📊 <b>5 Min</b> – Auswertung</div>
              </div>
              <button class="btn-primary" onclick="App.startSession()">Session starten</button>
            </div>
          `;
        } else {
          UI.navigateTo(screen);
        }
      });
    });

    // Init data
    CardEngine.checkUnlocks();
    UI.renderHome();
  },

  startSession() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.getElementById('screen-learn').classList.add('active');
    document.querySelector('[data-screen="learn"]')?.classList.add('active');
    Session.start();
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

  resetProgress() {
    if (confirm('Wirklich ALLES zurücksetzen? Das kann nicht rückgängig gemacht werden!')) {
      DB.clearAll();
      CardEngine._cache = null;
      LESSONS.forEach((l, i) => l.unlocked = i === 0);
      UI.navigateTo('home');
    }
  }
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
