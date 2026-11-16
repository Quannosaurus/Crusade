# Personalisierungs-Konzept: Plan-Engine auf den Nutzer zuschneiden (A-016)

Stand: 2026-11-16 · Basis: Commit `3f8980c`, `src/app.js` · Nur Bericht, kein App-Code geändert.
Vorarbeit: `docs/training-audit.md` (A-005). Quellen [Q1]–[Q34] stammen von dort und werden hier mit denselben Nummern
weiterverwendet. Neue Quellen beginnen bei [Q35].

## Kurzfassung

- Die Plan-Engine ist heute **regelbasiert und nutzt den Verlauf**: Sie wählt nach „am längsten her“, sperrt harte Tage und steigert pro Übung.
  Sie hat aber **kein Ziel**: Der Plan kennt nur Fokus, Schwerpunkt, Skills und Favoriten.
- **Die 5 größten Lücken:**
  1. Es gibt kein Ziel im Datenmodell.
  2. Der Skill Trial speichert keine Werte und entfällt bei `lower`/`glutes` ganz.
  3. Es gibt keine Gesamtlast: Kickboxen und Krafttraining werden ohne Dauer geloggt.
  4. Das Volumen wird nicht aus der Historie gesteuert.
  5. Pausen und Verletzungen werden nur für Handgelenk, Schulter und Ellbogen behandelt.
- **Zielbild:** Ein Ziel mit einem Tipp, optional mit Datum.
  - Das Ziel verschiebt Auswahl, Volumen und Prüfrhythmus.
  - Die Einstufung erneuert sich aus Tests und Logs.
  - Volumen und Gesamtlast werden aus der Historie geführt.
  - Alle Zusatzfunktionen sind per Default aus.
- **8 Aufträge (P-1 bis P-8)**, Ziele zuerst. Sie decken alle freigegebenen Punkte ab: Ziele, V5, V6, V7, V8, I-27, I-25.

---

## 1. Ist-Stand: Welche Eingaben nutzt die Plan-Engine?

### 1.1 Eingaben → Funktionen → Wirkung

| Eingabe (Datenfeld) | Wo gelesen | Wirkung auf Auswahl | Wirkung auf Umfang | Wirkung auf Steigerung |
|---|---|---|---|---|
| Onboarding-Werte `D.profile` (pull, dips, push, expl, negmu, mu, hang, tuck, lsit, hollow, hsw, hsf, pike, flSt, plSt); Startpunkt `STARTP` | `lvl()`, `curVar()` (über `it.lv`), `MUB()`, `hsStage()`/`HSB()`, `lsKey()`/`LSIT()`, `FLB()`/`PLB()` (`it.def` aus `flSt`/`plSt`) | Variante pro Übung (Startvariante nach Level), Muscle-up-Block (Basis/Skill/Pro), Handstand-Stufe, L-Sit-Variante | `isoP()` setzt Sätze × Sekunden der Halteübungen aus dem Maximalwert | Halteübungen passen `D.profile[iso]` in `saveTrain()` selbst an; FL/PL steigen die Stufe automatisch (`saveTrain()`, `fl_h`/`pl_h`) |
| Level `lvl()` (Basic/Intermediate/Advanced aus pull/dips/mu) | `S0()` (KA: „Base strength“ vs. „Explosive strength“), CH-EMOM, `rounds()`, `curVar()` | andere Blöcke und Startvarianten | `rounds()`: Basic → immer niedrige Rundenzahl | – |
| Fokus `D.focus` (bal/str/run) | `recAll()` (Gewichte `W`, Mindestabstand `mS`), `easyPick()`, `runRec()`, `runInfo()`, `areaTargets()` | welche Einheit empfohlen wird; `str` ohne Läufe | Lauftext/-dauer (`runInfo`) | `saveRun()`: Deckel 10 km bzw. 16 km bei `run` |
| Schwerpunkt `D.emph` (bal/lower/glutes/upper/core) | `EMB()`, `ANCH`, `postBlocks()`, `recAll()`, `ctx()`, `legDay()` | Zusatzblock pro Krafteinheit, feste Anker-Übung (`it.anc`); KC-Gewicht +3; CH wird bei `lower`/`glutes` nie empfohlen (`kcId`, s. 1.3) | Oberkörper-Circuit −1 Runde (`postBlocks`); Bein-Warm-up (`LEGWARM`) | Anker kehrt jede Einheit wieder → `target()` greift stetig |
| Skills `D.skills` (hs, mu, ls, fl, pl) | `selSk()`, `skillPlan()`/`skBlocks()`, `postBlocks()`, `hist()` (`skT`), `easyPick()`/`skPick()` | Skill-Blöcke rotieren nach `skLast()`; abgewählte Skills filtern Blöcke/Übungen | Wochenziel 4 Skill-Kontakte (`h.skT`) | – |
| Favoriten `D.fav` | `postBlocks()` (`it.def`), `FAVB()`, `capDur()` | Lieblingsvariante wird Standard; Block „★ Your favourites“ (max. 4, rotierend) | wird bei > 90 min zuerst gekürzt | eigene Historie pro Favorit (`fav_`-Schlüssel) |
| Ausrüstung `D.loc`, `D.home`, `EQ` | `can()`, `avail()`, `curVar()`, `recTrain()`, `postBlocks()` (HO/HK-Extras) | Gym vs. Zuhause (HO/HK), nur verfügbare Varianten | – | Historie je Variante (`D.ex[k#v]`) |
| Kickboxtage `D.kickDays` | `isKick()`, `recAll()`, `runRec()`, `postBlocks()` („Kickboxing power“), `areaTargets()` | KI am Kicktag; am Vortag kein KC/RH/RI (`kickT`, `hardOK`) | – | – |
| Logs `D.logs` (d, id, rpe, ex, lg, sk, km, min, tv) | `since()`, `hist()`, `ctx()`, `recAll()`, `recTrain()`, `EMB()` (Rotation über `cnt`), `FAVB()` (Versatz), `homeB()`, `skLast()`, `legLog()` | Rotation „am längsten her“ (`cap()`, `sc=wt*cap(since)/7`); Sperren `strY`, `rhY`, `limitY`, `hardRun`, `lim7`; Ruhetag nach 3× RPE 10 | – | – |
| RPE (4/6/8/10, `rpeHTML()`) | `hist()`, `rounds()`, `saveTrain()`, `saveRun()` | leichter Tag nach RPE 10 (`limitY`); harte Serie zählt ab RPE 6 | `rounds()`: letzte gleiche Einheit mit RPE 10 → niedrige Runden | RPE 10 → `hold` (Ziel bleibt); Lauf: RH +0,5 km bei RPE 4, RI +1 bei RPE ≤ 6 |
| Übungsstand `D.ex[k#v]` (r, w, d, hold, stall) | `target()`, `saveTrain()`, `insights()` | – | – | Double Progression; Pause ≥ 14 Tage −1 Stufe, > 28 Tage −2; `stall` ≥ 3 → Hinweis |
| Tests `TE`, `T(...)`-Übungen | `saveTrain()` (Zweig `it.test`) | – | – | schreibt `D.profile[...]` direkt → neue Einstufung über `lvl()` |
| Zyklus `ctx()` (week, cyc, phase) | `recAll()` (cyc 6 = DL/TE), `S0()` (KA/KB je `phase`), `rounds()` | Deload-Woche alle 6 Trainingswochen; Phase 1/2 mit anderen Blockfolgen | Woche 1–2 eines Blocks → niedrige Runden | – |
| Beinfrequenz `ctx().legB`, `legSets()`, Log-Feld `lg` | `S0()` (`LEGMINI` in KA/KB/CH), `saveTrain()` | kompakter Beinblock, wenn KC > 7 Tage her oder < 2 Beineinheiten in der Woche (nicht bei `lower`/`glutes`) | +2 Übungen × 3 Sätze | – |
| Anker `ANCH` | `EMB()` | feste Schlüsselübung je Einheitstyp | Teil des Schwerpunktblocks, bleibt bei Kürzung | stetige Progression (A-009) |
| „Limited time“ `D.short` | `vTrain()`, `estMin()`, `legSets()`, `rounds()`, `absFor()` | Blöcke mit `p>1` entfallen | niedrige Runden, Core Blitz Mini | – |
| Schmerz `D.pain` (w/s/e) | `painHit()`/`PAINRX`, `vTrain()` (`REHAB`), `saveTrain()` | betroffene Übungen fallen weg, Reha-Block kommt dazu | – | ausgeblendete Übungen erzeugen keinen Stillstand |
| Dauer (A-010) | `capDur()`, `estMin()`, `blockSec()` | Kürzungsreihenfolge bei > 90 min | `s.min`, `s.cut` | – |
| Laufwerte `D.runKm`, `D.runI` | `runInfo()`, `saveRun()` | – | Länge RH, Wiederholungen RI | pro Einheit nach RPE |

