// AI-powered features: Free conversation, Speech recognition, Error analysis
'use strict';

const AI = {
  // ── API Key Management ────────────────────────────────────────────
  getApiKey() {
    return localStorage.getItem('ptapp_api_key') || '';
  },

  setApiKey(key) {
    localStorage.setItem('ptapp_api_key', key.trim());
  },

  hasApiKey() {
    return this.getApiKey().length > 10;
  },

  // ── Claude API Call ───────────────────────────────────────────────
  async callClaude(messages, systemPrompt) {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error('Kein API Key');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || 'API Fehler: ' + response.status);
    }

    const data = await response.json();
    return data.content[0].text;
  },

  // ── Free Conversation ─────────────────────────────────────────────
  conversation: {
    messages: [],
    scenario: null,
    isLoading: false,

    scenarios: [
      {id:'free', title:'Freies Gespräch', icon:'💬', desc:'Rede über was du willst', system:'Du bist ein freundlicher Gesprächspartner. Der Lerner ist auf A1/A2 Niveau.'},
      {id:'cafe', title:'Im Café', icon:'☕', desc:'Bestelle Getränke und Essen', system:'Du bist ein Kellner in einem Café in Lissabon. Sei freundlich und natürlich.'},
      {id:'market', title:'Auf dem Markt', icon:'🍊', desc:'Kaufe Obst und Gemüse', system:'Du bist ein Verkäufer auf dem Markt in Lissabon. Verkaufe Obst, Gemüse und Fisch. Nenne Preise.'},
      {id:'taxi', title:'Im Taxi', icon:'🚕', desc:'Smalltalk mit dem Taxifahrer', system:'Du bist ein freundlicher Taxifahrer in Lissabon. Mach Smalltalk über die Stadt, das Wetter, woher der Fahrgast kommt.'},
      {id:'neighbor', title:'Der neue Nachbar', icon:'🏠', desc:'Stelle dich deinem Nachbarn vor', system:'Du bist ein portugiesischer Nachbar. Der Lerner ist gerade neu eingezogen. Stelle Fragen und sei neugierig.'},
      {id:'doctor', title:'Beim Arzt', icon:'🏥', desc:'Beschreibe deine Symptome', system:'Du bist ein Arzt in einer Klinik. Der Patient beschreibt Symptome. Stelle Nachfragen und gib Ratschläge.'},
    ],

    getSystemPrompt(scenarioId) {
      const scenario = this.scenarios.find(s => s.id === scenarioId);
      const base = scenario ? scenario.system : this.scenarios[0].system;
      return `${base}

WICHTIGE REGELN:
- Sprich NUR Europäisches Portugiesisch (Portugal, NICHT Brasilien)
- Halte deine Antworten KURZ (1-3 Sätze, max 40 Wörter)
- Verwende einfache Sprache (A1/A2 Niveau)
- Wenn der Lerner einen Fehler macht, korrigiere ihn SANFT in Klammern: [Kleine Korrektur: "X" statt "Y"]
- Stelle am Ende oft eine Frage, um das Gespräch am Laufen zu halten
- Verwende typische EU-PT Ausdrücke: "pronto", "pois", "está bem"
- ANTWORTE NUR AUF PORTUGIESISCH (mit kurzer deutscher Übersetzung in Klammern bei schwierigen Wörtern)`;
    },

    async send(userText) {
      if (this.isLoading) return;
      this.isLoading = true;

      this.messages.push({ role: 'user', content: userText });
      this._render();

      try {
        const reply = await AI.callClaude(
          this.messages.map(m => ({ role: m.role, content: m.content })),
          this.getSystemPrompt(this.scenario)
        );
        this.messages.push({ role: 'assistant', content: reply });
      } catch (e) {
        this.messages.push({ role: 'assistant', content: `[Fehler: ${e.message}]` });
      }

      this.isLoading = false;
      this._render();
    },

    start(scenarioId) {
      this.scenario = scenarioId;
      this.messages = [];
      this.isLoading = true;
      this._render();

      // Get initial AI message
      AI.callClaude(
        [{ role: 'user', content: 'Beginne das Gespräch. Begrüße mich und stelle eine einfache Frage.' }],
        this.getSystemPrompt(scenarioId)
      ).then(reply => {
        this.messages = [{ role: 'assistant', content: reply }];
        this.isLoading = false;
        this._render();
      }).catch(e => {
        this.messages = [{ role: 'assistant', content: `[Fehler: ${e.message}]` }];
        this.isLoading = false;
        this._render();
      });
    },

    showScenarios() {
      const el = document.getElementById('learn-content');
      if (!AI.hasApiKey()) {
        el.innerHTML = `
          <div class="pre-session">
            <div class="mode-toggle">
              <button class="mode-btn" onclick="App.showLearnMenu()">Lektionen</button>
              <button class="mode-btn" onclick="App.showVocabBrowser()">Vokabeln</button>
              <button class="mode-btn" onclick="Conversation.showList()">Gespräche</button>
              <button class="mode-btn active">AI Chat</button>
            </div>
            <div class="pre-icon">🤖</div>
            <h2>AI-Gespräche</h2>
            <p style="color:var(--text2);font-size:14px">Freie Konversation mit einem AI-Gesprächspartner</p>
            <div class="card" style="width:100%;margin-top:12px">
              <p style="font-size:14px;color:var(--text2);margin-bottom:8px">Für AI-Gespräche brauchst du einen Anthropic API Key.</p>
              <input type="text" id="api-key-input" class="card-input" placeholder="sk-ant-..." style="font-size:14px;margin-bottom:8px">
              <button class="btn-primary" onclick="AI.setApiKey(document.getElementById('api-key-input').value); AI.conversation.showScenarios()">Key speichern</button>
            </div>
          </div>
        `;
        return;
      }

      const scenariosHTML = this.scenarios.map(s => `
        <button class="conv-item card" onclick="AI.conversation.start('${s.id}')">
          <span class="conv-icon">${s.icon}</span>
          <div class="conv-info">
            <div class="conv-title">${s.title}</div>
            <div class="conv-sub">${s.desc}</div>
          </div>
          <span style="color:var(--accent)">→</span>
        </button>
      `).join('');

      el.innerHTML = `
        <div class="pre-session">
          <div class="mode-toggle">
            <button class="mode-btn" onclick="App.showLearnMenu()">Lektionen</button>
            <button class="mode-btn" onclick="App.showVocabBrowser()">Vokabeln</button>
            <button class="mode-btn" onclick="Conversation.showList()">Gespräche</button>
            <button class="mode-btn active">AI Chat</button>
          </div>
          <h2>AI-Gespräch starten</h2>
          <p style="color:var(--text2);font-size:14px">Übe frei mit einem AI-Gesprächspartner</p>
          <div style="width:100%;display:flex;flex-direction:column;gap:8px;margin-top:8px">
            ${scenariosHTML}
          </div>
        </div>
      `;
    },

    _render() {
      const el = document.getElementById('learn-content');
      const scenario = this.scenarios.find(s => s.id === this.scenario);

      const msgsHTML = this.messages.map(m => {
        const isUser = m.role === 'user';
        return `<div class="chat-bubble ${isUser ? 'chat-learner' : 'chat-npc'}">
          <div class="chat-pt">${m.content}</div>
        </div>`;
      }).join('');

      const loadingHTML = this.isLoading ? '<div class="chat-system">Denkt nach...</div>' : '';

      el.innerHTML = `
        <div class="chat-header">
          <button class="btn-end-session" onclick="AI.conversation.showScenarios()">←</button>
          <div class="chat-header-info">
            <span>${scenario?.icon || '💬'} ${scenario?.title || 'AI Chat'}</span>
            <span class="conv-diff">AI</span>
          </div>
        </div>
        <div class="chat-messages" id="chat-messages">
          ${msgsHTML}
          ${loadingHTML}
        </div>
        <div class="chat-input-wrap">
          ${AI.speech.isSupported() ? `<button class="chat-mic-btn ${AI.speech.isListening ? 'mic-active' : ''}" onclick="AI.speech.toggle()" id="mic-btn">🎤</button>` : ''}
          <input type="text" id="ai-chat-input" class="chat-input"
            placeholder="Schreibe auf Portugiesisch..."
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            onkeydown="if(event.key==='Enter' && !AI.conversation.isLoading) AI.conversation.send(this.value); if(event.key==='Enter') this.value='';"
            ${this.isLoading ? 'disabled' : ''}>
          <button class="chat-send-btn" onclick="const i=document.getElementById('ai-chat-input'); if(i.value.trim()) {AI.conversation.send(i.value); i.value=''}">→</button>
        </div>
      `;

      // Scroll to bottom
      const msgs = document.getElementById('chat-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
      // Focus input
      if (!this.isLoading) {
        setTimeout(() => document.getElementById('ai-chat-input')?.focus(), 100);
      }
    }
  },

  // ── Speech Recognition (Web Speech API) ───────────────────────────
  speech: {
    recognition: null,
    isListening: false,

    isSupported() {
      return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    init() {
      if (!this.isSupported()) return;
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SR();
      this.recognition.lang = 'pt-PT'; // European Portuguese
      this.recognition.interimResults = true;
      this.recognition.continuous = false;

      this.recognition.onresult = (event) => {
        const result = event.results[0];
        const text = result[0].transcript;
        const input = document.getElementById('ai-chat-input') || document.getElementById('card-input');
        if (input) {
          input.value = text;
          if (result.isFinal) {
            this.stop();
            // Auto-submit in AI chat
            if (document.getElementById('ai-chat-input') && text.trim()) {
              AI.conversation.send(text);
              input.value = '';
            }
          }
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        const btn = document.getElementById('mic-btn');
        if (btn) btn.classList.remove('mic-active');
      };

      this.recognition.onerror = (e) => {
        this.isListening = false;
        const btn = document.getElementById('mic-btn');
        if (btn) btn.classList.remove('mic-active');
        if (e.error !== 'aborted' && e.error !== 'no-speech') {
          console.warn('Speech error:', e.error);
        }
      };
    },

    toggle() {
      if (this.isListening) {
        this.stop();
      } else {
        this.start();
      }
    },

    start() {
      if (!this.recognition) this.init();
      if (!this.recognition) return;
      try {
        this.recognition.start();
        this.isListening = true;
        const btn = document.getElementById('mic-btn');
        if (btn) btn.classList.add('mic-active');
      } catch (e) {
        // Already started
      }
    },

    stop() {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    }
  },

  // ── Error Analysis ────────────────────────────────────────────────
  errorAnalysis: {
    // Track errors by category
    _getErrors() {
      const raw = localStorage.getItem('ptapp_error_analysis');
      return raw ? JSON.parse(raw) : {};
    },

    _saveErrors(errors) {
      localStorage.setItem('ptapp_error_analysis', JSON.stringify(errors));
    },

    // Called after every wrong answer
    trackError(card) {
      const errors = this._getErrors();
      // Categorize the error
      const categories = this._categorizeCard(card);
      categories.forEach(cat => {
        if (!errors[cat]) errors[cat] = { count: 0, lastDate: null, examples: [] };
        errors[cat].count++;
        errors[cat].lastDate = new Date().toISOString().split('T')[0];
        // Store example (max 5)
        const example = { q: card.question?.substring(0, 50), a: card.answer?.substring(0, 50) };
        errors[cat].examples = [example, ...errors[cat].examples.filter(e => e.q !== example.q)].slice(0, 5);
      });
      this._saveErrors(errors);
    },

    // Called after correct answer
    trackSuccess(card) {
      const errors = this._getErrors();
      const categories = this._categorizeCard(card);
      categories.forEach(cat => {
        if (errors[cat] && errors[cat].count > 0) {
          errors[cat].count = Math.max(0, errors[cat].count - 0.5); // Slowly reduce
        }
      });
      this._saveErrors(errors);
    },

    _categorizeCard(card) {
      const cats = [];
      if (card.type === 'conjugation') {
        cats.push('konjugation');
        if (card.tense) cats.push('konjugation:' + card.tense);
        if (card.verb) cats.push('verb:' + card.verb);
      }
      if (card.type === 'vocab') {
        cats.push('vokabeln');
        if (card.dir) cats.push('richtung:' + card.dir);
        if (card.hint) cats.push('thema:' + card.hint);
      }
      if (card.type === 'phrase') cats.push('phrasen');
      if (card.type === 'rule-exercise') {
        cats.push('grammatik');
        if (card.ruleTitle) cats.push('regel:' + card.ruleTitle);
      }
      if (card.type === 'context') cats.push('kontext');
      return cats.length > 0 ? cats : ['allgemein'];
    },

    // Get top weaknesses
    getWeaknesses(limit = 5) {
      const errors = this._getErrors();
      return Object.entries(errors)
        .filter(([cat, data]) => data.count >= 2) // At least 2 errors
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, limit)
        .map(([cat, data]) => ({
          category: this._formatCategory(cat),
          count: Math.round(data.count),
          examples: data.examples,
          rawCategory: cat
        }));
    },

    _formatCategory(cat) {
      const labels = {
        'konjugation': 'Konjugationen',
        'vokabeln': 'Vokabeln',
        'phrasen': 'Phrasen',
        'grammatik': 'Grammatik',
        'kontext': 'Kontextkarten',
        'richtung:pt-de': 'PT→DE Richtung',
        'richtung:de-pt': 'DE→PT Richtung',
        'konjugation:presente': 'Präsens-Konjugation',
        'konjugation:perfeito': 'Perfekt-Konjugation',
        'konjugation:imperfeito': 'Imperfekt-Konjugation',
      };
      if (labels[cat]) return labels[cat];
      if (cat.startsWith('verb:')) return 'Verb: ' + cat.replace('verb:', '');
      if (cat.startsWith('thema:')) return 'Thema: ' + cat.replace('thema:', '');
      if (cat.startsWith('regel:')) return cat.replace('regel:', '');
      return cat;
    },

    // Generate targeted practice session from weaknesses
    getTargetedCards(maxCount = 15) {
      const weaknesses = this.getWeaknesses(3);
      if (weaknesses.length === 0) return [];

      const allCards = CardEngine.buildAll();
      const targeted = [];
      const weakCats = weaknesses.map(w => w.rawCategory);

      allCards.forEach(card => {
        const cardCats = this._categorizeCard(card);
        if (cardCats.some(c => weakCats.includes(c))) {
          targeted.push(card);
        }
      });

      return CardEngine._shuffle(targeted).slice(0, maxCount);
    },

    // Render weakness report on Home or Progress screen
    renderReport() {
      const weaknesses = this.getWeaknesses(5);
      if (weaknesses.length === 0) return '';

      const items = weaknesses.map(w => `
        <div class="weakness-item">
          <div class="weakness-info">
            <div class="weakness-name">${w.category}</div>
            <div class="weakness-count">${w.count} Fehler</div>
          </div>
          <div class="weakness-bar-wrap">
            <div class="weakness-bar" style="width:${Math.min(100, w.count * 10)}%"></div>
          </div>
        </div>
      `).join('');

      return `
        <div class="card weakness-card">
          <div class="chart-title">Schwächen-Analyse</div>
          ${items}
          <button class="btn-secondary" onclick="App.startWeaknessSession()" style="margin-top:8px;font-size:14px">
            Schwächen gezielt üben →
          </button>
        </div>
      `;
    }
  }
};

// Initialize speech recognition
if (AI.speech.isSupported()) {
  AI.speech.init();
}

// Expose to global scope
window.AI = AI;
