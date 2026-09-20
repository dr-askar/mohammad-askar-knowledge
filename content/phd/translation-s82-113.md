## S. 82–96 - KI in Medizin, Ophthalmologie und Keratokonusdiagnostik

# Kapitel 4: Anwendungen künstlicher Intelligenz in der Medizin

1. Einleitung
2. Beispiele für KI-Techniken in der klinischen Praxis
3. Beispiele für KI-Techniken in der Augenheilkunde
4. Beispiele für KI zur Erkennung des Keratokonus

### 4.1 Einleitung

Der Einsatz künstlicher Intelligenz in der Medizin soll verborgene, nützliche Informationen aus Daten erschließen und klinische Entscheidungen unterstützen. KI kann bei Diagnose und Therapieauswahl helfen, Risiken einschätzen, Krankheiten klassifizieren, medizinische Fehler verringern und die Produktivität verbessern.

Mögliche Datenquellen sind demografische Angaben, Notizen medizinischer Leistungserbringer, medizinische Bilder, Laborergebnisse, genetische Tests sowie Aufzeichnungen medizinischer oder tragbarer Geräte wie Smartwatches. Die leichte Verfügbarkeit dieser Daten in elektronischen Gesundheitsakten und intelligenten, mit Sensoren, Netzverbindung und Cloud-Speicher ausgestatteten Geräten eröffnet Möglichkeiten für das Management medizinischer Informationen - vom Patienten, Arzt und Krankenhaus bis zu Gesundheitspolitik und Entscheidungsträgern.

**Abbildung 36:** Zahl der jährlich auf PubMed veröffentlichten Studien zu künstlicher Intelligenz, Deep Learning und maschinellem Lernen bis zum 22.06.2021. Die Entwicklung zeigt das wachsende Interesse an KI und ihren medizinischen Anwendungen.

### 4.2 Beispiele für KI-Anwendungen in der klinischen Praxis

#### 4.2.1 Als Screeninginstrument

- Analyse radiologischer Aufnahmen (Projektions- oder CT-Bilder), Schätzung der Wahrscheinlichkeit einer Erkrankung und Markierung von Befunden, die Radiologen interpretieren müssen. Ein wichtiges Beispiel ist das KI-Screening von Röntgenbildern auf COVID-19 (Minaee, Kafieh, Sonka, Yazdani, & Jamalipour Soufi, 2020; Shi et al., 2020).
- Analyse von Fundusbildern zur Erkennung sehbedrohlicher Befunde, bei denen eine Überweisung an die Augenheilkunde erforderlich ist. Das FDA-zugelassene IDx-DR-System untersucht Netzhautbilder und identifiziert überweisungsbedürftige Personen und sehbedrohliche diabetische Retinopathie (Van Der Heijden et al., 2018).
- In Großbritannien wurde eine KI-basierte Chat-Anwendung eingesetzt, die zwischen Personen unterscheidet, die lediglich Beruhigung benötigen, und solchen, die ärztlich untersucht werden müssen. Dadurch sollen das Gesundheitssystem entlastet und Ressourcen auf Personen mit tatsächlichem Bedarf gelenkt werden (W. Wang & Siau, 2018).
- Hauttumoren wie Melanome können mit hoher, expertenähnlicher Genauigkeit diagnostiziert und von Nävi unterschieden werden (Esteva et al., 2017).

#### 4.2.2 Als Instrument der Prognoseeinschätzung

- Schätzung der Überlebenszeit nach Behandlung eines Aderhautmelanoms (Damato, Eleuteri, Fisher, Coupland, & Taktak, 2008).
- Schätzung der Überlebenszeit und der Rezidivrate bei Brusttumoren (Cirkovic, Cvetkovic, Ninkovic, & Filipovic, 2015).

#### 4.2.3 Als Therapieunterstützung

- Unterstützung bei der Planung einer Strahlentherapie, um die Belastung gesunder Gewebe zu minimieren (C. Wang, Zhu, Hong, & Zheng, 2019).
- Unterstützung bei der Wahl optimaler Therapiestrategien bei Sepsis auf der Intensivstation. Wenn kein eindeutiges Protokoll vorliegt, kann bestärkendes Lernen eine geeignete Vorgehensweise auswählen (Komorowski, Celi, Badawi, Gordon, & Faisal, 2018).

#### 4.2.4 Als Ersatz für einen Leistungserbringer

Es ist auf absehbare Zeit unwahrscheinlich, dass KI Ärztinnen und Ärzte vollständig ersetzt. Sie kann bestimmte Aufgaben jedoch konsistenter, schneller und reproduzierbarer als Menschen ausführen, etwa die Schätzung des Knochenalters auf Röntgenbildern (Tajmir et al., 2019), die Diagnose bestimmter Netzhauterkrankungen in OCT-Bildern (De Fauw et al., 2018) oder die Quantifizierung von Gefäßstenosen und anderen Messwerten in Herzaufnahmen (Slomka et al., 2017). Diese Aufgaben sind nicht unbedingt komplex, können aber Zeit beanspruchen, die der Leistungserbringer für anspruchsvollere Aufgaben einsetzen könnte.

