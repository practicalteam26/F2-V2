/* ================= MED26 Unified Cloud Sync Bridge (V8 - Practical + Theory) ================= */
(function initMed26UnifiedSyncBridge() {
    const FB_URL = (typeof FIREBASE_BASE_URL !== 'undefined')
        ? FIREBASE_BASE_URL
        : 'https://med26-f2-ospe-default-rtdb.firebaseio.com';

    const CURRENT_TRACK = (document.body.dataset.track || '').toLowerCase() === 'theory'
        || window.location.pathname.toLowerCase().includes('theory')
        ? 'theory'
        : 'practical';
    const IS_THEORY = (CURRENT_TRACK === 'theory');
    window.MED26_CURRENT_TRACK = CURRENT_TRACK;

    if (IS_THEORY) {
        document.body.dataset.track = 'theory';
        window.MED26_MULTIPAGE_MODE = false;
    }

    // المواد الافتراضية للعملي فقط — أما النظري فيبدأ فارغاً بالكامل ليضيفه فريق التجميعات من الأدمن
    const DEFAULT_SUBJECTS = [
        { id: 'MICROBIOLOGY', name: 'MICROBIOLOGY', color: '#10b981', track: 'practical', hidden: false, labs: ['Gram-positive Bacteria', 'Gram-negative Bacteria', 'Antibiotic Susceptibility', 'Molecular Techniques', 'Parasitic Diseases'] },
        { id: 'PATHOLOGY', name: 'PATHOLOGY', color: '#f43f5e', track: 'practical', hidden: false, labs: ['Cell injury & Adaptation', 'Inflammation', 'Hemodynamic Disorders', 'Neoplasia'] },
        { id: 'HISTOLOGY', name: 'HISTOLOGY', color: '#a855f7', track: 'practical', hidden: false, labs: ['Loose Connective Tissues', 'Small Blood Vessels'] },
        { id: 'SURGERY', name: 'SURGERY', color: '#0ea5e9', track: 'practical', hidden: false, labs: ['Breast Cancer'] }
    ];

    function getQuestionsArray() {
        if (typeof questionsDB !== 'undefined' && Array.isArray(questionsDB)) return questionsDB;
        window.questionsDB = window.questionsDB || [];
        return window.questionsDB;
    }

    function getLabsArray() {
        if (typeof F2_OSPE_LABS !== 'undefined' && Array.isArray(F2_OSPE_LABS)) return F2_OSPE_LABS;
        window.F2_OSPE_LABS = window.F2_OSPE_LABS || [];
        return window.F2_OSPE_LABS;
    }

    function normalizeLabObj(l) {
        return typeof l === 'string'
            ? { name: l.trim(), hidden: false }
            : { name: String(l?.name || '').trim(), hidden: !!l?.hidden };
    }

    function normalizeSubjectsList(list) {
        if (!Array.isArray(list) || !list.length) return [];
        return list.map(s => ({
            id: String(s.id || s.name || '').trim(),
            name: String(s.name || '').trim(),
            color: s.color || (s.track === 'theory' ? '#e11d38' : '#10b981'),
            track: s.track || 'practical',
            hidden: !!s.hidden,
            labs: (Array.isArray(s.labs) ? s.labs : []).map(normalizeLabObj).filter(l => l.name)
        })).filter(s => s.name);
    }

    const ORIGINAL_CHECKLIST_SNAPSHOT = JSON.parse(JSON.stringify(getLabsArray()));
    window.MED26_ALL_SUBJECTS = normalizeSubjectsList(DEFAULT_SUBJECTS);
    window.MED26_DYNAMIC_SUBJECTS = window.MED26_ALL_SUBJECTS.filter(s => s.track === CURRENT_TRACK && !s.hidden);

    function hexToRgbTuple(hex) {
        const clean = (hex || (IS_THEORY ? '#e11d38' : '#cfa96b')).replace('#', '');
        if (clean.length !== 6) return IS_THEORY ? '225, 29, 72' : '207, 169, 107';
        return `${parseInt(clean.slice(0, 2), 16)}, ${parseInt(clean.slice(2, 4), 16)}, ${parseInt(clean.slice(4, 6), 16)}`;
    }

    function slugifyId(str) {
        return String(str || '').toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '_').replace(/^_+|_+$/g, '') || 'item';
    }

    // التحقق من أن السؤال يتبع المسار الحالي (عملي أو نظري) وغير مخفي في Draft Mode
    window.isQuestionVisibleInTrack = function(q) {
        if (!q) return false;
        const qTrack = q.track || 'practical';
        if (qTrack !== CURRENT_TRACK) return false;
        const subCfg = window.MED26_ALL_SUBJECTS.find(s => (s.track || 'practical') === CURRENT_TRACK && s.name.toLowerCase() === String(q.subject || '').toLowerCase());
        if (subCfg) {
            if (subCfg.hidden) return false;
            const qLabLow = String(q.lab || '').toLowerCase().trim();
            const hiddenLabMatch = (subCfg.labs || []).find(l => l.hidden && (qLabLow === l.name.toLowerCase() || qLabLow.includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(qLabLow)));
            if (hiddenLabMatch) return false;
        }
        return true;
    };
    window.isQuestionVisibleInPractical = window.isQuestionVisibleInTrack;

    // ================= 1. التنسيقات + الشاشة المحايدة + بطاقة النظري الحمراء في شاشة الاختيار =================
    function injectSharedStyles() {
        if (document.getElementById('med26-sync-v8-styles')) return;
        const style = document.createElement('style');
        style.id = 'med26-sync-v8-styles';
        style.textContent = `
            #disclaimer-modal { background-color: #f8fafc !important; background-image: none !important; z-index: 99999 !important; }
            #disclaimer-modal > .neutral-disc-card { background-color: #ffffff !important; border: 1.5px solid #e2e8f0 !important; color: #0f172a !important; box-shadow: 0 20px 50px -15px rgba(15, 23, 42, 0.14) !important; }
            #portal-choice-modal { position: fixed; inset: 0; width: 100vw; height: 100dvh; z-index: 99998; background-color: #ffffff; display: none; align-items: center; justify-content: center; padding: 16px; overflow-y: auto; }
            #portal-choice-modal.open { display: flex !important; }
            .choice-practical-card {
                background:
                    repeating-linear-gradient(-30deg, rgba(235, 210, 164, 0.08) 0px, rgba(235, 210, 164, 0.08) 3px, transparent 3px, transparent 22px),
                    linear-gradient(145deg, #24201b 0%, #141210 100%) !important;
                border: 2px solid #cfa96b !important; color: #f7f4ef !important;
                box-shadow: 0 20px 50px -12px rgba(20, 18, 16, 0.55) !important;
               cursor: pointer; transition: transform 0.2s ease;
            }
            .choice-practical-card:hover { transform: translateY(-4px); }
            .choice-practical-card:hover { transform: translateY(-4px); }
            .choice-theory-red-card {
                background:
                    repeating-linear-gradient(-30deg, rgba(255, 255, 255, 0.065) 0px, rgba(255, 255, 255, 0.065) 3px, transparent 3px, transparent 22px),
                    linear-gradient(145deg, #be1b29 0%, #680d16 100%) !important;
                border: 2px solid #fb7185 !important; color: #ffffff !important;
                box-shadow: 0 20px 50px -12px rgba(153, 27, 27, 0.52) !important;
                cursor: pointer; transition: transform 0.2s ease;
            }
            .choice-theory-red-card:hover { transform: translateY(-4px); }
            .stealth-admin-link { position: absolute; bottom: 10px; right: 14px; font-size: 10px; font-weight: 800; color: #94a3b8; opacity: 0.28; text-decoration: none; padding: 2px 6px; border-radius: 6px; z-index: 50; }
            .stealth-admin-link:hover { opacity: 0.95; color: #0f172a; }
            footer .stealth-admin-link:hover { color: var(--gold-bright); }
            #ai-floating-btn { display: inline-flex !important; visibility: visible !important; opacity: 1 !important; }
            #admin-urgent-banner { background: linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.2)); border-bottom: 1.5px solid rgba(207, 169, 107, 0.5); }
            #student-report-modal { position: fixed; inset: 0; z-index: 100000; background: rgba(10, 9, 8, 0.85); backdrop-filter: blur(6px); display: none; align-items: center; justify-content: center; padding: 16px; }
            #student-report-modal.open { display: flex !important; }
			/* إخفاء رد المناضل أسفل الإجابة وأزرار الردود الجاهزة في الموقعين مع إبقاء الشات اليدوي */
            #munadil-viva-followup-card,
            #ai-viva-preset-btn,
            #ai-tutor-drawer .grid.grid-cols-2 { display: none !important; }
			/* ================= إصلاح شامل لألوان الوضع الفاتح (White Mode) في العملي والنظري ================= */
            body.light-mode .text-white { color: var(--text-main) !important; }
            body.light-mode .text-slate-100,
            body.light-mode .text-slate-200,
            body.light-mode .text-slate-300 { color: #334155 !important; }
            body.light-mode .text-amber-200,
            body.light-mode .text-amber-300,
            body.light-mode .text-amber-400 { color: #9a5b00 !important; }
            body.light-mode .text-orange-300,
            body.light-mode .text-orange-400 { color: #c2410c !important; }
            body.light-mode .text-emerald-100,
            body.light-mode .text-emerald-200,
            body.light-mode .text-emerald-300,
            body.light-mode .text-emerald-400 { color: #047857 !important; }
            body.light-mode .text-red-300,
            body.light-mode .text-red-400,
            body.light-mode .text-rose-100,
            body.light-mode .text-rose-200,
            body.light-mode .text-rose-300 { color: #be123c !important; }
            body.light-mode .text-sky-200,
            body.light-mode .text-sky-300 { color: #0369a1 !important; }
            body.light-mode .text-purple-300 { color: #6d28d9 !important; }

            /* صناديق الإجابة والملاحظات وشريط الإنجاز في الوضع الفاتح */
            body.light-mode [class*="bg-emerald-950/"] { background-color: rgba(16, 185, 129, 0.12) !important; color: #064e3b !important; }
            body.light-mode [class*="bg-black/40"] { background-color: rgba(15, 23, 42, 0.12) !important; }
            body.light-mode [class*="bg-slate-950/"] { background-color: #f8fafc !important; border-color: rgba(180, 83, 9, 0.35) !important; }
            body.light-mode .warn-highlight { background: rgba(220, 38, 38, 0.12) !important; color: #b91c1c !important; border-color: rgba(220, 38, 38, 0.35) !important; }

            /* بطاقات المتصدرين الثلاثة الأولى في الوضع الفاتح */
            body.light-mode .rank-1-fx { background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%) !important; color: #581c87 !important; border-color: #9333ea !important; }
            body.light-mode .rank-2-fx { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; color: #78350f !important; border-color: #d97706 !important; }
            body.light-mode .rank-3-fx { background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%) !important; color: #0c4a6e !important; border-color: #0284c7 !important; }

            /* حماية الأزرار والبطاقات التي تبقى خلفيتها داكنة أو ملونة بالكامل في الوضع الفاتح */
            body.light-mode .bg-emerald-600,
            body.light-mode .bg-amber-600,
            body.light-mode .bg-red-600,
            body.light-mode .bg-rose-600,
            body.light-mode .nav-correct,
            body.light-mode .nav-wrong { color: #ffffff !important; }

            body[data-track="theory"].light-mode .gold-btn,
            body[data-track="theory"].light-mode .gold-btn *,
            body[data-track="theory"].light-mode .pill-btn.active,
            body[data-track="theory"].light-mode .pill-btn.active *,
            body[data-track="theory"].light-mode .pill-btn:hover,
            body[data-track="theory"].light-mode .pill-btn:hover * { color: #ffffff !important; }

            body:not([data-track="theory"]).light-mode .gold-btn,
            body:not([data-track="theory"]).light-mode .gold-btn *,
            body:not([data-track="theory"]).light-mode .pill-btn.active,
            body:not([data-track="theory"]).light-mode .pill-btn.active *,
            body:not([data-track="theory"]).light-mode .pill-btn:hover,
            body:not([data-track="theory"]).light-mode .pill-btn:hover * { color: #181512 !important; }

            body.light-mode #luxury-score-card [class*="bg-black/"] { background-color: rgba(0, 0, 0, 0.35) !important; }
            body.light-mode #luxury-score-card .text-white,
            body.light-mode #f2-checklist-modal .text-white,
            body.light-mode #med26-pomo-widget .text-white,
            body.light-mode #portal-choice-modal .choice-theory-red-card .text-white,
            body.light-mode #portal-choice-modal .choice-practical-card .text-white { color: #ffffff !important; }
            body.light-mode #luxury-score-card .text-emerald-400,
            body.light-mode #f2-checklist-modal .text-emerald-300,
            body.light-mode #med26-pomo-widget .text-emerald-300 { color: #34d399 !important; }
            body.light-mode #luxury-score-card .text-amber-400,
            body.light-mode #f2-checklist-modal .text-amber-300,
            body.light-mode #f2-checklist-modal .text-amber-400,
            body.light-mode #med26-pomo-widget .text-amber-300,
            body.light-mode #med26-pomo-widget .text-amber-400 { color: #fbbf24 !important; }
            body.light-mode #luxury-score-card .text-sky-300 { color: #7dd3fc !important; }
            body.light-mode #f2-checklist-modal .text-slate-100,
            body.light-mode #f2-checklist-modal .text-slate-200,
            body.light-mode #f2-checklist-modal .text-slate-300,
            body.light-mode #med26-pomo-widget .text-slate-200,
            body.light-mode #med26-pomo-widget .text-slate-300 { color: #e2e8f0 !important; }
            body.light-mode #f2-checklist-modal .text-rose-300,
            body.light-mode #med26-pomo-widget .text-rose-300,
            body.light-mode #portal-choice-modal .choice-theory-red-card .text-rose-100 { color: #ffe4e6 !important; }

            /* ================= تحسينات التجاوب للشاشات الصغيرة (Mobile & iPad) ================= */
            @media (max-width: 767px) {
                #portal-choice-modal { align-items: flex-start !important; padding-top: 24px !important; padding-bottom: 24px !important; }
                #switch-portal-track-btn, #admin-top-access-btn { padding: 4px 8px !important; font-size: 11px !important; }
                #mobile-bottom-bar button { font-size: 9px !important; padding-left: 2px !important; padding-right: 2px !important; white-space: nowrap; overflow: hidden; }
                #pomo-expanded { max-width: 90vw !important; }
            }
        `;
        document.head.appendChild(style);

        if (!IS_THEORY) {
            const bgStage = document.getElementById('bg-Stage');
            if (bgStage && bgStage.dataset.practicalArt !== '1') {
                bgStage.dataset.practicalArt = '1';
                bgStage.innerHTML = `
                    <svg class="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="practical-streaks" width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
                                <line x1="15" y1="0" x2="15" y2="55" stroke="#ebd2a4" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
                                <line x1="45" y1="25" x2="45" y2="85" stroke="#fff8eb" stroke-width="2.5" stroke-linecap="round" opacity="0.28"/>
                                <line x1="75" y1="5" x2="75" y2="65" stroke="#cfa96b" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#practical-streaks)"/>
                    </svg>
                `;
            }
        }
    }

    // ================= 2. محرك تحويل الهوية والمسميات الكاملة لصفحة النظري (theory.html) =================
    const THEORY_TEXT_REPLACEMENTS = [
        ['منصة OSPE التفاعلية | F2', 'منصة تجميعات النظري | MED26'],
        ['بنك التجميعات والتدريبات • طب جازان', 'بنك أسئلة المحاضرات والاختبارات • طب جازان'],
        ['بنك التجميعات والتدريبات التفاعلي لـ Foundation 2', 'بنك تجميعات النظري التفاعلي لطلاب MED26'],
        ['العد التنازلي لاختبار F2 OSPE (27/12 - 8:00 ص):', 'العد التنازلي للاختبار النظري (MED26):'],
        ['الأطلس البصري ومفاتيح البصم', 'المراجعة السريعة والأسئلة'],
        ['الأطلس البصري السريع ومفاتيح البصم', 'المراجعة السريعة لبنك النظري'],
        ['الأطلس البصري', 'المراجعة السريعة'],
        ['الأطلس', 'المراجعة'],
        ['محطة اليوم السريعة', 'سؤال اليوم السريع'],
        ['عينة عشوائية أخرى', 'سؤال عشوائي آخر'],
        ['مراجعة خاطفة لجميع صور العينات والكلمات المفتاحية قبل دخول قاعة الـ OSPE بـ 10 دقائق', 'مراجعة سريعة لجميع أسئلة المحاضرات وإجاباتها النموذجية قبل الاختبار'],
        ['تدرّب مع محاكي الـ 18 محطة (من 20 درجة)، وتحدي الـ 60 ثانية السريع، ورابط تحدي الأصدقاء، وطباعة ملف أخطائك وملاحظاتك كـ PDF.', 'تدرّب مع محاكي الاختبار (18 سؤال)، وتحدي الـ 60 ثانية السريع، ورابط تحدي الأصدقاء، وطباعة ملف أخطائك وملاحظاتك كـ PDF.'],
        ['خطة وChecklist لابات F2 OSPE', 'خطة وChecklist محاضرات النظري'],
        ['خريطة المحطات:', 'خريطة الأسئلة:'],
        ['إجمالي المحطات', 'إجمالي الأسئلة'],
        ['محطات أتقنتها', 'أسئلة أتقنتها'],
        ['ختم اللابات', 'ختم المحاضرات'],
        ['فلترة اللابات', 'فلترة المحاضرات'],
        ['المحطة السابقة', 'السؤال السابق'],
        ['المحطة التالية', 'السؤال التالي'],
        ['المحطات الصحيحة', 'الأسئلة الصحيحة'],
        ['عدد المحطات المطابقة لاختياراتك:', 'عدد الأسئلة المطابقة لاختياراتك:'],
        ['عدد المحطات:', 'عدد الأسئلة:'],
        ['جميع المحطات المطابقة', 'جميع الأسئلة المطابقة'],
        ['ترتيب عشوائي للمحطات', 'ترتيب عشوائي للأسئلة'],
        ['مراجعة المحطات الأكثر تكراراً', 'مراجعة الأسئلة الأكثر تكراراً'],
        ['اختر المواد، المعامل، والسنوات', 'اختر المواد، المحاضرات، والسنوات'],
        ['اختر المواد واللابات الفرعية والسنوات', 'اختر المواد والمحاضرات الفرعية والسنوات'],
        ['تحليل نقاط الضعف حسب المعمل (Lab Breakdown):', 'تحليل نقاط الضعف حسب المحاضرة (Lecture Breakdown):'],
        ['تدرّب على هذا المعمل', 'تدرّب على هذه المحاضرة'],
        ['تنبيه فريق العملي (Practical Team Note):', 'تنبيه فريق التجميعات (Theory Team Note):'],
        ['تواصل مع فريق العملي (Practical Team)', 'تواصل مع فريق التجميعات (Theory Team)'],
        ['إرسال البلاغ لفريق العملي', 'إرسال البلاغ لفريق التجميعات'],
        ['فريق العملي', 'فريق التجميعات'],
       ['Done by Lester Crest', 'Done by Lester Crest'],
        ['FOUNDATION 2 OSPE', 'THEORY QUESTION BANK'],
        ['F2 OSPE', 'تجميعات النظري'],
        ['OSPE', 'النظري'],
        ['STATION QUESTION:', 'THEORY QUESTION:'],
        ['ملاحظتي وربطتي الخاصة على هذه الشريحة:', 'ملاحظتي وربطتي الخاصة على هذا السؤال:'],
        ['المصحح التلقائي للكتاب', 'المصحح التلقائي للإجابة'],
        ['إخفاء اسم اللاب', 'إخفاء اسم المحاضرة'],
        ['إخفاء المادة واللاب', 'إخفاء المادة والمحاضرة'],
        ['قسم التدريبات العملية', 'قسم التدريبات النظرية'],
        ['التدريبات العملية', 'التدريبات النظرية'],
        ['أسطورة الـ OSPE', 'أسطورة النظري'],
        ['وحش العملي', 'وحش النظري'],
        ['بصمة "المناضل" السريعة', 'ربط "المناضل" السريع'],
        ['شرح المحطة الحالية', 'شرح السؤال الحالي'],
        ['شرح المحطة المعروضة أمامك فوراً:', 'شرح السؤال المعروض أمامك فوراً:'],
        ['كيف أفرقها عن المتشابهات؟', 'كيف أفرقها عن المتشابهات؟'],
        ['Lab Title', 'Lecture Title'],
        ['اللابات', 'المحاضرات'],
        ['لابات', 'محاضرات'],
        ['المحطات', 'الأسئلة'],
        ['محطات', 'أسئلة'],
        ['المحطة', 'السؤال'],
        ['محطة', 'سؤال'],
        ['معمل', 'محاضرة']
    ];

    function translateStringToTheory(str) {
        if (!str || typeof str !== 'string') return str;
        let out = str;
        for (const [from, to] of THEORY_TEXT_REPLACEMENTS) {
            if (out.includes(from)) out = out.split(from).join(to);
        }
        // استبدال كلمة "لاب" المنفصلة فقط دون المساس بكلمة "الطلاب" أو "طلاب"
        out = out.replace(/(^|[\s\d(\/])لاب(?=$|[\s.,،)\/!:])/g, '$1محاضرة');
        return out;
    }

    function applyTheoryVisualAndTerminologyPass() {
        if (!IS_THEORY) return;

        // 1. استبدال الخلفية المتموجة بخطوط مائلة حمراء/بيضاء مطابقة لهوية شعار النظري
        const bgStage = document.getElementById('bg-Stage');
        if (bgStage && bgStage.dataset.theoryArt !== '1') {
            bgStage.dataset.theoryArt = '1';
            bgStage.innerHTML = `
                <svg class="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="theory-streaks" width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
                            <line x1="15" y1="0" x2="15" y2="55" stroke="#fb7185" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
                            <line x1="45" y1="25" x2="45" y2="85" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.28"/>
                            <line x1="75" y1="5" x2="75" y2="65" stroke="#e11d38" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#theory-streaks)"/>
                </svg>
            `;
        }

        // 2. إجبار استخدام شعار النظري الأحمر logo-theory.png (مع fallback لـ logo.png)
        window.loadTransparentLogo = function() {
            window.globalLogoDataUrl = 'logo-theory.png';
            document.querySelectorAll('img[data-logo]').forEach(el => {
                el.decoding = 'async';
                el.onerror = function() {
                    if (!this.dataset.fbTried) { this.dataset.fbTried = '1'; this.src = 'logo.png'; }
                };
                if (!el.getAttribute('src') || el.getAttribute('src').includes('logo.png') && !el.dataset.fbTried) {
                    el.src = 'logo-theory.png';
                }
            });
        };
        window.loadTransparentLogo();

        // 3. تحديث عناوين المتصفح في PAGE_TITLES_MAP
        if (typeof PAGE_TITLES_MAP !== 'undefined') {
            PAGE_TITLES_MAP.home = 'الرئيسية | منصة تجميعات النظري MED26';
            PAGE_TITLES_MAP.atlas = 'المراجعة السريعة | تجميعات النظري MED26';
            PAGE_TITLES_MAP.custom = 'إعداد التدريب المخصص | تجميعات النظري MED26';
            PAGE_TITLES_MAP.scoreboard = 'لوحة المتصدرين Score Board | تجميعات النظري MED26';
            PAGE_TITLES_MAP.trainer = 'جلسة التدريب والاختبار | تجميعات النظري MED26';
            PAGE_TITLES_MAP.report = 'تقرير النتيجة | تجميعات النظري MED26';
            PAGE_TITLES_MAP.checklist = 'جدول ختم المحاضرات Checklist | تجميعات النظري MED26';
        }
        document.title = translateStringToTheory(document.title);

        // 4. استبدال كل المسميات النصية والـ placeholders في الصفحة
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const pTag = node.parentElement?.tagName;
            if (!pTag || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(pTag)) continue;
            if (node.parentElement.closest('#q-text, #q-answer, #mcq-container, [data-custom-site-text="1"]')) continue;
            const orig = node.nodeValue;
            if (orig && orig.trim()) {
                const updated = translateStringToTheory(orig);
                if (updated !== orig) node.nodeValue = updated;
            }
        }

        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            const ph = el.getAttribute('placeholder');
            if (ph) {
                const nextPh = translateStringToTheory(ph)
                    .replace('اكتب علامتك الخاصة لربط هذه العينة وتذكرها فوراً في الاختبار (تُحفظ تلقائياً في جهازك)...', 'اكتب ملاحظتك أو ربطك الخاص لهذا السؤال وتذكره فوراً في الاختبار (تُحفظ تلقائياً في جهازك)...')
                    .replace('اسأل المناضل أي سؤال عن هذه العينة...', 'اسأل المناضل أي سؤال عن هذا السؤال النظري...');
                if (nextPh !== ph) el.setAttribute('placeholder', nextPh);
            }
        });
    }

    // ================= 3. نافذة التبليغ عن الأخطاء =================
    function setupStudentReportUI() {
        if (!document.getElementById('student-report-modal')) {
            const modal = document.createElement('div');
            modal.id = 'student-report-modal';
            modal.dir = 'rtl';
            modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('open'); };
            modal.innerHTML = `
                <div class="app-card max-w-md w-full rounded-3xl p-5 sm:p-6 space-y-4 border-2 border-rose-400/60 shadow-2xl">
                    <div class="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                        <h3 class="font-black text-base text-rose-300 flex items-center gap-2">🚩 الإبلاغ عن خطأ في السؤال</h3>
                        <button type="button" onclick="document.getElementById('student-report-modal').classList.remove('open')" class="pill-btn px-2.5 py-1 rounded-lg text-xs">✕</button>
                    </div>
                    <div id="rep-modal-q-info" class="text-xs font-bold text-[var(--gold-bright)] bg-[var(--bg-secondary)] p-2.5 rounded-xl border border-[var(--border-color)]"></div>
                    <div class="space-y-2 text-xs font-bold">
                        <label class="block text-[var(--text-main)]">نوع الخطأ أو الملاحظة:</label>
                        <select id="rep-error-type" class="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 text-xs font-bold text-[var(--text-main)]">
                            <option value="خطأ في الإجابة النموذجية">❌ خطأ في الإجابة النموذجية</option>
                            <option value="خطأ إملائي أو نص غير واضح">✍️ خطأ إملائي أو نص ناقص</option>
                            <option value="صورة غير مطابقة أو غير واضحة">🖼️ مشكلة في الصورة المرفقة</option>
                            <option value="تصنيف المحاضرة أو المادة غير صحيح">📂 تصنيف ${IS_THEORY ? 'المحاضرة' : 'اللاب'} أو المادة غير صحيح</option>
                            <option value="ملاحظة أخرى">💡 ملاحظة أخرى</option>
                        </select>
                        <textarea id="rep-error-note" rows="3" placeholder="اكتب توضيحاً مختصراً للخطأ ليصل لفريق الأدمن فوراً..." class="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3 text-xs font-bold text-[var(--text-main)] focus:outline-none focus:border-rose-400"></textarea>
                    </div>
                    <button type="button" id="rep-submit-btn" onclick="submitStudentErrorReport()" class="w-full gold-btn py-3 rounded-2xl text-sm font-black shadow-lg">إرسال البلاغ لفريق ${IS_THEORY ? 'التجميعات' : 'العملي'} 🚩</button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const copyBtn = document.querySelector('#station-card button[onclick="copyStationLink()"]');
        if (copyBtn && copyBtn.parentElement && !document.getElementById('report-err-btn')) {
            const repBtn = document.createElement('button');
            repBtn.id = 'report-err-btn';
            repBtn.type = 'button';
            repBtn.onclick = openStudentReportModal;
            repBtn.className = 'pill-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 border-rose-400/40 flex items-center gap-1';
            repBtn.title = 'بلّغ عن خطأ في هذا السؤال';
            repBtn.innerHTML = '<span>🚩</span><span class="hidden sm:inline">بلّغ عن خطأ</span>';
            copyBtn.parentElement.insertBefore(repBtn, copyBtn);
        }
    }

    window.openStudentReportModal = function() {
        const q = (typeof currentList !== 'undefined' && currentList[currentIndex]) ? currentList[currentIndex] : null;
        if (!q) return;
        document.getElementById('rep-modal-q-info').innerText = `السؤال #${q.id} • ${q.subject} (${q.lab})`;
        document.getElementById('rep-error-note').value = '';
        document.getElementById('student-report-modal').classList.add('open');
    };

    window.submitStudentErrorReport = async function() {
        const q = (typeof currentList !== 'undefined' && currentList[currentIndex]) ? currentList[currentIndex] : null;
        if (!q) return;
        const type = document.getElementById('rep-error-type').value;
        const note = document.getElementById('rep-error-note').value.trim();
        const btn = document.getElementById('rep-submit-btn');
        btn.disabled = true; btn.innerText = '⏳ جاري الإرسال...';

        const repId = `REP_${Date.now()}_${Math.floor(100 + Math.random() * 899)}`;
        const payload = {
            id: repId, qId: q.id, subject: q.subject || '', lab: q.lab || '',
            track: q.track || CURRENT_TRACK,
            qSnippet: String(q.q || '').slice(0, 140),
            errorType: type, note: note || type,
            studentName: localStorage.getItem('med26_username') || 'طالب MED26',
            createdAt: new Date().toLocaleString('ar-SA')
        };

        try {
            await fetch(`${FB_URL}/reports/${repId}.json`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
            });
            document.getElementById('student-report-modal').classList.remove('open');
            alert('✅ تم إرسال البلاغ بنجاح إلى صندوق البلاغات في لوحة الأدمن، شكراً لمساهمتك!');
        } catch (e) {
            alert('⚠️ تعذر إرسال البلاغ، تأكد من اتصالك بالإنترنت.');
        } finally {
            btn.disabled = false; btn.innerText = `إرسال البلاغ لفريق ${IS_THEORY ? 'التجميعات' : 'العملي'} 🚩`;
        }
    };

    // ================= 4. الشاشة التحذيرية المحايدة + بوابة الاختيار (عملي ذهبي / نظري أحمر) =================
    function setupNeutralDisclaimerAndPortal() {
        if (document.body.dataset.defaultView !== 'home') return;

        if (!document.getElementById('portal-choice-modal')) {
            const portalDiv = document.createElement('div');
            portalDiv.id = 'portal-choice-modal';
            portalDiv.dir = 'rtl';
            portalDiv.innerHTML = `
                <div class="max-w-4xl w-full mx-auto space-y-6 text-center py-6">
                    <div class="space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-black text-slate-900">اختر قسم التجميعات | MED26</h2>
                        <p class="text-xs sm:text-sm font-bold text-slate-500">اختر المسار الذي ترغب بالتدرب عليه الآن</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-2">
                        <button type="button" onclick="enterPracticalPortal()" class="choice-practical-card rounded-3xl p-7 sm:p-9 text-center flex flex-col justify-between items-center space-y-5">
                            <div class="space-y-3">
                                <div class="w-20 h-20 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/50 flex items-center justify-center p-2 shadow-lg">
                                    <img src="logo.png" onerror="this.outerHTML='<span class=text-3xl>🔬</span>'" class="w-full h-full object-contain">
                                </div>
                                <div class="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-[#ebd2a4] text-xs font-extrabold">F2 OSPE • 2020 – 2025</div>
                                <h3 class="text-2xl sm:text-3xl font-black text-[#ebd2a4]">تجميعات العملي</h3>
                                <p class="text-xs sm:text-sm text-[#c4baa8] font-bold leading-relaxed">بنك محطات الـ OSPE التفاعلي، الأطلس البصري، محاكي الـ 18 محطة، وتحدي الـ 60 ثانية</p>
                            </div>
                            <span class="w-full bg-gradient-to-r from-[#e5c68e] to-[#b88f4d] text-[#181512] py-3.5 rounded-2xl text-sm sm:text-base font-black shadow-lg">دخول تجميعات العملي ⬅️</span>
                        </button>

                        <button type="button" onclick="enterTheoryPortal()" class="choice-theory-red-card rounded-3xl p-7 sm:p-9 text-center flex flex-col justify-between items-center space-y-5">
                            <div class="space-y-3">
                                <div class="w-20 h-20 mx-auto rounded-2xl bg-white/15 border border-white/40 flex items-center justify-center p-2 shadow-lg">
                                    <img src="logo-theory.png" onerror="this.outerHTML='<span class=text-3xl>📖</span>'" class="w-full h-full object-contain">
                                </div>
                                <div class="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/35 text-white text-xs font-extrabold">Theory Question Bank • MED26</div>
                                <h3 class="text-2xl sm:text-3xl font-black text-white">تجميعات النظري</h3>
                                <p class="text-xs sm:text-sm text-rose-100 font-bold leading-relaxed">بنك أسئلة المحاضرات النظرية، جدول ختم المحاضرات، محاكي الاختبارات، وتحدي الـ 60 ثانية</p>
                            </div>
                            <span class="w-full bg-white text-[#881320] py-3.5 rounded-2xl text-sm sm:text-base font-black shadow-lg">دخول تجميعات النظري ⬅️</span>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(portalDiv);
        }

        const modal = document.getElementById('disclaimer-modal');
        if (modal && modal.dataset.neutralBuilt !== '1') {
            modal.dataset.neutralBuilt = '1';
            const savedUser = (localStorage.getItem('med26_username') || '').trim();
            const usernameFieldHtml = !savedUser ? `
                <div class="max-w-md mx-auto space-y-1.5 text-right pt-1">
                    <label class="block text-xs sm:text-sm font-extrabold text-slate-800">اسم المستخدم (اختياري):</label>
                    <input type="text" id="initial-username-input" placeholder="اكتب اسمك أو لقبك هنا..." class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900 text-center">
                    <p class="text-[11px] text-slate-500 text-center font-semibold">يُستخدم هذا الاسم لحفظ تقدمك وترتيبك داخل البوابة</p>
                </div>
            ` : '';

            modal.innerHTML = `
                <div class="neutral-disc-card max-w-2xl w-full rounded-3xl px-5 py-7 sm:px-10 sm:py-10 text-center space-y-5 mx-auto relative">
                    <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl text-slate-800">🛡️</div>
                    <div class="inline-block px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-extrabold">تنويه هام وإقرار استخدام داخلي</div>
                    <div class="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-6 sm:px-7 sm:py-7 text-base sm:text-xl font-bold text-slate-800 leading-[2.25]">
                        <p>
                            أُعِدَّت هذه المنصة التدريبية من قِبَل <span class="font-black text-slate-950 underline decoration-slate-400 underline-offset-4">طلاب دفعة 26</span> ومُخصَّصةٌ <span class="font-black text-slate-950">حصراً للاستخدام الداخلي</span>،
                            <br class="hidden md:inline">
                            و<span class="inline-block font-black text-red-700 bg-red-50 px-2.5 py-0.5 mx-1 my-1 rounded-lg border border-red-200 leading-normal">يُحظر تماماً نشرها أو تداولها</span> مع <span class="font-black text-red-700">الدفعات الأخرى أو أي جهات خارجية</span>.
                        </p>
                    </div>
                    ${usernameFieldHtml}
                    <div class="pt-1">
                        <button type="button" onclick="acceptDisclaimer()" style="color:#ffffff !important;" class="w-full sm:w-80 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl text-base sm:text-lg font-black shadow-lg transition cursor-pointer">موافق</button>
                    </div>
                    <a id="stealth-disc-link" href="admin.html" class="stealth-admin-link">🔒 Admin</a>
                </div>
            `;
        }

        window.enterPracticalPortal = function() {
            sessionStorage.setItem('med26_session_agreed', '1');
            document.documentElement.classList.add('session-agreed');
            if (IS_THEORY) { window.location.href = 'index.html'; return; }
            document.getElementById('portal-choice-modal')?.classList.remove('open');
            document.body.classList.remove('modal-open');
        };

        window.enterTheoryPortal = function() {
            sessionStorage.setItem('med26_session_agreed', '1');
            document.documentElement.classList.add('session-agreed');
            if (!IS_THEORY) { window.location.href = 'theory.html'; return; }
            document.getElementById('portal-choice-modal')?.classList.remove('open');
            document.body.classList.remove('modal-open');
        };

        const prevAccept = window.acceptDisclaimer;
        window.acceptDisclaimer = function() {
            const inp = document.getElementById('initial-username-input');
            if (inp && inp.value.trim()) {
                localStorage.setItem('med26_username', inp.value.trim());
                const topTxt = document.getElementById('top-username-text');
                if (topTxt) topTxt.innerText = inp.value.trim();
            } else if (!localStorage.getItem('med26_username')) {
                const randName = 'Dr_MED26_' + Math.floor(100 + Math.random() * 899);
                localStorage.setItem('med26_username', randName);
                const topTxt = document.getElementById('top-username-text');
                if (topTxt) topTxt.innerText = randName;
            }
            const params = new URLSearchParams(window.location.search);
            if (params.get('challenge') || params.get('station') || IS_THEORY) {
                sessionStorage.setItem('med26_session_agreed', '1');
                document.documentElement.classList.add('session-agreed');
                if (typeof prevAccept === 'function') prevAccept();
                return;
            }
            const disc = document.getElementById('disclaimer-modal');
            if (disc) disc.style.display = 'none';
            sessionStorage.removeItem('med26_session_agreed');
            document.documentElement.classList.remove('session-agreed');
            document.body.classList.add('modal-open');
            document.getElementById('portal-choice-modal')?.classList.add('open');
        };
    }

    // ================= 5. مزامنة الـ Checklist (لابات للعملي / محاضرات للنظري) =================
    function syncChecklistLabs(visibleSubjects) {
        if (!Array.isArray(visibleSubjects)) return;
        const labsArr = getLabsArray();
        const rebuilt = [];
        let seq = 1;

        visibleSubjects.forEach(sub => {
            if (sub.hidden) return;
            const subName = sub.name;
            const subColor = sub.color || (IS_THEORY ? '#e11d38' : '#10b981');
            (sub.labs || []).forEach(labObj => {
                if (labObj.hidden || !labObj.name) return;
                const cleanTitle = labObj.name;

                const orig = !IS_THEORY ? ORIGINAL_CHECKLIST_SNAPSHOT.find(o => {
                    const sameSub = o.subject.toLowerCase() === subName.toLowerCase();
                    const oT = o.title.toLowerCase(), cT = cleanTitle.toLowerCase();
                    return sameSub && (oT === cT || oT.includes(cT.slice(0, 10)) || cT.includes(oT.slice(0, 10)));
                }) : null;

                rebuilt.push({
                    id: orig ? orig.id : `cl_${CURRENT_TRACK}_${slugifyId(subName)}_${slugifyId(cleanTitle)}`,
                    num: seq++,
                    subject: subName,
                    title: cleanTitle,
                    color: subColor,
                    keywords: (orig && Array.isArray(orig.keywords))
                        ? orig.keywords
                        : cleanTitle.toLowerCase().split(/\s+/).filter(w => w.length > 2)
                });
            });
        });

        labsArr.splice(0, labsArr.length, ...rebuilt);
        window.F2_OSPE_LABS = labsArr;

        window.detectStationLabId = function(station) {
            const sub = (station.sub || station.subject || '').toLowerCase().trim();
            const labRaw = (station.lab || '').toLowerCase().trim();
            const text = `${station.title || ''} ${labRaw} ${station.q || ''} ${station.a || ''}`.toLowerCase();
            const subjLabs = labsArr.filter(l => l.subject.toLowerCase() === sub || sub.includes(l.subject.toLowerCase().slice(0, 4)));
            if (subjLabs.length === 1) return subjLabs[0].id;
            const exact = subjLabs.find(l => l.title.toLowerCase() === labRaw || labRaw.includes(l.title.toLowerCase()) || l.title.toLowerCase().includes(labRaw));
            if (exact) return exact.id;
            for (const lab of subjLabs) {
                if ((lab.keywords || []).some(kw => text.includes(kw))) return lab.id;
            }
            return subjLabs.length > 0 ? subjLabs[0].id : null;
        };

        const unitWord = IS_THEORY ? 'محاضرة' : 'لاب';
        window.updateChecklistProgressUI = function() {
            const data = typeof getChecklistData === 'function' ? getChecklistData() : {};
            const totalLabs = labsArr.length;
            const checkFields = ['study1', 'rev1', 'rev2', 'rev3', 'qs'];
            let totalChecks = 0, studiedLabs = 0;

            labsArr.forEach(lab => {
                const row = data[lab.id] || {};
                if (row.study1) studiedLabs++;
                checkFields.forEach(f => { if (row[f]) totalChecks++; });
            });

            const pct = totalLabs > 0 ? Math.round((totalChecks / (totalLabs * 5)) * 100) : 0;
            const bar = document.getElementById('cl-progress-bar');
            const txt = document.getElementById('cl-progress-text');
            const badge = document.getElementById('nav-cl-badge');
            const heroLabs = document.getElementById('hero-quick-labs');

            if (bar) bar.style.width = `${pct}%`;
            if (txt) txt.innerText = totalLabs > 0
                ? `أنجزت مذاكرة ${studiedLabs} من ${totalLabs} ${unitWord} (${pct}% من إجمالي المراجعات والأسئلة) 🎉`
                : `لا توجد ${IS_THEORY ? 'محاضرات' : 'لابات'} مضافة حالياً — ستظهر تلقائياً فور إضافتها من الأدمن`;
            if (badge) badge.innerText = `${studiedLabs}/${totalLabs}`;
            if (heroLabs) heroLabs.innerText = `✅ ${studiedLabs}/${totalLabs} ${unitWord} (${totalLabs > 0 ? Math.round((studiedLabs / totalLabs) * 100) : 0}%)`;
        };

        window.updateChecklistProgressUI();

        const clModal = document.getElementById('f2-checklist-modal');
        if (clModal && !clModal.classList.contains('hidden') && typeof window.openLabChecklistModal === 'function') {
            window.openLabChecklistModal();
        }
    }

    function hookChecklistModalTitle() {
        const origOpen = window.openLabChecklistModal;
        if (typeof origOpen === 'function' && !origOpen._v8Wrapped) {
            window.openLabChecklistModal = function(...args) {
                const res = origOpen.apply(this, args);
                const modal = document.getElementById('f2-checklist-modal');
                if (modal) {
                    const count = getLabsArray().length;
                    const h2 = modal.querySelector('h2');
                    if (h2) h2.innerHTML = IS_THEORY
                        ? `✅ خطة وChecklist محاضرات النظري (${count} Lectures)`
                        : `✅ خطة وChecklist لابات F2 OSPE (${count} Labs)`;
                    if (IS_THEORY) {
                        const tbody = modal.querySelector('tbody');
                        if (tbody && count === 0) {
                            tbody.innerHTML = `<tr><td colspan="9" class="p-8 text-center text-sm font-bold text-rose-200">📚 لا توجد محاضرات نظري مضافة بعد — ستظهر هنا تلقائياً فور إضافتها من لوحة الأدمن.</td></tr>`;
                        }
                        applyTheoryVisualAndTerminologyPass();
                    }
                }
                if (typeof window.updateChecklistProgressUI === 'function') window.updateChecklistProgressUI();
                return res;
            };
            window.openLabChecklistModal._v8Wrapped = true;
        }
    }

    // ================= 6. مزامنة التدريب المخصص (المواد + المحاضرات/اللابات الفرعية) =================
    function syncCustomTrainingSection(visibleSubjects) {
        const customSubjectsEl = document.getElementById('custom-subjects');
        if (!customSubjectsEl || !Array.isArray(visibleSubjects)) return;

        const labsArr = getLabsArray();
        const subGroupWord = IS_THEORY ? 'محاضرات' : 'لابات';
        const accentColor = IS_THEORY ? '#e11d38' : '#cfa96b';

        if (visibleSubjects.length === 0) {
            customSubjectsEl.innerHTML = `<div class="col-span-full text-center py-6 px-4 rounded-xl bg-[var(--bg-card)] border border-dashed border-[var(--border-color)] text-xs font-bold text-[var(--text-muted)]">📚 لا توجد مواد مضافة في هذا القسم بعد — ستظهر تلقائياً فور إضافتها من لوحة الأدمن.</div>`;
        } else {
            customSubjectsEl.innerHTML = visibleSubjects.map(sub => {
                const subName = sub.name;
                const subColor = sub.color || accentColor;
                const subLabs = labsArr.filter(l => l.subject.toLowerCase() === subName.toLowerCase());

                return `
                    <label class="flex flex-wrap items-center gap-2 cursor-pointer font-bold text-xs sm:text-sm bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-color)]" style="border-top: 3px solid ${subColor};">
                        <input type="checkbox" class="custom-sub-main-cb w-4 h-4" style="accent-color:${accentColor}" value="${subName.replace(/"/g, '&quot;')}" checked>
                        <span class="font-black" style="color:${subColor}">${subName}</span>
                        <div class="sublabs-container-box w-full mt-2 pt-2 border-t border-slate-700/70 space-y-1 text-right" dir="rtl" onclick="event.stopPropagation()">
                            <div class="text-[11px] font-black text-[var(--gold-bright)] mb-1 flex justify-between items-center">
                                <span>${IS_THEORY ? '📖' : '🔬'} ${subGroupWord} ${subName} (${subLabs.length}):</span>
                                <button type="button" onclick="event.preventDefault();event.stopPropagation();this.closest('.sublabs-container-box').querySelectorAll('.sublab-cb').forEach(c=>c.checked=true);if(typeof updateCustomCount==='function')updateCustomCount();" class="text-[10px] underline text-emerald-400">تحديد الكل</button>
                            </div>
                            ${subLabs.map(lab => `
                                <label onclick="event.stopPropagation()" class="flex items-center justify-between gap-2 text-[11px] text-slate-200 cursor-pointer hover:text-white py-0.5 px-1.5 rounded-lg hover:bg-black/25">
                                    <input type="checkbox" class="sublab-cb w-3.5 h-3.5 rounded shrink-0" style="accent-color:${accentColor}" data-subject="${subName.replace(/"/g, '&quot;')}" data-lab-title="${lab.title.replace(/"/g, '&quot;')}" value="${lab.id}" checked>
                                    <span class="flex-1 font-semibold" dir="ltr" style="text-align:left">${lab.num}. ${lab.title}</span>
                                </label>
                            `).join('')}
                        </div>
                    </label>
                `;
            }).join('');
        }

        customSubjectsEl.querySelectorAll('.custom-sub-main-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const box = cb.closest('label')?.querySelector('.sublabs-container-box');
                if (box) box.classList.toggle('hidden', !cb.checked);
                if (typeof window.updateCustomCount === 'function') window.updateCustomCount();
            });
        });
        customSubjectsEl.querySelectorAll('.sublab-cb').forEach(cb => {
            cb.addEventListener('change', () => { if (typeof window.updateCustomCount === 'function') window.updateCustomCount(); });
        });

        window.getCustomFilteredList = function() {
            const qArr = getQuestionsArray().filter(window.isQuestionVisibleInTrack);
            const checkedSubjects = Array.from(document.querySelectorAll('#custom-subjects .custom-sub-main-cb:checked')).map(i => i.value);
            const checkedSubLabCbs = Array.from(document.querySelectorAll('#custom-subjects .sublab-cb:checked'));
            const checkedLabIds = checkedSubLabCbs.map(c => c.value);
            const checkedLabTitles = checkedSubLabCbs.map(c => (c.dataset.labTitle || '').toLowerCase());
            const hasSubLabs = document.querySelectorAll('#custom-subjects .sublab-cb').length > 0;

            const allYearVals = Array.from(document.querySelectorAll('#custom-years input')).map(i => i.value);
            const checkedYears = Array.from(document.querySelectorAll('#custom-years input:checked')).map(i => i.value);
            const catEl = document.querySelector('input[name="custom-cat"]:checked');
            const cat = catEl ? catEl.value : 'all';
            const qType = document.getElementById('custom-type')?.value || 'all';
            const highYieldOnly = !!document.getElementById('custom-highyield')?.checked;

            const checkedSubjectsLow = checkedSubjects.map(s => String(s || '').trim().toLowerCase());
            return qArr.filter(q => {
                if (!checkedSubjectsLow.includes(String(q.subject || '').trim().toLowerCase())) return false;
                if (hasSubLabs) {
                    const qLabLow = (q.lab || '').toLowerCase();
                    const labId = typeof window.detectStationLabId === 'function' ? window.detectStationLabId(q) : null;
                    const matchById = labId && checkedLabIds.includes(labId);
                    const matchByTitle = checkedLabTitles.some(t => t && (qLabLow === t || qLabLow.includes(t) || t.includes(qLabLow)));
                    if (!matchById && !matchByTitle) return false;
                }
                if (cat !== 'all' && q.category !== cat) return false;
                const yrStr = String(q.year || '').replace(/[^\d]/g, '');
                if (q.category === 'compilation' && yrStr && allYearVals.includes(yrStr) && !checkedYears.includes(yrStr)) return false;
                if (qType !== 'all' && q.type !== qType) return false;
                if (highYieldOnly && !q.highYield) return false;
                return true;
            });
        };

        if (typeof window.updateCustomCount === 'function') window.updateCustomCount();
    }

    // ================= 7. مزامنة شبكة المواد في الرئيسية + حالة النظري الفارغ + المراجعة السريعة =================
    function syncHomeSubjectsGrid(visibleSubjects) {
        const grid = document.querySelector('#view-home > .grid.grid-cols-1.md\\:grid-cols-2');
        if (!grid || !Array.isArray(visibleSubjects)) return;

        const qArr = getQuestionsArray().filter(window.isQuestionVisibleInTrack);
        const labsArr = getLabsArray();
        const checklistData = typeof getChecklistData === 'function' ? getChecklistData() : {};
        const itemUnit = IS_THEORY ? 'سؤال' : 'محطة';
        const subTagWord = IS_THEORY ? 'Lectures' : 'Labs';

        if (visibleSubjects.length === 0) {
            grid.innerHTML = `
                <div class="md:col-span-2 app-card rounded-3xl p-8 sm:p-12 text-center space-y-4 border-2 border-dashed border-[var(--gold-primary)]">
                    <img data-logo alt="MED26" class="h-16 sm:h-20 mx-auto object-contain">
                    <div class="inline-block px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-extrabold">
                        ${IS_THEORY ? '📖 قسم تجميعات النظري • MED26' : '🔬 قسم تجميعات العملي • MED26'}
                    </div>
                    <h3 class="text-xl sm:text-2xl font-black text-white">لم يتم إضافة مواد بعد في هذا القسم</h3>
                    <p class="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto font-bold leading-relaxed">
                        يعمل ${IS_THEORY ? 'فريق التجميعات (Theory Team)' : 'فريق العملي'} حالياً على إضافة المواد والمحاضرات والأسئلة من لوحة التحكم، وبمجرد نشرها ستظهر هنا تلقائياً!
                    </p>
                </div>
            `;
            if (typeof loadTransparentLogo === 'function') loadTransparentLogo();
            return;
        }

        grid.innerHTML = visibleSubjects.map((sub, sIdx) => {
            const subName = sub.name || 'SUBJECT';
            const subColor = sub.color || (IS_THEORY ? '#e11d38' : '#10b981');
            const rgb = hexToRgbTuple(subColor);
            const visibleLabs = (sub.labs || []).filter(l => !l.hidden);
            const numStr = String(sIdx + 1).padStart(2, '0');

            const subNameLow = subName.trim().toLowerCase();
            const subQs = qArr.filter(q => String(q.subject || '').trim().toLowerCase() === subNameLow);
            const doneSub = subQs.filter(q => (typeof masteredIds !== 'undefined') && masteredIds.includes(q.id)).length;
            const subPct = subQs.length ? Math.round((doneSub / subQs.length) * 100) : 0;

            const labsHtml = visibleLabs.map((labObj, lIdx) => {
                const labName = labObj.name;
                const labNameLow = labName.trim().toLowerCase();
                const labQs = subQs.filter(q => {
                    const qLabLow = String(q.lab || '').trim().toLowerCase();
                    return qLabLow === labNameLow || (labNameLow && qLabLow.includes(labNameLow));
                });
                const doneLab = labQs.filter(q => (typeof masteredIds !== 'undefined') && masteredIds.includes(q.id)).length;
                const labPct = labQs.length ? Math.round((doneLab / labQs.length) * 100) : 0;
                const spanCls = (visibleLabs.length === 1 || (visibleLabs.length % 2 === 1 && lIdx === visibleLabs.length - 1)) ? 'sm:col-span-2' : '';

                const clObj = labsArr.find(l => l.subject.trim().toLowerCase() === subNameLow && l.title.trim().toLowerCase() === labNameLow);
                const isCheckedInCl = clObj && checklistData[clObj.id] && checklistData[clObj.id].study1;

                let inlineStyle = '';
                let countLabel = `${labQs.length} ${itemUnit}`;
                if ((labQs.length > 0 && labPct === 100) || isCheckedInCl) {
                    inlineStyle = `background: linear-gradient(135deg, rgba(${rgb}, 0.36) 0%, rgba(${rgb}, 0.2) 100%); border-color: ${subColor}; color: #ffffff;`;
                    countLabel = `✅ ${doneLab}/${labQs.length}`;
                } else if (doneLab > 0) {
                    inlineStyle = `background: linear-gradient(to left, rgba(${rgb}, 0.28) ${labPct}%, var(--bg-secondary) ${labPct}%); border-color: rgba(${rgb}, 0.65);`;
                    countLabel = `${doneLab}/${labQs.length} (${labPct}%)`;
                }

                const safeSub = subName.replace(/'/g, "\\'");
                const safeLab = labName.replace(/'/g, "\\'");
                return `
                    <button onclick="startTraining({subject:'${safeSub}', lab:'${safeLab}'})" style="${inlineStyle}" class="pill-btn py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-right flex justify-between items-center ${spanCls}">
                        <span>${lIdx + 1}. ${labName}</span>
                        <span class="text-[11px] opacity-85 shrink-0 mr-2">${countLabel}</span>
                    </button>
                `;
            }).join('');

            const safeSubAttr = subName.replace(/'/g, "\\'");
            return `
                <div class="app-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between" style="border-top: 4px solid ${subColor}; background-image: radial-gradient(circle at 15% 15%, rgba(${rgb}, 0.14), transparent 56%);">
                    <img data-logo alt="" class="card-watermark">
                    <div class="z-10">
                        <div class="flex justify-between items-center pb-3">
                            <div class="flex items-center gap-3">
                                <span class="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shrink-0" style="background: rgba(${rgb}, 0.18); color: ${subColor}; border: 1px solid rgba(${rgb}, 0.45);">${numStr}</span>
                                <div>
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <h3 class="text-lg sm:text-2xl font-black tracking-wide">${subName}</h3>
                                        <span class="text-[10px] px-2 py-0.5 rounded-full font-extrabold" style="background: rgba(${rgb}, 0.18); color: ${subColor}; border: 1px solid rgba(${rgb}, 0.45);">${visibleLabs.length} ${subTagWord}</span>
                                    </div>
                                    <p class="text-xs text-[var(--text-muted)]">${subQs.length} ${itemUnit} في البنك</p>
                                </div>
                            </div>
                            <img data-logo alt="MED26" class="h-8 sm:h-10 opacity-90">
                        </div>

                        <div class="bg-[var(--bg-secondary)] rounded-xl p-2.5 border border-[var(--border-color)] mb-3">
                            <div class="flex justify-between text-[11px] font-bold mb-1">
                                <span class="text-[var(--gold-bright)]">نسبة الإنجاز:</span>
                                <span>أتقنت ${doneSub} من ${subQs.length} ${itemUnit} (${subPct}%)</span>
                            </div>
                            <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                                <div class="h-full transition-all duration-500" style="width: ${subPct}%; background: ${subColor};"></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 ${visibleLabs.length > 1 ? 'sm:grid-cols-2' : ''} gap-2">${labsHtml}</div>
                    </div>

                    <div class="mt-5 pt-3.5 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-3 gap-2 z-10">
                        <button onclick="startTraining({subject:'${safeSubAttr}', category:'all'})" class="gold-btn py-2.5 px-3 rounded-xl text-xs sm:text-sm text-center">1- بدء تدريب ${subName} بالكامل</button>
                        <button onclick="startTraining({subject:'${safeSubAttr}', category:'compilation'})" class="pill-btn py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center">2- التجميعات فقط</button>
                        <button onclick="startTraining({subject:'${safeSubAttr}', category:'practice'})" class="pill-btn py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center">3- التدريبات فقط</button>
                    </div>
                </div>
            `;
        }).join('');

        if (typeof loadTransparentLogo === 'function') loadTransparentLogo();
    }

    function syncAtlasSubjectFilters(visibleSubjects) {
        const bar = document.getElementById('atlas-filter-bar');
        if (!bar || !Array.isArray(visibleSubjects)) return;
        const curr = (typeof currentAtlasFilter !== 'undefined') ? currentAtlasFilter : 'ALL';
        bar.innerHTML = `<button onclick="filterAtlas('ALL')" data-sub="ALL" class="pill-btn ${curr === 'ALL' ? 'active' : ''} px-3.5 py-2 rounded-xl text-xs font-bold">الكل</button>` +
            visibleSubjects.map(s => {
                const safeSub = s.name.replace(/'/g, "\\'");
                return `<button onclick="filterAtlas('${safeSub}')" data-sub="${s.name.replace(/"/g, '&quot;')}" class="pill-btn ${curr === s.name ? 'active' : ''} px-3.5 py-2 rounded-xl text-xs font-bold">${s.name}</button>`;
            }).join('');
    }

    // ================= 8. سؤال اليوم السريع + المراجعة السريعة + بطاقة النتيجة الحمراء في النظري =================
    function hookTheorySpecialFeatures() {
        // سؤال اليوم السريع (يعمل مع الأسئلة النظرية حتى لو بدون صور!)
        window.pickRandomSpotOfTheDay = function(forceRandom = false) {
            const visibleQs = getQuestionsArray().filter(window.isQuestionVisibleInTrack);
            const pool = IS_THEORY ? visibleQs : visibleQs.filter(q => !q.noSample);
            const imgEl = document.getElementById('spot-day-img');
            const imgWrap = imgEl?.parentElement;
            const subEl = document.getElementById('spot-day-sub');
            const qEl = document.getElementById('spot-day-q');
            const ansBox = document.getElementById('spot-day-ans');
            const revBtn = document.getElementById('spot-day-reveal-btn');

            if (!pool.length) {
                window.currentSpotStation = null;
                if (imgWrap) imgWrap.classList.add('hidden');
                if (subEl) subEl.innerText = IS_THEORY ? 'بانتظار إضافة أسئلة النظري' : 'لا توجد عينات';
                if (qEl) { qEl.dir = 'rtl'; qEl.style.textAlign = 'center'; qEl.innerText = '⏳ سيتم عرض سؤال اليوم هنا تلقائياً فور إضافة أول سؤال من لوحة الأدمن.'; }
                if (revBtn) revBtn.classList.add('hidden');
                if (ansBox) ansBox.classList.add('hidden');
                return;
            }

            if (!forceRandom) {
                const daySeed = new Date().getDate() + new Date().getMonth() * 31;
                window.currentSpotStation = pool[daySeed % pool.length];
            } else {
                window.currentSpotStation = pool[Math.floor(Math.random() * pool.length)];
            }

            const q = window.currentSpotStation;
            if (!q || !qEl) return;
            const hasImg = !!q.customImage || (!q.noSample && !IS_THEORY);
            if (imgWrap) imgWrap.classList.toggle('hidden', !hasImg);
            if (hasImg && imgEl) window.setSlideSource(imgEl, q.page, q.slot || 0, false);
            if (subEl) subEl.innerText = `${q.subject} • ${q.lab} (${q.year || ''})`;
            qEl.dir = 'ltr'; qEl.style.textAlign = 'left';
            qEl.innerText = q.q;
            if (ansBox) { ansBox.innerHTML = q.a; ansBox.classList.add('hidden'); }
            if (revBtn) revBtn.classList.remove('hidden');
        };

        // المراجعة السريعة (الأطلس) في النظري تعرض جميع أسئلة النظري النصية والمصورة
        if (IS_THEORY) {
            const origRenderAtlas = window.renderAtlasGrid;
            window.renderAtlasGrid = function() {
                const grid = document.getElementById('atlas-grid');
                if (!grid) return;
                const query = (document.getElementById('atlas-search')?.value || '').toLowerCase().trim();
                const filtered = getQuestionsArray().filter(q => {
                    if (!window.isQuestionVisibleInTrack(q)) return false;
                    if (typeof currentAtlasFilter !== 'undefined' && currentAtlasFilter !== 'ALL' && String(q.subject || '').trim().toLowerCase() !== String(currentAtlasFilter).trim().toLowerCase()) return false;
                    if (query && !(q.q || '').toLowerCase().includes(query) && !(q.a || '').toLowerCase().includes(query) && !(q.lab || '').toLowerCase().includes(query)) return false;
                    return true;
                });

                if (!filtered.length) {
                    grid.innerHTML = `<div class="col-span-full text-center py-10 text-sm font-bold text-[var(--text-muted)]">📖 لا توجد أسئلة نظري مضافة بعد للمراجعة السريعة.</div>`;
                    return;
                }

                grid.innerHTML = filtered.map(q => {
                    const imgHtml = q.customImage
                        ? `<div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2 flex items-center justify-center"><img src="${q.customImage}" loading="lazy" onclick="openZoomModal(this.src)" class="w-full h-40 object-contain rounded-lg cursor-zoom-in"></div>`
                        : '';
                    return `
                        <div class="app-card rounded-2xl p-4 flex flex-col justify-between space-y-3">
                            <div class="space-y-2.5">
                                <div class="flex justify-between items-center gap-1">
                                    <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-rose-500/20 text-rose-200 border border-rose-400/40">${q.subject}</span>
                                    <span class="text-[11px] text-[var(--text-muted)] font-bold truncate">${q.lab} (${q.year || ''})</span>
                                </div>
                                ${imgHtml}
                                <div class="text-xs sm:text-sm font-extrabold text-white text-left leading-relaxed" dir="ltr">${q.q}</div>
                                <div class="bg-emerald-950/35 border border-emerald-500/40 rounded-xl p-3 text-left text-xs font-bold leading-relaxed" dir="ltr">${q.a}</div>
                            </div>
                            <div class="flex justify-end pt-2 border-t border-[var(--border-color)]">
                                <button onclick="openStationFromAtlas(${q.id})" class="gold-btn px-3.5 py-1.5 rounded-xl text-xs font-black">تدرّب على السؤال ⬅️</button>
                            </div>
                        </div>
                    `;
                }).join('');
            };

            // استئناف الجلسة الأخيرة للنظري بشكل منفصل عن العملي
            window.saveLastSessionState = function() {
                if (document.getElementById('view-trainer')?.classList.contains('hidden')) return;
                const q = currentList[currentIndex];
                if (!q) return;
                localStorage.setItem('med26_theory_last_session', JSON.stringify({
                    title: document.getElementById('trainer-title')?.innerText || q.subject,
                    subject: q.subject, lab: q.lab, stationId: q.id, index: currentIndex,
                    ids: currentList.map(i => i.id), savedAt: Date.now()
                }));
                window.updateContinueSessionBtnUI();
            };

            window.updateContinueSessionBtnUI = function() {
                const subTxt = document.getElementById('continue-session-subtext');
                if (!subTxt) return;
                try {
                    const st = JSON.parse(localStorage.getItem('med26_theory_last_session') || 'null');
                    if (st && st.ids?.length) {
                        subTxt.innerText = `${st.subject} • ${st.lab} (السؤال ${(st.index || 0) + 1} من ${st.ids.length})`;
                        return;
                    }
                } catch (e) {}
                subTxt.innerText = 'ابدأ بالأسئلة الأكثر تكراراً في النظري (High-Yield)';
            };

            window.resumeLastSession = function() {
                try {
                    const st = JSON.parse(localStorage.getItem('med26_theory_last_session') || 'null');
                    const list = (st?.ids || []).map(id => getQuestionsArray().find(q => q.id === id && window.isQuestionVisibleInTrack(q))).filter(Boolean);
                    if (list.length) {
                        currentList = list; currentIndex = Math.min(st.index || 0, list.length - 1);
                        isExamSimulator = false; isBlitzMode = false; activeTimerSeconds = 0; sessionResults = {}; sessionStartTime = Date.now();
                        document.getElementById('trainer-title').innerText = st.title || 'استئناف الجلسة السابقة';
                        switchView('trainer'); renderQuestion(); return;
                    }
                } catch (e) {}
                startTraining({ highYield: true });
            };

            // بطاقة النتيجة الفخمة بالهوية الحمراء عند الحفظ كصورة
            window.downloadScoreCardImage = function() {
                const canvas = document.createElement('canvas');
                canvas.width = 1080; canvas.height = 680;
                const ctx = canvas.getContext('2d');
                const grad = ctx.createLinearGradient(0, 0, 1080, 680);
                grad.addColorStop(0, '#5c0c14'); grad.addColorStop(0.5, '#1b070a'); grad.addColorStop(1, '#4a0b13');
                ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 680);
                ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 5; ctx.strokeRect(28, 28, 1024, 624);
                ctx.fillStyle = '#fda4af'; ctx.font = 'bold 28px Cairo, sans-serif'; ctx.textAlign = 'center';
                ctx.fillText('MED26 THEORY QUESTION BANK • OFFICIAL SCORE CARD', 540, 105);
                ctx.fillStyle = '#ffffff'; ctx.font = '900 96px Cairo, Arial, sans-serif';
                ctx.fillText(document.getElementById('report-score-20').innerText, 540, 260);
                ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 30px Cairo, sans-serif';
                ctx.fillText(document.getElementById('report-score-badge').innerText, 540, 330);
                const boxes = [
                    { label: 'الأسئلة الصحيحة', val: document.getElementById('sc-correct').innerText, x: 220 },
                    { label: 'أعلى سلسلة (Combo)', val: document.getElementById('sc-streak').innerText, x: 540 },
                    { label: 'الوقت المستغرق', val: document.getElementById('sc-time').innerText, x: 860 }
                ];
                boxes.forEach(b => {
                    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(b.x - 135, 390, 270, 130);
                    ctx.strokeStyle = 'rgba(251, 113, 133, 0.5)'; ctx.strokeRect(b.x - 135, 390, 270, 130);
                    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 40px Cairo, sans-serif'; ctx.fillText(b.val, b.x, 455);
                    ctx.fillStyle = '#fecdd3'; ctx.font = 'bold 20px Cairo, sans-serif'; ctx.fillText(b.label, b.x, 498);
                });
                ctx.fillStyle = '#fecdd3'; ctx.font = 'bold 22px Arial, sans-serif';
                ctx.fillText('MED26 JAZAN UNIVERSITY  •  Done by Lester Crest', 540, 595);
                const link = document.createElement('a');
                link.download = 'MED26_Theory_ScoreCard.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
        }
    }

    // ================= 9. إبقاء المناضل AI شغالاً دائماً + حذف الردود الجاهزة عند التحديد =================
    function cleanupAlMunadilUI() {
        // 1. حذف رد المناضل (Viva Follow-up) أسفل الإجابة في الموقعين نهائياً
        document.getElementById('munadil-viva-followup-card')?.remove();

        // 2. حذف زر "اشرح لي يا المناضل" الجاهز داخل صندوق الإجابة
        document.querySelectorAll('#answer-box button').forEach(btn => {
            if ((btn.innerText || '').includes('اشرح لي يا المناضل')) btn.remove();
        });

        // 3. حذف أزرار الردود الجاهزة وعنوانها داخل نافذة المناضل (مع إبقاء مربع الكتابة وزر الإرسال اليدوي)
        const drawer = document.getElementById('ai-tutor-drawer');
        if (drawer) {
            const presetGrid = drawer.querySelector('.grid.grid-cols-2');
            if (presetGrid) {
                const prevTitle = presetGrid.previousElementSibling;
                if (prevTitle && (prevTitle.innerText || '').includes('اطلب من')) {
                    prevTitle.style.display = 'none';
                }
                presetGrid.style.display = 'none';
            }
        }
    }

    function setupAlMunadilAiHooks() {
        cleanupAlMunadilUI();

        // تعطيل إنشاء كرت الـ Viva أسفل الإجابة في الموقعين (العملي والنظري)
        window.injectVivaFollowupBox = function() {
            document.getElementById('munadil-viva-followup-card')?.remove();
        };

        // تعطيل دالة الردود الجاهزة نهائياً (الشات اليدوي عبر sendCustomAiMessage يبقى شغالاً 100%)
        window.askAiPreset = function() {
            if (typeof window.openAiTutor === 'function') window.openAiTutor();
            document.getElementById('ai-custom-input')?.focus();
        };

        // إبقاء مربع "المناضل | متابع للمحطة #..." لتجميعات العملي فقط، وحذفه من النظري وبقية الأقسام
        const attachContextFilter = () => {
            const prevUpdateCtx = window.updateAiTutorStationContext;
            if (typeof prevUpdateCtx === 'function' && !prevUpdateCtx._v9Filtered) {
                window.updateAiTutorStationContext = function() {
                    cleanupAlMunadilUI();
                    const chatBox = document.getElementById('ai-chat-messages');
                    const label = document.getElementById('ai-current-station-label');
                    const isTrainerOpen = !document.getElementById('view-trainer')?.classList.contains('hidden');
                    const q = (isTrainerOpen && Array.isArray(currentList)) ? currentList[currentIndex] : null;

                    const isPracticalCompilation = !IS_THEORY && q && (q.track || 'practical') === 'practical' && q.category === 'compilation';

                    if (isPracticalCompilation) {
                        prevUpdateCtx.apply(this, arguments);
                        // حذف جملة الأزرار الجاهزة من التذييل مع إبقاء مربع المتابعة كما هو
                        chatBox?.querySelectorAll('p').forEach(p => {
                            if ((p.innerText || '').includes('Viva') || (p.innerText || '').includes('اضغط على')) {
                                p.innerText = 'اكتب أي سؤال يدوي في الخانة بالأسفل وسأشرحه لك فوراً!';
                            }
                        });
                        return;
                    }

                    // في النظري والتدريبات (مثل #1003): إزالة مربع "متابع للمحطة" بالكامل وترك الشات نظيفاً للأسئلة اليدوية
                    if (label) {
                        label.innerText = q ? `${q.subject} • ${q.lab}` : 'جاهز لأسئلتك اليدوية';
                    }
                    if (chatBox && chatBox.dataset.lastStationId !== String(q ? q.id : 'none')) {
                        chatBox.dataset.lastStationId = String(q ? q.id : 'none');
                        chatBox.innerHTML = '';
                    }
                };
                window.updateAiTutorStationContext._v9Filtered = true;
            }
        };

        window.addEventListener('DOMContentLoaded', () => {
            cleanupAlMunadilUI();
            setTimeout(() => { cleanupAlMunadilUI(); attachContextFilter(); }, 80);
            setTimeout(() => { cleanupAlMunadilUI(); attachContextFilter(); }, 600);
        });
        setTimeout(() => { cleanupAlMunadilUI(); attachContextFilter(); }, 300);
    }

    // ================= 10. المزامنة السحابية الشاملة =================
    function mergeDynamicStationsInPlace(list) {
        if (!Array.isArray(list) || !list.length) return;
        const qArr = getQuestionsArray();
        list.forEach(st => {
            if (!st || !st.id) return;
            const idx = qArr.findIndex(q => q.id === st.id);
            if (idx !== -1) qArr[idx] = st;
            else qArr.push(st);
        });
    }

   let liveCountdownInterval = null;
    let activeExamTargetMs = null;
    window.MED26_SITE_SETTINGS_CACHE = null;

    function parseLocalExamDateMs(dateStr) {
        if (!dateStr) return NaN;
        const m = String(dateStr).trim().match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/);
        if (m) {
            return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6] || 0)).getTime();
        }
        return new Date(dateStr).getTime();
    }

    function takeOverCountdownDom() {
        if (document.getElementById('med26-live-cd-days')) return true;
        const dEl = document.getElementById('cd-days');
        const hEl = document.getElementById('cd-hours');
        const mEl = document.getElementById('cd-mins');
        const sEl = document.getElementById('cd-secs');
        if (!dEl || !hEl || !mEl || !sEl) return false;

        // إعادة تسمية العداد الحقيقي ووضع عناصر مخفية للعداد القديم لمنع تداخل الأرقام
        dEl.id = 'med26-live-cd-days';
        hEl.id = 'med26-live-cd-hours';
        mEl.id = 'med26-live-cd-mins';
        sEl.id = 'med26-live-cd-secs';

        const dummy = document.createElement('div');
        dummy.style.display = 'none';
        dummy.innerHTML = '<span id="cd-days"></span><span id="cd-hours"></span><span id="cd-mins"></span><span id="cd-secs"></span>';
        document.body.appendChild(dummy);
        return true;
    }

    function renderLiveDynamicCountdown() {
        if (!activeExamTargetMs || isNaN(activeExamTargetMs)) return;
        const dEl = document.getElementById('med26-live-cd-days');
        const hEl = document.getElementById('med26-live-cd-hours');
        const mEl = document.getElementById('med26-live-cd-mins');
        const sEl = document.getElementById('med26-live-cd-secs');
        if (!dEl || !hEl || !mEl || !sEl) return;

        const diff = Math.max(0, activeExamTargetMs - Date.now());
        dEl.innerText = String(Math.floor(diff / 86400000)).padStart(2, '0');
        hEl.innerText = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
        mEl.innerText = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        sEl.innerText = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }

    function applySiteSettingsFromCloud(cfg) {
        if (!cfg || typeof cfg !== 'object') return;
        window.MED26_SITE_SETTINGS_CACHE = cfg;

        const tCfg = (cfg[CURRENT_TRACK] && typeof cfg[CURRENT_TRACK] === 'object')
            ? cfg[CURRENT_TRACK]
            : (CURRENT_TRACK === 'practical' ? cfg : null);
        if (!tCfg) return;

        // 1. شريط الإعلان العاجل
        if (tCfg.bannerText && tCfg.bannerText.trim()) {
            let banner = document.getElementById('admin-urgent-banner');
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'admin-urgent-banner';
                banner.className = 'w-full px-4 py-2 text-center text-xs sm:text-sm font-black text-amber-200 relative z-40';
                const header = document.getElementById('main-header');
                if (header && header.parentNode) header.parentNode.insertBefore(banner, header);
            }
            banner.dataset.customSiteText = '1';
            banner.innerText = `📢 ${tCfg.bannerText.trim()}`;
            banner.classList.remove('hidden');
        } else {
            document.getElementById('admin-urgent-banner')?.classList.add('hidden');
        }

        // 2. تحديث موعد الاختبار ونص العد التنازلي وإخفاؤه/إظهاره
        const cdAnchor = document.getElementById('med26-live-cd-days') || document.getElementById('cd-days');
        const cdCard = cdAnchor ? cdAnchor.closest('.app-card') : null;
        if (cdCard) {
            cdCard.classList.toggle('hidden', !!tCfg.hideCountdown);
            if (tCfg.countdownTitle && tCfg.countdownTitle.trim()) {
                const titleSpan = Array.from(cdCard.querySelectorAll('span')).find(s => s.className.includes('font-extrabold'));
                if (titleSpan) {
                    titleSpan.dataset.customSiteText = '1';
                    titleSpan.innerText = tCfg.countdownTitle.trim();
                }
            }
        }
        if (tCfg.examDate && tCfg.examDate.trim()) {
            const parsedMs = parseLocalExamDateMs(tCfg.examDate);
            if (!isNaN(parsedMs) && takeOverCountdownDom()) {
                activeExamTargetMs = parsedMs;
                renderLiveDynamicCountdown();
                if (!liveCountdownInterval) {
                    liveCountdownInterval = setInterval(renderLiveDynamicCountdown, 1000);
                }
            }
        }

        // 3. تحديث نصوص الهيدر
        if (tCfg.headerTitle && tCfg.headerTitle.trim()) {
            const h1 = document.querySelector('#main-header h1');
            if (h1) { h1.dataset.customSiteText = '1'; h1.innerText = tCfg.headerTitle.trim(); }
        }
        if (tCfg.headerSubtitle && tCfg.headerSubtitle.trim()) {
            const hSub = document.querySelector('#main-header h1')?.parentElement?.nextElementSibling;
            if (hSub) { hSub.dataset.customSiteText = '1'; hSub.innerText = tCfg.headerSubtitle.trim(); }
        }

        // 4. تحديث نصوص الواجهة الرئيسية (الشارة + العنوان الكبير + الوصف)
        const heroCard = document.getElementById('bento-hero-upgraded') || document.getElementById('stat-total')?.closest('.app-card');
        if (heroCard) {
            if (tCfg.heroBadge && tCfg.heroBadge.trim()) {
                const badgeEl = heroCard.querySelector('.inline-flex.rounded-full');
                if (badgeEl) {
                    badgeEl.dataset.customSiteText = '1';
                    badgeEl.innerHTML = `<span>${tCfg.heroBadge.trim()}</span>`;
                }
            }
            if (tCfg.heroTitle && tCfg.heroTitle.trim()) {
                const h2 = heroCard.querySelector('h2');
                if (h2) { h2.dataset.customSiteText = '1'; h2.innerText = tCfg.heroTitle.trim(); }
            }
            if (tCfg.heroDesc && tCfg.heroDesc.trim()) {
                const descP = heroCard.querySelector('p');
                if (descP) { descP.dataset.customSiteText = '1'; descP.innerText = tCfg.heroDesc.trim(); }
            }
        }
    }

    function applyAllSyncedUI(rawSubjectsList) {
        const normalized = normalizeSubjectsList(rawSubjectsList);
        if (normalized.length > 0) {
            window.MED26_ALL_SUBJECTS = normalized;
            window.MED26_DYNAMIC_SUBJECTS = normalized.filter(s => (s.track || 'practical') === CURRENT_TRACK && !s.hidden);
        } else {
            window.MED26_DYNAMIC_SUBJECTS = [];
        }
        const visibleForTrack = window.MED26_DYNAMIC_SUBJECTS;
        syncChecklistLabs(visibleForTrack);
        syncHomeSubjectsGrid(visibleForTrack);
        syncCustomTrainingSection(visibleForTrack);
        syncAtlasSubjectFilters(visibleForTrack);
        if (typeof window.pickRandomSpotOfTheDay === 'function') window.pickRandomSpotOfTheDay(false);
        if (typeof window.updateStatsUI === 'function') window.updateStatsUI();
        if ((document.body.dataset.defaultView === 'atlas' || !document.getElementById('view-atlas')?.classList.contains('hidden')) && typeof window.renderAtlasGrid === 'function') {
            window.renderAtlasGrid();
        }
        if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
    }

    let _cloudSyncStarted = false;
    async function syncEverythingFromCloud() {
        if (_cloudSyncStarted) return;
        _cloudSyncStarted = true;

        try { mergeDynamicStationsInPlace(JSON.parse(localStorage.getItem('med26_dynamic_stations') || '[]')); } catch (e) {}
        try {
            const localSet = JSON.parse(localStorage.getItem('med26_site_settings_cache') || 'null');
            if (localSet) applySiteSettingsFromCloud(localSet);
        } catch (e) {}
        try {
            const localSubs = JSON.parse(localStorage.getItem('med26_subjects_config') || 'null');
            applyAllSyncedUI(Array.isArray(localSubs) && localSubs.length ? localSubs : DEFAULT_SUBJECTS);
        } catch (e) {}

        try {
            // فحص ملف النسخة الخفيف أولاً (~60 بايت) بدلاً من تحميل كل البيانات في كل زيارة
            let cloudVer = null;
            const verRes = await fetch(`${FB_URL}/content/version.json?t=${Date.now()}`, { cache: 'no-store' });
            if (verRes.ok) cloudVer = await verRes.json();

            const hasVer = !!(cloudVer && typeof cloudVer === 'object');
            const needStations = !hasVer || localStorage.getItem('med26_dynamic_stations') === null || String(cloudVer.stations || 0) !== localStorage.getItem('med26_ver_stations');
            const needSubjects = !hasVer || localStorage.getItem('med26_subjects_config') === null || String(cloudVer.subjects || 0) !== localStorage.getItem('med26_ver_subjects');
            const needSettings = !hasVer || localStorage.getItem('med26_site_settings_cache') === null || String(cloudVer.settings || 0) !== localStorage.getItem('med26_ver_settings');

            if (!needStations && !needSubjects && !needSettings) return;

            const [stRes, subRes, setRes] = await Promise.all([
                needStations ? fetch(`${FB_URL}/content/stations.json?t=${Date.now()}`, { cache: 'no-store' }) : Promise.resolve(null),
                needSubjects ? fetch(`${FB_URL}/content/subjects.json?t=${Date.now()}`, { cache: 'no-store' }) : Promise.resolve(null),
                needSettings ? fetch(`${FB_URL}/settings.json?t=${Date.now()}`, { cache: 'no-store' }) : Promise.resolve(null)
            ]);

            let shouldRefreshUI = false;
            if (stRes && stRes.ok) {
                const cloudDyn = await stRes.json();
                if (Array.isArray(cloudDyn)) {
                    localStorage.setItem('med26_dynamic_stations', JSON.stringify(cloudDyn));
                    mergeDynamicStationsInPlace(cloudDyn);
                    shouldRefreshUI = true;
                }
                if (hasVer) localStorage.setItem('med26_ver_stations', String(cloudVer.stations || 0));
            }
            if (subRes && subRes.ok) {
                const cloudSubs = await subRes.json();
                if (Array.isArray(cloudSubs) && cloudSubs.length > 0) {
                    localStorage.setItem('med26_subjects_config', JSON.stringify(cloudSubs));
                    applyAllSyncedUI(cloudSubs);
                    shouldRefreshUI = false;
                } else {
                    shouldRefreshUI = true;
                }
                if (hasVer) localStorage.setItem('med26_ver_subjects', String(cloudVer.subjects || 0));
            }
            if (shouldRefreshUI) applyAllSyncedUI(window.MED26_ALL_SUBJECTS);

            if (setRes && setRes.ok) {
                const cloudSet = await setRes.json();
                if (cloudSet) {
                    localStorage.setItem('med26_site_settings_cache', JSON.stringify(cloudSet));
                    applySiteSettingsFromCloud(cloudSet);
                }
                if (hasVer) localStorage.setItem('med26_ver_settings', String(cloudVer.settings || 0));
            }
        } catch (e) {}
    }

    function hookCoreTrainingFunctions() {
        const origSetSlide = window.setSlideSource;
        window.setSlideSource = function(imgEl, page, slot, isFull) {
            const qArr = getQuestionsArray();
            const q = (Array.isArray(currentList) && currentList[currentIndex]) ? currentList[currentIndex] : qArr.find(x => x.page === page);
            if (q && q.customImage) { imgEl.onerror = null; imgEl.src = isFull ? (q.fullSlideImage || q.customImage) : q.customImage; return; }
            if (typeof origSetSlide === 'function') origSetSlide(imgEl, page, slot, isFull);
        };

        const origRenderQ = window.renderQuestion;
        window.renderQuestion = function() {
            if (typeof origRenderQ === 'function') origRenderQ();
            setupStudentReportUI();
            const q = currentList && currentList[currentIndex];
            if (!q) return;

            const imgCol = document.getElementById('q-img-col');
            const textCol = document.getElementById('q-text-col');
            const hasNoSample = (!!q.noSample || IS_THEORY) && !q.customImage;
            if (imgCol && textCol) {
                imgCol.style.display = hasNoSample ? 'none' : '';
                imgCol.classList.toggle('hidden', hasNoSample);
                textCol.classList.toggle('lg:col-span-7', !hasNoSample);
                textCol.classList.toggle('lg:col-span-12', hasNoSample);
            }

            const subCfg = window.MED26_ALL_SUBJECTS.find(s => s.name.trim().toLowerCase() === String(q.subject || '').trim().toLowerCase());
            const subEl = document.getElementById('q-subject');
            if (subEl && subCfg && subCfg.color) {
                const rgb = hexToRgbTuple(subCfg.color);
                subEl.style.background = `rgba(${rgb}, 0.18)`;
                subEl.style.color = subCfg.color;
                subEl.style.border = `1px solid rgba(${rgb}, 0.45)`;
            }

            const yrEl = document.getElementById('q-year');
            if (yrEl) {
                const rawLabel = (typeof q.badgeText === 'string') ? q.badgeText.trim() : String(q.year || '').trim();
                if (!rawLabel) yrEl.classList.add('hidden');
                else { yrEl.classList.remove('hidden'); yrEl.innerText = /^\d{4}$/.test(rawLabel) ? ('دفعة ' + rawLabel) : rawLabel; }
            }

            const aiBtn = document.getElementById('ai-floating-btn');
            if (aiBtn) aiBtn.classList.remove('hidden');

            setTimeout(() => {
                const ansBox = document.getElementById('answer-box');
                if (ansBox) {
                    Array.from(ansBox.children).forEach(child => {
                        if ((child.innerText || '').includes('سؤال "المناضل" الإضافي') || (child.innerText || '').includes('Viva Follow-up')) {
                            child.style.display = (q.hideAiViva || IS_THEORY) ? 'none' : '';
                        }
                    });
                }
                if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
            }, 25);
        };

        const origStartTrain = window.startTraining;
        window.startTraining = function(opts = {}) {
            try { mergeDynamicStationsInPlace(JSON.parse(localStorage.getItem('med26_dynamic_stations') || '[]')); } catch (e) {}
            const trackQs = getQuestionsArray().filter(window.isQuestionVisibleInTrack);
            if (!trackQs.length) {
                alert(IS_THEORY ? '📖 لا توجد أسئلة نظري منشورة بعد — سيضيفها فريق التجميعات قريباً!' : 'لا توجد محطات مطابقة حالياً.');
                return;
            }
            if (opts.category === 'practice') {
                const matches = trackQs.filter(q => q.category === 'practice' && (!opts.subject || String(q.subject || '').trim().toLowerCase() === String(opts.subject).trim().toLowerCase()) && (!opts.lab || String(q.lab || '').trim().toLowerCase().includes(String(opts.lab).trim().toLowerCase())));
                if (matches.length > 0) {
                    clearInterval(timerInterval); isExamSimulator = false; isBlitzMode = false; sessionResults = {}; sessionStartTime = Date.now();
                    currentList = matches; currentIndex = 0;
                    document.getElementById('trainer-title').innerText = `🧪 تدريبات ${opts.subject || 'شاملة'} (${matches.length} ${IS_THEORY ? 'سؤال' : 'محطة'})`;
                    switchView('trainer'); renderQuestion(); return;
                }
            }
            if (typeof origStartTrain === 'function') {
                origStartTrain(opts);
                if (Array.isArray(currentList)) {
                    const filtered = currentList.filter(window.isQuestionVisibleInTrack);
                    if (!filtered.length) {
                        switchView('home');
                        alert(IS_THEORY ? 'لا توجد أسئلة نظري مطابقة لهذا الخيار حالياً.' : 'لا توجد محطات مطابقة لهذا الخيار حالياً.');
                        return;
                    }
                    if (filtered.length !== currentList.length) {
                        currentList = filtered; currentIndex = 0; renderQuestion();
                    }
                }
            }
            if (IS_THEORY) setTimeout(applyTheoryVisualAndTerminologyPass, 40);
        };

        const origSim = window.startExamSimulator;
        if (typeof origSim === 'function' && !origSim._v8Synced) {
            window.startExamSimulator = function(customList = null, customTitle = null, vsOpts = null) {
             try { mergeDynamicStationsInPlace(JSON.parse(localStorage.getItem('med26_dynamic_stations') || '[]')); } catch (e) {}
             const pool = customList || getQuestionsArray().filter(window.isQuestionVisibleInTrack).sort(() => Math.random() - 0.5).slice(0, 18);
             if (!pool.length) { alert('لا توجد أسئلة منشورة في هذا القسم لبدء المحاكي بعد!'); return; }
             const title = customTitle || (IS_THEORY ? `⏱️ محاكي الاختبار النظري (${pool.length} سؤال • من 20 درجة)` : null);
             const r = origSim.apply(this, [pool, title, vsOpts]);
                if (IS_THEORY) setTimeout(applyTheoryVisualAndTerminologyPass, 40);
                return r;
            };
            window.startExamSimulator._v8Synced = true;
        }

        const origBlitz = window.startBlitzMode;
        if (typeof origBlitz === 'function' && !origBlitz._v8Synced) {
            window.startBlitzMode = function() {
                try { mergeDynamicStationsInPlace(JSON.parse(localStorage.getItem('med26_dynamic_stations') || '[]')); } catch (e) {}
                const visibleMcqs = getQuestionsArray().filter(q => q.type === 'mcq' && window.isQuestionVisibleInTrack(q)).sort(() => Math.random() - 0.5).slice(0, 25);
                if (!visibleMcqs.length) { alert('لا توجد أسئلة اختيارات (MCQ) في هذا القسم بعد لبدء تحدي الـ 60 ثانية!'); return; }
                const r = origBlitz.apply(this);
                currentList = visibleMcqs; currentIndex = 0; renderQuestion();
                if (IS_THEORY) setTimeout(applyTheoryVisualAndTerminologyPass, 40);
                return r;
            };
            window.startBlitzMode._v8Synced = true;
        }

        const origUpdateStats = window.updateStatsUI;
        window.updateStatsUI = function(...args) {
            const r = typeof origUpdateStats === 'function' ? origUpdateStats.apply(this, args) : undefined;
            const visibleQs = getQuestionsArray().filter(window.isQuestionVisibleInTrack);
            const visIds = new Set(visibleQs.map(q => q.id));

            const mCount = (typeof masteredIds !== 'undefined' ? masteredIds : []).filter(id => visIds.has(id)).length;
            const kCount = (typeof mistakeIds !== 'undefined' ? mistakeIds : []).filter(id => visIds.has(id)).length;
            const bCount = (typeof bookmarkIds !== 'undefined' ? bookmarkIds : []).filter(id => visIds.has(id)).length;

            const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
            setTxt('stat-total', visibleQs.length);
            setTxt('stat-mastered', mCount);
            setTxt('stat-mistakes', kCount);
            setTxt('stat-bookmarks', bCount);
            setTxt('mistake-count-btn', kCount);
            setTxt('fav-count-btn', bCount);
            setTxt('mob-fav-count', bCount);

            syncHomeSubjectsGrid(window.MED26_DYNAMIC_SUBJECTS);
            if (typeof window.updateChecklistProgressUI === 'function') window.updateChecklistProgressUI();
            if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
            return r;
        };

        const origSaveCl = window.saveChecklistItem;
        if (typeof origSaveCl === 'function' && !origSaveCl._v8Wrapped) {
            window.saveChecklistItem = function(...args) {
                const r = origSaveCl.apply(this, args);
                syncHomeSubjectsGrid(window.MED26_DYNAMIC_SUBJECTS);
                return r;
            };
            window.saveChecklistItem._v8Wrapped = true;
        }
    }

    function setupAdminAndTrackSwitchLinks() {
        const footerEl = document.querySelector('footer');
        if (footerEl && !document.getElementById('stealth-footer-link')) {
            footerEl.style.position = 'relative';
            const a2 = document.createElement('a');
            a2.id = 'stealth-footer-link'; a2.href = 'admin.html'; a2.className = 'stealth-admin-link'; a2.innerText = '🔒';
            footerEl.appendChild(a2);
        }

        // زر سريع للتبديل بين العملي والنظري في الهيدر
        const headerRow = document.querySelector('#main-header > div');
        if (headerRow && !document.getElementById('switch-portal-track-btn')) {
            const swBtn = document.createElement('a');
            swBtn.id = 'switch-portal-track-btn';
            swBtn.href = IS_THEORY ? 'index.html' : 'theory.html';
            swBtn.onclick = () => sessionStorage.setItem('med26_session_agreed', '1');
            swBtn.className = 'pill-btn px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5';
            swBtn.innerHTML = IS_THEORY ? '<span>🔬</span><span>قسم العملي</span>' : '<span>📖</span><span>قسم النظري</span>';
            headerRow.insertBefore(swBtn, headerRow.children[1]);
        }

        if (sessionStorage.getItem('med26_admin_unlocked') === '1') {
            if (headerRow && !document.getElementById('admin-top-access-btn')) {
                const topBtn = document.createElement('a');
                topBtn.id = 'admin-top-access-btn'; topBtn.href = 'admin.html';
                topBtn.className = 'gold-btn px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg';
                topBtn.innerHTML = '<span>⚡</span><span>لوحة الـ Admin</span>';
                headerRow.insertBefore(topBtn, headerRow.children[1]);
            }
        }
    }

    window.addEventListener('keydown', function(e) {
        if (e.altKey && e.key.toLowerCase() === 'a') { e.preventDefault(); window.location.href = 'admin.html'; return; }
        const activeEl = document.activeElement;
        if (activeEl && (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) || activeEl.isContentEditable)) { e.stopImmediatePropagation(); return; }
        const trainerHidden = document.getElementById('view-trainer')?.classList.contains('hidden');
        if (!trainerHidden && !e.ctrlKey && (e.code === 'Space' || e.key.toLowerCase() === 'b' || ['1','2','3','4'].includes(e.key))) {
            e.stopImmediatePropagation();
        } else if (!trainerHidden && e.ctrlKey && e.key.toLowerCase() === 'b') {
            e.preventDefault(); e.stopImmediatePropagation(); if (typeof toggleBookmarkCurrent === 'function') toggleBookmarkCurrent();
        } else if (!trainerHidden && e.ctrlKey && e.code === 'Space') {
            e.preventDefault(); e.stopImmediatePropagation(); if (typeof revealAnswer === 'function') revealAnswer();
        }
    }, true);

    injectSharedStyles();
    setupNeutralDisclaimerAndPortal();
    setupStudentReportUI();
    hookChecklistModalTitle();
    hookTheorySpecialFeatures();
    setupAlMunadilAiHooks();
    hookCoreTrainingFunctions();

   function applyLesterCrestCredits() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const pTag = node.parentElement?.tagName;
            if (!pTag || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(pTag)) continue;
            const raw = node.nodeValue || '';
            if (/Done by\s+(Practical Team|Theory Team)/i.test(raw)) {
                node.nodeValue = raw.replace(/Done by\s+(Practical Team|Theory Team)/gi, 'Done by Lester Crest');
            } else if (/^\s*(Practical Team|Theory Team)\s*$/i.test(raw)) {
                const parentTxt = node.parentElement?.parentElement?.textContent || '';
                if (/Done by/i.test(parentTxt)) {
                    node.nodeValue = raw.replace(/(Practical Team|Theory Team)/gi, 'Lester Crest');
                }
            }
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        setupNeutralDisclaimerAndPortal();
        setupStudentReportUI();
        setupAdminAndTrackSwitchLinks();
        syncEverythingFromCloud();
        if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
        applyLesterCrestCredits();
    });
    setTimeout(() => {
        setupStudentReportUI();
        setupAdminAndTrackSwitchLinks();
        syncEverythingFromCloud();
        if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
        applyLesterCrestCredits();
    }, 350);
    setTimeout(() => {
        if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
        applyLesterCrestCredits();
    }, 950);
    setTimeout(() => {
        if (IS_THEORY) applyTheoryVisualAndTerminologyPass();
        applyLesterCrestCredits();
    }, 1800);
})();