### 1.2 Wie die Entscheidung heute abläuft

1. `vStart()` ruft `recAll(TODAY)`:
   - Kicktag schlägt alles.
   - Danach greifen die Erholungsregeln (`rhY`, `limitY`, `lim7`, `hardRun`) und die Deload-Woche (`c.cyc===6`).
   - Sonst gewinnt die Einheit mit dem höchsten Wert aus Gewicht × Tage seit der letzten Einheit (`add()`).
2. `trainId()`/`recTrain()` übersetzen das in Gym (KA/KB/KC/CH/SK/RS) oder Zuhause (HO/HK).
3. `S(id, ctx)` baut die Einheit:
   - `S0()` liefert die Blöcke nach Level und Phase.
   - `postBlocks()` filtert nach Skills, hängt Schwerpunkt und Favoriten an und setzt Cool-down.
   - Dazu kommen Bein-Warm-up (`legDay()`) und Kürzung auf 90 min (`capDur()`).
4. Jede Übung bekommt ihr Ziel aus `target()` (letzter Wert, Pause, Stillstand).
5. Nach dem Loggen (`saveTrain()`/`saveRun()`/`savekick`) wirken RPE und Werte auf den nächsten Tag zurück.

### 1.3 Befunde, die für die Personalisierung zählen

- **Kein Ziel.** Es gibt kein Feld, das „ich will Muscle-up“ oder „10 km“ ausdrückt.
  - Skills sind An/Aus-Schalter mit gleichem Gewicht (`skillPlan()` sortiert nur nach Pause).
  - Kraft- und Laufziele existieren nicht.
- **Skill Trial ohne Daten.** CH besteht nur aus `F`-Übungen (`S0` case `"CH"`). `saveTrain()` überspringt `it.f`, also landen keine Werte im Stand.
  - Die Einstufung erneuert sich nur über TE (alle 6 Trainingswochen) oder per Hand in `vStand()`.
- **Skill Trial fällt bei `lower`/`glutes` weg.** In `recAll()` gilt `kcId=(!lowE&&h.CH>=13&&h.KC<h.CH)?"CH":"KC"`.
  - Mit Unterkörper-Schwerpunkt wird CH nie empfohlen.
  - `recTrain()` kennt als Ersatz nur KA/KB/KC. → I-27.
- **Keine Dauer, keine Last.**
  - `savekick` loggt nur RPE.
  - `saveTrain()` schreibt `s.min` nicht ins Log, obwohl `capDur()` den Wert kennt.
  - Nur Läufe haben `min`, und `cleanImport()` erlaubt `min` bereits.
- **Volumen nicht aus Historie.**
  - `rounds()` kennt nur Zykluswoche, „Limited time“, Level und RPE 10 der letzten gleichen Einheit.
  - Sätze pro Muskelgruppe werden nicht geloggt. `areaCounts()` zählt Einheiten, keine Sätze.
- **Laufsteuerung pro Einheit.**
  - Steigerung nur in `saveRun()`.
  - Keine Wochen-km, kein langer Lauf mit eigener Logik (`runInfo()` beschreibt RH als „hard“).
- **Pause/Verletzung schmal.**
  - Pausen wirken nur indirekt: `ctx()` zählt nur Trainingswochen, `target()` stuft nach ≥ 14/> 28 Tagen zurück.
  - Schmerz gibt es nur für Handgelenk, Schulter und Ellbogen.
  - `D.pain` wird beim Import nicht übernommen (`cleanImport()` kennt das Feld nicht). Das ist unkritisch, aber bewusst zu entscheiden.
- **Kleinigkeit:** Der Doktrin-Text in `vMehr()` sagt „After more than 10 days off“. `target()` stuft seit A-009 erst ab 14 Tagen zurück. → Text in P-7 angleichen.
- **Minimal-Tage und Pausenregel:** `target()` misst die Pause pro Variante (`D.ex[k#v].d`).
  - Wer zwei Wochen nur mit Minimal-Ausrüstung trainiert, wird bei der Gym-Variante zurückgestuft, obwohl das Bewegungsmuster weiterlief.
  - Das betrifft A-019 und P-5.

---

## 2. Forschungsstand (kompakt, mit Folgerung für die App)

