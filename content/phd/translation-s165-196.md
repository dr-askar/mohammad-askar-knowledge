## S. 165–188 – Diskussion, Schlussfolgerungen, Empfehlungen und Abschluss

### 7.3 KI-System und Vergleich mit ähnlichen Studien

Das KI-System erreichte eine Gesamtgenauigkeit sowie gewichtete F-Score-Werte von 94,3 %–94,5 % in der Trainingsgruppe, 93,9 %–94,1 % in der Validierungsgruppe und 91,2 %–92,2 % in der Testgruppe (Tabelle 57). Dies ist eine hohe Genauigkeit und stimmt mit internationalen Studien überein, die zuvor dargestellt wurden. Die etwas niedrigeren Werte der vorliegenden Studie lassen sich durch das unterschiedliche Studiendesign und die Art der zusammengestellten Stichprobe erklären.

Nach dem gewichteten F1-Score erzielte in der Testgruppe das Netz der vorderen Höhenkarte die höchste Genauigkeit, gefolgt von der hinteren Höhenkarte, der vorderen refraktiven Stärkekarte und der äquivalenten refraktiven Stärkekarte. Dies stimmt teilweise mit früheren Studien überein. Bei Kuo et al. (2020) erzielte die hintere Höhenkarte das beste Ergebnis, gefolgt von der hinteren Krümmungskarte, der vorderen Höhenkarte und der Dickenkarte. Bei Abdelmotaal et al. (2020) war die hintere Höhenkarte am besten, gefolgt von der vorderen sagittalen Krümmungskarte, der vorderen Höhenkarte und zuletzt der Dickenkarte (vgl. Tabelle 5).

**Tabelle 57 – Zusammenfassung der Ergebnisse der neuronalen Netze und des KI-Systems.**

| Karte/Modell | Genauigkeit Training | Genauigkeit Validierung | Genauigkeit Test | gewichteter F1 Training | gewichteter F1 Validierung | gewichteter F1 Test |
|---|---:|---:|---:|---:|---:|---:|
| Gesamt | 0,945 | 0,941 | 0,922 | 0,943 | 0,939 | 0,912 |
| RAP | 0,907 | 0,858 | 0,896 | 0,890 | 0,846 | 0,852 |
| RPP | 0,889 | 0,907 | 0,896 | nan | nan | nan |
| TA | 0,871 | 0,876 | 0,896 | nan | nan | nan |
| TP | 0,898 | 0,897 | 0,896 | 0,863 | 0,865 | nan |
| TEAE | 0,890 | 0,912 | 0,893 | 0,860 | 0,883 | 0,864 |
| REF | 0,884 | 0,902 | 0,891 | 0,852 | 0,866 | 0,850 |
| SP | 0,896 | 0,907 | 0,891 | nan | nan | nan |
| TEPE | 0,902 | 0,904 | 0,877 | 0,875 | 0,882 | 0,853 |
| THK | 0,837 | 0,837 | 0,860 | 0,811 | 0,809 | nan |
| SA | 0,888 | 0,904 | 0,841 | 0,850 | nan | nan |

### 7.4 Vergleich mit anderen Modellen

- Das KI-System, das SIRIUS-Gerät und der Arzt ohne Unterstützung erzielten ähnliche Ergebnisse, mit einem leichten Vorteil für den Arzt, gefolgt vom KI-System. Bei ihrem Vergleich bestand kein statistisch signifikanter Unterschied.
- Der Arzt mit Unterstützung des SIRIUS-Geräts erzielte jeweils bessere Ergebnisse als das KI-System, das SIRIUS-Gerät und der Arzt ohne Unterstützung. Der Unterschied gegenüber SIRIUS und dem Arzt ohne Unterstützung war statistisch signifikant; gegenüber dem KI-System war er nicht signifikant.
- Der Arzt mit Unterstützung des KI-Systems erzielte im Vergleich zu allen anderen Modellen das beste Ergebnis. Der Unterschied war gegenüber allen anderen Modellen einschließlich des Arztes mit SIRIUS-Unterstützung statistisch signifikant (Tabellen 53 und 58).

**Tabelle 58 – Zusammenfassung der Ergebnisse aller Modelle.**

| Modell | Genauigkeit | gewichteter F1-Score |
|---|---:|---:|
| DR&AI | 0,962 | 0,959 |
| DR&CSO | 0,945 | 0,941 |
| DR | 0,929 | 0,924 |
| AI | 0,922 | 0,912 |
| CSO | 0,919 | 0,911 |

### 7.5 Diskriminative Merkmals- und Heatmaps

Wie bereits erwähnt, besteht eine Einschränkung neuronaler Netze darin, dass nicht genau bekannt ist, was während der Entscheidungsfindung geschieht. Das Netz lernt aus Beispielen, und es ist schwierig zu erkennen, welche Muster es gelernt hat. Diskriminative Merkmalskarten und Heatmaps helfen dabei, die Vorgänge im Modell und die bei der Entscheidung verwendeten Muster zu verstehen. Nachfolgend werden Beispiele für die Heatmaps jedes trainierten neuronalen Netzes beschrieben. Die Netze wurden mit Bildern normaler und keratokonischer Hornhäute trainiert. Die Heatmap wurde rechts platziert und mit dem Bild der Topographiekarte links überlagert; dadurch werden die von dem Netz zur Entscheidungsfindung verwendeten Muster sichtbar.

#### 7.5.1 Vordere sagittale Krümmungskarte

Das neuronale Netz konnte offensichtlich die symmetrische Schmetterlingsform der normalen Hornhaut und die inferioren Krümmungen der keratokonischen Hornhaut unterscheiden (Abbildung 95).

**Abbildung 95:** Heatmaps des Netzes für die vordere sagittale Krümmungskarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.2 Hintere sagittale Krümmungskarte

Das Netz konnte offensichtlich die symmetrische Schmetterlingsform der normalen Hornhaut und die unregelmäßige Form der keratokonischen Hornhaut unterscheiden (Abbildung 96).

**Abbildung 96:** Heatmaps des Netzes für die hintere sagittale Krümmungskarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.3 Vordere tangentiale Krümmungskarte

Das Netz konnte offensichtlich die symmetrische Schmetterlingsform der normalen Hornhaut und eine Schmetterlingsform mit inferiorer Krümmung bei der keratokonischen Hornhaut unterscheiden (Abbildung 97).

**Abbildung 97:** Heatmaps des Netzes für die vordere tangentiale Krümmungskarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.4 Hintere tangentiale Krümmungskarte

Das Netz konnte offensichtlich die symmetrische Form der normalen Hornhaut und die gekrümmten Ausbuchtungen der keratokonischen Hornhaut unterscheiden (Abbildung 98).

