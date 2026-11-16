# Trainings-Audit: Ist-Stand gegen Forschung (A-005)

Stand: 2026-11-16 · Basis: Commit `b93d7e9`, `src/app.js` · Nur Bericht, kein App-Code geändert.

## Methode

- Ich habe `src/app.js` gelesen. Zeilenangaben beziehen sich auf `b93d7e9`.
- Dazu kommt eine Simulation über 4–7 Wochen mit den echten Funktionen aus dem Build (`recAll`, `recTrain`, `S`, `rounds`, `ctx`). Jeder empfohlene Tag wurde als erledigt geloggt (RPE 6).
- Drei Profile:
  - **Captain:** Fokus `bal`, Skills hs+mu, Kickboxen Di/Fr, Intermediate.
  - **Partnerin A:** Fokus `bal`, Schwerpunkt `lower`, Basic, keine Skills, kein Kickboxen.
  - **Partnerin B:** Fokus `str`, Schwerpunkt `glutes`.
- Dauer-Schätzung:
  - Circuit: Runden × (Übungen × 45 s) + Runden × Pause.
  - Satzweise: Sätze × (40 s + Pause).
  - Fest gesetzt: Aufwärmen 8 min, Cool-down 5 min, Tabata 2–4 min plus 1 min.
- Sätze pro Muskelgruppe zähle ich nur aus direkten `P`-Übungen (Schlüssel-Mapping, grob). Das ist eine Schätzung, kein Messwert.

### Simulationsergebnis (Auszug)

| Profil | Wochenbild (Einheit, geschätzte min) | Unterkörper-Sätze/Woche | Oberkörper-Sätze/Woche |
|---|---|---|---|
| Captain | W1: KA 93 · KI 90 · KB 80 · RE · KI · KC 81 · RE<br>W2: KA 93 · KI · RH · SK 58 · KI · KB 80 · RE<br>W4: KB 92 · KI · KA 102 · SK · KI · KC 90 · RE | Quad 0–13, Hinge 0–8, Glute 0–7 (KC nur in W1 und W4 von 7) | Zug 12–28, Druck 8–21 |
| Partnerin A | W1: KC 65 · RE · KA 66 · RH · RS · KB 49 · RE<br>W2: CH 31 · RS · KA 66 · RH · RS · KB 49 · RE | Quad 3–17, Glute 6–19 (Wechsel ungerade/gerade Woche) | Zug 13–16, Druck 8–12 |
| Partnerin B | 3 Kraft + CH alle 2 Wochen + RS dazwischen | Glute 14–25, Quad 2–14 | Zug 13–25 |

**Wiederkehr der Schwerpunkt-Übungen bei Partnerin A** (Tage zwischen zwei Einsätzen, aus `EMB()`):

- `g_ht` Hip Thrust: 2, 12, 2, 12, 17
- `g_rdl` RDL: 21, 14
- `g_bss` Split Squat: 4, 14, 3

---

## Ist-Stand je Bereich

### 1. Progression (Wiederholungen, Last, Stufen)

`target()` (Z. 382–395) setzt eine **Double Progression** um:

- Innerhalb des Wiederholungsbereichs gibt es +1 Wdh. pro Einheit, bei Sekunden +2 oder +5 s.
- Am oberen Ende kommt Gewicht dazu: +2,5 kg, ab 40 kg +5 kg (Z. 385, 390). Danach geht es zurück aufs untere Ende des Bereichs.
- Bei Körpergewichtsübungen erscheint am oberen Ende nur der Hinweis „Next step: …“. Die Variante wechselt nicht automatisch.
- Unter dem Bereich: Gewicht runter, oder Hinweis auf eine leichtere Variante.

`saveTrain()` (Z. 1117–1120) speichert den **schwächsten Satz** als Referenz. Es zählt Stillstände (`stall`). Ab 3 Stillständen kommt der Hinweis „Swap the variation“ (Z. 389).

Weitere Regeln:

- Nach RPE 10 bleibt das Ziel gleich (`hold`, Z. 388).
- Nach mehr als 10 Tagen Pause geht es eine Stufe zurück, nach mehr als 28 Tagen zwei (Z. 386).
- Halteübungen passen ihren Maximalwert über `isoP()` (Z. 83) und den ISO-Zweig in `saveTrain()` selbst an.
- Front Lever und Planche steigen ihre Stufe automatisch auf (Z. 1121).

### 2. Volumen pro Muskelgruppe und Woche

Das Volumen ergibt sich aus den Runden pro Circuit (`rounds()`, Z. 651–655):

