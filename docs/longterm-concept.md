# Langzeit-Konzept: Begleiter auf Dauer (A-030)

Stand: freigegeben (A-030b, Session 13). Grundlage: 104-Wochen-Simulation von 5 Profilen auf b5af25f (A-030a).

## Entscheidungen des Captains

- Alle Bausteine L1–L8 sind freigegeben und werden **gestaffelt** umgesetzt, je Baustein ein eigener Auftrag (Tabelle „Aufträge“).
- L4: **vier Akzent-Blöcke** zu je 6 Trainingswochen (Grundlage, Kraft, Umfang, Fertigkeit und Tempo), nicht nur die Rotation auf Phase 1/2.
- L3: Der **Unterkörper-Stand** kommt ins Level, auch wenn sich damit die Pläne der Unterkörper-Profile ändern (mehr Runden).
- L8: Das **Love-Theme** ist vom Textausbau (Tagessprüche, Abschluss-Meldungen) ausgenommen; seine Notizen bleiben verschlüsselt und werden nur vom Captain gepflegt.
- L7 Erhaltung und der Tagesmodus „Tired“ stützen sich auf **dieselben Quellen**: Bell et al. 2023 [Q9], Spiering et al. 2021 [Q57], Bickel et al. 2011 [Q56].

## Aufträge

| Auftrag | Baustein | Inhalt |
|---|---|---|
| A-030b | Prüfstein | Konzept einchecken, Langzeit-Test t49 als eigener Lauf (`sh tests/longterm.sh`) |
| A-037 | L1 + Teil S4 | Pausenregel nach üblichem Rhythmus; „Next variation“ endet bei „Full“ |
| A-038 | L8 Technik | `cycWk` merken, Import-Deckel 20.000 mit Hinweis, Datum mit Jahr |
| A-039 | L2 | Steigerungsleiter für Körpergewichts- und Halteübungen, Gewichtsfeld am Glute-Anker |
| A-040 | L7 Teil 1 | Folgeziel-Vorschlag, Zielketten Lauf, Stillstand ohne Ziel |
| A-041 | L3 | Level mit Unterkörper-Stand und vierter Stufe |
| A-042 | L4 | Blöcke mit vier Akzenten |
| A-043 | L5 | Übungsrotation je Block, neue Übungen, Deload/Test in 3 Fassungen |
| A-044 | L6 | Lauf über Saisons, Intervall-Formen, Tempo-Hinweis |
| A-045 | L7 Teil 2 | Erhaltungs-Modus |
| A-051 | Nacharbeit A-036 | Rückschritt nur bei echter Pause des Musters (H-1, M-1) |
| A-052 | Nacharbeit A-036 | Schmerzfilter-Namen, Limited time mit Tired/Hold (M-2, M-3) |
| A-053 | Nacharbeit A-036 | Lauf: 30-%-Deckel, Übergangswoche, harte Läufe gegen echte Läufe (M-4, M-5, N-4, N-5) |
| A-054 | Nacharbeit A-036 | Feinschliff und Testnetz |
| A-046 | L8 Ansichten | Langzeit-Ansichten, Jahresrückblick, gestufte Ehrungen, Ränge, mehr Texte (ohne Love-Theme) |

Abhängigkeiten: A-039 nach A-037; A-042 nach A-041; A-043, A-044 und A-045 nach A-042; A-046 nach A-038.

## Kurzfassung

Die App plant 12 Wochen gut und wiederholt sie dann. Sechs Stellen enden hart, vier bleiben stehen, zwei werden eintönig.
Dieses Konzept schließt sie mit acht Bausteinen. Jeder Baustein hält die Doktrin: Usability vor Features, Gamification
passiv, eigene Begriffe, 60–90 min, Warm-up und Cool-down, Daten lokal, kein Bruch alter Daten.

Reihenfolge nach Wirkung: erst die Fehler, die Werte senken (L1), dann Steigerungswege (L2, L3), dann Inhalt (L4, L5),
dann Lauf (L6), dann Ansichten und Gamification (L7, L8).

## Forschungsstand (kompakt, mit Folgerung)

| Thema | Befund | Folgerung für die App |
|---|---|---|
| Steigerung | Mehr Wiederholungen bei gleicher Last wirken über 8 Wochen ähnlich wie mehr Last [Q8]. | Wo kein Gewicht möglich ist, sind Wiederholungen, Tempo, Pausen und einseitige Varianten gültige Wege. |
| Periodisierung | Periodisierte Pläne bringen mehr Maximalkraft als nicht periodisierte, mit mittlerer Effektstärke; Variation des Reizes gilt als wesentlich [Q53]. | Blöcke mit wechselndem Akzent statt einer 12-Wochen-Schleife. |
| Übungswechsel | Wechsel der Übungen kann Zuwachs beeinflussen; zu häufiger Wechsel kann schaden [Q54]. Variierte Auswahl hob in einer Studie die Trainingsmotivation bei gleichem Zuwachs [Q55]. | Anker bleibt fest, Nebenübungen wechseln planmäßig je Block, nicht je Einheit. |
| Erhaltung | Ein Drittel bis ein Neuntel des Aufbau-Umfangs hielt bei Jüngeren Kraft und Masse über 32 Wochen; Ältere brauchten mehr [Q56]. | Ein Erhaltungs-Modus mit kleinem Umfang und gleicher Last ist tragfähig. |
| Lauf | 80/20-Verteilung, Wochenumfang in kleinen Schritten, Taper: siehe [Q44], [Q50] und Audit Abschnitt 7. | Saison-Phasen mit Entlastungswoche, Tempo aus eigenen Zeiten. |