**Abbildung 98:** Heatmaps des Netzes für die hintere tangentiale Krümmungskarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.5 Vordere Höhenkarte

Das Netz konnte die Erhebungen unterscheiden und ihre Bedeutung einschätzen. Bei der normalen Hornhaut ignorierte es die Erhebung und interpretierte sie nicht als Hinweis auf Keratokonus. Bei der keratokonischen Hornhaut konnte es die Erhebung und die gegenüberliegende Vertiefung erkennen, als hätte es eine Aberration der Trennfläche erkannt (Abbildung 99).

**Abbildung 99:** Heatmaps des Netzes für die vordere Höhenkarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.6 Hintere Höhenkarte

Das Netz unterschied die Erhebungen und die zungenförmige Struktur im Bild der keratokonischen Hornhaut (Abbildung 100).

**Abbildung 100:** Heatmaps des Netzes für die hintere Höhenkarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.7 Dickenkarte

Das Netz konnte im Bild der keratokonischen Hornhaut den Verdünnungsbereich und die inferiore Verlagerung des dünnsten Punktes unterscheiden (Abbildung 101).

**Abbildung 101:** Heatmaps des Netzes für die Dickenkarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.8 Äquivalente refraktive Stärkekarte

Das Netz unterschied offensichtlich die symmetrische Form im Bild der normalen Hornhaut von der deutlich asymmetrischen Form im Bild der keratokonischen Hornhaut. Dabei konzentrierte es sich auf die Bereiche mit geringerer Krümmung (Abbildung 102).

**Abbildung 102:** Heatmaps des Netzes für die äquivalente refraktive Stärkekarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.9 Vordere refraktive Stärkekarte

Das Netz unterschied offensichtlich die symmetrische Form im Bild der normalen Hornhaut von der asymmetrischen Form im Bild der keratokonischen Hornhaut. Auch hier konzentrierte es sich auf die Bereiche mit geringerer Krümmung (Abbildung 103).

**Abbildung 103:** Heatmaps des Netzes für die vordere refraktive Stärkekarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

#### 7.5.10 Hintere refraktive Stärkekarte

Das Netz unterschied offensichtlich die symmetrische Form im Bild der normalen Hornhaut von der inferioren Krümmung im Bild der keratokonischen Hornhaut. Es konzentrierte sich auf die Bereiche mit stärkerer Krümmung (Abbildung 104).

**Abbildung 104:** Heatmaps des Netzes für die hintere refraktive Stärkekarte. Beschriftungen im Original: normale Hornhaut; keratokonische Hornhaut.

### 7.6 Untersuchung einiger Fälle

Hier werden einige Fälle und die Ergebnisse der verschiedenen Modelle miteinander verglichen. Dazu wird jeweils die beigefügte Abbildung mit den Kartenbildern und einem Diagramm herangezogen, das die Wahrscheinlichkeit jeder Klasse durch das jeweils zuständige neuronale Netz zeigt. Abschließend wird das Endergebnis des KI-Systems mit dem Ergebnis der dem SIRIUS-Gerät beiliegenden Software verglichen.

#### 7.6.1 Fall 1

Ein keratokonischer Fall wurde sowohl vom KI-System als auch vom Arzt diagnostiziert; die dem SIRIUS-Gerät beiliegende Software stufte ihn trotz deutlicher Zeichen eines Keratokonus als Verdachtsfall ein (Abbildung 105). Dieser Fall zeigt eine der Einschränkungen der dem SIRIUS-Gerät beiliegenden Software.

**Abbildung 105:** Fall 1.

#### 7.6.2 Fall 2

Es handelte sich um einen grenzwertigen keratokonischen Fall. Die Veränderungen auf der vorderen sagittalen Krümmungskarte waren nicht charakteristisch und ähnelten am ehesten der vertikalen Form D (Abbildung 106). Weder das KI-System noch die dem SIRIUS-Gerät beiliegende Software noch der Arzt konnten ihn diagnostizieren; er wurde als Verdachtsfall klassifiziert. Beim Vergleich der Wahrscheinlichkeit eines Keratokonus zeigte sich, dass die tangentialen Krümmungsnetze Veränderungen besser erkannten als die sagittalen. Dies stimmt mit Tummanapalli, Potluri, Vaddavalli und Sangwan (2015) überein, die fanden, dass tangentiale Karten subklinische Fälle besser erkennen. Der Fall zeigt die Bedeutung tangentialer Karten sowie der Befragung und klinischen Untersuchung: Der Scherenreflex war vorhanden, und das andere Auge wies einen eindeutigen Keratokonus auf.

**Abbildung 106:** Fall 2.

#### 7.6.3 Fall 3

Ein eindeutiger keratokonischer Fall wurde vom KI-System korrekt diagnostiziert, während Arzt und SIRIUS-Software ihn als Verdachtsfall klassifizierten. Die ärztliche Befundung mit Unterstützung des KI-Systems war korrekt (Abbildung 107). Ursache des Fehlers könnte die Ermüdung des Arztes oder mangelnde Aufmerksamkeit infolge der Arbeitsbelastung gewesen sein. Dies unterstreicht die Bedeutung der Befundung mit Unterstützung des KI-Systems und zeigt zugleich eine Einschränkung der dem SIRIUS-Gerät beiliegenden Software.

**Abbildung 107:** Fall 3.

#### 7.6.4 Fall 4

Ein keratokonusverdächtiger Fall (Forme-fruste-Keratokonus) wurde vom KI-System und vom Arzt als eindeutiger Keratokonus diagnostiziert. Die dem SIRIUS-Gerät beiliegende Software stufte ihn als Verdachtsfall ein. In den Karten zeigte sich eine Erhebung auf der hinteren Höhenkarte, jedoch außerhalb des 5-mm-Kreises. Alle Diagramme außer den Höhenkarten deuteten auf einen eindeutigen Keratokonus hin; die Höhenkarten deuteten auf einen Verdacht (Abbildung 108). Obwohl der Fall grenzwertig war, verdeutlicht er die Bedeutung einer Überprüfung der topographischen Diagnosekriterien, insbesondere der hinteren Krümmungskarten, die bei der Diagnose die hintere Höhenkarte ergänzen können.

**Abbildung 108:** Fall 4.

#### 7.6.5 Fall 5

Ein Verdachtsfall wurde vom KI-System und von der SIRIUS-Software als eindeutiger Keratokonus diagnostiziert, während der Arzt ihn als Verdachtsfall beurteilte (Abbildung 109). Die Diagramme zeigen, dass die Höhenkarten zunächst auf einen eindeutigen und danach auf einen verdächtigen Keratokonus hindeuten, ohne eindeutige Erhebungen. Bei genauer Betrachtung findet sich jedoch innerhalb des 5-mm-Kreises eine unregelmäßige Vertiefung, die auf Unregelmäßigkeiten und Aberrationen hinweist. Auch dieser grenzwertige Fall unterstreicht die Bedeutung einer Überprüfung der topographischen Keratokonus-Kriterien, insbesondere der Aberrationen.

