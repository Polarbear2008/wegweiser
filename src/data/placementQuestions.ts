export interface Question {
  id: number
  section: 'grammar' | 'vocabulary' | 'reading'
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  question: string
  options: string[]
  correct: number
  context?: string
}

export const questions: Question[] = [
  // ═══════════════════════ A1 ═══════════════════════
  // Grammar
  { id: 1, section: 'grammar', level: 'A1', question: 'Ich ___ aus Usbekistan.', options: ['bist', 'bin', 'ist', 'sind'], correct: 1 },
  { id: 2, section: 'grammar', level: 'A1', question: 'Das ___ mein Bruder.', options: ['bist', 'seid', 'bin', 'ist'], correct: 3 },
  { id: 3, section: 'grammar', level: 'A1', question: '___ heißt du?', options: ['Was', 'Wo', 'Wie', 'Wer'], correct: 2 },
  { id: 4, section: 'grammar', level: 'A1', question: 'Wir ___ heute Deutsch.', options: ['lernt', 'lernen', 'lerne', 'lernst'], correct: 1 },
  // Vocabulary
  { id: 5, section: 'vocabulary', level: 'A1', question: 'Welches Wort ist ein Möbelstück?', options: ['der Apfel', 'das Auto', 'der Hund', 'der Tisch'], correct: 3 },
  { id: 6, section: 'vocabulary', level: 'A1', question: 'Was sagt man am Morgen?', options: ['Gute Nacht', 'Guten Morgen', 'Auf Wiedersehen', 'Guten Appetit'], correct: 1 },
  // Reading
  { id: 7, section: 'reading', level: 'A1', question: '"Ich trinke gern Kaffee." — Was trinkt die Person gern?', options: ['Tee', 'Wasser', 'Kaffee', 'Milch'], correct: 2 },
  { id: 8, section: 'reading', level: 'A1', context: 'Lesen Sie: "Maria wohnt in Berlin. Sie ist 25 Jahre alt und arbeitet als Lehrerin."', question: 'Wo wohnt Maria?', options: ['In München', 'In Hamburg', 'In Wien', 'In Berlin'], correct: 3 },

  // ═══════════════════════ A2 ═══════════════════════
  // Grammar
  { id: 9, section: 'grammar', level: 'A2', question: 'Gestern ___ ich ins Kino gegangen.', options: ['habe', 'war', 'bin', 'hatte'], correct: 2 },
  { id: 10, section: 'grammar', level: 'A2', question: 'Er hat das Buch ___.', options: ['lesen', 'liest', 'las', 'gelesen'], correct: 3 },
  { id: 11, section: 'grammar', level: 'A2', question: 'Ich möchte ___ Arzt werden.', options: ['ein', 'einen', '—', 'einem'], correct: 2 },
  { id: 12, section: 'grammar', level: 'A2', question: 'Der Film war ___ als das Buch.', options: ['gut', 'besser', 'am besten', 'guter'], correct: 1 },
  // Vocabulary
  { id: 13, section: 'vocabulary', level: 'A2', question: 'Welches Wort passt: Ich mache eine ___ zur Krankenschwester.', options: ['Reise', 'Pause', 'Ausbildung', 'Wohnung'], correct: 2 },
  { id: 14, section: 'vocabulary', level: 'A2', question: 'Das Gegenteil von "billig" ist:', options: ['schnell', 'groß', 'klein', 'teuer'], correct: 3 },
  // Reading
  { id: 15, section: 'reading', level: 'A2', context: 'Lesen Sie: "Anna fährt jeden Tag mit dem Bus zur Arbeit. Die Fahrt dauert 30 Minuten."', question: 'Wie kommt Anna zur Arbeit?', options: ['Mit dem Auto', 'Zu Fuß', 'Mit dem Bus', 'Mit dem Fahrrad'], correct: 2 },
  { id: 16, section: 'reading', level: 'A2', context: 'Lesen Sie: "Das Restaurant ist von Montag bis Freitag geöffnet. Am Wochenende ist es geschlossen."', question: 'Wann ist das Restaurant geschlossen?', options: ['Am Montag', 'Am Wochenende', 'Am Freitag', 'Nie'], correct: 1 },

  // ═══════════════════════ B1 ═══════════════════════
  // Grammar
  { id: 17, section: 'grammar', level: 'B1', question: 'Wenn ich Zeit ___, würde ich mehr lesen.', options: ['habe', 'hatte', 'hätte', 'haben'], correct: 2 },
  { id: 18, section: 'grammar', level: 'B1', question: 'Das ist der Mann, ___ ich gestern getroffen habe.', options: ['der', 'dem', 'dessen', 'den'], correct: 3 },
  { id: 19, section: 'grammar', level: 'B1', question: 'Er fragte mich, ___ ich morgen kommen könnte.', options: ['dass', 'ob', 'weil', 'wenn'], correct: 1 },
  // Vocabulary
  { id: 20, section: 'vocabulary', level: 'B1', question: 'Welches Wort bedeutet "eine Arbeit suchen und Dokumente schicken"?', options: ['sich beschweren', 'sich beeilen', 'sich bewerben', 'sich erholen'], correct: 2 },
  { id: 21, section: 'vocabulary', level: 'B1', question: 'Ein Konzert oder ein Festival ist eine ___.', options: ['Verantwortung', 'Veranstaltung', 'Versicherung', 'Verwaltung'], correct: 1 },
  // Reading
  { id: 22, section: 'reading', level: 'B1', context: 'Lesen Sie: "Obwohl es regnete, ging er ohne Regenschirm spazieren. Er genoss den Regen auf seinem Gesicht."', question: 'Was ist richtig?', options: ['Er blieb zu Hause', 'Er nahm einen Schirm mit', 'Es war sonnig', 'Er ging trotz Regen ohne Schirm'], correct: 3 },
  { id: 23, section: 'reading', level: 'B1', context: 'Lesen Sie: "Immer mehr junge Menschen entscheiden sich dafür, nach dem Abitur ein Freiwilliges Soziales Jahr zu machen, bevor sie mit dem Studium beginnen."', question: 'Was machen viele junge Menschen nach dem Abitur?', options: ['Sofort studieren', 'Ins Ausland reisen', 'Ein Freiwilliges Soziales Jahr', 'Einen Job suchen'], correct: 2 },

  // ═══════════════════════ B2 ═══════════════════════
  // Grammar
  { id: 24, section: 'grammar', level: 'B2', question: 'Die Arbeit muss bis morgen ___ werden.', options: ['erledigen', 'erledigte', 'erledigend', 'erledigt'], correct: 3 },
  { id: 25, section: 'grammar', level: 'B2', question: 'Je mehr man übt, ___ besser wird man.', options: ['so', 'desto', 'als', 'wie'], correct: 1 },
  { id: 26, section: 'grammar', level: 'B2', question: '___ des schlechten Wetters fand das Konzert statt.', options: ['Wegen', 'Während', 'Aufgrund', 'Trotz'], correct: 3 },
  // Vocabulary
  { id: 27, section: 'vocabulary', level: 'B2', question: 'Was bedeutet "nachhaltig"?', options: ['sehr schnell', 'umweltfreundlich und langfristig', 'unwichtig', 'vorübergehend'], correct: 1 },
  { id: 28, section: 'vocabulary', level: 'B2', question: 'Eine schwierige, aber interessante Aufgabe ist eine ___.', options: ['Erscheinung', 'Entdeckung', 'Herausforderung', 'Forderung'], correct: 2 },
  // Reading
  { id: 29, section: 'reading', level: 'B2', context: 'Lesen Sie: "Angesichts der steigenden Lebenshaltungskosten fordern viele Arbeitnehmer höhere Gehälter. Die Gewerkschaften verhandeln derzeit mit den Arbeitgebern über neue Tarifverträge."', question: 'Warum fordern Arbeitnehmer mehr Gehalt?', options: ['Weil sie mehr arbeiten', 'Weil das Leben teurer wird', 'Weil sie befördert wurden', 'Weil die Steuern sinken'], correct: 1 },

  // ═══════════════════════ C1 ═══════════════════════
  // Grammar
  { id: 30, section: 'grammar', level: 'C1', question: 'Der Bericht, ___ Ergebnisse überraschend waren, wurde veröffentlicht.', options: ['deren', 'dessen', 'dem', 'den'], correct: 1 },
  { id: 31, section: 'grammar', level: 'C1', question: 'Er tat so, als ___ er nichts davon gewusst.', options: ['hat', 'hatte', 'hätte', 'habe'], correct: 2 },
  { id: 32, section: 'grammar', level: 'C1', question: 'Die Maßnahme ist ___ umstritten, ___ sie dennoch umgesetzt wurde.', options: ['weder ... noch', 'sowohl ... als auch', 'zwar ... aber', 'entweder ... oder'], correct: 2 },
  // Vocabulary
  { id: 33, section: 'vocabulary', level: 'C1', question: 'Ein anderes Wort für "sehr wichtig" oder "entscheidend" ist:', options: ['erschöpfend', 'überragend', 'ausschließlich', 'ausschlaggebend'], correct: 3 },
  // Reading
  { id: 34, section: 'reading', level: 'C1', context: 'Lesen Sie: "Infolge der zunehmenden Digitalisierung sehen sich traditionelle Geschäftsmodelle gezwungen, ihre Strategien grundlegend zu überdenken, um wettbewerbsfähig zu bleiben."', question: 'Was müssen traditionelle Unternehmen tun?', options: ['Mehr Mitarbeiter einstellen', 'Digitalisierung vermeiden', 'Ihre Strategien komplett überarbeiten', 'Ihre Preise senken'], correct: 2 },
  { id: 35, section: 'reading', level: 'C1', context: 'Lesen Sie: "Die zunehmende Polarisierung der Gesellschaft wird häufig auf die Filterblase sozialer Medien zurückgeführt, in der Nutzer vorwiegend mit Inhalten konfrontiert werden, die ihre bestehenden Überzeugungen bestätigen."', question: 'Was verursacht laut Text die gesellschaftliche Polarisierung?', options: ['Politische Parteien', 'Wirtschaftliche Ungleichheit', 'Die Filterblasen sozialer Medien', 'Fehlende Bildung'], correct: 2 },
]