| Thema | Befund | Folgerung für Crusade |
|---|---|---|
| Individuelles Ansprechen | Zuwächse an Muskelgröße und Kraft streuen stark zwischen Personen, unabhängig von Alter und Geschlecht [Q43]. Kontinuität und progressive Überlastung bleiben die Kernvariablen [Q1] | Nicht nach Typ vorschreiben, sondern **messen und nachsteuern**: Fortschritt pro Ziel und Muster aus den Logs |
| Autoregulation (RPE/RIR) | Autoregulierte und standardisierte Lastvorgabe bringen ähnliche Kraftzuwächse [Q35]. RIR-basiertes RPE ist ein valides Steuermaß [Q11][Q12] | Die vorhandene Session-RPE reicht als Steuergröße. **Kein RIR pro Satz** (Aufwand). „1–2 Wdh. Reserve“ bleibt Text |
| Volumen pro Muskelgruppe | Dosis-Wirkung mit abnehmendem Zusatznutzen [Q2][Q4]. Ab einem gewissen Niveau genügt Halten des bisherigen Volumens [Q51]. Individuell +20 % gegenüber dem Gewohnten wirkte bei Trainierten besser als ein Standardvolumen [Q42] | **Bänder statt Fixwerte:** Zielmuster am oberen Bandende, Rest halten. Bei Stillstand und guter Erholung +1–2 Sätze (≈ +20 %) |
| Progression und Plateau | Steigern über Wdh. oder Last wirkt ähnlich [Q8]. Bei Stillstand: Last oder Variante wechseln, Ermüdung prüfen [Q3]. Kraft profitiert eigenständig von schweren Lasten [Q38] | Double Progression behalten (V7). **Plateau = 3 Prüfungen ohne Fortschritt im Zielwert** → eine konkrete Maßnahme vorschlagen |
| Belastungssteuerung | Session-RPE × Dauer ist valide und einfach [Q20][Q21], auch im Kampfsport [Q48]. Schlechte Laststeuerung ist ein Hauptrisiko für Verletzungen; sprunghafte Laständerungen meiden [Q40]. Feste ACWR-Grenzen sind methodisch umstritten [Q22] | V5: Wochenlast inkl. Kickboxen, Vergleich mit dem eigenen 4-Wochen-Schnitt, **nur Hinweis**, keine harte Ampel |
| Laufumfang und Intensität | Starre 10 %-Regel ohne Effekt [Q15]; > 30 % Steigerung in 2 Wochen mit Verletzungen verbunden [Q16][Q17]. Viel locker, wenig hart [Q18][Q19]; bei Freizeitläufern tendenziell vorteilhaft [Q44] | V6: Wochen-km, Hinweis ab +30 % gegenüber dem 4-Wochen-Schnitt, höchstens jeder 3. Lauf hart, echter langer Lauf |
| Taper vor einem Datum | 2 Wochen, Volumen −41–60 %, Intensität und Häufigkeit gleich [Q50] | Ziel mit Datum (Lauf und Kraft): letzte 1–2 Wochen weniger Umfang, gleiche Intensität, Test am Ziel-Tag |
| Einstufung und Re-Test | Schätzungen aus Wiederholungen bis Ermüdung sind bei < 10 Wdh. brauchbar, aber übungsabhängig ungenau [Q49]. Deload/Test alle 4–8 Wochen ist üblich [Q9] | Neu-Einstufung **aus Tests (TE, Skill Trial)**, aus Logs **nur nach oben** und nur für Muster-Varianten. Keine 1RM-Formeln in der UI |
| Zielsetzung | Zielsetzung erhöht körperliche Aktivität mit mittlerem Effekt, auch bei vage formulierten Zielen [Q36]. Offene Ziele („so gut wie möglich“) sind für Einsteiger eine ernsthafte Alternative zu starren Leistungszielen [Q37] | **Ein Tipp genügt** („Muscle-up“). Zahl und Datum optional. Ohne Datum offenes Ziel mit passiver Fortschrittsanzeige |
| Skill-Erwerb | Verteiltes Üben schlägt geballtes Üben, besonders bei motorischen Aufgaben [Q46]. Skills verblassen bei längeren Pausen (App-Doktrin, `insights()`) | Skill-Ziel = **häufige, kurze Kontakte** (3–5/Woche, frisch zu Beginn der Einheit), nicht ein langer Block |
| Wiedereinstieg nach Pausen | Kraft bleibt bei Trainierten ~3 Wochen weitgehend erhalten [Q14]. Wiederaufbau nach Pause gelingt zügig; die zelluläre „Muskel-Erinnerung“ ist beim Menschen nicht abschließend belegt [Q41] | Pause ≤ 14 Tage: weiter wie geplant. Länger: **Comeback-Woche** (niedrige Runden, Stufe zurück wie heute), keine Tests in der ersten Woche |
| Verletzung | Weiterbelasten nach Schmerzmonitoring (Schmerz ≤ 5/10, am nächsten Morgen zurück auf Ausgangsniveau) war bei Achillessehnen-Beschwerden nicht schlechter als Pause [Q45] | Verletzungsmodus = **betroffene Region schonen, Rest weiter trainieren**, Schmerzregel als Text, bei Anhalten Arzt |
| Wenig Ausrüstung | Hypertrophie ist bei Training bis nahe Muskelversagen weitgehend lastunabhängig, Maximalkraft profitiert von hohen Lasten [Q38] | Minimal-Tage (A-019): höhere Wdh., näher an Ermüdung (1–2 Wdh. Reserve). Kraftziele in kg gelten nicht als Stillstand an diesen Tagen |
| Tagesform-Abfragen | Subjektive Werte zeigen Belastungsreaktionen empfindlicher als objektive Marker [Q13]. Bei selbstgesteuerten Sportlern ist die Treue gering (28 ± 40 %), geringer Aufwand ist entscheidend [Q47] | V8: **1 Tipp**, per Default aus, ohne Tipp ändert sich nichts |
| Frauen/Männer | Relativ gleiche Zuwächse, keine eigene Verschreibung nötig [Q30][Q31][Q43]. Menstruationszyklus: allenfalls triviale Leistungsunterschiede, Evidenz niedrig, individuelles Vorgehen empfohlen [Q39] | **Keine geschlechtsspezifischen Regeln, keine Zyklus-Automatik.** Die optionale Tagesform deckt individuelle Schwankungen ab |
| Gleichzeitiges Kraft- und Lauftraining | Kompatibel für Muskelgröße, Explosivkraft leidet eher [Q25] | Lauf- und Skill-Ziel gleichzeitig ist machbar, aber die Prioritäten konkurrieren → 1 aktives Ziel (Abschnitt 3.5) |

---

## 3. Ziele-Konzept

### 3.1 Zielkatalog

Interne Schlüssel und Messgröße stammen aus vorhandenen Daten. Der Anzeigetext ist Englisch und gehört der App selbst.

| Art | Ziel (Anzeige) | Schlüssel | Messgröße (vorhanden) | Vorgabe ohne Zahl | Meilensteine (passiv) |
|---|---|---|---|---|---|
| Skill | Muscle-up | `mu` | `D.profile.mu` | 1 sauberer | 8 pull-ups (`pull`) → 5 explosive C2B (`expl`) → 3 negatives (`negmu`) → 1 muscle-up |
| Skill | Freestanding handstand | `hs` | `D.profile.hsf` (s) | 10 s | 30 s chest-to-wall (`hsw`) → 60 s → 5 s free → 10 s free |
| Skill | Front lever | `fl` | `D.profile.flSt` (Stufe) | Advanced Tuck | Stufen `FLN` |
| Skill | Planche | `pl` | `D.profile.plSt` | Tuck | Stufen `PLN` |
| Skill | L-sit | `ls` | `D.profile.lsit` (s) | 10 s | Tuck 15 s (`tuck`) → 5 s → 10 s |
| Kraft | Pull-ups ×X | `pull` | `D.profile.pull` | aktueller Wert + 5 (Basic: erster Klimmzug) | +1-Schritte |
| Kraft | Dips ×X / Push-ups ×X | `dips` / `push` | `D.profile` | aktuell + 5 / + 10 | +1-Schritte |
| Kraft | Squat / Hip thrust / RDL X kg | `sq` / `ht` / `rdl` | bestes Gewicht in `D.ex` (`c_sq`, `g_ht`, `g_rdl`, alle `w`-Varianten) | aktuell + 10 % (gerundet auf 2,5 kg) | Gewichtsschritte |
| Lauf | Run 5 km / 10 km / 21 km | `d5` / `d10` / `d21` | `D.pr["run:long"].km` | Distanz schaffen | längster Lauf in 20-%-Schritten |
| Lauf | 5 km / 10 km under X min | `t5` / `t10` | neu: `D.pr["run:t5"]`/`["run:t10"]` (beste Zeit über ≥ Distanz) | aktuelle Zeit − 5 % | Zeit-Schritte |

### 3.2 Einstieg mit einem Tipp

- **Onboarding, Schritt 2** (bei Fokus/Schwerpunkt): Chip-Reihe „Your goal (optional)“ mit Muscle-up · Handstand · Front lever · Pull-ups · Strong legs · Run 5 km · Run 10 km · „No goal yet“.
- Ein Tipp setzt das Ziel mit der Vorgabe aus 3.1. Die Startwerte kommen aus `STARTP`/`D.profile` bzw. aus `D.ex`.
- **Feinheiten** sind aufklappbar („Adjust“, `details`): Zielwert, optionales Datum, Ziel löschen. Ohne Aufklappen ist das Ziel fertig.
- **Später:** Abschnitt „Goal“ unter „More“ und auf der Status-Seite (`vStand()`). Dort gibt es auch den Wechsel auf ein anderes Ziel.
- Skill-Ziele schalten den passenden Skill in `D.skills` automatisch ein. Ein Hinweis zeigt das an.

### 3.3 Wie ein Ziel den Plan verschiebt