**Abbildung 109:** Fall 5.

#### 7.6.6 Fall 6

Ein Verdachtsfall wurde vom KI-System und vom Arzt als normal beurteilt, aber von der SIRIUS-Software und vom Arzt mit Unterstützung korrekt erkannt (Abbildung 110). Die hintere Höhenkarte enthält eine deutliche Erhebung; das zugehörige Diagramm weist auf einen Keratokonus hin. Das Endergebnis des KI-Systems gab jedoch eine Wahrscheinlichkeit von 53 % für normal und 46 % für verdächtig aus. Dies unterstreicht die Bedeutung der Befundung mit Unterstützung des KI-Systems.

**Abbildung 110:** Fall 6.

#### 7.6.7 Fall 7

Ein Verdachtsfall wurde von der SIRIUS-Software und vom Arzt als normal beurteilt, aber vom KI-System und von der ärztlichen Befundung mit KI-Unterstützung korrekt erkannt. Die hintere Höhenkarte enthält eine deutliche Erhebung und das zugehörige Diagramm weist auf einen Keratokonus hin; auch die Diagramme der meisten übrigen Karten deuten auf einen eindeutigen oder verdächtigen Keratokonus hin (Abbildung 111). Dies unterstreicht die Bedeutung der Befundung mit KI-Unterstützung und zeigt, dass SIRIUS den Fall trotz deutlicher hinterer Erhebung nicht erkannte.

**Abbildung 111:** Fall 7.

#### 7.6.8 Fall 8

Ein normaler Fall wurde vom KI-System, der SIRIUS-Software und dem Arzt als Verdachtsfall beurteilt. Die Höhenkarten deuteten auf einen eindeutigen oder verdächtigen Keratokonus hin, ohne die zuvor genannten topographischen Zeichen (Abbildung 112). Bei genauer Betrachtung finden sich jedoch innerhalb des 5-mm-Kreises einander gegenüberliegende Erhebung und Vertiefung; dies weist auf Unregelmäßigkeiten und Aberrationen hin und könnte die Diagnose erklären.

**Abbildung 112:** Fall 8.

#### 7.6.9 Fall 9

Ein normaler Fall wurde vom KI-System als Verdachtsfall beurteilt, während SIRIUS-Software und Arzt ihn korrekt als normal klassifizierten. Die hintere Höhenkarte deutete auf einen eindeutigen oder verdächtigen Keratokonus hin, ohne die zuvor genannten topographischen Zeichen (Abbildung 113). Bei genauer Betrachtung finden sich jedoch innerhalb des 5-mm-Kreises einander gegenüberliegende Erhebung und Vertiefung; auch dies weist auf Unregelmäßigkeiten und Aberrationen hin und könnte die Diagnose erklären.

**Abbildung 113:** Fall 9.

### 7.7 Stärken und Schwächen unserer Studie

**Stärken:**

- Die einzige Studie, die zehn verschiedene Karten topographischer Bilder einbezog.
- Verwendung eines von uns vorgeschlagenen neuen Netzwerkmodells sowie von Transfer Learning und Data Augmentation während des Trainings.
- Training mit realen Bildern.
- Relativ große Trainingsstichprobe.
- Drei Klassen in Training und Test: normale, keratokonische und verdächtige Hornhäute.
- Unabhängige Testgruppe, getrennt von Trainings- und Validierungsgruppe.
- Verwendung des SIRIUS-Geräts, das Placido-Scheibe und Pentacam-Kamera kombiniert.
- Untersuchung der Heatmaps zum Verständnis der Netzwerkfunktion.
- Untersuchung der ärztlichen Kartenbefundung mit Unterstützung des vorgeschlagenen KI-Systems.

**Schwächen:**

- Trainings-, Validierungs- und Testgruppen waren unausgewogen. Dies beeinflusst Training und Genauigkeitskennwerte. Deshalb wurde während des Trainings ein nach Klassenanteil gewichteter Loss verwendet; die Kennwerte wurden entsprechend der Prävalenzanteile berechnet, einschließlich PPV und NPV. Zusätzlich wurde der F1-Score untersucht, da er in solchen Situationen geeigneter ist als der reine Genauigkeitskennwert.
- Obwohl SIRIUS ein modernes und genaues Gerät ist, entwickeln sich Topographiegeräte laufend weiter. AS-OCT-Geräte gelten als genauer, da sie von Narben weniger beeinflusst werden und eine Epithel-Dickenkarte der Hornhaut liefern, die vermutlich eine wichtige Rolle bei der Erkennung früher Keratokonusfälle spielen wird; dieser Gegenstand wird weiter untersucht (Kanellopoulos & Asimellis, 2014).

## Kapitel 8: Zusammenfassung und Schlussfolgerungen

- Keratokonus ist in unserem Land eine relativ häufige Erkrankung, die gewöhnlich junge Menschen betrifft und Männer sowie Frauen gleichermaßen betrifft.
- Das Netz der vorderen tangentialen Krümmung erzielte eine hohe Genauigkeit bei der Diagnose eines eindeutigen Keratokonus. Die Netze der vorderen und hinteren Höhenkarten sowie der sagittalen Krümmung erzielten eine hohe Genauigkeit beim Ausschluss der Diagnose.
- Die Netze der vorderen und hinteren refraktiven Stärke sowie der vorderen und hinteren tangentialen Krümmung konnten das Vorliegen einer normalen Hornhaut mit hoher Fähigkeit ausschließen.
- Kein Kartennetz konnte die Diagnose einer verdächtigen Hornhaut bestätigen oder ausschließen. Dies könnte darauf zurückzuführen sein, dass diese Hornhäute ein Spektrum zwischen normalen und keratokonischen Hornhäuten darstellen und keine charakteristischen Muster extrahiert werden können.
- Das KI-System erzielte eine hohe Genauigkeit bei der Unterscheidung der drei Klassen (keratokonisch, normal und verdächtig). Die genauesten Netze waren in dieser Reihenfolge das Netz der vorderen Höhenkarte, der hinteren Höhenkarte, der vorderen refraktiven Stärke und der äquivalenten refraktiven Stärke.
- KI-System, dem SIRIUS-Gerät beiliegende Software und Arzt erzielten ähnliche Ergebnisse; zwischen ihnen bestand kein statistisch signifikanter Unterschied.
- Der Arzt mit Unterstützung des KI-Systems erzielte im Vergleich zu allen anderen Modellen, einschließlich des Arztes mit Unterstützung der SIRIUS-Software, das beste Ergebnis; der Unterschied war statistisch signifikant.
- Die Untersuchung der Heatmaps zeigte, dass die neuronalen Netze auf den verschiedenen Karten charakteristische Muster normaler und keratokonischer Hornhäute unterscheiden konnten.
- Die Untersuchung kontroverser Fälle zeigte, dass kein Modell und kein System frei von Einschränkungen ist. Befragung und klinische Untersuchung beider Augen sind für eine korrekte Diagnose, insbesondere in grenzwertigen Fällen, wesentlich. Die Bedeutung dieser Systeme und Modelle liegt in der Bildvorsortierung und in der schnellen und genauen Unterstützung des Arztes bei der Entscheidungsfindung.
- Die Falluntersuchung zeigte außerdem, dass die neuronalen Netze unregelmäßige Muster (Aberrationen) auf Höhenkarten, tangentialen Krümmungskarten und hinteren Krümmungskarten erkannten, die mit einem eindeutigen oder verdächtigen Keratokonus vereinbar sein können.