## L1 – Pausenregel reparieren (klein)

Problem: Die Regel „14 Tage Abstand, ein Schritt zurück“ greift bei Profilen, deren Einheiten von sich aus 16–18 Tage
auseinanderliegen. Die Vorgabe sinkt jedes Mal (S1).

Regel neu:
- Der Abstand misst sich am **üblichen Rhythmus** der Übung: Median der letzten 4 Abstände desselben Bewegungsmusters.
- Ein Schritt zurück erst bei Abstand ≥ 14 Tage **und** ≥ 1,5 × üblicher Rhythmus. Zwei Schritte bei > 28 Tagen und ≥ 2 × Rhythmus.
- Nie zweimal in Folge zurück, ohne dass dazwischen die Vorgabe erreicht wurde.
- Untergrenze: nie unter das untere Ende der Spanne der Übung.

Daten: keine neuen Felder. Migration: nein. Bestehende gesunkene Werte steigen über die normale Progression wieder.
Aufwand: klein. Auftrag: **A-037**. Test: 104 Wochen Runner, keine Übung fällt unter ihre Spanne (t49, ab A-037 hart).

## L2 – Steigerungswege nach dem oberen Ende (mittel)

Problem: 20 Körpergewichtsübungen frieren ein (S2). Halteübungen stehen ab 34 s bei 3 × 20 s (S4).

Jede Progressionsübung bekommt eine **Steigerungsleiter** mit festen Sprossen. Erreicht jemand zweimal in Folge das obere
Ende, bietet die App die nächste Sprosse mit einem Tipp an (wie heute „Next variation“):

1. Gewicht, wo ein Gewichtsfeld sinnvoll ist (zuerst der Glute-Anker: Scheibe halten).
2. Schwerere Variante, auch einseitig.
3. Langsames Absenken (3 s, dann 5 s).
4. Pause am schwersten Punkt (2 s).
5. Kürzere Pause zwischen den Sätzen (−15 s, höchstens zweimal).

Nach einer neuen Sprosse beginnt die Spanne wieder unten. Halteübungen: nach 3 × 20 s folgt die schwerere Form
(z. B. L-sit → erhöhte Beine), nicht mehr Sekunden. Für Front lever und Planche endet „Next variation“ bei „Full“ (vorgezogen in A-037).

Daten: `D.ex[key].lad` (Sprosse 0–5), optional. Fehlt das Feld, gilt 0. `cleanImport` lässt 0–5 zu.

Umsetzung (A-039, Session 14): Die Optionslisten bleiben in ihrer gespeicherten Reihenfolge, weil die Varianten-Indizes in `D.vr` und `D.ex` stehen; eine eigene Reihenfolge `ORD` ordnet die Körpergewichtsformen nach Schwierigkeit. Gewicht steht als letzte Sprosse (5), weil es danach unbegrenzt in normalen Gewichtsschritten weitergeht; die Sprossen 1–4 sind Tempo, Pause und Satzpause (−15 s einmal). Halteübungen in Sekunden beginnen bei Sprosse 4.
Migration: nein. Aufwand: mittel. Auftrag: **A-039**.

## L3 – Level mit klaren Kriterien, auch für Beine (mittel)

Problem: Drei Stufen, nur über Klimmzüge, Dips und Muscle-ups. Ein Unterkörper-Profil bleibt zwei Jahre „Basic“ (S3).

- Zwei Maße statt einem: **Oberkörper-Stand** (wie heute) und **Unterkörper-Stand** aus dem Anker
  (z. B. Hip thrust oder Squat im Verhältnis zum Startwert und zur Trainingsdauer).
- Rundenzahl und Satzband richten sich nach dem Stand des jeweiligen Musters, nicht nach einem Gesamtlevel.
- Eine vierte Stufe für beide Maße, mit Kriterien, die ohne Muscle-up erreichbar sind.
- Der Aufstieg wird wie heute nur gemeldet („Level up“), nie abgefragt.

Daten: nichts Neues; der Stand wird aus `D.profile`, `D.ex` und `D.pr` berechnet. Migration: nein.
Entscheidung: freigegeben (Captain). Risiko: Pläne ändern sich für Unterkörper-Profile (mehr Runden). Test-Fixture t31 wird neu aufgenommen (`node tools/record-fixture.js`). Aufwand: mittel. Auftrag: **A-041**.

