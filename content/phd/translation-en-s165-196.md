## S. 165–188 – Discussion, Conclusions, Recommendations and Closing

### 7.3 AI system and comparison with similar studies

The AI system achieved overall accuracy and weighted F-score values of 94.3%–94.5% in the training group, 93.9%–94.1% in the validation group, and 91.2%–92.2% in the test group (Table 57). This represents high accuracy and is consistent with the international studies presented previously. The slightly lower values in the present study can be explained by the different study design and the type of sample compiled.

Based on the weighted F1-score, the network for the anterior elevation map achieved the highest accuracy in the test group, followed by the posterior elevation map, the anterior refractive power map, and the equivalent refractive power map. This partially agrees with earlier studies. In Kuo et al. (2020), the posterior elevation map achieved the best result, followed by the posterior curvature map, the anterior elevation map, and the pachymetry map. In Abdelmotaal et al. (2020), the posterior elevation map was best, followed by the anterior sagittal curvature map, the anterior elevation map, and finally the pachymetry map (cf. Table 5).

**Table 57 – Summary of neural network and AI system results.**

| Map/Model | Accuracy Training | Accuracy Validation | Accuracy Test | Weighted F1 Training | Weighted F1 Validation | Weighted F1 Test |
|---|---:|---:|---:|---:|---:|---:|
| Overall | 0.945 | 0.941 | 0.922 | 0.943 | 0.939 | 0.912 |
| RAP | 0.907 | 0.858 | 0.896 | 0.890 | 0.846 | 0.852 |
| RPP | 0.889 | 0.907 | 0.896 | nan | nan | nan |
| TA | 0.871 | 0.876 | 0.896 | nan | nan | nan |
| TP | 0.898 | 0.897 | 0.896 | 0.863 | 0.865 | nan |
| TEAE | 0.890 | 0.912 | 0.893 | 0.860 | 0.883 | 0.864 |
| REF | 0.884 | 0.902 | 0.891 | 0.852 | 0.866 | 0.850 |
| SP | 0.896 | 0.907 | 0.891 | nan | nan | nan |
| TEPE | 0.902 | 0.904 | 0.877 | 0.875 | 0.882 | 0.853 |
| THK | 0.837 | 0.837 | 0.860 | 0.811 | 0.809 | nan |
| SA | 0.888 | 0.904 | 0.841 | 0.850 | nan | nan |

### 7.4 Comparison with other models

- The AI system, the SIRIUS device, and the physician without support achieved similar results, with a slight advantage for the physician, followed by the AI system. No statistically significant difference existed between them.
- The physician with SIRIUS device support achieved better results than the AI system, the SIRIUS device, and the physician without support. The difference compared with SIRIUS and the physician without support was statistically significant; compared with the AI system it was not significant.
- The physician with AI system support achieved the best result compared with all other models. The difference was statistically significant compared with all other models including the physician with SIRIUS support (Tables 53 and 58).

**Table 58 – Summary of all model results.**

| Model | Accuracy | Weighted F1-score |
|---|---:|---:|
| DR&AI | 0.962 | 0.959 |
| DR&CSO | 0.945 | 0.941 |
| DR | 0.929 | 0.924 |
| AI | 0.922 | 0.912 |
| CSO | 0.919 | 0.911 |

### 7.5 Discriminative feature maps and heatmaps

As mentioned earlier, a limitation of neural networks is that it is not precisely known what happens during the decision-making process. The network learns from examples, and it is difficult to recognise which patterns it has learned. Discriminative feature maps and heatmaps help to understand the processes within the model and the patterns used for the decision. Below, examples of the heatmaps for each trained neural network are described. The networks were trained with images of normal and keratoconic corneas. The heatmap was placed on the right and overlaid with the topography map image on the left; this makes the patterns used by the network for decision-making visible.

#### 7.5.1 Anterior sagittal curvature map

The neural network could obviously distinguish the symmetrical butterfly pattern of the normal cornea from the inferior curvatures of the keratoconic cornea (Figure 95).

**Figure 95:** Network heatmaps for the anterior sagittal curvature map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.2 Posterior sagittal curvature map

The network could obviously distinguish the symmetrical butterfly pattern of the normal cornea from the irregular shape of the keratoconic cornea (Figure 96).

**Figure 96:** Network heatmaps for the posterior sagittal curvature map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.3 Anterior tangential curvature map

The network could obviously distinguish the symmetrical butterfly pattern of the normal cornea from a butterfly pattern with inferior curvature in the keratoconic cornea (Figure 97).