## Kapitel 9: Vorschläge und Empfehlungen

- Wir empfehlen, das KI-System als Hilfsinstrument für den Arzt bei der Befundung topographischer Karten einzusetzen.
- Wir empfehlen, bei der Untersuchung verdächtiger Fälle die Höhen-, tangentialen Krümmungs- und refraktiven Stärkekarten besonders zu berücksichtigen und Informationen aus mehreren Karten miteinander zu vergleichen.
- Wir empfehlen, die topographische Definition des Keratokonus zu überprüfen und zu untersuchen, ob Unregelmäßigkeiten und Aberrationen zumindest bei verdächtigen und grenzwertigen Fällen als diagnostisches Kriterium aufgenommen werden können.
- Wir empfehlen weitere Studien mit Topographiegeräten nach dem AS-OCT-Prinzip, da ihre Bilder genauer sind und sie zusätzlich eine bei anderen Geräten nicht vorhandene Epithel-Dickenkarte liefern.
- Wir empfehlen eine multizentrische Studie, um eine größere Trainings- und Testgruppe zu erhalten und dadurch Genauigkeit und Zuverlässigkeit des Systems möglicherweise zu erhöhen.

## Kapitel 10: Abschließendes Wort

Diese Dissertation ist das Ergebnis von drei Jahren kontinuierlicher Arbeit. Als Ergebnis dieser Arbeit entstand neben der vorliegenden Untersuchung das vorgeschlagene KI-System mit dem Namen **KeratoDetect**. Es kann über einen QR-Code (Abbildung 114) von jedem Ort der Welt aus kostenlos aufgerufen und verwendet werden.

**Schritte zur Nutzung der Anwendung:**

- Den Link mit einem beliebigen Gerät öffnen (Laptop, Mobiltelefon, Tablet usw.).
- Die Kartenbilder hochladen.
- Festlegen, zu welcher Karte jedes Bild gehört.
- Die Schaltfläche `P` drücken.
- Es erscheint eine Tabelle mit den Wahrscheinlichkeiten für jede Klasse für jede einzelne Karte; anschließend erscheint eine Tabelle mit den Wahrscheinlichkeiten des Gesamtsystems.

**Wichtige Hinweise:**

- Die Anwendung ist ein Screening- und Hilfsinstrument für den Arzt bei der Diagnose, aber kein Ersatz für die Beurteilung und angemessene Beratung der Patientin oder des Patienten.
- Alle Rechte bleiben dem Forscher und der Universität Damaskus vorbehalten.
- Innerhalb Syriens muss ein VPN-Programm verwendet werden.

**Abbildung 114:** Zusammenfassung der Nutzung des Programms.

## Literaturverzeichnis

Die folgenden bibliografischen Angaben werden unverändert aus dem Original übernommen.

AAO. (2009). Basic and Clinical Science Course 2009-2010. In Refractive Surgery (Vol. 13, pp. 6-30). USA: American Academy of Ophthalmology.

AAO. (2012). Basic and Clinical Science Course 2012-2013. In Cornea and External Diseases (Vol. 8, pp. 296–300). USA: American Academy of Ophthalmology.

Abd Elrahman, S. M., Abraham, A. J. J. o. N., & Computing, I. (2013). A review of class imbalance problem. 1(2013), 332-340.

Abdelmotaal, H., Mostafa, M. M., Mostafa, A. N., Mohamed, A. A., Abdelazeem, K. J. T. V. S., & Technology. (2020). Classification of color-coded Scheimpflug camera corneal tomography images using deep learning. 9(13), 30-30.

Al Rahhal, M. M., Bazi, Y., AlHichri, H., Alajlan, N., Melgani, F., & Yager, R. R. J. I. S. (2016). Deep learning approach for active classification of electrocardiogram signals. 345, 340-354.

Ambrósio, R., Jr., Lopes, B. T., Faria-Correia, F., Salomão, M. Q., Bühren, J., Roberts, C. J., . . . Vinciguerra, P. (2017). Integration of Scheimpflug-Based Corneal Tomography and Biomechanical Assessments for Enhancing Ectasia Detection. J Refract Surg, 33(7), 434-443. doi:10.3928/1081597x-20170426-02

Anayol, M. A., Güler, E., Yagc, R., Sekeroglu, M. A., Ylmazoglu, M., Trhs, H., . . . Ylmazbas, P. (2014). Comparison of central corneal thickness, thinnest corneal thickness, anterior chamber depth, and simulated keratometry using galilei, Pentacam, and Sirius devices. Cornea, 33(6), 582-586.

Arbelaez, M. C., Versaci, F., Vestri, G., Barboni, P., & Savini, G. J. O. (2012). Use of a support vector machine for keratoconus and subclinical keratoconus detection by topographic and tomographic data. 119(11), 2231-2238.

Asaoka, R., Murata, H., Iwase, A., & Araie, M. (2016). Detecting preperimetric glaucoma with standard automated perimetry using a deep learning classifier. Ophthalmology, 123(9), 1974-1980.

Askar, M. H., Yosra; Alsoos, Madhat. (2020a). Detect Keratoconus using Support Vector Machine classifier. Journal of Health Sciences Damascus University.

Askar, M. H., Yosra; Alsoos, Madhat. (2020b). Prevalence of Form Frost Keratoconus. Journal of Health Sciences Damascus University.

Askar, M. H., Yosra; Alsoos, Madhat. (2020c). Prevalence of keratoconus and suspect keratoconus among patients at department of ophthalmology -Almouassat University Hospital. Journal of Health Sciences Damascus University.

