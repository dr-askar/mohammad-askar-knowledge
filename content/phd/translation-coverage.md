# Übersetzungs-Abdeckungsprotokoll

| Quellbereich | Zielsegment | Status |
|---|---|---|
| S. 1–21: Titelseite, Genehmigungsseite, Widmung, Danksagung, Publikationen, vollständiges Inhalts-/Abbildungs-/Tabellenverzeichnis und arabische Zusammenfassung | `translation-de.md` | vollständig übertragen; 58 Tabellen- und 114 Abbildungseinträge mit Nummern und Originalseitenangaben; Frontseiten visuell geprüft |
| S. 22–43: Einleitung, Keratokonus, Hornhautschichten, Ektasien, Keratokonuszeichen und Klassifikation | `translation-s22-31.md`, `translation-s32-43.md` | vollständig übersetzt; technischer Struktur-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 44–81: Topographiegeräte, Sirius-Karten/Indizes, topographische KC-Merkmale, KI/ML/ANN/CNN und Trainingsprobleme | `translation-s44-75.md` | vollständig übersetzt; technischer Struktur-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 82–96: Klinische KI-Anwendungen und KI bei Keratokonus | `translation-s82-113.md` | vollständig übersetzt; Tabellen-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 97–105: Studiendesign, Stichprobe, Ein-/Ausschluss, Trainings-/Testgruppe | `translation-s82-113.md` | vollständig übersetzt; Tabellen-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 106–113: Geschlecht/Alter der Testgruppe, Studienmethoden und Statistik | `translation-s82-113.md` | vollständig übersetzt; Tabellen-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 114–137: Ergebnisse der Netze für sagittale/tangentiale Krümmung, Dicke, vordere/hintere Höhe und Beginn vordere refraktive Stärke | `translation-s114-137.md` | vollständig übersetzt; Tabellen-, Zahlen- und Metrikabgleich abgeschlossen |
| S. 138–157: übrige Netze, Gesamtvergleich, SIRIUS-/Arztvergleich, McNemar-Tests | `translation-s138-164.md` | vollständig übersetzt; Tabellen-, Zahlen- und Metrikabgleich abgeschlossen |
| S. 158–164: Diskussion, demografische/Topographie-Auswertung, Limitationen und Schlussfolgerungen | `translation-s138-164.md` | vollständig übersetzt; Inhalts-, Zahlen- und Zitatabgleich abgeschlossen |
| S. 165–196: restliche Diskussion, Tabellen 57–58, Heatmap-/Falllegenden 95–114, Schlussfolgerungen, Empfehlungen, Literatur, Abstract und Titelseite | `translation-s165-196.md` | vollständig übersetzt; 124 Literaturangaben von AAO bis Zimmermann, Prozentwerte ohne fehlende Quellwerte; Schlussseiten visuell gerendert |

## Prüfregeln

- Jede Quellseite muss einem Zielsegment und einer Zielseite zugeordnet sein.
- Zahlen, Einheiten, p-Werte, Tabellenwerte, Zitate und Literaturangaben werden gegen die extrahierte Quelle abgeglichen.
- Abbildungen und Tabellen werden aus der Original-PDF übernommen und visuell auf Identifizierbarkeit sowie Beschriftungszuordnung geprüft.
- Dieses Protokoll dokumentiert technische und inhaltliche Abgleiche der nicht amtlichen Übersetzung. Es ist keine amtliche, medizinische oder rechtliche Zertifizierung und ersetzt keine menschliche Fachprüfung.

## Finale Release-QA

- Quelle: Original-PDF mit 196 Seiten; alle Originalseiten sind im unveränderten Faksimile-Anhang enthalten.
- Deutsche Textfassung: 105 Seiten mit sichtbaren fortlaufenden Seitenzahlen, gefolgt von einer eindeutigen Trennerseite; Gesamt-PDF: 301 Seiten (= 105 deutsche Seiten + 1 Trennerseite + 196 Originalseiten).
- Strukturabgleich: 58 Tabellen und 114 Abbildungen gemäß Frontverzeichnissen; 124 Literaturangaben im Literaturblock (AAO–Zimmermann).
- Zahlenstichprobe: Trainingsgruppe 987 Augen (300 keratokonisch, 610 normal, 77 verdächtig), Testgruppe 422 Augen (13, 366, 43); berichtete Testwerte 91,2–92,2 % und ärztliche KI-Unterstützung 95,9–96,2 % sind in der deutschen Fassung auffindbar.
- PDF-Technik: `qpdf --check` erfolgreich; `pdfinfo` bestätigt 301 Seiten, unverschlüsselt, ohne JavaScript; `pdftotext` findet Übersetzungsbeginn, S. 165–196-Block, Trenner und Originalanhang.
- Visuelle QA: deutsche Titelseite, Tabellen-/Textseite, Ende der deutschen Fassung, Trennerseite, Faksimile-Übergang, Mittelteil und letzte Originalseite gerendert und geprüft. Die gerenderten Seiten 106 und 301 stimmen bei identischer Auflösung byteweise mit Original S. 1 bzw. S. 196 überein.
- Vollständige visuelle Datenschutzprüfung: alle 196 Originalseiten als Kontaktbogen/Stichprobe gerendert; keine individuellen Patientennamen, IDs, Geburtsdaten, Adressen oder Telefonnummern festgestellt. Die technische Prüfung ersetzt keine institutionelle Datenschutz- oder Rechtsfreigabe.
- Transparenzhinweis in PDF und Website: deutsche Übersetzung mit arabischem Originalfaksimile, nicht amtliche Übersetzung, wissenschaftliche Arbeit und keine individuelle medizinische Beratung.