#### 4.2.5 Als Unterstützung des Leistungserbringers

Mehrere Studien zeigen, dass die Synergie zwischen KI und medizinischem Leistungserbringer bessere Ergebnisse liefert als jede Seite allein. Sie verbessert die Möglichkeit, klinische Entscheidungen in Echtzeit zu unterstützen und dadurch die Anstrengungen für eine präzise Gesundheitsversorgung zu verbessern (Sitapati et al., 2017).

### 4.3 Beispiele für KI-Anwendungen in der Augenheilkunde

**Abbildung 37:** Zahl der jährlich auf PubMed veröffentlichten Studien zu KI, Deep Learning, maschinellem Lernen und Augenheilkunde bis zum 22.06.2021.

Im Folgenden werden wichtige Studien zu Erkrankungen der Augenheilkunde genannt, bei denen KI eingesetzt wurde. Abbildung 38 ordnet diese nach der Zahl der durchgeführten Studien.

**Abbildung 38:** Zahl der PubMed-Veröffentlichungen nach Erkrankung (Statistik 2007–2018).

#### 4.3.1 Diabetische Retinopathie

IDx-DR ist eine der wichtigsten praktischen Anwendungen. Das System wurde mit FDA-Zulassung kommerziell zur Untersuchung auf diabetische Retinopathie bei Menschen über 21 Jahren in der primärärztlichen Versorgung eingeführt, ohne dass ein Augenarzt anwesend sein muss. Die Untersuchung ist nicht invasiv und benötigt keine Pupillenerweiterung. In der Praxis erreichte das System bei der Erkennung überweisungsbedürftiger Fälle eine Genauigkeit von annähernd 90 % (Van Der Heijden et al., 2018).

Das System wurde mit 128.175 Bildern trainiert und mit 9.963 Bildern getestet. Die Trainingsbilder wurden von 54 US-board-zertifizierten oder sich im vierten Weiterbildungsjahr befindenden Augenärzten beurteilt, im Mittel von 3–7 Ärzten pro Bild. Für die Testgruppe wurden die sieben Ärzte mit der höchsten Übereinstimmung ausgewählt. Verwendet wurden künstliche neuronale Netze und das auf ImageNet vortrainierte Inception-v3-Netz mit Batch-Normalisierung zur Beschleunigung des Lernens.

**Abbildung 39:** ROC-Kurve des Netzes im Vergleich zu sieben Augenärzten (Gulshan et al., 2016).

#### 4.3.2 Glaukom

- Li und Mitarbeitende untersuchten die Erkennung glaukomatöser Optikusneuropathie. Das KI-Modell wurde mit einer Fundusdatenbank aus 48.116 Bildern trainiert, davon 8.000 Testbilder. Die Genauigkeit betrug bis zu 98,6 %. Häufigste Ursachen falsch-negativer Ergebnisse waren pathologische und hohe Myopie; falsch-positive Ergebnisse standen mit Myopie und vergrößerter physiologischer Exkavation in Verbindung (Li et al., 2018).
- Muhammad und Mitarbeitende untersuchten den Verdacht auf Offenwinkelglaukom anhand von Swept-Source-OCT mit mehreren Karten. Die RNFL-Karte erreichte 93,1 % Genauigkeit und war damit genauer als konventionelles OCT und die konventionelle Gesichtsfelduntersuchung (Muhammad et al., 2017).
- Asaoka und Mitarbeitende unterschieden präglaukomatöse von normalen Gesichtsfeldern. Die Datenbank umfasste 171 Gesichtsfeldbilder; Gesamtabweichung, mittlere Abweichung und Standardabweichung dienten als Eingaben eines vorwärtsgerichteten neuronalen Netzes. Die Genauigkeit bei der Erkennung präglaukomatöser Gesichtsfelder betrug 92,6 % (Asaoka, Murata, Iwase, & Araie, 2016).

#### 4.3.3 Altersabhängige Makuladegeneration

Studien umfassten die Diagnose anhand von OCT-Bildern (Treder, Lauermann, Eter, & Ophthalmology, 2018), die Erkennung aktiver Neovaskularisation (Chakravarthy et al., 2016), die Vorhersage des zukünftigen Bedarfs an wiederholten Injektionen (Bogunović et al., 2017) und die Einschätzung des aktuellen Bedarfs an Antiangiogenese-Injektionen (Prahs et al., 2018).

#### 4.3.4 Katarakt

Gao entwickelte ein neuronales Netz zur Diagnose und Graduierung der senilen Katarakt mit hoher Genauigkeit (Gao, Lin, & Wong, 2015). Ein KI-Screening auf kongenitale Katarakte könnte wegen der Vermeidung vermeidbarer Erblindung durch frühe Diagnose besonders bedeutsam sein (Liu et al., 2017).