| Ebene | Skill-Ziel | Kraft-Ziel (Wdh./kg) | Lauf-Ziel |
|---|---|---|---|
| **Auswahl** | `skillPlan()` setzt den Ziel-Skill immer an Platz 1 und gibt ihm die längere Fassung (`longer`). Auf leichten Tagen bevorzugt `easyPick()` SK vor RS | Ziel-Übung wird zum **Ziel-Anker** (wie `ANCH`): steht früh in der Einheit (frisch), 2× pro Woche (KA/KB bzw. KC + Beinblock), wird von `capDur()` nie gekürzt | Mindestens 2 Läufe pro Woche auch bei Fokus `str`; 1 langer Lauf pro Woche; bei Zeitzielen 1 Intervall-/Tempolauf |
| **Volumen** | Mehr Skill-Kontakte: `h.skT` 4 → 5, kurze Blöcke (verteiltes Üben [Q46]); Stützübungen (MU: `expl`, Dips; HS: Pike/HSPU) am oberen Bandende | Zielmuster am oberen Ende des Satzbands (Abschnitt 5.3), übrige Muster halten [Q51] | Wochen-km steigen in Schritten ≤ 30 % gegenüber dem 4-Wochen-Schnitt [Q16]; langer Lauf +10 % nach leichtem Lauf |
| **Fokus** | bleibt; ein einmaliger Hinweis, falls Fokus `run` und Skill-Ziel | bleibt | Hinweis mit einem Tipp, falls Fokus `str`: „Switch focus to Runner?“ Ohne Wechsel greift nur die Mindestregel |
| **Prüfung** | Skill Trial alle 2 Wochen enthält den Ziel-Test (speichert Werte, P-3) | Skill Trial bzw. TE prüft das Ziel-Muster | Bestwerte aus `saveRun()` (längster Lauf, Zeit über Distanz) |

**Priorität in der 60–90-min-Gestaltung (A-013), Vorschlag für die Doktrin:**
Warm-up, Cool-down, Anker, nötiger Beinblock > **Ziel-Anker/Ziel-Skill** > Favoriten, Schulterprävention > reines Zubehör.
Diese Einordnung entscheidet der Captain.

### 3.4 Mit und ohne Datum

- **Ohne Datum (Standard):** offenes Ziel.
  - Die Fortschrittsanzeige läuft passiv mit.
  - Die Prüfung erfolgt im normalen Rhythmus (Skill Trial alle 2 Wochen, TE in der Deload-Woche).
  - Kein Countdown, keine Erinnerungen.
- **Mit Datum:**
  - **Zeitachse:** Die letzte Trainingswoche vor dem Datum wird leicht (Volumen −40–60 %, Intensität gleich [Q50]). Am Ziel-Tag oder kurz davor steht ein Test (Lauf: der Lauf selbst; Skill/Kraft: TE- bzw. Skill-Trial-Tag). Fällt eine Deload-Woche (`c.cyc===6`) in die letzten 10 Tage, ersetzt der Taper sie.
  - **Lauf-Ziel:** Der lange Lauf erreicht 2–3 Wochen vor dem Datum seine Zielhöhe.
  - **Machbarkeit (passiv):** Aus den letzten 3 Prüfwerten wird der Trend fortgeschrieben. Anzeige „on course“ oder „tight“. Kein Druck, keine Planänderung allein deswegen.
  - **Nach dem Datum:** Das Ziel wird als „Fulfilled“ oder „Ended“ archiviert. Es gibt keine Strafe. Die App schlägt das nächste Ziel einmal vor.

### 3.5 Mehrere Ziele gleichzeitig? **Nein, genau 1 aktives Ziel.**

Begründung:

1. **Wirkung:** Der Effekt der Zielsetzung entsteht schon durch ein (auch vages) Ziel [Q36]. Weitere Ziele bringen keinen belegten Zusatznutzen.
2. **Konkurrenz:** Lauf- und Explosivkraft-/Skill-Ziele konkurrieren um Erholung [Q25]. Zwei Ziele machen die Priorität im 60–90-min-Rahmen unklar.
3. **Bedienung:** Ein Ziel ist ein Tipp. Mehrere Ziele brauchen Gewichtungen, und das widerspricht „schnell und einfach“.
4. **Rest ist abgedeckt:** Fokus, Schwerpunkt und Skills halten die übrige Balance, z. B. Partnerin: Schwerpunkt `lower` + Ziel „Run 5 km“.

Erreichte Ziele landen in einem Archiv (`D.goalsDone`) und erscheinen passiv als Ehrung („Vow fulfilled“). Gamification bleibt passiv.

### 3.6 Fortschrittsanzeige (passiv)

- **Start-Seite:** eine schmale Zeile unter dem Rang, z. B. „Goal: Muscle-up · step 2 of 4 · 4/5 explosive pull-ups“. Ein Tipp öffnet die Status-Seite.
- **Status-Seite:** Leiter der Meilensteine (SVG-Balken, CSP-konform) und Prüfwerte als Linie (`lineChart()`).
- Keine Pop-ups. Neue Meilensteine erscheinen wie Rekorde im Toast (`afterLog()`).

---

## 4. Lückenanalyse

| Bereich | Ist | Ziel | Lücke | Für 2 Nutzer ohne Backend realistisch? |
|---|---|---|---|---|
| Ziel | fehlt | 1 aktives Ziel, Katalog, Datum optional | groß | ja: wenige Felder in `D`, Logik lokal |
| Neu-Einstufung | nur TE (6-wöchig) und Handeingabe | TE + Skill Trial mit Werten + Logs (nur nach oben) | groß | ja |
| Skill Trial bei lower/glutes | entfällt (`kcId`) | alle 2 Wochen, ersetzt KA/KB statt KC | mittel | ja |
| Volumen aus Historie | `rounds()` ohne Historie | Satzbänder je Muster aus 7-Tage-Summe | groß | ja: Satzsummen im Log (`l.vs`), wenige Bytes |
| Gesamtlast | keine Dauer bei KI/Kraft | sRPE × min, Wochenlast, Hinweis | mittel | ja: Statistik aus den Logs |
| Laufsteuerung | pro Einheit | Wochen-km, Verteilung, langer Lauf, Taper | mittel | ja |
| Progression/Plateau | Double Progression, `stall`-Hinweis | relative Sprünge, Variantenwechsel per Tipp, Plateau am Zielwert | klein | ja |
| Tagesform | fehlt | 1 Tipp, per Default aus | klein | ja |
| Pause/Verletzung | indirekt; Schmerz nur w/s/e | Pausenmodus, Comeback-Woche, Regionen Knie/Rücken/Sprunggelenk/Hüfte | mittel | ja |
| Minimal-Ausrüstung | Gym/Zuhause | Tages-Schalter (A-019) | in Arbeit | ja; Pausenregel pro Muster (5.5) |
| Nicht realistisch / nicht gewollt | – | Sync, Uhr-Daten (Schlaf, HRV), Vergleich zwischen den Nutzern, Reise-Modus | – | **nein**: kein Backend, kein Sync (Doktrin) |

---

## 5. Zielbild

### 5.1 Modell der Plan-Engine