Umsetzung (A-041): Unterkörper-Stand = bestes Gewicht der Anker-Variante (`g_ht`, `gl_ht`, `c_sq`, `gl_sq`) gegen ihr erstes
Gewicht und die Wochen seitdem. Stufen [Verhältnis, Wochen]: 1 = ×1,25 und 12 Wochen, 2 = ×1,5 und 26 Wochen, 3 = ×1,75 und
52 Wochen. Begründung: Einsteiger gelten nach etwa 6 Monaten als fortgeschritten, Fortgeschrittene nach Jahren [Q3]; die
Kraftzuwächse sinken von etwa 40 % (untrainiert) über 20 % auf etwa 10 % (fortgeschritten) [Q58]. Wer im Oberkörper über
Basic liegt oder als „Experienced“ startet, ist nach [Q3] kein Neuling: Unterkörper ≥ 1. Oberkörper: Stufe 1 wie bisher
(5 Klimmzüge, 8 Dips), Stufe 2 mit 3 Muscle-ups oder über dasselbe Verhältnis der Klimmzüge (ab mindestens 5) zum
ersten Testwert, Stufe 3 nur über das Verhältnis, ohne Muscle-up. Runden je Block nach dem Stand seiner Achse; das Satzband eines
Musters steigt auf der vierten Stufe seiner Achse um 2 Sätze an der Obergrenze [Q2][Q4]. Die Variantenwahl (`lvl()`)
bleibt unverändert. t31 blieb unverändert (Fixture nicht neu aufgenommen): die Pläne der ersten Wochen ändern sich nicht.

Nacharbeit (A-049): Die vierte Stufe „Veteran“ verlangt auf beiden Achsen zusätzlich mindestens **104 Wochen** seit dem
ersten Wert (Faktor ×1,75 bleibt), Stufen 2 und 3 bleiben bei 12 und 26 Wochen. Begründung: ACSM 2009 [Q3] ordnet
„advanced“ erst nach Jahren Training ein; ein Jahr reicht dafür nicht. Das Level steht nicht mehr in der Kopfzeile und nicht
in der Onboarding-Zusammenfassung; die Kacheln unter Status sind die einzige Anzeige. Die Kopfzeile zeigt Datum und Woche.

## L4 – Blöcke mit wechselndem Akzent (groß)

Problem: Woche 13 ist Woche 1 (T1), Volumen bleibt zwei Jahre gleich (T2).

Aus der 12-Wochen-Schleife wird eine Folge von **Blöcken zu 6 Trainingswochen** (5 Wochen Arbeit, 1 Woche Deload mit Test,
wie heute). Vier Akzente wechseln sich ab:

| Block | Akzent | Wirkung |
|---|---|---|
| 1 | Grundlage | Spannen wie heute, Band wie heute |
| 2 | Kraft | Anker und Hauptübungen: untere Spanne, +1 Satz, längere Pausen; Nebenübungen −1 Satz |
| 3 | Umfang | obere Spanne, Band +2 für das Schwerpunkt-Muster, kürzere Pausen |
| 4 | Fertigkeit und Tempo | Skill-Blöcke in der langen Form, explosive Varianten, Band am unteren Rand |

Regeln: Der Akzent ändert Spannen, Sätze und Pausen, nie die 60–90 min und nie Warm-up oder Cool-down. Ein aktives Ziel
bestimmt den Akzent des laufenden Blocks mit (kg-Ziel → Kraft, Skill-Ziel → Fertigkeit). Nach vier Blöcken beginnt die
Folge neu, aber mit den Nebenübungen des nächsten Rotationssatzes (L5). Die Kopfzeile nennt Block und Akzent in einem Wort.

Daten: Der Block ergibt sich aus der Trainingswoche (`cycWk`), kein neues Feld. `c.phase` bleibt als interner Schlüssel.
Migration: nein. Aufwand: groß (S0, `rounds`, `vBand`, `design`, Tests t22–t42 prüfen). Entscheidung: vier Akzente (Captain). Auftrag: **A-042**.

Umsetzung (A-042): Block = `floor((cycWk().ef − 1) / 6)`, Akzent = Block modulo 4; der laufende Zyklus läuft ohne Bruch weiter
(Wochen 1–6 = Block 1, Grundlage), „Easy week now“ verschiebt den Block mit. In der Deload-Woche und im Ziel-Taper wirkt kein Akzent.
Ein kg- oder Wiederholungsziel macht aus dem Fertigkeits-Block einen Kraft-Block, ein Skill-Ziel aus dem Umfangs-Block einen
Fertigkeits-Block; Laufziele ändern nichts (Lauf-Saisons folgen mit A-044). Wirkung, angewendet vor `design()`, sodass 60–90 min,
Satzband und Böden weiter gelten:
- Kraft: gewichtete Anker- und Hauptübungen in der unteren Hälfte ihrer Spanne, Hauptblöcke +1 Runde bzw. Satz, +30 s Pause,
  Anker 3 min Pause; Nebenblöcke −1 Runde bzw. Satz (Boden 2). Blöcke mit Bein- oder Hüftarbeit behalten ihre Sätze (der Boden
  Beine + Hüfte ≥ 10 steht über dem Akzent), „Limited time“ nur die Spanne. Die Extra-Runde weicht in `design()` als Letztes,
  bevor 90 min überschritten würden. Pausen nach ACSM 2009 [Q3]: 2–3 min für schwere Mehrgelenksätze im Krafttraining.