KI spielt auch bei der neuen Generation von Formeln zur Berechnung der Intraokularlinsenstärke eine Rolle, etwa Hill-RBF, Kane und PEARL-DGS (Cheng et al., 2020). Hill-RBF ist die bekannteste Formel und online verfügbar. Eingaben sind die anteroposteriore Augenlänge, Vorderkammertiefe sowie Hornhautkrümmungswerte und Achse. Zur Verbesserung der Genauigkeit können zentrale Hornhautdicke, Linsendicke und White-to-White-Distanz ergänzt werden. Die Genauigkeit innerhalb von 0,5 dpt beträgt 71,2 % und ist vergleichbar mit oder besser als Formeln der dritten und vierten Generation (Darcy et al., 2020).

#### 4.3.5 Verschiedene Anwendungen

Poplin und Mitarbeitende trainierten ein KI-Netz, das aus Fundusbildern Alter, Geschlecht, Raucherstatus, systemischen Blutdruck und eine frühere kardiale Erkrankung vorhersagen konnte (Poplin et al., 2018). Zhou und Mitarbeitende entwickelten ein KI-System, das bei Alzheimer-Erkrankung vorhandene Netzhautveränderungen erkennen kann, die ein Mensch nicht identifiziert; hierfür wurde ein Patent angemeldet (Zhou, Sinai, Moore, & Wong, 2006).

Dies ist nur eine kleine Auswahl der KI-Anwendungen in der Augenheilkunde. Die wichtigsten Anwendungen bei der Keratokonusdiagnostik werden im Folgenden gesondert dargestellt.

### 4.4 KI-Anwendungen zur Erkennung des Keratokonus

Im Folgenden werden wichtige Studien zu KI-Anwendungen bei Keratokonus beschrieben. Tabellen 4 und 5 fassen Algorithmen, Stichproben, Ergebnisse sowie Vor- und Nachteile der Studien zusammen.

#### 4.4.1 Keratokonusdiagnostik mit biomechanischen Eigenschaften und Regressionsalgorithmen

Corvis ST zeichnet die Reaktion der Hornhaut auf einen definierten Luftstoß mit einer hochauflösenden Scheimpflug-Kamera auf. Es nimmt 4.300 Bilder pro Sekunde auf und ermöglicht eine genaue Messung von Hornhautdicke und Augeninnendruck sowie biomechanischen Eigenschaften (Roberts, 2016).

Zwei wichtige Indizes zur Erkennung früher Keratokonusstadien sind der Corvis Biomechanical Index (CBI), der ausschließlich aus Corvis-Informationen mittels Regression entwickelt wurde, und der Tomography and Biomechanical Index (TBI), der Regression und Random Forest kombiniert und Corvis- mit Pentacam-Informationen verbindet (Abb. 40; Ambrósio et al., 2017; Renato, 2016; Riccardo, 2016).

Der TBI ist genauer als der CBI (98,5 % versus 88,2 %). Beide Indizes können jedoch falsch-negative und falsch-positive Ergebnisse liefern. Bei Werten innerhalb der Grenzwerte 0,5 beziehungsweise 0,29 kann die Entwicklung einer Ektasie nach refraktiver Chirurgie daher nicht zu 100 % ausgeschlossen werden (Fernández, Rodríguez-Vallejo, & Piñero, 2019).

**Abbildung 40:** CBI und TBI (Oculus, 2021).

#### 4.4.2 Keratokonusdiagnostik mit Support Vector Machine

Die Support Vector Machine ist ein überwachter Lernalgorithmus. Sie klassifiziert Trainingspunkte in einem n-dimensionalen Raum durch eine trennende Hyperebene mit n-1 Dimensionen so, dass der Abstand zwischen den nächstgelegenen Punkten verschiedener Klassen maximal wird. Zwei Punktgruppen in einem zweidimensionalen Raum werden beispielsweise durch eine gerade Linie getrennt (Cortes & Vapnik, 1995).

SIRIUS nutzt diese Methode, um Bilder anhand der Indizes SIf, SIb, RBFf, BCVf, BCVb, RMS(HOA) und THKmin vier Gruppen zuzuordnen: keratokonuskompatibel, verdächtig, normal und abnormal. Die Klassifikationsgenauigkeit lag über 97 % (Arbelaez et al., 2012). Eine Studie verglich 25 Algorithmen zur Klassifikation von Hornhautbildern eines AS-OCT-Geräts (CASIA SS-1000, Tomey). Nach Auswahl der acht diskriminativsten Indizes erreichte die SVM die beste Genauigkeit von 93,6 % (Lavric, Popa, Takahashi, & Yousefi, 2020).

#### 4.4.3 Keratokonusdiagnostik mit konvolutionalen neuronalen Netzen