- In Zykluswoche 1–2, bei „Limited time“, auf Basic-Level oder nach RPE 10 gilt die niedrige Rundenzahl.
- Sonst gilt die hohe Rundenzahl.
- Damit steigt das Volumen innerhalb des 5-Wochen-Blocks.

Beim Captain liegt das Oberkörpervolumen bei 12–28 Zug- und 8–21 Drucksätzen pro Woche. Das ist hoch bis sehr hoch.

Der Unterkörper hängt fast nur an KC (`S0` case `"KC"`, Z. 323). KC kommt in der Simulation nur alle 2–3 Wochen. Die Gründe stehen unter Frequenz. In den übrigen Wochen hat der Captain 0–5 Quad-Sätze.

Beim Schwerpunkt `lower`/`glutes` hängt `EMB()` (Z. 179–184) einen Block an KA, KB, HO und KC an: 2–3 Übungen × 3 Runden. Gleichzeitig verliert der Oberkörper-Circuit eine Runde (`postBlocks`, Z. 245–247).

Eine Anzeige „Sätze pro Muskelgruppe“ gibt es nicht. `areaCounts()` (Z. 920) zählt nur Einheiten, keine Sätze.

### 3. Frequenz

Der Empfehler `recAll()` (Z. 442–474) gewichtet die Einheiten pro Fokus. Für jede Kraft-Einheit gilt ein Mindestabstand: 6 Tage, bei Fokus `str` 4 (`mS`, Z. 456).

KA, KB und KC kommen damit je höchstens etwa einmal pro Woche. Pro Muskelgruppe heißt das:

- Zug und Druck: 3× pro Woche.
- Beine bei `bal`: höchstens 1×.

Drei Regeln drücken KC zusätzlich:

- Die Venus-Challenge CH ersetzt KC alle 2 Wochen (`kcId`, Z. 464).
- Am Tag vor dem Kickboxen ist KC gesperrt (`!kickT`, Z. 465).
- Der Schwerpunkt `lower` erhöht nur das Gewicht von KC (Z. 458), nicht den Mindestabstand.

Die Beschreibung im Onboarding verspricht „leg day more often“ (`EMPH`, Z. 156). Das hält der Code nicht ein.

Bei Partnerin A und B sorgt der EMB-Block für 3 Glute-Kontakte pro Woche.

### 4. Deload-Logik

`ctx()` (Z. 402–407) zählt nur Wochen mit Training. Jede 6. Woche ist Deload (`cyc===6`).

In dieser Woche (Z. 450–455) empfiehlt der Plan erst DL (leichter Ganzkörper-Circuit), dann TE (Test aller Werte). Dazu kommen nur noch lockere Läufe oder Erholung.

Der Deload ist rein zeitgesteuert. Viele Einheiten an der Grenze oder hohe Gesamtlast lösen keinen vorgezogenen Deload aus. Es gibt nur einen Ruhetag nach 3× RPE 10 in 7 Tagen (Z. 447).

Pausenwochen schieben den Zyklus korrekt nach hinten.

### 5. Tagesform und Autoregulation

Die App fragt die Tagesform nur nach der Einheit ab: Session-RPE in 4 Stufen, 4/6/8/10 (`rpeHTML`, Z. 597).

Wirkungen eines Werts von 10:

- Am nächsten Tag folgt eine leichte Einheit (`limitY`, Z. 446).
- Bei der nächsten gleichen Einheit gilt die niedrige Rundenzahl (Z. 654).
- Das Wiederholungsziel bleibt gleich (Z. 388).

Weitere Bausteine:

- Schmerzhaken für Handgelenk, Schulter und Ellbogen (`PAINRX`, `REHAB`, Z. 213–221) blenden Übungen aus und fügen Reha ein.
- „Limited time“ streicht Blöcke mit `p>1`.

Eine Abfrage **vor** der Einheit (Schlaf, Muskelkater, Energie) gibt es nicht. RIR pro Satz gibt es auch nicht.

### 6. Verpasste Einheiten

Der Empfehler arbeitet nicht mit einem Kalender. Er wählt die Einheit, die am längsten her ist (`since()`, `cap()`, Gewichtung `sc=wt*cap(since)/7`, Z. 460).

Fällt eine Einheit aus, rückt sie automatisch nach vorn. Eine Reihenfolge, die starr weiterläuft, gibt es nicht.

Pausen schieben den Zyklus (Abschnitt 4) und senken das Ziel (Z. 386).

Bei seltenem Training greift `lowFreq`: höchstens 7 Trainingstage in 14 Tagen und mehr als 10 Tage ohne KC. Dann ergänzt LEGMINI KA oder KB (Z. 268, 295, 321).