- Umfang: gewichtete Übungen in der oberen Hälfte ihrer Spanne, Pausen −15 s (mindestens 45 s), Anker 90 s Pause
  (ACSM 2009 [Q3]: 1–2 min für Hypertrophie-Arbeit), Band +2 an der Obergrenze nur für das Schwerpunkt-/Zielmuster.
- Fertigkeit und Tempo: Skill-Blöcke in der langen Form, Hauptblöcke mit dem Hinweis „schnell heben, kontrolliert senken“
  (die Optionslisten behalten ihre Reihenfolge, deshalb Tempo statt neuer Varianten), Rundenzahl niedrig, Band-Obergrenze −2
  (mindestens untere Grenze + 4).
- Körpergewichtsübungen behalten ihre Spanne; ihre Last steuern Variante und Steigerungsleiter (L2).
Die Kopfzeile nennt den Akzent in einem Wort je Theme (Templar Foundation/Wrath/Endurance/Precision, Plain Base/Strength/
Volume/Skill), Trainingskopf und Status „Block n · Akzent“. Kraft und Fertigkeit fallen auf Phase 2, Grundlage und Umfang auf
Phase 1 (`c.phase` bleibt interner Schlüssel). t31 bleibt unverändert: die ersten 6 Trainingswochen sind Block 1 ohne Akzent.

## L5 – Planmäßige Übungsrotation (mittel)

Problem: Nach dem ersten Quartal kommt kein neuer Inhalt (M1).

- Jede Nebenübung gehört zu einem Muster mit **3 gleichwertigen Sätzen** (A, B, C). Je Block gilt ein Satz.
- Der Anker bleibt fest. Zielanker, Favoriten, „Never suggest“ und der Schmerzfilter behalten Vorrang.
- Fortschritt bleibt je Variante gespeichert (wie heute bei Field kit). Kehrt ein Satz nach 12 Wochen zurück, gilt die
  reparierte Pausenregel (L1) mit einem Schritt zurück.
- Deload und Test bekommen je 3 Fassungen im Wechsel.
- Der Katalog wächst um etwa 30 Übungen, vor allem für Unterkörper und Rumpf.

Daten: keine neuen Felder (Satz = Blocknummer modulo 3). Migration: nein. Aufwand: mittel, dazu Inhaltsarbeit. Auftrag: **A-043**.

Umsetzung (A-043): 15 rotierende Nebenübungen (`ROT`) mit je zwei neuen Sätzen B und C, zusammen **30 neue Übungen**
(28 für Unterkörper und Rumpf: Ausfallschritte, Split Squats, Step-ups, Hüftstreckung, Brücken, Waden, Abduktion, Rumpf;
dazu 2 Ruderformen). Satz A ist die Übung selbst; B und C haben eigene Schlüssel (`r_…`), sodass der Fortschritt je Variante
bleibt. Der Satz folgt dem Block (`blkNo % 3`), gewechselt wird also je Block, nicht je Einheit [Q54][Q55]. `rotApply()` läuft
in `S()` direkt nach `postBlocks()`; Anker, Zielanker, Favoriten, Warm-up/Cool-down, Skill-, Trial- und Zusatzblöcke bleiben
unberührt, ein ausgeschlossener Satz („Never suggest“) lässt Satz A stehen, Field kit, Never und der Schmerzfilter wirken danach.
Kehrt ein Satz nach seiner Pause zurück, greift die Pausenregel nach Rhythmus, aber höchstens mit **einem** Schritt zurück
(L5 oben; ohne diese Grenze wären es nach 12 Wochen zwei). Deload und Test haben je 3 Fassungen im Wechsel (Deload: andere
leichte Übungen; Test: dieselben Testwerte in anderer Reihenfolge, Fassung 2 und 3 mit lockerem Ausklang). Jede neue Übung
steht in `PATK`, in der Mustertabelle `tests/fixtures/pattern-table.js` und in `ORD`. Prüfstein „neue Übungsnamen je
Quartal“ (t49) zählt Namen, die nie zuvor oder mindestens 12 Wochen nicht gezeigt wurden – nach drei Blöcken kehren die Sätze
planmäßig zurück, ganz neue Namen kann es auf Dauer nicht geben. t31 bleibt unverändert (Block 1 = Satz A).

## L6 – Lauf über Saisons (mittel)

