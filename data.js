// ================= MED26 F2 OSPE - Shared Database & Knowledge Base (data.js) =================
// تم فصل قاعدة البيانات في ملف مستقل لتخزينها في كاش المتصفح وتسريع فتح جميع صفحات الموقع

// ================= 6. قاعدة البيانات الكاملة لجميع تجميعات البنك (2020 - 2025) =================
        const questionsDB = [
            // ==================== MICROBIOLOGY - LAB 1: GRAM-POSITIVE ====================
            { id: 101, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 5, slot: 0,
              q: "An 8-year-old female child presenting with fever, pain in the throat and difficulty and pain during swallowing. Per speculum examination, enlarged, reddish, inflamed tonsils covered with exudate.\n1) What is the result of the pathogens on a Gram stain?\n2) What is the causative pathogen?",
              a: "1) <span class='kw-highlight'>Gram-positive (cocci in chains)</span><br>2) <span class='kw-highlight'>Streptococcus pyogenes</span>" },

            { id: 102, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 5, slot: 0, noSample: true,
              q: "An 8-year-old female child presenting with fever, pain in the throat and difficulty and pain during swallowing. Per speculum examination shows enlarged, reddish (inflamed tonsils) at places covered with exudate.\n1) What is the result of the pathogens on a Gram stain?\n2) What is the causative pathogen?",
              a: "1) <span class='kw-highlight'>Gram-positive (cocci in chains)</span><br>2) <span class='kw-highlight'>Streptococcus pyogenes</span>" },

            { id: 103, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 6, slot: 0,
              q: "1) What agar is used to distinguish between Staphylococcus species?\n2) What color would S. aureus give on this agar?",
              a: "1) <span class='kw-highlight'>Mannitol salt agar (MSA)</span><br>2) <span class='kw-highlight'>Yellow</span>" },

            { id: 104, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 6, slot: 1,
              q: "1) What is the name of this agar?\n2) What is the color of the colony produced by Staphylococcus aureus?",
              a: "1) <span class='kw-highlight'>Mannitol salt agar (MSA)</span><br>2) <span class='kw-highlight'>Yellow colony</span>" },

            { id: 105, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 6, slot: 2,
              q: "(CASE) of tonsillitis, what is the causative bacteria of this condition?",
              a: "<span class='kw-highlight'>Streptococcus pyogenes</span>" },

            { id: 106, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2022", category: "compilation", type: "mcq", highYield: false, page: 7, slot: 0,
              q: "What is the identification method for this organism?",
              options: ["A. Direct smear streptococci pyogenes", "B. Culture streptococci pyogenes", "C. Direct smear Staphylococcus aureus", "D. Culture Staphylococcus aureus"],
              correct: 2, a: "C. <span class='kw-highlight'>Direct smear Staphylococcus aureus</span>" },

            { id: 107, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 7, slot: 1,
              q: "Which of the following types of hemolysis occurred during the diagnosis of the disease in this picture (acute follicular tonsillitis)?",
              options: ["A. Alpha", "B. Beta", "C. Gamma"],
              correct: 1, a: "B. <span class='kw-highlight'>Beta</span> (Beta hemolysis by S. pyogenes)" },

            { id: 108, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 7, slot: 2,
              q: "Which of the following types of hemolysis occurred during the diagnosis of the disease in this picture (skin carbuncle/abscess)?",
              options: ["A. Alpha hemolysis", "B. Beta hemolysis", "C. Gamma hemolysis"],
              correct: 1, a: "B. <span class='kw-highlight'>Beta hemolysis</span>" },

            { id: 109, subject: "MICROBIOLOGY", lab: "Gram-positive Bacteria", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 8, slot: 0,
              q: "The circle (A) shows which of the following bacteria (CAMP test)?",
              options: ["A. Streptococcus agalactiae", "B. S. pyogenes", "C. S. aureus"],
              correct: 0, a: "A. <span class='kw-highlight'>Streptococcus agalactiae</span>" },

            // ==================== MICROBIOLOGY - LAB 2: GRAM-NEGATIVE ====================
            { id: 110, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 9, slot: 0,
              q: "1) Name of the bacteria? (Indole -, Methyl red -, VP +)\n2) Name another test for it?",
              a: "1) <span class='kw-highlight'>Klebsiella pneumoniae (or Klebsiella spp.)</span><br>2) <span class='kw-highlight'>Gram stain / TSI (Triple Sugar Iron) agar</span>" },

            { id: 111, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 9, slot: 1,
              q: "The image indicates organism growth on MacConkey agar. After some tests, the results were: Indole test: +ve, Methyl red: +ve, Citrate test: -ve, Voges-Proskauer test: -ve.\n1) What is this organism?\n2) What other tests could be used to confirm the final diagnosis?",
              a: "1) <span class='kw-highlight'>Escherichia coli (E. coli)</span><br>2) <span class='kw-highlight'>Gram stain / TSI (Triple Sugar Iron) agar</span>" },

            { id: 112, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 9, slot: 2,
              q: "1) What is this test?\n2) Name one organism with a positive result of this test?",
              a: "1) <span class='kw-highlight'>Urease test</span><br>2) <span class='kw-highlight'>Proteus mirabilis</span>" },

            { id: 113, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 10, slot: 0,
              q: "1) What is the name of this test?\n2) Name one example of positive organism.",
              a: "1) <span class='kw-highlight'>Citrate utilisation test</span><br>2) <span class='kw-highlight'>Klebsiella pneumoniae</span>" },

            { id: 114, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 10, slot: 1,
              q: "What is the reaction of the TSI test shown in the picture?\nA - \nB - ",
              a: "A: <span class='kw-highlight'>A/A (Acid slant / Acid butt)</span><br>B: <span class='kw-highlight'>K/A + H2S (Alkaline slant / Acid butt with H2S blackening)</span>" },

            { id: 115, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2022", category: "compilation", type: "flashcard", highYield: false, page: 10, slot: 2,
              q: "Name of the organism identified by this API 20E strip:",
              a: "<span class='kw-highlight'>Klebsiella</span>" },

            { id: 116, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2022", category: "compilation", type: "mcq", highYield: false, page: 11, slot: 0,
              q: "Which of the following is a possible organism that can produce a greenish pigment when we put it in agar medium?",
              options: ["A. Pseudomonas aeruginosa", "B. Proteus vulgaris", "C. Shigella", "D. Salmonella"],
              correct: 0, a: "A. <span class='kw-highlight'>Pseudomonas aeruginosa</span>" },

            { id: 117, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 11, slot: 1,
              q: "Which of the following gives a positive result of this photo (Urease slant)?",
              options: ["A. Proteus", "B. E. coli", "C. Klebsiella", "D. Salmonella"],
              correct: 0, a: "A. <span class='kw-highlight'>Proteus</span>" },

            { id: 118, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 11, slot: 2,
              q: "What is the name of this bacterium (Indole negative, Citrate positive blue)?",
              options: ["A. Klebsiella", "B. E. coli", "C. Shigella"],
              correct: 0, a: "A. <span class='kw-highlight'>Klebsiella</span>" },

            { id: 119, subject: "MICROBIOLOGY", lab: "Gram-negative Bacteria", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 11, slot: 3,
              q: "What is the name of this test?",
              options: ["A. Indole test", "B. Citrate test", "C. Urease test"],
              correct: 1, a: "B. <span class='kw-highlight'>Citrate test</span>" },

            // ==================== MICROBIOLOGY - LAB 3: ANTIBIOTIC SUSCEPTIBILITY ====================
            { id: 120, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 12, slot: 0,
              q: "1) What is the name of this method?\n2) What does zone C stand for?",
              a: "1) <span class='kw-highlight'>Diffusion method (Disc diffusion method)</span><br>2) <span class='kw-highlight'>Zone of inhibition</span>" },

            { id: 121, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 12, slot: 1,
              q: "1) What is the name of this method?\n2) What does zone C stand for?",
              a: "1) <span class='kw-highlight'>Diffusion method</span><br>2) <span class='kw-highlight'>Zone of inhibition</span>" },

            { id: 122, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 12, slot: 2,
              q: "What is the name of this agar?",
              a: "<span class='kw-highlight'>Mueller-Hinton Agar / MH Agar</span>" },

            { id: 123, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2022", category: "compilation", type: "flashcard", highYield: true, page: 13, slot: 0,
              q: "What is the name of this Agar?",
              a: "<span class='kw-highlight'>Mueller-Hinton Agar / MH Agar</span>" },

            { id: 124, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 13, slot: 1,
              q: "Which of the following is the name of this medium?",
              options: ["A. Blood agar", "B. Disc Diffusion Method", "C. Nitrate agar"],
              correct: 1, a: "B. <span class='kw-highlight'>Disc Diffusion Method</span>",
              note: "هذا السؤال ورد في ميد 2021 بنفس الصيغة وكان يسأل عن الاسم وليس الطريقة، ولعدم توفر Mueller-Hinton Agar ضمن الخيارات تم اختيار الإجابة الأقرب B." },

            { id: 125, subject: "MICROBIOLOGY", lab: "Antibiotic Susceptibility", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 13, slot: 2,
              q: "WOTF is the name of this medium?",
              options: ["A. Blood agar", "B. Mueller-Hinton agar (MH)", "C. Nitrate agar"],
              correct: 1, a: "B. <span class='kw-highlight'>Mueller-Hinton agar (MH)</span>" },

            // ==================== MICROBIOLOGY - LAB 4: MOLECULAR TECHNIQUES ====================
            { id: 126, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 14, slot: 0,
              q: "1) Explain why we use reverse transcription for COVID-19 (SARS-CoV-2).\n2) What is the difference between PCR and q-PCR?",
              a: "1) We use reverse transcription because it <span class='kw-highlight'>converts viral RNA into DNA</span>, since SARS-CoV-2 is an RNA virus and PCR works only on DNA.<br>2) PCR amplifies DNA and gives a <span class='kw-highlight'>qualitative result</span> at the end (by gel electrophoresis), while q-PCR amplifies and <span class='kw-highlight'>quantifies DNA in real time</span> using fluorescence." },

            { id: 127, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 14, slot: 1,
              q: "1) RT-qPCR detects viruses such as COVID-19. Give another application of real-time PCR?\n2) This picture shows the curve of qPCR. What conditions will be met before starting the qPCR?",
              a: "1) <span class='kw-highlight'>Quantification of viral load</span><br>2) <span class='kw-highlight'>Conducting reverse transcription</span>" },

            { id: 128, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2023", category: "compilation", type: "flashcard", highYield: false, page: 14, slot: 2,
              q: "What is the name of the technique in this photo that is used for COVID-19 diagnosis?",
              a: "<span class='kw-highlight'>DNA Microarray (Microarray technique)</span>" },

            { id: 129, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 15, slot: 0,
              q: "This picture shows the curve of qPCR. Which of the following conditions should be performed before starting qPCR?",
              options: ["A. Insert the virus into human DNA", "B. Conduct reverse transcription", "C. Substitute ribose nucleotide triphosphate for deoxyribose nucleotide"],
              correct: 1, a: "B. <span class='kw-highlight'>Conduct reverse transcription</span>" },

            { id: 130, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 15, slot: 1,
              q: "Which of the following inclusion bodies is located at the cell level (in cytoplasm)?",
              options: ["A. Negri bodies", "B. Herpes"],
              correct: 0, a: "A. <span class='kw-highlight'>Negri bodies</span>" },

            { id: 131, subject: "MICROBIOLOGY", lab: "Molecular Techniques", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 15, slot: 2,
              q: "What is the significance of the test shown in the image (Western Blot) that is used in HIV infection?",
              options: ["A. Screening test for HIV infection", "B. Confirmatory test for HIV infection", "C. Used to detect the viral load of the virus in HIV infection"],
              correct: 1, a: "B. <span class='kw-highlight'>Confirmatory test for HIV infection</span>" },

            // ==================== MICROBIOLOGY - LAB 5: PARASITIC DISEASES ====================
            { id: 132, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 16, slot: 0,
              q: "Regarding the Stool Container:\n1) What is the advice that you would give the patient?\n2) Why we make immediate examination?",
              a: "1) <span class='kw-highlight'>Collect stool in a clean, dry container</span>. Avoid contamination with urine or water. Send to the lab immediately. If delayed, keep at 4°C or use preservatives.<br>2) <span class='kw-highlight'>To preserve trophozoite motility</span>. Delay causes loss of motility and degeneration." },

            { id: 133, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 16, slot: 1,
              q: "1) Name of the test?\n2) Name two parasites detected by this test?",
              a: "1) <span class='kw-highlight'>Blood films (Thin and Thick blood smears)</span><br>2) <span class='kw-highlight'>Malaria</span>, <span class='kw-highlight'>Wuchereria bancrofti</span>, <span class='kw-highlight'>Trypanosoma brucei / Babesia</span>" },

            { id: 134, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 16, slot: 2,
              q: "1) What is the name of this method?\n2) Name one organism identified by this method?",
              a: "1) <span class='kw-highlight'>NIH swab</span><br>2) <span class='kw-highlight'>Enterobius vermicularis (Pinworm)</span>" },

            { id: 135, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 17, slot: 0,
              q: "1) Identify the organism?\n2) What is the best sample to obtain this pathogen?",
              a: "1) <span class='kw-highlight'>Ascaris lumbricoides</span><br>2) <span class='kw-highlight'>Stool sample</span>" },

            { id: 136, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 17, slot: 1,
              q: "What is the identification method (sample) for this organism?",
              a: "<span class='kw-highlight'>Urine sample</span> (for Schistosoma haematobium) / <span class='kw-highlight'>Stool sample (Faeces)</span>",
              note: "العينة المرفقة في تجميع 23 هي بويضة ذات شوكة طرفية واضحة (Terminal spine) أي بويضة بلهارسيا البول Schistosoma haematobium وتصبح الإجابة Urine sample." },

            { id: 137, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 17, slot: 2,
              q: "WOTF is the best method to diagnose the organism that you see under the microscope (Enterobius vermicularis)?",
              options: ["A. Blood test", "B. Look at the rash", "C. Collecting an egg from the perianal area", "D. Skin test"],
              correct: 2, a: "C. <span class='kw-highlight'>Collecting an egg from the perianal area</span>" },

            { id: 138, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 18, slot: 0,
              q: "What is the identification sample for this organism (Schistosoma haematobium egg with terminal spine)?",
              options: ["A. Urine", "B. Stool", "C. Blood"],
              correct: 0, a: "A. <span class='kw-highlight'>Urine</span>" },

            { id: 139, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 18, slot: 1,
              q: "Which of the following is the parasite that can be detected by the diagnostic method shown in the given image (Thin & Thick blood smear)?",
              options: ["A. Enterobius vermicularis", "B. W. bancrofti", "C. F. hepatica", "D. Paragonimus westermani"],
              correct: 1, a: "B. <span class='kw-highlight'>W. bancrofti</span>" },

            { id: 140, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 18, slot: 2,
              q: "What is the identification method for this organism (Giardia lamblia trophozoite)?",
              options: ["A. Direct wet mount for unpreserved stool", "B. Direct wet mount with 10% formalin for preserved stool", "C. Formol-ether concentration"],
              correct: 0, a: "A. <span class='kw-highlight'>Direct wet mount for unpreserved stool</span>" },

            { id: 141, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 19, slot: 0,
              q: "What is the type of detection method used by the diagnostic technique?",
              options: ["A. Rapid diagnostic detection", "B. Antigen detection and Antibody complex", "C. Molecular detection"],
              correct: 0, a: "A. <span class='kw-highlight'>Rapid diagnostic detection</span>" },

            { id: 142, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 19, slot: 1,
              q: "WOTF is the best method to diagnose the infection predicted by the parasite stage shown in the given image (Enterobius vermicularis ova)?",
              options: ["A. Blood test", "B. Look at the rash", "C. Detecting ova in a perianal swab", "D. Skin test"],
              correct: 2, a: "C. <span class='kw-highlight'>Detecting ova in a perianal swab</span>" },

            { id: 143, subject: "MICROBIOLOGY", lab: "Parasitic Diseases", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 19, slot: 2,
              q: "What is the name of this sample?",
              options: ["A. Stool Sample", "B. Urine sample", "C. Blood sample"],
              correct: 0, a: "A. <span class='kw-highlight'>Stool Sample</span>" },

            // ==================== PATHOLOGY - LAB 1: CELL INJURY & ADAPTATION ====================
            { id: 201, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 21, slot: 0,
              q: "1) Describe the pathogenic condition in this organ?\n2) What is the diagnosis?",
              a: "1) <span class='kw-highlight'>One kidney is normal and the other is shrunken</span><br>2) <span class='kw-highlight'>Atrophy of the kidney (Renal atrophy)</span>" },

            { id: 202, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 21, slot: 1,
              q: "3) What is the diagnosis?\n4) Describe the pathogenic condition in this tissue?",
              a: "3) <span class='kw-highlight'>Lung Anthracosis (Pulmonary anthracosis)</span><br>4) Sections show lung tissue containing <span class='kw-highlight'>black pigment</span> due to accumulation of <span class='kw-highlight'>carbon particles</span>." },

            { id: 203, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 21, slot: 2,
              q: "5) What is the diagnosis?\n6) Describe the pathogenic condition in this tissue?",
              a: "5) <span class='kw-highlight'>Prostate hyperplasia (BPH)</span><br>6) Section shows: <span class='kw-highlight'>increase in number of prostatic glands</span>, <span class='kw-highlight'>proliferation of fibromuscular stroma</span>, and focal cystic dilation." },

            { id: 204, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 22, slot: 0,
              q: "1) Describe what happened to the kidney?\n2) What is the adaptive cellular mechanism?",
              a: "1) <span class='kw-highlight'>Decrease in the size of the kidney</span> (One kidney has a normal configuration, and the other kidney is shrunken)<br>2) <span class='kw-highlight'>Atrophy of the kidney</span>" },

            { id: 205, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 22, slot: 1,
              q: "3) Describe what is seen in the image?\n4) What is the diagnosis?",
              a: "3) Lung tissue containing <span class='kw-highlight'>black pigment due to accumulation of carbon particles</span><br>4) <span class='kw-highlight'>Lung Anthracosis</span>" },

            { id: 206, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 22, slot: 2,
              q: "5) Describe what is seen?\n6) What is the diagnosis?",
              a: "5) <span class='kw-highlight'>Increased number of prostatic glands</span>, dilation of most glands, increased lining epithelial cells, <span class='kw-highlight'>proliferation of fibromuscular stroma</span>.<br>6) <span class='kw-highlight'>Benign Prostatic Hyperplasia (BPH)</span>" },

            { id: 207, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2024", category: "compilation", type: "flashcard", highYield: false, page: 23, slot: 0,
              q: "1) Describe what are the changes in the cell size and nuclear size?\n2) What is the adaptive cellular mechanism?",
              a: "1) <span class='kw-highlight'>Hypertrophied Myocardium with an increase in cell size and nuclear size</span><br>2) <span class='kw-highlight'>Left ventricular hypertrophy (Myocardial hypertrophy)</span>" },

            { id: 208, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 23, slot: 1,
              q: "3) Describe the cellular adaptation shown in this tissue.\n4) What is the diagnosis?",
              a: "3) <span class='kw-highlight'>Increased number of prostatic glands</span>, dilation of most glands, and <span class='kw-highlight'>proliferation of fibromuscular stroma</span>.<br>4) <span class='kw-highlight'>Benign Prostatic Hyperplasia (BPH)</span>" },

            { id: 209, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 23, slot: 2,
              q: "5) Describe the cellular adaptation shown in the photo.\n6) What is the diagnosis?",
              a: "5) Cervical epithelium where <span class='kw-highlight'>all cells show dysplastic changes from the base till the surface</span>, causing severe dysplasia.<br>6) <span class='kw-highlight'>Dysplasia of the cervix (Cervical dysplasia)</span>" },

            { id: 210, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2023", category: "compilation", type: "flashcard", highYield: false, page: 24, slot: 0,
              q: "The pathogenic condition shown in the photo (Gout) is due to the deposition of what material?",
              a: "<span class='kw-highlight'>Deposition of uric acid salts (Monosodium urate crystals)</span>" },

            { id: 211, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 24, slot: 1,
              q: "Which type of cellular adaptation of the prostate is shown in the image?",
              options: ["A. Dysplasia", "B. Hyperplasia", "C. Atrophy", "D. Hypertrophy"],
              correct: 1, a: "B. <span class='kw-highlight'>Hyperplasia</span>" },

            { id: 212, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 24, slot: 2,
              q: "Which of the following pathological processes is seen in the slide (Cervix)?",
              options: ["A. Metaplasia", "B. Dysplasia", "C. Hyperplasia", "D. Neoplasm"],
              correct: 1, a: "B. <span class='kw-highlight'>Dysplasia</span>" },

            { id: 213, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 25, slot: 0,
              q: "Which of the following is the adaptive mechanism of the following tissue (Prostate)?",
              options: ["A. Hyperplasia", "B. Hypertrophy", "C. Dysplasia", "D. Metaplasia"],
              correct: 0, a: "A. <span class='kw-highlight'>Hyperplasia</span>" },

            { id: 214, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 25, slot: 1,
              q: "Which of the following pathological processes is seen in the slide?",
              options: ["A. Dysplasia", "B. Hyperplasia", "C. Atrophy", "D. Hypertrophy"],
              correct: 0, a: "A. <span class='kw-highlight'>Dysplasia</span>" },

            { id: 215, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 25, slot: 2,
              q: "This photo shows two skin nodules, slightly yellowish in color. Which of the following is the diagnosis?",
              options: ["A. Anthracosis", "B. Xanthoma", "C. Gout"],
              correct: 1, a: "B. <span class='kw-highlight'>Xanthoma</span>" },

            { id: 216, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 26, slot: 0,
              q: "This photo shows kidney tissue; the glomeruli show deposition of pink material replacing the glomerular tissue. Which of the following is the diagnosis?",
              options: ["A. Amyloid", "B. Xanthoma", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>Amyloid</span>" },

            { id: 217, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 26, slot: 1,
              q: "This photo shows kidney tissue; the glomeruli show deposition of pink material replacing the glomerular tissue. Which of the following is the diagnosis?",
              options: ["A. Amyloid", "B. Xanthoma", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>Amyloid</span>" },

            { id: 218, subject: "PATHOLOGY", lab: "Cell injury & Adaptation", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 26, slot: 2,
              q: "This photo shows two skin nodules, slightly yellowish in color. Which of the following is the diagnosis?",
              options: ["A. Anthracosis", "B. Xanthoma", "C. Gout"],
              correct: 1, a: "B. <span class='kw-highlight'>Xanthoma</span>" },

            // ==================== PATHOLOGY - LAB 2: INFLAMMATION ====================
            { id: 219, subject: "PATHOLOGY", lab: "Inflammation", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 27, slot: 0,
              q: "1) Describe the pathogenic condition in this tissue.\n2) What is the diagnosis?",
              a: "1) A cross-section of an inflamed appendix that shows an <span class='kw-highlight'>acute inflammatory process with predominance of neutrophils</span> involving all layers of the appendiceal wall and extending to peri-appendiceal fat.<br>2) <span class='kw-highlight'>Acute appendicitis (Acute suppurative appendicitis)</span>" },

            { id: 220, subject: "PATHOLOGY", lab: "Inflammation", year: "2023", category: "compilation", type: "flashcard", highYield: false, page: 27, slot: 1,
              q: "What is the diagnosis of the condition that you see?",
              a: "<span class='kw-highlight'>Liver Schistosomiasis</span>" },

            { id: 221, subject: "PATHOLOGY", lab: "Inflammation", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 27, slot: 2,
              q: "Case. What type of inflammatory cells are present in the inflamed appendix?",
              options: ["A. Lymphocytes", "B. Plasma cells", "C. Macrophages", "D. Neutrophils"],
              correct: 3, a: "D. <span class='kw-highlight'>Neutrophils</span>" },

            { id: 222, subject: "PATHOLOGY", lab: "Inflammation", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 28, slot: 0,
              q: "An old male patient came to the hospital with a lymph node and was diagnosed with Tuberculosis. Which of the following necrosis does he have?",
              options: ["A. Caseous necrosis", "B. Coagulative necrosis"],
              correct: 0, a: "A. <span class='kw-highlight'>Caseous necrosis</span>" },

            { id: 223, subject: "PATHOLOGY", lab: "Inflammation", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 28, slot: 1,
              q: "Which of the following pathological processes is seen in the slide?",
              options: ["A. Acute suppurative appendicitis", "B. Prostate hyperplasia", "C. Adenocarcinoma", "D. Endometrial Hyperplasia"],
              correct: 0, a: "A. <span class='kw-highlight'>Acute suppurative appendicitis</span>" },

            { id: 224, subject: "PATHOLOGY", lab: "Inflammation", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 28, slot: 2,
              q: "This photo shows a section of a lymph node, where two Langhans giant cells with peripheral nuclei are found. Which of the following is the diagnosis?",
              options: ["A. TB", "B. Keloid", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>TB (Tuberculosis)</span>" },

            // ==================== PATHOLOGY - LAB 3: HEMODYNAMIC DISORDERS ====================
            { id: 225, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 29, slot: 0,
              q: "1) What is the diagnosis?\n2) Describe the pathogenic condition in this tissue.",
              a: "1) <span class='kw-highlight'>Lung: Chronic venous congestion</span><br>2) <span class='kw-highlight'>Enlarged, reddish, and solid lung</span>" },

            { id: 226, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 29, slot: 1,
              q: "3) Describe what is seen?\n4) What is the diagnosis?",
              a: "3) <span class='kw-highlight'>Reddish, enlarged, solid lung</span><br>4) <span class='kw-highlight'>Chronic venous congestion in the lung</span>" },

            { id: 227, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 30, slot: 0,
              q: "1) What is the diagnosis?\n2) Describe the pathogenic condition in this tissue.",
              a: "1) <span class='kw-highlight'>Liver: Chronic venous congestion</span><br>2) Central regions of hepatic lobules are red-brown, surrounded by tan to light-brown areas. Overall appearance: <span class='kw-highlight'>nutmeg liver</span>." },

            { id: 228, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 30, slot: 1,
              q: "3) Describe the pathogenic condition of this photo.\n4) What is the diagnosis?",
              a: "3) The photo shows the cut surface of the liver. There are <span class='kw-highlight'>alternating red and pale areas (nutmeg appearance)</span>.<br>4) <span class='kw-highlight'>Chronic venous congestion</span>" },

            { id: 229, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2025", category: "compilation", type: "flashcard", highYield: false, page: 31, slot: 0,
              q: "1) What is the diagnosis?\n2) Describe the pathogenic condition in this tissue:",
              a: "1) <span class='kw-highlight'>Recent Thrombus (or Recent Thrombosis)</span><br>2) Sections of the artery show <span class='kw-highlight'>red blood cells along with fibrin and white blood cells (leukocytes)</span> within the lumen of the artery." },

            { id: 230, subject: "PATHOLOGY", lab: "Hemodynamic Disorders", year: "2024", category: "compilation", type: "flashcard", highYield: false, page: 31, slot: 1,
              q: "3) Describe what is seen?\n4) What is the diagnosis?",
              a: "3) <span class='kw-highlight'>Swelling due to accumulation of excess fluid in soft tissues</span>, usually localized to the lower or upper limbs.<br>4) <span class='kw-highlight'>Non-pitting edema (Hard edema)</span>" },

            // ==================== PATHOLOGY - LAB 4: NEOPLASIA ====================
            { id: 231, subject: "PATHOLOGY", lab: "Neoplasia", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 32, slot: 0,
              q: "1) What is the diagnosis?\n2) Describe the pathogenic condition in this tissue.",
              a: "1) <span class='kw-highlight'>Adenocarcinoma of the colon</span><br>2) <span class='kw-highlight'>Malignant glandular structures invade the muscularis mucosae layer and the submucosa</span>." },

            { id: 232, subject: "PATHOLOGY", lab: "Neoplasia", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 32, slot: 1,
              q: "3) What is the diagnosis?\n4) Describe the pathogenic condition in this tissue.",
              a: "3) <span class='kw-highlight'>Lipoma</span><br>4) A group of <span class='kw-highlight'>mature fat cells forming lobules</span>, separated by <span class='kw-highlight'>fine fibrovascular stroma</span>. The cells have cell membranes and peripheral, compressed nuclei." },

            { id: 233, subject: "PATHOLOGY", lab: "Neoplasia", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 32, slot: 2,
              q: "5) Describe what is seen?\n6) What is the diagnosis?",
              a: "5) <span class='kw-highlight'>Malignant glandular structures that invade the muscularis mucosae layer and the submucosa</span><br>6) <span class='kw-highlight'>Adenocarcinoma of the colon</span>" },

            { id: 234, subject: "PATHOLOGY", lab: "Neoplasia", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 33, slot: 0,
              q: "1) Describe what is seen in this condition?\n2) What is the diagnosis?",
              a: "1) <span class='kw-highlight'>Fine fibrovascular stroma</span> separating groups of mature fat cells forming lobules.<br>2) <span class='kw-highlight'>Lipoma</span>" },

            { id: 235, subject: "PATHOLOGY", lab: "Neoplasia", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 33, slot: 1,
              q: "3) Describe the pathogenic condition in this tissue.\n4) What is the diagnosis?",
              a: "3) The section shows <span class='kw-highlight'>groups of mature fat cells forming lobules, separated by fine fibrovascular stroma</span>. The cells have cell membranes and peripherally compressed nuclei. The fat dissolves during tissue preparation.<br>4) <span class='kw-highlight'>Lipoma</span>" },

            { id: 236, subject: "PATHOLOGY", lab: "Neoplasia", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 33, slot: 2,
              q: "5) From the intestine, describe the pathogenic condition?\n6) What is the diagnosis?",
              a: "5) A section of the colon shows a tumour formed of <span class='kw-highlight'>malignant glandular structures that invade the muscularis mucosae layer and the submucosa</span>.<br>6) <span class='kw-highlight'>Adenocarcinoma of the colon</span>" },

            { id: 237, subject: "PATHOLOGY", lab: "Neoplasia", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 34, slot: 0,
              q: "The photo shows colonic tissue; there is an area of normal mucosa and irregular atypical glandular structures invading the tissue. Which of the following is the diagnosis?",
              options: ["A. Adenocarcinoma", "B. TB", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>Adenocarcinoma</span>" },

            { id: 238, subject: "PATHOLOGY", lab: "Neoplasia", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 34, slot: 1,
              q: "The photo shows colonic tissue; there is an area of normal mucosa and irregular atypical glandular structures invading the tissue. Which of the following is the diagnosis?",
              options: ["A. Adenocarcinoma", "B. TB", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>Adenocarcinoma</span>" },

            { id: 239, subject: "PATHOLOGY", lab: "Neoplasia", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 34, slot: 2,
              q: "What is the type of condition in this slide (Uterine tumor)?",
              options: ["A. Cervical dysplasia", "B. Leiomyoma", "C. Atrophy of the testis"],
              correct: 1, a: "B. <span class='kw-highlight'>Leiomyoma</span>" },

            { id: 240, subject: "PATHOLOGY", lab: "Neoplasia", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 35, slot: 0,
              q: "In this photo section from a malignant ulcer of Squamous cell carcinoma, what is the best description for it?",
              options: ["A. Well-differentiated type", "B. Moderately-differentiated type", "C. Poorly differentiated type"],
              correct: 0, a: "A. <span class='kw-highlight'>Well-differentiated type</span>" },

            { id: 241, subject: "PATHOLOGY", lab: "Neoplasia", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 35, slot: 1,
              q: "The photo shows the uterine cavity; it is occupied by a large, round tumor. The surface of the tumor shows lobules. WOTF is the diagnosis?",
              options: ["A. TB", "B. Gout", "C. Leiomyoma"],
              correct: 2, a: "C. <span class='kw-highlight'>Leiomyoma</span>" },

            { id: 242, subject: "PATHOLOGY", lab: "Neoplasia", year: "2020", category: "compilation", type: "mcq", highYield: true, page: 35, slot: 2,
              q: "The photo shows colonic tissue; there is an area of normal mucosa and irregular atypical glandular structures invading the tissue. Which of the following is the diagnosis?",
              options: ["A. Adenocarcinoma", "B. TB", "C. Gout"],
              correct: 0, a: "A. <span class='kw-highlight'>Adenocarcinoma</span>" },

            // ==================== HISTOLOGY - LAB 1: LOOSE CONNECTIVE TISSUES ====================
            { id: 301, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 37, slot: 0,
              q: "Name each type of fiber:\nA:\nB:\nC:",
              a: "A: <span class='kw-highlight'>Collagen fibers</span><br>B: <span class='kw-highlight'>Elastic fibers</span><br>C: <span class='kw-highlight'>Reticular fibers</span>" },

            { id: 302, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 37, slot: 1,
              q: "Identify the structures labeled with arrows:\nA:\nB:\nC:",
              a: "A: <span class='kw-highlight'>Elastic fibers</span> (رفيعة متفرعة)<br>B: <span class='kw-highlight'>Collagen fibers</span> (حزم عريضة)<br>C: <span class='kw-highlight'>Reticular fibers</span> (شبكة باهتة)" },

            { id: 303, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 37, slot: 1, noSample: true,
              q: "Mention 2 examples of components of the ground substance:",
              a: "• <span class='kw-highlight'>Proteoglycans</span><br>• <span class='kw-highlight'>Glycosaminoglycans (GAGs)</span><br>• <span class='kw-highlight'>Multiadhesive glycoproteins</span>" },

            { id: 304, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 38, slot: 0, noSample: true,
              q: "Name 2 cells that belong to the resident cell population:",
              a: "• <span class='kw-highlight'>Fibroblast (or Fibrocyte)</span><br>• <span class='kw-highlight'>Mast cell</span><br>• <span class='kw-highlight'>Adipocyte (Fat cell)</span><br>• <span class='kw-highlight'>Macrophage</span><br>• <span class='kw-highlight'>Pericyte</span>" },

            { id: 305, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 38, slot: 0, noSample: true,
              q: "Name 2 cells that belong to the wandering cell population:",
              a: "• <span class='kw-highlight'>Monocyte</span><br>• <span class='kw-highlight'>Lymphocyte</span><br>• <span class='kw-highlight'>Neutrophil / Eosinophil / Basophil</span><br>• <span class='kw-highlight'>Plasma cell</span>" },

            { id: 306, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 39, slot: 0,
              q: "In this tissue, which of the following belongs to the resident cell population?",
              options: ["A. Monocyte", "B. Lymphocyte", "C. Macrophage", "D. Neutrophils"],
              correct: 2, a: "C. <span class='kw-highlight'>Macrophage</span>" },

            { id: 307, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 39, slot: 1,
              q: "In tissue, which of the following is a type of collagen III fibre?",
              options: ["A. Elastic", "B. Reticular", "C. Collagen"],
              correct: 1, a: "B. <span class='kw-highlight'>Reticular</span>" },

            { id: 308, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2021", category: "compilation", type: "mcq", highYield: false, page: 39, slot: 2,
              q: "In this tissue, which of the following structures belong to the proteoglycans of the ground substance?",
              options: ["A. Integrin", "B. Collagen", "C. Syndecan", "D. Fibronectin"],
              correct: 2, a: "C. <span class='kw-highlight'>Syndecan</span>" },

            { id: 309, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 40, slot: 0,
              q: "In this tissue, which of the following structures belong to the proteoglycans of the ground substance?",
              options: ["A. Integrin", "B. Collagen", "C. Aggrecan", "D. Fibronectin"],
              correct: 2, a: "C. <span class='kw-highlight'>Aggrecan</span>" },

            { id: 310, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 40, slot: 1,
              q: "What does the red circle show?",
              options: ["A. Fibroblast", "B. Adipocyte", "C. None"],
              correct: 0, a: "A. <span class='kw-highlight'>Fibroblast</span>" },

            { id: 311, subject: "HISTOLOGY", lab: "Loose Connective Tissues", year: "2020", category: "compilation", type: "mcq", highYield: false, page: 40, slot: 2,
              q: "The photo shows which type of WBC?",
              options: ["A. Eosinophil", "B. Basophil", "C. Neutrophil"],
              correct: 0, a: "A. <span class='kw-highlight'>Eosinophil</span>" },

            // ==================== HISTOLOGY - LAB 2: SMALL BLOOD VESSELS ====================
            { id: 312, subject: "HISTOLOGY", lab: "Small Blood Vessels", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 41, slot: 0,
              q: "Label the structures shown by the arrows:\nA:\nB:\nC:",
              a: "A: <span class='kw-highlight'>Endothelial cell</span><br>B: <span class='kw-highlight'>Capillary</span><br>C: <span class='kw-highlight'>Pericyte</span>" },

            { id: 313, subject: "HISTOLOGY", lab: "Small Blood Vessels", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 41, slot: 1,
              q: "Label the structures shown by the arrows:\nA:\nB:",
              a: "A: <span class='kw-highlight'>Venule</span><br>B: <span class='kw-highlight'>Arteriole</span>" },

            { id: 314, subject: "HISTOLOGY", lab: "Small Blood Vessels", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 41, slot: 2,
              q: "Identify the structures labeled with arrows:\nA:\nB:\nC:",
              a: "A: <span class='kw-highlight'>Continuous basal lamina</span><br>B: <span class='kw-highlight'>Endothelial cells</span><br>C: <span class='kw-highlight'>Pericyte</span>" },

            { id: 315, subject: "HISTOLOGY", lab: "Small Blood Vessels", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 42, slot: 0,
              q: "Identify the structures labeled with arrows:\nA:\nB:\nC:",
              a: "A: <span class='kw-highlight'>Arteriole</span><br>B: <span class='kw-highlight'>Smooth Muscle cell (or Endothelial cell)</span><br>C: <span class='kw-highlight'>Venule</span>" },

            // ==================== SURGERY - BREAST CANCER EXAMINATION ====================
            { id: 401, subject: "SURGERY", lab: "Breast Cancer", year: "2025", category: "compilation", type: "flashcard", highYield: true, page: 44, slot: 0,
              q: "Name two abnormalities from the picture shown:",
              a: "• <span class='kw-highlight'>Redness</span><br>• <span class='kw-highlight'>Peau d'orange</span><br>• <span class='kw-highlight'>Nipple retraction/depression</span>" },

            { id: 402, subject: "SURGERY", lab: "Breast Cancer", year: "2024", category: "compilation", type: "flashcard", highYield: true, page: 44, slot: 1,
              q: "Name two abnormalities from the picture shown:",
              a: "• <span class='kw-highlight'>Redness</span><br>• <span class='kw-highlight'>Peau d'orange</span><br>• <span class='kw-highlight'>Nipple retraction/depression</span>" },

            { id: 403, subject: "SURGERY", lab: "Breast Cancer", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 44, slot: 2,
              q: "Name two abnormalities from the picture shown:",
              a: "• <span class='kw-highlight'>Redness</span><br>• <span class='kw-highlight'>Peau d'orange</span><br>• <span class='kw-highlight'>Nipple discharge / new fluid</span>" },

            { id: 404, subject: "SURGERY", lab: "Breast Cancer", year: "2023", category: "compilation", type: "flashcard", highYield: true, page: 45, slot: 0,
              q: "1) What is the doctor trying to detect in position A (hands on waist)?\n2) What is the doctor trying to detect in position B (arms raised)?",
              a: "1) Position A: <span class='kw-highlight'>To contract the Pectoralis major muscle</span><br>2) Position B: <span class='kw-highlight'>To accentuate lumps, asymmetry, and skin tethering</span>" },

            { id: 405, subject: "SURGERY", lab: "Breast Cancer", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 45, slot: 0, noSample: true,
              q: "Most common site of breast cancer?",
              options: ["A. Upper outer", "B. Upper inner", "C. Lower outer", "D. Lower inner"],
              correct: 0, a: "A. <span class='kw-highlight'>Upper outer</span>" },

            { id: 406, subject: "SURGERY", lab: "Breast Cancer", year: "2022", category: "compilation", type: "mcq", highYield: true, page: 45, slot: 0, noSample: true,
              q: "The patient presents with a right breast mass. The doctor asks her to put her hands on her waist. What is the doctor trying to examine?",
              options: ["A. Show abdominal muscle", "B. Minor pectoralis muscle", "C. Major pectoralis muscle", "D. Serratus anterior muscle"],
              correct: 2, a: "C. <span class='kw-highlight'>Major pectoralis muscle</span>",
              note: "هذا السؤال ورد في ميد 2021 و 2022 بنفس الصيغة، ويُقصد به الوضعية (Position A) في تجميع 2023." },

            { id: 407, subject: "SURGERY", lab: "Breast Cancer", year: "2021", category: "compilation", type: "mcq", highYield: true, page: 46, slot: 0,
              q: "What type of breast abnormality is shown in the picture?",
              options: ["A. Peau d'Orange", "B. Nipple retraction", "C. Skin dimpling", "D. Paget's disease of the nipple"],
              correct: 0, a: "A. <span class='kw-highlight'>Peau d'Orange</span>" }
        ];

// ================= 1. بيانات لابات F2 OSPE الـ 12 الرسمية (Checklist & Sub-Labs) =================
    const F2_OSPE_LABS = [
        { id: 'mic_1', num: 1, subject: 'Microbiology', color: '#10b981', title: 'Identification of Gram + Bacteria', keywords: ['gram +', 'gram positive', 'gram-positive', 'staph', 'strep', 'catalase', 'coagulase', 'mannitol', 'msa', 'blood agar', 'hemolysis', 'bacillus', 'clostridium', 'clusters', 'chains', 'موجبة', 'عنقودية', 'سبحية'] },
        { id: 'mic_2', num: 2, subject: 'Microbiology', color: '#10b981', title: 'Identification of Gram - Bacteria', keywords: ['gram -', 'gram negative', 'gram-negative', 'macconkey', 'emb', 'tsi', 'indole', 'citrate', 'urease', 'oxidase', 'coli', 'klebsiella', 'salmonella', 'shigella', 'pseudomonas', 'proteus', 'neisseria', 'lactose', 'سالبة'] },
        { id: 'mic_3', num: 3, subject: 'Microbiology', color: '#10b981', title: 'Antibiotic Susceptibility Testing', keywords: ['antibiotic', 'susceptibility', 'kirby', 'bauer', 'disk', 'diffusion', 'mic', 'etest', 'e-test', 'mueller', 'hinton', 'zone', 'inhibition', 'sensitive', 'resistant', 'مضاد', 'حساسية'] },
        { id: 'mic_4', num: 4, subject: 'Microbiology', color: '#10b981', title: 'Molecular Techniques for Identification of Viruses', keywords: ['virus', 'viral', 'molecular', 'pcr', 'elisa', 'blot', 'electrophoresis', 'gel', 'cytopathic', 'cpe', 'hemagglutination', 'inclusion', 'فيروس', 'جزيئية'] },
        { id: 'mic_5', num: 5, subject: 'Microbiology', color: '#10b981', title: 'Diagnosis of Parasitic Diseases', keywords: ['parasit', 'ova', 'egg', 'cyst', 'trophozoite', 'malaria', 'plasmodium', 'schistosoma', 'entamoeba', 'giardia', 'leishmania', 'ascaris', 'taenia', 'trichuris', 'enterobius', 'طفيلي', 'بويضة', 'يرقة'] },
        { id: 'pat_6', num: 6, subject: 'Pathology', color: '#f43f5e', title: 'Cell injury & Adaptation', keywords: ['injury', 'adaptation', 'atrophy', 'hypertrophy', 'hyperplasia', 'metaplasia', 'necrosis', 'apoptosis', 'steatosis', 'fatty', 'calcification', 'coagulative', 'liquefactive', 'caseous', 'gangrene', 'تكيف', 'نخر', 'ضمور', 'تضخم', 'تدهن'] },
        { id: 'pat_7', num: 7, subject: 'Pathology', color: '#f43f5e', title: 'Inflammation', keywords: ['inflammation', 'acute', 'chronic', 'granuloma', 'abscess', 'appendicitis', 'cholecystitis', 'neutrophil', 'macrophage', 'giant cell', 'langhans', 'ulcer', 'granulation', 'fibrosis', 'التهاب', 'حبيبي', 'خراج', 'زائدة'] },
        { id: 'pat_8', num: 8, subject: 'Pathology', color: '#f43f5e', title: 'Hemodynamic disorders', keywords: ['hemodynamic', 'edema', 'congestion', 'hyperemia', 'hemorrhage', 'thrombus', 'thrombosis', 'embol', 'infarct', 'nutmeg', 'heart failure', 'zahn', 'احتقان', 'خثرة', 'جلطة', 'احتشاء', 'وذمة'] },
        { id: 'pat_9', num: 9, subject: 'Pathology', color: '#f43f5e', title: 'Neoplasia', keywords: ['neoplasia', 'tumor', 'tumour', 'benign', 'malignant', 'carcinoma', 'sarcoma', 'adenoma', 'lipoma', 'leiomyoma', 'fibroadenoma', 'papilloma', 'teratoma', 'metastasis', 'dysplasia', 'lymphoma', 'melanoma', 'ورم', 'سرطان', 'حميد', 'خبيث'] },
        { id: 'his_10', num: 10, subject: 'Histology', color: '#8b5cf6', title: 'Structure of Loose Connective Tissues', keywords: ['connective', 'loose', 'areolar', 'fibroblast', 'collagen', 'elastic', 'reticular', 'mast', 'plasma cell', 'adipose', 'fat', 'macrophage', 'ضام', 'ألياف', 'خلية بدينة'] },
        { id: 'his_11', num: 11, subject: 'Histology', color: '#8b5cf6', title: 'Structure of small vessels', keywords: ['vessel', 'artery', 'arteriole', 'vein', 'venule', 'capillary', 'endothelium', 'tunica', 'intima', 'media', 'adventitia', 'vascular', 'وعاء', 'أوعية', 'شريان', 'وريد', 'شعيرات'] },
        { id: 'sur_12', num: 12, subject: 'Surgery', color: '#f59e0b', title: 'Breast Cancer History & Examination', keywords: ['breast', 'nipple', 'axilla', 'lump', 'mastectomy', 'mammogram', 'peau', 'retraction', 'examination', 'history', 'surgery', 'ثدي', 'فحص', 'جراحة'] }
    ];

// ================= 5. قاعدة المعرفة الطبية الذكية لـ "المناضل" =================
    const labKnowledgeBase = {
        "Gram-positive Bacteria": {
            explain: "في محطات البكتيريا موجبة الجرام، المفتاح الأول هو شكل الترتيب والـ Hemolysis:\n• إذا ذكرت القصة التهاب لوزتين صديدي (Tonsillitis with exudate) وسلاسل بنفسجية (Cocci in chains) فالتشخيص فوراً هو Streptococcus pyogenes وتسبب Beta-hemolysis كامل.\n• إذا كانت العينة طبق Mannitol Salt Agar (MSA) وتحول لونه للأصفر، فالبكتيريا هي Staphylococcus aureus لأنها تخمر المانيتول وتظهر في المسحة كـ Cocci in clusters.",
            diff: "• التفريق المجهري: S. pyogenes تصطف في سلاسل (Chains)، بينما S. aureus تتجمع كعناقيد العنب (Clusters).\n• في اختبار الـ CAMP test: ظهور تحلل دم على شكل رأس سهم (Arrow-head hemolysis) يميز بكتيريا Streptococcus agalactiae (Group B).",
            mnemonic: "• اربط (S. pyogenes = Chains = سلاسل في الحلق).\n• اربط (S. aureus = Gold/Yellow on MSA = ذهبية تحول الوسط للأصفر)."
        },
        "Gram-negative Bacteria": {
            explain: "محطات البكتيريا سالبة الجرام تعتمد على تفاعلات IMViC وأنابيب TSI:\n• E. coli: تخمر اللاكتوز وتتميز بـ (Indole +ve, MR +ve, VP -ve, Citrate -ve).\n• Klebsiella pneumoniae: تتميز بكبسولة كبيرة ومخاطية وتكون عكس الإيكولاي (Indole -ve, MR -ve, VP +ve, Citrate +ve بلون أزرق).\n• Proteus mirabilis: تتميز بإيجابية اختبار اليورياز (Urease +ve باللون الوردي الفاقع) وإنتاج غاز H2S الأسود في أنبوب TSI.",
            diff: "• أنبوب Citrate: الأخضر = سلبي، الأزرق (Blue) = إيجابي (مثل Klebsiella).\n• أنبوب Urease: الوردي الفاقع (Pink) = إيجابي (Proteus)، البرتقالي/الأصفر = سلبي.\n• الصبغة الخضراء المزرقّة على الطبق تميز Pseudomonas aeruginosa.",
            mnemonic: "• اربط إيكولاي بـ (I-M): أول حرفين من IMViC موجبين (+ + - -).\n• اربط Citrate Blue = Kleb-siella (حرف B مع Blue)."
        },
        "Antibiotic Susceptibility": {
            explain: "هذه المحطة تختبر طريقة Kirby-Bauer Disc Diffusion لفحص حساسية البكتيريا للمضادات الحيوية:\n• الوسط المستخدم دائماً هو Mueller-Hinton Agar (MH Agar).\n• المنطقة الدائرية الشفافة حول القرص تسمى Zone of inhibition وتعني أن البكتيريا حساسة (Susceptible) للمضاد.",
            diff: "• ركز في صيغة السؤال: إذا سأل عن Method فاكتب (Diffusion method)، وإذا سأل عن Agar/Medium فاكتب (Mueller-Hinton Agar).",
            mnemonic: "• MH Agar = معيار الحساسية (Mueller-Hinton)."
        },
        "Molecular Techniques": {
            explain: "في تشخيص الفيروسات مثل SARS-CoV-2 (وهو فيروس RNA):\n• إنزيم الـ PCR يعمل فقط على الـ DNA، لذلك يجب أولاً إجراء خطوة Reverse Transcription لتحويل الـ RNA الفيروسي إلى cDNA.\n• الفرق الجوهري: الـ PCR العادي يعطي نتيجة نوعية (Qualitative) في نهاية التفاعل، بينما الـ q-PCR يقيس كمية الفيروس في الوقت الفعلي (Real-time quantification) باستخدام الوميض الفلوري.",
            diff: "• تقنية النقاط الملونة المضيئة في الشبكة هي DNA Microarray.\n• أشرطة البروتين المرقمة في تشخيص الـ HIV هي اختبار Western Blot وتستخدم كاختبار تأكيدي (Confirmatory test).\n• أجسام Negri bodies توجد داخل السيتوبلازم وهي مميزة لداء الكلب (Rabies).",
            mnemonic: "• RNA virus ➡️ يحتاج RT أولاً قبل الـ PCR.\n• q-PCR = Quantitative (رقمي وكمي في الوقت الفعلي)."
        },
        "Parasitic Diseases": {
            explain: "في تشخيص الطفيليات:\n• عينة البراز (Stool) يجب فحصها فوراً في وعاء جاف ونظيف للحفاظ على حركة الطور النشط (Preserve trophozoite motility).\n• مسحة الدم (Thin & Thick blood films) تكشف طفيليات الدم مثل Malaria و Wuchereria bancrofti.\n• مسحة السيلوفان حول الشرج (NIH perianal swab) تكشف بويضات الدودة الدبوسية Enterobius vermicularis.",
            diff: "• بويضة ذات شوكة طرفية واضحة (Terminal spine) = Schistosoma haematobium وعينتها دائماً البول (Urine sample).\n• بويضة مسطحة من جهة واحدة (D-shaped) = Enterobius vermicularis.\n• بويضة دائرية سميكة الجدار المتموج = Ascaris lumbricoides في البراز.",
            mnemonic: "• Terminal spine = بلهارسيا البول (Urine).\n• Pinworm (Enterobius) = Perianal swab (حرف P مع P)."
        },
        "Cell injury & Adaptation": {
            explain: "هذه المحطة تختبر آليات التكيف الخلوي والتراكمات المرضية:\n• كلية منكمشة وصغيرة بجانب كلية طبيعية = Renal Atrophy.\n• ترسبات سوداء في نسيج الرئة = Pulmonary Anthracosis بسبب استنشاق جزيئات الكربون.\n• زيادة عدد الغدد والسدى العضلي الليفي في البروستات مع توسع كيسي = Benign Prostatic Hyperplasia (BPH).\n• ترسب مادة وردية متجانسة في كبيبات الكلى = Renal Amyloidosis.",
            diff: "• عقيدات جلدية صفراء اللون (Yellowish skin nodules) = Xanthoma.\n• ترسب بلورات إبرية = Gout (Monosodium urate crystals).\n• فقدان انتظام الخلايا من القاعدة للسطح في عنق الرحم = Cervical Dysplasia.",
            mnemonic: "• Black Lung = Carbon = Anthracosis.\n• Pink Glomeruli = Amyloid.\n• Yellow Skin Nodule = Xanthoma."
        },
        "Inflammation": {
            explain: "محطات الالتهاب الحاد والمزمن:\n• في التهاب الزائدة الدودية الحاد (Acute suppurative appendicitis)، العلامة المميزة هي ارتشاح خلايا Neutrophils في جميع طبقات جدار الزائدة.\n• في درن الغدد اللمفاوية (TB)، نرى حبيبومات مع خلايا عملاقة متعددة الأنوية على الأطراف (Langhans giant cells) ونخر تجبني (Caseous necrosis).",
            diff: "• الخلية السائدة في الالتهاب الحاد الصديدي (Appendicitis) هي Neutrophils.\n• نوع النخر في الـ Tuberculosis هو دائماً Caseous necrosis.",
            mnemonic: "• Acute Appendicitis = Neutrophils.\n• TB = Caseous necrosis + Langhans giant cells."
        },
        "Hemodynamic Disorders": {
            explain: "في اضطرابات الدورة الدموية:\n• احتقان الكبد المزمن (CVC of Liver) يظهر عيانياً بمظهر جوزة الطيب (Nutmeg liver) بسبب تبادل المناطق الحمراء المحتقنة مع المناطق الباهتة.\n• الخثرة الحديثة (Recent thrombus) تظهر داخل لمعة الشريان مكونة من كريات دم حمراء وخيوط فايبرين وكريات بيضاء.",
            diff: "• CVC of Lung: رئة متضخمة، حمراء داكنة، وصلبة القوام.\n• CVC of Liver: سطح مقطعي منقط بالأحمر والبني الفاتح (Nutmeg appearance).\n• تورم الساق الصلب غير القابل للانضغاط = Non-pitting edema.",
            mnemonic: "• Nutmeg Liver = CVC Liver."
        },
        "Neoplasia": {
            explain: "في محطات الأورام الحميدة والخبيثة:\n• ورم القولون الخبيث (Adenocarcinoma of the colon) يتميز بوجود غدد خبيثة غير منتظمة تخترق طبقة Muscularis mucosae وتمتد إلى الـ Submucosa.\n• الورم الشحمي الحميد (Lipoma) يتكون من فصيصات خلايا دهنية ناضجة يفصلها Fine fibrovascular stroma مع أنوية مضغوطة في الطرف.",
            diff: "• Lipoma: خلايا دهنية فارغة المظهر ونواة طرفية.\n• Leiomyoma: ورم عضلي أملس حميد دائري ومفصص داخل تجويف الرحم.\n• Well-differentiated SCC: يتميز بوجود لآلئ الكيراتين (Keratin pearls) الوردية في المركز.",
            mnemonic: "• Invasion of submucosa by glands = Adenocarcinoma.\n• Keratin pearls = Well-differentiated Squamous Cell Carcinoma."
        },
        "Loose Connective Tissues": {
            explain: "في شرائح النسيج الضام الرخو:\n• الألياف الثلاثة هي: Collagen fibers (حزم سميكة متموجة وردية)، و Elastic fibers (خيوط رفيعة داكنة متفرعة)، و Reticular fibers (شبكة رقيقة من Collagen type III).\n• الخلايا تنقسم إلى خلايا مقيمة ثابتة (Resident: مثل Fibroblast, Macrophage, Mast cell, Adipocyte, Pericyte) وخلايا مهاجرة من الدم (Wandering: مثل Lymphocyte, Neutrophil, Eosinophil, Plasma cell).",
            diff: "• إذا سأل عن Proteoglycans في المادة الأساسية فاختر Syndecan أو Aggrecan.\n• كرية الدم البيضاء ذات الفصين والحبيبات الحمراء الكبيرة هي Eosinophil.",
            mnemonic: "• Reticular fibers = Collagen type III.\n• Resident cells = ثابتة في النسيج (Fibroblast & Macrophage)."
        },
        "Small Blood Vessels": {
            explain: "في شرائح الأوعية الدموية الدقيقة:\n• الـ Arteriole يتميز بجدار عضلي سميك نسبياً ولمعة دائرية ضيقة ومنتظمة.\n• الـ Venule يتميز بجدار رقيق جداً ولمعة واسعة غير منتظمة (Collapsed lumen).\n• خلية الـ Pericyte تحيط بالشعيرات الدموية (Capillaries) وتقع داخل نفس الصفيحة القاعدية (Continuous basal lamina).",
            diff: "• قارن دائماً سماكة الجدار: الدائري السميك = Arteriole، والواسع الرقيق = Venule.",
            mnemonic: "• Arteriole = Round & Muscular.\n• Venule = Wide & Thin."
        },
        "Breast Cancer": {
            explain: "في محطة فحص وسرطان الثدي:\n• العلامات الظاهرة في الصورة هي: مظهر قشر البرتقال (Peau d'orange) بسبب انسداد الأوعية اللمفاوية الجلدية، والاحمرار (Redness)، وانكماش الحلمة (Nipple retraction).\n• أكثر مكان شيوعاً لسرطان الثدي هو الربع العلوي الخارجي (Upper outer quadrant).",
            diff: "• Position A (وضع اليدين على الخصر والضغط): الهدف منه تقليص عضلة Pectoralis major.\n• Position B (رفع الذراعين للأعلى): الهدف منه إبراز أي عدم تناظر أو كتل أو شد في الجلد (Skin tethering).",
            mnemonic: "• Hands on waist = Contract Pectoralis major.\n• Upper Outer Quadrant = الأكثر شيوعاً."
        }
    };


// ================= الترقية الشاملة V5: المزامنة السحابية الشاملة بالكود السري + تسريع الفتح 4x =================
// مسح المفتاح القديم الذي كان يخفي الإقرار تلقائياً في البداية دون انتظار ضغط زر موافق
try {
    localStorage.removeItem('med26_disclaimer_accepted');
    sessionStorage.removeItem('med26_disclaimer_accepted');
} catch (e) {}

window.addEventListener('DOMContentLoaded', () => {
    // 1. تسريع تحميل الشعار الفوري بدون فحص البكسلات الثقيل
    window.loadTransparentLogo = function() {
        const cached = localStorage.getItem('med26_fast_logo_src') || 'logo.png';
        window.globalLogoDataUrl = cached;
        document.querySelectorAll('img[data-logo]').forEach(el => {
            el.decoding = 'async';
            el.onerror = function() {
                if (!this.src.includes('شعار الدفعة_2.png')) this.src = 'شعار الدفعة_2.png';
            };
            el.src = cached;
        });
    };
    window.loadTransparentLogo();

    // 2. التحميل الكسول (Lazy Loading) لجميع صور العينات والأطلس
    function applyFastLazyImages() {
        document.querySelectorAll('#atlas-grid img, #q-image, #spot-day-img').forEach(img => {
            if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
        });
    }
    applyFastLazyImages();

    const _origRenderAtlasV5 = window.renderAtlasGrid;
    if (typeof _origRenderAtlasV5 === 'function') {
        window.renderAtlasGrid = function(...args) {
            const res = _origRenderAtlasV5.apply(this, args);
            applyFastLazyImages();
            return res;
        };
    }

    // 3. المزامنة السحابية الشاملة (المفضلة + الملاحظات + الـ Checklist + الإتقان) عبر الكود السري (4 أرقام)
    let cloudSyncDebounceTimer = null;

    function scheduleCloudProfilePush(delayMs = 350) {
        localStorage.setItem('med26_profile_updated_at', String(Date.now()));
        clearTimeout(cloudSyncDebounceTimer);
        cloudSyncDebounceTimer = setTimeout(() => {
            if (typeof window.syncLiveScoreboard === 'function') window.syncLiveScoreboard(true);
        }, delayMs);
    }

    function applyCloudProfileToLocal(cloudEntry, mergeWithLocal = false) {
        if (!cloudEntry) return;

        if (Array.isArray(cloudEntry.bookmarks)) {
            bookmarkIds = mergeWithLocal ? Array.from(new Set([...bookmarkIds, ...cloudEntry.bookmarks])) : [...cloudEntry.bookmarks];
            localStorage.setItem('med26_f2_bookmarks', JSON.stringify(bookmarkIds));
        }
        if (cloudEntry.notes && typeof cloudEntry.notes === 'object') {
            personalNotes = mergeWithLocal ? { ...cloudEntry.notes, ...personalNotes } : { ...cloudEntry.notes };
            localStorage.setItem('med26_f2_notes', JSON.stringify(personalNotes));
        }
        if (cloudEntry.checklist && typeof cloudEntry.checklist === 'object') {
            const localCl = typeof getChecklistData === 'function' ? getChecklistData() : {};
            const finalCl = mergeWithLocal ? { ...cloudEntry.checklist, ...localCl } : { ...cloudEntry.checklist };
            localStorage.setItem('med26_f2_lab_checklist', JSON.stringify(finalCl));
        }
        if (Array.isArray(cloudEntry.mastered)) {
            masteredIds = mergeWithLocal ? Array.from(new Set([...masteredIds, ...cloudEntry.mastered])) : [...cloudEntry.mastered];
            localStorage.setItem('med26_f2_mastered', JSON.stringify(masteredIds));
        }
        if (Array.isArray(cloudEntry.mistakes)) {
            mistakeIds = mergeWithLocal ? Array.from(new Set([...mistakeIds, ...cloudEntry.mistakes])).filter(id => !masteredIds.includes(id)) : [...cloudEntry.mistakes];
            localStorage.setItem('med26_f2_mistakes', JSON.stringify(mistakeIds));
        }
        if (cloudEntry.lastSession && typeof cloudEntry.lastSession === 'object') {
            const localLast = JSON.parse(localStorage.getItem('med26_last_session') || 'null');
            if (!localLast || (cloudEntry.lastSession.savedAt || 0) > (localLast.savedAt || 0)) {
                localStorage.setItem('med26_last_session', JSON.stringify(cloudEntry.lastSession));
            }
        }
        if (cloudEntry.profileUpdatedAt) {
            localStorage.setItem('med26_profile_updated_at', String(cloudEntry.profileUpdatedAt));
        }

        if (typeof updateStatsUI === 'function') updateStatsUI();
        if (typeof updateChecklistProgressUI === 'function') updateChecklistProgressUI();
        if (typeof updateSubjectCardsLabColors === 'function') updateSubjectCardsLabColors();
        if (typeof updateContinueSessionBtnUI === 'function') updateContinueSessionBtnUI();

        if (!document.getElementById('view-trainer')?.classList.contains('hidden') && currentList[currentIndex]) {
            const currQ = currentList[currentIndex];
            if (typeof updateBookmarkBtnUI === 'function') updateBookmarkBtnUI(currQ.id);
            const noteArea = document.getElementById('station-personal-note');
            if (noteArea && document.activeElement !== noteArea) noteArea.value = personalNotes[currQ.id] || '';
        }
        if (!document.getElementById('view-atlas')?.classList.contains('hidden') && typeof renderAtlasGrid === 'function') {
            renderAtlasGrid();
        }
    }

    function updateCloudBadgeStatus(isSynced) {
        const topBadge = document.getElementById('top-user-badge');
        if (!topBadge) return;
        let syncDot = document.getElementById('cloud-sync-dot');
        if (!syncDot) {
            syncDot = document.createElement('span');
            syncDot.id = 'cloud-sync-dot';
            syncDot.className = 'text-[10px] text-emerald-400 font-black';
            syncDot.title = 'حسابك متزامن سحابياً (المفضلة والملاحظات والـ Checklist)';
            topBadge.appendChild(syncDot);
        }
        syncDot.innerText = isSynced ? '☁️✓' : '☁️';
    }

    window.syncLiveScoreboard = async function(isNewLocalAction = false) {
        let username = (localStorage.getItem('med26_username') || '').trim();
        const myToken = getMyDeviceToken();
        const mySolved = getTotalSolvedCount();
        const myBestTime = parseInt(localStorage.getItem('med26_best_sim_time') || '0', 10);
        const myBestStreak = Math.max(parseInt(localStorage.getItem('med26_best_streak') || '0', 10), currentStreak);
        const myWins = parseInt(localStorage.getItem('med26_challenge_wins') || '0', 10);
        const localProfileStamp = parseInt(localStorage.getItem('med26_profile_updated_at') || '0', 10);

        let dbData = {};
        try {
            const res = await fetch(`${FIREBASE_BASE_URL}/scores.json?t=${Date.now()}`, { cache: 'no-store' });
            if (res.ok) dbData = (await res.json()) || {};
        } catch (e) { return; }

        if (username) {
            const safeKey = username.toLowerCase().replace(/[.#$\[\]\/]/g, '_');
            const existing = dbData[safeKey];

            if (existing && existing.token && existing.token !== myToken) {
                username = `${username}_${myToken.slice(0, 2)}`;
                localStorage.setItem('med26_username', username);
                const topTxt = document.getElementById('top-username-text');
                if (topTxt) topTxt.innerText = username;
                return window.syncLiveScoreboard(isNewLocalAction);
            }

            const hasLocalPersonalData =
                bookmarkIds.length > 0 ||
                Object.keys(personalNotes).length > 0 ||
                Object.keys(typeof getChecklistData === 'function' ? getChecklistData() : {}).length > 0 ||
                masteredIds.length > 0;

            if (existing && !isNewLocalAction) {
                if (existing.name && existing.name !== username) {
                    localStorage.setItem('med26_username', existing.name);
                    const topTxt = document.getElementById('top-username-text');
                    if (topTxt) topTxt.innerText = existing.name;
                }
                if (typeof existing.solved === 'number') localStorage.setItem('med26_total_solved_count', String(existing.solved));
                if (typeof existing.bestStreak === 'number') localStorage.setItem('med26_best_streak', String(existing.bestStreak));
                if (typeof existing.bestTime === 'number') localStorage.setItem('med26_best_sim_time', String(existing.bestTime));
                if (typeof existing.wins === 'number') localStorage.setItem('med26_challenge_wins', String(existing.wins));

                const cloudStamp = existing.profileUpdatedAt || 0;
                if (cloudStamp > localProfileStamp) {
                    applyCloudProfileToLocal(existing, localProfileStamp === 0);
                } else if (cloudStamp === 0 && hasLocalPersonalData) {
                    return window.syncLiveScoreboard(true);
                }
                globalLivePlayers = Object.values(dbData);
                updateCloudBadgeStatus(true);
                return;
            }

            if (isNewLocalAction || (!existing && hasLocalPersonalData)) {
                const prev = existing || {};
                const currentChecklist = typeof getChecklistData === 'function' ? getChecklistData() : {};
                const lastSess = JSON.parse(localStorage.getItem('med26_last_session') || 'null');

                const updatedEntry = {
                    name: prev.name || username,
                    token: prev.token || myToken,
                    solved: Math.max(prev.solved || 0, mySolved),
                    bestStreak: Math.max(prev.bestStreak || 0, myBestStreak),
                    wins: Math.max(prev.wins || 0, myWins),
                    bestTime: (prev.bestTime > 0 && myBestTime > 0) ? Math.min(prev.bestTime, myBestTime) : (prev.bestTime || myBestTime || 0),
                    bookmarks: Array.isArray(bookmarkIds) ? bookmarkIds : [],
                    notes: personalNotes || {},
                    checklist: currentChecklist || {},
                    mastered: Array.isArray(masteredIds) ? masteredIds : [],
                    mistakes: Array.isArray(mistakeIds) ? mistakeIds : [],
                    lastSession: lastSess,
                    profileUpdatedAt: Date.now(),
                    updatedAt: Date.now()
                };

                localStorage.setItem('med26_profile_updated_at', String(updatedEntry.profileUpdatedAt));
                dbData[safeKey] = updatedEntry;

                if (updatedEntry.solved > 0 || updatedEntry.bestTime > 0 || updatedEntry.bestStreak > 0 || updatedEntry.wins > 0 || hasLocalPersonalData) {
                    try {
                        await fetch(`${FIREBASE_BASE_URL}/scores/${encodeURIComponent(safeKey)}.json`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedEntry)
                        });
                        updateCloudBadgeStatus(true);
                    } catch (e) {}
                }
            }
        }
        globalLivePlayers = Object.values(dbData);
    };

    window.changeUsernamePrompt = async function() {
        const currName = (localStorage.getItem('med26_username') || '').trim();
        const myToken = getMyDeviceToken();

        const newNameInput = prompt(
            `👤 اسمك الحالي: ${currName || 'غير محدد'}
🔑 كود ملكية ومزامنة حسابك (أدخله في الآيباد أو البيسي لنقل المفضلة والملاحظات والـ Checklist): [ ${myToken} ]

أدخل اسم المستخدم الخاص بك:`,
            currName
        );

        if (!newNameInput || !newNameInput.trim()) return;
        const cleanNewName = newNameInput.trim();
        const newKey = cleanNewName.toLowerCase().replace(/[.#$\[\]\/]/g, '_');
        const oldKey = currName ? currName.toLowerCase().replace(/[.#$\[\]\/]/g, '_') : '';

        try {
            const res = await fetch(`${FIREBASE_BASE_URL}/scores/${encodeURIComponent(newKey)}.json?t=${Date.now()}`, { cache: 'no-store' });
            const existingUser = res.ok ? await res.json() : null;

            if (existingUser && existingUser.token && existingUser.token !== myToken) {
                const enteredPin = prompt(
                    `🔒 الحساب "${cleanNewName}" محمي بكود ملكية!

إذا كان هذا حسابك على جهازك الآخر (البيسي أو الآيباد)، أدخل كود الملكية المكون من 4 أرقام لنقل المفضلة والملاحظات والـ Checklist إلى هذا الجهاز:`
                );
                if (enteredPin && enteredPin.trim() === String(existingUser.token)) {
                    localStorage.setItem('med26_device_token', String(existingUser.token));
                    localStorage.setItem('med26_username', existingUser.name);

                    if (typeof existingUser.solved === 'number') localStorage.setItem('med26_total_solved_count', String(existingUser.solved));
                    if (typeof existingUser.bestStreak === 'number') localStorage.setItem('med26_best_streak', String(existingUser.bestStreak));
                    if (typeof existingUser.bestTime === 'number') localStorage.setItem('med26_best_sim_time', String(existingUser.bestTime));
                    if (typeof existingUser.wins === 'number') localStorage.setItem('med26_challenge_wins', String(existingUser.wins));

                    applyCloudProfileToLocal(existingUser, true);
                    await window.syncLiveScoreboard(true);
                    if (typeof renderScoreboardLists === 'function') renderScoreboardLists();

                    alert(
                        `✅ تم ربط جهازك بحسابك "${existingUser.name}" ومزامنة بياناتك بنجاح!

` +
                        `⭐ المفضلة: ${bookmarkIds.length} محطة
` +
                        `📝 الملاحظات الشخصية: ${Object.keys(personalNotes || {}).length} ملاحظة
` +
                        `📋 جدول اللابات: ${Object.keys(typeof getChecklistData === 'function' ? getChecklistData() : {}).length} لاب محفوظ
` +
                        `🏆 المحطات المحلولة: ${getTotalSolvedCount()} محطة`
                    );
                    return;
                } else {
                    alert('❌ الكود غير صحيح! لا يمكنك استخدام هذا الاسم لأنه محجوز لطالب آخر في الدفعة.');
                    return;
                }
            }

            if (oldKey && oldKey !== newKey) {
                const oldRes = await fetch(`${FIREBASE_BASE_URL}/scores/${encodeURIComponent(oldKey)}.json?t=${Date.now()}`, { cache: 'no-store' });
                const oldData = oldRes.ok ? await oldRes.json() : null;
                if (oldData && (!oldData.token || oldData.token === myToken)) {
                    await fetch(`${FIREBASE_BASE_URL}/scores/${encodeURIComponent(oldKey)}.json`, { method: 'DELETE' });
                }
            }

            localStorage.setItem('med26_username', cleanNewName);
            if (existingUser && existingUser.token === myToken) applyCloudProfileToLocal(existingUser, true);
            await window.syncLiveScoreboard(true);
            if (typeof renderScoreboardLists === 'function') renderScoreboardLists();
            alert(`✅ تم حفظ ومزامنة حسابك باسم "${cleanNewName}" بنجاح!
🔑 كود الملكية والمزامنة لأجهزتك الأخرى هو: [ ${localStorage.getItem('med26_device_token')} ]`);
        } catch (e) {
            alert('تأكد من اتصالك بالإنترنت لإتمام المزامنة السحابية.');
        }
    };

    window.forceManualCloudSync = async function() {
        await window.syncLiveScoreboard(false);
        await window.syncLiveScoreboard(true);
        const myToken = getMyDeviceToken();
        const user = localStorage.getItem('med26_username') || 'طالب MED26';
        alert(
            `☁️ تمت المزامنة السحابية لحسابك (${user}) بنجاح!
` +
            `🔑 كود الربط مع الآيباد/البيسي: [ ${myToken} ]

` +
            `• المفضلة المحفوظة: ${bookmarkIds.length} محطة ⭐
` +
            `• الملاحظات الشخصية: ${Object.keys(personalNotes || {}).length} ملاحظة 📝
` +
            `• المحطات المتقنة: ${masteredIds.length} محطة ✅`
        );
    };

    // 4. ربط أزرار المفضلة والملاحظات والـ Checklist بالمزامنة الفورية
    const origToggleBookmark = window.toggleBookmarkCurrent;
    if (typeof origToggleBookmark === 'function') {
        window.toggleBookmarkCurrent = function(...args) {
            const res = origToggleBookmark.apply(this, args);
            scheduleCloudProfilePush(150);
            return res;
        };
    }

    const origSaveNote = window.savePersonalNote;
    if (typeof origSaveNote === 'function') {
        window.savePersonalNote = function(...args) {
            const res = origSaveNote.apply(this, args);
            scheduleCloudProfilePush(700);
            return res;
        };
    }

    const origSaveChecklist = window.saveChecklistItem;
    if (typeof origSaveChecklist === 'function') {
        window.saveChecklistItem = function(labId, field, value, evt) {
            const res = origSaveChecklist.apply(this, [labId, field, value, evt]);
            scheduleCloudProfilePush(field === 'notes' ? 700 : 150);
            return res;
        };
    }

    const origMarkQ = window.markQuestion;
    if (typeof origMarkQ === 'function') {
        window.markQuestion = function(...args) {
            const res = origMarkQ.apply(this, args);
            scheduleCloudProfilePush(250);
            return res;
        };
    }

    setTimeout(() => {
        const menu = document.getElementById('my-tools-menu');
        if (menu && !document.getElementById('tools-cloud-sync-btn')) {
            const btn = document.createElement('button');
            btn.id = 'tools-cloud-sync-btn';
            btn.type = 'button';
            btn.onclick = () => { menu.classList.add('hidden'); window.forceManualCloudSync(); };
            btn.className = 'w-full text-right px-3 py-2 rounded-xl text-xs font-extrabold hover:bg-[var(--bg-secondary)] flex items-center justify-between text-sky-300';
            btn.innerHTML = '<span>☁️ مزامنة المفضلة والملاحظات الآن</span><span>🔄</span>';
            menu.insertBefore(btn, menu.firstChild);
        }
        window.syncLiveScoreboard(false);
    }, 600);

    window.addEventListener('focus', () => window.syncLiveScoreboard(false));
});
// ================= الترقية الشاملة V6 للمناضل: الشرح المخصص بالـ ID (107 محطة) + Viva Follow-up + Cloudflare Worker AI =================

// 1. ضع رابط Cloudflare Worker المجاني الخاص بك هنا (وسيعمل المحرك المجاني المدمج تلقائياً حتى تضيف رابطك)
const MED26_CLOUDFLARE_WORKER_URL = '';

// 2. قاعدة المعرفة الدقيقة المخصصة لكل محطة برقم الـ ID + الأسئلة الشفهية المتوقعة (Viva Follow-up)
const stationKnowledgeById = {
    // -------- MICROBIOLOGY: Gram-positive (101 - 109) --------
    101: {
        visual: "الصورة المجهرية تُظهر مكورات بنفسجية (Gram-positive cocci) مصطفة في سلاسل طويلة (Chains) مع قصة التهاب لوزتين صديدي.",
        explain: "التهاب اللوزتين الصديدي (Tonsillitis with exudate) في طفل مع ظهور Gram-positive cocci in chains يشير قطعياً إلى بكتيريا Streptococcus pyogenes (Group A Streptococcus).",
        diff: "لا تخلط بينها وبين S. aureus التي تظهر كعناقيد عنب (Clusters) وتكون Catalase-positive، بينما S. pyogenes تصطف في سلاسل (Chains) وتكون Catalase-negative.",
        mnemonic: "Strep pyogenes = Strep (شريط/سلاسل Chains) + Pyogenes (صديد Exudate في اللوزتين).",
        vivaQ: "ماذا لو سألك الدكتور على نفس هذه العينة: ما نوع تحلل الدم (Hemolysis) الذي تسببه هذه البكتيريا على Blood Agar؟ وأي مضاد حيوي نستخدمه في المختبر للتفريق حساسيةً لها؟",
        vivaA: "تسبب تحللاً كاملاً للدم (<span class='kw-highlight'>Beta-hemolysis</span>)، وتكون حساسة لقرص <span class='kw-highlight'>Bacitracin (Sensitive)</span>."
    },
    102: {
        visual: "سؤال سريري مباشر بدون شريحة (NO SAMPLE) يصف لوزتين متضخمتين حمراوين مغطاتين بإفرازات صديدية (Exudate).",
        explain: "السبب البكتيري الأول لالتهاب البلعوم واللوزتين الصديدي الحاد هو Streptococcus pyogenes، وتظهر في صبغة جرام كمكورات موجبة الجرام في سلاسل.",
        vivaQ: "ما هو الاختبار الإنزيمي السريع الذي يفرق جنس Streptococcus عن جنس Staphylococcus؟",
        vivaA: "اختبار <span class='kw-highlight'>Catalase test</span> (يكون سلبياً في Streptococcus وإيجابياً في Staphylococcus)."
    },
    103: {
        visual: "الصورة تعرض طبق أجار مقسوم نصفين: نصف تحول إلى اللون الأصفر الذهبي ونصف بقي وردياً/أحمر.",
        explain: "هذا الوسط هو Mannitol Salt Agar (MSA) الذي يحتوي على تركيز ملح عالٍ (7.5% NaCl). بكتيريا S. aureus تخمر سكر المانيتول وتنتج حمضاً يحول كاشف Phenol red إلى اللون الأصفر (Yellow).",
        vivaQ: "ماذا لو سألك الدكتور: ما اسم البكتيريا في النصف الآخر من الطبق التي نمت دون أن تغير لون الوسط للأصفر؟ وما اسم الكاشف اللوني في هذا الطبق؟",
        vivaA: "البكتيريا غير المخمرة للمانيتول (اللون الوردي) هي <span class='kw-highlight'>Staphylococcus epidermidis</span>، والكاشف اللوني هو <span class='kw-highlight'>Phenol red</span>."
    },
    104: {
        visual: "طبق Mannitol Salt Agar (MSA) تظهر فيه مستعمرات صفراء واضحة محاطة بهالة صفراء.",
        explain: "اللون الأصفر (Yellow colony) على وسط MSA هو العلامة التشخيصية الفارقة لبكتيريا Staphylococcus aureus بسبب قدرتها على تخمير سكر المانيتول.",
        vivaQ: "ما هو الاختبار التأكيدي الأهم لتفريق S. aureus عن بقية المكورات العنقودية (CoNS) في المختبر؟",
        vivaA: "اختبار التجلط <span class='kw-highlight'>Coagulase test (+ve in S. aureus)</span>."
    },
    105: {
        visual: "صورة سريرية لفحص الفم والبلعوم تُظهر تضخماً واحمراراً شديداً في اللوزتين مع نقط صديدية بيضاء (Follicular tonsillitis).",
        explain: "حالة التهاب اللوزتين البكتيري الكلاسيكية يسببها Streptococcus pyogenes.",
        vivaQ: "ما هي المضاعفات المناعية المتأخرة (Post-streptococcal sequelae) إذا لم يُعالج هذا المريض بالمضاد الحيوي؟",
        vivaA: "الحمى الروماتيزمية (<span class='kw-highlight'>Rheumatic fever</span>) والتهاب كبيبات الكلى الحاد (<span class='kw-highlight'>Post-streptococcal glomerulonephritis</span>)."
    },
    106: {
        visual: "صورة مجهرية لمسحة مباشرة تُظهر كريات دم بيضاء صديدية (Pus cells) مع مكورات موجبة الجرام متجمعة في عناقيد (Cocci in clusters).",
        explain: "وجود خلايا صديدية في الخلفية يعني أنها مسحة مباشرة من العينة (Direct smear) وليست من مزرعة نقية، وتجمع المكورات كعناقيد العنب يميز Staphylococcus aureus.",
        vivaQ: "كيف عرفت من الصورة أنها Direct smear وليست Culture smear؟",
        vivaA: "بسبب وجود خلايا التهابية صديدية (<span class='kw-highlight'>Pus cells / Neutrophils</span>) في خلفية الشريحة."
    },
    107: {
        visual: "صورة سريرية لالتهاب لوزتين جريبي حاد (Acute follicular tonsillitis) مغطى بصديد أبيض.",
        explain: "البكتيريا المسببة هي Streptococcus pyogenes وعند زراعتها على Blood agar تعطي تحللاً كاملاً وشفافاً حول المستعمرات يسمى Beta hemolysis.",
        vivaQ: "ما الفرق البصري على طبق Blood Agar بين Alpha و Beta و Gamma hemolysis؟",
        vivaA: "• <span class='kw-highlight'>Beta</span>: منطقة شفافة تماماً (تحلل كامل).<br>• <span class='kw-highlight'>Alpha</span>: لون أخضر (تحلل جزئي مثل S. pneumoniae).<br>• <span class='kw-highlight'>Gamma</span>: لا يوجد تحلل."
    },
    108: {
        visual: "صورة سريرية لخراج جلدي / جمرة (Skin carbuncle/abscess) ملتهب وممتلئ بالصديد.",
        explain: "السبب الأشهر لخراجات الجلد والدمامل هو Staphylococcus aureus (أو S. pyogenes)، وكلاهما يظهر تحللاً من نوع Beta hemolysis على طبق أجار الدم.",
        vivaQ: "ما هو الإنزيم الذي تفرزه S. aureus ويحول الفايبرينوجين إلى فايبرين لتكوين جدار حول الخراج؟",
        vivaA: "إنزيم <span class='kw-highlight'>Coagulase</span>."
    },
    109: {
        visual: "طبق أجار دم يظهر فيه خط زراعة عمودي وخط أفقي، وعند التقائهما داخل الدائرة (A) تَشكّل تحلل دموي يشبه رأس السهم (Arrow-head hemolysis).",
        explain: "هذا هو اختبار CAMP test الإيجابي، والبكتيريا التي تعطي شكل رأس السهم هي Streptococcus agalactiae (Group B Streptococcus).",
        vivaQ: "ما اسم البكتيريا المزروعة في الخط العمودي الطويل التي تتفاعل معها S. agalactiae لإظهار رأس السهم؟",
        vivaA: "بكتيريا <span class='kw-highlight'>Staphylococcus aureus</span> المنتجة لسم Beta-lysin."
    },

    // -------- MICROBIOLOGY: Gram-negative (110 - 119) --------
    110: {
        visual: "أنابيب تفاعلات IMViC تُظهر: Indole سلبي (بدون حلقة حمراء)، و Methyl Red سلبي (أصفر)، و VP إيجابي (أحمر).",
        explain: "النمط البيوكيميائي (Indole -, MR -, VP +, Citrate +) هو النمط الكلاسيكي لبكتيريا Klebsiella pneumoniae (وهي على عكس E. coli تماماً).",
        vivaQ: "كيف يبدو شكل مستعمرات Klebsiella pneumoniae على طبق MacConkey agar؟ ولماذا؟",
        vivaA: "مستعمرات وردية كبيرة ومخاطية جداً (<span class='kw-highlight'>Large mucoid pink colonies</span>) لأنها تخمر اللاكتوز وتمتلك كبسولة عديدة التسكر كبيرة (Polysaccharide capsule)."
    },
    111: {
        visual: "طبق MacConkey agar بمستعمرات وردية داكنة جافة (Lactose fermenter) مع نتائج IMViC: Indole +ve, MR +ve, VP -ve, Citrate -ve.",
        explain: "بكتيريا Escherichia coli (E. coli) تخمر اللاكتوز وتعطي إيجابية في أول اختبارين من IMViC (Indole +, Methyl Red +) وسلبية في الآخرين.",
        vivaQ: "ماذا لو زرعنا E. coli على وسط Eosin Methylene Blue (EMB) agar، كيف سيظهر لون مستعمراتها؟",
        vivaA: "ستعطي مستعمرات ذات لمعة معدنية خضراء مميزة (<span class='kw-highlight'>Green metallic sheen</span>)."
    },
    112: {
        visual: "أنبوبان للاختبار: أحدهما تحول إلى اللون الوردي الفاقع (Bright pink/magenta) والآخر بقي أصفر برتقالياً.",
        explain: "هذا هو اختبار اليورياز (Urease test). البكتيريا التي تفرز إنزيم اليورياز بكثافة وتحول الوسط للوردي الفاقع هي Proteus mirabilis.",
        vivaQ: "ما هي الظاهرة المميزة التي تحدثها Proteus mirabilis عند زراعتها على طبق Blood Agar؟",
        vivaA: "ظاهرة الزحف والانتشار الموجي (<span class='kw-highlight'>Swarming motility</span>) بسبب سياطها الكثيرة."
    },
    113: {
        visual: "أنبوبان مائلان (Slants) لوسط Simmons Citrate: أنبوب أخضر (سلبي) وأنبوب تحول إلى اللون الأزرق الملكي (Blue = إيجابي).",
        explain: "تحول لون وسط Simmons citrate من الأخضر إلى الأزرق يدل على استهلاك السترات كربونياً ورفع قلوية الوسط، وأشهر مثال إيجابي هو Klebsiella pneumoniae.",
        vivaQ: "ما اسم الكاشف اللوني (pH indicator) الموجود داخل أنبوب Citrate test والذي يتحول من الأخضر إلى الأزرق؟",
        vivaA: "كاشف <span class='kw-highlight'>Bromothymol blue</span>."
    },
    114: {
        visual: "أنبوبان لوسط TSI (Triple Sugar Iron): الأنبوب A أصفر بالكامل في السطح والقاع، والأنبوب B أحمر السطح وأصفر القاع مع ترسب أسود كثيف.",
        explain: "الأنبوب A يمثل تفاعل A/A (Acid slant / Acid butt) لتخمر اللاكتوز والسكروز والجلوكوز. الأنبوب B يمثل K/A + H2S (سطح قلوي أحمر وقاع حمضي مع اسوداد غاز كبريتيد الهيدروجين H2S كما في Salmonella و Proteus).",
        vivaQ: "كيف نفرق في أنبوب TSI بين وجود الغاز العادي (Gas) ووجود غاز كبريتيد الهيدروجين (H2S)؟",
        vivaA: "الغاز العادي يظهر كفقاعات أو تشققات ورفع للأجار في القاع، بينما <span class='kw-highlight'>H2S</span> يظهر كراسب أسود (<span class='kw-highlight'>Blackening</span>) لتفاعله مع أملاح الحديد."
    },
    115: {
        visual: "شريط API 20E البلاستيكي المحتوي على 20 حُجيرة (Cupules) صغيرة ملونة للتفاعلات البيوكيميائية السريعة.",
        explain: "يُستخدم نظام API 20E للتعرف السريع على بكتيريا العائلة المعوية (Enterobacteriaceae)، والنتيجة المعروضة هنا تطابق Klebsiella.",
        vivaQ: "ماذا تعني حروف API 20E؟ ولأي مجموعة بكتيرية يُستخدم هذا الشريط؟",
        vivaA: "يُستخدم لتشخيص عصيات الجرام السالبة المعوية (<span class='kw-highlight'>Enterobacteriaceae / Gram-negative rods</span>) عبر 20 تفاعلاً بيوكيميائياً مصغراً."
    },
    116: {
        visual: "طبق أجار يظهر فيه نمو بكتيري يفرز صبغة خضراء مزرقة منتشرة في الوسط (Greenish-blue diffusible pigment).",
        explain: "البكتيريا الوحيدة الشهيرة بإفراز الصبغة الخضراء المزرقة (Pyocyanin و Pyoverdine) ذات الرائحة العطرية الشبيهة بالعنب هي Pseudomonas aeruginosa.",
        vivaQ: "ما هي نتيجة اختبار الأوكسيداز (Oxidase test) وتخمر اللاكتوز في بكتيريا Pseudomonas aeruginosa؟",
        vivaA: "تكون <span class='kw-highlight'>Oxidase positive (+ve)</span> وغير مخمرة للاكتوز (<span class='kw-highlight'>Non-lactose fermenter</span>)."
    },
    117: {
        visual: "أنبوب مائل ذو لون وردي فاقع (Bright pink slant) يمثل إيجابية اختبار اليورياز.",
        explain: "البكتيريا المنتجة لإنزيم Urease بقوة من بين الخيارات هي Proteus (بينما E. coli و Salmonella سلبيتان).",
        vivaQ: "إلى ماذا يحلل إنزيم Urease مادة اليوريا ليرفع درجة الـ pH ويحول اللون للوردي؟",
        vivaA: "يحلل اليوريا إلى أمونيا (<span class='kw-highlight'>Ammonia - NH3</span>) وثاني أكسيد الكربون، والأمونيا قلوية فتحول الكاشف للوردي."
    },
    118: {
        visual: "أنبوبان: أنبوب Indole سلبي (حلقة صفراء) بجانب أنبوب Citrate إيجابي (أزرق اللون).",
        explain: "الجمع بين Indole سلبي و Citrate إيجابي أزرق يميز بكتيريا Klebsiella عن E. coli.",
        vivaQ: "ما اسم الكاشف (Reagent) الذي نضيف قطرات منه على سطح أنبوب البيبتون للكشف عن إنتاج الـ Indole؟",
        vivaA: "كاشف كوفاكس (<span class='kw-highlight'>Kovac's reagent</span>)."
    },
    119: {
        visual: "صورة مقربة لأنابيب Simmons Citrate المائلة بلونيها الأخضر والأزرق.",
        explain: "هذا هو اختبار Citrate utilization test للكشف عن قدرة البكتيريا على استخدام السترات كمصدر وحيد للكربون.",
        vivaQ: "اذكر بكتيريا سالبة الجرام تعطي نتيجة إيجابية (أزرق) وأخرى تعطي نتيجة سلبية (أخضر) في هذا الاختبار؟",
        vivaA: "• إيجابي (أزرق): <span class='kw-highlight'>Klebsiella pneumoniae</span>.<br>• سلبي (أخضر): <span class='kw-highlight'>Escherichia coli</span>."
    },

    // -------- MICROBIOLOGY: Antibiotic Susceptibility (120 - 125) --------
    120: {
        visual: "طبق بتري مزروع ببكتيريا وموزع عليه أقراص ورقية للمضادات الحيوية، ويظهر السهم C مشيراً إلى الدائرة الشفافة الخالية من النمو حول القرص.",
        explain: "الطريقة هي طريقة انتشار القرص (Kirby-Bauer Disc diffusion method)، والمنطقة C الشفافة هي منطقة تثبيط النمو (Zone of inhibition).",
        vivaQ: "ماذا لو سألك الدكتور: كلما زاد قطر الدائرة الشفافة (Zone C)، هل تصبح البكتيريا أكثر حساسية أم أكثر مقاومة للمضاد؟",
        vivaA: "تصبح البكتيريا أكثر حساسية (<span class='kw-highlight'>More Susceptible / Sensitive</span>) للمضاد الحيوي."
    },
    121: {
        visual: "طبق حساسية المضادات الحيوية مع الإشارة للحرف C حول قرص المضاد.",
        explain: "الطريقة هي Diffusion method والمنطقة C هي Zone of inhibition.",
        vivaQ: "كم عدد الأقراص القصوى التي يُنصح بوضعها في طبق 100mm القياسي لمنع تداخل مناطق التثبيط؟",
        vivaA: "عادةً من <span class='kw-highlight'>5 إلى 6 أقراص</span> كحد أقصى في الطبق العادي."
    },
    122: {
        visual: "طبق أجار شفاف مائل للصفرة الفاتحة مع أقراص مضادات حيوية ودوائر تثبيط واضحة.",
        explain: "الوسط القياسي المعتمد عالمياً لاختبار حساسية المضادات الحيوية هو Mueller-Hinton Agar (MH Agar).",
        vivaQ: "لماذا نستخدم Mueller-Hinton Agar تحديداً في اختبار الحساسية ولا نستخدم أوساطاً أخرى؟",
        vivaA: "لأنه وسط غير انتقائي يسمح بنمو معظم البكتيريا، ومضبوط السماكة والـ pH، ولا يحتوي على مثبطات تعيق انتشار المضادات الحيوية (مثل السلفوناميد)."
    },
    123: {
        visual: "طبق Mueller-Hinton Agar المزروع بطريقة المسح الشامل (Lawn culture) مع أقراص المضادات.",
        explain: "اسم الأجار هو Mueller-Hinton Agar (MH Agar).",
        vivaQ: "ما هو المعيار القياسي لعكارة المعلق البكتيري (Turbidity standard) الذي نضبطه قبل مسح هذا الطبق؟",
        vivaA: "معيار ماكفرلاند نصف (<span class='kw-highlight'>0.5 McFarland standard</span>)."
    },
    124: {
        visual: "طبق اختبار الحساسية بالأقراص (ميد 2021).",
        explain: "الاسم العلمي للوسط هو Mueller-Hinton Agar، ولكن لعدم وجوده في خيارات سنة 2021 يتم اختيار Disc Diffusion Method.",
        vivaQ: "ما الفرق بين طريقة Kirby-Bauer Disc Diffusion وطريقة شريط E-test؟",
        vivaA: "الأقراص تعطي نتيجة نوعية (S, I, R)، بينما شريط <span class='kw-highlight'>E-test</span> التدريجي يحدد قيمة التركيز المثبط الأدنى (<span class='kw-highlight'>MIC</span>) رقمياً."
    },
    125: {
        visual: "طبق اختبار الحساسية مع وجود خيار Mueller-Hinton agar (MH) ضمن الاختيارات.",
        explain: "الوسط هو Mueller-Hinton agar (MH).",
        vivaQ: "ماذا نضيف إلى Mueller-Hinton agar إذا أردنا اختبار حساسية بكتيريا مدققة النمو مثل Streptococcus pneumoniae؟",
        vivaA: "نضيف إليه 5% دم أغنام منزوع الفايبرين (<span class='kw-highlight'>Mueller-Hinton Blood Agar</span>)."
    },

    // -------- MICROBIOLOGY: Molecular & Viruses (126 - 131) --------
    126: {
        visual: "مخطط يوضح خطوات تحويل الـ RNA الفيروسي إلى cDNA ثم مضاعفته ومنحنى التألق في q-PCR.",
        explain: "فيروس كورونا SARS-CoV-2 هو فيروس RNA، وبما أن إنزيم DNA polymerase في الـ PCR لا يعمل إلا على قوالب DNA، فلابد من استخدام إنزيم Reverse Transcriptase أولاً لتحويل الـ RNA إلى cDNA.",
        vivaQ: "ماذا لو سألك الدكتور: ما معنى قيمة Ct (Cycle threshold) في منحنى الـ q-PCR؟ وهل القيمة المنخفضة للـ Ct تعني كمية فيروس عالية أم منخفضة؟",
        vivaA: "قيمة <span class='kw-highlight'>Ct</span> هي رقم الدورة التي يتجاوز فيها الوميض الفلوري حد الكشف؛ وكلما كانت قيمة Ct <strong>أقل</strong> كان الحمل الفيروسي (<span class='kw-highlight'>Viral load</span>) لدى المريض <strong>أعلى</strong>!"
    },
    127: {
        visual: "منحنى التضاعف الأسي (Amplification curve) الخاص بـ Real-time RT-qPCR.",
        explain: "من أهم تطبيقات الـ qPCR قياس الحمل الفيروسي (Quantification of viral load) ومتابعة استجابة المريض للعلاج، والشرط الأساسي لفيروسات الـ RNA قبل الـ qPCR هو إجراء النسخ العكسي (Reverse transcription).",
        vivaQ: "ما هي المراحل الحرارية الثلاث المتكررة في كل دورة من دورات الـ PCR؟",
        vivaA: "1) فصل السلسلتين (<span class='kw-highlight'>Denaturation ~95°C</span>)<br>2) التصاق البادئات (<span class='kw-highlight'>Annealing ~55°C</span>)<br>3) الاستطالة وبناء الـ DNA (<span class='kw-highlight'>Extension ~72°C</span>)."
    },
    128: {
        visual: "شريحة زجاجية أو سيليكونية عليها مئات النقاط الدائرية الدقيقة المضيئة بألوان فلورية (أخضر وأحمر وأصفر).",
        explain: "هذه تقنية مصفوفة الـ DNA الدقيقة (DNA Microarray) التي تكشف آلاف الجينات أو عدة فيروسات في وقت واحد عبر التهجين المفلور.",
        vivaQ: "على أي مبدأ جزيئي يعتمد ارتباط العينة بالمسابير (Probes) المثبتة على شريحة الـ Microarray؟",
        vivaA: "يعتمد على مبدأ التهجين التكميلي للأحماض النووية (<span class='kw-highlight'>Complementary nucleic acid hybridization</span>)."
    },
    129: {
        visual: "منحنى qPCR لتشخيص فيروس RNA.",
        explain: "الشرط الواجب تنفيذه قبل بدء تفاعل qPCR لفيروسات الـ RNA هو إجراء النسخ العكسي (Conduct reverse transcription).",
        vivaQ: "ما اسم الإنزيم المقاوم للحرارة العالية المستخرج من بكتيريا الينابيع الحارة والمستخدم في جهاز الـ PCR؟",
        vivaA: "إنزيم <span class='kw-highlight'>Taq DNA polymerase</span> (من بكتيريا Thermus aquaticus)."
    },
    130: {
        visual: "صورة مجهرية لخلية عصبية تحتوي داخل السيتوبلازم على جسم دائري/بيضوي مميز مصبوغ باللون الوردي المحمر (Inclusion body).",
        explain: "هذه أجسام نيجري (Negri bodies)، وهي أجسام احتوائية سيتوبلازمية (Intracytoplasmic eosinophilic inclusion bodies) تشخيصية لعدوى فيروس داء الكلب (Rabies virus).",
        vivaQ: "أين تتواجد الأجسام الاحتوائية الخاصة بفيروس الهربس (Herpesvirus / Cowdry type A bodies)؛ في السيتوبلازم أم في النواة؟",
        vivaA: "تتواجد داخل النواة (<span class='kw-highlight'>Intranuclear inclusion bodies</span>)، بينما Negri bodies في السيتوبلازم."
    },
    131: {
        visual: "شريط اختبار Western Blot لفيروس HIV يظهر عليه خطوط داكنة (Bands) تقابل بروتينات الفيروس مثل p24 و gp41 و gp120.",
        explain: "اختبار Western Blot يُستخدم كاختبار تأكيدي (Confirmatory test) لعدوى HIV بعد ظهور نتيجة إيجابية في اختبار المسح الأولي (ELISA).",
        vivaQ: "عن ماذا يكشف اختبار Western Blot تحديداً؛ عن الحمض النووي للفيروس أم عن الأجسام المضادة لبروتينات الفيروس؟",
        vivaA: "يكشف عن وجود الأجسام المضادة (<span class='kw-highlight'>Specific Antibodies</span>) ضد بروتينات محددة لفيروس HIV مفصولة بالرحلان الكهربائي."
    },

    // -------- MICROBIOLOGY: Parasitic Diseases (132 - 143) --------
    132: {
        visual: "عبوة بلاستيكية نظيفة بغطاء محكم وملعقة مدمجة لجمع عينة البراز (Stool container).",
        explain: "يجب جمع البراز في وعاء جاف ونظيف دون اختلاط بالبول أو الماء، وفحصه فوراً (خلال 30 دقيقة في العينات السائلة) للحفاظ على حركة الأطوار النشطة (Preserve trophozoite motility) مثل Entamoeba و Giardia.",
        vivaQ: "لماذا نحذر المريض بشدة من اختلاط عينة البراز بالبول أو الماء عند الفحص المجهري؟",
        vivaA: "لأن البول والماء يقتلان الأطوار النشطة المتغذية (<span class='kw-highlight'>Destroy motile trophozoites</span>) ويغيران الضغط الأسموزي."
    },
    133: {
        visual: "شريحتان زجاجيتان للدم: إحداهما عليها نقطة دم سميكة دائرية (Thick smear) والأخرى مفرودة كطبقة رقيقة (Thin smear).",
        explain: "مسحتا الدم السميكة والرقيقة (Thin and Thick blood films) المصبوغتان بصبغة Giemsa هما المعيار الذهبي لتشخيص طفيليات الدم مثل الملاريا (Malaria / Plasmodium) والفيلاريا (Wuchereria bancrofti) والتريبانوسوما.",
        vivaQ: "ما الفرق الوظيفي بين المسحة السميكة (Thick film) والمسحة الرقيقة (Thin film) في تشخيص الملاريا؟",
        vivaA: "• <span class='kw-highlight'>Thick film</span>: أكثر حساسية للبحث السريع عن وجود الطفيلي (Screening).<br>• <span class='kw-highlight'>Thin film</span>: لتحديد نوع وفصيلة الملاريا (<span class='kw-highlight'>Species identification</span>) لأن كريات الدم لا تتكسر فيها."
    },
    134: {
        visual: "أداة مسحة السيلوفان حول الشرج (NIH swab / Scotch tape swab) الموضوعة داخل أنبوب زجاجي.",
        explain: "تُستخدم مسحة NIH swab لالتقاط بويضات الدودة الدبوسية Enterobius vermicularis (Pinworm) من الثنيات الجلدية حول الشرج في الصباح الباكر قبل الاستحمام.",
        vivaQ: "لماذا لا نعتمد على فحص البراز العادي لتشخيص دودة Enterobius vermicularis ونلجأ لمسحة حول الشرج؟",
        vivaA: "لأن أنثى الدودة الدبوسية تهاجر ليلاً وتضع بويضاتها خارج المستقيم على الجلد حول الشرج (<span class='kw-highlight'>Perianal skin</span>) وليس داخل البراز."
    },
    135: {
        visual: "صورة مجهرية لبويضة بنية ذهبية دائرية/بيضوية محاطة بجدار خارجي سميك ومتموج (Mammillated / corticated shell).",
        explain: "هذه البويضة المخصبة ذات الجدار المتموج السميك هي بويضة دودة الإسكارس (Ascaris lumbricoides)، وأفضل عينة للكشف عنها هي عينة البراز (Stool sample).",
        vivaQ: "ما هو الطور المعدي (Infective stage) لدودة Ascaris lumbricoides عند ابتلاع الطعام أو الماء الملوث؟",
        vivaA: "البويضة الناضجة المحتوية على يرقة (<span class='kw-highlight'>Embryonated egg</span>)."
    },
    136: {
        visual: "صورة مجهرية لبويضة كبيرة بيضوية شفافة تمتلك شوكة طرفية حادة وواضحة في أحد قطبيها (Terminal spine).",
        explain: "الشوكة الطرفية (Terminal spine) هي البصمة المميزة لبويضة بلهارسيا المجاري البولية (Schistosoma haematobium)، ولذلك العينة التشخيصية هي عينة البول (Urine sample).",
        vivaQ: "ماذا لو كانت الشوكة جانبية (Lateral spine) بدلاً من طرفية؛ ما اسم البلهارسيا حينها وما هي العينة المطلوبة؟",
        vivaA: "الشوكة الجانبية (<span class='kw-highlight'>Lateral spine</span>) تميز <span class='kw-highlight'>Schistosoma mansoni</span> وعينتها هي البراز (<span class='kw-highlight'>Stool sample</span>)."
    },
    137: {
        visual: "صورة مجهرية لبويضة شفافة غير متماثلة، مسطحة من جانب ومحدبة من الجانب الآخر (D-shaped / Plano-convex egg) وبداخلها يرقة مطوية.",
        explain: "البويضة التي تشبه حرف D هي بويضة الدودة الدبوسية Enterobius vermicularis، وأفضل طريقة لتشخيصها هي جمع البويضات بمسحة من منطقة حول الشرج (Perianal swab).",
        vivaQ: "ما هو العرض السريري الأشهر الذي يشتكي منه الطفل المصاب بهذه الدودة ليلاً؟",
        vivaA: "حكة شديدة حول منطقة الشرج ليلاً (<span class='kw-highlight'>Nocturnal pruritus ani / perianal itching</span>)."
    },
    138: {
        visual: "بويضة Schistosoma haematobium ذات الشوكة الطرفية الواضحة (Terminal spine).",
        explain: "تُشخّص بويضة Schistosoma haematobium بفحص راسب عينة البول (Urine sample).",
        vivaQ: "ما هو العرض البولي الكلاسيكي لمرضى Schistosoma haematobium؟",
        vivaA: "بول دموي في نهاية التبول (<span class='kw-highlight'>Terminal hematuria</span>)."
    },
    139: {
        visual: "صورة لتحضير مسحتي الدم الرقيقة والسميكة (Thin and Thick blood smears).",
        explain: "من بين الخيارات الأربعة، الطفيلي الوحيد الذي يعيش في الدم ويُشخص بمسحة الدم هو مايكروفيلاريا Wuchereria bancrofti (بينما البقية طفيليات معوية أو كبدية/رئوية تُشخص بالبراز أو البلغم).",
        vivaQ: "في أي وقت من اليوم يُفضل سحب عينة الدم للكشف عن Wuchereria bancrofti؟ ولماذا؟",
        vivaA: "في منتصف الليل (بين 10 مساءً و 2 صباحاً) بسبب خاصية الدورية الليلية (<span class='kw-highlight'>Nocturnal periodicity</span>) للمايكروفيلاريا."
    },
    140: {
        visual: "صورة مجهرية لطور متغذٍ (Trophozoite) كمثري الشكل يمتلك نواتين في المقدمة وأهداباً/أسواطاً فيبدو كوجه ينظر إليك (Old man with glasses).",
        explain: "هذا هو الطور النشط لطفيلي Giardia lamblia، ولرؤية حركته المتساقطة كأوراق الشجر نستخدم المسحة الرطبة المباشرة للبراز الطازج غير المحفوظ (Direct wet mount for unpreserved stool).",
        vivaQ: "لماذا نضيف قطرة من محلول اليود (Lugol's iodine) عند عمل المسحة الرطبة للبراز؟",
        vivaA: "لصبغ وتوضيح تفاصيل الأنوية داخل الأكياس (<span class='kw-highlight'>Staining nuclei of cysts</span>)، لكنه يقتل الأطوار المتحركة."
    },
    141: {
        visual: "شريط كاسيت الفحص السريع للملاريا (Malaria Rapid Diagnostic Test - RDT).",
        explain: "يمثل هذا الكاسيت طريقة الكشف التشخيصي السريع (Rapid diagnostic detection) التي تعتمد على الكروماتوغرافيا المناعية للكشف عن مستضدات الطفيلي.",
        vivaQ: "ما هي أشهر المستضدات البروتينية لطفيلي الملاريا التي يكشف عنها شريط الفحص السريع (RDT)؟",
        vivaA: "مستضد <span class='kw-highlight'>HRP-2</span> (الخاص بـ P. falciparum) وإنزيم <span class='kw-highlight'>Parasite LDH (pLDH)</span>."
    },
    142: {
        visual: "صورة مجهرية لبويضات Enterobius vermicularis المسطحة من جهة واحدة (D-shaped ova).",
        explain: "أفضل طريقة للتشخيص هي الكشف عن البويضات عبر مسحة حول الشرج (Detecting ova in a perianal swab).",
        vivaQ: "هل تحتاج بويضة Enterobius vermicularis إلى تربة أو عائل وسيط لتصبح معدية، أم أنها معدية فوراً؟",
        vivaA: "تكون معدية خلال ساعات قليلة مباشرة وتسبب العدوى الذاتية (<span class='kw-highlight'>Autoinfection</span>) دون حاجة لعائل وسيط."
    },
    143: {
        visual: "عبوة جمع عينة البراز القياسية ذات الغطاء المزود بملعقة.",
        explain: "اسم العينة هو Stool Sample.",
        vivaQ: "ما هو المحلول الحافظ الأشهر الذي يُستخدم لحفظ عينات البراز إذا تأخر فحصها؟",
        vivaA: "الفورمالين بتركيز 10% (<span class='kw-highlight'>10% Formalin</span>) أو محلول <span class='kw-highlight'>PVA (Polyvinyl alcohol)</span>."
    },

    // -------- PATHOLOGY: Cell Injury & Adaptation (201 - 218) --------
    201: {
        visual: "عينة عيانية (Gross specimen) لكليتين جنباً إلى جنب: إحداهما بحجم وشكل طبيعي، والأخرى منكمشة وصغيرة جداً (Shrunken kidney).",
        explain: "انكماش حجم العضو بعد اكتمال نموه بسبب نقص التروية المزمن أو الانسداد يسمى الضمور الكلوي (Atrophy of the kidney / Renal atrophy).",
        vivaQ: "ماذا لو سألك الدكتور: ما هو السبب المرضي الأشهر لحدوث ضمور في كلية واحدة فقط بينما تبقى الأخرى طبيعية؟",
        vivaA: "تضيق الشريان الكلوي في جهة واحدة (<span class='kw-highlight'>Unilateral renal artery stenosis</span>) بسبب تصلب الشرايين مما يقلل التروية الدموية."
    },
    202: {
        visual: "مقطع نسيجي للرئة يظهر فيه ترسب حبيبات وكتل سوداء كثيفة (Black pigment) داخل الجدران السنخية والبلعميات.",
        explain: "التشخيص هو السحار الكربوني الرئوي (Pulmonary Anthracosis) الناتج عن استنشاق ذرات الكربون والفحم وابتلاعها بواسطة Alveolar macrophages.",
        vivaQ: "هل يُعتبر صباغ الكربون (Carbon) في هذه الشريحة صباغاً داخلي المنشأ (Endogenous) أم خارجي المنشأ (Exogenous)؟",
        vivaA: "هو أشهر مثال على الأصباغ خارجية المنشأ (<span class='kw-highlight'>Exogenous pigment</span>)."
    },
    203: {
        visual: "مقطع نسيجي للبروستات يُظهر ازدحاماً وزيادة كبيرة في عدد الغدد البروستاتية (Prostatic glands) مع توسع كيسي وتكاثر في السدى الليفي العضلي.",
        explain: "زيادة عدد الغدد والخلايا تحت تأثير هرمون DHT يمثل فرط التنسج الحميد للبروستات (Benign Prostatic Hyperplasia - BPH).",
        vivaQ: "كم طبقة من الخلايا الطلائية تبطن الغدد في BPH الحميد مقارنةً بسرطان البروستات الخبيث؟",
        vivaA: "في BPH توجد طبقتان (<span class='kw-highlight'>Double layer: inner columnar & outer basal cells</span>)، بينما في السرطان تختفي الطبقة القاعدية."
    },
    204: {
        visual: "صورة عيانية لكليتين إحداهما طبيعية والأخرى ضامرة ومنكمشة بشدة.",
        explain: "آلية التكيف الخلوي هنا هي الضمور (Atrophy of the kidney) نتيجة نقص حجم وعدد الخلايا الكلوية.",
        vivaQ: "ماذا يحدث للكلية الأخرى السليمة لتعويض نقص وظيفة الكلية الضامرة؟",
        vivaA: "يحدث لها تضخم تعويضي (<span class='kw-highlight'>Compensatory hypertrophy and hyperplasia</span>)."
    },
    205: {
        visual: "نسيج رئوي يحتوي على ترسبات صبغية سوداء داكنة (Carbon particles).",
        explain: "التشخيص هو Lung Anthracosis.",
        vivaQ: "أي فئة من الناس يظهر لديها هذا التغير بكثرة؟",
        vivaA: "المدخنون، وسكان المدن المزدحمة، وعمال مناجم الفحم (<span class='kw-highlight'>Coal miners & smokers</span>)."
    },
    206: {
        visual: "شريحة مجهرية لـ BPH تُظهر تجمعات غدد بروستاتية متكاثرة ومتوسعة كيسياً مع ثنيات حليمية داخل اللمعة.",
        explain: "التشخيص هو Benign Prostatic Hyperplasia (BPH).",
        vivaQ: "أي منطقة تشريحية في البروستات ينشأ منها الـ BPH وتضغط على الإحليل؟",
        vivaA: "المنطقة الانتقالية حول الإحليل (<span class='kw-highlight'>Transitional / Periurethral zone</span>)."
    },
    207: {
        visual: "صورة مجهرية لعضلة القلب تُظهر أليافاً عضلية قلبية عريضة ومتضخمة جداً مع أنوية كبيرة داكنة ومستطيلة (Boxcar nuclei).",
        explain: "بما أن خلايا عضلة القلب غير قادرة على الانقسام، فإنها تتكيف مع زيادة العبء (مثل ارتفاع ضغط الدم) بزيادة حجم الخلية والنواة، وهو ما يسمى Myocardial hypertrophy.",
        vivaQ: "ما هو السبب السريري الأشهر لتضخم عضلة البطين الأيسر (Left ventricular hypertrophy)؟",
        vivaA: "ارتفاع ضغط الدم المزمن (<span class='kw-highlight'>Systemic hypertension</span>) أو تضيق الصمام الأبهري (<span class='kw-highlight'>Aortic stenosis</span>)."
    },
    208: {
        visual: "شريحة BPH المجهرية (تكاثر الغدد والسدى العضلي الليفي).",
        explain: "التشخيص هو Benign Prostatic Hyperplasia (BPH).",
        vivaQ: "هل يُعد الـ BPH آفة ما قبل سرطانية تتحول إلى سرطان بروستات؟",
        vivaA: "<span class='kw-highlight'>لا (No)</span>، الـ BPH تكيف حميد تماماً ولا يتحول إلى سرطان."
    },
    209: {
        visual: "مقطع نسيجي لطلائية عنق الرحم (Cervical epithelium) يُظهر فقدان الانتظام والقطبية مع خلايا غير نموذجية وأنوية داكنة كبيرة تمتد من القاعدة حتى السطح.",
        explain: "فقدان التمايز وانتشار الخلايا المختلة في كامل سمك الطلائية مع بقاء الغشاء القاعدي سليماً يسمى عسر التصنع في عنق الرحم (Cervical dysplasia / CIN).",
        vivaQ: "ما هو الفيروس المسبب الرئيسي لعسر التصنع وسرطان عنق الرحم؟ وما أهم سلالاته عالية الخطورة؟",
        vivaA: "فيروس الورم الحليمي البشري (<span class='kw-highlight'>Human Papillomavirus - HPV</span>)، وأخطر سلالاته <span class='kw-highlight'>HPV 16 & 18</span>."
    },
    210: {
        visual: "مقطع نسيجي لعقدة النقرس (Gouty tophus) يُظهر فراغات إبرية باهتة لبلورات ذائبة محاطة بتفاعل التهابي وخلايا عملاقة.",
        explain: "ينتج مرض النقرس (Gout) عن ترسب بلورات أملاح حمض اليوريك (Deposition of uric acid salts / Monosodium urate crystals) في المفاصل والأنسجة الرخوة.",
        vivaQ: "ما هو الشكل المجهري لبلورات النقرس تحت المجهر المستقطب؟",
        vivaA: "بلورات إبرية الشكل سلبية الانكسار المزدوج (<span class='kw-highlight'>Needle-shaped negatively birefringent crystals</span>)."
    },
    211: {
        visual: "شريحة البروستات المتكاثرة الغدد (BPH).",
        explain: "نوع التكيف الخلوي في البروستات هو فرط التنسج (Hyperplasia).",
        vivaQ: "ما هو الهرمون المسؤول مباشرة عن تحفيز هذا الـ Hyperplasia في غدة البروستات؟",
        vivaA: "هرمون ثنائي هيدروتستوستيرون (<span class='kw-highlight'>Dihydrotestosterone - DHT</span>)."
    },
    212: {
        visual: "شريحة طلائية عنق الرحم المختلة الانتظام (Cervical dysplasia).",
        explain: "العملية المرضية الظاهرة هي عسر التصنع (Dysplasia).",
        vivaQ: "ما هو الخط الفاصل الذي إذا اخترقته خلايا الـ Dysplasia تتحول من Carcinoma in situ إلى Invasive carcinoma؟",
        vivaA: "اختراق الغشاء القاعدي (<span class='kw-highlight'>Invasion of the basement membrane</span>)."
    },
    213: {
        visual: "شريحة البروستات (Hyperplasia).",
        explain: "آلية التكيف هي Hyperplasia.",
        vivaQ: "لماذا لا يحدث Hyperplasia في عضلة القلب أو الخلايا العصبية؟",
        vivaA: "لأنها خلايا دائمة غير قادرة على الانقسام الخيطي (<span class='kw-highlight'>Permanent non-dividing cells</span>) فتتكيف بالـ Hypertrophy فقط."
    },
    214: {
        visual: "شريحة عنق الرحم (Dysplasia).",
        explain: "التشخيص هو Dysplasia.",
        vivaQ: "ما اسم مسحة الفحص المبكر التي تؤخذ من عنق الرحم للكشف عن الـ Dysplasia؟",
        vivaA: "مسحة بابانيكولاو (<span class='kw-highlight'>Pap smear</span>)."
    },
    215: {
        visual: "صورة لعقيدتين جلديتين صفراويتي اللون، مع مقطع مجهري يُظهر تجمعات خلايا بلعمية رغوية محملة بالدهون (Foamy macrophages).",
        explain: "العقيدات الصفراء الناتجة عن تراكم الكوليسترول والدهون داخل الخلايا البلعمية في الأدمة تسمى الورم الأصفر (Xanthoma).",
        vivaQ: "لماذا تظهر الخلايا البلعمية في شريحة الـ Xanthoma فارغة ورغوية (Foamy) تحت صبغة H&E العادية؟",
        vivaA: "لأن الدهون والكوليسترول تذوب أثناء تمرير النسيج في الكحول والزيلين (<span class='kw-highlight'>Dissolve during tissue processing</span>)."
    },
    216: {
        visual: "مقطع نسيجي للكلية تُظهر فيه الكبيبات الكلوية (Glomeruli) ترسب مادة وردية متجانسة غير خلوية (Pink amorphous hyaline material) تطمس الشعيرات الكبيبية.",
        explain: "ترسب هذه المادة البروتينية الوردية غير الطبيعية خارج الخلايا في الكبيبات الكلوية يمثل الداء النشواني الكلوي (Renal Amyloidosis / Amyloid).",
        vivaQ: "ما هي الصبغة الخاصة (Special stain) المستخدمة لتأكيد تشخيص الـ Amyloid؟ وما اللون الذي تعطيه تحت الضوء المستقطب؟",
        vivaA: "صبغة أحمر الكونغو (<span class='kw-highlight'>Congo red stain</span>)، وتعطي لوناً أخضر تفاحياً مزدوج الانكسار (<span class='kw-highlight'>Apple-green birefringence</span>)."
    },
    217: {
        visual: "شريحة الكلية ذات الكبيبات المترسب فيها مادة وردية متجانسة (Amyloid).",
        explain: "التشخيص هو Amyloid.",
        vivaQ: "ما هو العرض السريري الكلوي الذي يصاب به مريض Renal Amyloidosis نتيجة تلف الكبيبات؟",
        vivaA: "المتلازمة الكلائية (<span class='kw-highlight'>Nephrotic syndrome</span>) مع زلال بولي شديد (Heavy proteinuria)."
    },
    218: {
        visual: "صورة العقيدات الجلدية الصفراء والخلايا الرغوية (Xanthoma).",
        explain: "التشخيص هو Xanthoma.",
        vivaQ: "أي اضطراب أيضي في الدم يرتبط بظهور الـ Xanthoma؟",
        vivaA: "فرط شحوم وكوليسترول الدم (<span class='kw-highlight'>Hyperlipidemia / Hypercholesterolemia</span>)."
    },

    // -------- PATHOLOGY: Inflammation (219 - 224) --------
    219: {
        visual: "مقطع عرضي في الزائدة الدودية يُظهر تقرح الغشاء المخاطي وارتشاحاً كثيفاً لخلايا الالتهاب الحاد يمتد عبر الطبقة العضلية حتى الدهن المحيط.",
        explain: "التشخيص هو التهاب الزائدة الدودية الحاد الصديدي (Acute suppurative appendicitis) والخلية السائدة فيه هي العدلات (Neutrophils).",
        vivaQ: "ما هو الشرط النسيجي الأساسي لتأكيد تشخيص Acute appendicitis تحت المجهر؟",
        vivaA: "رؤية خلايا الـ <span class='kw-highlight'>Neutrophils</span> مرتشحة داخل الطبقة العضلية لجدار الزائدة (<span class='kw-highlight'>Muscularis propria infiltration</span>)."
    },
    220: {
        visual: "مقطع نسيجي للكبد يُظهر أوراماً حبيبية (Granulomas) وتليفاً حول الوريد البابي يحيط ببويضات البلهارسيا المحتوية على شوكة.",
        explain: "التشخيص هو بلهارسيا الكبد (Liver Schistosomiasis / Hepatic bilharziasis).",
        vivaQ: "ما نوع كريات الدم البيضاء التي تزداد بقوة حول حبيبومات البلهارسيا الطفيلية؟ وما اسم التليف الكبدي الناتج عنها؟",
        vivaA: "تزداد خلايا الحمضات (<span class='kw-highlight'>Eosinophils</span>)، وتسبب تليف غليسون الكلاسيكي (<span class='kw-highlight'>Pipe-stem fibrosis</span>)."
    },
    221: {
        visual: "صورة مكبرة لجدار الزائدة الدودية الملتهب تظهر فيها خلايا ذات أنوية مفصصة (3-5 فصوص).",
        explain: "خلايا الالتهاب الحاد السائدة في التهاب الزائدة الدودية هي العدلات (Neutrophils).",
        vivaQ: "ما هي المضاعفات الخطيرة إذا لم تُستأصل الزائدة الملتهبة؟",
        vivaA: "انفجار الزائدة الدودية (<span class='kw-highlight'>Perforation</span>) والتهاب الصفاق الصديدي (<span class='kw-highlight'>Peritonitis</span>)."
    },
    222: {
        visual: "مقطع في عقدة لمفاوية لمريض درن (Tuberculosis) يُظهر منطقة مركزية وردية عديمة البنية الخلوية محاطة بحبيبوم.",
        explain: "نوع النخر المميز لعدوى الدرن (TB) هو النخر التجبني (Caseous necrosis).",
        vivaQ: "لماذا سُمّي هذا النخر بالنخر التجبني (Caseous necrosis)؟",
        vivaA: "لأن مظهره العياني (Gross appearance) يشبه الجبن الأبيض الجاف المتفتت (<span class='kw-highlight'>Cheese-like appearance</span>)."
    },
    223: {
        visual: "مقطع عرضي للزائدة الدودية الملتهبة (Acute suppurative appendicitis).",
        explain: "التشخيص هو Acute suppurative appendicitis.",
        vivaQ: "ما هو السبب الميكانيكي الأشهر لانسداد لمعة الزائدة الدودية وبدء الالتهاب؟",
        vivaA: "انسداد اللمعة بحصاة برازية (<span class='kw-highlight'>Fecalith</span>) أو تضخم لمفاوي."
    },
    224: {
        visual: "مقطع نسيجي في عقدة لمفاوية يُظهر خليتين عملاقتين كبيرتين تترتب فيهما الأنوية على المحيط بشكل نعل الفرس (Langhans giant cells).",
        explain: "وجود حبيبومات مع خلايا لانغهانس العملاقة (Langhans giant cells) ذات الأنوية المحيطية مع نخر تجبني يشخص مرض الدرن (TB - Tuberculosis).",
        vivaQ: "ما هي الصبغة الخاصة المستخدمة للكشف عن عصيات الدرن (Mycobacterium tuberculosis) داخل النسيج؟",
        vivaA: "صبغة تسيل-نيلسن المقاومة للأحماض (<span class='kw-highlight'>Ziehl-Neelsen / Acid-fast stain</span>)."
    },

    // -------- PATHOLOGY: Hemodynamic Disorders (225 - 230) --------
    225: {
        visual: "عينة عيانية لرئة متضخمة، ثقيلة، صلبة القوام، وذات لون أحمر داكن مائل للبني.",
        explain: "التشخيص هو احتقان الرئة الوريدي المزمن (Lung: Chronic venous congestion) الناتج غالباً عن فشل الجانب الأيسر للقلب.",
        vivaQ: "ما اسم الخلايا البلعمية المحملة بصبغة الهيموسيديرين التي تظهر في رئة مريض الاحتقان الرئوي المزمن؟",
        vivaA: "خلايا فشل القلب (<span class='kw-highlight'>Heart failure cells</span> - Hemosiderin-laden macrophages)."
    },
    226: {
        visual: "صورة عيانية لرئة حمراء متضخمة وصلبة القوام.",
        explain: "الوصف هو Reddish, enlarged, solid lung والتشخيص هو Chronic venous congestion in the lung.",
        vivaQ: "ما هو السبب القلبي المباشر لاحتقان الرئة الوريدي المزمن؟",
        vivaA: "فشل القلب الأيسر (<span class='kw-highlight'>Left-sided heart failure</span>) أو تضيق الصمام الميترالي (<span class='kw-highlight'>Mitral stenosis</span>)."
    },
    227: {
        visual: "سطح مقطعي للكبد يظهر منقطاً بمناطق حمراء داكنة غائرة تتبادل مع مناطق صفراء/بنية باهتة فيشبه مقطع ثمرة جوزة الطيب (Nutmeg liver).",
        explain: "مظهر كبد جوزة الطيب (Nutmeg liver) هو العلامة الكلاسيكية لاحتقان الكبد الوريدي المزمن (Liver: Chronic venous congestion).",
        vivaQ: "ما سبب ظهور المناطق الحمراء الغائرة والمناطق الباهتة في Nutmeg liver؟",
        vivaA: "المناطق الحمراء هي احتقان ونزف حول الوريد المركزي (<span class='kw-highlight'>Centrilobular congestion & necrosis</span>)، والمناطق الباهتة هي خلايا كبدية سليمة أو متدهنة على الأطراف."
    },
    228: {
        visual: "صورة عيانية لمقطع الكبد ذي المظهر المنقط (Nutmeg appearance).",
        explain: "التشخيص هو Chronic venous congestion of the liver.",
        vivaQ: "هل ينتج احتقان الكبد الوريدي المزمن (Nutmeg liver) عن فشل القلب الأيمن أم الأيسر؟",
        vivaA: "ينتج عن فشل الجانب الأيمن للقلب (<span class='kw-highlight'>Right-sided heart failure</span>)."
    },
    229: {
        visual: "مقطع نسيجي لشريان مسدود بكتلة دموية تتكون من طبقات متبادلة من الفايبرين الوردي والصفائح مع كريات الدم الحمراء والبيضاء داخل اللمعة.",
        explain: "التشخيص هو خثرة دموية حديثة داخل الشريان (Recent Thrombus / Recent Thrombosis).",
        vivaQ: "ما اسم الخطوط الطبقية المتبادلة الفاتحة والداكنة التي تميز الخثرة المتكونة أثناء سريان الدم (Antemortem thrombus)؟",
        vivaA: "خطوط زان (<span class='kw-highlight'>Lines of Zahn</span>)."
    },
    230: {
        visual: "صورة سريرية لتورم شديد وصلب في الطرف السفلي (الساق والقدم) مع تغير في سماكة الجلد.",
        explain: "التورم الناتج عن تجمع السوائل اللمفاوية والذي لا يترك حفرة عند الضغط عليه يسمى الوذمة غير الانطباعية الصلبة (Non-pitting edema / Hard edema).",
        vivaQ: "ما هو الطفيلي الذي يسد الأوعية اللمفاوية ويسبب داء الفيل (Elephantiasis / Non-pitting lymphedema)؟",
        vivaA: "طفيلي الفيلاريا (<span class='kw-highlight'>Wuchereria bancrofti</span>)."
    },

    // -------- PATHOLOGY: Neoplasia (231 - 242) --------
    231: {
        visual: "مقطع نسيجي للقولون يُظهر غدداً طلائية خبيثة غير منتظمة ومزدحمة بالخلايا المفرطة الصبغ تخترق طبقة Muscularis mucosae إلى الـ Submucosa.",
        explain: "التشخيص هو السرطان الغدي في القولون (Adenocarcinoma of the colon)، والدليل الحاسم على الخباثة هو غزو واختراق طبقة تحت المخاطية (Submucosa).",
        vivaQ: "لماذا ينشأ في القولون سرطان غدي (Adenocarcinoma) وليس سرطان حرشفي (Squamous cell carcinoma)؟",
        vivaA: "لأن بطانة القولون الأصلية تتكون من طلائية عمودية غدية مفرزة للمخاط (<span class='kw-highlight'>Glandular columnar epithelium</span>)."
    },
    232: {
        visual: "مقطع نسيجي يُظهر فصيصات من خلايا دهنية ناضجة كبيرة تبدو فارغة (لذوبان الدهن) مع أنوية مسطحة مضغوطة على الطرف يفصلها سدى وعائي ليفي رقيق.",
        explain: "التشخيص هو الورم الشحمي الحميد (Lipoma)، وهو أكثر أورام الأنسجة الرخوة الحميدة شيوعاً في البالغين.",
        vivaQ: "ما هو النظير الخبيث (Malignant counterpart) للورم الشحمي (Lipoma)؟",
        vivaA: "الساركوما الشحمية (<span class='kw-highlight'>Liposarcoma</span>)."
    },
    233: {
        visual: "شريحة سرطان القولون الغدي المخترق للـ Submucosa.",
        explain: "التشخيص هو Adenocarcinoma of the colon.",
        vivaQ: "أي عضو هو المكان الأول والأشهر لانتشار (Metastasis) سرطان القولون عبر الدورة البابية؟",
        vivaA: "الكبد (<span class='kw-highlight'>Liver metastasis</span>) عبر الوريد البابي."
    },
    234: {
        visual: "شريحة الورم الشحمي الحميد (Lipoma) بفصيصاته الدهنية الناضجة.",
        explain: "التشخيص هو Lipoma.",
        vivaQ: "كيف يبدو ملمس الـ Lipoma سريرياً تحت الجلد عند فحص المريض؟",
        vivaA: "كتلة لينة، متحركة بسهولة، غير مؤلمة، ومفصصة (<span class='kw-highlight'>Soft, mobile, painless, lobulated mass</span>)."
    },
    235: {
        visual: "مقطع نسيجي للـ Lipoma.",
        explain: "التشخيص هو Lipoma.",
        vivaQ: "لماذا تكون نواة الخلية الدهنية في الـ Lipoma مضغوطة على المحيط (Peripheral compressed nucleus)؟",
        vivaA: "بسبب امتلاء السيتوبلازم بقطرة دهنية كبيرة واحدة تدفع النواة إلى طرف الخلية (<span class='kw-highlight'>Signet-ring like fat cell</span>)."
    },
    236: {
        visual: "شريحة Adenocarcinoma of the colon.",
        explain: "التشخيص هو Adenocarcinoma of the colon.",
        vivaQ: "بماذا ينتصب الشكل العياني لسرطان القولون في الجانب الأيمن مقارنة بالجانب الأيسر؟",
        vivaA: "في القولون الأيمن ينمو ككتلة بوليبية نازفة (<span class='kw-highlight'>Fungating/polypoid mass</span>)، وفي الأيسر ينمو كحلقة تضيق اللمعة (<span class='kw-highlight'>Annular napkin-ring constriction</span>)."
    },
    237: {
        visual: "مقطع قولوني يوضح انتقال المخاطية الطبيعية إلى غدد خبيثة تغزو جدار القولون.",
        explain: "التشخيص هو Adenocarcinoma.",
        vivaQ: "ما هو الواسم الورمي (Tumor marker) الذي يُستخدم في الدم لمتابعة مرضى سرطان القولون؟",
        vivaA: "المستضد السرطاني المضغي (<span class='kw-highlight'>CEA - Carcinoembryonic Antigen</span>)."
    },
    238: {
        visual: "شريحة Adenocarcinoma القولون.",
        explain: "التشخيص هو Adenocarcinoma.",
        vivaQ: "ما نوع البوليب القولوني الأكثر قابلية للتحول إلى Adenocarcinoma؟",
        vivaA: "البوليب الغدي الزغابي (<span class='kw-highlight'>Villous adenoma</span>)."
    },
    239: {
        visual: "عينة عيانية لرحم مقطوع يظهر داخل تجويفه وجداره ورم كروي محدد الحواف ذو سطح مقطعي أبيض رمادي ملتف كالدوامات.",
        explain: "هذا هو الورم العضلي الأملس الحميد في الرحم (Uterine Leiomyoma / Fibroid)، وهو أكثر الأورام الحميدة شيوعاً لدى النساء.",
        vivaQ: "ما هو النظير الخبيث لورم الـ Leiomyoma؟ وما هي خلايا المنشأ؟",
        vivaA: "النظير الخبيث هو <span class='kw-highlight'>Leiomyosarcoma</span>، وينشأ من خلايا العضلات الملساء (<span class='kw-highlight'>Smooth muscle cells of myometrium</span>)."
    },
    240: {
        visual: "مقطع نسيجي من قرحة خبيثة في الجلد يظهر فيه أعشاش من الخلايا الحرشفية الخبيثة تخترق الأدمة وفي مركزها دوائر وردية صفائحية من الكيراتين.",
        explain: "وجود لآلئ الكيراتين (Keratin pearls) الواضحة في مركز أعشاش الورم يدل على أن خلايا سرطان الخلايا الحرشفية متمايزة جيداً (Well-differentiated Squamous Cell Carcinoma).",
        vivaQ: "ما اسم التراكيب الدائرية الوردية المميزة في مركز أعشاش هذا الورم والتي دلت على أنه Well-differentiated؟",
        vivaA: "لآلئ الكيراتين (<span class='kw-highlight'>Keratin pearls / Cell nests</span>)."
    },
    241: {
        visual: "صورة عيانية لورم الرحم الليفي الحميد (Leiomyoma).",
        explain: "التشخيص هو Leiomyoma.",
        vivaQ: "ماذا يحدث لحجم ورم الـ Leiomyoma بعد سن اليأس (Menopause)؟ ولماذا؟",
        vivaA: "ينكمش ويصغر حجمه (<span class='kw-highlight'>Regresses/shrinks</span>) لأنه ورم يعتمد في نموه على هرمون الإستروجين (<span class='kw-highlight'>Estrogen-dependent</span>)."
    },
    242: {
        visual: "شريحة سرطان القولون الغدي (Adenocarcinoma).",
        explain: "التشخيص هو Adenocarcinoma.",
        vivaQ: "لماذا يسبب سرطان القولون الأيمن فقر دم بعوز الحديد (Iron deficiency anemia) كأول عرض سريري؟",
        vivaA: "بسبب النزف المزمن الخفي المستمر من سطح الورم في البراز (<span class='kw-highlight'>Chronic occult blood loss</span>)."
    },

    // -------- HISTOLOGY: Loose Connective Tissue & Blood Vessels (301 - 315) --------
    301: {
        visual: "شريحة النسيج الضام الرخو (دفعة 2025): الحرف A يشير لحزم سميكة وردية متموجة، والحرف B لخيوط رفيعة داكنة متفرعة، والحرف C لشبكة خيوط دقيقة.",
        explain: "في هذه الصورة تحديداً: A = Collagen fibers (حزم عريضة)، B = Elastic fibers (ألياف مرنة متفرعة)، C = Reticular fibers.",
        diff: "انتبه جيداً لفرق الترقيم بين دفعة 2025 ودفعة 2024! في 2025 (هذه الشريحة) الحرف A هو الكولاجين العريض، بينما في شريحة 2024 الحرف A يشير للخيط الرفيع (Elastic).",
        vivaQ: "من أي نوع من الكولاجين تتكون ألياف الـ Reticular fibers (الحرف C)؟ وما هي صبغتها الخاصة؟",
        vivaA: "تتكون من <span class='kw-highlight'>Collagen type III</span>، وتُصبغ باللون الأسود بصبغة الفضة (<span class='kw-highlight'>Silver stain / Reticulin stain</span>)."
    },
    302: {
        visual: "شريحة النسيج الضام الرخو (دفعة 2024): السهم A يشير للخيط الرفيع المتفرع، والسهم B يشير للحزمة العريضة المتموجة، والسهم C للشبكة الخلفية.",
        explain: "في شريحة 2024: A = Elastic fibers، و B = Collagen fibers، و C = Reticular fibers.",
        vivaQ: "ما هي الخلية المسؤولة عن تصنيع وإفراز جميع هذه الألياف الثلاثة في النسيج الضام؟",
        vivaA: "الخلية الليفية اليافعة (<span class='kw-highlight'>Fibroblast</span>)."
    },
    303: {
        visual: "سؤال نظري مباشر حول مكونات المادة الأساسية غير المتشكلة (Ground substance) في النسيج الضام.",
        explain: "المادة الأساسية تتكون من ثلاث عائلات جزيئية رئيسية: Proteoglycans، و Glycosaminoglycans (GAGs)، و Multiadhesive glycoproteins (مثل Fibronectin و Laminin).",
        vivaQ: "اذكر مثالاً شهيراً على الـ GAGs غير المرتبطة بالبروتين والتي تحبس الماء بقوة في النسيج الضام؟",
        vivaA: "حمض الهيالورونيك (<span class='kw-highlight'>Hyaluronic acid / Hyaluronan</span>)."
    },
    304: {
        visual: "سؤال نظري مباشر عن الخلايا المقيمة الدائمة (Resident cells) في النسيج الضام.",
        explain: "الخلايا المقيمة (Resident cells) تولد وتبقى داخل النسيج الضام لأداء وظائف بنائية ودفاعية، وأهمها: Fibroblast, Macrophage, Mast cell, Adipocyte, Pericyte.",
        vivaQ: "أي خلية من الخلايا المقيمة تحتوي على حبيبات الهيستامين والهيبارين وتلعب دوراً رئيسياً في الحساسية؟",
        vivaA: "الخلية البدينة (<span class='kw-highlight'>Mast cell</span>)."
    },
    305: {
        visual: "سؤال نظري مباشر عن الخلايا المهاجرة العابرة (Wandering/Transient cells) في النسيج الضام.",
        explain: "الخلايا المهاجرة تأتي من نخاع العظم عبر مجرى الدم وتدخل النسيج الضام عند الالتهاب، وتشمل: Lymphocyte, Neutrophil, Eosinophil, Basophil, Monocyte, Plasma cell.",
        vivaQ: "من أي خلية تتمايز خلية الـ Plasma cell؟ وما هي وظيفتها؟",
        vivaA: "تتمايز من الخلايا اللمفاوية البائية (<span class='kw-highlight'>B-lymphocytes</span>)، ووظيفتها إنتاج الأجسام المضادة (<span class='kw-highlight'>Antibodies</span>)."
    },
    306: {
        visual: "مقطع في النسيج الضام يسأل عن الخلية التي تنتمي للخلايا المقيمة (Resident population).",
        explain: "من بين الخيارات (Monocyte, Lymphocyte, Macrophage, Neutrophils)، الخلية الوحيدة المقيمة في النسيج هي الـ Macrophage (بينما البقية خلايا دم مهاجرة).",
        vivaQ: "ماذا كان اسم خلية الـ Macrophage عندما كانت تسير في الدم قبل دخولها للنسيج الضام؟",
        vivaA: "كانت تُسمى الخلية الوحيدة (<span class='kw-highlight'>Monocyte</span>)."
    },
    307: {
        visual: "شريحة النسيج الضام تسأل عن الألياف المكونة من Collagen type III.",
        explain: "الألياف الشبكية (Reticular fibers) هي التي تتكون من الكولاجين من النوع الثالث (Collagen type III).",
        vivaQ: "من أي نوع من الكولاجين تتكون ألياف الكولاجين الكلاسيكية السميكة في الأوتار والأدمة والعظام؟",
        vivaA: "تتكون من الكولاجين من النوع الأول (<span class='kw-highlight'>Collagen type I</span>)."
    },
    308: {
        visual: "رسم توضيحي لجزيئات المادة الأساسية على سطح الخلية وفي النسيج الضام.",
        explain: "جزيء Syndecan هو أحد البروتيوغليكانات الغشائية (Transmembrane proteoglycans) في المادة الأساسية (بينما Integrin مستقبل خلوي و Fibronectin بروتين سكري لاصق).",
        vivaQ: "ما وظيفة بروتين Fibronectin في النسيج الضام؟",
        vivaA: "هو بروتين سكري لاصق (<span class='kw-highlight'>Multiadhesive glycoprotein</span>) يربط ألياف الكولاجين بمستقبلات الـ Integrin على سطح الخلايا."
    },
    309: {
        visual: "رسم جزيئات المادة الأساسية يسأل عن الـ Proteoglycan الضخم.",
        explain: "جزيء Aggrecan هو أشهر وأكبر Proteoglycan في المادة الأساسية (خصوصاً في الغضاريف والنسيج الضام).",
        vivaQ: "ما الذي يمنح جزيء الـ Aggrecan قدرته العالية على تحمل الضغط الميكانيكي؟",
        vivaA: "ارتباطه بمئات السلاسل السكرية سالبة الشحنة (<span class='kw-highlight'>Chondroitin & Keratan sulfate GAGs</span>) التي تجذب جزيئات الماء."
    },
    310: {
        visual: "شريحة نسيج ضام يحيط فيها الدائرة الحمراء بخلية مغزلية الشكل ذات نواة بيضوية ممدودة تسير بموازاة ألياف الكولاجين.",
        explain: "الخلية المغزلية المحاطة بالدائرة الحمراء هي الخلية الليفية (Fibroblast).",
        vivaQ: "كيف نفرق مجهرياً بين الخلية الليفية النشطة (Fibroblast) والخلية الليفية الخاملة (Fibrocyte)؟",
        vivaA: "الـ <span class='kw-highlight'>Fibroblast</span> أكبر حجماً ولها نواة فاتحة (Euchromatic) وسيتوبلازم غني، بينما الـ <span class='kw-highlight'>Fibrocyte</span> أصغر ونواتها داكنة مضغوطة ومغزلية رفيعة."
    },
    311: {
        visual: "لطخة دم / نسيج تُظهر كرية دم بيضاء ذات نواة مقسومة إلى فصين واضحين (Bilobed nucleus) وسيتوبلازم ممتلئ بحبيبات حمراء برتقالية لامعة.",
        explain: "النواة ثنائية الفصوص مع الحبيبات الحمراء الكبيرة (Eosinophilic granules) تميز كرية الدم البيضاء الحمضية (Eosinophil).",
        vivaQ: "في أي حالتين مرضيتين يرتفع عدد خلايا الـ Eosinophils في دم المريض؟",
        vivaA: "في العدوى الطفيلية (<span class='kw-highlight'>Parasitic infections</span>) وفي تفاعلات الحساسية والربو (<span class='kw-highlight'>Allergic reactions & Asthma</span>)."
    },
    312: {
        visual: "صورة لشعيرة دموية دقيقة (Capillary) يظهر فيها: A خلية مبطنة مسطحة، B لمعة الشعيرة الدموية، C خلية محيطية تحتضن الشعيرة من الخارج.",
        explain: "في هذه الشريحة: A = Endothelial cell، و B = Capillary، و C = Pericyte.",
        vivaQ: "ما هي وظيفة خلية الـ Pericyte (الحرف C) المحيطة بالشعيرات الدموية؟",
        vivaA: "لها قدرة انقباضية لتنظيم تدفق الدم، وتعمل كخلية جذعية وعائية (<span class='kw-highlight'>Mesenchymal stem cell</span>) لتجديد الأوعية الدموية عند الإصابة."
    },
    313: {
        visual: "مقطع نسيجي يجمع وعاءين دمويين متجاورين: الوعاء A ذو لمعة واسعة غير منتظمة وجدار رقيق جداً، والوعاء B ذو لمعة دائرية ضيقة وجدار عضلي سميك.",
        explain: "الوعاء الواسع الرقيق الجدار A هو الوريد الصغير (Venule)، والوعاء الدائري السميك الجدار B هو الشرين (Arteriole).",
        vivaQ: "كم طبقة من الخلايا العضلية الملساء توجد في طبقة Tunica media للشرين (Arteriole)؟",
        vivaA: "من طبقة واحدة إلى ثلاث طبقات فقط (<span class='kw-highlight'>1 to 3 layers of smooth muscle cells</span>)."
    },
    314: {
        visual: "صورة تخطيطية/مجهرية للشعيرة الدموية تُظهر: A الصفيحة القاعدية المستمرة المحيطة بالوعاء، B الخلايا البطانية، C خلية Pericyte.",
        explain: "في هذه الصورة: A = Continuous basal lamina، و B = Endothelial cells، و C = Pericyte.",
        vivaQ: "ما هي الأنواع الثلاثة للشعيرات الدموية (Capillaries) حسب استمرارية البطانة والصفيحة القاعدية؟",
        vivaA: "1) مستمرة (<span class='kw-highlight'>Continuous</span> - في العضلات والدماغ)<br>2) مثقبة (<span class='kw-highlight'>Fenestrated</span> - في الكلى والغدد)<br>3) جيبية غير مستمرة (<span class='kw-highlight'>Sinusoidal/Discontinuous</span> - في الكبد والطحال)."
    },
    315: {
        visual: "مقطع نسيجي للأوعية الدموية الدقيقة (دفعة 2024): A وعاء دائري سميك الجدار، B خلية عضلية ملساء/بطانية في جداره، C وعاء ذو لمعة واسعة وجدار رقيق.",
        explain: "في شريحة 2024: A = Arteriole، و B = Smooth Muscle cell (or Endothelial cell)، و C = Venule.",
        vivaQ: "أي طبقة من طبقات جدار الوعاء الدموي الثلاث تكون أسمك في الشرايين مقارنة بالأوردة؟",
        vivaA: "الطبقة الوسطى العضلية (<span class='kw-highlight'>Tunica media</span>) أسمك في الشرايين، بينما الطبقة الخارجية (<span class='kw-highlight'>Tunica adventitia</span>) هي الأسمك في الأوردة الكبيرة."
    },

    // -------- SURGERY: Breast Cancer Examination (401 - 407) --------
    401: {
        visual: "صورة سريرية للثدي تُظهر احمراراً جلدياً واضحاً، وتغصناً يشبه قشر البرتقال، مع انكماش/انسحاب في الحلمة.",
        explain: "العلامات غير الطبيعية الظاهرة هي: الاحمرار (Redness)، ومظهر قشر البرتقال (Peau d'orange)، وانكماش الحلمة (Nipple retraction/depression).",
        vivaQ: "ماذا لو سألك الدكتور: ما هو التفسير التشريحي والمرضي لظهور جلد الثدي بمظهر قشر البرتقال (Peau d'orange)؟",
        vivaA: "بسبب انسداد الأوعية اللمفاوية الجلدية بالخلايا السرطانية مما يسبب وذمة جلدية (<span class='kw-highlight'>Cutaneous lymphatic edema</span>) بينما تبقى بصيلات الشعر مشدودة للداخل بأربطة كوبر (<span class='kw-highlight'>Cooper's ligaments</span>)."
    },
    402: {
        visual: "صورة سريرية لثدي مصاب يُظهر Redness و Peau d'orange و Nipple retraction.",
        explain: "أي علامتين من: Redness / Peau d'orange / Nipple retraction.",
        vivaQ: "ما الفرق السريري المهم بين انكماش الحلمة الخلقي القديم والانكماش الحديث (Recent nipple retraction)؟",
        vivaA: "الانكماش الحديث المكتسب (<span class='kw-highlight'>Recent unilateral retraction</span>) علامة خطيرة تدل على غزو الورم لقنوات الحليب الكبيرة وشدها للداخل."
    },
    403: {
        visual: "صورة توضيحية لعلامات سرطان الثدي تشمل الاحمرار، قشر البرتقال، وخروج إفرازات من الحلمة.",
        explain: "العلامات هي: Redness, Peau d'orange, Nipple discharge.",
        vivaQ: "أي نوع من إفرازات الحلمة (Nipple discharge) يُعد الأكثر إثارة للشك بوجود ورم في قنوات الثدي؟",
        vivaA: "الإفراز الدموي التلقائي من ثدي واحد ومن قناة واحدة (<span class='kw-highlight'>Spontaneous unilateral bloody discharge</span>)."
    },
    404: {
        visual: "صورتان لوضعيات فحص الثدي (Inspection): الوضعية A المريضة تضع يديها على خصرها وتضغط، والوضعية B ترفع ذراعيها فوق رأسها.",
        explain: "في الوضعية A (اليدين على الخصر): يهدف الطبيب لتقليص عضلة الصدر الكبرى (Contract Pectoralis major muscle) لكشف التصاق الورم بها. وفي الوضعية B (رفع الذراعين): لإبراز أي كتل أو عدم تناظر أو انشداد في الجلد (Skin tethering/dimpling).",
        vivaQ: "بأي جزء من أصابع اليد نقوم بجس الثدي (Palpation) أثناء الفحص السريري؟",
        vivaA: "نستخدم بطون الأصابع الثلاثة الوسطى مبسوطة (<span class='kw-highlight'>Palmar surface / pads of the middle three fingers</span>) وليس أطراف الأصابع."
    },
    405: {
        visual: "سؤال سريري مباشر عن الربع التشريحي الأكثر إصابة بسرطان الثدي.",
        explain: "الربع العلوي الخارجي (Upper outer quadrant) هو الأكثر شيوعاً لسرطان الثدي (حوالي 50% من الحالات) لاحتوائه على أكبر كثافة من النسيج الغدي القنوي (Tail of Spence).",
        vivaQ: "إلى أي مجموعة من العقد اللمفاوية ينتشر سرطان الربع العلوي الخارجي للثدي في المقام الأول؟",
        vivaA: "إلى العقد اللمفاوية الإبطية في نفس الجهة (<span class='kw-highlight'>Ipsilateral axillary lymph nodes</span>)."
    },
    406: {
        visual: "سؤال عن وضع المريضة يديها على خصرها (Hands on waist) أثناء فحص كتلة الثدي.",
        explain: "الضغط باليدين على الخصر يقلص العضلة الصدرية الكبرى (Major pectoralis muscle) لاختبار ما إذا كانت الكتلة مثبتة في العضلة أم متحركة.",
        vivaQ: "ماذا نسمي الثلاثية التشخيصية الذهبية (Triple assessment) لتشخيص أي كتلة في الثدي؟",
        vivaA: "1) الفحص السريري (<span class='kw-highlight'>Clinical examination</span>)<br>2) التصوير الإشعاعي (<span class='kw-highlight'>Mammogram / Ultrasound</span>)<br>3) الخزعة النسيجية (<span class='kw-highlight'>Core needle biopsy / FNAC</span>)."
    },
    407: {
        visual: "صورة مقربة لجلد الثدي يظهر فيه التوذم والمسامات الغائرة تماماً كقشرة البرتقال.",
        explain: "العلامة الظاهرة في الصورة هي Peau d'Orange.",
        vivaQ: "تحت أي تصنيف (T stage) في نظام TNM يُصنف سرطان الثدي المصحوب بـ Peau d'orange أو التهاب الجلد؟",
        vivaA: "يُصنف في المرحلة المتقدمة موضعياً (<span class='kw-highlight'>T4b أو T4d Inflammatory breast carcinoma</span>)."
    }
};

// دالة ذكية تجلب الشرح المخصص للمحطة بالـ ID مع دمجها بمعرفة المعمل
function getStationRichKnowledge(q) {
    if (!q) return {};
    const byId = stationKnowledgeById[q.id] || {};
    const byLab = (typeof labKnowledgeBase !== 'undefined' && labKnowledgeBase[q.lab]) ? labKnowledgeBase[q.lab] : {};
    const cleanAns = (q.a || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    return {
        visual: byId.visual || `عينة عملية موثقة من معمل ${q.lab} (دفعة ${q.year}).`,
        explain: byId.explain || byLab.explain || `تعتمد هذه المحطة على الربط المباشر بين العلامة البصرية في العينة والتشخيص المعتمد (${cleanAns}).`,
        diff: byId.diff || byLab.diff || `ركز على العلامات الفارقة المميزة في هذه الشريحة وقارنها بالإجابة النموذجية (${cleanAns}).`,
        mnemonic: byId.mnemonic || byLab.mnemonic || `اربط الكلمة المفتاحية في السؤال مع (${cleanAns}) لتتذكرها فوراً في الاختبار.`,
        vivaQ: byId.vivaQ || `ماذا لو سألك الدكتور في نفس هذه العينة (${q.lab}): ما هي العلامة الفارقة الأساسية التي جعلتك تختار (${cleanAns}) وتستبعد التشخيصات الأخرى؟`,
        vivaA: byId.vivaA || `العلامة الحاسمة المعتمدة في دليل المعمل هي: <span class="kw-highlight">${cleanAns}</span>.`
    };
}

// ================= 3. كرت الاختبار الشفهي التفاعلي (Viva Follow-up) داخل صندوق الإجابة وفي نافذة المناضل =================
function injectVivaFollowupBox() {
    const ansBox = document.getElementById('answer-box');
    if (!ansBox || !currentList || !currentList[currentIndex]) return;

    const q = currentList[currentIndex];
    const info = getStationRichKnowledge(q);

    let vivaCard = document.getElementById('munadil-viva-followup-card');
    if (!vivaCard) {
        vivaCard = document.createElement('div');
        vivaCard.id = 'munadil-viva-followup-card';
        vivaCard.dir = 'rtl';
        vivaCard.className = 'mt-3 pt-3 border-t border-amber-500/40 bg-slate-950/75 rounded-2xl p-3.5 space-y-2.5 text-right';
        ansBox.appendChild(vivaCard);
    }

    vivaCard.innerHTML = `
        <div class="flex flex-wrap justify-between items-center gap-2">
            <div class="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-300">
                <span>🎙️</span>
                <span>سؤال "المناضل" الإضافي المتوقع على نفس العينة (Viva Follow-up):</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-200 border border-amber-500/40">محطة #${q.id}</span>
        </div>
        <p class="text-xs sm:text-sm font-bold text-white leading-relaxed">${info.vivaQ}</p>
        <div class="flex flex-wrap items-center gap-2 pt-1">
            <button type="button" onclick="document.getElementById('viva-ans-reveal-${q.id}').classList.remove('hidden');this.classList.add('hidden');" class="gold-btn px-3.5 py-1.5 rounded-xl text-xs font-black shadow">
                👁️ اكشف إجابة سؤال المناضل
            </button>
            <button type="button" onclick="openAiTutor(); askAiPreset('explain');" class="pill-btn px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--gold-bright)]">
                🔍 شرح السهم والعلامة البصرية في الشريحة
            </button>
        </div>
        <div id="viva-ans-reveal-${q.id}" class="hidden bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-3 text-xs sm:text-sm font-bold text-emerald-100 leading-relaxed">
            <span class="text-emerald-400 font-black block mb-1">✅ إجابة المناضل النموذجية:</span>
            ${info.vivaA}
        </div>
    `;
}

// ================= 4. ترقية دوال "المناضل" للشرح بالـ ID + الدردشة الحية المجانية عبر Cloudflare Worker =================
window.addEventListener('DOMContentLoaded', () => {
    // أ) إضافة زر "🎙️ سؤال Viva إضافي على العينة" في لوحة أزرار المناضل السريعة
    const presetGrid = document.querySelector('#ai-tutor-drawer .grid.grid-cols-2');
    if (presetGrid && !document.getElementById('ai-viva-preset-btn')) {
        const vivaBtn = document.createElement('button');
        vivaBtn.id = 'ai-viva-preset-btn';
        vivaBtn.type = 'button';
        vivaBtn.onclick = () => window.askAiPreset('viva');
        vivaBtn.className = 'col-span-2 gold-btn py-2 px-3 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow';
        vivaBtn.innerHTML = '<span>🎙️</span><span>اختبرني بسؤال إضافي متوقع على نفس العينة (Viva Follow-up)</span>';
        presetGrid.insertBefore(vivaBtn, presetGrid.firstChild);
    }

    // ب) تحديث عنوان وحالة نافذة المناضل لتوضح أن الدردشة الحية مجانية ومفعلة للجميع
    const subLabel = document.getElementById('ai-current-station-label');
    if (subLabel) {
        subLabel.innerText = 'متصل مجاناً • شرح مخصص لكل محطة بالـ ID';
    }

    // ج) ربط ظهور سؤال الـ Viva تلقائياً فور كشف الإجابة أو حل سؤال الاختيارات (MCQ)
    const origReveal = window.revealAnswer;
    if (typeof origReveal === 'function') {
        window.revealAnswer = function(...args) {
            const res = origReveal.apply(this, args);
            injectVivaFollowupBox();
            return res;
        };
    }

    const origRenderQ = window.renderQuestion;
    if (typeof origRenderQ === 'function') {
        window.renderQuestion = function(...args) {
            const res = origRenderQ.apply(this, args);
            const oldViva = document.getElementById('munadil-viva-followup-card');
            if (oldViva) oldViva.remove();
            if (!document.getElementById('ai-tutor-drawer')?.classList.contains('drawer-closed')) {
                window.updateAiTutorStationContext();
            }
            return res;
        };
    }

    // د) ترقية دالة تحديث سياق المحطة في نافذة المناضل لتعرض رقم الـ ID ووصف الصورة الدقيق
    window.updateAiTutorStationContext = function() {
        const chatBox = document.getElementById('ai-chat-messages');
        const label = document.getElementById('ai-current-station-label');
        const isTrainerOpen = !document.getElementById('view-trainer')?.classList.contains('hidden');

        if (isTrainerOpen && currentList && currentList[currentIndex]) {
            const q = currentList[currentIndex];
            const info = getStationRichKnowledge(q);
            if (label) {
                label.innerText = isExamSimulator && document.getElementById('answer-box')?.classList.contains('hidden')
                    ? `محطة اختبار محاكي #${currentIndex + 1} (ID: ${q.id})`
                    : `محطة #${q.id} • ${q.subject} (${q.lab})`;
            }

            if (chatBox && chatBox.dataset.lastStationId !== String(q.id)) {
                chatBox.dataset.lastStationId = String(q.id);
                chatBox.innerHTML = `
                    <div class="ai-msg-bubble p-3.5 space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="font-black text-[var(--gold-bright)] text-xs">🤖 المناضل | متابع للمحطة #${q.id}</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">AI مجاني مفعل</span>
                        </div>
                        <p class="text-xs text-[var(--text-main)] leading-relaxed">
                            <strong>👁️ ما يظهر في هذه المحطة:</strong> ${info.visual}
                        </p>
                        <p class="text-[11px] text-[var(--text-muted)] font-bold">
                            اضغط على <strong>"🎙️ سؤال إضافي متوقع (Viva)"</strong> أو اطلب شرح الأسهم والعلامات أو اكتب أي سؤال في الشات بالأسفل!
                        </p>
                    </div>
                `;
            }
        } else if (chatBox && !chatBox.innerHTML.trim()) {
            if (label) label.innerText = 'متصل مجاناً للجميع • F2 OSPE AI';
            chatBox.innerHTML = `
                <div class="ai-msg-bubble p-3.5 space-y-1.5">
                    <div class="font-black text-[var(--gold-bright)] text-xs">🤖 المناضل | مساعد MED26 الذكي (مجاني للجميع)</div>
                    <p class="text-xs text-[var(--text-main)]">اكتب أي سؤال طبي في بالأسفل وسأجيبك مباشرة بالذكاء الاصطناعي الحي، أو افتح أي محطة تدريبية لأشرح لك أسهم وعلامات صورتها برقم الـ ID وأختبرك بأسئلة الـ Viva المتوقعة!</p>
                </div>
            `;
        }
    };

    // هـ) ترقية أزرار الشرح السريعة لتقرأ من قاعدة المعرفة المخصصة بالـ ID (stationKnowledgeById)
    window.askAiPreset = function(mode) {
        const isTrainerOpen = !document.getElementById('view-trainer')?.classList.contains('hidden');
        if (!isTrainerOpen || !currentList || !currentList[currentIndex]) {
            appendChatMessage('ai', 'يرجى فتح أي محطة تدريبية أولاً حتى أقوم بتحليل صورتها وشرح علاماتها لك برقم الـ ID.');
            return;
        }

        if (document.getElementById('answer-box')?.classList.contains('hidden') && mode !== 'viva') {
            window.revealAnswer();
        }

        const q = currentList[currentIndex];
        const info = getStationRichKnowledge(q);
        const cleanAns = (q.a || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

        if (mode === 'viva') {
            appendChatMessage('user', `🎙️ اختبرني بسؤال شفهي إضافي متوقع (Viva) على عينة المحطة #${q.id}`);
            const vivaUniqueId = `chat-viva-ans-${q.id}-${Date.now()}`;
            const vivaHtml = `
                <div class="space-y-2">
                    <div class="font-black text-amber-300 text-xs">🎙️ سؤال Viva المتوقع على هذه العينة (محطة #${q.id}):</div>
                    <div class="font-bold text-white text-xs leading-relaxed">${info.vivaQ}</div>
                    <button type="button" onclick="document.getElementById('${vivaUniqueId}').classList.remove('hidden');this.classList.add('hidden');" class="gold-btn px-3 py-1.5 rounded-xl text-[11px] font-black mt-1">
                        👁️ إظهار إجابة الـ Viva النموذجية
                    </button>
                    <div id="${vivaUniqueId}" class="hidden bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-2.5 text-xs font-bold text-emerald-100 mt-1.5 leading-relaxed">
                        ✅ <strong>الإجابة:</strong> ${info.vivaA}
                    </div>
                </div>
            `;
            appendChatMessage('ai', vivaHtml, false);
        } else if (mode === 'explain') {
            appendChatMessage('user', `🧠 اشرح لي العلامة البصرية والإجابة في المحطة #${q.id} بالتفصيل`);
            const response =
                `<strong>🎯 الإجابة النموذجية للمحطة #${q.id}:</strong>\n<span class="kw-highlight">${cleanAns}</span>\n\n` +
                `<strong>👁️ وصف السهم / العلامة في الصورة:</strong>\n${info.visual}\n\n` +
                `<strong>🔍 التفسير العلمي الدقيق:</strong>\n${info.explain}` +
                (q.note ? `\n\n📌 <strong>تنبيه فريق العملي:</strong> ${q.note}` : '');
            appendChatMessage('ai', response, true);
        } else if (mode === 'diff') {
            appendChatMessage('user', `⚖️ كيف أفرق عينة المحطة #${q.id} عن الشرائح المشابهة لها؟`);
            appendChatMessage('ai', `<strong>⚖️ التفريق الحاسم للمحطة #${q.id} (${q.lab}):</strong>\n${info.diff}`, true);
        } else if (mode === 'mnemonic') {
            appendChatMessage('user', `💡 عطني ربط وبصمة سريعة (Mnemonic) لحفظ المحطة #${q.id}`);
            appendChatMessage('ai', `<strong>💡 بصمة "المناضل" السريعة للمحطة #${q.id}:</strong>\n${info.mnemonic}`, true);
        } else if (mode === 'exam_tip') {
            appendChatMessage('user', `🎯 كيف أضمن الدرجة الكاملة في المحطة #${q.id}؟`);
            const tip = q.type === 'mcq'
                ? `هذا السؤال اختيار من متعدد؛ بمجرد ملاحظة (${info.visual}) اختر فوراً:\n<span class="kw-highlight">${cleanAns}</span>`
                : `في الأسئلة الكتابية، يبحث المصحح عن الكلمات المفتاحية التالية نصاً:\n<span class="kw-highlight">${cleanAns}</span>\n\n🎙️ <strong>سؤال إضافي قد يرد عليها:</strong>\n${info.vivaQ}`;
            appendChatMessage('ai', tip, true);
        }
    };

    // و) تشغيل الدردشة الحية مجاناً للجميع عبر وسيط Cloudflare Worker (مع محرك سحابي مجاني فوري)
    window.configureUserApiKey = function() {
        const savedWorker = localStorage.getItem('med26_cf_worker_url') || MED26_CLOUDFLARE_WORKER_URL || '';
        const newUrl = prompt(
            '☁️ إعدادات الدردشة السحابية المجانية لـ "المناضل":\n\n' +
            '• الدردشة الحية تعمل مجاناً للجميع تلقائياً!\n' +
            '• إذا أنشأت رابط Cloudflare Worker خاصاً بك، الصقه هنا (أو اتركه كما هو):',
            savedWorker
        );
        if (newUrl !== null && newUrl.trim()) {
            localStorage.setItem('med26_cf_worker_url', newUrl.trim());
            alert('✅ تم حفظ رابط Cloudflare Worker بنجاح!');
        }
    };

    window.sendCustomAiMessage = async function() {
        const input = document.getElementById('ai-custom-input');
        const userQ = (input?.value || '').trim();
        if (!userQ) return;
        input.value = '';
        appendChatMessage('user', userQ);

        const isTrainerOpen = !document.getElementById('view-trainer')?.classList.contains('hidden');
        const q = (isTrainerOpen && currentList && currentList[currentIndex]) ? currentList[currentIndex] : null;
        const info = q ? getStationRichKnowledge(q) : null;

        const systemContext = q
            ? `أنت "المناضل"، المساعد الطبي الذكي لطلاب الطب البشري (دفعة MED26 جامعة جازان) في اختبار Foundation 2 OSPE. الطالب يسألك الآن وهو يفتح المحطة رقم #${q.id} في مادة ${q.subject} (معمل ${q.lab}، دفعة ${q.year}). نص سؤال المحطة: "${q.q}". الإجابة النموذجية المعتمدة: "${q.a.replace(/<[^>]*>/g, ' ')}". وصف الصورة والعلامة البصرية: "${info.visual}". التفسير العلمي: "${info.explain}". أجب الطالب باللغة العربية بأسلوب واضح ومباشر ومنظم مع كتابة المصطلحات الطبية بالإنجليزية.`
            : `أنت "المناضل"، المساعد الطبي الذكي لطلاب الطب البشري (دفعة MED26 جامعة جازان) في اختبار Foundation 2 OSPE (يشمل Microbiology, Pathology, Histology, Surgery). أجب الطالب باللغة العربية بدقة واختصار مفيد مع كتابة المصطلحات الطبية بالإنجليزية.`;

        // إظهار مؤشر جاري التفكير
        const chatBox = document.getElementById('ai-chat-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'ai-msg-bubble p-3 mr-2 text-xs font-bold text-[var(--gold-bright)] animate-pulse';
        loadingDiv.innerText = '🤖 جاري تحليل سؤالك وكتابة الشرح الطبي...';
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        const workerUrl = (localStorage.getItem('med26_cf_worker_url') || MED26_CLOUDFLARE_WORKER_URL || '').trim();
        const userApiKey = (localStorage.getItem('med26_gemini_api_key') || '').trim();

        // 1. المحاولة الأولى: عبر وسيط Cloudflare Worker المجاني الخاص بالموقع (إن وُجد الرابط)
        if (workerUrl) {
            try {
                const res = await fetch(workerUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system: systemContext,
                        message: userQ,
                        stationId: q ? q.id : null
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    const reply = data.reply || data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (reply) {
                        loadingDiv.remove();
                        appendChatMessage('ai', reply, true);
                        return;
                    }
                }
            } catch (e) {}
        }

        // 2. المحاولة الثانية: المحرك السحابي المجاني المفتوح (يعمل مجاناً لكل الطلاب بدون أي مفتاح API)
        try {
            const freeRes = await fetch('https://text.pollinations.ai/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'openai',
                    messages: [
                        { role: 'system', content: systemContext },
                        { role: 'user', content: userQ }
                    ],
                    temperature: 0.3
                })
            });
            if (freeRes.ok) {
                const freeData = await freeRes.json();
                const freeReply = freeData?.choices?.[0]?.message?.content;
                if (freeReply) {
                    loadingDiv.remove();
                    appendChatMessage('ai', freeReply, true);
                    return;
                }
            }
        } catch (e) {}

        // 3. المحاولة الثالثة: إذا كان الطالب قد وضع مفتاح Gemini خاص به
        if (userApiKey) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${userApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `${systemContext}\n\nسؤال الطالب: ${userQ}` }] }]
                    })
                });
                const data = await res.json();
                const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (reply) {
                    loadingDiv.remove();
                    appendChatMessage('ai', reply, true);
                    return;
                }
            } catch (e) {}
        }

        // 4. خط الدفاع المحلي الفوري (إذا انقطع الإنترنت): إجابة مخصصة من قاعدة بيانات المحطة بالـ ID
        loadingDiv.remove();
        if (q && info) {
            const cleanAns = q.a.replace(/<[^>]*>/g, ' ').trim();
            const offlineHtml =
                `<strong>🔍 إجابة "المناضل" المخصصة للمحطة #${q.id} (${q.lab}):</strong>\n` +
                `• <strong>التشخيص المعتمد:</strong> <span class="kw-highlight">${cleanAns}</span>\n` +
                `• <strong>العلامة في الشريحة:</strong> ${info.visual}\n` +
                `• <strong>الشرح العلمي:</strong> ${info.explain}\n` +
                `• <strong>كيف تفرقها:</strong> ${info.diff}\n` +
                `• <strong>سؤال Viva المتوقع:</strong> ${info.vivaQ}\n` +
                `✅ <strong>إجابته:</strong> ${info.vivaA}`;
            appendChatMessage('ai', offlineHtml, true);
        } else {
            appendChatMessage('ai', 'تأكد من اتصالك بالإنترنت للدردشة الحية، أو افتح أي محطة تدريبية لأشرح لك تفاصيلها من قاعدة المعرفة المدمجة!', false);
        }
    };
});