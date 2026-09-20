## S. 82–96 - AI in Medicine, Ophthalmology, and Keratoconus Diagnostics

# Chapter 4: Applications of Artificial Intelligence in Medicine

1. Introduction
2. Examples of AI techniques in clinical practice
3. Examples of AI techniques in ophthalmology
4. Examples of AI for the detection of keratoconus

### 4.1 Introduction

The use of artificial intelligence in medicine aims to unlock hidden, useful information from data and support clinical decisions. AI can assist in diagnosis and treatment selection, assess risks, classify diseases, reduce medical errors, and improve productivity.

Possible data sources include demographic information, notes from healthcare providers, medical images, laboratory results, genetic tests, and records from medical or wearable devices such as smartwatches. The easy availability of these data in electronic health records and intelligent devices equipped with sensors, network connectivity, and cloud storage opens up possibilities for the management of medical information — from the patient, physician, and hospital to health policy and decision-makers.

**Figure 36:** Number of studies on artificial intelligence, deep learning, and machine learning published annually on PubMed as of 22.06.2021. The development shows the growing interest in AI and its medical applications.

### 4.2 Examples of AI Applications in Clinical Practice

#### 4.2.1 As a Screening Tool

- Analysis of radiographic images (projection or CT images), estimation of the probability of disease, and marking of findings for radiologists to interpret. An important example is AI screening of chest X-rays for COVID-19 (Minaee, Kafieh, Sonka, Yazdani, & Jamalipour Soufi, 2020; Shi et al., 2020).
- Analysis of fundus images for detecting vision-threatening findings requiring referral to ophthalmology. The FDA-approved IDx-DR system examines retinal images and identifies individuals requiring referral and vision-threatening diabetic retinopathy (Van Der Heijden et al., 2018).
- In the United Kingdom, an AI-based chat application was deployed that distinguishes between individuals who only need reassurance and those who need to be examined by a physician. The aim is to relieve the healthcare system and direct resources to those with genuine need (W. Wang & Siau, 2018).
- Skin tumors such as melanomas can be diagnosed with high, expert-level accuracy and distinguished from nevi (Esteva et al., 2017).

#### 4.2.2 As a Prognosis Assessment Tool

- Estimation of survival time after treatment of uveal melanoma (Damato, Eleuteri, Fisher, Coupland, & Taktak, 2008).
- Estimation of survival time and recurrence rate in breast tumors (Cirkovic, Cvetkovic, Ninkovic, & Filipovic, 2015).

#### 4.2.3 As Therapy Support

- Support in planning radiotherapy to minimize the exposure of healthy tissue (C. Wang, Zhu, Hong, & Zheng, 2019).
- Support in selecting optimal therapeutic strategies for sepsis in the intensive care unit. When no clear protocol exists, reinforcement learning can select an appropriate approach (Komorowski, Celi, Badawi, Gordon, & Faisal, 2018).

#### 4.2.4 As a Replacement for a Healthcare Provider

It is unlikely that AI will fully replace physicians in the foreseeable future. However, it can perform certain tasks more consistently, faster, and more reproducibly than humans, such as bone age estimation from radiographs (Tajmir et al., 2019), diagnosis of certain retinal diseases in OCT images (De Fauw et al., 2018), or quantification of vascular stenoses and other measurements in cardiac imaging (Slomka et al., 2017). These tasks are not necessarily complex but can consume time that the healthcare provider could devote to more demanding tasks.

#### 4.2.5 As Healthcare Provider Support

Several studies show that the synergy between AI and the healthcare provider delivers better results than either alone. It improves the ability to support clinical decisions in real time and thereby enhance efforts toward precision healthcare (Sitapati et al., 2017).

### 4.3 Examples of AI Applications in Ophthalmology

**Figure 37:** Number of studies on AI, deep learning, machine learning, and ophthalmology published annually on PubMed as of 22.06.2021.

Below, important studies on ophthalmic conditions in which AI has been used are presented. Figure 38 organizes these by the number of studies conducted.

**Figure 38:** Number of PubMed publications by disease (statistics 2007–2018).

#### 4.3.1 Diabetic Retinopathy

IDx-DR is one of the most important practical applications. The system was commercially introduced with FDA approval for screening for diabetic retinopathy in individuals over 21 years of age in primary care settings, without an ophthalmologist being present. The examination is non-invasive and does not require pupillary dilation. In practice, the system achieved an accuracy of approximately 90% in detecting referral-worthy cases (Van Der Heijden et al., 2018).