Problem: Deckel bei 10 und 16 km, 8 × 3 min, feste lockere Läufe, kein Tempo (S5).

- **Vier Phasen zu je 6 Wochen** im Gleichschritt mit den Blöcken: Grundlage (Umfang wächst), Aufbau (langer Lauf wächst),
  Tempo (Intervalle wechseln die Form), Erhalt (Umfang −20 %).
- Intervall-Formen im Wechsel: 3 min, 1 min schnell mit 1 min Trab, 6–8 min zügig, Steigerungsläufe.
- Lockerer Lauf wächst mit: Anteil am Wochenumfang statt fester 5 oder 6 km.
- Der Deckel des langen Laufs hängt am 4-Wochen-Mittel (höchstens 35 % des Wochenumfangs), nicht an einer festen Zahl.
  Die 130-%-Grenze bleibt.
- Tempo-Hinweis aus eigenen Bestzeiten (`run:t5`, `run:t10`): „zuletzt 6:10/km, heute locker ab 7:00/km“. Nur Text.
- Laufziele über 21 km: 25, 30, 42 km als weitere Stufen.

Daten: `GOALS` um Schlüssel erweitert; alte Backups kennen sie nicht und brauchen sie nicht. `D.runKm` und `D.runI`
bleiben. Migration: nein. Aufwand: mittel. Auftrag: **A-044**.

Umsetzung (A-044): Laufsaison = `blkNo % 4` (Grundlage, Aufbau, Tempo, Erhalt), im Gleichschritt mit den Akzent-Blöcken;
Ziele verschieben die Saison nicht.
- Lockerer Lauf: Anteil am 4-Wochen-Mittel (Grundlage 30 %, sonst 25 %), die alte feste Strecke (4/5/6 km) bleibt Untergrenze,
  Obergrenze 8 km (Läufer 12 km); ohne Laufhistorie gilt die alte Strecke. 80/20: der Großteil der Kilometer locker [Q44][Q18].
- Langer Lauf (nur im Langlauf-Modus): Deckel `longCap` = 35 % des 4-Wochen-Mittels (mindestens 6 km; mit Laufziel wie bisher bis
  Zielstrecke + 2, höchstens 24 km) [Q61]. Wachstum nach „Easy“: Aufbau +10 %, Grundlage +0,5 km, Tempo und Erhalt halten. Im Aufbau
  steigt der geplante lange Lauf zusätzlich um 5 % je Trainingswoche des Blocks (bis zum Deckel). Ein schon längerer gespeicherter
  Lauf wird nicht gekürzt; die 130-%-Grenze und „höchstens 1 von 3 Läufen hart“ bleiben. Einzelne Läufe, die über die längste
  Strecke der letzten 30 Tage um mehr als 10 % hinausgehen, sind mit mehr Verletzungen verbunden [Q62] – deshalb höchstens 10 % je Lauf.
- Intervall-Formen [Q60]: Grundlage 3 min; Aufbau abwechselnd 3 min und 6–8 min zügig; Tempo im Wechsel 3 min, 1 min schnell /
  1 min Trab, 6–8 min zügig, Steigerungsläufe; Erhalt 3 min mit 20 % weniger Wiederholungen. `D.runI` steigt nur nach der 3-min-Form.
- Erhalt: jeder Lauf −20 % Strecke bei gleicher Intensität [Q57].
- Tempo-Hinweis (nur Text) aus `run:t5`/`run:t10`: locker ab Bestzeit-Tempo + 1:00/km, schnelle Wiederholungen etwa 5-km-Tempo,
  zügig etwa +0:20/km [Q61].
- Harter Lauf im Modus „Balanced“ (kein langer Lauf) behält seinen Deckel von 10 km.
- Einsteiger-Laufen bleibt (4 Wochen nur locker), Laufziele bis 42 km stehen seit A-040 in der Zielkette.
Prüfstein t49 „run“ vergleicht seit A-044 je Saison statt je Quartal: Wochen-km und mittlerer langer Lauf unterscheiden sich um ≥ 10 %.

## L7 – Folgeziel und Erhaltung (klein bis mittel)

Problem: Nach einem erreichten Ziel ist die Zielzeile leer (S4). Wer bewusst bleiben will, hat keinen Modus (T3).

Folgeziel:
- Nach „erreicht“ zeigt die Startseite eine Zeile mit **zwei Vorschlägen und „Kein Ziel“**: die nächste Stufe desselben
  Ziels und ein verwandtes Ziel (z. B. Muscle-up × 1 → Muscle-up × 3 oder Front lever). Ein Tipp, sonst nichts.
- Feste Laufziele werden zur Kette: 5 → 10 → 21 → 25 km, danach Zeitziele.
- Ein Ziel, das schon erfüllt wäre, wird nicht angeboten.