**Figure 97:** Network heatmaps for the anterior tangential curvature map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.4 Posterior tangential curvature map

The network could obviously distinguish the symmetrical pattern of the normal cornea from the curved bulges of the keratoconic cornea (Figure 98).

**Figure 98:** Network heatmaps for the posterior tangential curvature map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.5 Anterior elevation map

The network could distinguish the elevations and assess their significance. In the normal cornea, it ignored the elevation and did not interpret it as indicative of keratoconus. In the keratoconic cornea, it could recognise the elevation and the opposing depression, as if it had identified an aberration of the separating surface (Figure 99).

**Figure 99:** Network heatmaps for the anterior elevation map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.6 Posterior elevation map

The network distinguished the elevations and the tongue-like structure in the image of the keratoconic cornea (Figure 100).

**Figure 100:** Network heatmaps for the posterior elevation map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.7 Pachymetry map

The network could distinguish the thinning area and the inferior displacement of the thinnest point in the image of the keratoconic cornea (Figure 101).

**Figure 101:** Network heatmaps for the pachymetry map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.8 Equivalent refractive power map

The network obviously distinguished the symmetrical pattern in the normal cornea image from the markedly asymmetrical pattern in the keratoconic cornea image, focusing on the areas with lower curvature (Figure 102).

**Figure 102:** Network heatmaps for the equivalent refractive power map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.9 Anterior refractive power map

The network obviously distinguished the symmetrical pattern in the normal cornea image from the asymmetrical pattern in the keratoconic cornea image, again focusing on the areas with lower curvature (Figure 103).

**Figure 103:** Network heatmaps for the anterior refractive power map. Original labels: normal cornea; keratoconic cornea.

#### 7.5.10 Posterior refractive power map

The network obviously distinguished the symmetrical pattern in the normal cornea image from the inferior curvature in the keratoconic cornea image, focusing on the areas with higher curvature (Figure 104).

**Figure 104:** Network heatmaps for the posterior refractive power map. Original labels: normal cornea; keratoconic cornea.

### 7.6 Examination of some cases

Here, some cases and the results of the various models are compared with each other. For this purpose, the accompanying figure with the map images and a chart showing the probability of each class by the respective responsible neural network is used. Finally, the final result of the AI system is compared with the result of the SIRIUS device software.

#### 7.6.1 Case 1

A keratoconic case was diagnosed by both the AI system and the physician; the SIRIUS device software classified it as a suspect case despite clear signs of keratoconus (Figure 105). This case demonstrates one of the limitations of the SIRIUS device software.

**Figure 105:** Case 1.

#### 7.6.2 Case 2

This was a borderline keratoconic case. The changes on the anterior sagittal curvature map were not characteristic and most closely resembled the vertical D-form (Figure 106). Neither the AI system nor the SIRIUS device software nor the physician could diagnose it; it was classified as a suspect case. When comparing the probability of keratoconus, the tangential curvature networks detected changes better than the sagittal ones. This agrees with Tummanapalli, Potluri, Vaddavalli and Sangwan (2015), who found that tangential maps detect subclinical cases better. The case demonstrates the importance of tangential maps and of history-taking and clinical examination: the scissoring reflex was present, and the other eye showed definite keratoconus.

**Figure 106:** Case 2.

#### 7.6.3 Case 3

A definite keratoconic case was correctly diagnosed by the AI system, while the physician and SIRIUS software classified it as a suspect case. Physician assessment with AI system support was correct (Figure 107). The cause of the error may have been physician fatigue or lack of attention due to workload. This underscores the importance of assessment with AI system support and simultaneously demonstrates a limitation of the SIRIUS device software.

**Figure 107:** Case 3.

#### 7.6.4 Case 4

A suspect keratoconus case (forme fruste keratoconus) was diagnosed as definite keratoconus by the AI system and the physician. The SIRIUS device software classified it as a suspect case. The maps showed an elevation on the posterior elevation map, however outside the 5-mm circle. All charts except the elevation maps indicated definite keratoconus; the elevation maps indicated suspicion (Figure 108). Although the case was borderline, it illustrates the importance of reviewing the topographic diagnostic criteria, particularly the posterior curvature maps, which can supplement the posterior elevation map in the diagnosis.

**Figure 108:** Case 4.

#### 7.6.5 Case 5