The system was trained with 128,175 images and tested with 9,963 images. The training images were evaluated by 54 US board-certified or fourth-year ophthalmology residents, with a mean of 3–7 physicians per image. For the test group, the seven physicians with the highest agreement were selected. Artificial neural networks and the Inception-v3 network pre-trained on ImageNet with batch normalization for accelerated learning were used.

**Figure 39:** ROC curve of the network compared to seven ophthalmologists (Gulshan et al., 2016).

#### 4.3.2 Glaucoma

- Li et al. examined the detection of glaucomatous optic neuropathy. The AI model was trained with a fundus database of 48,116 images, including 8,000 test images. Accuracy reached up to 98.6%. The most common causes of false-negative results were pathological and high myopia; false-positive results were associated with myopia and enlarged physiological cupping (Li et al., 2018).
- Muhammad et al. examined the suspicion of open-angle glaucoma using swept-source OCT with multiple maps. The RNFL map achieved 93.1% accuracy and was more accurate than conventional OCT and conventional visual field examination (Muhammad et al., 2017).
- Asaoka et al. distinguished preperimetric from normal visual fields. The database comprised 171 visual field images; mean deviation, pattern deviation, and standard deviation served as inputs of a feedforward neural network. Accuracy in detecting preperimetric visual fields was 92.6% (Asaoka, Murata, Iwase, & Araie, 2016).

#### 4.3.3 Age-Related Macular Degeneration

Studies included diagnosis based on OCT images (Treder, Lauermann, Eter, & Ophthalmology, 2018), detection of active neovascularization (Chakravarthy et al., 2016), prediction of future need for repeated injections (Bogunović et al., 2017), and assessment of the current need for antiangiogenic injections (Prahs et al., 2018).

#### 4.3.4 Cataract

Gao developed a neural network for diagnosis and grading of senile cataract with high accuracy (Gao, Lin, & Wong, 2015). An AI screening for congenital cataracts could be particularly significant due to the prevention of avoidable blindness through early diagnosis (Liu et al., 2017).

AI also plays a role in the new generation of formulas for calculating intraocular lens power, such as Hill-RBF, Kane, and PEARL-DGS (Cheng et al., 2020). Hill-RBF is the most well-known formula and is available online. Inputs include the axial length, anterior chamber depth, corneal curvature values, and axis. To improve accuracy, central corneal thickness, lens thickness, and white-to-white distance can be added. Accuracy within 0.5 dpt is 71.2% and comparable to or better than third- and fourth-generation formulas (Darcy et al., 2020).

#### 4.3.5 Various Applications

Poplin et al. trained an AI network that could predict age, sex, smoking status, systemic blood pressure, and a history of cardiac disease from fundus images (Poplin et al., 2018). Zhou et al. developed an AI system that can detect retinal changes associated with Alzheimer's disease that are not identifiable by humans; a patent was filed for this (Zhou, Sinai, Moore, & Wong, 2006).

This is only a small selection of AI applications in ophthalmology. The most important applications in keratoconus diagnostics are presented separately below.

### 4.4 AI Applications for the Detection of Keratoconus

Below, important studies on AI applications in keratoconus are described. Tables 4 and 5 summarize the algorithms, samples, results, and advantages and disadvantages of the studies.

#### 4.4.1 Keratoconus Diagnostics with Biomechanical Properties and Regression Algorithms

Corvis ST records the response of the cornea to a defined air puff with a high-resolution Scheimpflug camera. It captures 4,300 images per second and enables precise measurement of corneal thickness and intraocular pressure as well as biomechanical properties (Roberts, 2016).

Two important indices for detecting early keratoconus stages are the Corvis Biomechanical Index (CBI), developed exclusively from Corvis data using regression, and the Tomography and Biomechanical Index (TBI), which combines regression and random forest and integrates Corvis with Pentacam data (Figure 40; Ambrósio et al., 2017; Renato, 2016; Riccardo, 2016).

The TBI is more accurate than the CBI (98.5% versus 88.2%). However, both indices can produce false-negative and false-positive results. At values within the thresholds of 0.5 and 0.29, respectively, the development of ectasia after refractive surgery cannot be excluded with 100% certainty (Fernández, Rodríguez-Vallejo, & Piñero, 2019).

**Figure 40:** CBI and TBI (Oculus, 2021).

#### 4.4.2 Keratoconus Diagnostics with Support Vector Machine