### 7. Laufumfang

Es gibt drei Laufarten (`runInfo`, Z. 764–768):

- **RE:** 5 km oder 30–45 min locker.
- **RI:** `D.runI` × 3 min schnell, 3–8 Wiederholungen.
- **RH:** `D.runKm` km „hard, about 6:30/km“.

Die Steigerung hängt an einzelnen Einheiten (`saveRun`, Z. 1134–1135):

- RH: +0,5 km nur bei RPE 4 („Easy“), Deckel 10 km bzw. 16 km bei Fokus `run`.
- RI: +1 Wiederholung bei RPE ≤ 6.

Wochen-Kilometer, langer Lauf und Umfangsdeckel fehlen. Bei Fokus `run` heißt RH zwar „Long run“ (Z. 466), der Text in `runInfo` beschreibt aber einen harten Lauf.

Gewichte bei `bal`: RH 7, RE 6, RI 0. In der Simulation kommt RH beim Captain jede zweite Woche, bei Partnerin A jede Woche, neben 1–2 RE.

### 8. Gesamtbelastung inkl. Kickboxen

Kickboxen wird nur mit RPE geloggt, ohne Dauer (`savekick`, Z. 1173). Es zählt als harte Einheit (`HARD`, Z. 258) und damit in `hardRun`. Ab 3 harten Tagen in Folge folgt eine leichte Einheit (Z. 448).

Die Kickbox-Regel sperrt am Vortag nur KC, RH und RI (`hardOK`, Z. 461, 465). KA und KB sind am Vortag erlaubt (Z. 462–463). In der Simulation lag KA jeden Montag vor dem Kickboxen am Dienstag.

Eine Wochenlast (RPE × Dauer) gibt es nicht. Einen echten Ruhetag empfiehlt die App nie. Das Minimum ist RS (Mobility, ca. 16 min). Beim Captain gab es in 7 Wochen 7 aktive Tage pro Woche, davon 2 × 90 min Kickboxen.

### 9. Aufwärmen und Aufwärmsätze

`WARM()` (Z. 90–97) dauert ca. 8 min:

- 3 min Puls hoch.
- Danach Handgelenke, Schulterblatt, Hängen und False Grip. Das ist rein oberkörperspezifisch.

Diesen Block bekommen auch KC (Beine) und die Glute-Blöcke. Hüfte, Knie und Sprunggelenk werden nicht vorbereitet. Die Morgenroutine deckt das nur ab, wenn sie am selben Tag gemacht wird.

Aufwärmsätze vor schweren Grundübungen gibt es nicht: Kniebeuge, RDL, Hip Thrust, Dips mit Gewicht, Klimmzüge mit Gewicht. Die erste Serie startet direkt mit dem Zielgewicht aus `target()`.

### 10. Erholung zwischen harten Tagen

Die Regeln in `recAll()`/`hist()` (Z. 409–428, 444–448):

- Keine Kraft-Einheit nach einem Krafttag (`strY`).
- Nach einem harten Lauf (`rhY`) oder RPE 10 (`limitY`) folgt ein leichter Tag.
- Höchstens 3 harte Tage in Folge.
- Kein KA an einem Tag, an dem schon gelaufen wurde.
- Der Hinweis „Strength first, or keep 3 hours apart“ steht in `runInfo`.

Das ist schlüssig und vermeidet zwei Krafttage hintereinander. Es fehlt nur die Kopplung an die Gesamtlast (Abschnitt 8).

### 11. Unterkörper-Schwerpunkt der Partnerin

Der Schwerpunkt wirkt über drei Wege:

- `EMB()` hängt 2 Übungen an KA, KB und HO und 3 an KC.
- Der Oberkörper-Circuit verliert eine Runde (Z. 245–247).
- Das KC-Gewicht steigt um +3 (Z. 458).

Die Übungen rotieren pro Einheitstyp (`(cnt*n+i)%all.length`, Z. 182). Jede Glute-Übung kehrt deshalb erst nach 10–21 Tagen wieder (siehe Simulation). Das löst in `target()` den Rückschritt nach mehr als 10 Tagen aus (Z. 386). Die Progression der Schlüsselübungen (Hip Thrust, RDL) wird so immer wieder zurückgesetzt.

Weitere Befunde:

- KC kommt auch mit Schwerpunkt nur in jeder zweiten Woche, weil CH es ersetzt.
- CH ist auf Basic-Level ein Oberkörper- und Skilltest (Negativ-Klimmzüge, Front Lever, Planche).
- Das Glute-Volumen schwankt daher von Woche zu Woche zwischen 6 und 19 Sätzen.
- `LOWB()` (Z. 185) ist toter Code und wird nirgends aufgerufen.