KeratoDetect wurde an der Ștefan-cel-Mare-Universität in Rumänien entwickelt. Das Modell wurde mit 3.000 künstlich erzeugten Hornhautbildern trainiert, nicht mit Bildern realer Patientinnen und Patienten. Dies ist eine Schwäche; außerdem wurden ausschließlich Krümmungskarten verwendet. Die Genauigkeit bei der Einteilung in normal oder keratokonisch betrug 99,33 % (Lavric & Valentin, 2019).

Eine Studie der Kitasato-Universität in Japan verwendete sechs mit CASIA AS-OCT SS-1000 (Tomey) aufgenommene Karten: vordere und hintere Krümmung, vordere und hintere Höhe, Gesamtbrechkraft und Dicke. Sechs auf ResNet-18 basierende Modelle wurden mit 304 keratokonischen und 239 normalen Bildern trainiert. Die mittlere Gesamtgenauigkeit betrug 99,1 %. Die hintere Höhenkarte war mit 99,3 % am genauesten, gefolgt von der hinteren Krümmungskarte mit 99,1 % (Kamiya et al., 2019).

An der National Taiwan University wurden 354 Bilder von 206 Patientinnen und Patienten mit einem TMS-4-Videokeratoskop (Tomey) untersucht. Drei vortrainierte Modelle (VGG16, InceptionV3 und ResNet152) wurden eingesetzt. Die Bilder wurden in normale, keratokonische und subklinische Gruppen aufgeteilt; die ersten beiden dienten dem Training, die dritte der Prüfung. ResNet152 erreichte 95,8 %, die beiden anderen 93,1 %. Die Vorhersage subklinischer Fälle war bei einer Wahrscheinlichkeitsschwelle von 50 % mit 28,5 % unbefriedigend. Pixelweise diskriminative Merkmale und klassenbezogene Heatmaps wurden erstellt, um die Arbeitsweise des Netzes zu verstehen und den Untersuchenden auf auffällige Bildbereiche aufmerksam zu machen (Abb. 41; Kuo et al., 2020).

**Abbildung 41:** Diskriminative Merkmalskarte in der Mitte und Heatmap rechts.

Eine Studie der Universität Assiut (Ägypten) trainierte mit 2.574 und testete mit 644 Pentacam-Bildern. Verwendet wurden vordere und hintere Höhenkarte, vordere sagittale Krümmungskarte, Dickenkarte und ein kombiniertes Bild dieser vier Karten. Das Modell bestand aus zwei konvolutionalen Schichten und einem vierlagigen neuronalen Netz vor der Ausgabeschicht. Die kombinierte Vier-Karten-Karte erreichte 98,9 %, gefolgt von der hinteren Höhenkarte mit 97,7 %; auch Heatmaps wurden untersucht (Abdelmotaal et al., 2020).

**Tabelle 4 – Vergleich früherer Studien (außer CNN):**

| Studie/Algorithmus | Verfahren und Stichprobe | Ergebnisse | Vorteile | Nachteile |
|---|---|---|---|---|
| CBI (Vinciguerra et al., 2016), Regressionsalgorithmen | Retrospektive Unterscheidung normaler (478) und keratokonischer (180) Hornhäute mit dem CORVIS-Gerät | Sensitivität 94,3 %, Spezifität 97,5 %, AUC 97,7 %, Genauigkeit 88,2 % | CORVIS ist ein einzigartiges Gerät | Retrospektiv; verdächtige Hornhäute nicht untersucht; falsch-positive und falsch-negative Befunde in einigen Studien |
| TBI (Ambrósio et al., 2017), Regression + Random-Forest | Retrospektive Unterscheidung normaler (480), keratokonischer (204), einseitig keratokonischer (72) und Forme-fruste-keratokonischer (72) Hornhäute | Grenzwert 0,29 zur Erkennung von FFKC; AUC 98,5 %, Sensitivität 90,4 %, Spezifität 96 % | Verknüpft die Möglichkeiten von CORVIS und PENTACAM | Retrospektiv; falsch-positive und falsch-negative Befunde in einigen Studien |
| SIRIUS-SVM (Arbelaez et al., 2012), Support Vector Machine | Retrospektive Klassifikation keratokonischer (877), normaler (1.259), subklinischer (426) und postrefraktiv operierter (940) Hornhäute | KC: Genauigkeit 99,3 %, Sensitivität 98,2 %, Spezifität 95 %; subklinisch: Genauigkeit 97,3 %, Sensitivität 92 %, Spezifität 97,7 % | Training anhand von Merkmalen der vorderen und hinteren Hornhautfläche; SIRIUS (Placido + Scheimpflug) | Retrospektiv; relativ wenige verwendete Merkmale, um Overfitting zu vermeiden – eine Einschränkung der SVM |

**Tabelle 5 – Vergleich früherer CNN-Studien:**