The support vector machine is a supervised learning algorithm. It classifies training points in an n-dimensional space by a separating hyperplane with n-1 dimensions such that the distance between the nearest points of different classes is maximized. Two point groups in a two-dimensional space are separated, for example, by a straight line (Cortes & Vapnik, 1995).

SIRIUS uses this method to assign images to four groups based on the indices SIf, SIb, RBFf, BCVf, BCVb, RMS(HOA), and THKmin: keratoconus-compatible, suspect, normal, and abnormal. Classification accuracy exceeded 97% (Arbelaez et al., 2012). A study compared 25 algorithms for classifying corneal images from an AS-OCT device (CASIA SS-1000, Tomey). After selection of the eight most discriminating indices, the SVM achieved the best accuracy of 93.6% (Lavric, Popa, Takahashi, & Yousefi, 2020).

#### 4.4.3 Keratoconus Diagnostics with Convolutional Neural Networks

KeratoDetect was developed at the Ștefan cel Mare University in Romania. The model was trained with 3,000 artificially generated corneal images, not with images from real patients. This is a weakness; additionally, only curvature maps were used. Accuracy in classifying normal versus keratoconic was 99.33% (Lavric & Valentin, 2019).

A study from Kitasato University in Japan used six maps captured with CASIA AS-OCT SS-1000 (Tomey): anterior and posterior curvature, anterior and posterior elevation, total refractive power, and thickness. Six ResNet-18-based models were trained with 304 keratoconic and 239 normal images. Mean overall accuracy was 99.1%. The posterior elevation map was most accurate at 99.3%, followed by the posterior curvature map at 99.1% (Kamiya et al., 2019).

At National Taiwan University, 354 images from 206 patients were examined using a TMS-4 videokeratoscope (Tomey). Three pre-trained models (VGG16, InceptionV3, and ResNet152) were used. The images were divided into normal, keratoconic, and subclinical groups; the first two were used for training, the third for testing. ResNet152 achieved 95.8%, the other two 93.1%. Prediction of subclinical cases was unsatisfactory at 28.5% with a probability threshold of 50%. Pixel-wise discriminating features and class-specific heatmaps were created to understand the network's operation and draw the examiner's attention to conspicuous image regions (Figure 41; Kuo et al., 2020).

**Figure 41:** Discriminating feature map in the center and heatmap on the right.

A study from Assiut University (Egypt) trained with 2,574 and tested with 644 Pentacam images. Anterior and posterior elevation maps, anterior sagittal curvature map, thickness map, and a combined image of these four maps were used. The model consisted of two convolutional layers and a four-layer neural network before the output layer. The combined four-map image achieved 98.9%, followed by the posterior elevation map at 97.7%; heatmaps were also examined (Abdelmotaal et al., 2020).

**Table 4 – Comparison of earlier studies (excluding CNN):**

| Study/Algorithm | Method and Sample | Results | Advantages | Disadvantages |
|---|---|---|---|---|
| CBI (Vinciguerra et al., 2016), Regression algorithms | Retrospective distinction of normal (478) and keratoconic (180) corneas using the CORVIS device | Sensitivity 94.3%, specificity 97.5%, AUC 97.7%, accuracy 88.2% | CORVIS is a unique device | Retrospective; suspect corneas not examined; false-positive and false-negative findings in some studies |
| TBI (Ambrósio et al., 2017), Regression + Random Forest | Retrospective distinction of normal (480), keratoconic (204), unilateral keratoconic (72), and forme fruste keratoconic (72) corneas | Threshold 0.29 for detecting FFKC; AUC 98.5%, sensitivity 90.4%, specificity 96% | Integrates the capabilities of CORVIS and PENTACAM | Retrospective; false-positive and false-negative findings in some studies |
| SIRIUS-SVM (Arbelaez et al., 2012), Support Vector Machine | Retrospective classification of keratoconic (877), normal (1,259), subclinical (426), and post-refractive surgery (940) corneas | KC: accuracy 99.3%, sensitivity 98.2%, specificity 95%; subclinical: accuracy 97.3%, sensitivity 92%, specificity 97.7% | Training based on anterior and posterior corneal surface features; SIRIUS (Placido + Scheimpflug) | Retrospective; relatively few features used to avoid overfitting — a limitation of the SVM |

**Table 5 – Comparison of earlier CNN studies:**

