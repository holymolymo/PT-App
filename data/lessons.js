// Aprender Português 1 — Datenbasis aller 14 Lektionen
// Quelle: Aprender Português 1, Texto Editores, A1/A2

window.LESSONS = [

// ─────────────────────────────────────────────
// UNIDADE 1 — Identificação e Dados Pessoais
// ─────────────────────────────────────────────
{
  id: 1,
  title: 'Identificação e Dados Pessoais',
  subtitle: 'Namen, Berufe, Nationalitäten, Zahlen',
  color: '#006B3C',
  unlocked: true,
  vocabulary: [
    // Profissões
    {id:'u1v01',pt:'o médico / a médica',de:'der Arzt / die Ärztin',cat:'profissões',expl:'Männlich: o médico. Weiblich: a médica. Typisches -o/-a Muster.'},
    {id:'u1v02',pt:'o advogado / a advogada',de:'der Rechtsanwalt / die Rechtsanwältin',cat:'profissões',expl:'Endet auf -ado/-ada – das ist ein sehr regelmäßiges Muster.'},
    {id:'u1v03',pt:'o professor / a professora',de:'der Lehrer / die Lehrerin',cat:'profissões',expl:'Männlich endet auf -or, weiblich auf -ora.'},
    {id:'u1v04',pt:'o arquitecto / a arquitecta',de:'der Architekt / die Architektin',cat:'profissões'},
    {id:'u1v05',pt:'o engenheiro / a engenheira',de:'der Ingenieur / die Ingenieurin',cat:'profissões'},
    {id:'u1v06',pt:'o enfermeiro / a enfermeira',de:'der Krankenpfleger / die Krankenschwester',cat:'profissões'},
    {id:'u1v07',pt:'o músico / a música',de:'der Musiker / die Musikerin',cat:'profissões'},
    {id:'u1v08',pt:'o/a jornalista',de:'der/die Journalist/in',cat:'profissões',expl:'Endet auf -ista – gilt für männlich UND weiblich. Nur der Artikel ändert sich: o jornalista / a jornalista.'},
    {id:'u1v09',pt:'o/a dentista',de:'der Zahnarzt / die Zahnärztin',cat:'profissões',expl:'Auch ein -ista-Wort: o dentista / a dentista.'},
    {id:'u1v10',pt:'o secretário / a secretária',de:'der Sekretär / die Sekretärin',cat:'profissões'},
    {id:'u1v11',pt:'o cantor / a cantora',de:'der Sänger / die Sängerin',cat:'profissões'},
    {id:'u1v12',pt:'o tradutor / a tradutora',de:'der Übersetzer / die Übersetzerin',cat:'profissões'},
    {id:'u1v13',pt:'o cabeleireiro / a cabeleireira',de:'der Friseur / die Friseurin',cat:'profissões'},
    {id:'u1v14',pt:'o/a economista',de:'der/die Ökonom/in',cat:'profissões'},
    {id:'u1v15',pt:'o/a estudante',de:'der/die Student/in',cat:'profissões',expl:'-ista und -nte Wörter haben oft dieselbe Form für männlich und weiblich.'},
    // Nationalidades
    {id:'u1v16',pt:'português / portuguesa',de:'portugiesisch / Portugiese/in',cat:'nationalidades'},
    {id:'u1v17',pt:'francês / francesa',de:'französisch / Franzose/Französin',cat:'nationalidades'},
    {id:'u1v18',pt:'inglês / inglesa',de:'englisch / Engländer/in',cat:'nationalidades'},
    {id:'u1v19',pt:'espanhol / espanhola',de:'spanisch / Spanier/in',cat:'nationalidades'},
    {id:'u1v20',pt:'italiano / italiana',de:'italienisch / Italiener/in',cat:'nationalidades'},
    {id:'u1v21',pt:'alemão / alemã',de:'deutsch / Deutsche/r',cat:'nationalidades',expl:'Unregelmäßig: alemão → alemã (nicht alemoa!). Das ã ist ein Nasal-Vokal.'},
    {id:'u1v22',pt:'sueco / sueca',de:'schwedisch / Schwede/Schwedin',cat:'nationalidades'},
    {id:'u1v23',pt:'belga',de:'belgisch / Belgier/in',cat:'nationalidades',expl:'belga hat keine gesonderte weibliche Form – o belga / a belga.'},
    {id:'u1v24',pt:'russo / russa',de:'russisch / Russe/Russin',cat:'nationalidades'},
    {id:'u1v25',pt:'japonês / japonesa',de:'japanisch / Japaner/in',cat:'nationalidades'},
    {id:'u1v26',pt:'chinês / chinesa',de:'chinesisch / Chinese/Chinesin',cat:'nationalidades'},
    {id:'u1v27',pt:'angolano / angolana',de:'angolanisch / Angolaner/in',cat:'nationalidades'},
    {id:'u1v28',pt:'cubano / cubana',de:'kubanisch / Kubaner/in',cat:'nationalidades'},
    {id:'u1v29',pt:'marroquino / marroquina',de:'marokkanisch / Marokkaner/in',cat:'nationalidades'},
    {id:'u1v30',pt:'norueguês / norueguesa',de:'norwegisch / Norweger/in',cat:'nationalidades'},
    {id:'u1v31',pt:'guineense',de:'guineisch / Guineer/in',cat:'nationalidades'},
    // Países
    {id:'u1v32',pt:'Portugal',de:'Portugal',cat:'países'},
    {id:'u1v33',pt:'França',de:'Frankreich',cat:'países'},
    {id:'u1v34',pt:'Alemanha',de:'Deutschland',cat:'países',expl:'Alemanha = Deutschland. Die Nationalität: alemão/alemã.'},
    {id:'u1v35',pt:'Espanha',de:'Spanien',cat:'países'},
    {id:'u1v36',pt:'Itália',de:'Italien',cat:'países'},
    {id:'u1v37',pt:'Suécia',de:'Schweden',cat:'países'},
    {id:'u1v38',pt:'Noruega',de:'Norwegen',cat:'países'},
    {id:'u1v39',pt:'Rússia',de:'Russland',cat:'países'},
    {id:'u1v40',pt:'China',de:'China',cat:'países'},
    {id:'u1v41',pt:'Japão',de:'Japan',cat:'países'},
    {id:'u1v42',pt:'Brasil',de:'Brasilien',cat:'países'},
    {id:'u1v43',pt:'Angola',de:'Angola',cat:'países'},
    {id:'u1v44',pt:'Bélgica',de:'Belgien',cat:'países'},
    {id:'u1v45',pt:'Egipto',de:'Ägypten',cat:'países'},
    // Estado civil
    {id:'u1v46',pt:'casado / casada',de:'verheiratet',cat:'estado civil'},
    {id:'u1v47',pt:'solteiro / solteira',de:'ledig / unverheiratet',cat:'estado civil'},
    {id:'u1v48',pt:'divorciado / divorciada',de:'geschieden',cat:'estado civil'},
    {id:'u1v49',pt:'viúvo / viúva',de:'verwitwet',cat:'estado civil'},
    // Família básica
    {id:'u1v50',pt:'o pai',de:'der Vater',cat:'família'},
    {id:'u1v51',pt:'a mãe',de:'die Mutter',cat:'família'},
    {id:'u1v52',pt:'o filho / a filha',de:'der Sohn / die Tochter',cat:'família'},
    {id:'u1v53',pt:'o irmão / a irmã',de:'der Bruder / die Schwester',cat:'família'},
    // Números 0-20
    {id:'u1v54',pt:'zero',de:'null (0)',cat:'números'},
    {id:'u1v55',pt:'um / uma',de:'ein / eine (1)',cat:'números',expl:'Zahlen haben auch ein Geschlecht: um livro (m.), uma mesa (f.).'},
    {id:'u1v56',pt:'dois / duas',de:'zwei (2)',cat:'números'},
    {id:'u1v57',pt:'três',de:'drei (3)',cat:'números'},
    {id:'u1v58',pt:'quatro',de:'vier (4)',cat:'números'},
    {id:'u1v59',pt:'cinco',de:'fünf (5)',cat:'números'},
    {id:'u1v60',pt:'seis',de:'sechs (6)',cat:'números'},
    {id:'u1v61',pt:'sete',de:'sieben (7)',cat:'números'},
    {id:'u1v62',pt:'oito',de:'acht (8)',cat:'números'},
    {id:'u1v63',pt:'nove',de:'neun (9)',cat:'números'},
    {id:'u1v64',pt:'dez',de:'zehn (10)',cat:'números'},
    {id:'u1v65',pt:'onze',de:'elf (11)',cat:'números'},
    {id:'u1v66',pt:'doze',de:'zwölf (12)',cat:'números'},
    {id:'u1v67',pt:'treze',de:'dreizehn (13)',cat:'números'},
    {id:'u1v68',pt:'catorze',de:'vierzehn (14)',cat:'números'},
    {id:'u1v69',pt:'quinze',de:'fünfzehn (15)',cat:'números'},
    {id:'u1v70',pt:'dezasseis',de:'sechzehn (16)',cat:'números',expl:'In Brasilien sagt man dezesseis – in Portugal: dezasseis.'},
    {id:'u1v71',pt:'dezassete',de:'siebzehn (17)',cat:'números'},
    {id:'u1v72',pt:'dezoito',de:'achtzehn (18)',cat:'números'},
    {id:'u1v73',pt:'dezanove',de:'neunzehn (19)',cat:'números'},
    {id:'u1v74',pt:'vinte',de:'zwanzig (20)',cat:'números'},
    {id:'u1v75',pt:'trinta',de:'dreißig (30)',cat:'números'},
    {id:'u1v76',pt:'quarenta',de:'vierzig (40)',cat:'números'},
    {id:'u1v77',pt:'cinquenta',de:'fünfzig (50)',cat:'números'},
    {id:'u1v78',pt:'sessenta',de:'sechzig (60)',cat:'números'},
    {id:'u1v79',pt:'setenta',de:'siebzig (70)',cat:'números'},
    {id:'u1v80',pt:'oitenta',de:'achtzig (80)',cat:'números'},
    {id:'u1v81',pt:'noventa',de:'neunzig (90)',cat:'números'},
    {id:'u1v82',pt:'cem',de:'hundert (100)',cat:'números'},
  ],
  phrases: [
    {id:'u1p01',pt:'Como se chama?',de:'Wie heißen Sie? (formell)',expl:'Se chama = er/sie heißt sich → reflexives Verb chamar-se.'},
    {id:'u1p02',pt:'Como te chamas?',de:'Wie heißt du? (informell)',expl:'te chamas = du heißt dich (tu-Form).'},
    {id:'u1p03',pt:'Chamo-me António.',de:'Ich heiße António.',expl:'chamo-me = ich heiße mich (1. Person).'},
    {id:'u1p04',pt:'Qual é a sua nacionalidade?',de:'Was ist Ihre Nationalität?'},
    {id:'u1p05',pt:'Sou português.',de:'Ich bin Portugiese.',expl:'Sou = ich bin (von ser).'},
    {id:'u1p06',pt:'Qual é a sua profissão?',de:'Was ist Ihr Beruf?'},
    {id:'u1p07',pt:'Sou médico.',de:'Ich bin Arzt.',expl:'Im Portugiesischen kein Artikel vor Berufen: Sou médico (nicht: Sou um médico).'},
    {id:'u1p08',pt:'Onde mora?',de:'Wo wohnen Sie?'},
    {id:'u1p09',pt:'Moro em Lisboa.',de:'Ich wohne in Lissabon.',expl:'moro = ich wohne (von morar, -ar Verb).'},
    {id:'u1p10',pt:'Quantos anos tem?',de:'Wie alt sind Sie?',expl:'Wörtlich: "Wie viele Jahre haben Sie?" – Alter wird mit ter (haben) ausgedrückt.'},
    {id:'u1p11',pt:'Tenho 25 anos.',de:'Ich bin 25 Jahre alt.',expl:'tenho = ich habe (von ter). Alter = "Jahre haben".'},
    {id:'u1p12',pt:'Qual é o seu número de telefone?',de:'Was ist Ihre Telefonnummer?'},
    {id:'u1p13',pt:'É casado?',de:'Sind Sie verheiratet?'},
    {id:'u1p14',pt:'Não, sou solteiro.',de:'Nein, ich bin ledig.'},
    {id:'u1p15',pt:'De onde é?',de:'Woher kommen Sie?',expl:'de onde = woher. Antwort: Sou de Portugal / Sou de Berlim.'},
  ],
  grammar: [
    {
      id:'u1g01', type:'conjugation',
      title:'Verbo chamar-se (Presente)',
      verb:'chamar-se', tense:'presente',
      forms:{
        'eu':'chamo-me','tu':'chamas-te','ele/ela/você':'chama-se',
        'nós':'chamamo-nos','eles/elas/vocês':'chamam-se'
      },
      note:'Reflexives Verb – das Pronomen kommt NACH dem Verb (mit Bindestrich).'
    },
    {
      id:'u1g02', type:'conjugation',
      title:'Verbo ser (Presente)',
      verb:'ser', tense:'presente',
      forms:{
        'eu':'sou','tu':'és','ele/ela/você':'é',
        'nós':'somos','eles/elas/vocês':'são'
      },
      note:'ser = sein. Für dauerhafte Eigenschaften: Nationalität, Beruf, Herkunft.'
    },
    {
      id:'u1g03', type:'conjugation',
      title:'Verbo ter (Presente)',
      verb:'ter', tense:'presente',
      forms:{
        'eu':'tenho','tu':'tens','ele/ela/você':'tem',
        'nós':'temos','eles/elas/vocês':'têm'
      },
      note:'ter = haben. Auch für Alter: Tenho 30 anos = Ich bin 30 Jahre alt.'
    },
    {
      id:'u1g04', type:'rule',
      title:'Definite Artikel (Singular)',
      rule:'o (maskulin) / a (feminin)',
      examples:['o médico (der Arzt)','a médica (die Ärztin)','o pai (der Vater)','a mãe (die Mutter)'],
      note:'Portugiesisch hat Genus wie Deutsch – aber andere Zuordnung!'
    },
    {
      id:'u1g05', type:'rule',
      title:'Kontraktionen mit "de"',
      rule:'de + o = do | de + a = da | de + os = dos | de + as = das',
      examples:['Sou do Porto (= de + o Porto)','É da Alemanha (= de + a Alemanha)'],
      note:'Diese Kontraktionen sind Pflicht – man sagt NIEMALS "de o".'
    },
    {
      id:'u1g06', type:'rule',
      title:'Kontraktionen mit "em"',
      rule:'em + o = no | em + a = na | em + os = nos | em + as = nas',
      examples:['Moro no Porto (= em + o Porto)','Trabalha na França (= em + a França)'],
      note:'em = in/an. Mit Artikel immer zusammenziehen.'
    },
    {
      id:'u1g07', type:'rule',
      title:'Reflexive Verben (Überblick)',
      rule:'Reflexivpronomen: me / te / se / nos / se + Verb (oder Verb-Pronomen)',
      examples:['Eu chamo-me Ana. (Ich heiße Ana.)','Tu chamas-te João? (Heißt du João?)','Ele chama-se Pedro. (Er heißt Pedro.)','Nós chamamo-nos… (Wir heißen…)'],
      note:'Bei reflexiven Verben kommt das Pronomen im EU-Portugiesisch NACH dem Verb mit Bindestrich (Eu levanto-me). Bei Verneinung DAVOR: Eu não me levanto. chamar-se ist dein erstes reflexives Verb!'
    },
    {id:'u1g08', type:'rule', title:'Fragen bilden (Grundlagen)',
      rule:'1) Tonhöhe heben am Satzende | 2) Fragewort + é que + Verb',
      examples:['Fala português? ↑ (nur Tonhöhe!)','Onde é que mora? (Wo wohnen Sie?)','Como se chama? (Wie heißen Sie?)','De onde é? (Woher kommen Sie?)'],
      note:'EU-Portugiesisch nutzt "é que" in Fragen mit Fragewörtern. Ja/Nein-Fragen nur mit Tonhöhe — keine Wortstellung wie im Deutschen!'},
    {id:'u1g09', type:'rule', title:'Fragewörter',
      rule:'quem (wer) | o que / o quê (was) | onde (wo) | quando (wann) | como (wie) | porquê (warum) | qual/quais (welche/r) | quanto/a/os/as (wie viel/e)',
      examples:['Quem é? (Wer ist das?)','O que é que fazes? (Was machst du?)','Onde moras? (Wo wohnst du?)','Quando chegas? (Wann kommst du?)','Porquê? (Warum?)','Quanto custa? (Wie viel kostet es?)'],
      note:'Wichtig: "porquê" am Satzende/allein, "por que" vor Verb. "O quê?" allein, "o que" im Satz. "Qual" bei Auswahl: "Qual é o seu nome?"'},
    {id:'u1g10', type:'rule', title:'Ja/Nein antworten — Verb wiederholen',
      rule:'Fala? → Falo. / Não falo. (Verb wiederholen!)',
      examples:['É alemão? — Sou. (Ja = Verb!)','Tem filhos? — Tenho. / Não tenho.','Fala inglês? — Falo um pouco.','Gosta de Lisboa? — Gosto muito!'],
      note:'Nur "Sim"/"Não" klingt abgehackt. Natürlicher: Verb in der 1. Person wiederholen. Das ist einer der größten Unterschiede zum Deutschen!'},
    {id:'u1g11', type:'rule', title:'Anrede: tu / você / o senhor',
      rule:'tu = vertraut | você = neutral (kann unhöflich sein!) | o senhor/a senhora = höflich | Am sichersten: Pronomen weglassen!',
      examples:['Tu falas português? (du — Freunde)','O senhor fala português? (Sie — höflich)','Fala português? (Ohne Pronomen — sicherste Form!)'],
      note:'In Portugal: "tu" für Freunde/Familie. Für Fremde NICHT "você" (kann unhöflich klingen!), sondern "o senhor/a senhora" oder einfach Pronomen weglassen.'},
    {id:'u1g12', type:'rule', title:'Há = es gibt / seit / vor',
      rule:'Há + Substantiv = es gibt | Há + Zeit = seit/vor',
      examples:['Há um banco aqui? (Gibt es eine Bank hier?)','Há muitas pessoas. (Es gibt viele Leute.)','Moro aqui há dois anos. (Ich wohne hier seit 2 Jahren.)','Cheguei há três dias. (Ich kam vor 3 Tagen.)'],
      note:'"Há" ist eines der häufigsten Wörter! Unveränderlich. Für Orte: es gibt. Für Zeit: seit/vor.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 2 — Descrição de Objectos e Pessoas
// ─────────────────────────────────────────────
{
  id: 2,
  title: 'Descrição de Objectos e Pessoas',
  subtitle: 'Beschreibungen, Farben, Adjektive',
  color: '#1a5fa8',
  unlocked: false,
  vocabulary: [
    // Características físicas
    {id:'u2v01',pt:'alto / alta',de:'groß / hochgewachsen',cat:'descrição física'},
    {id:'u2v02',pt:'baixo / baixa',de:'klein / niedrig',cat:'descrição física'},
    {id:'u2v03',pt:'gordo / gorda',de:'dick / beleibt',cat:'descrição física'},
    {id:'u2v04',pt:'magro / magra',de:'dünn / schlank',cat:'descrição física'},
    {id:'u2v05',pt:'bonito / bonita',de:'hübsch / schön',cat:'descrição física'},
    {id:'u2v06',pt:'feio / feia',de:'hässlich',cat:'descrição física'},
    {id:'u2v07',pt:'novo / nova',de:'jung / neu',cat:'descrição física',expl:'novo/nova = jung (bei Personen) oder neu (bei Dingen). Kontext entscheidet.'},
    {id:'u2v08',pt:'velho / velha',de:'alt',cat:'descrição física'},
    {id:'u2v09',pt:'grande',de:'groß',cat:'descrição',expl:'grande hat nur eine Form für m. und f.: o carro grande / a casa grande.'},
    {id:'u2v10',pt:'pequeno / pequena',de:'klein',cat:'descrição'},
    {id:'u2v11',pt:'comprido / comprida',de:'lang',cat:'descrição'},
    {id:'u2v12',pt:'curto / curta',de:'kurz',cat:'descrição'},
    {id:'u2v13',pt:'forte',de:'stark / kräftig',cat:'descrição'},
    {id:'u2v14',pt:'fraco / fraca',de:'schwach / dünn (Haar)',cat:'descrição'},
    {id:'u2v15',pt:'simpático / simpática',de:'sympathisch / nett',cat:'carácter'},
    {id:'u2v16',pt:'antipático / antipática',de:'unsympathisch',cat:'carácter'},
    {id:'u2v17',pt:'inteligente',de:'intelligent',cat:'carácter'},
    {id:'u2v18',pt:'divertido / divertida',de:'lustig / unterhaltsam',cat:'carácter'},
    {id:'u2v19',pt:'tímido / tímida',de:'schüchtern',cat:'carácter'},
    {id:'u2v20',pt:'agradável',de:'angenehm / nett',cat:'carácter'},
    // Cabelo
    {id:'u2v21',pt:'o cabelo preto',de:'schwarzes Haar',cat:'cabelo'},
    {id:'u2v22',pt:'o cabelo castanho',de:'braunes Haar',cat:'cabelo'},
    {id:'u2v23',pt:'o cabelo louro',de:'blondes Haar',cat:'cabelo'},
    {id:'u2v24',pt:'o cabelo ruivo',de:'rotes Haar',cat:'cabelo'},
    {id:'u2v25',pt:'o cabelo branco',de:'weißes Haar',cat:'cabelo'},
    {id:'u2v26',pt:'o cabelo comprido',de:'langes Haar',cat:'cabelo'},
    {id:'u2v27',pt:'o cabelo curto',de:'kurzes Haar',cat:'cabelo'},
    {id:'u2v28',pt:'o cabelo liso',de:'glattes Haar',cat:'cabelo'},
    {id:'u2v29',pt:'o cabelo ondulado',de:'welliges Haar',cat:'cabelo'},
    {id:'u2v30',pt:'o cabelo frisado',de:'lockiges Haar',cat:'cabelo'},
    // Olhos
    {id:'u2v31',pt:'os olhos azuis',de:'blaue Augen',cat:'olhos'},
    {id:'u2v32',pt:'os olhos verdes',de:'grüne Augen',cat:'olhos'},
    {id:'u2v33',pt:'os olhos castanhos',de:'braune Augen',cat:'olhos'},
    {id:'u2v34',pt:'os olhos pretos',de:'schwarze Augen',cat:'olhos'},
    // Cores
    {id:'u2v35',pt:'vermelho / vermelha',de:'rot',cat:'cores'},
    {id:'u2v36',pt:'azul',de:'blau',cat:'cores',expl:'azul hat nur eine Form: o carro azul / a mota azul.'},
    {id:'u2v37',pt:'verde',de:'grün',cat:'cores'},
    {id:'u2v38',pt:'amarelo / amarela',de:'gelb',cat:'cores'},
    {id:'u2v39',pt:'laranja',de:'orange',cat:'cores',expl:'laranja ist unveränderlich: o carro laranja / a casa laranja.'},
    {id:'u2v40',pt:'cor-de-rosa',de:'rosa / pink',cat:'cores',expl:'cor-de-rosa = Rosenfarbe – unveränderlich.'},
    {id:'u2v41',pt:'roxo / roxa',de:'lila / violett',cat:'cores'},
    {id:'u2v42',pt:'preto / preta',de:'schwarz',cat:'cores'},
    {id:'u2v43',pt:'branco / branca',de:'weiß',cat:'cores'},
    {id:'u2v44',pt:'cinzento / cinzenta',de:'grau',cat:'cores'},
    {id:'u2v45',pt:'castanho / castanha',de:'braun',cat:'cores'},
    // Objectos
    {id:'u2v46',pt:'o carro',de:'das Auto',cat:'objectos'},
    {id:'u2v47',pt:'a mota',de:'das Motorrad',cat:'objectos'},
    {id:'u2v48',pt:'o saco',de:'die Tasche',cat:'objectos'},
    {id:'u2v49',pt:'os sapatos',de:'die Schuhe',cat:'objectos'},
    {id:'u2v50',pt:'a camisa',de:'das Hemd',cat:'roupa'},
    {id:'u2v51',pt:'as calças',de:'die Hose',cat:'roupa'},
    {id:'u2v52',pt:'o vestido',de:'das Kleid',cat:'roupa'},
    {id:'u2v53',pt:'a saia',de:'der Rock',cat:'roupa'},
  ],
  phrases: [
    {id:'u2p01',pt:'Qual é a cor do carro?',de:'Welche Farbe hat das Auto?'},
    {id:'u2p02',pt:'O carro é vermelho.',de:'Das Auto ist rot.'},
    {id:'u2p03',pt:'Como é a professora?',de:'Wie sieht die Lehrerin aus?',expl:'Como é...? = Wie ist...? / Wie sieht ... aus?'},
    {id:'u2p04',pt:'Ela é alta e tem o cabelo louro.',de:'Sie ist groß und hat blonde Haare.'},
    {id:'u2p05',pt:'De que cor são os olhos dela?',de:'Welche Farbe haben ihre Augen?',expl:'de que cor = welche Farbe. dela = ihr (von ihr).'},
    {id:'u2p06',pt:'Os olhos dela são azuis.',de:'Ihre Augen sind blau.'},
    {id:'u2p07',pt:'Ele é alto, magro e simpático.',de:'Er ist groß, schlank und nett.'},
    {id:'u2p08',pt:'Que instrumento é que ela toca?',de:'Welches Instrument spielt sie?'},
  ],
  grammar: [
    {
      id:'u2g01', type:'rule',
      title:'Adjektiv-Angleichung (Konkordanz)',
      rule:'Adjektive passen sich in Genus und Numerus an das Substantiv an.',
      examples:['o carro caro (m.sg.)','a mota cara (f.sg.)','os carros caros (m.pl.)','as motas caras (f.pl.)'],
      note:'Im Deutschen ändert sich das Adjektiv nach Kasus, im Portugiesischen nach Genus & Numerus.'
    },
    {
      id:'u2g02', type:'rule',
      title:'Adjektive auf -e und auf -ista',
      rule:'Adjektive auf -e oder -ista haben dieselbe Form für m. und f.',
      examples:['o homem inteligente / a mulher inteligente','o jornalista simpático / a jornalista simpática'],
      note:'Nur Adjektive auf -o/-a ändern sich! Bei -e, -ista, -al, -az: eine Form für beide.'
    },
    {
      id:'u2g03', type:'conjugation',
      title:'Verbos regulares -ER (Presente)',
      verb:'comer', tense:'presente',
      forms:{
        'eu':'como','tu':'comes','ele/ela/você':'come',
        'nós':'comemos','eles/elas/vocês':'comem'
      },
      note:'Muster für alle regelmäßigen -er Verben: beber, vender, escrever...'
    },
    {
      id:'u2g04', type:'conjugation',
      title:'Verbos regulares -IR (Presente)',
      verb:'partir', tense:'presente',
      forms:{
        'eu':'parto','tu':'partes','ele/ela/você':'parte',
        'nós':'partimos','eles/elas/vocês':'partem'
      },
      note:'Muster für regelmäßige -ir Verben: abrir, discutir, existir...'
    },
    {
      id:'u2g05', type:'conjugation',
      title:'Verbo ver (Presente) — unregelmäßig',
      verb:'ver', tense:'presente',
      forms:{
        'eu':'vejo','tu':'vês','ele/ela/você':'vê',
        'nós':'vemos','eles/elas/vocês':'veem'
      },
      note:'ver = sehen. Die ich-Form vejo ist unregelmäßig.'
    },
    {
      id:'u2g06', type:'conjugation',
      title:'Verbo fazer (Presente) — unregelmäßig',
      verb:'fazer', tense:'presente',
      forms:{
        'eu':'faço','tu':'fazes','ele/ela/você':'faz',
        'nós':'fazemos','eles/elas/vocês':'fazem'
      },
      note:'fazer = machen/tun. faço (nicht: fazo!).'
    },
    {
      id:'u2g07', type:'conjugation',
      title:'Verbo poder (Presente) — unregelmäßig',
      verb:'poder', tense:'presente',
      forms:{
        'eu':'posso','tu':'podes','ele/ela/você':'pode',
        'nós':'podemos','eles/elas/vocês':'podem'
      },
      note:'poder = können. posso (nicht: podo!).'
    },
    {
      id:'u2g08', type:'conjugation',
      title:'Verbo querer (Presente) — unregelmäßig',
      verb:'querer', tense:'presente',
      forms:{
        'eu':'quero','tu':'queres','ele/ela/você':'quer',
        'nós':'queremos','eles/elas/vocês':'querem'
      },
      note:'querer = wollen/mögen.'
    },
    {
      id:'u2g09', type:'conjugation',
      title:'Verbo ir (Presente) — unregelmäßig',
      verb:'ir', tense:'presente',
      forms:{
        'eu':'vou','tu':'vais','ele/ela/você':'vai',
        'nós':'vamos','eles/elas/vocês':'vão'
      },
      note:'ir = gehen/fahren. Sehr unregelmäßig – auswendig lernen!'
    },
    {
      id:'u2g10', type:'conjugation',
      title:'Verbo vir (Presente) — unregelmäßig',
      verb:'vir', tense:'presente',
      forms:{
        'eu':'venho','tu':'vens','ele/ela/você':'vem',
        'nós':'vimos','eles/elas/vocês':'vêm'
      },
      note:'vir = kommen. venho (ich-Form mit -nho!).'
    },
    {id:'u2g11', type:'rule', title:'Aussprache: Nasalvokale',
      rule:'ã/õ = nasal | m/n vor Konsonant = nasal | -ão/-ões/-ãe = nasale Diphthonge',
      examples:['mão (Hand) — nasal ão','pão / pães (Brot / Brote)','limão / limões (Zitrone / Zitronen)','irmão / irmãos (Bruder / Brüder — ãos!)'],
      note:'Nasalvokale gibt es im Deutschen NICHT! Luft geht durch die Nase. Die 3 Plural-Formen von -ão muss man lernen: -ões (häufigste), -ães, -ãos.'},
    {id:'u2g12', type:'rule', title:'Aussprache: lh, nh und das stumme e',
      rule:'lh = palatales l (wie ital. gli) | nh = nasales n (wie span. ñ) | Unbetontes e = fast stumm',
      examples:['trabalho (Arbeit) — lh wie "lj"','filho (Sohn) — lh','vinho (Wein) — nh wie "nj"','amanhã (morgen) — nh','telefone → klingt wie "tlfon"'],
      note:'EU-Portugiesisch "verschluckt" unbetonte Vokale stark! Das macht das Hörverstehen so schwierig. Geschrieben: "telefone", gesprochen: "tlfon".'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 3 — Breves Fórmulas Sociais
// ─────────────────────────────────────────────
{
  id: 3,
  title: 'Breves Fórmulas Sociais',
  subtitle: 'Grüßen, Vorstellen, Höflichkeit',
  color: '#7c3aed',
  unlocked: false,
  vocabulary: [
    {id:'u3v01',pt:'Bom dia!',de:'Guten Morgen!',cat:'cumprimentos'},
    {id:'u3v02',pt:'Boa tarde!',de:'Guten Tag! / Guten Nachmittag!',cat:'cumprimentos'},
    {id:'u3v03',pt:'Boa noite!',de:'Guten Abend! / Gute Nacht!',cat:'cumprimentos',expl:'Boa noite wird sowohl zur Begrüßung als auch zum Abschied am Abend verwendet.'},
    {id:'u3v04',pt:'Olá!',de:'Hallo!',cat:'cumprimentos'},
    {id:'u3v05',pt:'Adeus!',de:'Auf Wiedersehen! / Tschüss!',cat:'despedidas'},
    {id:'u3v06',pt:'Até logo!',de:'Bis gleich! / Tschüss!',cat:'despedidas'},
    {id:'u3v07',pt:'Até amanhã!',de:'Bis morgen!',cat:'despedidas'},
    {id:'u3v08',pt:'Até já!',de:'Bis gleich! (sehr bald)',cat:'despedidas'},
    {id:'u3v09',pt:'Tchau!',de:'Ciao! / Tschüss!',cat:'despedidas'},
    {id:'u3v10',pt:'Com licença.',de:'Entschuldigung / Darf ich?',cat:'fórmulas',expl:'Com licença = wenn man um Erlaubnis bittet (z.B. an jemandem vorbeigehen). Desculpe = Entschuldigung für einen Fehler.'},
    {id:'u3v11',pt:'Desculpe.',de:'Entschuldigung / Verzeihung',cat:'fórmulas'},
    {id:'u3v12',pt:'Obrigado.',de:'Danke. (Mann spricht)',cat:'fórmulas',expl:'Obrigado (Mann) / Obrigada (Frau) – man sagt die Form, die zu SICH selbst passt, nicht zum Gegenüber!'},
    {id:'u3v13',pt:'Obrigada.',de:'Danke. (Frau spricht)',cat:'fórmulas'},
    {id:'u3v14',pt:'De nada.',de:'Bitte sehr / Gern geschehen.',cat:'fórmulas'},
    {id:'u3v15',pt:'Por favor.',de:'Bitte.',cat:'fórmulas'},
    {id:'u3v16',pt:'Faz favor.',de:'Bitte / Entschuldigung (um Aufmerksamkeit)',cat:'fórmulas',expl:'Faz favor benutzt man, um jemanden anzusprechen (Kellner, Verkäufer).'},
    {id:'u3v17',pt:'Com prazer!',de:'Gerne! / Mit Vergnügen!',cat:'fórmulas'},
    {id:'u3v18',pt:'Bem-vindo! / Bem-vinda!',de:'Willkommen!',cat:'fórmulas'},
    {id:'u3v19',pt:'Muito bem!',de:'Sehr gut!',cat:'expressões'},
    {id:'u3v20',pt:'Mais ou menos.',de:'So lala / Geht so.',cat:'expressões'},
    {id:'u3v21',pt:'Tudo bem?',de:'Alles gut?',cat:'expressões'},
    {id:'u3v22',pt:'Tudo bem!',de:'Alles gut!',cat:'expressões'},
    {id:'u3v23',pt:'Como está?',de:'Wie geht es Ihnen? (formell)',cat:'expressões'},
    {id:'u3v24',pt:'Como estás?',de:'Wie geht es dir? (informell)',cat:'expressões'},
    {id:'u3v25',pt:'Estou bem, obrigado.',de:'Mir geht es gut, danke.',cat:'expressões'},
  ],
  phrases: [
    {id:'u3p01',pt:'Olá! Como se chama?',de:'Hallo! Wie heißen Sie?'},
    {id:'u3p02',pt:'Chamo-me Maria. E você?',de:'Ich heiße Maria. Und Sie?'},
    {id:'u3p03',pt:'Muito prazer!',de:'Sehr erfreut! / Freut mich!',expl:'Die Standard-Antwort auf eine Vorstellung.'},
    {id:'u3p04',pt:'Igualmente!',de:'Gleichfalls!'},
    {id:'u3p05',pt:'Apresento-te o meu amigo Pedro.',de:'Ich stelle dir meinen Freund Pedro vor.',expl:'apresentar = vorstellen. Apresento-te = ich stelle dir vor.'},
    {id:'u3p06',pt:'Conhece o senhor Silva?',de:'Kennen Sie Herrn Silva?'},
    {id:'u3p07',pt:'Sim, já nos conhecemos.',de:'Ja, wir kennen uns schon.'},
  ],
  grammar: [
    {
      id:'u3g01', type:'conjugation',
      title:'Verbo estar (Presente)',
      verb:'estar', tense:'presente',
      forms:{
        'eu':'estou','tu':'estás','ele/ela/você':'está',
        'nós':'estamos','eles/elas/vocês':'estão'
      },
      note:'estar = sein (für temporäre Zustände). Como estás? Estou bem. Gegenteil von ser (dauerhaft).'
    },
    {
      id:'u3g02', type:'rule',
      title:'ser vs. estar',
      rule:'ser: dauerhaft (Nationalität, Beruf, Herkunft) | estar: temporär (Gefühle, Ort, Zustand)',
      examples:['Ele é português. (dauerhaft)','Ele está em Lisboa. (temporär, kann sich ändern)','A Ana é bonita. (dauerhaft)','A Ana está cansada. (temporär)'],
      note:'Das ist EINER der wichtigsten Unterschiede im Portugiesischen!'
    },
    {id:'u3g03', type:'rule', title:'Gesprächswörter (Discourse Markers)',
      rule:'então (also/dann) | pois (ja/tja) | pronto (gut/fertig) | bom (also) | olhe (schauen Sie)',
      examples:['Então, como estás? (Also, wie geht es dir?)','Pois é. (Ja, genau. / Tja.)','Pronto, vamos? (Gut, gehen wir?)','Bom, eu acho que... (Also, ich denke dass...)','Olhe, desculpe. (Schauen Sie, Entschuldigung.)'],
      note:'"Pois" und "pronto" sind typisch EU-Portugiesisch! Sie füllen Gesprächspausen und zeigen Zustimmung. Ohne sie klingt man wie ein Roboter.'},
    {id:'u3g04', type:'rule', title:'Rückfragen: não é? / pois não?',
      rule:'Statement + não é? / certo? / sim? = Rückfrage',
      examples:['É bonito, não é? (Schön, oder?)','Falas português, certo? (Du sprichst Portugiesisch, oder?)','Vamos amanhã, sim? (Wir gehen morgen, ja?)'],
      note:'Wie deutsche Rückfragen "oder?" / "nicht wahr?". Sehr häufig in Gesprächen.'},
    {id:'u3g05', type:'rule', title:'Aussprache: Das S am Wortende',
      rule:'s am Ende/vor Konsonant = "sch" (EP!) | s zwischen Vokalen = "s" stimmhaft',
      examples:['os amigos → klingt wie "osch amigusch"','as casas → "asch cashash"','casa → s zwischen Vokalen = stimmhaftes s','mesa, rosa → stimmhaftes s'],
      note:'DAS Erkennungsmerkmal von EU-Portugiesisch! Jedes Wort-S am Ende wird zu "sch". Deshalb klingt EP so anders als Brasilianisch.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 4 — Actividades do Quotidiano
// ─────────────────────────────────────────────
{
  id: 4,
  title: 'Actividades do Quotidiano',
  subtitle: 'Alltag, Tage, Monate, Uhrzeiten',
  color: '#d97706',
  unlocked: false,
  vocabulary: [
    // Dias da semana
    {id:'u4v01',pt:'a segunda-feira',de:'der Montag',cat:'dias'},
    {id:'u4v02',pt:'a terça-feira',de:'der Dienstag',cat:'dias'},
    {id:'u4v03',pt:'a quarta-feira',de:'der Mittwoch',cat:'dias'},
    {id:'u4v04',pt:'a quinta-feira',de:'der Donnerstag',cat:'dias'},
    {id:'u4v05',pt:'a sexta-feira',de:'der Freitag',cat:'dias'},
    {id:'u4v06',pt:'o sábado',de:'der Samstag',cat:'dias'},
    {id:'u4v07',pt:'o domingo',de:'der Sonntag',cat:'dias'},
    // Meses
    {id:'u4v08',pt:'Janeiro',de:'Januar',cat:'meses'},
    {id:'u4v09',pt:'Fevereiro',de:'Februar',cat:'meses'},
    {id:'u4v10',pt:'Março',de:'März',cat:'meses'},
    {id:'u4v11',pt:'Abril',de:'April',cat:'meses'},
    {id:'u4v12',pt:'Maio',de:'Mai',cat:'meses'},
    {id:'u4v13',pt:'Junho',de:'Juni',cat:'meses'},
    {id:'u4v14',pt:'Julho',de:'Juli',cat:'meses'},
    {id:'u4v15',pt:'Agosto',de:'August',cat:'meses'},
    {id:'u4v16',pt:'Setembro',de:'September',cat:'meses'},
    {id:'u4v17',pt:'Outubro',de:'Oktober',cat:'meses'},
    {id:'u4v18',pt:'Novembro',de:'November',cat:'meses'},
    {id:'u4v19',pt:'Dezembro',de:'Dezember',cat:'meses'},
    // Estações
    {id:'u4v20',pt:'a Primavera',de:'der Frühling',cat:'estações'},
    {id:'u4v21',pt:'o Verão',de:'der Sommer',cat:'estações'},
    {id:'u4v22',pt:'o Outono',de:'der Herbst',cat:'estações'},
    {id:'u4v23',pt:'o Inverno',de:'der Winter',cat:'estações'},
    // Horas
    {id:'u4v24',pt:'Que horas são?',de:'Wie viel Uhr ist es?',cat:'horas'},
    {id:'u4v25',pt:'São duas horas.',de:'Es ist zwei Uhr.',cat:'horas',expl:'são = es sind (Plural bei 2+ Stunden). Aber: É uma hora (Singular).'},
    {id:'u4v26',pt:'É meio-dia.',de:'Es ist Mittag.',cat:'horas'},
    {id:'u4v27',pt:'É meia-noite.',de:'Es ist Mitternacht.',cat:'horas'},
    {id:'u4v28',pt:'e um quarto',de:'und Viertel (nach)',cat:'horas',expl:'São três e um quarto = Es ist Viertel nach drei.'},
    {id:'u4v29',pt:'e meia',de:'halb (nach der vollen Stunde)',cat:'horas',expl:'São duas e meia = Es ist halb drei (= 2:30 Uhr). Achtung: "e meia" = "+30 Minuten"!'},
    {id:'u4v30',pt:'menos um quarto',de:'Viertel vor',cat:'horas',expl:'São quatro menos um quarto = Viertel vor vier.'},
    // Actividades diárias
    {id:'u4v31',pt:'acordar',de:'aufwachen',cat:'actividades'},
    {id:'u4v32',pt:'levantar-se',de:'aufstehen',cat:'actividades'},
    {id:'u4v33',pt:'tomar o pequeno-almoço',de:'frühstücken',cat:'actividades',expl:'pequeno-almoço = das Frühstück (wörtlich: kleines Mittagessen).'},
    {id:'u4v34',pt:'tomar duche / banho',de:'duschen / ein Bad nehmen',cat:'actividades'},
    {id:'u4v35',pt:'trabalhar',de:'arbeiten',cat:'actividades'},
    {id:'u4v36',pt:'estudar',de:'lernen / studieren',cat:'actividades'},
    {id:'u4v37',pt:'almoçar',de:'zu Mittag essen',cat:'actividades'},
    {id:'u4v38',pt:'jantar',de:'zu Abend essen',cat:'actividades'},
    {id:'u4v39',pt:'dormir',de:'schlafen',cat:'actividades'},
    {id:'u4v40',pt:'sair',de:'ausgehen / weggehen',cat:'actividades'},
    {id:'u4v41',pt:'chegar',de:'ankommen',cat:'actividades'},
    {id:'u4v42',pt:'apanhar o autocarro',de:'den Bus nehmen',cat:'actividades',expl:'autocarro = Bus (europäisches PT). In Brasilien: ônibus.'},
    {id:'u4v43',pt:'apanhar o metro',de:'die U-Bahn nehmen',cat:'actividades'},
    {id:'u4v44',pt:'ver televisão',de:'fernsehen',cat:'actividades'},
    {id:'u4v45',pt:'ouvir música',de:'Musik hören',cat:'actividades'},
    {id:'u4v46',pt:'ler',de:'lesen',cat:'actividades'},
    {id:'u4v47',pt:'cozinhar',de:'kochen',cat:'actividades'},
    {id:'u4v48',pt:'fazer compras',de:'einkaufen',cat:'actividades'},
    {id:'u4v49',pt:'passear',de:'spazieren gehen',cat:'actividades'},
    // Advérbios de frequência
    {id:'u4v50',pt:'sempre',de:'immer',cat:'frequência'},
    {id:'u4v51',pt:'normalmente',de:'normalerweise',cat:'frequência'},
    {id:'u4v52',pt:'geralmente',de:'generell / im Allgemeinen',cat:'frequência'},
    {id:'u4v53',pt:'às vezes',de:'manchmal',cat:'frequência'},
    {id:'u4v54',pt:'raramente',de:'selten',cat:'frequência'},
    {id:'u4v55',pt:'nunca',de:'nie / niemals',cat:'frequência'},
    {id:'u4v56',pt:'todos os dias',de:'jeden Tag',cat:'frequência'},
    {id:'u4v57',pt:'de vez em quando',de:'ab und zu / gelegentlich',cat:'frequência'},
  ],
  phrases: [
    {id:'u4p01',pt:'A que horas te levantas?',de:'Um wie viel Uhr stehst du auf?'},
    {id:'u4p02',pt:'Levanto-me às sete horas.',de:'Ich stehe um sieben Uhr auf.'},
    {id:'u4p03',pt:'Que dia é hoje?',de:'Welcher Tag ist heute?'},
    {id:'u4p04',pt:'Hoje é segunda-feira.',de:'Heute ist Montag.'},
    {id:'u4p05',pt:'Em que mês estamos?',de:'In welchem Monat sind wir?'},
    {id:'u4p06',pt:'Estamos em Agosto.',de:'Wir sind im August.'},
    {id:'u4p07',pt:'Em que estação do ano estamos?',de:'In welcher Jahreszeit sind wir?'},
    {id:'u4p08',pt:'Estamos no Verão.',de:'Wir sind im Sommer.'},
    {id:'u4p09',pt:'Normalmente almoço ao meio-dia.',de:'Normalerweise esse ich um Mittag zu Mittag.'},
    {id:'u4p10',pt:'Às vezes vou ao ginásio.',de:'Manchmal gehe ich ins Fitnessstudio.'},
  ],
  grammar: [
    {
      id:'u4g01', type:'conjugation',
      title:'Verbos regulares -AR (Presente)',
      verb:'falar', tense:'presente',
      forms:{
        'eu':'falo','tu':'falas','ele/ela/você':'fala',
        'nós':'falamos','eles/elas/vocês':'falam'
      },
      note:'Muster für ALLE regelmäßigen -ar Verben: trabalhar, estudar, morar, almoçar...'
    },
    {
      id:'u4g02', type:'conjugation',
      title:'Verbo fazer (Presente)',
      verb:'fazer', tense:'presente',
      forms:{
        'eu':'faço','tu':'fazes','ele/ela/você':'faz',
        'nós':'fazemos','eles/elas/vocês':'fazem'
      },
      note:'fazer = machen/tun. Unregelmäßig in der eu-Form: faço.'
    },
    {
      id:'u4g03', type:'conjugation',
      title:'Verbo dizer (Presente)',
      verb:'dizer', tense:'presente',
      forms:{
        'eu':'digo','tu':'dizes','ele/ela/você':'diz',
        'nós':'dizemos','eles/elas/vocês':'dizem'
      },
      note:'dizer = sagen.'
    },
    {
      id:'u4g04', type:'conjugation',
      title:'Verbo saber (Presente)',
      verb:'saber', tense:'presente',
      forms:{
        'eu':'sei','tu':'sabes','ele/ela/você':'sabe',
        'nós':'sabemos','eles/elas/vocês':'sabem'
      },
      note:'saber = wissen. sei (ich weiß) – sehr unregelmäßig!'
    },
    {
      id:'u4g05', type:'conjugation',
      title:'Verbo pôr (Presente)',
      verb:'pôr', tense:'presente',
      forms:{
        'eu':'ponho','tu':'pões','ele/ela/você':'põe',
        'nós':'pomos','eles/elas/vocês':'põem'
      },
      note:'pôr = legen/stellen/setzen. ponho – sehr unregelmäßig!'
    },
    {
      id:'u4g06', type:'conjugation',
      title:'Verbo dar (Presente)',
      verb:'dar', tense:'presente',
      forms:{
        'eu':'dou','tu':'dás','ele/ela/você':'dá',
        'nós':'damos','eles/elas/vocês':'dão'
      },
      note:'dar = geben.'
    },
    {
      id:'u4g07', type:'conjugation',
      title:'Verbo pedir (Presente)',
      verb:'pedir', tense:'presente',
      forms:{
        'eu':'peço','tu':'pedes','ele/ela/você':'pede',
        'nós':'pedimos','eles/elas/vocês':'pedem'
      },
      note:'pedir = bitten / bestellen. peço – Vokalwechsel e→eç.'
    },
    {
      id:'u4g08', type:'conjugation',
      title:'Verbo dormir (Presente)',
      verb:'dormir', tense:'presente',
      forms:{
        'eu':'durmo','tu':'dormes','ele/ela/você':'dorme',
        'nós':'dormimos','eles/elas/vocês':'dormem'
      },
      note:'dormir = schlafen. durmo – Vokalwechsel o→u in der eu-Form.'
    },
    {
      id:'u4g09', type:'conjugation',
      title:'Verbo trazer (Presente)',
      verb:'trazer', tense:'presente',
      forms:{
        'eu':'trago','tu':'trazes','ele/ela/você':'traz',
        'nós':'trazemos','eles/elas/vocês':'trazem'
      },
      note:'trazer = mitbringen. trago – sehr unregelmäßig!'
    },
    {
      id:'u4g10', type:'conjugation',
      title:'Verbo ler (Presente)',
      verb:'ler', tense:'presente',
      forms:{
        'eu':'leio','tu':'lês','ele/ela/você':'lê',
        'nós':'lemos','eles/elas/vocês':'leem'
      },
      note:'ler = lesen. leio – Vokaleinschub.'
    },
    {
      id:'u4g11', type:'rule',
      title:'Uhrzeit sagen',
      rule:'É uma hora. / São X horas. + e um quarto / e meia / menos um quarto',
      examples:['São dez horas. = 10:00','São dez e meia. = 10:30','São dez e um quarto. = 10:15','São onze menos um quarto. = 10:45'],
      note:'Nur 1 Uhr = É uma hora. Alle anderen: São... horas.'
    },
    {id:'u4g12', type:'rule', title:'Datum sagen',
      rule:'Tag + de + Monat + de + Jahr | 1. = primeiro, Rest = Kardinalzahl',
      examples:['5 de abril de 2026 (fünfter April)','Primeiro de janeiro (1. Januar — einzige Ordinalzahl!)','Que dia é hoje? / A quantos estamos? (Welcher Tag ist heute?)','Dois mil e vinte e seis (2026)'],
      note:'Nur der 1. eines Monats = "primeiro". Alle anderen Tage = normale Zahl. Jahre werden voll ausgesprochen: "dois mil e vinte e seis".'},
    {id:'u4g13', type:'rule', title:'Konnektoren: weil, deshalb, wenn',
      rule:'porque (weil) | por isso (deshalb) | quando (wenn/als) | se (falls)',
      examples:['Estudo porque quero aprender. (Ich lerne, weil ich lernen will.)','Está a chover, por isso fico em casa. (Es regnet, deshalb bleibe ich zuhause.)','Quando chego a casa, janto. (Wenn ich nach Hause komme, esse ich.)','Se tiver tempo, vou ao cinema. (Falls ich Zeit habe, gehe ich ins Kino.)'],
      note:'Diese Wörter verbinden Sätze und machen dein Portugiesisch natürlicher! "Porque" = weil, "por isso" = deshalb — nicht verwechseln!'},
    {id:'u4g14', type:'rule', title:'Costumar + Infinitiv (Gewohnheiten)',
      rule:'costumar + Infinitiv = normalerweise tun / pflegen zu tun',
      examples:['Costumo acordar às 7. (Ich wache normalerweise um 7 auf.)','Costumas jantar a que horas? (Um wie viel Uhr isst du normalerweise?)','Costumamos ir ao café. (Wir gehen normalerweise ins Café.)'],
      note:'Sehr nützlich für Routinen! Alternative zu "normalmente" + Verb.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 5 — Relações Familiares e Habitação
// ─────────────────────────────────────────────
{
  id: 5,
  title: 'Relações Familiares e Habitação',
  subtitle: 'Familie, Wohnen, Besitzverhältnisse',
  color: '#059669',
  unlocked: false,
  vocabulary: [
    // Família
    {id:'u5v01',pt:'o pai / a mãe',de:'der Vater / die Mutter',cat:'família'},
    {id:'u5v02',pt:'o filho / a filha',de:'der Sohn / die Tochter',cat:'família'},
    {id:'u5v03',pt:'o irmão / a irmã',de:'der Bruder / die Schwester',cat:'família'},
    {id:'u5v04',pt:'o avô / a avó',de:'der Großvater / die Großmutter',cat:'família'},
    {id:'u5v05',pt:'o neto / a neta',de:'der Enkel / die Enkelin',cat:'família'},
    {id:'u5v06',pt:'o tio / a tia',de:'der Onkel / die Tante',cat:'família'},
    {id:'u5v07',pt:'o primo / a prima',de:'der Cousin / die Cousine',cat:'família'},
    {id:'u5v08',pt:'o marido / a mulher',de:'der Ehemann / die Ehefrau',cat:'família'},
    {id:'u5v09',pt:'o namorado / a namorada',de:'der Freund / die Freundin (romantisch)',cat:'família'},
    {id:'u5v10',pt:'o sogro / a sogra',de:'der Schwiegervater / die Schwiegermutter',cat:'família'},
    {id:'u5v11',pt:'o cunhado / a cunhada',de:'der Schwager / die Schwägerin',cat:'família'},
    {id:'u5v12',pt:'o sobrinho / a sobrinha',de:'der Neffe / die Nichte',cat:'família'},
    // Casa
    {id:'u5v13',pt:'a sala',de:'das Wohnzimmer',cat:'casa'},
    {id:'u5v14',pt:'o quarto',de:'das Schlafzimmer',cat:'casa'},
    {id:'u5v15',pt:'a casa de banho',de:'das Badezimmer',cat:'casa',expl:'casa de banho = Badezimmer (europäisches PT). In Brasilien: banheiro.'},
    {id:'u5v16',pt:'a cozinha',de:'die Küche',cat:'casa'},
    {id:'u5v17',pt:'a entrada / o hall',de:'der Eingang / die Eingangshalle',cat:'casa'},
    {id:'u5v18',pt:'a varanda',de:'der Balkon / die Veranda',cat:'casa'},
    {id:'u5v19',pt:'o jardim',de:'der Garten',cat:'casa'},
    {id:'u5v20',pt:'a garagem',de:'die Garage',cat:'casa'},
    // Mobília
    {id:'u5v21',pt:'o sofá',de:'das Sofa',cat:'mobília'},
    {id:'u5v22',pt:'a mesa',de:'der Tisch',cat:'mobília'},
    {id:'u5v23',pt:'a cadeira',de:'der Stuhl',cat:'mobília'},
    {id:'u5v24',pt:'a cama',de:'das Bett',cat:'mobília'},
    {id:'u5v25',pt:'o armário',de:'der Schrank',cat:'mobília'},
    {id:'u5v26',pt:'a estante',de:'das Regal',cat:'mobília'},
    {id:'u5v27',pt:'o frigorífico',de:'der Kühlschrank',cat:'mobília',expl:'frigorífico = Kühlschrank (europäisches PT). In Brasilien: geladeira.'},
    {id:'u5v28',pt:'o fogão',de:'der Herd',cat:'mobília'},
    {id:'u5v29',pt:'a banheira',de:'die Badewanne',cat:'mobília'},
    {id:'u5v30',pt:'o chuveiro',de:'die Dusche',cat:'mobília'},
    // Tipos de habitação
    {id:'u5v31',pt:'o apartamento',de:'die Wohnung',cat:'habitação'},
    {id:'u5v32',pt:'a moradia / a vivenda',de:'das Einfamilienhaus',cat:'habitação'},
    {id:'u5v33',pt:'o andar',de:'die Etage / das Stockwerk',cat:'habitação'},
    {id:'u5v34',pt:'o rés-do-chão',de:'das Erdgeschoss',cat:'habitação',expl:'rés-do-chão = Erdgeschoss. Im Europäischen PT sagt man auch: r/c.'},
    {id:'u5v35',pt:'o primeiro andar',de:'das erste Obergeschoss',cat:'habitação'},
  ],
  phrases: [
    {id:'u5p01',pt:'Onde moras?',de:'Wo wohnst du?'},
    {id:'u5p02',pt:'Moro num apartamento no Porto.',de:'Ich wohne in einer Wohnung in Porto.',expl:'num = em + um (Kontraktion). Moro NUM apartamento.'},
    {id:'u5p03',pt:'A minha casa tem três quartos.',de:'Mein Haus hat drei Schlafzimmer.'},
    {id:'u5p04',pt:'Tenho dois irmãos.',de:'Ich habe zwei Brüder.'},
    {id:'u5p05',pt:'A minha mãe é professora.',de:'Meine Mutter ist Lehrerin.'},
    {id:'u5p06',pt:'Vivo com os meus pais.',de:'Ich wohne bei meinen Eltern.',expl:'os meus pais = meine Eltern (Plural von pai). pais = Eltern (m.pl.).'},
    {id:'u5p07',pt:'O Pedro está a estudar.',de:'Pedro lernt gerade.',expl:'estar a + Infinitiv = gerade etwas tun (Verlaufsform).'},
  ],
  grammar: [
    {
      id:'u5g01', type:'rule',
      title:'Possessivpronomen',
      rule:'meu/minha, teu/tua, seu/sua, nosso/nossa, vosso/vossa, seu/sua',
      examples:['o meu livro (mein Buch)','a minha casa (mein Haus)','os meus amigos (meine Freunde)','as minhas amigas (meine Freundinnen)'],
      note:'Das Possessivpronomen richtet sich nach dem BESITZ, nicht nach dem Besitzer!'
    },
    {
      id:'u5g02', type:'rule',
      title:'Estar a + Infinitivo (Verlaufsform)',
      rule:'estar (konjugiert) + a + Infinitiv = gerade etwas tun',
      examples:['Estou a trabalhar. = Ich arbeite gerade.','Ela está a comer. = Sie isst gerade.','Estamos a estudar. = Wir lernen gerade.'],
      note:'Dies ist die europäisch-portugiesische Verlaufsform. Im Brasilianischen: estar + Gerundium (comendo).'
    },
    {
      id:'u5g03', type:'conjugation',
      title:'Verbo morar (Presente)',
      verb:'morar', tense:'presente',
      forms:{
        'eu':'moro','tu':'moras','ele/ela/você':'mora',
        'nós':'moramos','eles/elas/vocês':'moram'
      },
      note:'morar = wohnen. Regelmäßiges -ar Verb.'
    },
    {
      id:'u5g04', type:'rule',
      title:'Kontraktionen: em + artigo indefinido',
      rule:'em + um = num | em + uma = numa | em + uns = nuns | em + umas = numas',
      examples:['Moro num apartamento. (= em + um)','Trabalho numa escola. (= em + uma)'],
      note:'Auch diese Kontraktionen sind Pflicht!'
    },
    {id:'u5g05', type:'rule', title:'Ter de/que = müssen (Verpflichtung)',
      rule:'ter de + Infinitiv (EU-PT) / ter que + Infinitiv = müssen',
      examples:['Tenho de estudar. (Ich muss lernen.)','Tens de ir ao médico. (Du musst zum Arzt.)','Temos que sair às 8. (Wir müssen um 8 gehen.)'],
      note:'"Ter de" ist stärker als "dever" (sollen). EU-PT bevorzugt "ter de", aber "ter que" geht auch. Vergleich: dever = sollte, ter de = muss, precisar de = brauchen.'},
    {id:'u5g06', type:'rule', title:'Precisar de = brauchen / müssen',
      rule:'precisar de + Substantiv / Infinitiv = brauchen',
      examples:['Preciso de ajuda. (Ich brauche Hilfe.)','Preciso de ir ao banco. (Ich muss zur Bank.)','Precisas de descansar. (Du musst dich ausruhen.)'],
      note:'Achtung: IMMER mit "de"! Nicht vergessen: preciso DE.'},
    {id:'u5g07', type:'rule', title:'Verneinung: doppelte Negation',
      rule:'não...nada (nichts) | não...ninguém (niemand) | não...nunca (nie) | não...nenhum (kein)',
      examples:['Não tenho nada. (Ich habe nichts.)','Não vi ninguém. (Ich habe niemanden gesehen.)','Não vou nunca. (Ich gehe nie.)','Não tenho nenhum problema. (Ich habe kein Problem.)'],
      note:'Portugiesisch braucht IMMER doppelte Verneinung! "Tenho nada" ist falsch. Wie im Deutschen "kein...nicht": "Não tenho nada."'},
    {id:'u5g08', type:'rule', title:'A gente = wir (umgangssprachlich)',
      rule:'a gente + 3. Person Singular = wir (informell)',
      examples:['A gente vai ao cinema. (Wir gehen ins Kino.)','A gente fala português. (Wir sprechen Portugiesisch.)'],
      note:'Im gesprochenen EU-PT ist "a gente" oft häufiger als "nós"! ABER: nimmt die 3. Person Singular (vai, fala, come), nicht die 1. Person Plural.'},
    {id:'u5g09', type:'rule', title:'Präpositionale Pronomen: mim, ti, si',
      rule:'Nach Präpositionen: mim (mir) | ti (dir) | si (Ihnen) | com: comigo, contigo, consigo',
      examples:['Para mim. (Für mich.) — NICHT "para eu"!','É para ti. (Es ist für dich.)','Vem comigo! (Komm mit mir!)','Queres ir contigo. (= mit dir)'],
      note:'Nach Präpositionen NIEMALS "eu, tu"! Sondern "mim, ti". Die Formen mit "com" sind Sonderfälle: comigo, contigo, consigo, connosco.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 6 — Compra e Venda
// ─────────────────────────────────────────────
{
  id: 6,
  title: 'Compra e Venda',
  subtitle: 'Einkaufen, Preise, Kleidung',
  color: '#dc2626',
  unlocked: false,
  vocabulary: [
    // Lojas
    {id:'u6v01',pt:'a loja',de:'das Geschäft',cat:'comércio'},
    {id:'u6v02',pt:'o mercado',de:'der Markt',cat:'comércio'},
    {id:'u6v03',pt:'o supermercado',de:'der Supermarkt',cat:'comércio'},
    {id:'u6v04',pt:'a padaria',de:'die Bäckerei',cat:'comércio'},
    {id:'u6v05',pt:'o talho',de:'die Metzgerei',cat:'comércio',expl:'talho = Metzgerei (europäisches PT). In Brasilien: açougue.'},
    {id:'u6v06',pt:'a peixaria',de:'das Fischgeschäft',cat:'comércio'},
    {id:'u6v07',pt:'a farmácia',de:'die Apotheke',cat:'comércio'},
    {id:'u6v08',pt:'a livraria',de:'die Buchhandlung',cat:'comércio',expl:'livraria = Buchhandlung (NICHT Bibliothek!). Bibliothek = biblioteca.'},
    {id:'u6v09',pt:'a tabacaria',de:'der Tabak-/Zeitungskiosk',cat:'comércio'},
    // Roupa
    {id:'u6v10',pt:'a camisa',de:'das Hemd',cat:'roupa'},
    {id:'u6v11',pt:'a camisola',de:'der Pullover',cat:'roupa'},
    {id:'u6v12',pt:'as calças',de:'die Hose',cat:'roupa'},
    {id:'u6v13',pt:'a saia',de:'der Rock',cat:'roupa'},
    {id:'u6v14',pt:'o vestido',de:'das Kleid',cat:'roupa'},
    {id:'u6v15',pt:'o casaco',de:'der Mantel / die Jacke',cat:'roupa'},
    {id:'u6v16',pt:'os sapatos',de:'die Schuhe',cat:'roupa'},
    {id:'u6v17',pt:'as botas',de:'die Stiefel',cat:'roupa'},
    {id:'u6v18',pt:'as sandálias',de:'die Sandalen',cat:'roupa'},
    {id:'u6v19',pt:'as meias',de:'die Socken / Strümpfe',cat:'roupa'},
    {id:'u6v20',pt:'o cinto',de:'der Gürtel',cat:'roupa'},
    // Compras
    {id:'u6v21',pt:'o preço',de:'der Preis',cat:'compras'},
    {id:'u6v22',pt:'barato / barata',de:'billig / günstig',cat:'compras'},
    {id:'u6v23',pt:'caro / cara',de:'teuer',cat:'compras'},
    {id:'u6v24',pt:'o desconto',de:'der Rabatt',cat:'compras'},
    {id:'u6v25',pt:'pagar',de:'bezahlen',cat:'compras'},
    {id:'u6v26',pt:'comprar',de:'kaufen',cat:'compras'},
    {id:'u6v27',pt:'vender',de:'verkaufen',cat:'compras'},
    {id:'u6v28',pt:'o troco',de:'das Wechselgeld',cat:'compras'},
    {id:'u6v29',pt:'a conta',de:'die Rechnung / das Konto',cat:'compras'},
    {id:'u6v30',pt:'o recibo',de:'die Quittung',cat:'compras'},
    // Alimentação
    {id:'u6v31',pt:'o pão',de:'das Brot',cat:'alimentação'},
    {id:'u6v32',pt:'o leite',de:'die Milch',cat:'alimentação'},
    {id:'u6v33',pt:'o queijo',de:'der Käse',cat:'alimentação'},
    {id:'u6v34',pt:'a fruta',de:'das Obst',cat:'alimentação'},
    {id:'u6v35',pt:'os legumes',de:'das Gemüse',cat:'alimentação'},
    {id:'u6v36',pt:'a carne',de:'das Fleisch',cat:'alimentação'},
    {id:'u6v37',pt:'o peixe',de:'der Fisch',cat:'alimentação'},
    {id:'u6v38',pt:'os ovos',de:'die Eier',cat:'alimentação'},
    {id:'u6v39',pt:'o arroz',de:'der Reis',cat:'alimentação'},
    {id:'u6v40',pt:'a massa',de:'die Pasta / Nudeln',cat:'alimentação'},
    {id:'u6v41',pt:'o azeite',de:'das Olivenöl',cat:'alimentação'},
    {id:'u6v42',pt:'o vinho',de:'der Wein',cat:'alimentação'},
    {id:'u6v43',pt:'a água',de:'das Wasser',cat:'alimentação'},
    {id:'u6v44',pt:'o café',de:'der Kaffee',cat:'alimentação'},
  ],
  phrases: [
    {id:'u6p01',pt:'Faz favor, quanto custa isto?',de:'Entschuldigung, was kostet das?'},
    {id:'u6p02',pt:'Custa cinco euros.',de:'Es kostet fünf Euro.'},
    {id:'u6p03',pt:'É muito caro. Tem mais barato?',de:'Das ist sehr teuer. Haben Sie etwas Günstigeres?'},
    {id:'u6p04',pt:'Queria um quilo de tomates.',de:'Ich hätte gern ein Kilo Tomaten.',expl:'queria = ich hätte gern (Imperfekt von querer – höfliche Bitte).'},
    {id:'u6p05',pt:'Posso pagar com cartão?',de:'Kann ich mit Karte zahlen?'},
    {id:'u6p06',pt:'Qual é o seu número de calçado?',de:'Welche Schuhgröße haben Sie?'},
    {id:'u6p07',pt:'Tem este vestido noutra cor?',de:'Haben Sie dieses Kleid in einer anderen Farbe?',expl:'noutra = em + outra (Kontraktion).'},
    {id:'u6p08',pt:'Posso experimentar?',de:'Kann ich es anprobieren?'},
    {id:'u6p09',pt:'Fica bem.',de:'Es steht gut. / Es passt gut.',expl:'ficar bem = gut stehen / gut passen.'},
  ],
  grammar: [
    {
      id:'u6g01', type:'rule',
      title:'Pretérito Imperfeito — Höfliche Bitte',
      rule:'queria / podia / gostava = ich hätte gern / könnte ich / ich würde gerne',
      examples:['Queria um café. = Ich hätte gern einen Kaffee.','Podia me dizer...? = Könnten Sie mir sagen...?'],
      note:'Das Imperfekt wird im Portugiesischen oft für höfliche Bitten verwendet – höflicher als "quero".'
    },
    {
      id:'u6g02', type:'rule',
      title:'Demonstrativpronomen',
      rule:'este/esta (this, near me) | esse/essa (that, near you) | aquele/aquela (that over there)',
      examples:['Este livro é meu. = Dieses Buch hier ist meins.','Aquela casa é bonita. = Jenes Haus dort ist schön.'],
      note:'3 Entfernungsstufen – im Deutschen nur 2 (dieser/jener).'
    },
    {id:'u6g03', type:'rule', title:'Zahlen ab 100',
      rule:'cem (100 allein) | cento e... (101+) | 200-900 mit Geschlecht: duzentos/duzentas | mil (1000)',
      examples:['cem euros (100€)','cento e cinquenta (150)','duzentos gramas / duzentas pessoas (200 — Geschlecht!)','mil (1000) — KEIN Artikel!','dois mil e vinte e seis (2026)'],
      note:'"Cem" nur bei genau 100. Ab 101 = "cento e...". 200-900 ändern sich nach Geschlecht! mil hat keinen Plural.'},
    {id:'u6g04', type:'rule', title:'Ordinalzahlen: primeiro bis décimo',
      rule:'1. primeiro/a | 2. segundo/a | 3. terceiro/a | 4. quarto/a | 5. quinto/a | 6. sexto/a | 7. sétimo/a | 8. oitavo/a | 9. nono/a | 10. décimo/a',
      examples:['O primeiro andar. (Das erste Stockwerk.)','A terceira rua à direita. (Die dritte Straße rechts.)','É a primeira vez. (Es ist das erste Mal.)'],
      note:'Ordinalzahlen passen sich an Geschlecht an! Ab der 11. verwendet man im Alltag oft Kardinalzahlen: "o piso doze" statt "o décimo segundo piso".'},
    {id:'u6g05', type:'rule', title:'Verkleinerungsformen (-inho/-inha)',
      rule:'Substantiv/Adjektiv + -inho/-inha = kleiner, niedlich, abmildernd',
      examples:['Um momentinho. (Einen kleinen Moment.)','Um bocadinho. (Ein kleines Bisschen.)','Está pertinho. (Ist ganz nah.)','Um cafezinho. (Ein Kaffeechen.)','Obrigadinho! (Dankeschön!)'],
      note:'Verkleinerungen drücken Zuneigung, Höflichkeit oder Abschwächung aus. SEHR häufig im EU-PT! "Um momentinho" klingt viel freundlicher als "um momento".'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 7 — Localização de Objectos e Pessoas
// ─────────────────────────────────────────────
{
  id: 7,
  title: 'Localização de Objectos e Pessoas',
  subtitle: 'Orientierung, Orte, Wegbeschreibung',
  color: '#0891b2',
  unlocked: false,
  vocabulary: [
    // Preposições de lugar
    {id:'u7v01',pt:'ao lado de',de:'neben',cat:'localização'},
    {id:'u7v02',pt:'em frente de',de:'gegenüber / vor',cat:'localização'},
    {id:'u7v03',pt:'atrás de',de:'hinter',cat:'localização'},
    {id:'u7v04',pt:'à esquerda de',de:'links von',cat:'localização'},
    {id:'u7v05',pt:'à direita de',de:'rechts von',cat:'localização'},
    {id:'u7v06',pt:'entre',de:'zwischen',cat:'localização'},
    {id:'u7v07',pt:'perto de',de:'in der Nähe von',cat:'localização'},
    {id:'u7v08',pt:'longe de',de:'weit von',cat:'localização'},
    {id:'u7v09',pt:'em cima de',de:'auf / oben auf',cat:'localização'},
    {id:'u7v10',pt:'em baixo de',de:'unter',cat:'localização'},
    {id:'u7v11',pt:'dentro de',de:'innerhalb / in',cat:'localização'},
    {id:'u7v12',pt:'fora de',de:'außerhalb / draußen',cat:'localização'},
    {id:'u7v13',pt:'ao fundo de',de:'am Ende von',cat:'localização'},
    {id:'u7v14',pt:'no canto de',de:'in der Ecke von',cat:'localização'},
    // Lugares na cidade
    {id:'u7v15',pt:'o banco',de:'die Bank',cat:'lugares'},
    {id:'u7v16',pt:'os correios',de:'die Post',cat:'lugares',expl:'os correios = die Post (immer Plural).'},
    {id:'u7v17',pt:'o hospital',de:'das Krankenhaus',cat:'lugares'},
    {id:'u7v18',pt:'a escola',de:'die Schule',cat:'lugares'},
    {id:'u7v19',pt:'a universidade',de:'die Universität',cat:'lugares'},
    {id:'u7v20',pt:'o museu',de:'das Museum',cat:'lugares'},
    {id:'u7v21',pt:'o teatro',de:'das Theater',cat:'lugares'},
    {id:'u7v22',pt:'o cinema',de:'das Kino',cat:'lugares'},
    {id:'u7v23',pt:'a biblioteca',de:'die Bibliothek',cat:'lugares'},
    {id:'u7v24',pt:'o hotel',de:'das Hotel',cat:'lugares'},
    {id:'u7v25',pt:'a estação de comboios',de:'der Bahnhof',cat:'lugares',expl:'comboio = Zug (europäisches PT). In Brasilien: trem.'},
    {id:'u7v26',pt:'o aeroporto',de:'der Flughafen',cat:'lugares'},
    {id:'u7v27',pt:'a paragem do autocarro',de:'die Bushaltestelle',cat:'lugares'},
    {id:'u7v28',pt:'a estação de metro',de:'die U-Bahn-Station',cat:'lugares'},
    {id:'u7v29',pt:'a rua',de:'die Straße',cat:'lugares'},
    {id:'u7v30',pt:'a praça',de:'der Platz / Marktplatz',cat:'lugares'},
    {id:'u7v31',pt:'a avenida',de:'die Allee / Avenue',cat:'lugares'},
    {id:'u7v32',pt:'a esquina',de:'die Ecke (Straßenecke)',cat:'lugares'},
    {id:'u7v33',pt:'a ponte',de:'die Brücke',cat:'lugares'},
    {id:'u7v34',pt:'o jardim',de:'der Park / Garten',cat:'lugares'},
    {id:'u7v35',pt:'o semáforo',de:'die Ampel',cat:'lugares'},
  ],
  phrases: [
    {id:'u7p01',pt:'Desculpe, onde é o banco?',de:'Entschuldigung, wo ist die Bank?'},
    {id:'u7p02',pt:'Siga sempre em frente.',de:'Gehen Sie immer geradeaus.',expl:'siga = gehen Sie (Imperativ von seguir).'},
    {id:'u7p03',pt:'Vire à esquerda / à direita.',de:'Biegen Sie links / rechts ab.',expl:'vire = biegen Sie ab (Imperativ von virar).'},
    {id:'u7p04',pt:'É aqui perto?',de:'Ist es hier in der Nähe?'},
    {id:'u7p05',pt:'Não é longe. São cinco minutos a pé.',de:'Es ist nicht weit. Fünf Minuten zu Fuß.'},
    {id:'u7p06',pt:'Como é que se vai para o aeroporto?',de:'Wie kommt man zum Flughafen?'},
    {id:'u7p07',pt:'Pode apanhar o metro na Baixa.',de:'Sie können in der Baixa die U-Bahn nehmen.'},
    {id:'u7p08',pt:'O museu fica ao lado do teatro.',de:'Das Museum befindet sich neben dem Theater.',expl:'ficar = sich befinden (bei Orten). O museu fica... = Das Museum liegt...'},
  ],
  grammar: [
    {
      id:'u7g01', type:'rule',
      title:'Kontraktionen: a + artigo definido',
      rule:'a + o = ao | a + a = à | a + os = aos | a + as = às',
      examples:['Vou ao supermercado. (= a + o)','Viro à esquerda. (= a + a)','Vamos aos correios. (= a + os)'],
      note:'à (mit Gravis) ist weiblich, ao ist männlich.'
    },
    {
      id:'u7g02', type:'conjugation',
      title:'Verbo ficar (Presente)',
      verb:'ficar', tense:'presente',
      forms:{
        'eu':'fico','tu':'ficas','ele/ela/você':'fica',
        'nós':'ficamos','eles/elas/vocês':'ficam'
      },
      note:'ficar = sich befinden (Ort) / bleiben / werden.'
    },
    {id:'u7g03', type:'rule', title:'Ficar — das Multitalent (6 Bedeutungen!)',
      rule:'1) sich befinden | 2) bleiben | 3) werden | 4) behalten | 5) stehen (Kleidung) | 6) verabreden',
      examples:['A farmácia fica ali. (befindet sich dort)','Fico em casa hoje. (Ich bleibe zuhause.)','Fiquei contente! (Ich wurde froh!)','Fico com este. (Ich nehme/behalte diesen.)','Fica-te bem! (Steht dir gut!)','Ficamos às 9? (Machen wir 9 Uhr aus?)'],
      note:'Ficar ist eines der wichtigsten Verben im EU-PT! Es ist das "dritte sein" neben ser und estar. ser = dauerhaft, estar = temporär, ficar = Veränderung/Ort.'},
    {id:'u7g04', type:'rule', title:'Zeitliche Konnektoren',
      rule:'antes de + Inf. (bevor) | depois de + Inf. (nachdem) | enquanto (während)',
      examples:['Antes de sair, fechei a porta. (Bevor ich ging, schloss ich die Tür.)','Depois de jantar, vejo televisão. (Nach dem Abendessen schaue ich fern.)','Enquanto espero, leio o livro. (Während ich warte, lese ich.)'],
      note:'Diese Konnektoren sind essentiell für Erzählungen! "Antes de" und "depois de" + Infinitiv — einfach und häufig.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 8 — Desporto e Tempos Livres
// ─────────────────────────────────────────────
{
  id: 8,
  title: 'Desporto e Tempos Livres',
  subtitle: 'Sport, Freizeit, Vorlieben',
  color: '#7c3aed',
  unlocked: false,
  vocabulary: [
    {id:'u8v01',pt:'o futebol',de:'Fußball',cat:'desporto'},
    {id:'u8v02',pt:'o ténis',de:'Tennis',cat:'desporto'},
    {id:'u8v03',pt:'a natação',de:'Schwimmen',cat:'desporto'},
    {id:'u8v04',pt:'o ciclismo',de:'Radfahren',cat:'desporto'},
    {id:'u8v05',pt:'o atletismo',de:'Leichtathletik',cat:'desporto'},
    {id:'u8v06',pt:'o surf',de:'Surfen',cat:'desporto'},
    {id:'u8v07',pt:'o esqui',de:'Skifahren',cat:'desporto'},
    {id:'u8v08',pt:'o basquetebol',de:'Basketball',cat:'desporto'},
    {id:'u8v09',pt:'o voleibol',de:'Volleyball',cat:'desporto'},
    {id:'u8v10',pt:'jogar',de:'spielen',cat:'actividades'},
    {id:'u8v11',pt:'praticar',de:'betreiben / praktizieren',cat:'actividades'},
    {id:'u8v12',pt:'nadar',de:'schwimmen',cat:'actividades'},
    {id:'u8v13',pt:'correr',de:'laufen / rennen',cat:'actividades'},
    {id:'u8v14',pt:'andar de bicicleta',de:'Fahrrad fahren',cat:'actividades'},
    {id:'u8v15',pt:'viajar',de:'reisen',cat:'actividades'},
    {id:'u8v16',pt:'fotografar',de:'fotografieren',cat:'actividades'},
    {id:'u8v17',pt:'cozinhar',de:'kochen',cat:'actividades'},
    {id:'u8v18',pt:'dançar',de:'tanzen',cat:'actividades'},
    {id:'u8v19',pt:'pintar',de:'malen',cat:'actividades'},
    {id:'u8v20',pt:'cantar',de:'singen',cat:'actividades'},
    {id:'u8v21',pt:'gostar de',de:'mögen / gerne tun',cat:'preferências',expl:'gostar de + Infinitiv: Gosto de nadar = Ich schwimme gerne.'},
    {id:'u8v22',pt:'adorar',de:'lieben / sehr mögen',cat:'preferências'},
    {id:'u8v23',pt:'preferir',de:'vorziehen / lieber mögen',cat:'preferências'},
    {id:'u8v24',pt:'não gostar de',de:'nicht mögen',cat:'preferências'},
    {id:'u8v25',pt:'detestar / odiar',de:'hassen / verabscheuen',cat:'preferências'},
    {id:'u8v26',pt:'a praia',de:'der Strand',cat:'lugares lazer'},
    {id:'u8v27',pt:'o campo',de:'das Land / Feld',cat:'lugares lazer'},
    {id:'u8v28',pt:'a montanha',de:'der Berg',cat:'lugares lazer'},
    {id:'u8v29',pt:'o ginásio',de:'das Fitnessstudio',cat:'lugares lazer'},
    {id:'u8v30',pt:'o estádio',de:'das Stadion',cat:'lugares lazer'},
    {id:'u8v31',pt:'o concerto',de:'das Konzert',cat:'lazer'},
    {id:'u8v32',pt:'a exposição',de:'die Ausstellung',cat:'lazer'},
    {id:'u8v33',pt:'o espectáculo',de:'die Vorstellung / das Spektakel',cat:'lazer'},
  ],
  phrases: [
    {id:'u8p01',pt:'Gostas de desporto?',de:'Machst du gerne Sport?'},
    {id:'u8p02',pt:'Gosto muito de futebol.',de:'Ich mag Fußball sehr.'},
    {id:'u8p03',pt:'Não gosto nada de ténis.',de:'Ich mag Tennis überhaupt nicht.',expl:'nada = gar nichts. Não gosto nada = ich mag überhaupt nicht.'},
    {id:'u8p04',pt:'Prefiro nadar a correr.',de:'Ich schwimme lieber als laufen.',expl:'preferir A a B = A lieber mögen als B.'},
    {id:'u8p05',pt:'O que costumas fazer ao fim-de-semana?',de:'Was machst du normalerweise am Wochenende?',expl:'costumar + Infinitiv = gewohnt sein zu / normalerweise tun.'},
    {id:'u8p06',pt:'Vou ao cinema com os meus amigos.',de:'Ich gehe mit meinen Freunden ins Kino.'},
    {id:'u8p07',pt:'No próximo fim-de-semana vou à praia.',de:'Am nächsten Wochenende gehe ich an den Strand.',expl:'ir + a + Ort = an einen Ort gehen. Ir à praia = an den Strand gehen.'},
  ],
  grammar: [
    {
      id:'u8g01', type:'rule',
      title:'gostar de + Infinitivo',
      rule:'gostar de + Infinitiv = etwas gerne tun',
      examples:['Gosto de ler. = Ich lese gerne.','Ela gosta de dançar. = Sie tanzt gerne.','Não gosto de acordar cedo. = Ich mag es nicht, früh aufzustehen.'],
      note:'gostar de + INFINITIV (nicht: gostar + Infinitiv).'
    },
    {
      id:'u8g02', type:'rule',
      title:'ir + Infinitivo (Zukunft)',
      rule:'ir (konjugiert) + Infinitiv = wird etwas tun (nahe Zukunft)',
      examples:['Vou estudar amanhã. = Ich werde morgen lernen.','Ela vai sair mais tarde. = Sie wird später ausgehen.','Vamos jantar fora. = Wir werden draußen essen.'],
      note:'Dies ist die häufigste Zukunftsform im gesprochenen Portugiesisch!'
    },
    {
      id:'u8g03', type:'conjugation',
      title:'Verbo preferir (Presente)',
      verb:'preferir', tense:'presente',
      forms:{
        'eu':'prefiro','tu':'preferes','ele/ela/você':'prefere',
        'nós':'preferimos','eles/elas/vocês':'preferem'
      },
      note:'preferir = vorziehen / lieber mögen. Vokalwechsel e→i in eu-Form.'
    },
    {
      id:'u8g04', type:'conjugation',
      title:'Verbo gostar (Presente)',
      verb:'gostar', tense:'presente',
      forms:{
        'eu':'gosto','tu':'gostas','ele/ela/você':'gosta',
        'nós':'gostamos','eles/elas/vocês':'gostam'
      },
      note:'gostar = mögen / gerne haben. IMMER mit "de": gostar DE algo.'
    },
    {id:'u8g05', type:'rule', title:'Vergleichen: mais/menos...do que',
      rule:'mais + Adj. + do que = mehr als | menos + Adj. + do que = weniger als | tão...como = so...wie',
      examples:['Lisboa é mais bonita do que o Porto? (Ist Lissabon schöner als Porto?)','O metro é menos caro do que o táxi. (Die U-Bahn ist billiger als das Taxi.)','Ele é tão alto como eu. (Er ist so groß wie ich.)'],
      note:'Im Alltag oft ohne "do": "mais bonita que". Irreguläre Formen: bom→melhor (besser), mau→pior (schlechter), grande→maior (größer), pequeno→menor (kleiner).'},
    {id:'u8g06', type:'rule', title:'Verb + Präposition + Infinitiv',
      rule:'começar a (anfangen) | acabar de (gerade getan) | deixar de (aufhören) | continuar a (weitermachen)',
      examples:['Comecei a estudar português. (Ich habe angefangen, PT zu lernen.)','Acabei de chegar. (Ich bin gerade angekommen.)','Deixei de fumar. (Ich habe aufgehört zu rauchen.)','Continuo a aprender. (Ich lerne weiter.)'],
      note:'Diese Konstruktionen sind SUPER häufig! "Acabar de" = gerade eben (Ersatz für komplizierte Vergangenheitsformen). ACHTUNG: começar A, acabar DE — die Präposition ist wichtig!'},
    {id:'u8g07', type:'rule', title:'Wichtige Verb-Präposition-Paare',
      rule:'pensar em (denken an) | acreditar em (glauben an) | esperar por (warten auf) | olhar para (schauen auf) | lembrar-se de (sich erinnern an) | esquecer-se de (vergessen)',
      examples:['Penso em ti. (Ich denke an dich.)','Estou à espera. (Ich warte. — Achtung: à espera!)','Lembro-me de tudo. (Ich erinnere mich an alles.)','Esqueci-me do nome. (Ich habe den Namen vergessen.)'],
      note:'Portugiesische Verben brauchen oft ANDERE Präpositionen als im Deutschen! Diese Paare auswendig lernen — sie kommen ständig vor.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 9 — Saúde e Corpo
// ─────────────────────────────────────────────
{
  id: 9,
  title: 'Saúde e Corpo',
  subtitle: 'Körper, Gesundheit, Arzt',
  color: '#059669',
  unlocked: false,
  vocabulary: [
    // Corpo
    {id:'u9v01',pt:'a cabeça',de:'der Kopf',cat:'corpo'},
    {id:'u9v02',pt:'a cara / o rosto',de:'das Gesicht',cat:'corpo'},
    {id:'u9v03',pt:'os olhos',de:'die Augen',cat:'corpo'},
    {id:'u9v04',pt:'o nariz',de:'die Nase',cat:'corpo'},
    {id:'u9v05',pt:'a boca',de:'der Mund',cat:'corpo'},
    {id:'u9v06',pt:'os dentes',de:'die Zähne',cat:'corpo'},
    {id:'u9v07',pt:'o ouvido',de:'das Ohr (innen)',cat:'corpo',expl:'o ouvido = Ohr (innen, für Hören). a orelha = Ohr (außen, sichtbarer Teil).'},
    {id:'u9v08',pt:'a orelha',de:'das Ohr (außen)',cat:'corpo'},
    {id:'u9v09',pt:'o pescoço',de:'der Hals / Nacken',cat:'corpo'},
    {id:'u9v10',pt:'o ombro',de:'die Schulter',cat:'corpo'},
    {id:'u9v11',pt:'o braço',de:'der Arm',cat:'corpo'},
    {id:'u9v12',pt:'o cotovelo',de:'der Ellenbogen',cat:'corpo'},
    {id:'u9v13',pt:'o pulso',de:'das Handgelenk',cat:'corpo'},
    {id:'u9v14',pt:'a mão',de:'die Hand',cat:'corpo'},
    {id:'u9v15',pt:'o dedo',de:'der Finger',cat:'corpo'},
    {id:'u9v16',pt:'o peito',de:'die Brust',cat:'corpo'},
    {id:'u9v17',pt:'a barriga',de:'der Bauch',cat:'corpo'},
    {id:'u9v18',pt:'as costas',de:'der Rücken',cat:'corpo'},
    {id:'u9v19',pt:'a perna',de:'das Bein',cat:'corpo'},
    {id:'u9v20',pt:'o joelho',de:'das Knie',cat:'corpo'},
    {id:'u9v21',pt:'o tornozelo',de:'der Knöchel',cat:'corpo'},
    {id:'u9v22',pt:'o pé',de:'der Fuß',cat:'corpo'},
    // Saúde
    {id:'u9v23',pt:'a dor de cabeça',de:'Kopfschmerzen',cat:'saúde'},
    {id:'u9v24',pt:'a dor de barriga',de:'Bauchschmerzen',cat:'saúde'},
    {id:'u9v25',pt:'a dor de costas',de:'Rückenschmerzen',cat:'saúde'},
    {id:'u9v26',pt:'a febre',de:'das Fieber',cat:'saúde'},
    {id:'u9v27',pt:'a constipação',de:'die Erkältung',cat:'saúde',expl:'constipação = Erkältung (europäisches PT). In Brasilien: resfriado. ACHTUNG: constipação ≠ Verstopfung!'},
    {id:'u9v28',pt:'a gripe',de:'die Grippe',cat:'saúde'},
    {id:'u9v29',pt:'a tosse',de:'der Husten',cat:'saúde'},
    {id:'u9v30',pt:'a alergia',de:'die Allergie',cat:'saúde'},
    {id:'u9v31',pt:'o medicamento / o remédio',de:'das Medikament',cat:'saúde'},
    {id:'u9v32',pt:'o comprimido',de:'die Tablette',cat:'saúde'},
    {id:'u9v33',pt:'o xarope',de:'der Sirup',cat:'saúde'},
    {id:'u9v34',pt:'a receita',de:'das Rezept',cat:'saúde'},
    {id:'u9v35',pt:'a consulta',de:'die Arztpraxis / Konsultation',cat:'saúde'},
    {id:'u9v36',pt:'o médico de família',de:'der Hausarzt',cat:'saúde'},
  ],
  phrases: [
    {id:'u9p01',pt:'Não me sinto bem.',de:'Ich fühle mich nicht gut.',expl:'sentir-se = sich fühlen. Não me sinto bem = Ich fühle mich nicht wohl.'},
    {id:'u9p02',pt:'Tenho dores de cabeça.',de:'Ich habe Kopfschmerzen.',expl:'ter dores de... = Schmerzen haben an...'},
    {id:'u9p03',pt:'Tenho febre.',de:'Ich habe Fieber.'},
    {id:'u9p04',pt:'Estou constipado/constipada.',de:'Ich bin erkältet.',expl:'constipado/a = erkältet (europäisches PT).'},
    {id:'u9p05',pt:'Dói-me a cabeça.',de:'Mir tut der Kopf weh.',expl:'doer = wehtun. Dói-me... = Mir tut ... weh. (Wie "gefallen" funktioniert).'},
    {id:'u9p06',pt:'Preciso de ir ao médico.',de:'Ich muss zum Arzt gehen.'},
    {id:'u9p07',pt:'Quero marcar uma consulta.',de:'Ich möchte einen Termin vereinbaren.',expl:'marcar uma consulta = einen Arzttermin machen.'},
    {id:'u9p08',pt:'Tome este comprimido três vezes por dia.',de:'Nehmen Sie diese Tablette dreimal täglich.'},
  ],
  grammar: [
    {
      id:'u9g01', type:'rule',
      title:'Estar com + Substantiv',
      rule:'estar com + Nomen = etwas haben (Beschwerden)',
      examples:['Estou com febre. = Ich habe Fieber.','Estou com dores. = Ich habe Schmerzen.','Estou com fome. = Ich habe Hunger.','Estou com sede. = Ich habe Durst.'],
      note:'estar com ist eine sehr häufige Konstruktion für körperliche Zustände.'
    },
    {
      id:'u9g02', type:'rule',
      title:'Dever + Infinitivo',
      rule:'dever + Infinitiv = sollen / müssen',
      examples:['Deve tomar antibióticos. = Er/Sie soll Antibiotika nehmen.','Não deve comer gordura. = Er/Sie soll kein Fett essen.'],
      note:'dever = sollen/müssen (schwächer als ter de). Também usado para moralische Verpflichtung.'
    },
    {id:'u9g03', type:'rule', title:'Imperativ (Befehle & Anweisungen)',
      rule:'tu-Form = 3. Pers. Präsens | você-Form = Konjunktiv | Neg: não + Konjunktiv',
      examples:['Espera! (Warte! — tu)','Fala mais devagar. (Sprich langsamer. — tu)','Venha cá. (Kommen Sie her. — você)','Não faças isso! (Mach das nicht! — tu, neg.)','Diga-me. (Sagen Sie mir. — você)'],
      note:'Für den Alltag: tu-Imperativ = 3. Person Präsens (ele fala → fala!). Die häufigsten: Olha!, Espera!, Diz-me!, Vai!, Vem!'},
    {id:'u9g04', type:'rule', title:'Direkte Objektpronomen: o/a/os/as',
      rule:'me (mich) | te (dich) | o/a (ihn/sie/es) | nos (uns) | os/as (sie)',
      examples:['Eu vejo-o. (Ich sehe ihn.)','Ela comprou-as. (Sie hat sie gekauft.)','Não o conheço. (Ich kenne ihn nicht. — VOR dem Verb bei Verneinung!)','Quem te disse? (Wer hat dir/dich gesagt? — VOR bei Fragewort!)'],
      note:'Im EU-PT stehen Pronomen NACH dem Verb (Eu vejo-o). ABER: bei Verneinung, Fragewörtern, bestimmten Adverbien (já, também, ainda) → VOR dem Verb! Das ist eine der schwierigsten Regeln.'},
    {id:'u9g05', type:'rule', title:'Indirekte Objektpronomen: lhe/lhes',
      rule:'me (mir) | te (dir) | lhe (ihm/ihr/Ihnen) | nos (uns) | lhes (ihnen)',
      examples:['Eu disse-lhe a verdade. (Ich habe ihm/ihr die Wahrheit gesagt.)','Ele deu-me um presente. (Er hat mir ein Geschenk gegeben.)','Vou telefonar-lhe. (Ich werde ihn/sie anrufen.)'],
      note:'lhe = ihm/ihr/Ihnen — gleiche Form! Kontext verrät, wer gemeint ist.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 10 — Serviços de Utilidade Pública
// ─────────────────────────────────────────────
{
  id: 10,
  title: 'Serviços de Utilidade Pública',
  subtitle: 'Behörden, Ämter, Dienstleistungen',
  color: '#9333ea',
  unlocked: false,
  vocabulary: [
    {id:'u10v01',pt:'o banco',de:'die Bank',cat:'serviços'},
    {id:'u10v02',pt:'os correios / CTT',de:'die Post',cat:'serviços'},
    {id:'u10v03',pt:'a junta de freguesia',de:'die Gemeindeverwaltung',cat:'serviços'},
    {id:'u10v04',pt:'a embaixada',de:'die Botschaft',cat:'serviços'},
    {id:'u10v05',pt:'a câmara municipal',de:'das Rathaus',cat:'serviços'},
    {id:'u10v06',pt:'a conta bancária',de:'das Bankkonto',cat:'serviços'},
    {id:'u10v07',pt:'levantar dinheiro',de:'Geld abheben',cat:'banco'},
    {id:'u10v08',pt:'depositar dinheiro',de:'Geld einzahlen',cat:'banco'},
    {id:'u10v09',pt:'transferir dinheiro',de:'Geld überweisen',cat:'banco'},
    {id:'u10v10',pt:'o caixa automático / MB',de:'der Geldautomat',cat:'banco',expl:'MB (Multibanco) ist das portugiesische Bankautomaten-Netz.'},
    {id:'u10v11',pt:'enviar uma carta',de:'einen Brief schicken',cat:'correios'},
    {id:'u10v12',pt:'enviar uma encomenda',de:'ein Paket schicken',cat:'correios'},
    {id:'u10v13',pt:'o selo',de:'die Briefmarke',cat:'correios'},
    {id:'u10v14',pt:'o formulário',de:'das Formular',cat:'serviços'},
    {id:'u10v15',pt:'preencher um formulário',de:'ein Formular ausfüllen',cat:'serviços'},
    {id:'u10v16',pt:'o número de contribuinte / NIF',de:'die Steuernummer',cat:'serviços',expl:'NIF = Número de Identificação Fiscal. Wird in Portugal für fast alles benötigt.'},
    {id:'u10v17',pt:'o bilhete de identidade',de:'der Personalausweis',cat:'serviços'},
    {id:'u10v18',pt:'o passaporte',de:'der Reisepass',cat:'serviços'},
  ],
  phrases: [
    {id:'u10p01',pt:'Queria abrir uma conta bancária.',de:'Ich möchte ein Bankkonto eröffnen.',expl:'queria = ich möchte (höfliche Form).'},
    {id:'u10p02',pt:'Podia preencher este formulário?',de:'Könnten Sie dieses Formular ausfüllen?'},
    {id:'u10p03',pt:'Qual é o prazo de entrega?',de:'Was ist die Lieferfrist?'},
    {id:'u10p04',pt:'Onde posso levantar dinheiro?',de:'Wo kann ich Geld abheben?'},
    {id:'u10p05',pt:'Preciso de renovar o passaporte.',de:'Ich muss meinen Reisepass erneuern.'},
  ],
  grammar: [
    {
      id:'u10g01', type:'conjugation',
      title:'Verbos -AR: Pretérito Imperfeito',
      verb:'falar', tense:'imperfeito',
      forms:{
        'eu':'falava','tu':'falavas','ele/ela/você':'falava',
        'nós':'falávamos','eles/elas/vocês':'falavam'
      },
      note:'Imperfeito = Vergangenheitsform für wiederholte/gewohnheitsmäßige Handlungen (wie "used to").'
    },
    {
      id:'u10g02', type:'conjugation',
      title:'Verbos -ER/-IR: Pretérito Imperfeito',
      verb:'comer', tense:'imperfeito',
      forms:{
        'eu':'comia','tu':'comias','ele/ela/você':'comia',
        'nós':'comíamos','eles/elas/vocês':'comiam'
      },
      note:'-er und -ir Verben haben im Imperfeito dieselben Endungen: -ia, -ias, -ia, -íamos, -iam.'
    },
    {
      id:'u10g03', type:'conjugation',
      title:'Verbos ser/ir: Pretérito Imperfeito (unregelmäßig)',
      verb:'ser', tense:'imperfeito',
      forms:{
        'eu':'era','tu':'eras','ele/ela/você':'era',
        'nós':'éramos','eles/elas/vocês':'eram'
      },
      note:'ser und ir haben DIESELBEN Imperfeito-Formen: era, eras, era... Nur aus dem Kontext erkennbar.'
    },
    {id:'u10g04', type:'rule', title:'Konditional (höfliche Bitten)',
      rule:'Infinitiv + -ia/-ias/-ia/-íamos/-iam = würde/könnte/möchte',
      examples:['Gostaria de um café. (Ich hätte gerne einen Kaffee.)','Poderia ajudar-me? (Könnten Sie mir helfen?)','Seria possível? (Wäre es möglich?)','Diria que sim. (Ich würde ja sagen.)'],
      note:'Der Konditional wird aus dem Infinitiv gebildet + -ia. Für höfliche Bitten ist er eleganter als "queria" (Imperfeito). Im Alltag benutzen viele Portugiesen aber weiterhin das Imperfeito.'},
    {id:'u10g05', type:'rule', title:'Superlativ: o mais / -íssimo',
      rule:'o/a mais + Adj. + de = der/die -ste | Adj. + -íssimo = sehr/extrem',
      examples:['Ela é a mais inteligente da turma. (Sie ist die Klügste der Klasse.)','Lisboa é lindíssima! (Lissabon ist wunderschön!)','Muitíssimo obrigado! (Vielen vielen Dank!)','É o melhor restaurante da cidade. (Das beste Restaurant der Stadt.)'],
      note:'-íssimo/-íssima ist SUPER häufig im EU-PT für Begeisterung! "Boníssimo!", "Riquíssimo!". Irreguläre: bom→ótimo, mau→péssimo, grande→máximo, pequeno→mínimo.'},
    {id:'u10g06', type:'rule', title:'Partizip als Adjektiv',
      rule:'estar + Partizip = Zustandsbeschreibung | Irreguläre: aberto, feito, dito, escrito, posto, visto',
      examples:['A porta está aberta. (Die Tür ist offen.)','O trabalho está feito. (Die Arbeit ist erledigt.)','Estou cansado. (Ich bin müde.)','O livro está escrito em português. (Das Buch ist auf PT geschrieben.)'],
      note:'Viele Partizipien sind irregulär! Die wichtigsten: abrir→aberto, fazer→feito, dizer→dito, escrever→escrito, pôr→posto, ver→visto.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 11 — Relatar Acontecimentos Pontuais
// ─────────────────────────────────────────────
{
  id: 11,
  title: 'Relatar Acontecimentos Pontuais no Passado',
  subtitle: 'Perfekt, abgeschlossene Handlungen',
  color: '#b45309',
  unlocked: false,
  vocabulary: [
    {id:'u11v01',pt:'ontem',de:'gestern',cat:'tempo'},
    {id:'u11v02',pt:'anteontem',de:'vorgestern',cat:'tempo'},
    {id:'u11v03',pt:'há dois dias',de:'vor zwei Tagen',cat:'tempo'},
    {id:'u11v04',pt:'na semana passada',de:'letzte Woche',cat:'tempo'},
    {id:'u11v05',pt:'no mês passado',de:'letzten Monat',cat:'tempo'},
    {id:'u11v06',pt:'no ano passado',de:'letztes Jahr',cat:'tempo'},
    {id:'u11v07',pt:'de manhã',de:'morgens / am Morgen',cat:'tempo'},
    {id:'u11v08',pt:'à tarde',de:'nachmittags / am Nachmittag',cat:'tempo'},
    {id:'u11v09',pt:'à noite',de:'abends / am Abend',cat:'tempo'},
    {id:'u11v10',pt:'de repente',de:'plötzlich',cat:'expressões'},
    {id:'u11v11',pt:'depois',de:'danach / nachher',cat:'expressões'},
    {id:'u11v12',pt:'antes',de:'vorher / davor',cat:'expressões'},
    {id:'u11v13',pt:'finalmente',de:'schließlich / endlich',cat:'expressões'},
    {id:'u11v14',pt:'primeiro',de:'zuerst / erstens',cat:'expressões'},
    {id:'u11v15',pt:'em seguida',de:'dann / danach',cat:'expressões'},
  ],
  phrases: [
    {id:'u11p01',pt:'O que fizeste ontem?',de:'Was hast du gestern gemacht?'},
    {id:'u11p02',pt:'Fui ao cinema com a Maria.',de:'Ich bin mit Maria ins Kino gegangen.',expl:'fui = ich ging (Perfekt von ir/ser). Kontext: ir.'},
    {id:'u11p03',pt:'Cheguei a casa às onze horas.',de:'Ich kam um elf Uhr nach Hause.'},
    {id:'u11p04',pt:'Comi uma bifana ao almoço.',de:'Ich aß eine Bifana zum Mittagessen.',expl:'bifana = typisch portugiesisches Schweinefleisch-Sandwich.'},
    {id:'u11p05',pt:'Ontem não estudei nada.',de:'Gestern habe ich gar nichts gelernt.'},
    {id:'u11p06',pt:'A semana passada fui a Lisboa.',de:'Letzte Woche bin ich nach Lissabon gefahren.'},
  ],
  grammar: [
    {
      id:'u11g01', type:'conjugation',
      title:'Pretérito Perfeito Simples: -AR',
      verb:'falar', tense:'perfeito',
      forms:{
        'eu':'falei','tu':'falaste','ele/ela/você':'falou',
        'nós':'falámos','eles/elas/vocês':'falaram'
      },
      note:'Perfekt für abgeschlossene Handlungen in der Vergangenheit. -AR Endungen: -ei, -aste, -ou, -ámos, -aram.'
    },
    {
      id:'u11g02', type:'conjugation',
      title:'Pretérito Perfeito Simples: -ER',
      verb:'comer', tense:'perfeito',
      forms:{
        'eu':'comi','tu':'comeste','ele/ela/você':'comeu',
        'nós':'comemos','eles/elas/vocês':'comeram'
      },
      note:'-ER Perfekt-Endungen: -i, -este, -eu, -emos, -eram.'
    },
    {
      id:'u11g03', type:'conjugation',
      title:'Pretérito Perfeito Simples: -IR',
      verb:'partir', tense:'perfeito',
      forms:{
        'eu':'parti','tu':'partiste','ele/ela/você':'partiu',
        'nós':'partimos','eles/elas/vocês':'partiram'
      },
      note:'-IR Perfekt-Endungen: -i, -iste, -iu, -imos, -iram.'
    },
    {
      id:'u11g04', type:'conjugation',
      title:'Perfeito unregelmäßig: ser/ir',
      verb:'ser/ir', tense:'perfeito',
      forms:{
        'eu':'fui','tu':'foste','ele/ela/você':'foi',
        'nós':'fomos','eles/elas/vocês':'foram'
      },
      note:'ser und ir haben im Perfekt DIESELBEN Formen! Nur der Kontext zeigt, welches gemeint ist.'
    },
    {
      id:'u11g05', type:'conjugation',
      title:'Perfeito unregelmäßig: ter',
      verb:'ter', tense:'perfeito',
      forms:{
        'eu':'tive','tu':'tiveste','ele/ela/você':'teve',
        'nós':'tivemos','eles/elas/vocês':'tiveram'
      },
      note:'ter (haben) im Perfekt: tive, tiveste...'
    },
    {
      id:'u11g06', type:'conjugation',
      title:'Perfeito unregelmäßig: fazer',
      verb:'fazer', tense:'perfeito',
      forms:{
        'eu':'fiz','tu':'fizeste','ele/ela/você':'fez',
        'nós':'fizemos','eles/elas/vocês':'fizeram'
      },
      note:'fazer (machen) im Perfekt: fiz, fizeste...'
    },
    {
      id:'u11g07', type:'conjugation',
      title:'Perfeito unregelmäßig: estar',
      verb:'estar', tense:'perfeito',
      forms:{
        'eu':'estive','tu':'estiveste','ele/ela/você':'esteve',
        'nós':'estivemos','eles/elas/vocês':'estiveram'
      },
      note:'estar (sein/temporär) im Perfekt: estive...'
    },
    {
      id:'u11g08', type:'conjugation',
      title:'Perfeito unregelmäßig: vir',
      verb:'vir', tense:'perfeito',
      forms:{
        'eu':'vim','tu':'vieste','ele/ela/você':'veio',
        'nós':'viemos','eles/elas/vocês':'vieram'
      },
      note:'vir (kommen) im Perfekt: vim, vieste...'
    },
    {
      id:'u11g09', type:'conjugation',
      title:'Perfeito unregelmäßig: dizer',
      verb:'dizer', tense:'perfeito',
      forms:{
        'eu':'disse','tu':'disseste','ele/ela/você':'disse',
        'nós':'dissemos','eles/elas/vocês':'disseram'
      },
      note:'dizer (sagen) im Perfekt: disse...'
    },
    {
      id:'u11g10', type:'conjugation',
      title:'Perfeito unregelmäßig: ver',
      verb:'ver', tense:'perfeito',
      forms:{
        'eu':'vi','tu':'viste','ele/ela/você':'viu',
        'nós':'vimos','eles/elas/vocês':'viram'
      },
      note:'ver (sehen) im Perfekt: vi, viste...'
    },
    {id:'u11g11', type:'rule', title:'Pronomenstellung: enclisis vs. proclisis',
      rule:'Standard: NACH Verb (Chamo-me) | VOR Verb bei: não, quem, que, já, também, ainda, nunca',
      examples:['Eu chamo-me Ana. (Standard: NACH dem Verb)','Não me chamo Ana. (Verneinung: VOR dem Verb)','Quem te disse? (Fragewort: VOR)','Já o vi. (Adverb já: VOR)','Também me disse. (Adverb também: VOR)'],
      note:'DIE schwierigste Regel im EU-PT! In Brasilien steht das Pronomen immer VOR dem Verb. In Portugal NACH — außer bei "Triggern" (não, quem, que, já, também, ainda, nunca, ninguém, alguém). Im Zweifel: NACH dem Verb.'},
    {id:'u11g12', type:'rule', title:'Wichtige Redewendungen (Perfeito)',
      rule:'Ter razão = Recht haben | Ter saudades de = vermissen | Dar-se bem com = sich gut verstehen',
      examples:['Tens razão! (Du hast Recht!)','Tenho saudades de Portugal. (Ich vermisse Portugal.)','Damo-nos bem. (Wir verstehen uns gut.)','Não faz mal. (Macht nichts.)','Está bem. / Tá bem. (Okay. / Alles klar.)'],
      note:'"Saudade" ist DAS portugiesische Wort — eine tiefe, wehmütige Sehnsucht. Es gibt kein deutsches Äquivalent. "Tenho saudades tuas" = Ich vermisse dich.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 12 — Contactos Sociais e Formas de Tratamento
// ─────────────────────────────────────────────
{
  id: 12,
  title: 'Contactos Sociais e Formas de Tratamento',
  subtitle: 'Einladungen, Briefe, Anrede',
  color: '#0284c7',
  unlocked: false,
  vocabulary: [
    {id:'u12v01',pt:'convidar',de:'einladen',cat:'social'},
    {id:'u12v02',pt:'o convite',de:'die Einladung',cat:'social'},
    {id:'u12v03',pt:'aceitar',de:'akzeptieren / annehmen',cat:'social'},
    {id:'u12v04',pt:'recusar',de:'ablehnen / zurückweisen',cat:'social'},
    {id:'u12v05',pt:'agradecer',de:'danken / sich bedanken',cat:'social'},
    {id:'u12v06',pt:'lamentar',de:'bedauern',cat:'social'},
    {id:'u12v07',pt:'felicitar',de:'gratulieren',cat:'social'},
    {id:'u12v08',pt:'o aniversário',de:'der Geburtstag / Jahrestag',cat:'social'},
    {id:'u12v09',pt:'a festa',de:'das Fest / die Party',cat:'social'},
    {id:'u12v10',pt:'o senhor / a senhora',de:'der Herr / die Dame',cat:'tratamento',expl:'o senhor/a senhora ist die formelle Anredeform in Portugal – wichtig!'},
    {id:'u12v11',pt:'Minha querida...',de:'Meine Liebe...',cat:'cartas'},
    {id:'u12v12',pt:'Querido/a...',de:'Lieber/Liebe...',cat:'cartas'},
    {id:'u12v13',pt:'Estimado/a...',de:'Sehr geehrter/Sehr geehrte...',cat:'cartas'},
    {id:'u12v14',pt:'Com os melhores cumprimentos',de:'Mit freundlichen Grüßen',cat:'cartas'},
    {id:'u12v15',pt:'Muitos beijinhos',de:'Viele Küsse / Liebe Grüße',cat:'cartas'},
    {id:'u12v16',pt:'Um abraço',de:'Herzliche Grüße (wörtl.: eine Umarmung)',cat:'cartas'},
  ],
  phrases: [
    {id:'u12p01',pt:'Queres vir à minha festa?',de:'Möchtest du zu meiner Party kommen?'},
    {id:'u12p02',pt:'Claro, com muito prazer!',de:'Natürlich, sehr gerne!'},
    {id:'u12p03',pt:'Infelizmente não posso.',de:'Leider kann ich nicht.',expl:'infelizmente = leider.'},
    {id:'u12p04',pt:'Muito obrigado pelo convite.',de:'Vielen Dank für die Einladung.'},
    {id:'u12p05',pt:'Parabéns pelo teu aniversário!',de:'Alles Gute zum Geburtstag!'},
    {id:'u12p06',pt:'Feliz aniversário!',de:'Herzlichen Glückwunsch zum Geburtstag!'},
    {id:'u12p07',pt:'Bom Natal e Feliz Ano Novo!',de:'Frohe Weihnachten und ein gutes neues Jahr!'},
    {id:'u12p08',pt:'Boa sorte!',de:'Viel Glück!'},
    {id:'u12p09',pt:'Como vai? Tudo bem por aí?',de:'Wie geht es? Ist alles gut bei euch?'},
  ],
  grammar: [
    {
      id:'u12g01', type:'conjugation',
      title:'Pretérito Perfeito: dar / ler / pôr / trazer',
      verb:'dar', tense:'perfeito',
      forms:{
        'eu':'dei','tu':'deste','ele/ela/você':'deu',
        'nós':'demos','eles/elas/vocês':'deram'
      },
      note:'dar (geben) im Perfekt: dei, deste, deu...'
    },
    {
      id:'u12g02', type:'conjugation',
      title:'Perfeito: ler',
      verb:'ler', tense:'perfeito',
      forms:{
        'eu':'li','tu':'leste','ele/ela/você':'leu',
        'nós':'lemos','eles/elas/vocês':'leram'
      },
      note:'ler (lesen) im Perfekt: li, leste, leu...'
    },
    {
      id:'u12g03', type:'rule',
      title:'Formelle Anrede: o senhor / a senhora',
      rule:'In Portugal wird "o senhor/a senhora" + 3. Person Singular als höfliche Anrede verwendet.',
      examples:['O senhor pode me ajudar? = Können Sie mir helfen?','A senhora fala inglês? = Sprechen Sie Englisch?'],
      note:'Man sagt o senhor und benutzt dann die 3. Person – KEIN "Sie"-Form wie im Deutschen!'
    },
    {id:'u12g04', type:'rule', title:'Falsche Freunde (Deutsch ↔ Portugiesisch)',
      rule:'Wörter die ähnlich aussehen aber anderes bedeuten!',
      examples:['carta = Brief (NICHT Karte → cartão)','Gymnasium = ginásio = Fitnessstudio','Gift = presente (NICHT "Gift" → veneno)','sensível = empfindlich (NICHT sensibel → sensato)','simpático = nett/freundlich (breiter als "sympathisch")','receita = Rezept UND Einnahmen UND Verschreibung'],
      note:'Deutsch-Portugiesische falsche Freunde! Diese Fehler sind hartnäckig — am besten bewusst lernen.'},
    {id:'u12g05', type:'rule', title:'Kontrastive Konnektoren',
      rule:'mas (aber) | embora + Subjunktiv (obwohl) | apesar de + Inf. (trotz)',
      examples:['Gosto de Lisboa, mas prefiro o Porto. (Ich mag Lissabon, aber bevorzuge Porto.)','Embora esteja cansado, vou sair. (Obwohl ich müde bin, gehe ich raus.)','Apesar de chover, fomos à praia. (Trotz des Regens gingen wir zum Strand.)'],
      note:'"Mas" ist A1. "Embora" und "apesar de" kommen ständig vor und sind wichtig für natürliches Sprechen auf A2-Niveau.'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 13 — Reclamar e Fazer Reclamações
// ─────────────────────────────────────────────
{
  id: 13,
  title: 'Reclamar e Fazer Reclamações',
  subtitle: 'Reklamieren, Restaurant, Unterkunft',
  color: '#dc2626',
  unlocked: false,
  vocabulary: [
    {id:'u13v01',pt:'reclamar',de:'reklamieren / sich beschweren',cat:'reclamações'},
    {id:'u13v02',pt:'a reclamação',de:'die Reklamation / Beschwerde',cat:'reclamações'},
    {id:'u13v03',pt:'o livro de reclamações',de:'das Beschwerdebuch',cat:'reclamações',expl:'In Portugal ist das livro de reclamações gesetzlich Pflicht in jedem Betrieb.'},
    {id:'u13v04',pt:'a ementa / o menu',de:'die Speisekarte',cat:'restaurante'},
    {id:'u13v05',pt:'o prato do dia',de:'das Tagesgericht',cat:'restaurante'},
    {id:'u13v06',pt:'a entrada / o aperitivo',de:'die Vorspeise',cat:'restaurante'},
    {id:'u13v07',pt:'o prato principal',de:'das Hauptgericht',cat:'restaurante'},
    {id:'u13v08',pt:'a sobremesa',de:'das Dessert / Nachtisch',cat:'restaurante'},
    {id:'u13v09',pt:'mal passado',de:'blutig (Fleisch)',cat:'restaurante'},
    {id:'u13v10',pt:'bem passado',de:'durchgebraten (Fleisch)',cat:'restaurante'},
    {id:'u13v11',pt:'ao ponto',de:'medium (Fleisch)',cat:'restaurante'},
    {id:'u13v12',pt:'está frio',de:'es ist kalt (Essen)',cat:'reclamações'},
    {id:'u13v13',pt:'está cru',de:'es ist roh',cat:'reclamações'},
    {id:'u13v14',pt:'está queimado',de:'es ist angebrannt',cat:'reclamações'},
    {id:'u13v15',pt:'está salgado',de:'es ist zu salzig',cat:'reclamações'},
    {id:'u13v16',pt:'o quarto de hotel',de:'das Hotelzimmer',cat:'alojamento'},
    {id:'u13v17',pt:'a reserva',de:'die Reservierung',cat:'alojamento'},
    {id:'u13v18',pt:'fazer check-in / check-out',de:'einchecken / auschecken',cat:'alojamento'},
    {id:'u13v19',pt:'a pequena-almoço incluído',de:'Frühstück inklusive',cat:'alojamento'},
    {id:'u13v20',pt:'a chave',de:'der Schlüssel',cat:'alojamento'},
  ],
  phrases: [
    {id:'u13p01',pt:'Desculpe, esta sopa está fria.',de:'Entschuldigung, diese Suppe ist kalt.',expl:'Esta... está... – estar für temporäre Zustände (kann sich ändern).'},
    {id:'u13p02',pt:'Pode trazer a ementa, por favor?',de:'Könnten Sie bitte die Speisekarte bringen?'},
    {id:'u13p03',pt:'Não é o que encomendei.',de:'Das ist nicht das, was ich bestellt habe.',expl:'encomendar = bestellen (Restaurant).'},
    {id:'u13p04',pt:'Quero fazer uma reclamação.',de:'Ich möchte eine Beschwerde einreichen.'},
    {id:'u13p05',pt:'O quarto não foi limpo.',de:'Das Zimmer wurde nicht gereinigt.'},
    {id:'u13p06',pt:'A conta está errada.',de:'Die Rechnung stimmt nicht.',expl:'a conta = die Rechnung (Restaurant).'},
    {id:'u13p07',pt:'Faz favor, pode chamar o gerente?',de:'Können Sie bitte den Manager rufen?'},
  ],
  grammar: [
    {
      id:'u13g01', type:'conjugation',
      title:'Pretérito Imperfeito: ser (unregelmäßig)',
      verb:'ser', tense:'imperfeito',
      forms:{
        'eu':'era','tu':'eras','ele/ela/você':'era',
        'nós':'éramos','eles/elas/vocês':'eram'
      },
      note:'ser im Imperfeito = war. Este prato era delicioso = Dieses Gericht war köstlich.'
    },
    {
      id:'u13g02', type:'rule',
      title:'Perfeito vs. Imperfeito',
      rule:'Perfeito: abgeschlossene Handlung (was passiert). Imperfeito: Hintergrund, Gewohnheit, Zustand (wie es war).',
      examples:['Cheguei às 8h. = Ich kam um 8 Uhr an. (Perfeito)','A mesa estava suja. = Der Tisch war schmutzig. (Imperfeito)'],
      note:'Perfeito = Vordergrund. Imperfeito = Hintergrund.'
    },
    {id:'u13g03', type:'rule', title:'Höflich beschweren: Strategie',
      rule:'1) Desculpe, mas... | 2) Problem benennen | 3) Lösung vorschlagen',
      examples:['Desculpe, mas a comida está fria. (Entschuldigung, aber das Essen ist kalt.)','Importa-se de trocar? (Würde es Ihnen etwas ausmachen zu tauschen?)','Gostaria de falar com o gerente. (Ich möchte gerne mit dem Manager sprechen.)'],
      note:'In Portugal beschwert man sich immer diplomatisch! "Desculpe, mas..." ist der Standard-Einstieg. Nie direkt angreifen. Das "livro de reclamações" ist gesetzlich Pflicht in jedem Betrieb!'},
    {id:'u13g04', type:'rule', title:'Se + Präsens (einfache Bedingung)',
      rule:'se + Präsens, Präsens = wenn..., dann...',
      examples:['Se chover, fico em casa. (Wenn es regnet, bleibe ich zuhause.)','Se quiseres, podemos ir juntos. (Wenn du willst, können wir zusammen gehen.)','Se houver tempo, vamos ao museu. (Wenn Zeit ist, gehen wir ins Museum.)'],
      note:'Einfache Bedingungssätze mit "se" + Präsens sind A2. Für höfliche Bitten: "Se não se importa..." (Wenn es Ihnen nichts ausmacht...).'},
  ]
},

// ─────────────────────────────────────────────
// UNIDADE 14 — Memórias no Passado
// ─────────────────────────────────────────────
{
  id: 14,
  title: 'Memórias no Passado',
  subtitle: 'Erinnerungen, Gewohnheiten in der Vergangenheit',
  color: '#64748b',
  unlocked: false,
  vocabulary: [
    {id:'u14v01',pt:'a infância',de:'die Kindheit',cat:'memórias'},
    {id:'u14v02',pt:'a juventude',de:'die Jugend',cat:'memórias'},
    {id:'u14v03',pt:'a saudade',de:'die Sehnsucht / das Heimweh',cat:'memórias',expl:'saudade ist ein einzigartiges portugiesisches Wort – ein Gefühl von Sehnsucht nach etwas/jemandem. Gilt als unübersetzbar.'},
    {id:'u14v04',pt:'lembrar / recordar',de:'sich erinnern',cat:'memórias'},
    {id:'u14v05',pt:'esquecer',de:'vergessen',cat:'memórias'},
    {id:'u14v06',pt:'antigamente',de:'früher / damals',cat:'tempo'},
    {id:'u14v07',pt:'naquele tempo',de:'zu jener Zeit / damals',cat:'tempo'},
    {id:'u14v08',pt:'quando era criança',de:'als ich Kind war',cat:'tempo'},
    {id:'u14v09',pt:'costumava',de:'pflegte zu / war gewohnt zu',cat:'expressões',expl:'costumar + Infinitiv im Imperfeito = früher immer/regelmäßig tun.'},
    {id:'u14v10',pt:'havia / tinha',de:'es gab',cat:'expressões'},
    {id:'u14v11',pt:'o bairro',de:'das Viertel / der Stadtteil',cat:'lugar'},
    {id:'u14v12',pt:'a aldeia',de:'das Dorf',cat:'lugar'},
    {id:'u14v13',pt:'a cidade',de:'die Stadt',cat:'lugar'},
    {id:'u14v14',pt:'o campo',de:'das Land / die Landschaft',cat:'lugar'},
    {id:'u14v15',pt:'crescer',de:'aufwachsen / wachsen',cat:'vida'},
    {id:'u14v16',pt:'mudar',de:'sich ändern / umziehen',cat:'vida'},
    {id:'u14v17',pt:'partir / ir embora',de:'abreisen / weggehen',cat:'vida'},
    {id:'u14v18',pt:'voltar',de:'zurückkehren',cat:'vida'},
  ],
  phrases: [
    {id:'u14p01',pt:'Quando era criança, morava numa aldeia.',de:'Als ich ein Kind war, wohnte ich in einem Dorf.',expl:'era = ich war (Imperfeito von ser). morava = ich wohnte (Imperfeito von morar).'},
    {id:'u14p02',pt:'Antigamente não havia telemóveis.',de:'Früher gab es keine Handys.',expl:'telemóvel = Handy (europäisches PT). In Brasilien: celular.'},
    {id:'u14p03',pt:'Costumava jogar futebol todos os dias.',de:'Ich pflegte jeden Tag Fußball zu spielen.',expl:'costumava + Infinitiv = "used to" auf Englisch.'},
    {id:'u14p04',pt:'Tenho muitas saudades da minha terra.',de:'Ich habe große Sehnsucht nach meiner Heimat.',expl:'ter saudades de = sich sehnen nach.'},
    {id:'u14p05',pt:'A minha avó contava muitas histórias.',de:'Meine Großmutter erzählte viele Geschichten.',expl:'contava = erzählte (Imperfeito von contar).'},
  ],
  grammar: [
    {
      id:'u14g01', type:'rule',
      title:'Imperfeito für vergangene Gewohnheiten',
      rule:'Imperfeito + costumar = "früher immer/regelmäßig" etwas tun',
      examples:['Quando era criança, brincava na rua. = Als Kind spielte ich immer auf der Straße.','Costumava acordar cedo. = Ich war es gewohnt, früh aufzustehen.'],
      note:'Das Imperfeito ohne spezifischen Zeitpunkt = Gewohnheit/Wiederholung in der Vergangenheit.'
    },
    {
      id:'u14g02', type:'conjugation',
      title:'Imperfeito: estar',
      verb:'estar', tense:'imperfeito',
      forms:{
        'eu':'estava','tu':'estavas','ele/ela/você':'estava',
        'nós':'estávamos','eles/elas/vocês':'estavam'
      },
      note:'estar im Imperfeito: estava = war (temporär).'
    },
    {
      id:'u14g03', type:'conjugation',
      title:'Imperfeito: ter',
      verb:'ter', tense:'imperfeito',
      forms:{
        'eu':'tinha','tu':'tinhas','ele/ela/você':'tinha',
        'nós':'tínhamos','eles/elas/vocês':'tinham'
      },
      note:'ter im Imperfeito: tinha = hatte. Também: havia (es gab) = Imperfeito von haver.'
    },
    {id:'u14g04', type:'rule', title:'EU vs. BR Portugiesisch — Hauptunterschiede',
      rule:'EU: Vokale verschluckt, Pronomen NACH Verb, estar a + Inf., tu/o senhor | BR: Vokale offen, Pronomen VOR Verb, estar + -ando, você',
      examples:['EU: Estou a comer. → BR: Estou comendo. (Ich esse gerade.)','EU: autocarro → BR: ônibus (Bus)','EU: telemóvel → BR: celular (Handy)','EU: pequeno-almoço → BR: café da manhã (Frühstück)','EU: casa de banho → BR: banheiro (Toilette)'],
      note:'Du lernst EU-Portugiesisch! Wenn du brasilianische Medien (Musik, Filme) hörst, wirst du Unterschiede bemerken. Beide Varianten sind korrekt — aber nicht mischen!'},
    {id:'u14g05', type:'rule', title:'Persönlicher Infinitiv (Überblick)',
      rule:'Infinitiv + Endung: -/es/-/mos/-em (falar, falares, falar, falarmos, falarem)',
      examples:['Antes de eles saírem... (Bevor sie gingen...)','É importante estudarmos. (Es ist wichtig, dass wir lernen.)','Para nós entendermos. (Damit wir verstehen.)'],
      note:'Der persönliche Infinitiv existiert NUR im Portugiesischen und Galicischen — einzigartig! Du musst ihn jetzt noch nicht aktiv benutzen, aber erkennen wenn du ihn hörst/liest.'},
    {id:'u14g06', type:'rule', title:'Konjunktiv — erste Begegnung',
      rule:'Feste Ausdrücke mit Konjunktiv: Espero que... | Talvez... | É preciso que...',
      examples:['Espero que estejas bem. (Ich hoffe, dir geht es gut.)','Talvez tenha razão. (Vielleicht hat er Recht.)','É preciso que estudemos mais. (Es ist nötig, dass wir mehr lernen.)','Quero que venhas. (Ich will, dass du kommst.)'],
      note:'Der Konjunktiv ist ein RIESIGES Thema (B1+). Für jetzt: diese festen Ausdrücke einfach als Ganzes lernen, ohne die Konjugation zu analysieren. Das kommt später!'},
  ]
}

]; // Ende window.LESSONS