| Studie/Modell | Verfahren und Stichprobe | Ergebnisse | Vorteile | Nachteile |
|---|---|---|---|---|
| KeratoDetect (Lavric & Valentin, 2019), CNN | Künstlich erzeugte Bilder: 1.500 normal und 1.500 KC; die verwendeten Karten sind nicht eindeutig beschrieben und waren vermutlich auf Krümmungskarten beschränkt | Genauigkeit 99,33 % | – | Keine Bilder realer Patientinnen und Patienten; Kartentypen unklar, vermutlich nur Krümmungskarten |
| Kamiya et al. (2019), CNN/ResNet-18 | Retrospektiv mit AS-OCT, sechs Karten; 239 normal und 304 KC | Gesamtgenauigkeit 99,1 %; hintere Höhenkarte 99,3 %, danach hintere Krümmung 99,1 % | AS-OCT; sechs Karten; vortrainiertes ResNet-18 | Verdächtige Fälle nicht untersucht; Nutzung eines vortrainierten Modells |
| Kuo et al. (2020), CNN (VGG16, InceptionV3, ResNet152) | Retrospektiv mit Videokeratoskop; Training: 170 KC und 156 normal, Test: 28 subklinisch | ResNet152: 95,8 % im Training; 28,5 % bei subklinischen Testfällen | Vortrainierte Modelle; diskriminative Pixelmerkmals- und klassenbezogene Heatmaps zum Verständnis des Modells | Videokeratoskop liefert keine genauen Informationen zur hinteren Hornhautfläche; nur vordere Krümmungskarte; subklinische Fälle wurden unzureichend erkannt |
| Abdelmotaal et al. (2020), CNN | Retrospektiv mit PENTACAM: 1.038 KC, 1.108 normal, 1.072 subklinisch oder Forme fruste; vier Einzelkarten und ein kombiniertes Bild | Kombinierte Vier-Karten-Karte 98,9 %, hintere Höhenkarte 97,7 % | Vier Karten einzeln und kombiniert; PENTACAM; Heatmaps zur Untersuchung der Modellarbeitsweise | Keine unabhängige Testgruppe; keine echten Verdachtsfälle, sondern nur subklinische/Forme-fruste-Fälle |
| Vorliegende Studie | Retrospektive Sammlung/Training und unabhängige Testgruppe mit realen Bildern; Training: 559 KC, 1.217 normal, 167 verdächtig; Test: 13 KC, 366 normal, 43 verdächtig | Beste Netze: vordere Höhenkarte, danach hintere Höhenkarte, vordere refraktive Stärke, äquivalente refraktive Stärke; Genauigkeit/F1-Score 94,5–94,3 % | Neues Netzwerkdesign; Transfer Learning; Data Augmentation; Training mit realen Bildern; große Stichprobe; unabhängige Testgruppe; SIRIUS; Heatmaps; Lesung mit Unterstützung | Trainings-, Validierungs- und Testgruppen unausgewogen; AS-OCT gilt als genauer als SIRIUS; retrospektives Design |

## S. 97–113 - Studiendesign und Methoden

# Kapitel 5: Studiendesign und Methoden

1. Studiendesign
2. Studiengruppe
3. Stichprobengröße
4. Ein- und Ausschlusskriterien sowie technische Bildeigenschaften
5. Merkmale der Studiengruppen
6. Studienmethoden

### 5.1 Studiendesign

- **Teil 1:** retrospektive Untersuchung der Akten und topographischen Bilder von Patientinnen und Patienten, die in der Abteilung für Augenheilkunde und Augenchirurgie des Universitätskrankenhauses Al-Mouassat der Universität Damaskus topographisch untersucht wurden. Ziel war, möglichst viele Bilder zu sammeln und zu klassifizieren, deskriptiv-statistische Analysen durchzuführen und die Daten für das Training des KI-Systems zu verwenden.
- **Teil 2:** Querschnittsuntersuchung zur Bestimmung der Leistungsfähigkeit des KI-Systems.

### 5.2 Studiengruppe

Teil 1 sollte durch die Prüfung alter Akten möglichst viele Bilder zum Training des Systems sammeln und deskriptiv-statistisch auswerten. Teil 2 bestand aus einer Zufallsstichprobe von Patientinnen und Patienten, die die Augenambulanz des Universitätskrankenhauses Al-Mouassat aufsuchten.

### 5.3 Stichprobengröße

Für Teil 1 wurde die erforderliche Größe einer deskriptiven Studie bei Alpha = 0,05, Beta = 0,05 und einer Effektgröße von 0,05 mit G*Power 3.0.10 berechnet. Für eine Teststärke von 95 % waren 356 Patientinnen und Patienten erforderlich. Für Teil 2 wurde bei Alpha = 0,05, Beta = 0,05, einer Odds Ratio von 2 und einem Anteil diskordanter Paare von 0,3 mit G*Power 3.0.10 eine erforderliche Stichprobe von 380 Augen für eine Teststärke von 95 % berechnet.

### 5.4 Ein- und Ausschlusskriterien und technische Bildeigenschaften

**Einschluss:** Alter über 10 Jahre; Kooperation am Topographiegerät zur Aufnahme eines technisch geeigneten Bildes (Teil 2) oder Vorliegen eines technisch geeigneten früheren topographischen Bildes (Teil 1).