Bogunović, H., Waldstein, S. M., Schlegl, T., Langs, G., Sadeghipour, A., Liu, X., . . . science, v. (2017). Prediction of anti-VEGF treatment requirements in neovascular AMD using a machine learning approach. 58(7), 3240-3248.

Bonaccorso, G. (2017). Machine learning algorithms: Packt Publishing Ltd.

Buda, M., Maki, A., & Mazurowski, M. A. (2018). A systematic study of the class imbalance problem in convolutional neural networks. Neural Networks, 106, 249-259.

Chakravarthy, U., Goldenberg, D., Young, G., Havilio, M., Rafaeli, O., Benyamini, G., & Loewenstein, A. J. O. (2016). Automated identification of lesion activity in neovascular age-related macular degeneration. 123(8), 17-31, 1736.

Chen, A. J., Long, C. P., Flanders, L. D., Garff, K., Bernhisel, A., Brown, S., & Afshari, N. A. (2020). Terrien's Marginal Degeneration: A Case of Spontaneous Bilateral Corneal Perforation and Review of the Literature. Paper presented at the 2020 ASCRS Annual Meeting.

Cheng, H., Kane, J. X., Liu, L., Li, J., Cheng, B., & Wu, M. J. J. o. R. S. (2020). Refractive Predictability Using the IOLMaster 700 and Artificial Intelligence–Based IOL Power Formulas Compared to Standard Formulas. 36(7), 466-472.

Cirkovic, B. R. A., Cvetkovic, A. M., Ninkovic, S. M., & Filipovic, N. D. (2015). Prediction models for estimation of survival rate and relapse for breast cancer patients. Paper presented at the 2015 IEEE 15th International Conference on Bioinformatics and Bioengineering (BIBE).

Coello, C. A. C. (2005). An introduction to evolutionary algorithms and their applications. Paper presented at the International Symposium and School on Advanced Distributed Systems.

Copeland, R. A., & Afshari, N. (2013). Corneal Dystrophies and Degenerations. In Copeland and Afshari's Principles and Practice of Cornea (Vol. 1, pp. 819-828): JP Medical Ltd.

Cortes, C., & Vapnik, V. (1995). Support-vector networks. Machine learning, 20(3), 273-297.

Coster, D. J. (2002a). Corneal ectasia: acquired abnormalities of corneal shape. In Fundamentals of Clinical Ophthalmology Cornea (pp. 93-100).

Coster, D. J. (2002b). Fundamentals of Clinical Ophthalmology Cornea. 13-94.

Cowan, R. (2001). Expert systems: aspects of and limitations to the codifiability of knowledge. Research Policy, 30(9), 1355-1372.

CSO. MS-39 (AS-OCT). Retrieved from https://www.csoitalia.it/en/prodotto/info/63-ms-39

CSO. (2018). PHOENIX 3.7 In Instructions For Use (3.7 ed., pp. 228-248). Italy: COSTRUZIONE STRUMENTI OFTALMICI.

Damato, B., Eleuteri, A., Fisher, A. C., Coupland, S. E., & Taktak, A. F. J. O. (2008). Artificial neural networks estimating survival probability after treatment of choroidal melanoma. 115(9), 1598-1607.

Darcy, K., Gunn, D., Tavassoli, S., Sparrow, J., Kane, J. X. J. J. o. C., & Surgery, R. (2020). Assessment of the accuracy of new and updated intraocular lens power calculation formulas in 10 930 eyes from the UK National Health Service. 46(1), 2-7.

De Fauw, J., Ledsam, J. R., Romera-Paredes, B., Nikolov, S., Tomasev, N., Blackwell, S., . . . Visentin, D. J. N. m. (2018). Clinically applicable deep learning for diagnosis and referral in retinal disease. 24(9), 1342-1350.

Dua, H., Faraj, L., & Said, D. (2015). Duas layer: Discovery, characteristics, clinical applications, controversy and potential relevance to glaucoma. Expert Review of Ophthalmology, 10, 1-17. doi:10.1586/17469899.2015.1103180

Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M., Blau, H. M., & Thrun, S. (2017). Dermatologist-level classification of skin cancer with deep neural networks. Nature, 542(7639), 115-118. doi:10.1038/nature21056

Feigenbaum, E., & Buchanan, B. (1994). DENDRAL and META-DENDRAL: Roots of knowledge systems and expert system applications. Artificial Intelligence, 59(1-2), 233-240.

Fernández, J., Rodríguez-Vallejo, M., & Piñero, D. P. J. J. o. R. S. (2019). Tomographic and biomechanical index (TBI) for screening in laser refractive surgery. 35(6), 398-398.

Fiorelli, F., Tomita, E., & Neto, A. (2015). Artificial Neural Network for Predicting Energy Consumption.

Gao, X., Lin, S., & Wong, T. Y. J. I. T. o. B. E. (2015). Automatic feature learning to grade nuclear cataracts based on deep learning. 62(11), 2693-2701.

Gokhale, N. S. (2013). Epidemiology of keratoconus. Indian journal of ophthalmology, 61(8), 382-383. doi:10.4103/0301-4738.116054

Gokhale, N. S. (2013). Epidemiology of keratoconus. Indian journal of ophthalmology, 61(8), 382.

Graw, J. (2010). Eye development. In Current topics in developmental biology (Vol. 90, pp. 343-386): Elsevier.

Gulshan, V., Peng, L., Coram, M., Stumpe, M. C., Wu, D., Narayanaswamy, A., . . . Webster, D. R. (2016). Development and Validation of a Deep Learning Algorithm for Detection of Diabetic Retinopathy in Retinal Fundus Photographs. Jama, 316(22), 2402-2410. doi:10.1001/jama.2016.17216

Han, D., Liu, Q., & Fan, W. J. E. S. w. A. (2018). A new image classification method using CNN transfer learning and web data augmentation. 95, 43-56.

Hastie, T., Tibshirani, R., & Friedman, J. (2001). The Elements of Statistical Learning: Data Mining, Inference, and Prediction. Springer, New York, NY.

Henriquez, M. A., Hadid, M., & Izquierdo, L. (2020). A Systematic Review of Subclinical Keratoconus and Forme Fruste Keratoconus. Journal of Refractive Surgery, 36(4), 270-279.

Hoffman, J. I. (1976). The incorrect use of Chi-square analysis for paired data. Clin Exp Immunol, 24(1), 227-229.

Hori-Komai, Y., Toda, I., Asano-Kato, N., Tsubota, K. J. J. o. C., & Surgery, R. (2002). Reasons for not performing refractive surgery. 28(5), 795-797.

Jatana, V. (2019). Machine Learning Algorithms: ResearchGate.

Jeong, J. (2019). The Most Intuitive and Easiest Guide for Convolutional Neural Network. Retrieved from https://towardsdatascience.com/the-most-intuitive-and-easiest-guide-for-convolutional-neural-network-3607be47480e