| Study/Model | Method and Sample | Results | Advantages | Disadvantages |
|---|---|---|---|---|
| KeratoDetect (Lavric & Valentin, 2019), CNN | Artificially generated images: 1,500 normal and 1,500 KC; the maps used are not clearly described and were presumably limited to curvature maps | Accuracy 99.33% | — | No images from real patients; map types unclear, presumably only curvature maps |
| Kamiya et al. (2019), CNN/ResNet-18 | Retrospective with AS-OCT, six maps; 239 normal and 304 KC | Overall accuracy 99.1%; posterior elevation map 99.3%, followed by posterior curvature 99.1% | AS-OCT; six maps; pre-trained ResNet-18 | Suspect cases not examined; use of a pre-trained model |
| Kuo et al. (2020), CNN (VGG16, InceptionV3, ResNet152) | Retrospective with videokeratoscope; training: 170 KC and 156 normal, testing: 28 subclinical | ResNet152: 95.8% in training; 28.5% in subclinical test cases | Pre-trained models; discriminating pixel feature and class-specific heatmaps for model understanding | Videokeratoscope does not provide accurate information on the posterior corneal surface; only anterior curvature map; subclinical cases were inadequately detected |
| Abdelmotaal et al. (2020), CNN | Retrospective with PENTACAM: 1,038 KC, 1,108 normal, 1,072 subclinical or forme fruste; four individual maps and a combined image | Combined four-map image 98.9%, posterior elevation map 97.7% | Four maps individually and combined; PENTACAM; heatmaps to examine model operation | No independent test group; no true suspect cases, only subclinical/forme fruste cases |
| Present study | Retrospective collection/training and independent test group with real images; training: 559 KC, 1,217 normal, 167 suspect; testing: 13 KC, 366 normal, 43 suspect | Best networks: anterior elevation map, followed by posterior elevation map, anterior refractive power, equivalent refractive power; accuracy/F1-score 94.5–94.3% | Novel network architecture; transfer learning; data augmentation; training with real images; large sample; independent test group; SIRIUS; heatmaps; reading with support | Training, validation, and test groups unbalanced; AS-OCT considered more accurate than SIRIUS; retrospective design |

## S. 97–113 - Study Design and Methods

# Chapter 5: Study Design and Methods

1. Study design
2. Study group
3. Sample size
4. Inclusion and exclusion criteria and technical image characteristics
5. Characteristics of the study groups
6. Study methods

### 5.1 Study Design

- **Part 1:** retrospective review of records and topographic images of patients who underwent topographic examination in the Department of Ophthalmology and Ophthalmic Surgery at Al-Mouassat University Hospital, University of Damascus. The aim was to collect and classify as many images as possible, perform descriptive statistical analyses, and use the data for training the AI system.
- **Part 2:** cross-sectional study to determine the performance of the AI system.

### 5.2 Study Group

Part 1 aimed to collect as many images as possible from old records for training the system and to perform descriptive statistical evaluation. Part 2 consisted of a random sample of patients who visited the outpatient ophthalmology clinic at Al-Mouassat University Hospital.

### 5.3 Sample Size

For Part 1, the required sample size for a descriptive study was calculated with G*Power 3.0.10 at alpha = 0.05, beta = 0.05, and an effect size of 0.05. For a power of 95%, 356 patients were required. For Part 2, at alpha = 0.05, beta = 0.05, an odds ratio of 2, and a proportion of discordant pairs of 0.3, a required sample of 380 eyes for a power of 95% was calculated with G*Power 3.0.10.

### 5.4 Inclusion and Exclusion Criteria and Technical Image Characteristics

**Inclusion:** age over 10 years; cooperation at the topography device for capturing a technically suitable image (Part 2) or presence of a previously captured technically suitable topographic image (Part 1).

**Exclusion:** lack of cooperation during image acquisition; previous images without technical suitability; children under 10 years of age; severe dry eye and ocular surface diseases; corneal dystrophies and degenerations; other ectatic corneal diseases; previous eye surgery, particularly on the cornea; corneal scarring from any cause other than keratoconus.

**Technical image characteristics:** The SIRIUS device software Phoenix v2.0.0.3 was used to assess technical suitability. The device evaluates coverage and proportion of unedited data (Not Edited) of the Scheimpflug camera as well as coverage and centration of the keratoscopy images. Based on this, it determines whether the image is technically suitable (CSO, 2018).

### 5.5 Characteristics of the Study Groups

#### 5.5.1 Training Group

The training sample comprised 987 patients in three diagnostic groups (Figure 42): 300 keratoconic (KC; 30.39%), 610 normal (NORMAL; 61.80%), and 77 suspect (SUSPECT; 7.8%). At the eye level, it comprised 1,943 eyes: 559 KC (28.73%), 1,217 normal (62.67%), and 167 suspect eyes (8.6%).