A suspect case was diagnosed as definite keratoconus by the AI system and the SIRIUS software, while the physician assessed it as a suspect case (Figure 109). The charts show that the elevation maps first indicate definite and then suspect keratoconus, without clear elevations. However, upon closer inspection, an irregular depression is found within the 5-mm circle, indicating irregularities and aberrations. This borderline case also underscores the importance of reviewing the topographic keratoconus criteria, particularly the aberrations.

**Figure 109:** Case 5.

#### 7.6.6 Case 6

A suspect case was assessed as normal by the AI system and the physician, but correctly identified by the SIRIUS software and the physician with support (Figure 110). The posterior elevation map contains a clear elevation; the associated chart indicates keratoconus. However, the final result of the AI system gave a probability of 53% for normal and 46% for suspect. This underscores the importance of assessment with AI system support.

**Figure 110:** Case 6.

#### 7.6.7 Case 7

A suspect case was assessed as normal by the SIRIUS software and the physician, but correctly identified by the AI system and physician assessment with AI support. The posterior elevation map contains a clear elevation and the associated chart indicates keratoconus; the charts of most other maps also indicate definite or suspect keratoconus (Figure 111). This underscores the importance of assessment with AI support and shows that SIRIUS did not detect the case despite a clear posterior elevation.

**Figure 111:** Case 7.

#### 7.6.8 Case 8

A normal case was assessed as a suspect case by the AI system, the SIRIUS software, and the physician. The elevation maps indicated definite or suspect keratoconus without the aforementioned topographic signs (Figure 112). However, upon closer inspection, opposing elevations and depressions are found within the 5-mm circle; this indicates irregularities and aberrations and could explain the diagnosis.

**Figure 112:** Case 8.

#### 7.6.9 Case 9

A normal case was assessed as a suspect case by the AI system, while the SIRIUS software and the physician correctly classified it as normal. The posterior elevation map indicated definite or suspect keratoconus without the aforementioned topographic signs (Figure 113). However, upon closer inspection, opposing elevations and depressions are again found within the 5-mm circle, indicating irregularities and aberrations that could explain the diagnosis.

**Figure 113:** Case 9.

### 7.7 Strengths and weaknesses of our study

**Strengths:**

- The only study that included ten different maps of topographic images.
- Use of a novel network model proposed by us, as well as transfer learning and data augmentation during training.
- Training with real images.
- Relatively large training sample.
- Three classes in training and testing: normal, keratoconic, and suspect corneas.
- Independent test group, separate from training and validation groups.
- Use of the SIRIUS device, which combines Placido disc and Pentacam camera.
- Examination of heatmaps to understand network function.
- Examination of physician map assessment with support from the proposed AI system.

**Weaknesses:**

- Training, validation, and test groups were imbalanced. This affects training and accuracy metrics. Therefore, a class-weighted loss was used during training; the metrics were calculated according to prevalence proportions, including PPV and NPV. Additionally, the F1-score was examined, as it is more suitable than the pure accuracy metric in such situations.
- Although SIRIUS is a modern and accurate device, topographic devices are continually evolving. AS-OCT devices are considered more accurate as they are less affected by scars and provide a corneal epithelial thickness map that is likely to play an important role in detecting early keratoconus cases; this topic is under further investigation (Kanellopoulos & Asimellis, 2014).

## Chapter 8: Summary and Conclusions

- Keratoconus is a relatively common condition in our country, usually affecting young people and affecting males and females equally.
- The network for the anterior tangential curvature achieved high accuracy in diagnosing definite keratoconus. The networks for the anterior and posterior elevation maps and the sagittal curvature achieved high accuracy in excluding the diagnosis.
- The networks for the anterior and posterior refractive power and the anterior and posterior tangential curvature could exclude the presence of a normal cornea with high ability.
- No map network could confirm or exclude the diagnosis of a suspect cornea. This may be because these corneas represent a spectrum between normal and keratoconic corneas and no characteristic patterns can be extracted.
- The AI system achieved high accuracy in distinguishing the three classes (keratoconic, normal, and suspect). The most accurate networks were, in this order, the network for the anterior elevation map, the posterior elevation map, the anterior refractive power, and the equivalent refractive power.
- AI system, SIRIUS device software, and physician achieved similar results; no statistically significant difference existed between them.
- The physician with AI system support achieved the best result compared with all other models, including the physician with SIRIUS software support; the difference was statistically significant.
- Examination of the heatmaps showed that the neural networks could distinguish characteristic patterns of normal and keratoconic corneas on the various maps.
- Examination of controversial cases showed that no model and no system is free of limitations. History-taking and clinical examination of both eyes are essential for correct diagnosis, particularly in borderline cases. The importance of these systems and models lies in image pre-screening and in providing rapid and accurate support to the physician in decision-making.
- The case examination also showed that the neural networks recognised irregular patterns (aberrations) on elevation maps, tangential curvature maps, and posterior curvature maps that may be compatible with definite or suspect keratoconus.