Erhaltung:
- Schalter unter „More“ je Bereich (Kraft, Lauf, Skills): „Stand halten“.
- Wirkung: etwa ein Drittel weniger Sätze im Muster, gleiche Last, keine Stillstands-Senkung, keine Plateau-Meldung.
- Quellen wie beim Tagesmodus „Tired“: Umfang senken, Intensität halten [Q9][Q57]; ein Drittel bis ein Neuntel des Aufbau-Umfangs hält Kraft und Masse [Q56].
- Stillstand ohne Ziel bekommt dieselbe Antwort wie mit Ziel: leichte Woche, dann +2 Sätze, dann Variantenwechsel.

Daten: `D.hold` = `{str,run,sk}` (Booleans, Standard alle aus), `D.goalNext` (Liste von Schlüsseln, flüchtig).
`cleanImport` erweitert. Migration: Standardwerte, kein Bruch. Aufwand: Folgeziel klein (**A-040**), Erhaltung mittel (**A-045**).

Umsetzung Erhaltung (A-045): Unter More → Extras eine Zeile „Hold“ (Templar „Hold the line“) mit drei Schaltern Kraft, Lauf,
Skills; `D.hold = {str,run,sk}`, Standard alle aus, `cleanImport` nimmt nur `true` an. Kraft: jede Krafteinheit bekommt den
Schnitt der Tired-Doktrin (etwa ⅔ der Arbeitssätze, Anker und Zielanker bleiben, Warm-up und Cool-down vollständig, Boden 45 min),
Last und Variante bleiben; kein Stillstands-Rückschritt (`stall` wird nicht gezählt und nicht zurückgesetzt), keine Sprossen-
Angebote, keine Plateau-Zeile (mit und ohne Ziel), kein Level-Aufstieg-Toast. Lauf: jede geplante Strecke etwa −⅓, gleiche
Intensität; langer Lauf und Intervallzahl wachsen nicht. Skills: Skill-Blöcke in der Standardform mit etwa ⅓ weniger Runden bzw.
Sätzen. Quellen [Q56][Q57]: ein Drittel bis ein Neuntel des Aufbau-Umfangs hielt Kraft und Masse; Umfang darf sinken, wenn die
Intensität bleibt. Plateau-Meldungen eines Ziels ruhen, solange sein Bereich hält.

## L8 – Langzeit-Ansichten und passive Gamification (mittel)

Ansichten:
- Zeitraum-Wahl 12 Wochen, 1 Jahr, alles für Kalender, Belastung und Kilometer (Monatswerte ab 1 Jahr).
- Übungsverlauf: ab 40 Punkten Monatsbestwerte statt Einzelpunkte.
- Datum mit Jahr, sobald der Eintrag nicht im laufenden Jahr liegt.
- **Jahresrückblick** als eine Karte in den Statistiken: Einheiten, Kilometer, Rekorde, erreichte Ziele, längste Serie.
  Erscheint von selbst nach 52 Wochen und zum Jahreswechsel, kein Tipp nötig.

Gamification (passiv):
- Ränge: nach dem höchsten Rang zählt eine Stufe weiter (eigener Name je Theme plus Zahl), alle 8.000 XP.
- Ehrungen: 6 gestufte Ehrungen (Einträge 100/500/1000/2000, Kilometer 100/500/1000/2000, Wochenserie 4/26/52/104,
  Jahre 1/2/3, Rekorde 10/50/100, Core Blitz 25/100/250).
- Texte: Tagessprüche und Abschluss-Meldungen je Theme von 16 auf mindestens 60; Auswahl ohne Wiederholung innerhalb
  eines Durchlaufs. **Ausgenommen: das Love-Theme** (Entscheidung des Captains; seine Notizen bleiben verschlüsselt).

Technik:
- `cycWk()` einmal je Tag und Eintragszahl berechnen und merken (wie `cbInfo`).
- Import-Deckel von 2000 auf 20.000 Einträge; Hinweis, falls ein Backup gekürzt würde.
- Chronicle lädt ältere Einträge erst beim Aufklappen.

Daten: `honSeen` nimmt neue Schlüssel auf. Migration: nein. Aufwand: mittel. Aufträge: Technik **A-038**, Ansichten und Gamification **A-046**.

Umsetzung (A-046):
- Zeitraum-Wahl (Chips „12 weeks / 1 year / All“, flüchtig in `D._per`) für Kalender (Chronicle), Einheiten, Belastung und
  Kilometer (Status); ab 1 Jahr Monatswerte (`perMonths`), „All“ ab dem ersten Monat mit Einträgen.
- Übungsverlauf: ab 40 Punkten der beste Wert je Monat (Hinweis „Best value per month“), die Tabelle bleibt vollständig.
- Jahresrückblick (`yearRev`) als Karte unter Status, von selbst: nach 52 Wochen die letzten 12 Monate, im Januar das Vorjahr;
  Einheiten, Kilometer, Rekorde, erreichte Ziele, längste Tagesserie.