```
EINGABEN                         ENTSCHEIDUNGEN                                      WORKOUT
─────────                        ──────────────                                      ───────
Ziel (D.goal)          ┐   1. Tageslage    Pause? Verletzung? Kicktag? Tagesform?    Einheit (id)
Einstellungen          │                   (Pausen-/Verletzungsmodus, isKick, V8)
 Fokus, Schwerpunkt,   │   2. Erholung     strY/rhY/limitY/hardRun + Wochenlast (V5)  Blöcke in
 Skills, Favoriten,    ├─▶ 3. Auswahl      recAll: Gewicht × Tage seit + Ziel-        Prioritäts-
 Ausrüstung, Tages-    │                   Mindestregeln (Läufe, Skill-Kontakte,     reihenfolge
 Schalter              │                   Skill Trial 2-wöchig)                     (A-013)
Einstufung (profile,   │   4. Inhalt       S0 → postBlocks: Ziel-Anker/Ziel-Skill,
 lvl, Stufen)          │                   Schwerpunkt, Favoriten, Bein-Absicherung   Ziele je Übung
Leistung (D.ex, D.pr,  │   5. Umfang       Satzband je Muster (7-Tage-Summe aus l.vs) (target)
 Tests)                │                   → rounds(); Taper/Comeback/Tagesform       ≈ 60–90 min
Historie (D.logs:      │   6. Steigerung   target(): Double Progression, relative     Hinweise
 rpe, min, vs, km)     ┘                   Sprünge, Plateau → Maßnahme (V7)           (passiv)
                           7. Nach dem Log Einstufung ↑ aus Logs/Tests, Ziel-Fortschritt,
                                           Last, Lauf-km, Meilenstein-Toast
```

### 5.2 Entscheidungsregeln im Einzelnen

1. **Tageslage**
   - Pausenmodus aktiv: keine Empfehlung, nur „Paused until …“ mit einem Tipp „Resume“.
   - Verletzungsregion aktiv: betroffene Übungen und Einheiten fallen weg (Erweiterung von `PAINRX`/`painHit()`); bei Knie/Sprunggelenk keine Läufe.
   - Tagesform „tired“ (nur wenn eingeschaltet): wie heute nach RPE 10 → leichte Fassung.
2. **Erholung**
   - Bestehende Regeln bleiben.
   - Neu: Wochenlast > 1,5 × des eigenen 4-Wochen-Schnitts **und** ≥ 2 Einheiten mit RPE 10 in 7 Tagen → die Insight-Zeile schlägt eine leichte Woche vor (vorgezogener Deload, nur Vorschlag).
   - Option „Weekly rest day“ (Extras): höchstens 6 aktive Tage, der 7. ist Ruhe (Morgenroutine erlaubt) [Q23].
3. **Auswahl** (`recAll()`)
   - Gewichte wie heute, plus Ziel-Mindestregeln: Lauf-Ziel ≥ 2 Läufe pro Woche, davon 1 lang; Skill-Ziel ≥ 5 kurze Kontakte; Kraft-Ziel → die Ziel-Anker-Einheit 2× pro Woche.
   - **Skill Trial** alle 14 Tage für alle Schwerpunkte. Bei `lower`/`glutes` ersetzt er die fälligere von KA/KB, nie KC (I-27).
4. **Inhalt** (`S0()`/`postBlocks()`)
   - Ziel-Anker bzw. Ziel-Skill werden früh eingefügt und von `capDur()` geschützt.
   - Skill Trial: Inhalt aus Ziel und Skills (siehe 5.4) mit `T`-Übungen, damit Werte gespeichert werden.
5. **Umfang** (`rounds()`, siehe 5.3).
6. **Steigerung** (`target()`, V7)
   - Gewichtssprung ≈ 5 % (mind. 0,5 kg, gerundet auf 0,5/1/2,5 kg).
   - Am oberen Ende der Körpergewichts-Variante: Tipp „Next variation“ übernimmt die nächste Option.
   - `stall` ≥ 3: −10 % Last bzw. −2 Wdh. und neu aufbauen.
   - **Plateau am Zielwert:** 3 Prüfungen ohne Fortschritt → genau eine Maßnahme vorschlagen:
     - Wochenlast hoch → leichte Woche.
     - Last normal → Ziel-Muster +2 Sätze für 3 Wochen [Q42].
     - Dauerhaft keine Bewegung → Variantenwechsel.
7. **Nach dem Log**
   - `l.min`, `l.vs`, Tagesform `l.rd` speichern.
   - Neu-Einstufung nach oben (siehe 5.4).
   - Ziel-Fortschritt aktualisieren, Meilenstein-Toast über `afterLog()`.

### 5.3 Volumensteuerung aus der Historie

- `saveTrain()` speichert pro Log die direkten Arbeitssätze je Muster: `l.vs={pull,push,legs,hinge,core}`.
  - Grundlage ist dieselbe Zählung wie `legSets()` (Schlüssel-Mapping wie `LEGK`, erweitert um Zug-, Druck- und Core-Schlüssel).
  - `F`-, `T`- und `I`-Übungen zählen nicht.
- **Satzband pro Muster und 7 Tage** (Vorschlag, durch Feedback justierbar):

  | Muster ist … | Band (Sätze/7 Tage) | Begründung |
  |---|---|---|
  | Ziel- oder Schwerpunkt-Muster | 12–20 | oberer Bereich der Dosis-Wirkung [Q2][Q4] |
  | übrige Muster | 8–14 | Halten genügt oberhalb einer Schwelle [Q51] |
  | Beine (immer) | ≥ 10 | V1/A-009 |

- `rounds()` wählt die hohe Rundenzahl, wenn das Muster der Einheit in den letzten 7 Tagen **unter** dem Band liegt, und die niedrige, wenn es **darüber** liegt. Sonst gilt die heutige Regel (Zyklus, Level, RPE 10, „Limited time“).
  - Beispiel Captain: Oberkörper bisher 12–28 Sätze → Deckel bei ~20.
- **Individuelles Nachsteuern:** Steht das Ziel-Muster beim Plateau (5.2, Punkt 6) still und ist die Last normal, steigt sein Band für 3 Wochen um +2 Sätze. Danach gilt der alte Wert, außer der Fortschritt kam zurück.
- Der 60–90-min-Rahmen (A-013) bleibt die harte Grenze. Das Band verschiebt nur Runden innerhalb dieses Rahmens.
- **Umsetzung A-025:** Das Band wirkt auch über die Satzzahl je Übung (Schwerpunktblock, feste Satzzahlen; Untergrenze 2 Sätze, Anker zuletzt). Bei Level 0 senkt es nur. Der 60-min-Boden hat Vorrang: Reicht der Inhalt ohne Überschuss nicht für 60 min, darf das Band dort überschritten werden.

### 5.4 Neu-Einstufung aus Tests und Logs

- **Tests:** TE (Deload-Woche) wie heute.
  - **Skill Trial** bekommt `T`-Übungen für das Ziel und die aktiven Skills, z. B. MU: `expl`, `mu`; HS: `hsw`, `hsf`; FL-Stufe; Pull-ups.
  - Bei `lower`/`glutes` zusätzlich einen Unterkörper-Test mit vorhandenen Werten: Wdh. der Anker-Übung mit dem Arbeitsgewicht als `tv`-Eintrag.
  - Die Werte gehen über den bestehenden `it.test`-Zweig in `D.profile` und `l.tv`.
- **Logs (nur nach oben):** Übertrifft ein sauber geloggter Satz der Muster-Variante den Stand, wird `D.profile` angehoben. Beispiele: „Clean pull-ups“ > `pull`, „Parallel bar dips“ > `dips`.
  - Abwärts nie aus Logs, weil Ermüdung sonst die Einstufung drückt. Abwärts nur durch einen Test.
- `lvl()` bleibt abgeleitet. Ein Levelwechsel erscheint als Toast („Level up: Intermediate“). Es gibt keinen zusätzlichen Klick.

### 5.5 Gesamtbelastung, Laufsteuerung, Tagesform, Skill Trial, Pause, Minimal-Ausrüstung

- **Gesamtbelastung (V5)**
  - Jedes Log bekommt `min`: Kraft aus `s.min`, KI mit Vorgabe 90 (änderbar im Logformular), Lauf wie heute, MO/RS aus der Einheit.
  - Last = RPE × min. Die Statistik zeigt die Wochenlast als Balken (`barChart()`) neben dem 4-Wochen-Schnitt.
  - Hinweise nur als Insight-Zeile. Pausenwochen zählen nicht in den Schnitt, damit der Wiedereinstieg keinen Fehlalarm erzeugt.