**Ausschluss:** fehlende Kooperation während der Aufnahme; frühere Bilder ohne technische Eignung; Kinder unter 10 Jahren; schwere trockene Augen und Erkrankungen der Augenoberfläche; Hornhautdystrophien und -degenerationen; andere ektatische Hornhauterkrankungen; frühere Augenoperationen, insbesondere an der Hornhaut; Hornhautnarbe jeder Ursache außer Keratokonus.

**Technische Bildeigenschaften:** Die Software Phoenix v2.0.0.3 des SIRIUS-Geräts wurde verwendet, um die technische Eignung zu prüfen. Das Gerät bewertet Coverage und Anteil nicht bearbeiteter Daten (Not Edited) der Scheimpflug-Kamera sowie Coverage und Zentrierung (Centration) der Keratoskopieaufnahmen. Daraus entscheidet es, ob das Bild technisch geeignet ist (CSO, 2018).

### 5.5 Merkmale der Studiengruppen

#### 5.5.1 Trainingsgruppe

Die Trainingsstichprobe umfasste 987 Patientinnen und Patienten in drei Diagnosegruppen (Abb. 42): 300 keratokonische (KC; 30,39 %), 610 normale (NORMAL; 61,80 %) und 77 verdächtige (SUSPECT; 7,8 %). Auf Augenebene umfasste sie 1.943 Augen: 559 KC (28,73 %), 1.217 normale (62,67 %) und 167 verdächtige Augen (8,6 %).

**Abbildung 42:** Verteilung der Trainingsgruppe nach Diagnose.

Nach Geschlecht waren 483 Frauen (48,9 %) und 504 Männer (51,1 %) vertreten; das Verhältnis Männer zu Frauen betrug 1,041753653. Der Chi-Quadrat-Test zeigte keinen statistisch signifikanten Unterschied zwischen Männern und Frauen in den drei Gruppen (p > 5 %; Tabelle 6).

**Tabelle 6:** F 483 (48,9 %, kumulativ 48,9 %), M 504 (51,1 %, kumulativ 100,0 %), Gesamt 987 (100,0 %).

Das Alter lag zwischen 10 und 87 Jahren, der Mittelwert betrug 31,89 Jahre. Der Kolmogorov-Smirnov-Test ergab p = 0,000; das Alter war nicht normalverteilt und es wurden nichtparametrische Tests verwendet (Tabellen 7–8).

**Tabelle 7:** N = 987; Spannweite 77,0; Minimum 10,0; Maximum 87,0; Mittelwert 31,739; Standardabweichung 13,1865; gültiges N = 987.

**Tabelle 8:** Kolmogorov-Smirnov 0,157, df 987, Signifikanz 0,000; Shapiro-Wilk 0,874, df 987, Signifikanz 0,000; Lilliefors-Signifikanzkorrektur.

Das mittlere Alter betrug bei Frauen 32,4 und bei Männern 31,37 Jahre. Der Mann-Whitney-Test zeigte keinen signifikanten Unterschied (p = 0,270; Abb. 43).

**Tabelle 9:** Frauen Mittelwert 31,20, 95-%-KI 30,08–32,33, Median 28, SD 12,583, Minimum 10, Maximum 85; Männer Mittelwert 32,24, KI 31,04–33,44, Median 29, SD 13,732, Minimum 10, Maximum 87.

**Abbildung 43:** Mann-Whitney-Test zur Altersverteilung nach Geschlecht.

Nach Diagnose lagen die Mittelwerte bei KC 30,97 (12–82 Jahre), NORMAL 31,03 (10–81 Jahre) und SUSPECT 40,32 (13–87 Jahre). Der Kruskal-Wallis-Test zeigte einen signifikanten Unterschied (p = 0,025; Tabelle 10; Abb. 44).

**Tabelle 10:** KC Mittelwert 30,97, KI 29,71–32,22, Median 29, SD 11,054, Minimum 12, Maximum 82; NORMAL 31,03, KI 30,03–32,02, Median 28, SD 12,531, Minimum 10, Maximum 81; SUSPECT 40,32, KI 35,58–45,06, Median 32, SD 20,875, Minimum 13, Maximum 87.

**Abbildung 44:** Kruskal-Wallis-Test der Altersverteilung nach Diagnose.

#### 5.5.2 Testgruppe

Die Teststichprobe umfasste 211 Patientinnen und Patienten (Abb. 45): 9 KC (4,27 %), 173 normale (81,99 %) und 29 verdächtige (13,74 %). Auf Augenebene umfasste sie 422 Augen: 13 KC (3,08 %), 366 normale (86,73 %) und 43 verdächtige Augen (10,19 %).

**Abbildung 45:** Verteilung der Testgruppe nach Diagnose.