- Ränge: nach dem höchsten Rang (16.000 XP) alle 8.000 XP eine Stufe weiter, Name je Theme plus Zahl (Templar „Hero of the
  Crusade 1“, Plain „Legend 1“), Aufstieg nur als Meldung.
- Gestufte Ehrungen (`honTiers`): Einträge 100/500/1000/2000, Kilometer 100/500/1000/2000, Wochen mit 3+ Einheiten in Folge
  4/26/52/104, Jahre 1/2/3, Rekorde 10/50/100, Core Blitz 25/100/250; gesehene Stufen in `honSeen` als `<Schlüssel><Stufe>`
  (eine erreichte Stufe bleibt), Meldung beim Erreichen, Plain mit eigenen Namen.
- Texte: Tagessprüche und Abschlussmeldungen je Theme (Templar, Sanguine, Sisters, Slaanesh, Nurgle, Plain) von 16 auf 60,
  Auswahl über eine je Durchlauf gemischte Reihenfolge (`pickNR`), also ohne Wiederholung innerhalb eines Durchlaufs; das
  Love-Theme bleibt unverändert.
- Chronicle: 20 Einträge, ältere erst auf Tipp („Show older entries“, je 50).

## Nacharbeit A-036 – neue Doktrin (Captain und Leitstand, A-051 … A-054)

- **Rückschritt nur bei echter Pause des Musters (A-051).** Solange dasselbe Bewegungsmuster (PATK: pull, push, legs,
  hinge, core) durch andere Übungen trainiert wird, gibt es keinen Rückschritt. Abstand und Rhythmus der Pausenregel
  messen die letzte Belastung des Musters, nicht der einzelnen Übung; Übungen ohne Muster messen an jedem Training. Deload-
  und Test-Wochen (Zykluswoche 6) zählen wie pausierte Tage nicht als Abstand. Ein Rückschritt nach A-037 kommt nur, wenn
  das ganze Muster über Rhythmus pausiert hat (Urlaub, Krankheit, stille Lücke). Kehrt eine Übung nach Rotation oder
  Phasenwechsel zurück (> 28 Tage ohne sie, das Muster lief weiter): höchstens −1 Wiederholung, Gewicht hält. Ein
  Akzent-Block, der den unteren Rand der Spanne über den letzten Wert hebt, hält das Gewicht und zielt auf den neuen
  unteren Rand (kein „weight down“). Begründung: Detraining hängt am fehlenden Reiz des Muskels, nicht am Fehlen einer
  einzelnen Übung; Kraft hält sich bis etwa 3 Wochen ohne Training und bei reduziertem Umfang mit gehaltener Intensität
  [Q63][Q64] (Bell 2023 und Spiering 2021, siehe CLAUDE.md Tired-Doktrin). Stillstand ohne Ziel (M-1): nach einem
  Akzentwechsel oder einer echten Pause beginnt der Vergleich neu; ein planmäßig gesenkter Wert ist kein Stillstands-Check.
  Prüfstein: t49 „start“ (im Fortschritts-Verlauf endet jede gewichtete Übung ≥ Startgewicht), t62.
- **Langer Lauf (A-053, umgesetzt).** ≤ 30 % des 4-Wochen-Mittels [Q61] (Daniels: 25–30 % des Wochenumfangs; ersetzt die 35 % aus
  L6), mindestens lockerer Lauf + 1 km. Übergang aus Hold/Erhalt mit einer Woche × 0,9 [Q62] (höchstens 10 % über dem
  längsten Lauf der letzten 30 Tage).
- **Harte Läufe (A-053).** Höchstens 1 von 3 der in den letzten 14 Tagen gelaufenen Läufe hart; ist der empfohlene Lauf
  der einzige der Woche, ist er locker oder zügig. Harter Lauf in Balanced ≤ 8 km, Wachstum über zügige Abschnitte.
- **Level-Startwert (A-054).** Bester Wert der ersten 4 Trainingswochen; gezählt werden Trainingswochen, nicht
  Kalenderwochen.

## Datenmodell und Migration im Überblick

| Baustein | Neue Felder | Migration | Alte Backups |
|---|---|---|---|
| L1 Pausenregel | keine | nein | laden unverändert |
| L2 Steigerungsleiter | `D.ex[*].lad` (optional) | nein | fehlt = Sprosse 0 |
| L3 Level | keine (berechnet) | nein | Pläne für Unterkörper ändern sich |
| L4 Blöcke | keine (aus Trainingswoche) | nein | laufender Zyklus wird Block 1 oder 2 |
| L5 Rotation | keine | nein | laden unverändert |
| L6 Lauf | neue `GOALS`-Schlüssel | nein | laden unverändert |
| L7 Folgeziel, Erhaltung | `D.hold`, `D.goalNext` | Standardwerte | laden unverändert |
| L8 Ansichten | neue Schlüssel in `honSeen` | nein | Import-Deckel höher |

Regel für alle: `fresh()` liefert den Standard, `cleanImport()` wird je Feld erweitert, t05 und t09 bekommen je einen Fall.

