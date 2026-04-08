// Scaffolded Dialogue Scenarios
// Node-graph structure: each node is an NPC line or learner interaction
// Types: 'say' (NPC speaks), 'choose' (learner picks response), 'write' (learner types)

'use strict';

window.CONVERSATIONS = [
  // ═══════════════════════════════════════════════════════════════════
  // 1. Im Café
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv1',
    title: 'No Café',
    subtitle: 'Einen Kaffee bestellen',
    icon: '☕',
    color: '#d97706',
    difficulty: 'A1',
    nodes: [
      {id:'c1n1',speaker:'npc',type:'say',pt:'Bom dia! O que deseja?',de:'Guten Tag! Was möchten Sie?',next:'c1n2'},
      {id:'c1n2',speaker:'learner',type:'choose',prompt:'Bestelle einen Kaffee',
        options:[
          {pt:'Uma bica, por favor.',de:'Einen Espresso, bitte.',correct:true,next:'c1n3'},
          {pt:'Quero um bolo.',de:'Ich möchte einen Kuchen.',correct:false,feedback:'Fast! Aber du wolltest doch einen Kaffee bestellen.',next:'c1n2'},
          {pt:'Nada, obrigado.',de:'Nichts, danke.',correct:false,feedback:'Du wolltest doch etwas bestellen!',next:'c1n2'}
        ],next:'c1n3'},
      {id:'c1n3',speaker:'npc',type:'say',pt:'Com certeza! Mais alguma coisa?',de:'Natürlich! Sonst noch etwas?',next:'c1n4'},
      {id:'c1n4',speaker:'learner',type:'choose',prompt:'Bestelle auch ein Pastel de Nata',
        options:[
          {pt:'Sim, um pastel de nata, por favor.',de:'Ja, ein Pastel de Nata, bitte.',correct:true,next:'c1n5'},
          {pt:'Não, obrigado.',de:'Nein, danke.',correct:false,feedback:'Du wolltest doch auch ein Pastel de Nata probieren!',next:'c1n4'},
        ],next:'c1n5'},
      {id:'c1n5',speaker:'npc',type:'say',pt:'Excelente! São dois euros e cinquenta.',de:'Ausgezeichnet! Das macht 2,50 Euro.',next:'c1n6'},
      {id:'c1n6',speaker:'learner',type:'write',prompt:'Sag, dass du mit Karte zahlen möchtest',
        keywords:['cartão','pagar'],hint:'Posso pagar com...',
        answer:'Posso pagar com cartão?',next:'c1n7'},
      {id:'c1n7',speaker:'npc',type:'say',pt:'Claro que sim! Aqui tem.',de:'Natürlich! Hier bitte.',next:'c1n8'},
      {id:'c1n8',speaker:'learner',type:'write',prompt:'Bedanke dich',
        keywords:['obrigad','muito','danke','agradeç'],hint:'Muito...',
        answer:'Muito obrigado!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. Nach dem Weg fragen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv2',
    title: 'Pedir Direcções',
    subtitle: 'Nach dem Weg fragen',
    icon: '🗺️',
    color: '#0891b2',
    difficulty: 'A1',
    nodes: [
      {id:'c2n1',speaker:'learner',type:'choose',prompt:'Sprich jemanden an und frage nach dem Weg zum Bahnhof',
        options:[
          {pt:'Desculpe, onde fica a estação de comboios?',de:'Entschuldigung, wo ist der Bahnhof?',correct:true,next:'c2n2'},
          {pt:'Olá, quero comboio.',de:'Hallo, ich will Zug.',correct:false,feedback:'Versuche es höflicher! Benutze "Desculpe, onde fica..."',next:'c2n1'},
        ],next:'c2n2'},
      {id:'c2n2',speaker:'npc',type:'say',pt:'Claro! Siga em frente e vire à esquerda na segunda rua.',de:'Natürlich! Gehen Sie geradeaus und biegen Sie in die zweite Straße links ab.',next:'c2n3'},
      {id:'c2n3',speaker:'learner',type:'choose',prompt:'Frage, ob es weit ist',
        options:[
          {pt:'Fica longe daqui?',de:'Ist es weit von hier?',correct:true,next:'c2n4'},
          {pt:'É grande?',de:'Ist es groß?',correct:false,feedback:'"É grande" heißt "ist es groß". Du möchtest fragen, ob es weit ist: "Fica longe?"',next:'c2n3'},
        ],next:'c2n4'},
      {id:'c2n4',speaker:'npc',type:'say',pt:'Não, são cinco minutos a pé.',de:'Nein, fünf Minuten zu Fuß.',next:'c2n5'},
      {id:'c2n5',speaker:'learner',type:'write',prompt:'Bedanke dich und sage auf Wiedersehen',
        keywords:['obrigad','adeus','tchau','bom dia'],hint:'Muito obrigado...',
        answer:'Muito obrigado! Bom dia!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. Im Hotel einchecken
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv3',
    title: 'No Hotel',
    subtitle: 'Im Hotel einchecken',
    icon: '🏨',
    color: '#7c3aed',
    difficulty: 'A1',
    nodes: [
      {id:'c3n1',speaker:'npc',type:'say',pt:'Boa tarde! Bem-vindo ao Hotel Lisboa. Em que posso ajudar?',de:'Guten Tag! Willkommen im Hotel Lissabon. Wie kann ich helfen?',next:'c3n2'},
      {id:'c3n2',speaker:'learner',type:'choose',prompt:'Sag, dass du eine Reservierung hast',
        options:[
          {pt:'Boa tarde! Tenho uma reserva.',de:'Guten Tag! Ich habe eine Reservierung.',correct:true,next:'c3n3'},
          {pt:'Quero um quarto.',de:'Ich möchte ein Zimmer.',correct:false,feedback:'Nicht falsch, aber du hast doch schon reserviert! Sag "Tenho uma reserva".',next:'c3n2'},
        ],next:'c3n3'},
      {id:'c3n3',speaker:'npc',type:'say',pt:'Muito bem. Em nome de quem?',de:'Sehr gut. Auf welchen Namen?',next:'c3n4'},
      {id:'c3n4',speaker:'learner',type:'write',prompt:'Sag deinen Namen (z.B. "Em nome de Schmidt")',
        keywords:['nome','chamo','schmidt','reserva'],hint:'Em nome de...',
        answer:'Em nome de Schmidt.',next:'c3n5'},
      {id:'c3n5',speaker:'npc',type:'say',pt:'Sim, encontrei. Um quarto duplo para três noites. O pequeno-almoço está incluído.',de:'Ja, gefunden. Ein Doppelzimmer für drei Nächte. Frühstück ist inklusive.',next:'c3n6'},
      {id:'c3n6',speaker:'learner',type:'choose',prompt:'Frage nach dem WLAN-Passwort',
        options:[
          {pt:'Qual é a senha do Wi-Fi?',de:'Was ist das WLAN-Passwort?',correct:true,next:'c3n7'},
          {pt:'Tem internet?',de:'Haben Sie Internet?',correct:false,feedback:'Gut gedacht, aber frage direkt nach dem Passwort: "Qual é a senha do Wi-Fi?"',next:'c3n6'},
        ],next:'c3n7'},
      {id:'c3n7',speaker:'npc',type:'say',pt:'A senha é "Lisboa2024". O seu quarto é no terceiro andar, número 305. Aqui tem a chave.',de:'Das Passwort ist "Lisboa2024". Ihr Zimmer ist im dritten Stock, Nummer 305. Hier ist der Schlüssel.',next:'c3n8'},
      {id:'c3n8',speaker:'learner',type:'write',prompt:'Bedanke dich',
        keywords:['obrigad','muito','agradeç'],hint:'Muito...',
        answer:'Muito obrigado!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. Sich vorstellen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv4',
    title: 'Conhecer Alguém',
    subtitle: 'Jemanden kennenlernen',
    icon: '👋',
    color: '#059669',
    difficulty: 'A1',
    nodes: [
      {id:'c4n1',speaker:'npc',type:'say',pt:'Olá! Eu sou a Maria. E tu, como te chamas?',de:'Hallo! Ich bin Maria. Und du, wie heißt du?',next:'c4n2'},
      {id:'c4n2',speaker:'learner',type:'write',prompt:'Stelle dich vor (z.B. "Chamo-me...")',
        keywords:['chamo','nome'],hint:'Chamo-me...',
        answer:'Chamo-me Thomas.',next:'c4n3'},
      {id:'c4n3',speaker:'npc',type:'say',pt:'Prazer, Thomas! De onde és?',de:'Freut mich, Thomas! Woher kommst du?',next:'c4n4'},
      {id:'c4n4',speaker:'learner',type:'choose',prompt:'Sag, dass du aus Deutschland kommst',
        options:[
          {pt:'Sou da Alemanha.',de:'Ich bin aus Deutschland.',correct:true,next:'c4n5'},
          {pt:'Moro na Alemanha.',de:'Ich wohne in Deutschland.',correct:false,feedback:'Nicht falsch! Aber "Sou da Alemanha" ist die natürlichere Antwort auf "De onde és?"',next:'c4n4'},
        ],next:'c4n5'},
      {id:'c4n5',speaker:'npc',type:'say',pt:'Que giro! Estás a gostar de Portugal?',de:'Wie cool! Gefällt dir Portugal?',next:'c4n6'},
      {id:'c4n6',speaker:'learner',type:'choose',prompt:'Antworte begeistert',
        options:[
          {pt:'Sim, adoro! Portugal é muito bonito.',de:'Ja, ich liebe es! Portugal ist sehr schön.',correct:true,next:'c4n7'},
          {pt:'Sim, está bem.',de:'Ja, ist okay.',correct:false,feedback:'Etwas mehr Begeisterung! Versuch "Sim, adoro!"',next:'c4n6'},
        ],next:'c4n7'},
      {id:'c4n7',speaker:'npc',type:'say',pt:'Muito bem! Há quanto tempo estás aqui?',de:'Sehr gut! Seit wann bist du hier?',next:'c4n8'},
      {id:'c4n8',speaker:'learner',type:'write',prompt:'Sag, seit wie vielen Tagen du da bist (z.B. "Estou aqui há três dias")',
        keywords:['estou','aqui','dias','três','semana'],hint:'Estou aqui há...',
        answer:'Estou aqui há três dias.',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. Beim Arzt
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv5',
    title: 'No Médico',
    subtitle: 'Beim Arzt',
    icon: '🏥',
    color: '#dc2626',
    difficulty: 'A2',
    nodes: [
      {id:'c5n1',speaker:'npc',type:'say',pt:'Bom dia! O que se passa?',de:'Guten Tag! Was ist los?',next:'c5n2'},
      {id:'c5n2',speaker:'learner',type:'choose',prompt:'Sag, dass du dich nicht gut fühlst',
        options:[
          {pt:'Não me sinto muito bem. Dói-me a cabeça.',de:'Mir geht es nicht gut. Ich habe Kopfschmerzen.',correct:true,next:'c5n3'},
          {pt:'Estou doente.',de:'Ich bin krank.',correct:false,feedback:'Gut, aber sei genauer! Was tut weh? Versuch "Dói-me a cabeça".',next:'c5n2'},
        ],next:'c5n3'},
      {id:'c5n3',speaker:'npc',type:'say',pt:'Há quanto tempo tem dores de cabeça?',de:'Seit wann haben Sie Kopfschmerzen?',next:'c5n4'},
      {id:'c5n4',speaker:'learner',type:'write',prompt:'Sag "seit zwei Tagen"',
        keywords:['dois','dias','seit','tagen'],hint:'Há dois dias.',
        answer:'Há dois dias.',next:'c5n5'},
      {id:'c5n5',speaker:'npc',type:'say',pt:'Tem febre? Alguma alergia?',de:'Haben Sie Fieber? Irgendeine Allergie?',next:'c5n6'},
      {id:'c5n6',speaker:'learner',type:'choose',prompt:'Antworte: kein Fieber, aber allergisch gegen Penicillin',
        options:[
          {pt:'Não tenho febre, mas sou alérgico a penicilina.',de:'Kein Fieber, aber allergisch gegen Penicillin.',correct:true,next:'c5n7'},
          {pt:'Não sei.',de:'Ich weiß nicht.',correct:false,feedback:'Wichtig beim Arzt: Allergien immer nennen! "Sou alérgico/a a..."',next:'c5n6'},
        ],next:'c5n7'},
      {id:'c5n7',speaker:'npc',type:'say',pt:'Muito bem, vou receitar-lhe um medicamento. Tome duas vezes por dia.',de:'Sehr gut, ich verschreibe Ihnen ein Medikament. Nehmen Sie es zweimal täglich.',next:'c5n8'},
      {id:'c5n8',speaker:'learner',type:'write',prompt:'Bedanke dich beim Arzt',
        keywords:['obrigad','muito','doutor','agradeç'],hint:'Muito...',
        answer:'Muito obrigado, doutor!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. Im Supermarkt
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv6',
    title: 'No Supermercado',
    subtitle: 'Im Supermarkt einkaufen',
    icon: '🛒',
    color: '#059669',
    difficulty: 'A1',
    nodes: [
      {id:'c6n1',speaker:'npc',type:'say',pt:'Bom dia! Precisa de ajuda?',de:'Guten Morgen! Brauchen Sie Hilfe?',next:'c6n2'},
      {id:'c6n2',speaker:'learner',type:'choose',prompt:'Frage, wo man Obst findet',
        options:[
          {pt:'Sim, onde posso encontrar fruta?',de:'Ja, wo finde ich Obst?',correct:true,next:'c6n3'},
          {pt:'Quero comprar coisas.',de:'Ich möchte Sachen kaufen.',correct:false,feedback:'Sei etwas genauer! Frage nach dem, was du suchst: "Onde posso encontrar...?"',next:'c6n2'},
        ],next:'c6n3'},
      {id:'c6n3',speaker:'npc',type:'say',pt:'A fruta está no corredor três, à direita.',de:'Das Obst ist in Gang drei, rechts.',next:'c6n4'},
      {id:'c6n4',speaker:'learner',type:'write',prompt:'Bedanke dich',
        keywords:['obrigad','muito','agradeç','danke'],hint:'Obrigado/a!',
        answer:'Obrigado!',next:'c6n5'},
      {id:'c6n5',speaker:'npc',type:'say',pt:'Na caixa: São doze euros e trinta cêntimos. Precisa de saco?',de:'An der Kasse: Das macht 12,30 Euro. Brauchen Sie eine Tüte?',next:'c6n6'},
      {id:'c6n6',speaker:'learner',type:'choose',prompt:'Sage, dass du keine Tüte brauchst und mit Karte zahlst',
        options:[
          {pt:'Não, obrigado. Posso pagar com cartão?',de:'Nein, danke. Kann ich mit Karte zahlen?',correct:true,next:'c6n7'},
          {pt:'Sim, um saco.',de:'Ja, eine Tüte.',correct:false,feedback:'Du hast einen eigenen Beutel dabei! Sag "Não, obrigado".',next:'c6n6'},
        ],next:'c6n7'},
      {id:'c6n7',speaker:'npc',type:'say',pt:'Claro! Aqui tem o recibo. Bom dia!',de:'Natürlich! Hier ist die Quittung. Guten Tag!',next:'c6n8'},
      {id:'c6n8',speaker:'learner',type:'write',prompt:'Verabschiede dich',
        keywords:['dia','adeus','tchau','obrigad'],hint:'Bom dia! / Obrigado!',
        answer:'Bom dia! Obrigado!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. Am Telefon (Termin machen)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv7',
    title: 'Ao Telefone',
    subtitle: 'Einen Termin vereinbaren',
    icon: '📞',
    color: '#0284c7',
    difficulty: 'A2',
    nodes: [
      {id:'c7n1',speaker:'npc',type:'say',pt:'Clínica Saúde, bom dia! Em que posso ajudar?',de:'Klinik Saúde, guten Tag! Wie kann ich helfen?',next:'c7n2'},
      {id:'c7n2',speaker:'learner',type:'choose',prompt:'Sage, dass du einen Termin vereinbaren möchtest',
        options:[
          {pt:'Bom dia! Queria marcar uma consulta, por favor.',de:'Guten Tag! Ich möchte einen Termin vereinbaren.',correct:true,next:'c7n3'},
          {pt:'Olá, preciso de médico.',de:'Hallo, ich brauche einen Arzt.',correct:false,feedback:'Auf Portugiesisch sagt man "marcar uma consulta" für "einen Termin vereinbaren".',next:'c7n2'},
        ],next:'c7n3'},
      {id:'c7n3',speaker:'npc',type:'say',pt:'Com certeza. Para quando?',de:'Natürlich. Für wann?',next:'c7n4'},
      {id:'c7n4',speaker:'learner',type:'write',prompt:'Frage, ob nächste Woche Dienstag geht',
        keywords:['próxima','semana','terça'],hint:'Na próxima semana...',
        answer:'Na próxima semana, terça-feira, é possível?',next:'c7n5'},
      {id:'c7n5',speaker:'npc',type:'say',pt:'Terça-feira temos às dez ou às catorze horas. Qual prefere?',de:'Dienstag haben wir um 10 oder um 14 Uhr. Was bevorzugen Sie?',next:'c7n6'},
      {id:'c7n6',speaker:'learner',type:'choose',prompt:'Wähle den Termin um 10 Uhr',
        options:[
          {pt:'Às dez horas, por favor.',de:'Um 10 Uhr, bitte.',correct:true,next:'c7n7'},
          {pt:'Às catorze.',de:'Um 14 Uhr.',correct:false,feedback:'Du wolltest den Morgentermin wählen! "Às dez horas".',next:'c7n6'},
        ],next:'c7n7'},
      {id:'c7n7',speaker:'npc',type:'say',pt:'Fica marcado para terça-feira às dez. O seu nome, por favor?',de:'Eingetragen für Dienstag um zehn. Ihr Name, bitte?',next:'c7n8'},
      {id:'c7n8',speaker:'learner',type:'write',prompt:'Gib deinen Namen an',
        keywords:['chamo','nome'],hint:'O meu nome é... / Chamo-me...',
        answer:'O meu nome é Schmidt.',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. Im Restaurant (Beschwerden)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv8',
    title: 'Reclamar no Restaurante',
    subtitle: 'Im Restaurant beschweren',
    icon: '🍽️',
    color: '#b45309',
    difficulty: 'A2',
    nodes: [
      {id:'c8n1',speaker:'npc',type:'say',pt:'Aqui tem o seu prato. Bom apetite!',de:'Hier ist Ihr Gericht. Guten Appetit!',next:'c8n2'},
      {id:'c8n2',speaker:'learner',type:'choose',prompt:'Das Essen ist kalt. Beschwere dich höflich',
        options:[
          {pt:'Desculpe, mas a comida está fria.',de:'Entschuldigung, aber das Essen ist kalt.',correct:true,next:'c8n3'},
          {pt:'A comida é horrível!',de:'Das Essen ist schrecklich!',correct:false,feedback:'Lieber höflicher! Auf Portugiesisch bleibt man diplomatisch. Versuch "Desculpe, mas..."',next:'c8n2'},
        ],next:'c8n3'},
      {id:'c8n3',speaker:'npc',type:'say',pt:'Peço imensa desculpa! Vou trocar imediatamente.',de:'Ich bitte vielmals um Entschuldigung! Ich tausche es sofort aus.',next:'c8n4'},
      {id:'c8n4',speaker:'learner',type:'write',prompt:'Bedanke dich für die schnelle Hilfe',
        keywords:['obrigad','muito','atenção','agradeç'],hint:'Obrigado pela atenção.',
        answer:'Obrigado pela atenção.',next:'c8n5'},
      {id:'c8n5',speaker:'npc',type:'say',pt:'Aqui tem o novo prato. Mais uma vez, desculpe o incómodo.',de:'Hier ist das neue Gericht. Nochmals Entschuldigung für die Unannehmlichkeiten.',next:'c8n6'},
      {id:'c8n6',speaker:'learner',type:'choose',prompt:'Sag, dass jetzt alles gut ist',
        options:[
          {pt:'Não faz mal. Agora está perfeito, obrigado!',de:'Macht nichts. Jetzt ist es perfekt, danke!',correct:true,next:'end'},
          {pt:'Está bem.',de:'Ist okay.',correct:false,feedback:'Etwas freundlicher! "Não faz mal" zeigt, dass du nicht böse bist.',next:'c8n6'},
        ],next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. Auf dem Markt
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv9',
    title: 'No Mercado',
    subtitle: 'Auf dem Markt einkaufen',
    icon: '🍊',
    color: '#d97706',
    difficulty: 'A2',
    nodes: [
      {id:'c9n1',speaker:'npc',type:'say',pt:'Bom dia! Temos fruta fresca hoje. Quer provar?',de:'Guten Morgen! Wir haben frisches Obst heute. Möchten Sie probieren?',next:'c9n2'},
      {id:'c9n2',speaker:'learner',type:'choose',prompt:'Sage ja und frage nach dem Preis der Orangen',
        options:[
          {pt:'Sim, por favor! Quanto custam as laranjas?',de:'Ja, bitte! Was kosten die Orangen?',correct:true,next:'c9n3'},
          {pt:'Não, obrigado.',de:'Nein, danke.',correct:false,feedback:'Komm, probier mal! Frage "Quanto custam as laranjas?"',next:'c9n2'},
        ],next:'c9n3'},
      {id:'c9n3',speaker:'npc',type:'say',pt:'As laranjas do Algarve são um euro e cinquenta o quilo. São muito doces!',de:'Die Orangen aus der Algarve kosten 1,50 Euro pro Kilo. Sehr süß!',next:'c9n4'},
      {id:'c9n4',speaker:'learner',type:'write',prompt:'Bestelle ein Kilo Orangen',
        keywords:['quilo','laranja','quero','favor'],hint:'Quero um quilo de...',
        answer:'Quero um quilo de laranjas, por favor.',next:'c9n5'},
      {id:'c9n5',speaker:'npc',type:'say',pt:'Aqui tem. Mais alguma coisa?',de:'Hier bitte. Sonst noch etwas?',next:'c9n6'},
      {id:'c9n6',speaker:'learner',type:'write',prompt:'Frage, ob sie auch Tomaten haben',
        keywords:['tomate','tem'],hint:'Também tem...?',
        answer:'Também tem tomates?',next:'c9n7'},
      {id:'c9n7',speaker:'npc',type:'say',pt:'Sim, os tomates estão a oitenta cêntimos o quilo. São cinco euros ao todo.',de:'Ja, die Tomaten kosten 80 Cent pro Kilo. Das macht zusammen 5 Euro.',next:'c9n8'},
      {id:'c9n8',speaker:'learner',type:'write',prompt:'Zahle und verabschiede dich',
        keywords:['obrigad','dia','aqui'],hint:'Aqui tem. Obrigado!',
        answer:'Aqui tem. Obrigado, bom dia!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 10. Freunde treffen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv10',
    title: 'Encontrar Amigos',
    subtitle: 'Freunde treffen & verabreden',
    icon: '🎉',
    color: '#9333ea',
    difficulty: 'A2',
    nodes: [
      {id:'c10n1',speaker:'npc',type:'say',pt:'Olá! Há muito tempo que não nos vemos! Como tens estado?',de:'Hallo! Lange nicht gesehen! Wie geht es dir?',next:'c10n2'},
      {id:'c10n2',speaker:'learner',type:'choose',prompt:'Sage, dass es dir gut geht und frage zurück',
        options:[
          {pt:'Olá! Tenho estado bem, obrigado. E tu?',de:'Hallo! Mir geht es gut, danke. Und dir?',correct:true,next:'c10n3'},
          {pt:'Olá.',de:'Hallo.',correct:false,feedback:'Etwas mehr! Erzähl, wie es dir geht: "Tenho estado bem".',next:'c10n2'},
        ],next:'c10n3'},
      {id:'c10n3',speaker:'npc',type:'say',pt:'Também bem! Olha, queres ir jantar comigo na sexta-feira?',de:'Auch gut! Hey, willst du Freitag mit mir essen gehen?',next:'c10n4'},
      {id:'c10n4',speaker:'learner',type:'choose',prompt:'Nimm die Einladung an',
        options:[
          {pt:'Claro que sim! Que boa ideia!',de:'Natürlich! Was für eine gute Idee!',correct:true,next:'c10n5'},
          {pt:'Talvez.',de:'Vielleicht.',correct:false,feedback:'Sei etwas enthusiastischer! "Claro que sim!" = Natürlich!',next:'c10n4'},
        ],next:'c10n5'},
      {id:'c10n5',speaker:'npc',type:'say',pt:'Ótimo! Conheço um restaurante novo perto da praça. Às oito horas está bem?',de:'Super! Ich kenne ein neues Restaurant am Platz. Um acht Uhr okay?',next:'c10n6'},
      {id:'c10n6',speaker:'learner',type:'write',prompt:'Bestätige die Zeit und sage, dass du dich freust',
        keywords:['sim','oito','vejo','espero'],hint:'Sim, às oito...',
        answer:'Sim, às oito está perfeito. Estou desejoso!',next:'c10n7'},
      {id:'c10n7',speaker:'npc',type:'say',pt:'Então até sexta! Mando-te a morada por mensagem.',de:'Dann bis Freitag! Ich schicke dir die Adresse per Nachricht.',next:'c10n8'},
      {id:'c10n8',speaker:'learner',type:'write',prompt:'Verabschiede dich freundlich',
        keywords:['sexta','até','beijin','tchau'],hint:'Até sexta! / Beijinhos!',
        answer:'Até sexta! Beijinhos!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 11. In der Apotheke
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv11',
    title: 'Na Farmácia',
    subtitle: 'In der Apotheke',
    icon: '💊',
    color: '#059669',
    difficulty: 'A2',
    nodes: [
      {id:'c11n1',speaker:'npc',type:'say',pt:'Boa tarde! Em que posso ajudar?',de:'Guten Tag! Wie kann ich helfen?',next:'c11n2'},
      {id:'c11n2',speaker:'learner',type:'choose',prompt:'Du hast Kopfschmerzen. Frage nach einem Mittel.',
        options:[
          {pt:'Tem alguma coisa para dores de cabeça?',de:'Haben Sie etwas gegen Kopfschmerzen?',correct:true,next:'c11n3'},
          {pt:'Dói-me a cabeça.',de:'Mir tut der Kopf weh.',correct:false,feedback:'Gut formuliert, aber in der Apotheke fragst du besser direkt: "Tem alguma coisa para...?" — das ist die Standardfrage!',next:'c11n2'},
        ],next:'c11n3'},
      {id:'c11n3',speaker:'npc',type:'say',pt:'Sim, temos paracetamol e ibuprofeno. Tem alguma alergia a medicamentos?',de:'Ja, wir haben Paracetamol und Ibuprofen. Haben Sie eine Medikamentenallergie?',next:'c11n4'},
      {id:'c11n4',speaker:'learner',type:'choose',prompt:'Sage, dass du keine Allergien hast und frage nach der Einnahme',
        options:[
          {pt:'Não, nenhuma alergia. Como é que se toma?',de:'Nein, keine Allergie. Wie nimmt man das ein?',correct:true,next:'c11n5'},
          {pt:'Não.',de:'Nein.',correct:false,feedback:'Frage auch gleich nach der Einnahme! "Como é que se toma?" = Wie nimmt man das ein?',next:'c11n4'},
        ],next:'c11n5'},
      {id:'c11n5',speaker:'npc',type:'say',pt:'Tome um comprimido de 8 em 8 horas, depois das refeições. Não tome mais de três por dia.',de:'Nehmen Sie eine Tablette alle 8 Stunden, nach den Mahlzeiten. Nicht mehr als drei pro Tag.',next:'c11n6'},
      {id:'c11n6',speaker:'learner',type:'write',prompt:'Frage, ob du dafür ein Rezept brauchst',
        keywords:['receita','preciso','precisa'],hint:'Preciso de receita...?',
        answer:'Preciso de receita para isto?',next:'c11n7'},
      {id:'c11n7',speaker:'npc',type:'say',pt:'Não, este medicamento não precisa de receita. São quatro euros e cinquenta.',de:'Nein, dieses Medikament ist rezeptfrei. Das macht 4,50 Euro.',next:'c11n8'},
      {id:'c11n8',speaker:'learner',type:'write',prompt:'Bedanke dich und verabschiede dich',
        keywords:['obrigad','dia','tarde'],hint:'Obrigado/a! Boa tarde!',
        answer:'Muito obrigado! Boa tarde!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 12. Wohnung suchen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv12',
    title: 'Procurar Apartamento',
    subtitle: 'Eine Wohnung besichtigen',
    icon: '🏠',
    color: '#64748b',
    difficulty: 'A2',
    nodes: [
      {id:'c12n1',speaker:'npc',type:'say',pt:'Boa tarde! Vem ver o apartamento?',de:'Guten Tag! Sie kommen, die Wohnung zu besichtigen?',next:'c12n2'},
      {id:'c12n2',speaker:'learner',type:'choose',prompt:'Bestätige und frage nach der Miete',
        options:[
          {pt:'Sim! Quanto é a renda mensal?',de:'Ja! Wie hoch ist die monatliche Miete?',correct:true,next:'c12n3'},
          {pt:'Sim, quero ver.',de:'Ja, ich möchte sehen.',correct:false,feedback:'Gut, aber frage gleich nach der Miete! "Quanto é a renda mensal?" ist die wichtigste Frage.',next:'c12n2'},
        ],next:'c12n3'},
      {id:'c12n3',speaker:'npc',type:'say',pt:'A renda é seiscentos euros por mês. É um T1 mobilado, com varanda.',de:'Die Miete ist 600 Euro im Monat. Es ist eine möblierte 1-Zimmer-Wohnung mit Balkon.',next:'c12n4'},
      {id:'c12n4',speaker:'learner',type:'write',prompt:'Frage, ob die Nebenkosten in der Miete enthalten sind',
        keywords:['contas','incluid','renda'],hint:'As contas estão...?',
        answer:'As contas estão incluídas na renda?',next:'c12n5'},
      {id:'c12n5',speaker:'npc',type:'say',pt:'A água e o condomínio estão incluídos. A luz e o gás são à parte.',de:'Wasser und Hausgeld sind inklusive. Strom und Gas kommen extra.',next:'c12n6'},
      {id:'c12n6',speaker:'learner',type:'choose',prompt:'Frage nach der Kaution und dem Vertrag',
        options:[
          {pt:'E a fiança? Qual é o prazo do contrato?',de:'Und die Kaution? Wie lang ist die Vertragslaufzeit?',correct:true,next:'c12n7'},
          {pt:'Está bem.',de:'Okay.',correct:false,feedback:'Frage lieber nach den wichtigen Details! "A fiança" (Kaution) und "o prazo do contrato" (Vertragslaufzeit).',next:'c12n6'},
        ],next:'c12n7'},
      {id:'c12n7',speaker:'npc',type:'say',pt:'A fiança é de um mês. O contrato é por um ano, renovável.',de:'Die Kaution ist ein Monat. Der Vertrag läuft ein Jahr, verlängerbar.',next:'c12n8'},
      {id:'c12n8',speaker:'learner',type:'write',prompt:'Sage, dass dir die Wohnung gefällt und du interessiert bist',
        keywords:['gost','interess','apart','bonit'],hint:'Gosto muito... / Estou interessado/a...',
        answer:'Gosto muito do apartamento. Estou interessado!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 13. Am Flughafen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv13',
    title: 'No Aeroporto',
    subtitle: 'Am Flughafen einchecken',
    icon: '✈️',
    color: '#0284c7',
    difficulty: 'A1',
    nodes: [
      {id:'c13n1',speaker:'npc',type:'say',pt:'Boa tarde! O seu passaporte e o bilhete, por favor.',de:'Guten Tag! Ihren Reisepass und das Ticket, bitte.',next:'c13n2'},
      {id:'c13n2',speaker:'learner',type:'write',prompt:'Gib den Reisepass und sage "Hier bitte"',
        keywords:['aqui','passaporte','favor'],hint:'Aqui tem...',
        answer:'Aqui tem o meu passaporte.',next:'c13n3'},
      {id:'c13n3',speaker:'npc',type:'say',pt:'Obrigada. Tem bagagem para despachar?',de:'Danke. Haben Sie Gepäck zum Aufgeben?',next:'c13n4'},
      {id:'c13n4',speaker:'learner',type:'choose',prompt:'Du hast einen Koffer aufzugeben',
        options:[
          {pt:'Sim, tenho uma mala para despachar.',de:'Ja, ich habe einen Koffer zum Aufgeben.',correct:true,next:'c13n5'},
          {pt:'Não, só tenho bagagem de mão.',de:'Nein, nur Handgepäck.',correct:false,feedback:'Du hast doch einen Koffer dabei! "Uma mala para despachar" = ein Koffer zum Aufgeben.',next:'c13n4'},
        ],next:'c13n5'},
      {id:'c13n5',speaker:'npc',type:'say',pt:'Muito bem. Prefere lugar à janela ou no corredor?',de:'Sehr gut. Bevorzugen Sie Fenster- oder Gangplatz?',next:'c13n6'},
      {id:'c13n6',speaker:'learner',type:'choose',prompt:'Du möchtest am Fenster sitzen',
        options:[
          {pt:'À janela, por favor.',de:'Am Fenster, bitte.',correct:true,next:'c13n7'},
          {pt:'No corredor, por favor.',de:'Am Gang, bitte.',correct:false,feedback:'Du wolltest doch am Fenster sitzen! "À janela" = am Fenster.',next:'c13n6'},
        ],next:'c13n7'},
      {id:'c13n7',speaker:'npc',type:'say',pt:'Aqui tem o seu cartão de embarque. A porta de embarque é a 23. O embarque começa às 15h30.',de:'Hier ist Ihre Bordkarte. Gate 23. Boarding beginnt um 15:30.',next:'c13n8'},
      {id:'c13n8',speaker:'learner',type:'write',prompt:'Frage, wo das Gate ist',
        keywords:['onde','porta','embarque','gate'],hint:'Onde fica a porta...?',
        answer:'Onde fica a porta de embarque?',next:'c13n9'},
      {id:'c13n9',speaker:'npc',type:'say',pt:'Siga em frente e depois à direita, depois do controlo de segurança.',de:'Geradeaus und dann rechts, nach der Sicherheitskontrolle.',next:'c13n10'},
      {id:'c13n10',speaker:'learner',type:'write',prompt:'Bedanke dich und wünsche einen guten Tag',
        keywords:['obrigad','dia','tarde'],hint:'Obrigado/a!',
        answer:'Muito obrigado! Boa tarde!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 14. Beim Friseur
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv14',
    title: 'No Cabeleireiro',
    subtitle: 'Beim Friseur',
    icon: '💇',
    color: '#9333ea',
    difficulty: 'A2',
    nodes: [
      {id:'c14n1',speaker:'npc',type:'say',pt:'Boa tarde! Tem marcação?',de:'Guten Tag! Haben Sie einen Termin?',next:'c14n2'},
      {id:'c14n2',speaker:'learner',type:'choose',prompt:'Du hast keinen Termin, fragst ob es ohne geht',
        options:[
          {pt:'Não, não tenho. É possível sem marcação?',de:'Nein, habe ich nicht. Geht es ohne Termin?',correct:true,next:'c14n3'},
          {pt:'Sim.',de:'Ja.',correct:false,feedback:'Du hast keinen Termin! Sage "Não, não tenho" und frage ob es ohne geht.',next:'c14n2'},
        ],next:'c14n3'},
      {id:'c14n3',speaker:'npc',type:'say',pt:'Sim, pode ser. Sente-se, por favor. O que é que deseja?',de:'Ja, kein Problem. Setzen Sie sich bitte. Was möchten Sie?',next:'c14n4'},
      {id:'c14n4',speaker:'learner',type:'choose',prompt:'Du möchtest die Haare schneiden lassen — nur kürzer',
        options:[
          {pt:'Queria cortar o cabelo, por favor. Só um pouco mais curto.',de:'Ich möchte die Haare schneiden lassen. Nur etwas kürzer.',correct:true,next:'c14n5'},
          {pt:'Quero pintar o cabelo.',de:'Ich möchte die Haare färben.',correct:false,feedback:'Du wolltest doch schneiden! "Cortar o cabelo" = Haare schneiden.',next:'c14n4'},
        ],next:'c14n5'},
      {id:'c14n5',speaker:'npc',type:'say',pt:'Com certeza. Quanto é que quer tirar? Dois centímetros?',de:'Natürlich. Wie viel soll ab? Zwei Zentimeter?',next:'c14n6'},
      {id:'c14n6',speaker:'learner',type:'write',prompt:'Sage ja, zwei Zentimeter ist gut',
        keywords:['sim','dois','centímetro','bem','bom'],hint:'Sim, dois centímetros...',
        answer:'Sim, dois centímetros está bem.',next:'c14n7'},
      {id:'c14n7',speaker:'npc',type:'say',pt:'Pronto, está feito! Gosta?',de:'So, fertig! Gefällt es Ihnen?',next:'c14n8'},
      {id:'c14n8',speaker:'learner',type:'write',prompt:'Sage, dass es dir sehr gut gefällt und frage nach dem Preis',
        keywords:['gost','bonit','bem','quanto','cust','pagar'],hint:'Gosto muito! Quanto...?',
        answer:'Gosto muito! Quanto é que fica?',next:'c14n9'},
      {id:'c14n9',speaker:'npc',type:'say',pt:'São quinze euros.',de:'Das macht fünfzehn Euro.',next:'c14n10'},
      {id:'c14n10',speaker:'learner',type:'write',prompt:'Zahle und verabschiede dich',
        keywords:['aqui','obrigad','dia','tarde'],hint:'Aqui tem. Obrigado/a!',
        answer:'Aqui tem. Muito obrigado!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 15. Im Bus / Zug — Fahrkarte kaufen
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv15',
    title: 'No Autocarro / Comboio',
    subtitle: 'Fahrkarte kaufen & fahren',
    icon: '🚌',
    color: '#0891b2',
    difficulty: 'A1',
    nodes: [
      {id:'c15n1',speaker:'learner',type:'choose',prompt:'Du bist an der Haltestelle. Frage jemanden, ob das der richtige Bus nach Sintra ist',
        options:[
          {pt:'Desculpe, este autocarro vai para Sintra?',de:'Entschuldigung, fährt dieser Bus nach Sintra?',correct:true,next:'c15n2'},
          {pt:'Sintra?',de:'Sintra?',correct:false,feedback:'Etwas ausführlicher! "Este autocarro vai para Sintra?" = Fährt dieser Bus nach Sintra?',next:'c15n1'},
        ],next:'c15n2'},
      {id:'c15n2',speaker:'npc',type:'say',pt:'Não, este vai para Cascais. Para Sintra tem de apanhar o comboio na estação do Rossio.',de:'Nein, dieser fährt nach Cascais. Nach Sintra müssen Sie den Zug am Bahnhof Rossio nehmen.',next:'c15n3'},
      {id:'c15n3',speaker:'learner',type:'write',prompt:'Frage, wo der Bahnhof Rossio ist',
        keywords:['onde','fica','Rossio','estação'],hint:'Onde fica...?',
        answer:'Onde fica a estação do Rossio?',next:'c15n4'},
      {id:'c15n4',speaker:'npc',type:'say',pt:'Fica ali, a cinco minutos a pé. Siga em frente e vire à esquerda.',de:'Der ist dort drüben, fünf Minuten zu Fuß. Geradeaus und dann links.',next:'c15n5'},
      // At the train station
      {id:'c15n5',speaker:'npc',type:'say',pt:'(Na bilheteira) Bom dia! Para onde?',de:'(Am Schalter) Guten Tag! Wohin?',next:'c15n6'},
      {id:'c15n6',speaker:'learner',type:'choose',prompt:'Kaufe ein Hin-und-Rück-Ticket nach Sintra',
        options:[
          {pt:'Um bilhete de ida e volta para Sintra, por favor.',de:'Ein Hin-und-Rück-Ticket nach Sintra, bitte.',correct:true,next:'c15n7'},
          {pt:'Um bilhete para Sintra.',de:'Ein Ticket nach Sintra.',correct:false,feedback:'Du willst hin UND zurück! "Ida e volta" = Hin und Zurück.',next:'c15n6'},
        ],next:'c15n7'},
      {id:'c15n7',speaker:'npc',type:'say',pt:'São quatro euros e cinquenta. O próximo comboio parte às dez e quinze, linha 1.',de:'Das macht 4,50 Euro. Der nächste Zug fährt um 10:15, Gleis 1.',next:'c15n8'},
      {id:'c15n8',speaker:'learner',type:'write',prompt:'Frage, wie lange die Fahrt dauert',
        keywords:['quanto','tempo','demora','dura','viagem'],hint:'Quanto tempo demora...?',
        answer:'Quanto tempo demora a viagem?',next:'c15n9'},
      {id:'c15n9',speaker:'npc',type:'say',pt:'Cerca de quarenta minutos. Boa viagem!',de:'Ungefähr vierzig Minuten. Gute Reise!',next:'c15n10'},
      {id:'c15n10',speaker:'learner',type:'write',prompt:'Bedanke dich',
        keywords:['obrigad','dia'],hint:'Obrigado/a!',
        answer:'Obrigado! Bom dia!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 16. Beim Vermieter — Problem melden
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv16',
    title: 'Falar com o Senhorio',
    subtitle: 'Dem Vermieter ein Problem melden',
    icon: '🔧',
    color: '#dc2626',
    difficulty: 'A2',
    nodes: [
      {id:'c16n1',speaker:'learner',type:'write',prompt:'Rufe deinen Vermieter an und begrüße ihn',
        keywords:['dia','tarde','noite','senhor','senhora','olá'],hint:'Bom dia, senhor...',
        answer:'Bom dia, senhor Silva!',next:'c16n2'},
      {id:'c16n2',speaker:'npc',type:'say',pt:'Bom dia! Então, está tudo bem com o apartamento?',de:'Guten Tag! Na, ist alles in Ordnung mit der Wohnung?',next:'c16n3'},
      {id:'c16n3',speaker:'learner',type:'choose',prompt:'Erkläre, dass die Waschmaschine kaputt ist',
        options:[
          {pt:'Na verdade, tenho um problema. A máquina de lavar está avariada.',de:'Eigentlich habe ich ein Problem. Die Waschmaschine ist kaputt.',correct:true,next:'c16n4'},
          {pt:'Sim, está tudo bem.',de:'Ja, alles in Ordnung.',correct:false,feedback:'Du hast doch ein Problem! Sage "Tenho um problema" und erkläre was kaputt ist.',next:'c16n3'},
        ],next:'c16n4'},
      {id:'c16n4',speaker:'npc',type:'say',pt:'Oh, lamento muito! O que é que se passa exatamente?',de:'Oh, das tut mir sehr leid! Was genau ist passiert?',next:'c16n5'},
      {id:'c16n5',speaker:'learner',type:'write',prompt:'Erkläre, dass die Maschine nicht mehr funktioniert — sie macht ein komisches Geräusch',
        keywords:['funciona','barulho','trabalh','liga'],hint:'A máquina não...',
        answer:'A máquina não funciona. Faz um barulho estranho.',next:'c16n6'},
      {id:'c16n6',speaker:'npc',type:'say',pt:'Percebo. Vou enviar um técnico amanhã de manhã. Está em casa entre as nove e as doze?',de:'Ich verstehe. Ich schicke morgen früh einen Techniker. Sind Sie zwischen neun und zwölf zu Hause?',next:'c16n7'},
      {id:'c16n7',speaker:'learner',type:'choose',prompt:'Sage ja, morgen Vormittag passt dir',
        options:[
          {pt:'Sim, estou em casa amanhã de manhã. Obrigado!',de:'Ja, ich bin morgen Vormittag zu Hause. Danke!',correct:true,next:'c16n8'},
          {pt:'Não, amanhã não posso.',de:'Nein, morgen geht nicht.',correct:false,feedback:'Morgen Vormittag passt dir doch! "Estou em casa amanhã de manhã."',next:'c16n7'},
        ],next:'c16n8'},
      {id:'c16n8',speaker:'npc',type:'say',pt:'Ótimo! Se precisar de mais alguma coisa, é só ligar.',de:'Super! Wenn Sie sonst noch etwas brauchen, rufen Sie einfach an.',next:'c16n9'},
      {id:'c16n9',speaker:'learner',type:'write',prompt:'Bedanke dich herzlich und verabschiede dich',
        keywords:['obrigad','agradeç','dia','tarde'],hint:'Muito obrigado/a!',
        answer:'Muito obrigado pela ajuda! Bom dia!',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 17. An der Sprachschule — Sich anmelden
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv17',
    title: 'Na Escola de Línguas',
    subtitle: 'Sich an der Sprachschule anmelden',
    icon: '🏫',
    color: '#059669',
    difficulty: 'A2',
    nodes: [
      {id:'c17n1',speaker:'npc',type:'say',pt:'Boa tarde! Bem-vindo à escola de línguas. Em que posso ajudar?',de:'Guten Tag! Willkommen an der Sprachschule. Wie kann ich helfen?',next:'c17n2'},
      {id:'c17n2',speaker:'learner',type:'choose',prompt:'Sage, dass du Portugiesisch lernen möchtest',
        options:[
          {pt:'Boa tarde! Gostaria de me inscrever num curso de português.',de:'Guten Tag! Ich möchte mich für einen Portugiesischkurs anmelden.',correct:true,next:'c17n3'},
          {pt:'Quero falar português.',de:'Ich will Portugiesisch sprechen.',correct:false,feedback:'Höflicher! Benutze "Gostaria de me inscrever num curso de..." = Ich möchte mich für einen Kurs einschreiben.',next:'c17n2'},
        ],next:'c17n3'},
      {id:'c17n3',speaker:'npc',type:'say',pt:'Ótimo! Já fala algum português ou é principiante?',de:'Super! Sprechen Sie schon etwas Portugiesisch oder sind Sie Anfänger?',next:'c17n4'},
      {id:'c17n4',speaker:'learner',type:'write',prompt:'Sage, dass du ein bisschen sprichst aber noch Anfänger bist',
        keywords:['pouco','inici','princip','começ','basic'],hint:'Falo um pouco, mas...',
        answer:'Falo um pouco, mas ainda sou principiante.',next:'c17n5'},
      {id:'c17n5',speaker:'npc',type:'say',pt:'Muito bem! Temos cursos de nível A1 e A2. O curso intensivo é de segunda a sexta, das nove às treze. O normal é duas vezes por semana.',de:'Sehr gut! Wir haben A1 und A2 Kurse. Der Intensivkurs ist Montag bis Freitag, 9-13 Uhr. Der normale Kurs ist zweimal pro Woche.',next:'c17n6'},
      {id:'c17n6',speaker:'learner',type:'choose',prompt:'Frage nach dem Preis des normalen Kurses',
        options:[
          {pt:'Quanto custa o curso normal?',de:'Was kostet der normale Kurs?',correct:true,next:'c17n7'},
          {pt:'Quero o intensivo.',de:'Ich möchte den Intensivkurs.',correct:false,feedback:'Frage erst nach dem Preis! "Quanto custa o curso normal?"',next:'c17n6'},
        ],next:'c17n7'},
      {id:'c17n7',speaker:'npc',type:'say',pt:'O curso normal custa duzentos euros por mês. Inclui material e acesso à plataforma online.',de:'Der normale Kurs kostet 200 Euro pro Monat. Material und Online-Zugang inklusive.',next:'c17n8'},
      {id:'c17n8',speaker:'learner',type:'write',prompt:'Sage, dass du dich für den normalen Kurs anmelden möchtest und frage wann er anfängt',
        keywords:['inscrev','normal','começa','quando','quero'],hint:'Queria inscrever-me... Quando começa?',
        answer:'Queria inscrever-me no curso normal. Quando é que começa?',next:'c17n9'},
      {id:'c17n9',speaker:'npc',type:'say',pt:'O próximo curso começa na segunda-feira. Preciso do seu nome completo e de um documento de identificação.',de:'Der nächste Kurs beginnt am Montag. Ich brauche Ihren vollständigen Namen und einen Ausweis.',next:'c17n10'},
      {id:'c17n10',speaker:'learner',type:'write',prompt:'Gib deinen Namen und sage, dass du deinen Reisepass dabei hast',
        keywords:['nome','chamo','passaporte','aqui'],hint:'O meu nome é... Tenho o passaporte...',
        answer:'O meu nome é Schmidt. Tenho o passaporte aqui.',next:'end'},
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // 18. Im Fitnessstudio
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'conv18',
    title: 'No Ginásio',
    subtitle: 'Im Fitnessstudio anmelden',
    icon: '💪',
    color: '#d97706',
    difficulty: 'A2',
    nodes: [
      {id:'c18n1',speaker:'npc',type:'say',pt:'Boa tarde! Bem-vindo ao ginásio FitLisboa. Posso ajudar?',de:'Guten Tag! Willkommen im Fitnessstudio FitLisboa. Kann ich helfen?',next:'c18n2'},
      {id:'c18n2',speaker:'learner',type:'choose',prompt:'Sage, dass du dich informieren möchtest',
        options:[
          {pt:'Boa tarde! Gostaria de saber os preços e os horários.',de:'Guten Tag! Ich möchte mich über Preise und Öffnungszeiten informieren.',correct:true,next:'c18n3'},
          {pt:'Quero ginásio.',de:'Ich will Fitnessstudio.',correct:false,feedback:'Höflicher! "Gostaria de saber os preços e os horários" = Ich möchte die Preise und Zeiten erfahren.',next:'c18n2'},
        ],next:'c18n3'},
      {id:'c18n3',speaker:'npc',type:'say',pt:'Claro! Estamos abertos das sete da manhã às dez da noite. A mensalidade é quarenta euros, sem fidelização.',de:'Natürlich! Wir sind von 7 bis 22 Uhr geöffnet. Der Monatsbeitrag ist 40 Euro, ohne Vertragsbindung.',next:'c18n4'},
      {id:'c18n4',speaker:'learner',type:'write',prompt:'Frage, ob eine Probestunde möglich ist',
        keywords:['experiment','prova','aula','gratuit','test'],hint:'É possível fazer uma aula...?',
        answer:'É possível fazer uma aula experimental?',next:'c18n5'},
      {id:'c18n5',speaker:'npc',type:'say',pt:'Sim, a primeira aula é grátis! Quer experimentar hoje?',de:'Ja, die erste Stunde ist kostenlos! Möchten Sie heute ausprobieren?',next:'c18n6'},
      {id:'c18n6',speaker:'learner',type:'choose',prompt:'Sage ja und frage was du mitbringen musst',
        options:[
          {pt:'Sim, gostava! O que é que preciso de trazer?',de:'Ja, gerne! Was muss ich mitbringen?',correct:true,next:'c18n7'},
          {pt:'Não, obrigado.',de:'Nein, danke.',correct:false,feedback:'Komm schon, probier es aus! "Sim, gostava!" = Ja, ich würde gerne!',next:'c18n6'},
        ],next:'c18n7'},
      {id:'c18n7',speaker:'npc',type:'say',pt:'Só precisa de trazer roupa de desporto, sapatilhas e uma toalha. Nós temos cacifos e chuveiros.',de:'Sie brauchen nur Sportkleidung, Turnschuhe und ein Handtuch. Wir haben Schließfächer und Duschen.',next:'c18n8'},
      {id:'c18n8',speaker:'learner',type:'write',prompt:'Bedanke dich und sage, dass du morgen wiederkommst',
        keywords:['obrigad','amanhã','volto','venho'],hint:'Obrigado/a! Volto amanhã...',
        answer:'Muito obrigado! Volto amanhã para experimentar.',next:'end'},
    ]
  }
];