Jones, M. T. (2008). The History of AI. In Artificial Intelligence: A Systems Approach: A Systems Approach (pp. 15-19): Jones & Bartlett Learning.

Kamiya, K., Ayatsuka, Y., Kato, Y., Fujimura, F., Takahashi, M., Shoji, N., . . . Miyata, K. J. B. o. (2019). Keratoconus detection using deep learning of colour-coded maps with anterior segment optical coherence tomography: a diagnostic accuracy study. 9(9), e031313.

Kanellopoulos, A. J., & Asimellis, G. (2014). OCT corneal epithelial topographic asymmetry as a sensitive diagnostic tool for early and advancing keratoconus. Clinical ophthalmology (Auckland, N.Z.), 8, 2277-2287. doi:10.2147/OPTH.S67902

Kanski, J. J., & Bowling, B. (2015). Cornea. In Kanski's clinical ophthalmology e-book: a systematic approach (pp. 213-215): Elsevier Health Sciences.

Khachikian, S., & Belin, M. (2008). Normal Values for Corneal Elevation Using the Pentacam Eye Scanner. Paper presented at the Presented ESCRS Winter Congress, Barcelona, Spain.

Khachikian, S. S. (2012). Elevation Based Corneal Tomography. In Normative Data for the Oculus Pentacam (pp. 71).

Klyce, S. D. (2009). Chasing the suspect: keratoconus. In: BMJ Publishing Group Ltd.

Komorowski, M., Celi, L. A., Badawi, O., Gordon, A. C., & Faisal, A. A. (2018). The Artificial Intelligence Clinician learns optimal treatment strategies for sepsis in intensive care. Nature Medicine, 24(11), 1716-1720. doi:10.1038/s41591-018-025-13

KUMAR, V. (2020). PELLUCID MARGINAL DEGENERATION. University Journal of Surgery, Surgical Specialities, 6(7).

Kuo, B.-I., Chang, W.-Y., Liao, T.-S., Liu, F.-Y., Liu, H.-Y., Chu, H.-S., . . . Technology. (2020). Keratoconus screening based on deep learning approach of corneal topography. 9(2), 53-53.

Lavric, A., Popa, V., Takahashi, H., & Yousefi, S. J. I. A. (2020). Detecting Keratoconus From Corneal Imaging Data Using Machine Learning. 8, 149113-149121.

Lavric, A., & Valentin, P. (2019). KeratoDetect: Keratoconus Detection Algorithm Using Convolutional Neural Networks. Computational Intelligence and Neuroscience, 2019, 8162567. doi:10.1155/2019/8162567

Lechner, J., Porter, L. F., Rice, A., Vitart, V., Armstrong, D. J., Schorderet, D. F., . . . Willoughby, C. E. (2014). Enrichment of pathogenic alleles in the brittle cornea gene, ZNF469, in keratoconus. Human Molecular Genetics, 23(20), 5527-5535. doi:10.1093/hmg/ddu253 %J Human Molecular Genetics

Li, Z., He, Y., Keel, S., Meng, W., Chang, R. T., & He, M. J. O. (2018). Efficacy of a deep learning system for detecting glaucomatous optic neuropathy based on color fundus photographs. 125(8), 1199-1206.

Liao, S.-H. (2005). Expert system methodologies and applications—a decade review from 1995 to 2004. Expert systems with applications, 28(1), 93-103.

Liu, X., Jiang, J., Zhang, K., Long, E., Cui, J., Zhu, M., . . . Lin, Z. (2017). Localization and diagnosis framework for pediatric cataracts based on slit-lamp images using deep features of a convolutional neural network. PloS one, 12(3), e0168606.

Mijwel, M. M. J. C. s., college of science. (2015). History of artificial intelligence. 1-6.

Minaee, S., Kafieh, R., Sonka, M., Yazdani, S., & Jamalipour Soufi, G. (2020). Deep-COVID: Predicting COVID-19 from chest X-ray images using deep transfer learning. Med Image Anal, 65, 101794. doi:10.1016/j.media.2020.101794

Moore, A. W. (2001). Cross-validation for detecting and preventing overfitting. School of Computer Science Carnegie Mellon University.

Muhammad, H., Fuchs, T. J., De Cuir, N., De Moraes, C. G., Blumberg, D. M., Liebmann, J. M., . . . Hood, D. C. J. J. o. g. (2017). Hybrid deep learning on single wide-field optical coherence tomography scans accurately classifies glaucoma suspects. 26(12), 1086.

Naderan, M., Jahanrad, A., & Balali, S. (2017). Histopathologic findings of keratoconus corneas underwent penetrating keratoplasty according to topographic measurements and keratoconus severity. International journal of ophthalmology, 10, 1640-1646. doi/10.18240:ijo.2017.11.02

Negnevitsky, M. (2005). Artificial intelligence: a guide to intelligent systems: Pearson education.

Niavarani, M. R., & Wickramasinghe, N. (2014). The suitability of artificial neural networks in service quality control and forecasting. In Lean Thinking for Healthcare (pp. 29-42): Springer.

Nowak, D. M., & Gajecka, M. (2011). The genetics of keratoconus. Middle East African journal of ophthalmology, 18(1), 2-6. doi:10.4103/0974-9233.75876

O'Shea, K., & Nash, R. (2015). An introduction to convolutional neural networks. arXiv preprint arXiv:.08458.

OCULUS. The topography maps of the Pentacam. Retrieved from https://www.pentacam.com/int/opticianoptometrist-without-pentacamr/technology/topography-maps.html?utm_content=leaderboard-eyetube-en%252525252525252525252525252525252527%27%22

Oculus. (2021). OCULUS Corvis® ST. Retrieved from https://www.oculus.de/en/products/tonometer/corvis-st/highlights/#produkte_navi

Oliveira, C. M., Ribeiro, C., Franco, S. J. C., & Optometry, E. (2011). Corneal imaging with slit-scanning and Scheimpflug imaging techniques. 94(1), 33-42.

Oppermann, A. (2019). What is Deep Learning and How does it work? Retrieved from https://towardsdatascience.com/what-is-deep-learning-and-how-does-it-work-2ce44bb692ac

Partridge, D. J. F. G. C. S. (1987). The scope and limitations of first generation expert systems. 3(1), 1-10.

Poplin, R., Varadarajan, A. V., Blumer, K., Liu, Y., McConnell, M. V., Corrado, G. S., . . . Webster, D. R. J. N. B. E. (2018). Prediction of cardiovascular risk factors from retinal fundus photographs via deep learning. 2(3), 158-164.