export const sectionLabels: Record<string, Record<string, string>> = {
  grammar: { UZ: 'Grammatika', EN: 'Grammar', RU: 'Грамматика', DE: 'Grammatik' },
  vocabulary: { UZ: "Lug'at", EN: 'Vocabulary', RU: 'Словарный запас', DE: 'Wortschatz' },
  reading: { UZ: "O'qish", EN: 'Reading', RU: 'Чтение', DE: 'Lesen' },
}

export function determineLevel(score: number, total: number): string {
  const pct = (score / total) * 100
  if (pct >= 90) return 'C1'
  if (pct >= 75) return 'B2'
  if (pct >= 58) return 'B1'
  if (pct >= 40) return 'A2'
  if (pct >= 20) return 'A1'
  return 'A0'
}

export const levelDescriptions: Record<string, Record<string, string>> = {
  A0: {
    UZ: "Siz hali nemis tilini bilmaysiz. Boshlang'ich kursdan boshlashni tavsiya qilamiz.",
    EN: "You don't know German yet. We recommend starting from the beginner course.",
    RU: 'Вы пока не знаете немецкий. Рекомендуем начать с начального курса.',
    DE: 'Sie können noch kein Deutsch. Wir empfehlen den Anfängerkurs.',
  },
  A1: {
    UZ: "Siz oddiy iboralar va kundalik so'zlarni tushunasiz.",
    EN: 'You can understand simple phrases and everyday words.',
    RU: 'Вы понимаете простые фразы и повседневные слова.',
    DE: 'Sie verstehen einfache Sätze und alltägliche Wörter.',
  },
  A2: {
    UZ: "Siz kundalik mavzularda oddiy jumla tuzishingiz va tushunishingiz mumkin.",
    EN: 'You can form and understand simple sentences on everyday topics.',
    RU: 'Вы можете составлять и понимать простые предложения на повседневные темы.',
    DE: 'Sie können einfache Sätze zu alltäglichen Themen bilden und verstehen.',
  },
  B1: {
    UZ: "Siz tanish mavzularda asosiy fikrlarni tushuna olasiz va o'z fikringizni ifoda eta olasiz.",
    EN: 'You can understand main ideas on familiar topics and express your opinion.',
    RU: 'Вы понимаете основные идеи по знакомым темам и можете выразить своё мнение.',
    DE: 'Sie verstehen Hauptgedanken zu vertrauten Themen und können Ihre Meinung ausdrücken.',
  },
  B2: {
    UZ: "Siz murakkab matnlarni tushuna olasiz va ravon gaplasha olasiz.",
    EN: 'You can understand complex texts and communicate fluently.',
    RU: 'Вы понимаете сложные тексты и можете свободно общаться.',
    DE: 'Sie verstehen komplexe Texte und können fließend kommunizieren.',
  },
  C1: {
    UZ: "Siz nemis tilini yuqori darajada bilasiz. Murakkab matnlarni osongina tushunasiz.",
    EN: 'You have advanced German skills. You easily understand complex texts.',
    RU: 'Вы владеете немецким на продвинутом уровне. Легко понимаете сложные тексты.',
    DE: 'Sie beherrschen Deutsch auf fortgeschrittenem Niveau und verstehen komplexe Texte mühelos.',
  },
}