### 12. Morgenroutine und Cool-down

**Morgenroutine** (`MPH`, `MMOD`, `morning()`, Z. 498–536):

- Reihenfolge Raise, Activate, Mobilise.
- In der ersten Stunde keine belastete Rumpfbeugung.
- Täglich CARs, dazu ein Fokusmodul nach dem Tagesplan.
- Kurzversion vorhanden.

**Cool-down** (`COOLS`, `COOL()`, Z. 543–554):

- Nach jeder Einheit 5 min statisches Dehnen, 30–45 s pro Dehnung, je nach Einheitsart passend.
- Beides erfüllt die Projektvorgabe.

---

## Bewertungstabelle

| Thema | Ist (Code) | Evidenz | Lücke | Vorschlag |
|---|---|---|---|---|
| Progression: Wdh./Last | Double Progression in `target()` Z. 382–395; feste Sprünge +2,5/+5 kg (Z. 385) | Steigern über Wdh. oder über Last bringt ähnliche Zuwächse [Q8]. Laststeigerung 2–10 %, wenn 1–2 Wdh. über dem Ziel liegen [Q3]. Progressive Überlastung bleibt die Kernvariable [Q1] | klein | Gewichtssprung relativ zum Gewicht (≈ 5 %, gerundet auf 0,5/1/2,5 kg). +2,5 kg auf 5 kg sind 50 % → V7 |
| Progression: Stufen (Körpergewicht) | Nur Hinweis „Next step“ (Z. 391), Wechsel per Hand; FL/PL automatisch (Z. 1121) | Ohne steigende Belastung stagniert der Reiz [Q1][Q3] | klein | Ein Tipp „Next variation“ übernimmt die nächste Option, das Ziel startet am unteren Ende → V7 |
| Progression: Stillstand | `stall` ≥ 3 → nur Hinweis (Z. 389, 1119) | Bei Stillstand: Last oder Variante wechseln, Ermüdung prüfen [Q3][Q12] | klein | Nach 3× Stillstand: Ziel 10 % leichter und neu aufbauen, alternativ Varianten-Wechsel → V7 |
| Volumen pro Muskelgruppe | Oberkörper 12–28 Sätze/Wo; Beine Captain meist 0–5 Quad-Sätze (Simulation, `S0` Z. 323) | ~10 Sätze pro Muskelgruppe und Woche als Basis [Q1][Q2]. Dosis-Wirkung mit abnehmendem Zusatznutzen [Q4] | groß (Beine) | Beine pro Woche absichern: kompakter Beinblock in KA oder KB, wenn KC fehlt → V1 |
| Frequenz | `mS` 6 Tage (Z. 456); CH ersetzt KC (Z. 464); KC am Kick-Vortag gesperrt (Z. 465) → Beine ≤ 1× pro Woche, oft seltener | Alle großen Muskelgruppen ≥ 2× pro Woche [Q1]. Kraft profitiert eigenständig von Frequenz, Hypertrophie folgt vor allem dem Volumen [Q4][Q5][Q6][Q7] | groß | V1: Beinreiz 2× pro Woche, CH verdrängt KC bei Unterkörper-Schwerpunkt nicht mehr |
| Deload | Fix jede 6. Trainingswoche, DL + TE (Z. 450–455) | Deloads typisch alle 4–8 Wochen, geplant oder nach Ermüdung [Q9]. Eine Woche komplette Pause bringt keinen Hypertrophie-Vorteil und kostet etwas Beinkraft [Q10] | klein | Fixen Rhythmus behalten (reduziert statt Pause, das passt). Zusätzlich vorgezogener Deload-Vorschlag bei hoher Last → V5 |
| Tagesform/Autoregulation | Nur Session-RPE danach (Z. 597); RPE 10 → `hold`, niedrige Runden, leichter Tag | Subjektive Wellness-Werte zeigen Ermüdung empfindlicher als objektive Marker [Q13]. RIR/RPE als Steuergröße [Q11][Q12] | mittel | I-09 schlank: 1 Tipp vor dem Start (gut/normal/müde) → V8 |
| Verpasste Einheiten | Rotation nach „am längsten her“ (Z. 460); Zyklus zählt nur Trainingswochen (Z. 404–405); Rückschritt nach > 10/28 Tagen (Z. 386) | Kraft bleibt bei Trainierten ~3 Wochen weitgehend erhalten [Q14]. Kontinuität zählt am meisten [Q1] | keine/klein | I-10 verwerfen. Optional Rückschritt erst nach 14 Tagen (V2) und Comeback-Hinweis in I-06 |
| Laufumfang | Steigerung pro Einheit (Z. 1134); keine Wochen-km; kein Long Run trotz Label (Z. 466 vs. `runInfo` Z. 768) | Starre 10 %-Regel senkt Verletzungen nicht [Q15]. Mehr als ~30 % Steigerung in 2 Wochen ist mit bestimmten Verletzungen verbunden [Q16][Q17] | mittel | I-11 ändern: Wochen-km in der Statistik, Warnung ab > 30 % gegenüber dem 4-Wochen-Schnitt, Long Run für Fokus `run` → V6 |
| Lauf-Intensitätsverteilung | `bal`: RH 7 > RE 6 (Z. 456); RH etwa jede Woche neben 1–2 RE (≈ 33–50 % hart) | Ausdauersport: ~80 % locker, ~20 % hart [Q18][Q19] | mittel | Gewichtung so, dass höchstens jeder 3. Lauf hart ist; RE vor RH → V6 |
| Gesamtbelastung inkl. Kickboxen | KI ohne Dauer (Z. 1173); keine Wochenlast; nie ein Ruhetag (Minimum RS) | Session-RPE × Dauer ist eine valide, einfache Lastgröße [Q20][Q21]. ACWR-Grenzwerte sind methodisch umstritten [Q22]. Erholung gehört geplant [Q23] | mittel | I-12 bestätigen: Dauer bei KI (Vorgabe 90), sRPE-Wochenlast in der Statistik, 1 Ruhetag pro Woche als Option → V5 |
| Kick-Regel (kein hart am Vortag) | Gilt für KC/RH/RI, nicht für KA/KB (Z. 461–465) | Interferenz trifft vor allem Beinkraft und Explosivität [Q24][Q25]. Kicks belasten Hüfte und Beine | klein | Leitstand-Entscheidung: Regel bewusst nur für Beine/Laufen? Wenn nicht: KA/KB am Vortag nur in der kurzen Fassung → V9 |
| Aufwärmen | `WARM()` Z. 90–97 nur Oberkörper, auch an Beintagen | Aufwärmen verbessert die Leistung in der Mehrzahl der Studien [Q26]. Spezifisches Aufwärmen der Zielgelenke [Q27] | mittel | Bein-Variante des Warm-ups an KC und bei Unterkörper-Schwerpunkt → V4 |
| Aufwärmsätze | Keine; erster Satz direkt mit Zielgewicht | Spezifische Aufwärmsätze mit steigender Last verbessern die Leistung bei schweren Übungen [Q27][Q28] | mittel | I-13 bestätigen, Prio hoch: 2–3 Ramp-up-Sätze (z. B. 50 % × 8, 70 % × 4, 85 % × 2) bei `w`-Übungen ab 20 kg → V4 |
| Erholung zwischen harten Tagen | `strY`, `rhY`, `limitY`, `hardRun` (Z. 413–415, 445–448) | ~48 h vor erneuter Belastung derselben Muskelgruppe [Q3]; Kraft vor Ausdauer oder Abstand [Q25] | keine | — |
| Unterkörper-Schwerpunkt (Partnerin) | `EMB()` rotiert Übungen → Wiederkehr nach 10–21 Tagen → Rückschritt (Z. 182, 386); KC nur jede 2. Woche; Versprechen „leg day more often“ nicht eingehalten (Z. 156) | Hip Thrust und Kniebeuge bringen ähnliche Glute-Hypertrophie [Q29]. Frauen und Männer reagieren relativ gleich, keine eigene Verschreibung nötig [Q30][Q31]. Wiederholte Exposition ist Voraussetzung für Progression [Q1] | groß | V2: feste Anker-Übung pro Einheit plus 1 rotierende; Rückschritt erst ab 14 Tagen. V1 gilt auch hier |
| Einheitsdauer 45–90 min | Keine Dauerberechnung; Captain KA/KB/KC geschätzt 80–102 min | Projektvorgabe 45–90 min; Machbarkeit und Treue zum Plan zählen am meisten [Q1] | mittel | Geschätzte Dauer in der Kopfzeile, automatische Kürzung (Favoriten, Schwerpunkt, Tabata) auf ≤ 90 min → V3 |
| Cool-down | 5 min statisch, passend zur Einheit (Z. 543–554) | Cool-down senkt Muskelkater und Verletzungen kaum, Dehnen verbessert die Beweglichkeit [Q32][Q33] | keine | Beibehalten (Projektvorgabe) |
| Morgenroutine | RAMP, keine belastete Beugung früh, CARs, Bedarfsmodul (Z. 498–536) | Bandscheiben sind morgens prall gefüllt und stärker belastet [Q34]. Zur CAR-Methode gibt es kaum Studien, sie ist aber unbedenklich | keine | — |