Prahs, P., Radeck, V., Mayer, C., Cvetkov, Y., Cvetkova, N., Helbig, H., . . . Ophthalmology, E. (2018). OCT-based deep learning algorithm for the evaluation of treatment indication with anti-vascular endothelial growth factor medications. 256(1), 91-98.

Rao, S. N., Raviv, T., Majmudar, P. A., & Epstein, R. J. J. O. (2002). Role of Orbscan II in screening keratoconus suspects before refractive corneal surgery. 109(9), 1642-1646.

Renato, A. J., Bernardo, T. Lopes. (2016). Ultimate Ectasia Detection 2016: Integrating Corneal Tomography and Biomechanical Assessment. OCULUS Special Supplement.

Riccardo, V. P., Vinciguerra. (2016). The New Vinciguerra Screening Report and Corvis Biomechanical Index (CBI). OCULUS Special Supplement.

Roberts, C. (2016). Two novel stiffness parameters for the Corvis ST. OCULUS Special Supplement.

Romero-Jiménez, M., Santodomingo-Rubido, J., Wolffsohn, J. S. J. C. L., & Eye, A. (2010). Keratoconus: a review. 33(4), 157-166.

Russell, S., & Norvig, P. (2002a). Artificial intelligence: a modern approach.

Russell, S., & Norvig, P. (2002b). Learning from Examples. In Artificial intelligence: a modern approach (pp. 708-711).

Ruutila, M., Fagerholm, P., Lagali, N., Hjortdal, J., Bram, T., Moilanen, J., & Kivelä, T. T. (2020). Diagnostic Criteria for Terrien Marginal Degeneration: Nordic Terrien Degeneration Study. Cornea.

Sahu, J., & Raizada, K. (2020). Pellucid Marginal Corneal Degeneration. StatPearls.

Santhiago, M. R., Giacomin, N. T., Smadja, D., & Bechara, S. J. (2016). Ectasia risk factors in refractive surgery. Clinical ophthalmology (Auckland, N.Z.), 10, 713-720. doi:10.2147/OPTH.S51313

Sarle, W. S. (1994). Neural networks and statistical models.

Sarle, W. S. (1996). Stopped training and other remedies for overfitting. Computing science statistics, 352-360.

Sarno, R., & Wijaya, D. (2019). Recent development in electronic nose data processing for beef quality assessment. TELKOMNIKA Indonesian Journal of Electrical Engineering, 17, 337-348. doi:10.12928/TELKOMNIKA.v17i1.10565

Scarborough, D., & Somers, M. J. D. A. P. A. (2006). Neural networks in organizational research: Applying pattern recognition to the analysis of organizational behavior. Washington, DC, US: American Psychological Association.

Shi, F., Wang, J., Shi, J., Wu, Z., Wang, Q., Tang, Z., . . . Shen, D. (2020). Review of Artificial Intelligence Techniques in Imaging Data Acquisition, Segmentation and Diagnosis for COVID-19. IEEE Reviews in Biomedical Engineering, 1-1. doi:10.1109/RBME.2020.2987975

Sinjab, M. (2009). Corneal Topography in Clinical Practice. In (pp. 7-15). New Delhi, India: Jaypee Brothers.

Sinjab, M. M. (2011a). Classifications and Patterns of Keratoconus and Keratectasia. In Quick guide to the management of keratoconus: a systematic step-by-step approach (pp. 13-58). Germany: Springer Science & Business Media.

Sinjab, M. M. (2011b). Diagnosis of Keratoconus. In Quick guide to the management of keratoconus: a systematic step-by-step approach (pp. 6-10). Germany: Springer Science & Business Media.

Sinjab, M. M. (2018a). Corneal Power Maps. In Corneal Tomography in Clinical Practice (Pentacam System): Basics & Clinical Interpretation (pp. 36-50): Jaypee Brothers, Medical Publishers Pvt. Limited.

Sinjab, M. M. (2018b). Corneal Tomography in Clinical Practice (Pentacam System): Basics & Clinical Interpretation: Jaypee Brothers, Medical Publishers Pvt. Limited.

Sinjab, M. M. (2018c). Elevation Maps. In Corneal Tomography in Clinical Practice (Pentacam System): Basics & Clinical Interpretation (pp. 51-59): Jaypee Brothers, Medical Publishers Pvt. Limited.

Sinjab, M. M. (2018d). Tomographic Characteristic of Ectatic Corneal Diseases. In Corneal Tomography in Clinical Practice (Pentacam System): Basics & Clinical Interpretation (pp. 167-176). Jaypee Brothers, Medical Publishers Pvt. Limited.

Sinjab, M. M., & Youssef, L. N. (2012). Pellucid-like keratoconus. F1000Research, 1, 48-48. doi:10.12688/f1000research.48-1.v1

Sitapati, A., Kim, H., Berkovich, B., Marmor, R., Singh, S., El-Kareh, R., . . . Ohno-Machado, L. (2017). Integrated precision medicine: the role of electronic health records in delivering personalized treatment. Wiley Interdisciplinary Reviews: Systems Biology Medicine, 9(3), e1378.

Slomka, P. J., Dey, D., Sitek, A., Motwani, M., Berman, D. S., & Germano, G. J. E. r. o. m. d. (2017). Cardiac imaging: working towards fully-automated machine analysis & interpretation. 14(3), 197-212.

Smadja, D., Touboul, D., Cohen, A., Doveh, E., Santhiago, M. R., Mello, G. R., . . . Colin, J. J. A. j. o. o. (2013). Detection of subclinical keratoconus using an automated decision tree classification. 156(2), 237-246. e231.

Smola, A., & Vishwanathan, S. J. C. U., UK. (2008). Introduction to machine learning. 32, 34.

Snell, R. S., & Lemp, M. A. (2013). Clinical anatomy of the eye. In (pp. 5-12): John Wiley & Sons.

Sokolova, M., Japkowicz, N., & Szpakowicz, S. (2006). Beyond accuracy, F-score and ROC: a family of discriminant measures for performance evaluation. Paper presented at the Australasian joint conference on artificial intelligence.

Souza, M. B., Medeiros, F. W., Souza, D. B., Garcia, R., & Alves, M. R. J. C. (2010). Evaluation of machine learning classifiers in keratoconus detection from orbscan II examinations. 65(12), 1223-1228.

Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I., & Salakhutdinov, R. (2014). Dropout: a simple way to prevent neural networks from overfitting. The journal of machine learning research, 15(1), 1929-1958.

Tajmir, S. H., Lee, H., Shailam, R., Gale, H. I., Nguyen, J. C., Westra, S. J., . . . Do, S. (2019). Artificial intelligence-assisted interpretation of bone age radiographs improves accuracy and decreases variability. Skeletal radiology, 48(2), 275-283.