- **Laufsteuerung (V6)**
  - Wochen-km in der Statistik.
  - Hinweis bei > 30 % über dem 4-Wochen-Schnitt.
  - Gewichte so, dass höchstens jeder 3. Lauf hart ist.
  - Fokus `run` oder Lauf-Ziel: RH wird ein echter langer Lauf (locker, +10 % Dauer nach „Easy“).
  - Mit Datum gilt der Taper (3.4). `runInfo()`-Texte passen dazu.
- **Tagesform (V8, per Default aus):** Wenn unter Extras eingeschaltet, zeigt die Trainingsseite oben eine Leiste mit good / normal / tired.
  - „tired“: niedrige Runden, keine Favoriten- und Schwerpunkt-Zusatzblöcke, Hinweis „no reps to failure today“.
  - Ohne Tipp ändert sich nichts.
  - Wert als `l.rd` im Log, damit die Statistik Muster zeigen kann (passiv).
- **Skill Trial (I-27):** alle 14 Tage für alle Schwerpunkte, bei `lower`/`glutes` anstelle von KA/KB. Inhalt aus Ziel und Skills, Werte werden gespeichert (5.4).
- **Pause/Verletzung (I-25)**
  - **Pausenmodus:** unter More „Pause training“ mit optionalem Enddatum und Grund (pause/ill). Er endet automatisch mit dem nächsten Log.
  - Bei ≥ 10 Tagen Pause folgt eine **Comeback-Woche**: die ersten 2 Krafteinheiten mit niedrigen Runden, keine Tests, keine harten Läufe in den ersten 3 Tagen. `target()` stuft wie heute zurück [Q14][Q41].
  - **Verletzungsmodus:** Erweiterung der Schmerzhaken um Knie, unterer Rücken, Sprunggelenk und Hüfte, je mit Filter und Reha-Block. Die Region bleibt aktiv bis „Healed“.
  - Text mit der Schmerzregel: ≤ 5/10, am nächsten Morgen wieder auf Ausgangsniveau [Q45]; hält es an, Arzt.
- **Minimal-Ausrüstung (A-019, nur Einordnung)**
  - Der Tages-Schalter setzt für `can()`/`avail()` eine Tages-Ausrüstung.
  - Empfehlung für die Engine: An Minimal-Tagen zählt `saveTrain()` keinen `stall` für kg-Ziele.
  - Die Pausenregel in `target()` misst ab P-5 die letzte Einheit **des Musters** (`it.k`, alle Varianten), nicht nur der Variante.
  - Höhere Wdh. nahe an Ermüdung halten den Reiz [Q38].

### 5.6 Datenmodell-Ergänzungen und Migration ohne Datenbruch

Alle Felder sind optional. `fresh()` liefert die Vorgaben, die bestehende Migrations-IIFE (`load`-Nachlauf, `Object.keys(f)`) füllt sie auf.
`cleanImport()` wird für jedes Feld per Whitelist und Typprüfung erweitert. `v` bleibt 3.

| Feld | Typ / Vorgabe | Zweck | Migration alter Daten |
|---|---|---|---|
| `D.goal` | `null` oder `{k, t, by, set, base}` (k aus Katalog, t Zahl, by `"YYYY-MM-DD"` oder `""`, set Datum, base Startwert) | aktives Ziel | fehlt → `null` (kein Ziel, alles wie heute) |
| `D.goalsDone` | `[]`, max. 50 × `{k, t, d, ok}` | Archiv, passive Ehrung | fehlt → `[]` |
| `D.opt` | `{ready:false, rest:false}` | Extras (Tagesform, Ruhetag), per Default aus | fehlt → Vorgabe |
| `D.pause` | `null` oder `{from, to, why}` | Pausenmodus | fehlt → `null` |
| `D.pain` | um `k`, `b`, `a`, `h` erweitert (bool) | Verletzungsregionen | fehlende Schlüssel → `false`. Entscheidung: weiter **nicht** importieren (gerätelokaler Tageszustand) |
| `l.min` | Zahl (bereits in `cleanImport()`) | Last | fehlt → Schätzwert aus Tabelle (KI 90, KA/KB/KC 75, CH 45, HO 50, SK 40, RS 16, MO 12, RE 35, RH `km×6.5`, RI 40), nur für Berechnungen, nicht ins Log geschrieben |
| `l.vs` | `{pull,push,legs,hinge,core}` Zahlen 0–60 | Satzbänder | fehlt → Schätzwert je Einheitstyp aus `AREA` (z. B. KC: legs 9, pull 6), nur für die ersten 4 Wochen relevant |
| `l.rd` | 1/2/3 | Tagesform | fehlt → keine Wirkung |
| `l.tv` | bestehend | Skill-Trial-Werte | – |
| `D.pr["run:t5"]`, `["run:t10"]` | `{min, d}` | Zeit-Ziele | fehlt → beim nächsten passenden Lauf angelegt |
| `day().ready` | 1/2/3 | Tagesform des Tages | `days` ist ohnehin nicht im Backup |

Backups ohne die neuen Felder laden unverändert. Backups mit den neuen Feldern laden in alten App-Versionen ebenfalls,
weil unbekannte Felder in `cleanImport()` verworfen werden. **A-014 (vollständiges Backup)** muss die neuen Felder in seine Größen- und Vollständigkeitsprüfung aufnehmen.

### 5.7 Bedienkonzept

- **Standardweg (unverändert kurz):** Start → empfohlene Karte → Training → Übungen abhaken → RPE → „Log training“. Das Ziel wirkt unsichtbar im Hintergrund. Sichtbar ist nur die Fortschrittszeile.
- **Ziel setzen:** 1 Tipp im Onboarding oder unter More → Goal. Zahl und Datum stehen hinter „Adjust“.
- **Extras (neu unter More, alles aus):** „Daily readiness check“ (V8), „Weekly rest day“ (V5). Jeder Schalter hat eine Zeile Erklärung.
- **Pause:** More → „Pause training“ (1 Tipp, optional Enddatum). Aufheben mit 1 Tipp auf der Start-Seite.
- **Verletzung:** in der Trainingsseite unter „Other session · pain“, wie heute, mit mehr Regionen.
- **Statistik:** Wochenlast und Wochen-km als passive Diagramme, Hinweise als Insight-Zeilen. Keine Ampel, kein Pop-up.
- **Wochenvorschau (A-015):** zeigt die durch das Ziel geänderten Einheiten automatisch, weil sie `recAll()` vorausrechnet. Keine eigene Logik nötig.
- **Themes:** Neue Wörter bekommen Vorgaben in `UIW`/`UIX`; das Plain-Theme bleibt ohne Warhammer-Begriffe. Vorschläge: „Goal“ (Plain) / „Vow“ (templar), „Pause training“ / „Stand down“, „Healed“ / „Wounds closed“.

---

## 6. Aufträge (priorisiert, je 1–2 h)

Reihenfolge: **P-1 → P-2 → P-3** (Ziele zuerst), dann **P-4 → P-6**, **P-5**, **P-7**, **P-8**. Start laut Marschplan nach Session 3 (A-015, A-019, A-020).
Konflikt-Zonen: `S()`/`capDur()` (A-013), `curVar()`/`can()` (A-019), Start/Backup (A-014). Testnummern vergibt der Leitstand (Vorschlag ab t30).

### P-1 Ziele I: Datenmodell, Auswahl mit einem Tipp, passive Fortschrittsanzeige (I-ZIEL)