---

## Leitstand-Ideen I-08 bis I-13

| Idee | Urteil | Begründung |
|---|---|---|
| I-08 Progression | **ändern** | Double Progression existiert schon (`target()`). Was fehlt, ist Feinschliff: relative Gewichtssprünge, Wechsel der Körpergewichtsvariante per Tipp, Stillstand → leichter neu aufbauen (V7) |
| I-09 Tagesform | **bestätigen (schlank)** | Ein Tipp vor dem Start, keine drei Fragen. Gamification bleibt passiv (V8) |
| I-10 Verpasste Einheiten | **verwerfen** | Ist durch die Rotation nach „am längsten her“ und den Zyklus nach Trainingswochen schon gelöst. Rest in V2 (Pausenschwelle) und I-06 (Comeback-Hinweis) |
| I-11 Laufplan | **ändern** | Statt starrer 10 %-Regel: Wochen-km, Warnung bei sprunghafter Steigerung, 80/20-Verteilung, echter Long Run für Fokus `run` (V6) |
| I-12 Gesamtbelastung | **bestätigen** | sRPE × Dauer inkl. Kickboxen, Deload-Vorschlag bei hoher Last, Ruhetag (V5). Keine harten ACWR-Grenzen |
| I-13 Aufwärmsätze | **bestätigen, Prio hoch** | Zusammen mit Bein-Warm-up. Betrifft vor allem die Partnerin (Hip Thrust, RDL, Kniebeuge) (V4) |