Treder, M., Lauermann, J. L., Eter, N. J. G. s. A. f. C., & Ophthalmology, E. (2018). Automated detection of exudative age-related macular degeneration in spectral domain optical coherence tomography using deep learning. 256(2), 259-265.

Tummanapalli, S. S., Potluri, H., Vaddavalli, P. K., & Sangwan, V. S. (2015). Efficacy of axial and tangential corneal topography maps in detecting subclinical keratoconus. Journal of Cataract & Refractive Surgery, 41(10), 2205-2214. doi:https://doi.org/10.1016/j.jcrs.2015.10.041

Van Der Heijden, A. A., Abramoff, M. D., Verbraak, F., van Hecke, M. V., Liem, A., & Nijpels, G. (2018). Validation of automated screening for referable diabetic retinopathy with the IDx-DR device in the Hoorn Diabetes Care System. Acta ophthalmologica, 96(1), 63-68.

Vargas, R., Mosavi, A., & Ruiz, R. (2017). Deep learning: a review. Advances in Intelligent Systems Computing.

Vinciguerra, R., Ambrósio, R., Jr., Elsheikh, A., Roberts, C. J., Lopes, B., Morenghi, E., . . . Vinciguerra, P. (2016). Detection of Keratoconus With a New Biomechanical Index. J Refract Surg, 32(12), 803-810. doi:10.3928/1081597x-20160629-01

Wallang, B., & Das, S. (2013). Keratoglobus. Eye, 27(9), 1004-1012.

Wang, C., Zhu, X., Hong, J. C., & Zheng, D. (2019). Artificial Intelligence in Radiotherapy Treatment Planning: Present and Future. Technol Cancer Res Treat, 18, 1533033819873922. doi:10.1177/1533033819873922

Wang, W., & Siau, K. (2018). Trust in Health Chatbots.

Wilson, S. E., Klyce, S. D., & Husseini, Z. M. (1993). Standardized color-coded maps for corneal topography. Ophthalmology, 100(11), 1723-1727. doi:10.1016/S0161-6420(93)31410-7

Yanoff, M., & Jay, S. (2014). Duker ophthalmology. In (pp. 163-167): New York: Thieme Medical Publishers.

Yu, X., & Gen, M. (2010). Introduction. In Introduction to evolutionary algorithms (pp. 3-10): Springer Science & Business Media.

Zhou, Q., Sinai, M. J., Moore, J. C., & Wong, W. (2006). Method and system for detecting the effects of Alzheimer's disease in the human retina. In: Google Patents.

Zimmermann, M. (2017). Machine Learning: A gentle Introduction. Retrieved from https://www.slideshare.net/MatthiasZimmermann1/machine-learning-a-gentle-introduction

## Deutsche Übersetzung des englischen Abstracts (Original S. 195)

### Einleitung

Keratokonus ist eine häufige Erkrankung; ihre frühe Erkennung ist sehr wichtig. Sie erfolgt durch sorgfältige Befundung topographischer Bilder, um zwischen keratokonischen, verdächtigen und normalen Hornhäuten zu unterscheiden. Viele Studien haben versucht, Kriterien und Indikatoren zu finden, die eine Früherkennung unterstützen, wobei die Genauigkeitskennwerte unterschiedlich ausfielen. Die bisherigen Ansätze beruhten jedoch auf einem sehr kleinen Teil der topographischen Informationen. Nach dem qualitativen Sprung in der Informatik, insbesondere auf dem Gebiet der künstlichen Intelligenz und künstlicher neuronaler Netze, sowie dem Aufkommen medizinischer Anwendungen zur Befundung und Analyse medizinischer Bilder war es erforderlich, diese Technik zur Erkennung verdächtiger und keratokonischer Hornhäute zu untersuchen.

### Ziel der Studie

Untersuchung der Leistungsfähigkeit von Computer-Vision-Technologien und Deep-Learning-Algorithmen zur Unterscheidung topographischer Kartenbilder normaler, keratokonischer und verdächtiger Hornhäute.

### Material und Methoden

Die Studie besteht aus zwei Teilen. Der erste Teil ist eine retrospektive Untersuchung von Patientenakten und Bildern zur Zusammenstellung einer Trainingsstichprobe aus 987 Augen (300 keratokonische, 610 normale und 77 verdächtige Augen). Der zweite Teil ist eine Querschnittsuntersuchung zur Zusammenstellung der Teststichprobe aus 422 Augen (13 keratokonische, 366 normale und 43 verdächtige Augen). Das KI-System besteht aus zehn künstlichen neuronalen Netzen. Jedes Netz ist für die Befundung einer Karte (vordere und hintere tangentiale Karten, vordere und hintere sagittale Karten, vordere und hintere Höhenkarten, vordere, hintere und äquivalente refraktive Karten sowie Dicke) und die Vorhersage der korrekten Klasse zuständig. Die Ausgaben dieser Netze bilden die Eingaben eines abschließenden neuronalen Netzes, das die endgültige Entscheidung des Systems trifft.

### Ergebnisse

Das KI-System erreichte in der Testgruppe Genauigkeits- und Gesamtwerte des gewichteten F1-Scores von 92,2 %–91,2 %. Zwischen ihm, der dem SIRIUS-Gerät beiliegenden Software und dem Arzt bestand kein statistisch signifikanter Unterschied (p > 5 %). Der Arzt erzielte mit Unterstützung des KI-Systems im Vergleich zu allen anderen Modellen das beste Ergebnis: 96,2 % Genauigkeit und 95,9 % gewichteter F1-Score; der Unterschied war statistisch signifikant (p < 5 %).

### Schlussfolgerungen

Wir empfehlen, das KI-System als Hilfsinstrument für den Arzt bei der Befundung topographischer Karten einzusetzen.

**Schlüsselwörter:** Keratokonus; künstliche Intelligenz; Deep Learning; neuronale Netze.

## Übertragene Titelseite (Original S. 196)

**Syrische Arabische Republik**  
**Universität Damaskus**  
**Fakultät für Humanmedizin**  
**Abteilung für Augenheilkunde**

### Einsatz von Computer-Vision-Technik und Deep-Learning-Algorithmen zur Differenzierung topographischer Bilder normaler, keratokonischer und verdächtiger Hornhäute

Eine Dissertation, eingereicht zur teilweisen Erfüllung der Voraussetzungen für den Doktorgrad (PhD) in Augenheilkunde

**Verfasser:**  
Dr. Mohammad Zafrallah Askar

**Betreuerin:** Yosra Haddeh, Professorin für Augenheilkunde an der Medizinischen Fakultät der Universität Damaskus

**Mitbetreuer:** Madhat Alsoos, Abteilung für künstliche Intelligenz, Fakultät für Informatik und Informationstechnik, Universität Damaskus

**Studienjahr:** 2020–2021