- **Ziel:** Ein Ziel lässt sich mit einem Tipp setzen und ist sichtbar. Der Plan bleibt noch unverändert.
- **Umfang:**
  - `D.goal`/`D.goalsDone` in `fresh()`, Migration, `cleanImport()`.
  - Zielkatalog `GOALS` mit Messgröße und Vorgabe (3.1).
  - Chip-Reihe in `vOnb()` Schritt 2.
  - Abschnitt „Goal“ in `vMehr()` (Adjust: Zahl, Datum, löschen).
  - Fortschrittszeile in `vStart()`, Meilenstein-Leiter in `vStand()`.
  - Skill-Ziel schaltet `D.skills[k]` ein.
  - Zeitziele legen `D.pr["run:t5"/"run:t10"]` in `saveRun()` an.
- **Akzeptanz:**
  - Ein Tipp setzt ein vollständiges Ziel; „No goal yet“ lässt alles wie heute.
  - Fortschritt wird aus vorhandenen Werten berechnet (Profil, `D.ex`, `D.pr`), ohne Zusatzklick.
  - Erreichter Zielwert → Toast + Archiv-Eintrag (passiv).
  - Altes Backup lädt, Import mit fremdem `goal` wird per Whitelist bereinigt.
  - Plain-Theme ohne Warhammer-Wörter; Screenshot 390×844.
  - Neuer Test; Suite (0).
- **Nutzen:** Captain: „Muscle-up“ als sichtbares Gelübde. Partnerin: „Run 5 km“ oder „Strong legs“ mit einem Tipp.

### P-2 Ziele II: Das Ziel steuert Auswahl, Inhalt und Datum (I-ZIEL)

- **Ziel:** Das Ziel verschiebt den Plan spürbar, aber im 60–90-min-Rahmen.
- **Abhängigkeit:** P-1, A-013.
- **Umfang:**
  - `skillPlan()`: Ziel-Skill zuerst und länger; `h.skT` 5 bei Skill-Ziel.
  - Ziel-Anker für Kraft-Ziele in `postBlocks()` (früh, 2× pro Woche), Schutz in `capDur()`.
  - `recAll()`: Mindestregeln für Lauf-Ziele (≥ 2 Läufe, 1 lang), auch bei Fokus `str`; einmaliger Fokus-Hinweis.
  - Ziel mit Datum: Taper-Woche (Volumen −40–60 % über niedrige Runden/weniger Blöcke, gleiche Intensität), Test am Datum, Deload-Ersatz; Machbarkeits-Label „on course/tight“ aus dem Trend.
- **Akzeptanz:**
  - 6-Wochen-Simulation je Zielart (MU, Pull-ups, Squat kg, 10 km) zeigt die Mindestregeln.
  - Alle Einheiten bleiben ≤ 90 min, der Ziel-Anker wird nie gekürzt.
  - Ohne Ziel identische Empfehlungen wie vorher (Regressionstest).
  - Taper-Woche nur mit Datum.
  - Neuer Test; Suite (0).
- **Nutzen:** Captain: Muscle-up-Arbeit frisch und häufig. Partnerin: Lauf- oder Beinziel wird wirklich trainiert, auch neben dem Schwerpunkt.

### P-3 Skill Trial neu: wieder bei lower/glutes, speichert Werte, Neu-Einstufung (I-27)

- **Ziel:** Der Skill Trial wird zum 2-wöchigen Ziel-Check und erneuert die Einstufung.
- **Abhängigkeit:** P-1.
- **Umfang:**
  - `recAll()`: CH alle 14 Tage für alle Schwerpunkte; bei `lower`/`glutes` ersetzt er die fälligere von KA/KB, nie KC.
  - `S0` case `"CH"`: Blöcke aus Ziel und Skills mit `T`-Übungen; bei `lower`/`glutes` ein Unterkörper-Test (Anker-Wdh. als `tv`).
  - `saveTrain()`: Anhebung von `D.profile` aus Muster-Varianten (nur nach oben), Level-Toast.
  - `vMehr()`-Doktrin-Text angleichen.
- **Akzeptanz:**
  - Simulation Partner-Profil A/B: CH alle 14 ± 2 Tage, KC weiterhin ≥ 1× pro Woche, ≥ 2 Beinkontakte pro Woche (t22 bleibt grün).
  - CH-Werte landen in `l.tv`/`D.profile`; Logs senken nie den Stand.
  - Alte CH-Logs bleiben gültig.
  - Neuer Test; Suite (0).
- **Nutzen:** Partnerin: Skill Trial kommt zurück, ohne den Beintag zu verdrängen. Beide: Einstufung wächst mit, ohne Formular.

### P-4 Gesamtbelastung sRPE, Extras-Abschnitt, Ruhetag (V5)

- **Ziel:** Kickboxen und Kraft zählen mit; Überlast wird erkannt, ohne zu gängeln.
- **Umfang:**
  - `l.min` in `saveTrain()` (aus `s.min`), Dauerfeld mit Vorgabe 90 in `vKick()`/`savekick`.
  - Schätzwerte für alte Logs (5.6).
  - Wochenlast-Diagramm in `statsHTML()`; Insight bei > 1,5 × 4-Wochen-Schnitt und ≥ 2× RPE 10.
  - Abschnitt „Extras“ in `vMehr()` mit `D.opt`; Option „Weekly rest day“ in `recAll()` (Default aus).
- **Akzeptanz:**
  - KI-Log hat `min` (Vorgabe 90, änderbar); alte Logs ohne `min` erzeugen keine Fehler.
  - Last-Hinweis nur als Insight-Zeile, keine Sperre.
  - Ruhetag-Option an: höchstens 6 aktive Tage pro 7.
  - Backup/Import mit `opt` per Whitelist.
  - Neuer Test; Suite (0).
- **Nutzen:** Captain: 2 × 90 min Kickboxen fließen ein, Überlastwochen werden sichtbar. Partnerin: klare Wochenlast ohne Mehraufwand.

### P-5 Progression, Plateau und Volumen aus der Historie (V7)

- **Ziel:** Steigerung passt sich dem Gewicht und dem eigenen Verlauf an.
- **Abhängigkeit:** P-2, P-4.
- **Umfang:**
  - `target()`: Sprung ≈ 5 % (mind. 0,5 kg, gerundet); Tipp „Next variation“; `stall` ≥ 3 → −10 % bzw. −2 Wdh.
  - Pausenregel pro Muster (`it.k`) statt pro Variante.
  - `l.vs` in `saveTrain()`; Satzbänder in `rounds()` (5.3).
  - Plateau-Erkennung am Zielwert (3 Prüfungen) mit genau einer Maßnahme.
  - Kein `stall` an Minimal-Tagen (A-019).
- **Akzeptanz:**
  - 5-kg-Seitheben springt nicht mehr um 50 %.
  - Simulation Captain: Oberkörper-Sätze pro Woche ≤ ~20, Beine ≥ 10.
  - Gym-Variante nach 2 Wochen Minimal-Tagen ohne Rückstufung.
  - Plateau-Hinweis erscheint nur nach 3 Prüfungen ohne Fortschritt.
  - Neuer Test; Suite (0).
- **Nutzen:** Captain: weniger Oberkörper-Überschuss, Ziel-Muster wächst gezielt. Partnerin: kleine Glute-Übungen steigen in sinnvollen Schritten.

### P-6 Laufsteuerung (V6)

- **Ziel:** Läufe werden über die Woche gesteuert statt pro Einheit.
- **Abhängigkeit:** P-4 (Dauer/Last), P-2 (Lauf-Ziel).
- **Umfang:**
  - Wochen-km in `statsHTML()`; Insight bei > 30 % über dem 4-Wochen-Schnitt.
  - `recAll()`/`runRec()`: höchstens jeder 3. Lauf hart.
  - Langer Lauf bei Fokus `run` oder Lauf-Ziel (locker, +10 % Dauer nach „Easy“); `runInfo()`-Texte.
  - Taper vor Ziel-Datum.