---

## Priorisierte Auftragsvorschläge (je 1–2 h)

1. **V1 – Beine 2× pro Woche absichern** (`recAll`, `S0`, `postBlocks`)
   - Kompakter Beinblock (LEGMINI) in KA oder KB, sobald KC länger als 7 Tage her ist (nicht erst bei `lowFreq`).
   - Bei Schwerpunkt `lower`/`glutes` ersetzt CH das KC nicht mehr.
   - Nutzen Captain: Beinkraft für Kicks und Laufen, aus 0–5 werden ≥ 10 Sätze pro Woche.
   - Nutzen Partnerin: Der Beintag kommt tatsächlich öfter, wie im Onboarding versprochen.
   - Test: Simulation mit ≥ 2 Beinkontakten pro Woche und ≥ 10 Unterkörper-Sätzen.
2. **V2 – Glute-Anker statt Voll-Rotation** (`EMB`, `target`)
   - Pro Einheit eine feste Anker-Übung, abwechselnd Hip Thrust und RDL/Split Squat, dazu 1 rotierende Übung.
   - Rückschritt nach Pause erst ab 14 statt 10 Tagen.
   - `LOWB()` entfernen.
   - Nutzen Partnerin: Die Schlüsselübungen wachsen stetig, statt alle 2 Wochen zurückgesetzt zu werden.
3. **V3 – Dauerschätzung und 90-Minuten-Deckel** (`S`, `vTrain`)
   - Geschätzte Minuten in der Kopfzeile.
   - Über 90 min werden der Reihe nach gekürzt: Favoriten auf 2, Schwerpunkt auf 2 Runden, Tabata auf die Mini-Fassung.
   - Nutzen Captain: KA/KB/KC liegen heute geschätzt bei 80–102 min, danach im Rahmen der Projektvorgabe.
4. **V4 – Bein-Warm-up und Ramp-up-Sätze** (I-13; `WARM`, `itemHTML`)
   - Warm-up-Variante für Hüfte/Knie/Sprunggelenk an KC und bei Unterkörper-Schwerpunkt.
   - Bei `w`-Übungen ab 20 kg Zielgewicht eine Zeile „Warm-up sets: 50 % × 8 · 70 % × 4 · 85 % × 2“. Nur Anzeige, keine Pflichtfelder.
   - Nutzen: Beide, vor allem die Partnerin bei Hip Thrust, RDL und Kniebeuge.