Nach Geschlecht umfasste die Testgruppe 91 Frauen (43,1 %) und 120 Männer (56,9 %); das Verhältnis Männer zu Frauen betrug 1:1,318. Der Chi-Quadrat-Test zeigte keinen signifikanten Unterschied zwischen den drei Gruppen (p > 5 %; Tabelle 11).

**Tabelle 11:** Verteilung der Testgruppe nach Geschlecht und Diagnose mit Chi-Quadrat-Test.

Das Alter lag zwischen 11 und 67 Jahren, der Mittelwert betrug 27,507 Jahre (Tabelle 12). Der Kolmogorov-Smirnov-Test ergab p = 0,000; das Alter war nicht normalverteilt (Tabelle 13).

**Tabelle 12:** N = 422; Spannweite 56,0; Minimum 11,0; Maximum 67,0; Mittelwert 27,507; SD 12,4867; gültiges N = 422.

**Tabelle 13:** Kolmogorov-Smirnov 0,273, df 422, Signifikanz 0,000; Shapiro-Wilk 0,786, df 422, Signifikanz 0,000; Lilliefors-Korrektur.

Das mittlere Alter betrug bei Frauen 27,44 und bei Männern 27,55 Jahre (Tabelle 14). Der Mann-Whitney-Test zeigte keinen signifikanten Unterschied (p = 0,681; Abb. 46).

**Tabelle 14:** Frauen Mittelwert 27,44, KI 25,69–29,18, Median 23, SD 11,906, Minimum 11, Maximum 61; Männer Mittelwert 27,55, KI 25,91–29,20, Median 23, SD 12,933, Minimum 11, Maximum 67.

**Abbildung 46:** Mann-Whitney-Test der Altersverteilung nach Geschlecht.

Nach Diagnose lagen die Mittelwerte bei KC 25,92 (11–52 Jahre), NORMAL 27,02 (11–67 Jahre) und SUSPECT 32,11 (11–67 Jahre). Der Kruskal-Wallis-Test zeigte keinen signifikanten Unterschied (p = 0,097; Tabelle 15; Abb. 47).

**Tabelle 15:** KC Mittelwert 25,92, KI 17,65–34,19, Median 20, SD 13,689, Minimum 11, Maximum 52; NORMAL 27,02, KI 25,80–28,24, Median 23, SD 11,890, Minimum 11, Maximum 67; SUSPECT 32,11, KI 27,19–37,04, Median 24, SD 16,001, Minimum 11, Maximum 67.

**Abbildung 47:** Kruskal-Wallis-Test der Altersverteilung nach Diagnose in der Testgruppe.

### 5.6 Studienmethoden

#### 5.6.1 Teil 1

Nach Anwendung der genannten Ein- und Ausschlusskriterien wurden Patientenakten und SIRIUS-Topographiebilder eingesehen und die Daten extrahiert. Die Bilder wurden auf einer Klyce/Wilson-Skala mit einem Durchmesser von 9 mm ausgewertet (Wilson, Klyce, & Husseini, 1993), mit Ausnahme der Höhenkarte mit 8 mm Durchmesser und einem torisch-ellipsoidalen Float-Referenzkörper (Mazen M. Sinjab, 2018c). Auf Grundlage der verfügbaren Informationen wurden die Bilder entsprechend den in Kapitel 2.8 genannten Kriterien in drei Gruppen eingeteilt: eindeutiger Keratokonus; keratokonusverdächtige und Forme-fruste-Hornhäute; normale Hornhäute.

An den extrahierten Daten wurde eine deskriptive statistische Untersuchung durchgeführt. Die Kartenbilder wurden zum Training eines KI-Systems verwendet, das auf Computer Vision und Deep Learning beruht. Das System besteht aus elf künstlichen neuronalen Netzen: zehn Netze lesen jeweils eine topographische Karte - vordere und hintere sagittale Krümmung, vordere und hintere tangentiale Krümmung, Hornhautdicke, vordere und hintere Höhe sowie vordere, hintere und äquivalente Brechkraft - und ein elftes Netz trifft anhand dieser Ergebnisse die endgültige Klassifikationsentscheidung. Für Aufbau und Training wurden Python 3.6, TensorFlow 1.8 und Keras 2.2.3 mit TensorFlow-Backend verwendet.

#### 5.6.2 Teil 2

Alle Patientinnen und Patienten beziehungsweise ihre gesetzlichen Vertreter unterschrieben vor der Teilnahme eine Einwilligungserklärung. Die klinische Befragung umfasste neben persönlichen Daten die medizinische, okuläre, medikamentöse und familiäre Anamnese. Die augenärztliche Untersuchung umfasste Sehschärfeprüfung mit der Snellen-Tafel, Untersuchung des vorderen Augenabschnitts und des Fundus, Refraktionsbestimmung, Aufnahme eines topographischen Bildes und die abschließende Klassifikation des Bildes anhand aller Informationen.