## Chapter 9: Recommendations

- We recommend using the AI system as a support instrument for the physician in assessing topographic maps.
- We recommend paying particular attention to elevation, tangential curvature, and refractive power maps when examining suspect cases and comparing information from multiple maps.
- We recommend reviewing the topographic definition of keratoconus and investigating whether irregularities and aberrations can be included as diagnostic criteria, at least in suspect and borderline cases.
- We recommend further studies with topographic devices based on the AS-OCT principle, as their images are more accurate and they additionally provide an epithelial thickness map not available with other devices.
- We recommend a multicentre study to obtain a larger training and test group and thereby potentially increase the accuracy and reliability of the system.

## Chapter 10: Closing Remarks

This dissertation is the result of three years of continuous work. As an outcome of this work, in addition to the present study, the proposed AI system named **KeratoDetect** was created. It can be accessed and used free of charge from anywhere in the world via a QR code (Figure 114).

**Steps to use the application:**

- Open the link with any device (laptop, mobile phone, tablet, etc.).
- Upload the map images.
- Specify which map each image belongs to.
- Press the `P` button.
- A table appears showing the probabilities for each class for each individual map; subsequently, a table with the overall system probabilities appears.

**Important notes:**

- The application is a screening and support instrument for the physician in diagnosis, but not a substitute for patient assessment and appropriate counselling.
- All rights remain with the researcher and the University of Damascus.
- Within Syria, a VPN program must be used.

**Figure 114:** Summary of program usage.

## References

The following bibliographic references are taken from the original unchanged.

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

## English Translation of the English Abstract (Original S. 195)

### Introduction

Keratoconus is a common condition; its early detection is very important. It is carried out through careful assessment of topographic images to distinguish between keratoconic, suspect, and normal corneas. Many studies have attempted to find criteria and indicators that support early detection, with varying accuracy metrics. However, the previous approaches relied on a very small portion of the topographic information. Following the qualitative leap in computer science, particularly in the field of artificial intelligence and artificial neural networks, and the emergence of medical applications for assessing and analysing medical images, it was necessary to investigate this technique for detecting suspect and keratoconic corneas.

### Study Objective

Investigation of the performance of computer vision technologies and deep learning algorithms for differentiating topographic map images of normal, keratoconic, and suspect corneas.

### Materials and Methods

The study consists of two parts. The first part is a retrospective review of patient records and images to compile a training sample of 987 eyes (300 keratoconic, 610 normal, and 77 suspect eyes). The second part is a cross-sectional study to compile the test sample of 422 eyes (13 keratoconic, 366 normal, and 43 suspect eyes). The AI system consists of ten artificial neural networks. Each network is responsible for assessing one map (anterior and posterior tangential maps, anterior and posterior sagittal maps, anterior and posterior elevation maps, anterior, posterior, and equivalent refractive power maps, and pachymetry) and predicting the correct class. The outputs of these networks form the inputs of a final neural network that makes the system's final decision.

### Results

The AI system achieved test group accuracy and overall weighted F1-score values of 92.2%–91.2%. No statistically significant difference existed between it, the SIRIUS device software, and the physician (p > 5%). The physician achieved the best result with AI system support compared with all other models: 96.2% accuracy and 95.9% weighted F1-score; the difference was statistically significant (p < 5%).

### Conclusions

We recommend using the AI system as a support instrument for the physician in assessing topographic maps.

**Keywords:** Keratoconus; artificial intelligence; deep learning; neural networks.

## Transferred Title Page (Original S. 196)

**Syrian Arab Republic**  
**University of Damascus**  
**Faculty of Medicine**  
**Department of Ophthalmology**

### Application of Computer Vision Techniques and Deep Learning Algorithms for Differentiation of Topographic Images of Normal, Keratoconic, and Suspect Corneas

A dissertation submitted in partial fulfilment of the requirements for the degree of Doctor of Philosophy (PhD) in Ophthalmology

**Author:**  
Dr. Mohammad Zafrallah Askar

**Supervisor:** Yosra Haddeh, Professor of Ophthalmology at the Faculty of Medicine, University of Damascus

**Co-supervisor:** Madhat Alsoos, Department of Artificial Intelligence, Faculty of Informatics and Information Technology, University of Damascus

**Study Year:** 2020–2021