5. **V5 – Gesamtbelastung sRPE** (I-12; `savekick`, `saveTrain`, `saveRun`, `statsHTML`, `recAll`)
   - Dauerfeld mit Vorgaben: KI 90, Kraft aus V3, Lauf aus min.
   - Wochenlast = RPE × min in der Statistik.
   - Bei Last > 1,5 × 4-Wochen-Schnitt und ≥ 2 Einheiten mit RPE 10: Deload-Vorschlag.
   - Option „1 rest day per week“.
   - Migration: Alte Logs ohne `min` bekommen Schätzwerte.
   - Nutzen Captain: Kickboxen (2 × 90 min) zählt endlich mit.
6. **V6 – Laufsteuerung** (I-11; `recAll`, `runInfo`, `saveRun`, Statistik)
   - Wochen-km als Diagramm.
   - Gewichtung so, dass höchstens jeder 3. Lauf hart ist.
   - Fokus `run`: RH wird ein echter Long Run (locker, +10 % Dauer, wenn es leicht war).
   - Hinweis, wenn die Wochen-km > 30 % über dem 4-Wochen-Schnitt liegen.
   - Nutzen: Beide, weniger harte Läufe bei gleichem Fortschritt.
7. **V7 – Progression Feinschliff** (I-08; `target`, `saveTrain`)
   - Gewichtssprung ≈ 5 % (mindestens 0,5 kg, gerundet).
   - Tipp „Next variation“ am oberen Ende.
   - Nach 3× Stillstand: −10 % Last oder −2 Wdh., dann neu aufbauen.
   - Nutzen: Beide. Kleine Isolationsübungen (Seitheben, Kickbacks) springen nicht mehr um 30–50 %.
8. **V8 – Tagesform-Tipp** (I-09; `vTrain`, `rounds`)
   - Vor dem Start eine Leiste gut / normal / müde.
   - „Müde“: niedrige Runden, keine Favoriten- und Schwerpunkt-Zusatzblöcke, Hinweis „no reps to failure“.
   - Ohne Tipp bleibt alles wie bisher.
   - Nutzen: Beide, weniger Einheiten an der Grenze bei schlechtem Schlaf.
9. **V9 – Harte-Tage-Regeln konsistent** (`recAll`, ~1 h)
   - Leitstand entscheidet, ob KA/KB am Kickbox-Vortag erlaubt bleiben.
   - Falls nein: dort nur die kurze Fassung oder SK.
   - Dazu ein Test für die Regel.
   - Nutzen Captain: frischer zum Kickboxen.

Empfohlene Reihenfolge: V1 → V2 → V3 → V4 → V5. V6 bis V9 sind unabhängig.

---

## Quellen