- **Akzeptanz:**
  - 8-Wochen-Simulation: Anteil harter Läufe ≤ 1/3.
  - Langer Lauf 1× pro Woche bei Lauf-Ziel, Wochen-km ohne Sprung > 30 %.
  - Taper-Woche −40–60 % km.
  - Neuer Test; Suite (0).
- **Nutzen:** Captain: frischer zum Kickboxen, weniger harte Läufe. Partnerin: 5-km-Ziel mit sanftem Aufbau.

### P-7 Pause- und Verletzungsmodus (I-25)

- **Ziel:** Pausen und Verletzungen brechen den Plan nicht, sondern lenken ihn um.
- **Abhängigkeit:** P-4 (Pausenwochen aus dem Last-Schnitt).
- **Umfang:**
  - `D.pause` mit „Pause training“ unter More und „Resume“ auf Start; automatisches Ende beim nächsten Log.
  - Comeback-Woche nach ≥ 10 Tagen.
  - Schmerzregionen Knie/unterer Rücken/Sprunggelenk/Hüfte mit Filtern (`PAINRX`) und Reha-Blöcken (`REHAB`); Knie/Sprunggelenk ohne Läufe in `recAll()`.
  - Schmerzregel-Text, „Healed“-Tipp.
- **Akzeptanz:**
  - Pausenmodus: keine Empfehlung, keine Streak-Strafe, Zyklus verschiebt sich.
  - Nach 3 Wochen Pause: erste 2 Krafteinheiten mit niedrigen Runden, keine Tests, kein Last-Fehlalarm.
  - Knie aktiv → keine Läufe, keine betroffenen Beinübungen, Oberkörper normal.
  - Alte `pain`-Daten laufen weiter.
  - Neuer Test; Suite (0).
- **Nutzen:** Beide: Urlaub, Krankheit oder ein Knie kosten keinen Neustart; der Rest des Körpers trainiert weiter.

### P-8 Tagesform-Tipp, per Default aus (V8)

- **Ziel:** Optional ein Tipp vor dem Training, der schlechte Tage abfedert.
- **Abhängigkeit:** P-4 (Extras-Abschnitt).
- **Umfang:**
  - Schalter „Daily readiness check“ unter Extras.
  - Leiste good/normal/tired in `vTrain()`.
  - „tired“ → niedrige Runden in `rounds()`, ohne Favoriten- und Schwerpunkt-Zusatzblöcke, Hinweis „no reps to failure today“.
  - `l.rd` im Log, passive Auswertung in der Statistik.
- **Akzeptanz:**
  - Default aus: UI und Plan identisch zu vorher (Regressionstest).
  - Eingeschaltet ohne Tipp: keine Änderung.
  - „tired“ verkürzt die Einheit sichtbar, bleibt aber ≥ Kernblöcke.
  - Neuer Test; Suite (0).
- **Nutzen:** Beide: nach schlechtem Schlaf eine passende Einheit mit einem Tipp, ohne Fragebogen.

### Abdeckung der freigegebenen Punkte

| Freigegeben | Auftrag |
|---|---|
| Ziele (I-ZIEL) | P-1, P-2 |
| V5 Gesamtbelastung (I-12) | P-4 |
| V6 Laufsteuerung (I-11) | P-6 |
| V7 Progression (I-08) | P-5 |
| V8 Tagesform, per Default aus (I-09) | P-8 |
| Skill Trial bei lower/glutes (I-27) | P-3 |
| Pause-/Verletzungsmodus (I-25) | P-7 |
| Einordnung A-013 / A-014 / A-015 / A-019 | 3.3 (Priorität), 5.6 (Backup-Felder), 5.7 (Vorschau), 5.5 (Minimal-Tage) |

---

## Quellen

[Q1]–[Q34]: siehe `docs/training-audit.md`, Abschnitt „Quellen“.

- [Q35] Hickmott LM, Chilibeck PD, Shaw KA, Butcher SJ. The effect of load and volume autoregulation on muscular strength and hypertrophy: a systematic review and meta-analysis. *Sports Med Open* 2022;8:9.
- [Q36] McEwan D, Harden SM, Zumbo BD, et al. The effectiveness of multi-component goal setting interventions for changing physical activity behaviour: a systematic review and meta-analysis. *Health Psychol Rev* 2016;10(1):67–88.
- [Q37] Swann C, Rosenbaum S, Lawrence A, et al. Updating goal-setting theory in physical activity promotion: a critical conceptual review. *Health Psychol Rev* 2021;15(1):34–50.
- [Q38] Lopez P, Radaelli R, Taaffe DR, et al. Resistance training load effects on muscle hypertrophy and strength gain: systematic review and network meta-analysis. *Med Sci Sports Exerc* 2021;53(6):1206–1216.
- [Q39] McNulty KL, Elliott-Sale KJ, Dolan E, et al. The effects of menstrual cycle phase on exercise performance in eumenorrheic women: a systematic review and meta-analysis. *Sports Med* 2020;50(10):1813–1827.
- [Q40] Soligard T, Schwellnus M, Alonso JM, et al. How much is too much? (Part 1) International Olympic Committee consensus statement on load in sport and risk of injury. *Br J Sports Med* 2016;50(17):1030–1041.
- [Q41] Psilander N, Eftestøl E, Cumming KT, et al. Effects of training, detraining, and retraining on strength, hypertrophy, and myonuclear number in human skeletal muscle. *J Appl Physiol* 2019;126(6):1636–1645.
- [Q42] Scarpelli MC, Nóbrega SR, Santanielo N, et al. Muscle hypertrophy response is affected by previous resistance training volume in trained individuals. *J Strength Cond Res* 2022;36(4):1153–1157.
- [Q43] Ahtiainen JP, Walker S, Peltonen H, et al. Heterogeneity in resistance training-induced muscle strength and mass responses in men and women of different ages. *Age (Dordr)* 2016;38(1):10.
- [Q44] Muñoz I, Seiler S, Bautista J, et al. Does polarized training improve performance in recreational runners? *Int J Sports Physiol Perform* 2014;9(2):265–272.
- [Q45] Silbernagel KG, Thomeé R, Eriksson BI, Karlsson J. Continued sports activity, using a pain-monitoring model, during rehabilitation in patients with Achilles tendinopathy: a randomized controlled study. *Am J Sports Med* 2007;35(6):897–906.
- [Q46] Donovan JJ, Radosevich DJ. A meta-analytic review of the distribution of practice effect: now you see it, now you don't. *J Appl Psychol* 1999;84(5):795–805.
- [Q47] Saw AE, Main LC, Gastin PB. Impact of sport context and support on the use of a self-report measure for athlete monitoring. *J Sports Sci Med* 2015;14(4):732–739.
- [Q48] Slimani M, Davis P, Franchini E, Moalla W. Rating of perceived exertion for quantification of training and combat loads during combat sport-specific activities: a short review. *J Strength Cond Res* 2017;31(10):2889–2902.
- [Q49] LeSuer DA, McCormick JH, Mayhew JL, Wasserstein RL, Arnold MD. The accuracy of prediction equations for estimating 1-RM performance in the bench press, squat, and deadlift. *J Strength Cond Res* 1997;11(4):211–213.
- [Q50] Bosquet L, Montpetit J, Arvisais D, Mujika I. Effects of tapering on performance: a meta-analysis. *Med Sci Sports Exerc* 2007;39(8):1358–1365.
- [Q51] Barsuhn A, Wadhi T, Murphy A, et al. Training volume increases or maintenance based on previous volume: the effects on muscular adaptations in trained males. *J Appl Physiol* 2025;138(1):259–269.