Ein Arzt beurteilte die Bilder ohne Kenntnis der Patientendaten nach den Kriterien aus Kapitel 2.8. Die Bilder wurden in das KI-System eingegeben und zusätzlich mit der am SIRIUS-Gerät angeschlossenen Software Phoenix v2.0.0.3 klassifiziert. Weiterhin klassifizierte der Arzt die Bilder mit Unterstützung der SIRIUS-Keratokonus-Zusammenfassung (Keratoconus Summary) sowie mit Unterstützung des KI-Systems, wobei die Einzelergebnisse jeder Karte und das endgültige Systemergebnis sichtbar waren.

Die Intrarater-Reliabilität des Arztes wurde untersucht, indem 100 zufällig aus der Trainingsgruppe ausgewählte Bilder zu zwei verschiedenen Zeitpunkten gelesen und die Ergebnisse mit Cohens Kappa verglichen wurden. Der Wert betrug 0,925 (p = 0, p < 5 %), was als ausgezeichnet gilt und die Verwendung der ärztlichen Ergebnisse unterstützt.

#### 5.6.3 Trainingsprozess

**Architektur der Kartennetze:** Es wurden zehn strukturell gleiche Netze verwendet, je eines pro Karte. Die Eingabeschicht hatte die Größe 3×400×400. Es folgten drei konvolutionale Schichten mit 32, 32 und 64 Filtern der Größe 3×3; auf jede Schicht folgte eine 2×2-Pooling-Schicht. Danach kamen eine Flattening-Schicht, eine verborgene Schicht mit 64 Neuronen und eine Ausgabeschicht mit drei Neuronen.

**Netz für die endgültige Entscheidung:** Dieses Netz erhielt die Ausgaben der zehn Kartennetze als 30 Eingaben. Es folgten drei verborgene Schichten mit 64, 32 und 16 Neuronen sowie eine Ausgabeschicht mit drei Neuronen.

Zur Vermeidung von Overfitting wurde in den Kartennetzen ein L2-Regularisierer mit dem Wert 0,001 auf die verborgene Schicht mit 64 Neuronen angewendet; anschließend wurde eine Dropout-Schicht mit 0,3 eingefügt. Im Entscheidungsnetz wurde der L2-Regularisierer mit 0,001 auf die letzte verborgene Schicht mit 16 Neuronen angewendet, gefolgt von Dropout 0,3.

Die Trainingsgruppe wurde ohne Cross-Validation in 80 % Training und 20 % Validierung geteilt. Der Prozess wurde beendet, wenn sich der Validierungsverlust nach zehn Epochen nicht verbesserte. Gespeichert wurde das Modell mit dem geringsten Validierungsverlust. Abschließend wurden alle trainierten Netze auf die Testgruppe angewendet.

Wegen der kleinen Stichprobe wurde Data Augmentation eingesetzt. Da jedes Bild eine Symmetrie zur vertikalen Linie aufweist, verdoppelt horizontales Spiegeln die Trainingsstichprobe. Zusätzlich wurde Transfer Learning verwendet: Ein Basismodell wurde nacheinander mit allen erzeugten Bildern aller Karten (mehr als 30.000 Bilder) trainiert und anschließend zum Training jedes einzelnen Kartennetzes verwendet.

Wegen des Klassenungleichgewichts mit einem hohen Anteil normaler Fälle wurde ein gewichteter Loss eingesetzt. Der Verlust keratokonischer und verdächtiger Fälle wurde erhöht und der Verlust normaler Fälle verringert, um Underfitting zu vermeiden.

#### 5.6.4 Primäre Forschungsendpunkte

Untersucht wurden die Genauigkeit jedes einzelnen Netzes und die Gesamtgenauigkeit des Systems bei Vorhersagen in Trainings-, Validierungs- und Testgruppe. Anschließend wurden in der Testgruppe die Gesamtgenauigkeiten des vorgeschlagenen KI-Systems (AI), des Arztes (DR), der SIRIUS-Software (CSO), des Arztes mit KI-Unterstützung (DR&AI) und des Arztes mit SIRIUS-Software-Unterstützung (DR&CSO) verglichen.

#### 5.6.5 Statistische Datenanalyse

Mithilfe von Confusion-Matrices wurden Sensitivität, Spezifität, positiver und negativer prädiktiver Wert, F1-Score und Genauigkeit in Trainings-, Validierungs- und Testgruppe berechnet. Die Prävalenz beeinflusst die prädiktiven Werte; für die Berechnung wurden die Anteile der Testgruppe verwendet. Bei unausgewogenen Gruppen und besonderem Interesse an falsch-positiven und falsch-negativen Ergebnissen gilt der F1-Score als geeigneter als die reine Genauigkeit (Sokolova, Japkowicz, & Szpakowicz, 2006). Der McNemar-Test wurde verwendet, um die Ergebnisse der neuronalen Netze mit den Ergebnissen des Arztes mit und ohne KI-Unterstützung sowie mit und ohne SIRIUS-Software-Unterstützung zu vergleichen (Hoffman, 1976).