- [Q1] Currier BS, D'Souza AC, Singh MAF, et al. ACSM Position Stand: Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews. *Med Sci Sports Exerc* 2026.
- [Q2] Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis. *J Sports Sci* 2017;35(11):1073–1082.
- [Q3] ACSM. Position Stand: Progression models in resistance training for healthy adults. *Med Sci Sports Exerc* 2009;41(3):687–708.
- [Q4] Pelland JC, Remmert JF, Robinson ZP, Hinson SR, Zourdos MC. The resistance training dose response: meta-regressions exploring the effects of weekly volume and frequency on muscle hypertrophy and strength gains. *Sports Med* 2026;56(2):481–505.
- [Q5] Schoenfeld BJ, Ogborn D, Krieger JW. Effects of resistance training frequency on measures of muscle hypertrophy: a systematic review and meta-analysis. *Sports Med* 2016;46(11):1689–1697.
- [Q6] Grgic J, Schoenfeld BJ, Davies TB, et al. Effect of resistance training frequency on gains in muscular strength: a systematic review and meta-analysis. *Sports Med* 2018;48(5):1207–1220.
- [Q7] Schoenfeld BJ, Grgic J, Krieger J. How many times per week should a muscle be trained to maximize muscle hypertrophy? *J Sports Sci* 2019;37(11):1286–1295.
- [Q8] Plotkin D, Coleman M, Van Every D, et al. Progressive overload without progressing load? The effects of load or repetition progression on muscular adaptations. *PeerJ* 2022;10:e14142.
- [Q9] Bell L, Strafford BW, Coleman M, Androulakis Korakakis P, Nolan D. Integrating deloading into strength and physique sports training programmes: an international Delphi consensus approach. *Sports Med Open* 2023;9:87.
- [Q10] Coleman M, Burke R, Augustin F, et al. Gaining more from doing less? The effects of a one-week deload period during supervised resistance training on muscular adaptations. *PeerJ* 2024;12:e16777.
- [Q11] Zourdos MC, Klemp A, Dolan C, et al. Novel resistance training-specific RPE scale measuring repetitions in reserve. *J Strength Cond Res* 2016;30(1):267–275.
- [Q12] Helms ER, Cronin J, Storey A, Zourdos MC. Application of the repetitions in reserve-based rating of perceived exertion scale for resistance training. *Strength Cond J* 2016;38(4):42–49.
- [Q13] Saw AE, Main LC, Gastin PB. Monitoring the athlete training response: subjective self-reported measures trump commonly used objective measures. *Br J Sports Med* 2016;50(5):281–291.
- [Q14] Bosquet L, Berryman N, Dupuy O, et al. Effect of training cessation on muscular performance: a meta-analysis. *Scand J Med Sci Sports* 2013;23(3):e140–e149.
- [Q15] Buist I, Bredeweg SW, van Mechelen W, et al. No effect of a graded training program on the number of running-related injuries in novice runners: a randomized controlled trial. *Am J Sports Med* 2008;36(1):33–39.
- [Q16] Nielsen RO, Parner ET, Nohr EA, et al. Excessive progression in weekly running distance and risk of running-related injuries. *J Orthop Sports Phys Ther* 2014;44(10):739–747.
- [Q17] Damsted C, Glad S, Nielsen RO, Sørensen H, Malisoux L. Is there evidence for an association between changes in training load and running-related injuries? A systematic review. *Int J Sports Phys Ther* 2018;13(6):931–942.
- [Q18] Seiler S. What is best practice for training intensity and duration distribution in endurance athletes? *Int J Sports Physiol Perform* 2010;5(3):276–291.
- [Q19] Stöggl T, Sperlich B. Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training. *Front Physiol* 2014;5:33.
- [Q20] Foster C, Florhaug JA, Franklin J, et al. A new approach to monitoring exercise training. *J Strength Cond Res* 2001;15(1):109–115.
- [Q21] Haddad M, Stylianides G, Djaoui L, Dellal A, Chamari K. Session-RPE method for training load monitoring: validity, ecological usefulness, and influencing factors. *Front Neurosci* 2017;11:612.
- [Q22] Impellizzeri FM, Woodcock S, Coutts AJ, et al. Acute to chronic workload ratio: conceptual issues and fundamental pitfalls. *Int J Sports Physiol Perform* 2020;15(6):907–913.
- [Q23] Kellmann M, Bertollo M, Bosquet L, et al. Recovery and performance in sport: consensus statement. *Int J Sports Physiol Perform* 2018;13(2):240–245.
- [Q24] Wilson JM, Marin PJ, Rhea MR, et al. Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises. *J Strength Cond Res* 2012;26(8):2293–2307.
- [Q25] Schumann M, Feuerbacher JF, Sünkeler M, et al. Compatibility of concurrent aerobic and strength training for skeletal muscle size and function: an updated systematic review and meta-analysis. *Sports Med* 2022;52(3):601–612.
- [Q26] Fradkin AJ, Zazryn TR, Smoliga JM. Effects of warming-up on physical performance: a systematic review with meta-analysis. *J Strength Cond Res* 2010;24(1):140–148.
- [Q27] McCrary JM, Ackermann BJ, Halaki M. A systematic review of the effects of upper body warm-up on performance and injury. *Br J Sports Med* 2015;49(14):935–942.
- [Q28] Ribeiro AS, Romanzini M, Schoenfeld BJ, et al. Effect of different warm-up procedures on the performance of resistance training exercises. *Percept Mot Skills* 2014;119(1):133–145.
- [Q29] Plotkin DL, Rodas MA, Van Every DW, et al. Hip thrust and back squat training elicit similar gluteus muscle hypertrophy and transfer similarly to the deadlift. *Front Physiol* 2023;14:1279170.
- [Q30] Roberts BM, Nuckols G, Krieger JW. Sex differences in resistance training: a systematic review and meta-analysis. *J Strength Cond Res* 2020;34(5):1448–1460.
- [Q31] Dabbs NC, Binkley H, Bott C, et al. NSCA Position Statement on Strength and Conditioning of Female Athletes. Part II: Training Adaptations and Program Design. *J Strength Cond Res* 2026 (online 12.06.2026).
- [Q32] Van Hooren B, Peake JM. Do we need a cool-down after exercise? A narrative review of the psychophysiological effects and the effects on performance, injuries and the long-term adaptive response. *Sports Med* 2018;48(7):1575–1595.
- [Q33] Herbert RD, de Noronha M, Kamper SJ. Stretching to prevent or reduce muscle soreness after exercise. *Cochrane Database Syst Rev* 2011;(7):CD004577.
- [Q34] Adams MA, Dolan P, Hutton WC. Diurnal variations in the stresses on the lumbar spine. *Spine* 1987;12(2):130–137.