## Prüfstein

Ein neuer Test simuliert 104 Wochen für 5 Profile in zwei Verläufen und prüft:
- keine Vorgabe fällt unter die Spanne ihrer Übung;
- in jedem Quartal erscheinen neue Übungsnamen;
- keine Körpergewichtsübung steht länger als 12 Wochen am oberen Ende ohne angebotene Sprosse;
- Wochenkilometer und langer Lauf ändern sich zwischen den Phasen;
- jede Einheit bleibt bei 60–90 min mit Warm-up und Cool-down;
- die Wochenvorschau braucht nach 2 Jahren höchstens das Doppelte der Zeit von Woche 12.

Der Test läuft wegen der Dauer als eigener Lauf, nicht bei jedem `tests/run.sh`: **t49 longterm**, `sh tests/longterm.sh`.
Prüfsteine, die erst ein späterer Auftrag erfüllt, meldet t49 als „offen“ statt als Fehler. Ab A-037 schlägt
„keine Vorgabe fällt unter die Spanne ihrer Übung“ hart fehl; jeder weitere Auftrag schaltet seinen Prüfstein scharf.

| Prüfstein | scharf ab |
|---|---|
| keine Vorgabe unter der Spanne | A-037 |
| Wochenvorschau ≤ 2 × Woche 12 | A-038 |
| keine Körpergewichtsübung > 12 Wochen am oberen Ende ohne Sprosse | A-039 |
| neue Übungsnamen in jedem Quartal | A-043 |
| Wochenkilometer und langer Lauf ändern sich zwischen den Phasen | A-044 |
| 60–90 min mit Warm-up und Cool-down | sofort (A-030b) |

## Quellen

[Q1]–[Q51]: siehe `docs/training-audit.md` und `docs/personalisation-concept.md`.

- [Q52] zusammengeführt mit [Q8] (dieselbe Quelle, siehe `docs/training-audit.md`); Verweise lauten jetzt [Q8] (A-054).
- [Q53] Williams TD, Tolusso DV, Fedewa MV, Esco MR. Comparison of periodized and non-periodized resistance training on maximal strength: a meta-analysis. *Sports Med* 2017;47(10):2083–2100.
- [Q54] Kassiano W, Nunes JP, Costa B, Ribeiro AS, Schoenfeld BJ, Cyrino ES. Does varying resistance exercises promote superior muscle hypertrophy and strength gains? A systematic review. *J Strength Cond Res* 2022;36(6):1753–1762.
- [Q55] Baz-Valle E, Schoenfeld BJ, Torres-Unda J, Santos-Concejero J, Balsalobre-Fernández C. The effects of exercise variation in muscle thickness, maximal strength and motivation in resistance trained men. *PLoS One* 2019;14(12):e0226989.
- [Q56] Bickel CS, Cross JM, Bamman MM. Exercise dosing to retain resistance training adaptations in young and older adults. *Med Sci Sports Exerc* 2011;43(7):1177–1187.
- [Q57] Spiering BA, Mujika I, Sharp MA, Foulis SA. Maintaining physical performance: the minimal dose of exercise needed to preserve endurance and strength over time. *J Strength Cond Res* 2021;35(5):1449–1458.
- [Q58] Kraemer WJ, Ratamess NA. Fundamentals of resistance training: progression and exercise prescription. *Med Sci Sports Exerc* 2004;36(4):674–688 (strength gains of about 40 % untrained, 20 % moderately trained, 16 % trained, 10 % advanced, 2 % elite over 4 weeks to 2 years).
- [Q9] Bell L et al. 2023 (Deload-Konsens): siehe `docs/training-audit.md`.
- [Q59] zusammengeführt mit [Q18] (dieselbe Quelle, siehe `docs/training-audit.md`); Verweise lauten jetzt [Q18] (A-054).
- [Q60] Billat LV. Interval training for performance: a scientific and empirical practice. Part I: aerobic interval training. *Sports Med* 2001;31(1):13–31.
- [Q61] Daniels J. *Daniels' Running Formula*. 3rd ed. Human Kinetics; 2014 (long run as a share of the weekly volume; easy pace well below 5 km race pace, threshold close to 10 km pace).
- [Q62] Frandsen JSB, Hulme A, Parner ET, et al. How much running is too much? Identifying high-risk running sessions in a 5200-person cohort study. *Br J Sports Med* 2025 (single sessions more than 10 % longer than the longest run of the last 30 days raised the injury risk).
- [Q63] Bosquet L, Berryman N, Dupuy O, et al. Effect of training cessation on muscular performance: a meta-analysis. *Scand J Med Sci Sports* 2013;23(3):e140–e149 (strength holds for about 3 weeks without training, losses grow after that).
- [Q64] Mujika I, Padilla S. Detraining: loss of training-induced physiological and performance adaptations. Part I: short term insufficient training stimulus. *Sports Med* 2000;30(2):79–87 (detraining follows an insufficient stimulus of the trained system).