**Figure 42:** Distribution of the training group by diagnosis.

By sex, 483 were female (48.9%) and 504 were male (51.1%); the male-to-female ratio was 1.041753653. The chi-square test showed no statistically significant difference between males and females in the three groups (p > 5%; Table 6).

**Table 6:** F 483 (48.9%, cumulative 48.9%), M 504 (51.1%, cumulative 100.0%), Total 987 (100.0%).

Age ranged from 10 to 87 years, with a mean of 31.89 years. The Kolmogorov-Smirnov test yielded p = 0.000; age was not normally distributed and nonparametric tests were used (Tables 7–8).

**Table 7:** N = 987; Range 77.0; Minimum 10.0; Maximum 87.0; Mean 31.739; Standard deviation 13.1865; Valid N = 987.

**Table 8:** Kolmogorov-Smirnov 0.157, df 987, significance 0.000; Shapiro-Wilk 0.874, df 987, significance 0.000; Lilliefors significance correction.

Mean age was 32.4 years for females and 31.37 years for males. The Mann-Whitney test showed no significant difference (p = 0.270; Figure 43).

**Table 9:** Females mean 31.20, 95% CI 30.08–32.33, median 28, SD 12.583, minimum 10, maximum 85; males mean 32.24, CI 31.04–33.44, median 29, SD 13.732, minimum 10, maximum 87.

**Figure 43:** Mann-Whitney test of age distribution by sex.

By diagnosis, mean ages were KC 30.97 (12–82 years), NORMAL 31.03 (10–81 years), and SUSPECT 40.32 (13–87 years). The Kruskal-Wallis test showed a significant difference (p = 0.025; Table 10; Figure 44).

**Table 10:** KC mean 30.97, CI 29.71–32.22, median 29, SD 11.054, minimum 12, maximum 82; NORMAL 31.03, CI 30.03–32.02, median 28, SD 12.531, minimum 10, maximum 81; SUSPECT 40.32, CI 35.58–45.06, median 32, SD 20.875, minimum 13, maximum 87.

**Figure 44:** Kruskal-Wallis test of age distribution by diagnosis.

#### 5.5.2 Test Group

The test sample comprised 211 patients (Figure 45): 9 KC (4.27%), 173 normal (81.99%), and 29 suspect (13.74%). At the eye level, it comprised 422 eyes: 13 KC (3.08%), 366 normal (86.73%), and 43 suspect eyes (10.19%).

**Figure 45:** Distribution of the test group by diagnosis.

By sex, the test group comprised 91 female (43.1%) and 120 male (56.9%) patients; the male-to-female ratio was 1:1.318. The chi-square test showed no significant difference between the three groups (p > 5%; Table 11).

**Table 11:** Distribution of the test group by sex and diagnosis with chi-square test.

Age ranged from 11 to 67 years, with a mean of 27.507 years (Table 12). The Kolmogorov-Smirnov test yielded p = 0.000; age was not normally distributed (Table 13).

**Table 12:** N = 422; Range 56.0; Minimum 11.0; Maximum 67.0; Mean 27.507; SD 12.4867; Valid N = 422.

**Table 13:** Kolmogorov-Smirnov 0.273, df 422, significance 0.000; Shapiro-Wilk 0.786, df 422, significance 0.000; Lilliefors correction.

Mean age was 27.44 years for females and 27.55 years for males (Table 14). The Mann-Whitney test showed no significant difference (p = 0.681; Figure 46).

**Table 14:** Females mean 27.44, CI 25.69–29.18, median 23, SD 11.906, minimum 11, maximum 61; males mean 27.55, CI 25.91–29.20, median 23, SD 12.933, minimum 11, maximum 67.

**Figure 46:** Mann-Whitney test of age distribution by sex.

By diagnosis, mean ages were KC 25.92 (11–52 years), NORMAL 27.02 (11–67 years), and SUSPECT 32.11 (11–67 years). The Kruskal-Wallis test showed no significant difference (p = 0.097; Table 15; Figure 47).

**Table 15:** KC mean 25.92, CI 17.65–34.19, median 20, SD 13.689, minimum 11, maximum 52; NORMAL 27.02, CI 25.80–28.24, median 23, SD 11.890, minimum 11, maximum 67; SUSPECT 32.11, CI 27.19–37.04, median 24, SD 16.001, minimum 11, maximum 67.

**Figure 47:** Kruskal-Wallis test of age distribution by diagnosis in the test group.

### 5.6 Study Methods

#### 5.6.1 Part 1

After applying the inclusion and exclusion criteria, patient records and SIRIUS topography images were reviewed and the data extracted. The images were evaluated on a Klyce/Wilson scale with a diameter of 9 mm (Wilson, Klyce, & Husseini, 1993), with the exception of the elevation map with 8 mm diameter and a toric-ellipsoidal float reference body (Mazen M. Sinjab, 2018c). Based on the available information, the images were divided into three groups according to the criteria described in Chapter 2.8: definite keratoconus; suspect and forme fruste keratoconus corneas; normal corneas.

A descriptive statistical analysis was performed on the extracted data. The map images were used for training an AI system based on computer vision and deep learning. The system consists of eleven artificial neural networks: ten networks each read one topographic map — anterior and posterior sagittal curvature, anterior and posterior tangential curvature, corneal thickness, anterior and posterior elevation, and anterior, posterior, and equivalent refractive power — and an eleventh network makes the final classification decision based on these results. For construction and training, Python 3.6, TensorFlow 1.8, and Keras 2.2.3 with TensorFlow backend were used.

#### 5.6.2 Part 2

All patients or their legal representatives signed an informed consent form before participation. The clinical interview included personal data as well as medical, ocular, medication, and family history. The ophthalmic examination included visual acuity testing with the Snellen chart, examination of the anterior segment and fundus, refraction determination, capture of a topographic image, and final classification of the image based on all available information.

A physician evaluated the images without knowledge of patient data according to the criteria in Chapter 2.8. The images were entered into the AI system and additionally classified with the SIRIUS device software Phoenix v2.0.0.3. Furthermore, the physician classified the images with support from the SIRIUS Keratoconus Summary as well as with support from the AI system, where the individual results of each map and the final system result were visible.

The intrarater reliability of the physician was examined by reading 100 images randomly selected from the training group at two different time points and comparing the results with Cohen's kappa. The value was 0.925 (p = 0, p < 5%), which is considered excellent and supports the use of the physician's results.

#### 5.6.3 Training Process

**Architecture of the map networks:** Ten structurally identical networks were used, one per map. The input layer had dimensions 3×400×400. This was followed by three convolutional layers with 32, 32, and 64 filters of size 3×3; each layer was followed by a 2×2 pooling layer. After that came a flattening layer, a hidden layer with 64 neurons, and an output layer with three neurons.

**Network for the final decision:** This network received the outputs of the ten map networks as 30 inputs. This was followed by three hidden layers with 64, 32, and 16 neurons, as well as an output layer with three neurons.

To avoid overfitting, an L2 regularizer with a value of 0.001 was applied to the hidden layer with 64 neurons in the map networks; subsequently, a dropout layer with 0.3 was inserted. In the decision network, the L2 regularizer with 0.001 was applied to the last hidden layer with 16 neurons, followed by dropout of 0.3.

The training group was split without cross-validation into 80% training and 20% validation. The process was terminated when validation loss did not improve after ten epochs. The model with the lowest validation loss was saved. Finally, all trained networks were applied to the test group.

Due to the small sample, data augmentation was employed. Since each image has symmetry about the vertical line, horizontal flipping doubles the training sample. Additionally, transfer learning was used: a base model was trained sequentially with all generated images of all maps (more than 30,000 images) and subsequently used to train each individual map network.

Due to class imbalance with a high proportion of normal cases, weighted loss was employed. The loss of keratoconic and suspect cases was increased and the loss of normal cases was decreased to avoid underfitting.

#### 5.6.4 Primary Study Endpoints

The accuracy of each individual network and the overall accuracy of the system in predictions for the training, validation, and test groups were examined. Subsequently, in the test group, the overall accuracies of the proposed AI system (AI), the physician (DR), the SIRIUS software (CSO), the physician with AI support (DR&AI), and the physician with SIRIUS software support (DR&CSO) were compared.

#### 5.6.5 Statistical Data Analysis

Using confusion matrices, sensitivity, specificity, positive and negative predictive value, F1-score, and accuracy were calculated for the training, validation, and test groups. Prevalence influences the predictive values; for calculation, the proportions from the test group were used. In unbalanced groups and with particular interest in false-positive and false-negative results, the F1-score is considered more appropriate than pure accuracy (Sokolova, Japkowicz, & Szpakowicz, 2006). The McNemar test was used to compare the results of the neural networks with the physician's results with and without AI support and with and without SIRIUS software support (Hoffman, 1976).
