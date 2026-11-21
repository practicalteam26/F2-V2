/* ================= MED26 Unified Core Engine (core.js) ================= */
var FIREBASE_BASE_URL = 'https://med26-f2-ospe-default-rtdb.firebaseio.com';
var FIXED_EXAM_DATE = '2026-12-27T08:00:00';
var globalLivePlayers = [];
var globalLogoDataUrl = 'logo.png';

var currentList = typeof questionsDB !== 'undefined' ? [...questionsDB] : [];
var currentIndex = 0;
var showingFullSlide = false;
var timerInterval = null;
var timeLeft = 90;
var activeTimerSeconds = 0;
var isExamSimulator = false;
var isBlitzMode = false;
var currentStationAnswered = false;
var sessionResults = {};
var sessionStartTime = Date.now();
var currentStreak = 0;
var maxSessionStreak = 0;
var currentAtlasFilter = 'ALL';
var currentSpotStation = null;

var loupeActive = false;
var currentRotation = 0;
var enhanceLevel = 0;

var masteredIds = JSON.parse(localStorage.getItem('med26_f2_mastered') || '[]');
var mistakeIds = JSON.parse(localStorage.getItem('med26_f2_mistakes') || '[]');
var bookmarkIds = JSON.parse(localStorage.getItem('med26_f2_bookmarks') || '[]');
var personalNotes = JSON.parse(localStorage.getItem('med26_f2_notes') || '{}');

var PAGE_TITLES_MAP = {
    home: 'الرئيسية | منصة OSPE التفاعلية MED26',
    atlas: 'الأطلس البصري ومفاتيح البصم | MED26 OSPE',
    custom: 'إعداد التدريب المخصص | MED26 OSPE',
    scoreboard: 'لوحة المتصدرين Score Board | MED26 OSPE',
    trainer: 'جلسة التدريب والاختبار | MED26 OSPE',
    report: 'تقرير النتيجة ونقاط الضعف | MED26 OSPE',
    'no-practice': 'قسم التدريبات العملية | MED26 OSPE',
    checklist: 'جدول ختم اللابات Checklist | MED26 OSPE'
};
var MULTI_PAGE_FILES = { home: 'index.html', atlas: 'atlas.html', custom: 'custom.html', scoreboard: 'scoreboard.html' };
var MED26_ADHKAR_LIST = [
    // آيات قرآنية للتوفيق والطمأنينة وطلب العلم
    "📖 ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾",
    "📖 ﴿رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي﴾",
    "📖 ﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾",
    "📖 ﴿إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾",
    "📖 ﴿وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ﴾",
    "📖 ﴿وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ﴾",
    "📖 ﴿إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا﴾",
    "📖 ﴿وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ۝ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ﴾",
    "📖 ﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾",
    "📖 ﴿لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا﴾",
    "📖 ﴿لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ﴾",
    "📖 ﴿وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ﴾",
    "📖 ﴿وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ﴾",
    "📖 ﴿إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ﴾",

    // أذكار وأدعية المذاكرة والاختبارات
    "🌿 سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    "✨ اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    "🤲 اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    "💎 لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    "🕋 لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    "🌱 أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    "👑 حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    "💡 اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
    "🌟 سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ",
    "🤍 يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    "🌙 لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    "🤲 اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    "🌿 سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    "✨ اللَّهُمَّ بَارِكْ لِي فِي وَقْتِي وَجُهْدِي وَارْزُقْنِي التَّوْفِيقَ وَالسَّدَادَ"
];
var BUZZWORDS_DATA = [
    ['Tonsillitis + Exudate + Cocci in chains', 'Streptococcus pyogenes (Beta)'],
    ['Yellow colonies on Mannitol Salt Agar (MSA)', 'Staphylococcus aureus'],
    ['Arrow-head hemolysis (Positive CAMP test)', 'Streptococcus agalactiae'],
    ['Indole (-), MR (-), VP (+), Citrate (+ Blue)', 'Klebsiella pneumoniae'],
    ['Indole (+), MR (+), VP (-), Citrate (- Green)', 'Escherichia coli (E. coli)'],
    ['Bright Pink Slant + H2S Blackening', 'Urease (+) • Proteus mirabilis'],
    ['Greenish pigment on Mueller-Hinton / Nutrient agar', 'Pseudomonas aeruginosa'],
    ['Egg with Terminal Spine in Urine', 'Schistosoma haematobium'],
    ['Perianal swab (NIH swab) flattened D-shaped egg', 'Enterobius vermicularis'],
    ['Alternating red & pale hepatic areas (Nutmeg liver)', 'CVC of Liver (Right heart failure)'],
    ['Black carbon pigment in lung tissue', 'Pulmonary Anthracosis'],
    ['Orange peel skin + Nipple retraction + Redness', "Peau d'orange (Breast Cancer)"]
];

var currentDhikrIdx = 0;
var pomoTimeLeft = parseInt(localStorage.getItem('med26_pomo_custom_min') || '25', 10) * 60;
var pomoTotalTime = pomoTimeLeft;
var pomoInterval = null;
var pomoIsRunning = false;
var pomoMode = 'focus';
var isHandlingRouteChange = false;
var noteSaveTimeout = null;
var lastScoreboardFetchTime = 0;
var isFetchingScores = false;
var prevCohortSnapshot = {};
var cohortToastTimer = null;
var initialPulseShown = false;

if (localStorage.getItem('med26_theme_mode') === 'light') {
    document.body.classList.add('light-mode');
}

function formatPomoTime(sec) {
    return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

// ================= 1. بناء هيكل الواجهة الموحّد لجميع الصفحات =================
(function mountUnifiedAppShell() {
    const root = document.getElementById('app-root');
    if (!root) return;

    const defView = document.body.dataset.defaultView || 'home';
    const isSubPage = defView !== 'home';
    const savedUser = localStorage.getItem('med26_username') || 'طالب MED26';
    const t1 = localStorage.getItem('med26_tasbeeh_1') || '0';
    const t2 = localStorage.getItem('med26_tasbeeh_2') || '0';
    const t3 = localStorage.getItem('med26_tasbeeh_3') || '0';
    const t4 = localStorage.getItem('med26_tasbeeh_4') || '0';
    const pomoHidden = localStorage.getItem('med26_hide_pomo') === '1' ? 'hidden' : '';

    const marqueeHtml = [
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-[var(--gold-bright)]">📖 ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-black text-white" dir="ltr">✨ Done by <span class="kw-highlight">Lester Crest</span> • MED26</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-emerald-300">📖 ﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-[var(--gold-bright)]">🌿 سُبْحَانَ اللَّهِ وَبِحَمْدِهِ • سُبْحَانَ اللَّهِ الْعَظِيمِ</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-amber-300">📖 ﴿وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ﴾</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-black text-white" dir="ltr">🏛️ MED26 JAZAN UNIVERSITY • FOUNDATION 2 OSPE</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-emerald-300">🤲 اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-[var(--gold-bright)]">📖 ﴿إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا﴾</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-amber-300">✨ اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-emerald-300">📖 ﴿إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾</span>`,
        `<span class="mx-6 text-xs sm:text-sm font-black text-white" dir="ltr">⚡ Done by <span class="kw-highlight">Lester Crest</span></span>`,
        `<span class="mx-6 text-xs sm:text-sm font-extrabold text-[var(--gold-bright)]">💎 لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ</span>`
    ].join('');

    const dhikrBar = (id) => `
        <div id="${id}" onclick="rotateGlobalAdhkar()" class="cursor-pointer app-card rounded-2xl px-4 py-2.5 border border-amber-500/35 flex justify-between items-center gap-2 text-xs font-extrabold">
            <div class="flex items-center gap-2"><span>🤲</span><span class="text-emerald-300">ذكر وتوفيق:</span><span class="live-dhikr-text text-[var(--gold-bright)] transition-opacity duration-200">${MED26_ADHKAR_LIST[2]}</span></div>
            <span class="text-[10px] text-[var(--text-muted)] shrink-0">اضغط لذكر آخر 🔄</span>
        </div>`;

    const buzzHtml = BUZZWORDS_DATA.map(([k, v]) => `
        <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 flex justify-between items-center gap-2">
            <span class="text-xs sm:text-sm font-bold text-[var(--text-muted)]">${k}</span>
            <span class="kw-highlight text-xs sm:text-sm shrink-0">${v}</span>
        </div>`).join('');

    const yearsHtml = ['2025','2024','2023','2022','2021','2020'].map(y => `
        <label class="flex items-center justify-center gap-1.5 cursor-pointer font-bold text-xs bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border-color)]">
            <input type="checkbox" value="${y}" checked onchange="updateCustomCount()" class="accent-[#cfa96b]"> ${y}
        </label>`).join('');

    root.innerHTML = `
    <div id="bg-Stage"></div>
    <div id="cinematic-fog-stage">
        <div class="fog-layer fog-top-spotlight"></div>
        <div class="fog-layer fog-cloud-right"></div>
        <div class="fog-layer fog-cloud-left"></div>
        <div class="fog-layer fog-bottom-glow"></div>
    </div>

    <div id="disclaimer-modal" ${isSubPage ? 'style="display:none;"' : ''}></div>

    <header id="main-header" class="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/95">
        <div class="max-w-[1440px] w-[95%] mx-auto py-2.5 sm:py-3.5 flex flex-wrap justify-between items-center gap-2">
            <div class="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer" onclick="switchView('home')">
                <img data-logo alt="MED26 Logo" class="h-10 sm:h-12 w-auto object-contain shrink-0">
                <div>
                    <div class="flex items-center gap-1.5 sm:gap-2">
                        <h1 class="font-black text-sm sm:text-lg md:text-2xl whitespace-nowrap">منصة OSPE التفاعلية | F2</h1>
                        <span class="text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-full gold-btn">MED26</span>
                    </div>
                    <p class="text-[10px] sm:text-xs text-[var(--text-muted)] line-clamp-1">بنك التجميعات والتدريبات • طب جازان</p>
                </div>
            </div>

            <div id="top-dhikr-pill" onclick="rotateGlobalAdhkar()" title="اضغط للذكر التالي" class="cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold text-[var(--gold-bright)] flex items-center gap-1.5 transition">
                <span>📿</span><span class="live-dhikr-text transition-opacity duration-200">${MED26_ADHKAR_LIST[0]}</span>
            </div>

            <button id="top-user-badge" onclick="changeUsernamePrompt()" class="pill-btn px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-sm">
                <span>👤</span><span id="top-username-text" class="text-[var(--gold-bright)] font-black">${savedUser}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-black border text-sky-300 border-sky-400/40 bg-sky-500/15">🌱 مبتدئ</span>
            </button>

            <div class="flex items-center gap-1.5 md:hidden">
                <button id="mob-top-checklist-btn" onclick="openLabChecklistModal()" class="pill-btn px-2 py-1.5 rounded-xl text-[11px] font-extrabold text-emerald-300">✅ الختم</button>
                <button onclick="startBlitzMode()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold text-amber-300">⚡ 60ث</button>
                <button onclick="toggleTheme()" class="pill-btn px-2.5 py-1.5 rounded-xl text-xs font-bold">☀️/🌙</button>
            </div>

            <div class="hidden md:flex items-center gap-1.5 bg-[var(--bg-main)]/80 border border-[var(--border-color)] px-2.5 py-1.5 rounded-2xl shadow-inner">
                <button onclick="switchView('home')" id="nav-home" class="pill-btn ${defView === 'home' ? 'active' : ''} px-3 py-2 rounded-xl text-xs lg:text-sm font-bold">🏠 الرئيسية</button>
                <button onclick="switchView('scoreboard')" id="nav-scoreboard" class="pill-btn ${defView === 'scoreboard' ? 'active' : ''} px-3 py-2 rounded-xl text-xs lg:text-sm font-black text-orange-300 border-orange-400/40">🔥 Score Board</button>
                <button onclick="openLabChecklistModal()" id="nav-checklist-btn" type="button" class="pill-btn px-3 py-2 rounded-xl text-xs lg:text-sm font-black inline-flex items-center">✅ Checklist <span id="nav-cl-badge" class="mr-1 px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">0/12</span></button>
                <button onclick="switchView('atlas')" id="nav-atlas" class="pill-btn ${defView === 'atlas' ? 'active' : ''} px-3 py-2 rounded-xl text-xs lg:text-sm font-bold">🖼️ الأطلس البصري</button>
                <div id="my-tools-dropdown-wrap" class="relative">
                    <button type="button" onclick="document.getElementById('my-tools-menu').classList.toggle('hidden')" class="pill-btn px-3.5 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center gap-1.5"><span>⚙️ أدواتي</span><span class="text-[10px]">▼</span></button>
                    <div id="my-tools-menu" class="hidden absolute left-0 mt-2 w-64 bg-[var(--bg-card)] border-2 border-[var(--gold-primary)] rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-right">
                        <button onclick="switchView('custom');document.getElementById('my-tools-menu').classList.add('hidden')" class="w-full text-right px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-secondary)] flex items-center justify-between"><span>🎯 إعداد التدريب المخصص</span><span>⬅️</span></button>
                        <button onclick="togglePomodoroVisibility();document.getElementById('my-tools-menu').classList.add('hidden')" class="w-full text-right px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-secondary)] flex items-center justify-between text-emerald-300"><span>🍅 إظهار / إخفاء مؤقت بومودورو</span><span>⏱️</span></button>
                        <button onclick="printCustomPDF('both');document.getElementById('my-tools-menu').classList.add('hidden')" class="w-full text-right px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-secondary)] flex items-center justify-between"><span>🖨️ طباعة أخطائي ومفضلتي PDF</span><span>📄</span></button>
                        <button onclick="changeUsernamePrompt();document.getElementById('my-tools-menu').classList.add('hidden')" class="w-full text-right px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-secondary)] flex items-center justify-between text-amber-300"><span>🔑 اسمي وكود مزامنة أجهزتي</span><span>👤</span></button>
                        <button onclick="toggleTheme();document.getElementById('my-tools-menu').classList.add('hidden')" class="w-full text-right px-3 py-2 rounded-xl text-xs font-bold hover:bg-[var(--bg-secondary)] flex items-center justify-between"><span>☀️ / 🌙 تبديل المظهر (فاتح/داكن)</span><span>🎨</span></button>
                        <a href="https://t.me/Med26JU_bot" target="_blank" class="w-full text-right px-3 py-2 rounded-xl text-xs font-extrabold hover:bg-[var(--bg-secondary)] flex items-center justify-between text-[var(--gold-bright)] border-t border-[var(--border-color)] pt-2"><span>✈️ بوت الدفعة الرسمي</span><span dir="ltr">@Med26JU_bot</span></a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-[1440px] w-[95%] mx-auto py-4 sm:py-7 space-y-5 sm:space-y-7 relative z-10">

        <!-- 1. الرئيسية -->
        <section id="view-home" class="${defView === 'home' ? '' : 'hidden'} space-y-5 sm:space-y-7">
            <div class="app-card rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-wrap justify-between items-center gap-3 border border-amber-500/40">
                <div class="flex items-center gap-2.5"><span class="text-lg sm:text-xl">⏳</span><span class="text-xs sm:text-sm font-extrabold text-[var(--gold-bright)]">العد التنازلي لاختبار F2 OSPE (27/12 - 8:00 ص):</span></div>
                <div class="flex items-center gap-2 sm:gap-3 text-center" dir="ltr">
                    <div class="bg-[var(--bg-secondary)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] min-w-[52px]"><span id="cd-days" class="text-sm sm:text-lg font-black text-[var(--gold-bright)]">00</span><span class="block text-[9px] text-[var(--text-muted)]">DAYS</span></div>
                    <div class="bg-[var(--bg-secondary)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] min-w-[52px]"><span id="cd-hours" class="text-sm sm:text-lg font-black text-white">00</span><span class="block text-[9px] text-[var(--text-muted)]">HRS</span></div>
                    <div class="bg-[var(--bg-secondary)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] min-w-[52px]"><span id="cd-mins" class="text-sm sm:text-lg font-black text-white">00</span><span class="block text-[9px] text-[var(--text-muted)]">MIN</span></div>
                    <div class="bg-[var(--bg-secondary)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] min-w-[52px]"><span id="cd-secs" class="text-sm sm:text-lg font-black text-amber-400">00</span><span class="block text-[9px] text-[var(--text-muted)]">SEC</span></div>
                </div>
            </div>

            <div id="home-adhkar-oasis" class="app-card rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 border border-emerald-500/40 flex flex-col lg:flex-row justify-between items-center gap-3">
                <div class="flex items-center gap-2 text-center sm:text-right">
                    <span class="text-lg">📿</span><span class="text-xs sm:text-sm font-black text-emerald-300">واحة الأذكار أثناء المذاكرة:</span>
                    <span class="live-dhikr-text text-xs sm:text-sm font-bold text-[var(--gold-bright)] transition-opacity duration-200">${MED26_ADHKAR_LIST[0]}</span>
                </div>
                <div class="flex flex-wrap justify-center items-center gap-1.5">
                    <button onclick="incrementTasbeehCounter(this,'1')" class="pill-btn px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><span>سبحان الله وبحمده</span><span class="tasbeeh-count px-1.5 rounded-full bg-emerald-500/25 text-emerald-300 font-black">${t1}</span></button>
                    <button onclick="incrementTasbeehCounter(this,'2')" class="pill-btn px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><span>أستغفر الله</span><span class="tasbeeh-count px-1.5 rounded-full bg-amber-500/25 text-amber-300 font-black">${t2}</span></button>
                    <button onclick="incrementTasbeehCounter(this,'3')" class="pill-btn px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><span>اللهم صلِّ على محمد</span><span class="tasbeeh-count px-1.5 rounded-full bg-sky-500/25 text-sky-300 font-black">${t3}</span></button>
                    <button onclick="incrementTasbeehCounter(this,'4')" class="pill-btn px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><span>لا حول ولا قوة إلا بالله</span><span class="tasbeeh-count px-1.5 rounded-full bg-purple-500/25 text-purple-300 font-black">${t4}</span></button>
                </div>
            </div>

            <div id="bento-hero-upgraded" class="app-card rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-5">
                <img data-logo alt="" class="card-watermark">
                <div class="space-y-3 z-10 max-w-2xl text-center lg:text-right">
                    <div class="space-y-3 pb-1">
                        <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                            <span class="text-sm sm:text-base font-extrabold text-[var(--text-muted)]">مرحباً بك يا دكتور،</span>
                            <span id="bento-welcome-name" class="text-base sm:text-lg font-black text-[var(--gold-bright)]">${savedUser}</span>
                            <span id="bento-welcome-rank" class="px-2.5 py-0.5 rounded-full text-xs font-black border text-sky-300 border-sky-400/40 bg-sky-500/15">🌱 مبتدئ</span>
                        </div>
                        <div class="grid grid-cols-3 gap-2 max-w-xl mx-auto lg:mx-0">
                            <div class="bg-[var(--bg-secondary)]/90 border border-[var(--border-color)] rounded-xl px-3 py-2 text-center"><div class="text-[10px] text-[var(--text-muted)] font-bold">سلسلة الإجابات</div><div id="hero-quick-streak" class="text-xs sm:text-sm font-black text-amber-300 mt-0.5">🔥 0 متتالية</div></div>
                            <div onclick="openLabChecklistModal()" class="bg-[var(--bg-secondary)]/90 border border-[var(--border-color)] rounded-xl px-3 py-2 text-center cursor-pointer hover:border-emerald-400"><div class="text-[10px] text-[var(--text-muted)] font-bold">ختم اللابات</div><div id="hero-quick-labs" class="text-xs sm:text-sm font-black text-emerald-400 mt-0.5">✅ 0/12 لاب</div></div>
                            <div onclick="switchView('scoreboard')" class="bg-[var(--bg-secondary)]/90 border border-[var(--border-color)] rounded-xl px-3 py-2 text-center cursor-pointer hover:border-amber-400"><div class="text-[10px] text-[var(--text-muted)] font-bold">ترتيبك بالدفعة</div><div id="hero-quick-rank" class="text-xs sm:text-sm font-black text-[var(--gold-bright)] mt-0.5">🏆 #--</div></div>
                        </div>
                        <button onclick="resumeLastSession()" class="w-full sm:w-auto gold-btn px-6 py-3 rounded-2xl text-right flex items-center justify-between sm:justify-start gap-3 shadow-xl">
                            <span class="text-xl">▶️</span>
                            <div><div class="text-xs sm:text-sm font-black leading-tight">أكمل من حيث توقفت (Continue Session)</div><div id="continue-session-subtext" class="text-[10px] sm:text-[11px] font-bold opacity-85">ابدأ بالمحطات الأكثر تكراراً في الاختبار</div></div>
                        </button>
                    </div>
                    <div class="inline-flex flex-wrap justify-center lg:justify-start items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] sm:text-xs font-bold text-[var(--gold-bright)]"><span>آخر تحديث: NOV 2026 • شامل تجميعات (2020 – 2025)</span></div>
                    <h2 class="text-xl sm:text-3xl md:text-4xl font-black leading-snug">بنك التجميعات والتدريبات التفاعلي لـ Foundation 2</h2>
                    <p class="text-xs sm:text-base text-[var(--text-muted)] leading-relaxed">تدرّب مع محاكي الـ 18 محطة (من 20 درجة)، وتحدي الـ 60 ثانية السريع، ورابط تحدي الأصدقاء، وطباعة ملف أخطائك وملاحظاتك كـ PDF.</p>
                    <div class="pt-1 flex flex-wrap justify-center lg:justify-start gap-2">
                        <button onclick="switchView('atlas')" class="gold-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-black">🖼️ الأطلس البصري ومفاتيح البصم</button>
                        <button onclick="startBlitzMode()" class="pill-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-amber-300">⚡ تحدي الـ 60 ثانية (Blitz)</button>
                        <button onclick="printCustomPDF('both')" class="pill-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold">🖨️ طباعة ملف أخطائي ومفضلتي (PDF)</button>
                    </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full lg:w-auto z-10">
                    <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-3.5 sm:p-4 text-center"><div class="text-xl sm:text-2xl font-black text-[var(--gold-bright)]" id="stat-total">0</div><div class="text-[11px] text-[var(--text-muted)] mt-1 font-bold">إجمالي المحطات</div></div>
                    <div class="bg-[var(--bg-secondary)] border border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 text-center"><div class="text-xl sm:text-2xl font-black text-emerald-400" id="stat-mastered">0</div><div class="text-[11px] text-emerald-300 mt-1 font-bold">محطات أتقنتها</div></div>
                    <div onclick="startTraining({source:'bookmarks'})" class="bg-[var(--bg-secondary)] border border-amber-400/50 rounded-2xl p-3.5 sm:p-4 text-center cursor-pointer hover:bg-amber-500/10"><div class="text-xl sm:text-2xl font-black text-amber-300" id="stat-bookmarks">0</div><div class="text-[11px] text-amber-200 mt-1 font-bold">⭐ المفضلة</div></div>
                    <div onclick="startTraining({source:'mistakes'})" class="bg-[var(--bg-secondary)] border border-red-400/40 rounded-2xl p-3.5 sm:p-4 text-center cursor-pointer hover:bg-red-500/10"><div class="text-xl sm:text-2xl font-black text-red-400" id="stat-mistakes">0</div><div class="text-[11px] text-red-300 mt-1 font-bold">⚠️ سلة الأخطاء</div></div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div class="lg:col-span-8 app-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div class="flex flex-wrap justify-between items-center gap-2 border-b border-[var(--border-color)] pb-3">
                        <div>
                            <h3 class="text-base sm:text-xl font-black text-[var(--gold-bright)]">🎮 أطوار الاختبار والمنافسة (Game Modes)</h3>
                            <p class="text-xs text-[var(--text-muted)] font-bold">اختر نمط التدريب المناسب لوقتك أو نافس زملاءك في نفس المحطات</p>
                        </div>
                        <div class="flex gap-1.5">
                            <button onclick="startTraining({source:'bookmarks'})" class="pill-btn px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300">⭐ المفضلة (<span id="fav-count-btn">0</span>)</button>
                            <button onclick="startTraining({source:'mistakes'})" class="pill-btn px-3 py-1.5 rounded-xl text-xs font-bold text-red-400">⚠️ أخطائي (<span id="mistake-count-btn">0</span>)</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div onclick="switchView('custom')" class="gamemode-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between space-y-3">
                            <div class="space-y-1.5"><div class="flex justify-between items-center"><span class="text-2xl">🎯</span><span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">فلترة اللابات</span></div><h4 class="font-black text-sm sm:text-base text-white">تدريب مخصص</h4><p class="text-[11px] text-[var(--text-muted)] leading-relaxed">اختر المواد واللابات الفرعية والسنوات لتوليد اختبارك الخاص.</p></div>
                            <div class="text-xs font-black text-[var(--gold-bright)] flex items-center justify-between pt-2 border-t border-[var(--border-color)]"><span>إعداد الاختبار</span><span>⬅️</span></div>
                        </div>
                        <div onclick="startExamSimulator()" class="gamemode-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between space-y-3 border-amber-500/50">
                            <div class="space-y-1.5"><div class="flex justify-between items-center"><span class="text-2xl">⏱️</span><span class="text-[10px] font-black px-2 py-0.5 rounded-full gold-btn">الدرجة من 20</span></div><h4 class="font-black text-sm sm:text-base text-white">محاكي (18 محطة)</h4><p class="text-[11px] text-[var(--text-muted)] leading-relaxed">محاكاة كاملة للاختبار الفعلي مع إخفاء اسم اللاب ومؤقت 90 ثانية.</p></div>
                            <div id="gamemode-fastest-time" class="text-[11px] font-black text-emerald-400 pt-2 border-t border-[var(--border-color)]">⚡ أسرع وقت مسجل في الدفعة: --:--</div>
                        </div>
                        <div onclick="startBlitzMode()" class="gamemode-card rounded-2xl p-4 cursor-pointer flex flex-col justify-between space-y-3">
                            <div class="space-y-1.5"><div class="flex justify-between items-center"><span class="text-2xl">⚡</span><span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">25 سؤال MCQ</span></div><h4 class="font-black text-sm sm:text-base text-amber-300">تحدي 60 ثانية</h4><p class="text-[11px] text-[var(--text-muted)] leading-relaxed">تحدي السرعة القصوى لحل أكبر عدد من المحطات خلال دقيقة واحدة!</p></div>
                            <div class="text-xs font-black text-amber-300 flex items-center justify-between pt-2 border-t border-[var(--border-color)]"><span>ابدأ التحدي السريع</span><span>🚀</span></div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 pt-1">
                        <button onclick="createDirectFriendChallenge()" class="flex-1 pill-btn py-2.5 px-4 rounded-xl text-xs font-black text-emerald-300">⚔️ إنشاء رابط تحدي صاحبي (18 محطة مشتركة)</button>
                        <button onclick="startTraining({highYield:true})" class="flex-1 pill-btn py-2.5 px-4 rounded-xl text-xs font-black text-amber-300">🔥 مراجعة المحطات الأكثر تكراراً (High-Yield)</button>
                    </div>
                </div>

                <div class="lg:col-span-4 app-card rounded-3xl p-5 flex flex-col justify-between space-y-3 border-2 border-[var(--gold-primary)]/60">
                    <div class="flex justify-between items-center border-b border-[var(--border-color)] pb-2.5">
                        <div><h3 class="text-sm sm:text-base font-black text-[var(--gold-bright)]">🔬 محطة اليوم السريعة</h3><p id="spot-day-sub" class="text-[10px] text-[var(--text-muted)] font-bold">مراجعة خاطفة في 15 ثانية</p></div>
                        <div class="flex gap-1">
                            <button onclick="speakMedicalText(currentSpotStation?currentSpotStation.a:'')" class="pill-btn px-2 py-1 rounded-lg text-xs" title="استمع للنطق">🔊</button>
                            <button onclick="pickRandomSpotOfTheDay(true)" class="pill-btn px-2.5 py-1 rounded-lg text-[11px] font-bold">🎲 أخرى</button>
                        </div>
                    </div>
                    <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-2 flex items-center justify-center"><img id="spot-day-img" src="" alt="Spot" loading="lazy" onclick="openZoomModal(this.src)" class="h-36 w-full object-contain rounded-xl cursor-zoom-in"></div>
                    <div id="spot-day-q" class="text-xs font-bold text-left bg-[var(--bg-secondary)]/80 p-2.5 rounded-xl border border-[var(--border-color)] line-clamp-2" dir="ltr"></div>
                    <div>
                        <button id="spot-day-reveal-btn" onclick="document.getElementById('spot-day-ans').classList.remove('hidden');this.classList.add('hidden');" class="w-full gold-btn py-2.5 rounded-xl text-xs font-black shadow">👁️ اكشف الإجابة الفورية</button>
                        <div id="spot-day-ans" class="hidden bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-2.5 text-xs font-bold text-left leading-relaxed" dir="ltr"></div>
                    </div>
                </div>
            </div>

            <!-- شبكة المواد الديناميكية (تُملأ تلقائياً من sync-bridge.js) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"></div>

            <div class="app-card rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
                <div class="flex items-center gap-4">
                    <img data-logo class="h-11 hidden sm:block">
                    <div><h4 class="text-base sm:text-lg font-extrabold text-[var(--gold-bright)]">💬 تواصل مع فريق العملي (Practical Team)</h4><p class="text-xs sm:text-sm text-[var(--text-muted)]">لإرسال أي ملاحظات أو تصحيحات أو استفسارات تواصل معنا مباشرة عبر بوت الدفعة</p></div>
                </div>
                <a href="https://t.me/Med26JU_bot" target="_blank" class="w-full sm:w-auto gold-btn px-6 py-3 rounded-2xl text-sm font-black flex justify-center items-center gap-2 shrink-0"><span>✈️ بوت الدفعة:</span><span dir="ltr">@Med26JU_bot</span></a>
            </div>
        </section>

        <!-- 2. الأطلس البصري -->
        <section id="view-atlas" class="${defView === 'atlas' ? '' : 'hidden'} space-y-5">
            ${dhikrBar('dhikr-banner-atlas')}
            <div class="app-card rounded-3xl p-5 sm:p-7 space-y-5">
                <div class="flex flex-wrap justify-between items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div class="flex items-center gap-3"><img data-logo class="h-10"><div><h2 class="text-lg sm:text-2xl font-black text-[var(--gold-bright)]">🖼️ الأطلس البصري السريع ومفاتيح البصم</h2><p class="text-xs sm:text-sm text-[var(--text-muted)]">مراجعة خاطفة لجميع صور العينات والكلمات المفتاحية قبل دخول قاعة الـ OSPE بـ 10 دقائق</p></div></div>
                    <div class="flex gap-2">
                        <button onclick="toggleBuzzwordsSubView(false)" id="tab-atlas-imgs" class="gold-btn px-3.5 py-2 rounded-xl text-xs font-black">🖼️ صور العينات</button>
                        <button onclick="toggleBuzzwordsSubView(true)" id="tab-atlas-buzz" class="pill-btn px-3.5 py-2 rounded-xl text-xs font-bold">🔑 جدول مفاتيح البصم</button>
                        <button onclick="switchView('home')" class="pill-btn px-3.5 py-2 rounded-xl text-xs font-bold">⬅️ عودة</button>
                    </div>
                </div>
                <div id="atlas-images-subview" class="space-y-4">
                    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                        <div class="flex flex-wrap gap-2" id="atlas-filter-bar"><button onclick="filterAtlas('ALL')" data-sub="ALL" class="pill-btn active px-3.5 py-2 rounded-xl text-xs font-bold">الكل</button></div>
                        <input type="text" id="atlas-search" oninput="renderAtlasGrid()" placeholder="🔍 ابحث عن عينة أو تشخيص..." class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-2 text-xs sm:text-sm font-bold w-full sm:w-80 focus:outline-none focus:border-[var(--gold-primary)]">
                    </div>
                    <div id="atlas-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"></div>
                </div>
                <div id="atlas-buzzwords-subview" class="hidden space-y-3"><div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-left" dir="ltr">${buzzHtml}</div></div>
            </div>
        </section>

        <!-- 3. تقرير نقاط الضعف وبطاقة النتيجة -->
        <section id="view-report" class="hidden space-y-5 py-4">
            <div class="app-card max-w-4xl mx-auto rounded-3xl p-5 sm:p-9 space-y-6 border-2 border-[var(--gold-primary)]">
                <img data-logo alt="" class="card-watermark">
                <div class="relative z-10 space-y-6">
                    <div id="luxury-score-card" class="bg-gradient-to-br from-[#26211b] via-[#1c1814] to-[#2e261d] border-2 border-[#cfa96b] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
                        <div class="flex justify-between items-center border-b border-[#cfa96b]/30 pb-3"><img data-logo class="h-10 sm:h-12 object-contain"><span id="scorecard-mode-label" class="text-xs sm:text-sm font-black px-3 py-1 rounded-full gold-btn">محاكي الـ OSPE</span></div>
                        <div class="py-2 space-y-1"><div class="text-xs text-[#c4baa8] font-bold">الدرجة النهائية المعتمدة (من 20)</div><div id="report-score-20" class="text-4xl sm:text-6xl font-black text-[#ebd2a4]" dir="ltr">20 / 20</div><div id="report-score-badge" class="text-xs sm:text-sm font-extrabold text-emerald-400 pt-1">الأداء: ممتاز (100%)</div></div>
                        <div class="grid grid-cols-3 gap-2.5 max-w-lg mx-auto pt-2">
                            <div class="bg-black/35 border border-[#cfa96b]/30 rounded-2xl p-3"><div id="sc-correct" class="text-lg sm:text-2xl font-black text-emerald-400">18/18</div><div class="text-[10px] sm:text-xs text-[#c4baa8] font-bold">المحطات الصحيحة</div></div>
                            <div class="bg-black/35 border border-[#cfa96b]/30 rounded-2xl p-3"><div id="sc-streak" class="text-lg sm:text-2xl font-black text-amber-400">🔥 0</div><div class="text-[10px] sm:text-xs text-[#c4baa8] font-bold">أعلى سلسلة (Combo)</div></div>
                            <div class="bg-black/35 border border-[#cfa96b]/30 rounded-2xl p-3"><div id="sc-time" class="text-lg sm:text-2xl font-black text-sky-300" dir="ltr">00:00</div><div class="text-[10px] sm:text-xs text-[#c4baa8] font-bold">الوقت المستغرق</div></div>
                        </div>
                        <div class="pt-3 flex flex-wrap justify-center gap-2.5">
                            <button onclick="downloadScoreCardImage()" class="gold-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-lg">📸 حفظ بطاقة النتيجة كصورة</button>
                            <button onclick="shareCurrentChallengeLink()" class="pill-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-emerald-300">⚔️ تحدي صاحبي بنفس المحطات</button>
                        </div>
                        <div dir="ltr" class="text-[11px] text-[#c4baa8] pt-1 font-bold">MED26 PORTAL • Done by Lester Crest</div>
                    </div>
                    <div class="space-y-3"><h3 class="text-base sm:text-xl font-black text-[var(--gold-bright)]">📊 تحليل نقاط الضعف حسب المعمل (Lab Breakdown):</h3><div class="space-y-2.5" id="report-labs-breakdown"></div></div>
                    <div class="pt-4 border-t border-[var(--border-color)] flex flex-wrap justify-center gap-2.5">
                        <button id="report-retry-mistakes-btn" onclick="retrySessionMistakes()" class="gold-btn px-5 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-lg">🔄 راجع أخطاء هذه الجلسة فوراً</button>
                        <button onclick="printCustomPDF('mistakes')" class="pill-btn px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold">🖨️ طباعة ملف أخطائي (PDF)</button>
                        <button onclick="startExamSimulator()" class="pill-btn px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold">⏱️ اختبار محاكي جديد (18 محطة)</button>
                        <button onclick="switchView('home')" class="pill-btn px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold">🏠 العودة للرئيسية</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. لا توجد تدريبات -->
        <section id="view-no-practice" class="hidden py-6 sm:py-10">
            <div class="app-card max-w-2xl mx-auto rounded-3xl p-7 sm:p-12 text-center space-y-5">
                <img data-logo class="h-20 sm:h-24 mx-auto object-contain">
                <div id="no-practice-subject" class="inline-block px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-extrabold">قسم التدريبات العملية • MED26</div>
                <h2 class="text-xl sm:text-3xl font-black text-[var(--gold-bright)]">لا توجد تدريبات إلى الآن، سيتم إضافتها قريباً</h2>
                <div class="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button onclick="switchView('home')" class="gold-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-lg">⬅️ العودة للصفحة الرئيسية</button>
                    <a href="https://t.me/Med26JU_bot" target="_blank" class="pill-btn px-6 py-3.5 rounded-2xl text-xs font-bold flex justify-center items-center gap-2"><span>💬 بوت الدفعة:</span><span dir="ltr" class="kw-highlight">@Med26JU_bot</span></a>
                </div>
            </div>
        </section>

        <!-- 5. التدريب المخصص -->
        <section id="view-custom" class="${defView === 'custom' ? '' : 'hidden'} space-y-5">
            ${dhikrBar('dhikr-banner-custom')}
            <div class="app-card rounded-3xl p-5 sm:p-7 space-y-5">
                <div class="flex flex-wrap justify-between items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div class="flex items-center gap-3"><img data-logo class="h-9 sm:h-11"><div><h2 class="text-lg sm:text-2xl font-black">🎯 إعداد التدريب السريع المخصص</h2><p class="text-xs sm:text-sm text-[var(--text-muted)]">اختر المواد، المعامل، والسنوات لتوليد اختبارك الخاص</p></div></div>
                    <button onclick="switchView('home')" class="pill-btn px-4 py-2 rounded-xl text-xs font-bold">⬅️ عودة للرئيسية</button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div class="lg:col-span-7 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2.5">
                        <h3 class="text-sm sm:text-base font-extrabold text-[var(--gold-bright)]">1. اختر المواد (Subjects):</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="custom-subjects"></div>
                    </div>
                    <div id="custom-left-stacked-col" class="lg:col-span-5 flex flex-col gap-3.5">
                        <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2.5">
                            <h3 class="text-sm sm:text-base font-extrabold text-[var(--gold-bright)]">2. مصدر الأسئلة (Category):</h3>
                            <div class="grid grid-cols-3 gap-2">
                                <label class="flex items-center gap-1.5 cursor-pointer font-bold text-xs bg-[var(--bg-card)] p-2.5 rounded-xl border border-[var(--border-color)]"><input type="radio" name="custom-cat" value="all" checked onchange="updateCustomCount()" class="accent-[#cfa96b]"> الكل</label>
                                <label class="flex items-center gap-1.5 cursor-pointer font-bold text-xs bg-[var(--bg-card)] p-2.5 rounded-xl border border-[var(--border-color)]"><input type="radio" name="custom-cat" value="compilation" onchange="updateCustomCount()" class="accent-[#cfa96b]"> التجميعات</label>
                                <label class="flex items-center gap-1.5 cursor-pointer font-bold text-xs bg-[var(--bg-card)] p-2.5 rounded-xl border border-[var(--border-color)]"><input type="radio" name="custom-cat" value="practice" onchange="updateCustomCount()" class="accent-[#cfa96b]"> التدريبات</label>
                            </div>
                        </div>
                        <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2.5">
                            <h3 class="text-sm sm:text-base font-extrabold text-[var(--gold-bright)]">3. سنوات التجميعات (Years):</h3>
                            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2" id="custom-years">${yearsHtml}</div>
                        </div>
                        <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2.5">
                            <h3 class="text-sm sm:text-base font-extrabold text-[var(--gold-bright)]">4. إعدادات الجلسة والمؤقت:</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div><label class="block text-[11px] text-[var(--text-muted)] mb-1 font-bold">نمط الأسئلة:</label><select id="custom-type" onchange="updateCustomCount()" class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-2 text-xs font-bold"><option value="all">الكل</option><option value="flashcard">مقالي</option><option value="mcq">اختيارات MCQ</option></select></div>
                                <div><label class="block text-[11px] text-[var(--text-muted)] mb-1 font-bold">عدد المحطات:</label><select id="custom-limit" class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-2 text-xs font-bold"><option value="999">جميع المحطات المطابقة</option><option value="18">18 محطة</option><option value="10">10 محطات</option><option value="25">25 محطة</option><option value="50">50 محطة</option></select></div>
                                <div><label class="block text-[11px] text-[var(--text-muted)] mb-1 font-bold">المؤقت:</label><select id="custom-timer" class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-2 text-xs font-bold"><option value="0">بدون مؤقت</option><option value="60">60 ثانية</option><option value="90">90 ثانية</option><option value="120">120 ثانية</option></select></div>
                            </div>
                            <div class="flex flex-wrap gap-3 pt-1">
                                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold"><input type="checkbox" id="custom-shuffle" class="accent-[#cfa96b]"> ترتيب عشوائي للمحطات</label>
                                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-bold"><input type="checkbox" id="custom-highyield" onchange="updateCustomCount()" class="accent-[#cfa96b]"> الأكثر تكراراً فقط</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div class="text-sm font-bold">عدد المحطات المطابقة لاختياراتك: <span id="custom-match-count" class="text-xl font-black text-[var(--gold-bright)]">0</span></div>
                    <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                        <button onclick="launchCustomTraining()" class="w-full sm:w-auto gold-btn px-8 py-3 rounded-2xl text-sm font-black shadow-lg">🚀 ابدأ التدريب المخصص الآن</button>
                        <button onclick="launchCustomFriendChallenge()" class="w-full sm:w-auto pill-btn px-6 py-3 rounded-2xl text-sm font-black text-emerald-300 border-emerald-500/50">⚔️ تحدي صاحبي بهذه الإعدادات</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. شاشة التدريب -->
        <section id="view-trainer" class="hidden space-y-3.5 sm:space-y-4">
            ${dhikrBar('dhikr-banner-trainer')}
            <div class="app-card rounded-2xl px-3.5 py-2.5 sm:p-4 flex flex-wrap justify-between items-center gap-2">
                <div class="flex items-center gap-2 min-w-0">
                    <button onclick="finishOrExitSession()" class="pill-btn px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold shrink-0">📊 إنهاء وتقرير</button>
                    <span id="trainer-title" class="text-xs sm:text-base md:text-lg font-black text-[var(--gold-bright)] truncate">تدريب</span>
                </div>
                <div id="streak-badge" class="hidden items-center gap-1.5 bg-gradient-to-r from-orange-600/30 to-amber-500/30 border border-amber-400 px-3 py-1 rounded-xl text-xs font-black text-amber-200"><span id="streak-text">🔥 سلسلة 3 صح!</span></div>
                <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <div id="exam-timer-box" class="hidden items-center gap-1.5 bg-amber-500/20 border border-amber-400 px-3 py-1 rounded-xl"><span id="exam-timer" class="text-sm sm:text-lg font-black text-amber-300">01:30</span></div>
                    <button onclick="shareCurrentChallengeLink()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold text-emerald-300">⚔️ تحدي صاحبي</button>
                    <button id="zen-mode-toggle-btn" type="button" onclick="toggleZenFocusMode()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold text-amber-200 flex items-center gap-1"><span>🧘</span><span id="zen-btn-label" class="hidden sm:inline">وضع التركيز</span></button>
                    <span id="question-counter" class="text-xs sm:text-sm font-extrabold bg-[var(--bg-secondary)] px-3 py-1.5 rounded-xl border border-[var(--border-color)]">1 / 18</span>
                    <button onclick="toggleTheme()" class="pill-btn px-2.5 py-1.5 rounded-xl text-xs font-bold">☀️/🌙</button>
                </div>
            </div>

            <div id="timeout-toast" class="hidden bg-red-600/90 border border-red-300 text-white px-4 py-3 rounded-2xl text-center text-xs sm:text-sm font-extrabold">🔔 انتهى وقت المحطة! تم احتساب السؤال كخطأ وإضافته إلى سلة المراجعة.</div>
            <div id="srs-toast" class="hidden bg-amber-500/90 border border-amber-200 text-black px-4 py-2.5 rounded-2xl text-center text-xs sm:text-sm font-extrabold">🔁 تم جدولة هذه المحطة لتظهر لك مجدداً بعد قليل لتثبيت حفظها!</div>

            <div id="station-navigator-wrap" class="app-card rounded-2xl px-3.5 py-2 flex items-center justify-between gap-3">
                <span class="text-xs font-black text-[var(--gold-bright)] shrink-0">🗺️ خريطة المحطات:</span>
                <div id="station-navigator-bar" class="flex items-center gap-1.5 overflow-x-auto py-1 flex-1" dir="ltr"></div>
                <div class="hidden sm:flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] shrink-0">
                    <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>صحيحة</span>
                    <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"></span>خاطئة</span>
                </div>
            </div>

            <div id="station-card" class="app-card rounded-3xl p-4 sm:p-7 md:p-9 flex flex-col justify-between">
                <img data-logo alt="" class="card-watermark">
                <div class="flex flex-wrap justify-between items-center gap-2 border-b border-[var(--border-color)] pb-3.5 z-10">
                    <div id="q-meta-badges" class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span id="q-subject" class="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase"></span>
                        <span id="q-lab" class="bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold"></span>
                        <span id="q-year" class="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-extrabold"></span>
                        <span id="q-highyield" class="hidden bg-red-500/20 text-red-300 border border-red-400/40 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-extrabold">🔥 الأكثر تكراراً</span>
                        <span id="q-compilation-tag" class="bg-sky-500/20 text-sky-300 border border-sky-400/40 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-extrabold">📌 تجميعات سابقة</span>
                    </div>
                    <div id="q-sim-hidden-badge" class="hidden items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-200 px-3 py-1 rounded-xl text-xs font-extrabold">🔒 محطة اختبار محاكي (تم إخفاء المادة واللاب لمنع حرق الإجابة)</div>
                    <div class="flex items-center gap-1.5 sm:gap-2">
                        <button id="bookmark-btn" onclick="toggleBookmarkCurrent()" class="pill-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"><span id="bookmark-icon">☆</span><span class="hidden sm:inline">المفضلة</span></button>
                        <button onclick="copyStationLink()" class="pill-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"><span>🔗</span><span id="copy-link-text" class="hidden sm:inline">نسخ رابط السؤال</span></button>
                        <img data-logo alt="MED26" class="h-7 sm:h-9 opacity-85 hidden sm:block">
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 my-4 sm:my-6 z-10 items-start">
                    <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center w-full" id="q-img-col">
                        <div id="img-wrapper" class="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col items-center justify-center relative">
                            <div id="loupe-container" class="relative w-full flex justify-center items-center overflow-hidden rounded-xl">
                                <img id="q-image" src="" alt="Specimen" loading="lazy" onclick="openZoomModal(this.src)" class="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-contain rounded-xl cursor-zoom-in select-none">
                                <div id="magnifier-lens"></div>
                            </div>
                            <div class="mt-2.5 grid grid-cols-2 sm:flex flex-wrap justify-center gap-1.5 w-full">
                                <button id="loupe-toggle-btn" onclick="toggleLoupe()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold">🔬 العدسة: إيقاف</button>
                                <button id="enhance-slide-btn" onclick="cycleSlideEnhancement()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold">🔆 توضيح العينة</button>
                                <button onclick="rotateSpecimen()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold">🔄 تدوير</button>
                                <button onclick="openZoomModal(document.getElementById('q-image').src)" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold">🔍 تكبير</button>
                                <button onclick="toggleFullSlide()" class="col-span-2 sm:col-span-1 pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold">📄 الشريحة كاملة</button>
                            </div>
                        </div>
                        <div id="no-sample-badge" class="hidden w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-8 text-center space-y-1">
                            <div class="text-lg sm:text-2xl font-black text-[var(--gold-bright)]">NO SAMPLE</div>
                            <p class="text-xs text-[var(--text-muted)]">سؤال نظري مباشر في الاختبار بدون صورة عينة مرفقة</p>
                        </div>
                    </div>

                    <div class="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5 w-full" id="q-text-col">
                        <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-6">
                            <div class="text-[11px] sm:text-xs text-[var(--gold-bright)] font-bold mb-1.5">STATION QUESTION:</div>
                            <h3 id="q-text" class="text-base sm:text-xl md:text-2xl font-extrabold leading-relaxed whitespace-pre-line text-left" dir="ltr"></h3>
                        </div>
                        <div id="mcq-container" class="hidden space-y-2.5" dir="ltr"></div>
                        <div id="flashcard-container" class="space-y-3.5">
                            <div id="typing-checker-box" class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-3 sm:p-4 space-y-2.5">
                                <div class="flex justify-between items-center"><span class="text-[11px] sm:text-xs font-extrabold text-[var(--gold-bright)]">✍️ المصحح التلقائي للإجابة (اختياري):</span><span class="text-[10px] text-[var(--text-muted)]">يتسامح مع الأخطاء الإملائية</span></div>
                                <div class="flex flex-col sm:flex-row gap-2" dir="ltr">
                                    <input type="text" id="user-typed-answer" onkeydown="if(event.key==='Enter'){event.preventDefault();checkTypedAnswer();}" placeholder="Type diagnosis or keywords here..." class="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--gold-primary)]">
                                    <button onclick="checkTypedAnswer()" class="gold-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shrink-0">تحقق من إجابتي ✔️</button>
                                </div>
                                <div id="typing-feedback" class="hidden text-xs sm:text-sm font-extrabold p-2.5 rounded-xl"></div>
                            </div>
                            <button id="reveal-btn" onclick="revealAnswer()" class="w-full gold-btn py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg shadow-lg">👁️ إظهار الإجابة النموذجية</button>
                            <div id="answer-box" class="hidden bg-emerald-950/30 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-6 space-y-4">
                                <div class="flex flex-wrap justify-between items-center gap-2">
                                    <span class="text-xs font-extrabold text-emerald-400">MODEL ANSWER:</span>
                                    <button onclick="speakCurrentAnswer()" class="pill-btn px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 text-[var(--gold-bright)] border-emerald-500/40"><span>🔊</span><span>استمع للنطق الطبي</span></button>
                                </div>
                                <div id="q-answer" class="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-left" dir="ltr"></div>
                                <div class="pt-3 border-t border-emerald-500/30 space-y-2">
                                    <div class="text-[11px] text-[var(--text-muted)] font-bold text-center">قيّم مدى إتقانك للمحطة (نظام التكرار المتباعد الذكي):</div>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        <button onclick="handleSpacedRepetition('easy')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs sm:text-sm">🟢 سهل (أتقنتها)</button>
                                        <button onclick="handleSpacedRepetition('medium')" class="bg-amber-600 hover:bg-amber-500 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs sm:text-sm">🟡 متوسط (أعدها آخر الجلسة)</button>
                                        <button onclick="handleSpacedRepetition('hard')" class="bg-red-600 hover:bg-red-500 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs sm:text-sm">🔴 صعب (أعدها بعد 3 أسئلة)</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="team-note-box" class="hidden bg-amber-500/10 border border-amber-500/40 rounded-2xl p-3.5 text-xs sm:text-sm text-amber-200 leading-relaxed">
                            <strong>💡 تنبيه فريق العملي (Practical Team Note):</strong><p id="team-note-text" class="mt-1"></p>
                        </div>
                        <div class="bg-[var(--bg-secondary)]/90 border border-[var(--border-color)] rounded-2xl p-3.5 space-y-2">
                            <div class="flex justify-between items-center">
                                <label for="station-personal-note" class="text-xs font-extrabold text-[var(--gold-bright)]">📝 ملاحظتي وربطتي الخاصة على هذه الشريحة:</label>
                                <span id="note-saved-indicator" class="text-[10px] text-emerald-400 font-bold opacity-0 transition-opacity duration-300">تم الحفظ تلقائياً ✓</span>
                            </div>
                            <textarea id="station-personal-note" rows="2" oninput="savePersonalNote()" placeholder="اكتب علامتك الخاصة لربط هذه العينة وتذكرها فوراً في الاختبار (تُحفظ تلقائياً في جهازك)..." class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--gold-primary)] resize-none"></textarea>
                        </div>
                    </div>
                </div>

                <div class="space-y-3 pt-4 border-t border-[var(--border-color)] z-10">
                    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                        <div class="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
                            <button onclick="prevQuestion()" class="pill-btn px-4 py-3 sm:px-6 rounded-xl text-xs sm:text-sm font-extrabold text-center">➡️ المحطة السابقة</button>
                            <button onclick="nextQuestion()" class="gold-btn px-4 py-3 sm:px-8 rounded-xl text-xs sm:text-sm font-extrabold text-center">المحطة التالية ⬅️</button>
                        </div>
                        <div class="flex flex-wrap justify-between sm:justify-end items-center gap-2.5">
                            <a href="https://t.me/Med26JU_bot" target="_blank" class="w-full sm:w-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold flex justify-center items-center gap-1.5"><span>💬 بوت الدفعة:</span><span dir="ltr" class="kw-highlight">@Med26JU_bot</span></a>
                            <div dir="ltr" class="text-xs text-[var(--text-muted)] font-bold hidden md:inline-block">Done by <span class="kw-highlight">Lester Crest</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7. لوحة المتصدرين -->
        <section id="view-scoreboard" class="${defView === 'scoreboard' ? '' : 'hidden'} space-y-5">
            ${dhikrBar('dhikr-banner-scoreboard')}
            <div class="app-card rounded-3xl p-5 sm:p-8 space-y-6 border-2 border-[var(--gold-primary)]">
                <div class="flex flex-wrap justify-between items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div class="flex items-center gap-3"><span class="text-3xl">🔥</span><div><h2 class="text-xl sm:text-3xl font-black text-[var(--gold-bright)]">لوحة المتصدرين | MED26 Score Board</h2><p class="text-xs sm:text-sm text-[var(--text-muted)]">أفضل 10 طلاب في الدفعة (حسابك المحفوظ: <strong id="sb-current-user" class="text-white">${savedUser}</strong>)</p></div></div>
                    <div class="flex gap-2"><button onclick="changeUsernamePrompt()" class="pill-btn px-3.5 py-2 rounded-xl text-xs font-bold">✏️ تغيير اسمي</button><button onclick="switchView('home')" class="pill-btn px-4 py-2 rounded-xl text-xs font-bold">⬅️ عودة</button></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" id="scoreboard-four-lists"></div>
            </div>
        </section>
    </main>

    <div id="print-pdf-container" dir="rtl"></div>

    <nav id="mobile-bottom-bar" class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-secondary)]/95 border-t border-[var(--border-color)] px-1 py-1.5 grid grid-cols-6 gap-1">
        <button onclick="switchView('home')" id="mob-home" class="pill-btn ${defView === 'home' ? 'active' : ''} py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold"><span class="text-sm">🏠</span><span>الرئيسية</span></button>
        <button onclick="switchView('atlas')" id="mob-atlas" class="pill-btn ${defView === 'atlas' ? 'active' : ''} py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold"><span class="text-sm">🖼️</span><span>الأطلس</span></button>
        <button onclick="switchView('custom')" id="mob-custom" class="pill-btn ${defView === 'custom' ? 'active' : ''} py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold"><span class="text-sm">🎯</span><span>التخصيص</span></button>
        <button onclick="startTraining({source:'bookmarks'})" id="mob-fav" class="pill-btn py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold text-amber-300"><span class="text-sm">⭐</span><span>المفضلة (<span id="mob-fav-count">0</span>)</span></button>
        <button onclick="startExamSimulator()" id="mob-sim" class="pill-btn py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold"><span class="text-sm">⏱️</span><span>المحاكي</span></button>
        <button onclick="switchView('scoreboard')" id="mob-scoreboard" class="pill-btn ${defView === 'scoreboard' ? 'active' : ''} py-1.5 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold text-orange-300"><span class="text-sm">🔥</span><span>المتصدرين</span></button>
    </nav>

    <div id="zoom-modal" onclick="closeZoomModal()" class="fixed inset-0 bg-black/95 z-50 hidden items-center justify-center p-2 sm:p-4 cursor-zoom-out">
        <img id="zoom-img" src="" class="max-w-[96vw] max-h-[90vh] object-contain rounded-2xl border-2 border-[var(--gold-primary)]">
    </div>

    <button id="ai-floating-btn" onclick="openAiTutor()" class="fixed left-3 sm:left-5 bottom-20 md:bottom-6 z-40 gold-btn px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-black">
        <span class="text-base sm:text-lg">🤖</span><span>اسأل المناضل (AI)</span>
    </button>

    <aside id="ai-tutor-drawer" class="drawer-closed fixed top-0 left-0 h-[100dvh] w-[92vw] sm:w-[420px] z-[90] bg-[var(--bg-card)] border-r-2 border-[var(--gold-primary)] shadow-2xl flex flex-col justify-between">
        <div class="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex justify-between items-center">
            <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-2xl gold-btn flex items-center justify-center text-xl shadow">🤖</div>
                <div><h3 class="font-black text-sm text-[var(--gold-bright)]">المناضل | مساعد MED26 الذكي</h3><p id="ai-current-station-label" class="text-[11px] text-[var(--text-muted)] font-bold truncate max-w-[210px]">جاهز لأسئلتك اليدوية</p></div>
            </div>
            <div class="flex items-center gap-1.5">
                <button onclick="configureUserApiKey()" class="pill-btn px-2.5 py-1.5 rounded-xl text-[11px] font-bold" title="إعدادات الذكاء الاصطناعي">⚙️</button>
                <button onclick="closeAiTutor()" class="pill-btn px-3 py-1.5 rounded-xl text-xs font-extrabold">✕</button>
            </div>
        </div>
        <div id="ai-chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm leading-relaxed"></div>
        <div class="p-3 bg-[var(--bg-secondary)]/95 border-t border-[var(--border-color)] space-y-2">
            <div class="grid grid-cols-2 gap-1.5 hidden"></div>
            <div class="flex gap-1.5">
                <input type="text" id="ai-custom-input" onkeydown="if(event.key==='Enter'){event.preventDefault();sendCustomAiMessage();}" placeholder="اسأل المناضل أي سؤال..." class="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--gold-primary)]">
                <button onclick="sendCustomAiMessage()" class="gold-btn px-4 py-2 rounded-xl text-xs font-black shrink-0">إرسال</button>
            </div>
        </div>
    </aside>

    <div id="med26-pomo-widget" dir="rtl" class="${pomoHidden} fixed bottom-4 right-4 z-[110] select-none">
        <div id="pomo-collapsed" onclick="document.getElementById('pomo-expanded').classList.remove('hidden');this.classList.add('hidden');" class="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 border-2 border-amber-500/70 shadow-xl">
            <span class="text-base">🍅</span><span id="pomo-mini-time" class="font-mono font-black text-sm text-amber-300">${formatPomoTime(pomoTimeLeft)}</span><span class="text-[11px] font-bold text-slate-200">بومودورو</span>
            <button id="pomo-quick-dismiss-btn" type="button" onclick="event.stopPropagation();hidePomodoroWidget();" class="mr-1 w-5 h-5 rounded-full bg-rose-500/25 hover:bg-rose-500 text-rose-200 text-[10px] font-black flex items-center justify-center">✕</button>
        </div>
        <div id="pomo-expanded" class="hidden w-72 bg-slate-900/95 border-2 border-amber-500/60 rounded-2xl p-3.5 shadow-2xl text-white">
            <div class="flex justify-between items-center pb-2 border-b border-slate-700/80">
                <span class="font-black text-xs text-amber-400">🍅 مؤقت المذاكرة</span>
                <div class="flex gap-1">
                    <button onclick="document.getElementById('pomo-expanded').classList.add('hidden');document.getElementById('pomo-collapsed').classList.remove('hidden');" class="text-slate-300 text-xs font-black px-2 py-0.5 rounded bg-slate-800">تصغير _</button>
                    <button onclick="hidePomodoroWidget()" class="text-rose-300 text-[11px] font-black px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40">إخفاء ✕</button>
                </div>
            </div>
            <div class="text-center my-3">
                <div id="pomo-main-time" class="font-mono text-3xl font-black text-amber-300">${formatPomoTime(pomoTimeLeft)}</div>
                <div class="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden"><div id="pomo-prog-bar" class="bg-amber-400 h-full" style="width:0%"></div></div>
            </div>
            <div class="flex gap-1.5 mb-2.5">
                <button id="pomo-toggle-btn" onclick="togglePomoTimer()" class="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs">▶ ابدأ المؤقت</button>
                <button onclick="setPomoCustomMinutes(document.getElementById('pomo-custom-input').value, pomoMode)" class="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs">🔄 إعادة</button>
            </div>
            <div class="grid grid-cols-4 gap-1 mb-2 text-[11px] font-bold">
                <button onclick="setPomoCustomMinutes(25,'focus')" class="py-1 rounded-lg bg-slate-800 border border-slate-700">25 د</button>
                <button onclick="setPomoCustomMinutes(45,'focus')" class="py-1 rounded-lg bg-slate-800 border border-slate-700">45 د</button>
                <button onclick="setPomoCustomMinutes(60,'focus')" class="py-1 rounded-lg bg-slate-800 border border-slate-700">60 د</button>
                <button onclick="setPomoCustomMinutes(parseInt(localStorage.getItem('med26_pomo_break_min')||'5',10),'break')" class="py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">☕ راحة</button>
            </div>
            <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                <span class="text-slate-400 font-bold">تخصيص (بالدقائق):</span>
                <input id="pomo-custom-input" type="number" min="1" max="240" value="${Math.floor(pomoTimeLeft / 60)}" onchange="setPomoCustomMinutes(this.value,'focus')" class="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-center font-black text-amber-300">
            </div>
        </div>
    </div>

    <div id="live-cohort-toast" dir="rtl" class="bg-[var(--bg-card)] border-2 border-[var(--gold-primary)] rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
        <div id="cohort-toast-icon" class="w-10 h-10 rounded-xl gold-btn flex items-center justify-center text-lg shrink-0">🔥</div>
        <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2"><span class="text-[10px] font-black text-emerald-400">نبض الدفعة الحي</span><button onclick="hideCohortToast()" class="text-[10px] text-[var(--text-muted)] font-black">✕</button></div>
            <p id="cohort-toast-text" class="text-xs font-extrabold text-[var(--text-main)] truncate mt-0.5"></p>
        </div>
    </div>

    <footer class="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] pt-3 pb-5 mt-10 relative z-10 space-y-3">
        <div class="footer-marquee-wrap"><div class="footer-marquee-track"><div class="flex items-center whitespace-nowrap">${marqueeHtml}</div><div class="flex items-center whitespace-nowrap">${marqueeHtml}</div></div></div>
        <div class="max-w-[1440px] w-[95%] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-right pt-1">
            <div class="flex items-center gap-2.5"><img data-logo alt="MED26 Logo" class="h-8 sm:h-10 object-contain"><span class="text-xs sm:text-sm font-black text-[var(--text-muted)]">MED26 JAZAN UNIVERSITY • FOUNDATION 2 OSPE</span></div>
            <div class="flex flex-wrap justify-center items-center gap-3">
                <a href="https://t.me/Med26JU_bot" target="_blank" class="pill-btn px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"><span>بوت الدفعة:</span><span dir="ltr" class="kw-highlight">@Med26JU_bot</span></a>
                <div dir="ltr" class="text-xs sm:text-sm font-black text-[var(--text-main)]">Done by <span class="kw-highlight">Lester Crest</span></div>
            </div>
        </div>
    </footer>`;
})();

// ================= 2. المؤثرات الصوتية والنطق الطبي =================
function playToneSequence(freqs, type = 'sine', vol = 0.14, step = 0.08, dur = 0.24) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.type = type; osc.frequency.setValueAtTime(f, ctx.currentTime + i * step);
            gain.gain.setValueAtTime(vol, ctx.currentTime + i * step);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * step + dur);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * step); osc.stop(ctx.currentTime + i * step + dur + 0.02);
        });
    } catch (e) {}
}
function playOspeBell() { playToneSequence([880, 1318.5], 'sine', 0.3, 0.12, 0.9); }
function playExamStartSound() { playToneSequence([523.25, 659.25, 783.99, 1046.5], 'triangle', 0.13, 0.08, 0.22); }
function playExamFinishSound() { playToneSequence([523.25, 659.25, 783.99, 1046.5, 1318.5], 'sine', 0.15, 0.09, 0.35); }
function playPomoStartSound() { playToneSequence([440, 659.25, 880], 'sine', 0.12, 0.09, 0.22); }

function speakMedicalText(rawHtml) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const tmp = document.createElement('div'); tmp.innerHTML = rawHtml || '';
    const kws = Array.from(tmp.querySelectorAll('.kw-highlight')).map(el => el.innerText.trim());
    const txt = (kws.length ? kws.join('. ') : tmp.innerText).replace(/[\u0600-\u06FF]/g, '').replace(/[0-9]+\)|•|-/g, ' ').replace(/\s+/g, ' ').trim();
    const u = new SpeechSynthesisUtterance(txt); u.lang = 'en-US'; u.rate = 0.86;
    window.speechSynthesis.speak(u);
}
function speakCurrentAnswer() { if (currentList[currentIndex]) speakMedicalText(currentList[currentIndex].a); }

// ================= 3. العد التنازلي + الشعار + الأذكار + المظهر =================
function updateExamCountdown() {
    const dEl = document.getElementById('cd-days');
    if (!dEl) return;
    const diff = Math.max(0, new Date(FIXED_EXAM_DATE).getTime() - Date.now());
    dEl.innerText = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cd-hours').innerText = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('cd-mins').innerText = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('cd-secs').innerText = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
setInterval(updateExamCountdown, 1000); updateExamCountdown();

function loadTransparentLogo() {
    const src = (document.body.dataset.track === 'theory') ? 'logo-theory.png' : 'logo.png';
    globalLogoDataUrl = src;
    document.querySelectorAll('img[data-logo]').forEach(el => {
        el.decoding = 'async';
        el.onerror = function() { if (!this.dataset.fb) { this.dataset.fb = '1'; this.src = 'logo.png'; } };
        el.src = src;
    });
}
loadTransparentLogo();

function rotateGlobalAdhkar() {
    currentDhikrIdx = (currentDhikrIdx + 1) % MED26_ADHKAR_LIST.length;
    const text = MED26_ADHKAR_LIST[currentDhikrIdx];
    document.querySelectorAll('.live-dhikr-text').forEach(el => { el.innerText = text; });
}
setInterval(rotateGlobalAdhkar, 7000);

function incrementTasbeehCounter(btnEl, key) {
    const span = btnEl.querySelector('.tasbeeh-count');
    const val = parseInt(localStorage.getItem(`med26_tasbeeh_${key}`) || '0', 10) + 1;
    localStorage.setItem(`med26_tasbeeh_${key}`, String(val));
    if (span) span.innerText = val;
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('med26_theme_mode', isLight ? 'light' : 'dark');
}

// ================= 4. أدوات العينة والسحب وتمرير الهيدر =================
function rotateSpecimen() {
    currentRotation = (currentRotation + 90) % 360;
    const img = document.getElementById('q-image');
    if (img) img.style.transform = `rotate(${currentRotation}deg)`;
}
function cycleSlideEnhancement() {
    enhanceLevel = (enhanceLevel + 1) % 3;
    const img = document.getElementById('q-image'), btn = document.getElementById('enhance-slide-btn');
    if (!img || !btn) return;
    img.classList.remove('enhanced-slide-lvl1', 'enhanced-slide-lvl2');
    if (enhanceLevel === 1) { img.classList.add('enhanced-slide-lvl1'); btn.innerText = '🔆 توضيح: متوسط'; btn.classList.add('active'); }
    else if (enhanceLevel === 2) { img.classList.add('enhanced-slide-lvl2'); btn.innerText = '🔆 توضيح: عالي'; btn.classList.add('active'); }
    else { btn.innerText = '🔆 توضيح العينة'; btn.classList.remove('active'); }
}
function toggleLoupe() {
    loupeActive = !loupeActive;
    const btn = document.getElementById('loupe-toggle-btn'), lens = document.getElementById('magnifier-lens');
    if (btn) { btn.innerText = loupeActive ? '🔬 العدسة: مفعّلة' : '🔬 العدسة: إيقاف'; btn.classList.toggle('active', loupeActive); }
    if (!loupeActive && lens) lens.style.display = 'none';
}
(function bindSpecimenInteractions() {
    const img = document.getElementById('q-image'), lens = document.getElementById('magnifier-lens'), lc = document.getElementById('loupe-container'), card = document.getElementById('station-card');
    if (lc && img && lens) {
        const move = (e) => {
            if (!loupeActive) return;
            e.preventDefault();
            const r = img.getBoundingClientRect();
            const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY;
            const x = cx - r.left, y = cy - r.top;
            if (x < 0 || y < 0 || x > r.width || y > r.height) { lens.style.display = 'none'; return; }
            lens.style.display = 'block';
            lens.style.backgroundImage = `url('${img.src}')`;
            lens.style.backgroundSize = `${r.width * 2.4}px ${r.height * 2.4}px`;
            lens.style.left = `${x - 75}px`; lens.style.top = `${y - 75}px`;
            lens.style.backgroundPosition = `-${x * 2.4 - 75}px -${y * 2.4 - 75}px`;
        };
        lc.addEventListener('mousemove', move); lc.addEventListener('touchmove', move, { passive: false });
        lc.addEventListener('mouseleave', () => lens.style.display = 'none'); lc.addEventListener('touchend', () => lens.style.display = 'none');
    }
    if (card) {
        let sx = 0, sy = 0;
        card.addEventListener('touchstart', e => { if (!loupeActive || !e.target.closest('#loupe-container')) { sx = e.changedTouches[0].screenX; sy = e.changedTouches[0].screenY; } }, { passive: true });
        card.addEventListener('touchend', e => {
            if ((loupeActive && e.target.closest('#loupe-container')) || ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
            const dx = e.changedTouches[0].screenX - sx, dy = e.changedTouches[0].screenY - sy;
            if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.6) { dx > 0 ? nextQuestion() : prevQuestion(); }
        }, { passive: true });
    }
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        const h = document.getElementById('main-header');
        if (!h || h.classList.contains('hidden')) return;
        h.classList.toggle('header-hidden', window.scrollY > lastY && window.scrollY > 90);
        lastY = window.scrollY;
    }, { passive: true });
    document.addEventListener('click', e => {
        const w = document.getElementById('my-tools-dropdown-wrap'), m = document.getElementById('my-tools-menu');
        if (w && m && !w.contains(e.target)) m.classList.add('hidden');
    });
})();

// ================= 5. الإحصائيات والرتبة واستئناف الجلسة ومحطة اليوم =================
function getMyDeviceToken() {
    let t = localStorage.getItem('med26_device_token');
    if (!t) { t = String(Math.floor(1000 + Math.random() * 9000)); localStorage.setItem('med26_device_token', t); }
    return t;
}
function getTotalSolvedCount() {
    const saved = parseInt(localStorage.getItem('med26_total_solved_count') || '0', 10);
    const actual = Math.max(saved, masteredIds.length);
    if (actual !== saved) localStorage.setItem('med26_total_solved_count', String(actual));
    return actual;
}
function incrementTotalSolvedCount() {
    const next = getTotalSolvedCount() + 1;
    localStorage.setItem('med26_total_solved_count', String(next));
    return next;
}
function getStudentRankInfo(n) {
    if (n >= 60) return { title: 'أسطورة الـ OSPE', icon: '👑', color: 'text-amber-300 border-amber-400/60 bg-amber-500/20' };
    if (n >= 30) return { title: 'متألق', icon: '🔥', color: 'text-orange-300 border-orange-400/50 bg-orange-500/15' };
    if (n >= 10) return { title: 'متمكن', icon: '⚡', color: 'text-emerald-300 border-emerald-400/50 bg-emerald-500/15' };
    return { title: 'مبتدئ', icon: '🌱', color: 'text-sky-300 border-sky-400/40 bg-sky-500/15' };
}
function updateStatsUI() {
    const setT = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    setT('stat-total', questionsDB.length); setT('stat-mastered', masteredIds.length);
    setT('stat-mistakes', mistakeIds.length); setT('stat-bookmarks', bookmarkIds.length);
    setT('mistake-count-btn', mistakeIds.length); setT('fav-count-btn', bookmarkIds.length); setT('mob-fav-count', bookmarkIds.length);

    const solved = getTotalSolvedCount(), rank = getStudentRankInfo(solved), user = localStorage.getItem('med26_username') || 'طالب MED26';
    const topB = document.getElementById('top-user-badge');
    if (topB) topB.innerHTML = `<span>👤</span><span id="top-username-text" class="text-[var(--gold-bright)] font-black">${user}</span><span class="px-2 py-0.5 rounded-full text-[10px] font-black border ${rank.color}">${rank.icon} ${rank.title}</span>`;
    setT('bento-welcome-name', user);
    const hr = document.getElementById('bento-welcome-rank');
    if (hr) { hr.className = `px-2.5 py-0.5 rounded-full text-xs font-black border ${rank.color}`; hr.innerText = `${rank.icon} ${rank.title}`; }

    const bestS = Math.max(parseInt(localStorage.getItem('med26_best_streak') || '0', 10), currentStreak);
    setT('hero-quick-streak', `🔥 ${bestS} متتالية`);
    const uLow = user.toLowerCase();
    let players = Array.isArray(globalLivePlayers) ? globalLivePlayers.filter(p => p && p.name && typeof p.solved === 'number') : [];
    players.sort((a, b) => (b.solved || 0) - (a.solved || 0));
    const rIdx = players.findIndex(p => (p.name || '').toLowerCase() === uLow);
    setT('hero-quick-rank', rIdx !== -1 ? `🏆 المركز #${rIdx + 1}` : (solved > 0 ? '🏆 المركز #1' : '🏆 ابدأ لتتصدر'));

    const times = players.map(p => p.bestTime).filter(t => typeof t === 'number' && t > 0);
    const myT = parseInt(localStorage.getItem('med26_best_sim_time') || '0', 10);
    if (myT > 0) times.push(myT);
    const bestT = times.length ? Math.min(...times) : 135;
    setT('gamemode-fastest-time', `⚡ أسرع وقت مسجل في الدفعة: ${String(Math.floor(bestT / 60)).padStart(2, '0')}:${String(bestT % 60).padStart(2, '0')} دقيقة`);
}
function updateSubjectCardsLabColors() {}
function updateStreakUI() {
    const b = document.getElementById('streak-badge'), t = document.getElementById('streak-text');
    if (!b || !t) return;
    if (currentStreak >= 3) {
        const title = currentStreak >= 15 ? 'أسطورة MED26 💎' : currentStreak >= 12 ? 'دكتور المستقبل 👑' : currentStreak >= 9 ? 'وحش العملي 🌟' : currentStreak >= 6 ? 'تركيز عالي ⚡' : 'بداية قوية!';
        t.innerText = `🔥 ${currentStreak} إجابات صحيحة متتالية • ${title}`;
        b.classList.remove('hidden'); b.classList.add('flex');
    } else { b.classList.add('hidden'); b.classList.remove('flex'); }
}
function saveLastSessionState() {
    if (document.getElementById('view-trainer')?.classList.contains('hidden') || !currentList[currentIndex]) return;
    const q = currentList[currentIndex];
    localStorage.setItem('med26_last_session', JSON.stringify({ title: document.getElementById('trainer-title')?.innerText || q.subject, subject: q.subject, lab: q.lab, stationId: q.id, index: currentIndex, ids: currentList.map(i => i.id), savedAt: Date.now() }));
    updateContinueSessionBtnUI();
}
function updateContinueSessionBtnUI() {
    const sub = document.getElementById('continue-session-subtext');
    if (!sub) return;
    try {
        const st = JSON.parse(localStorage.getItem('med26_last_session') || 'null');
        if (st && st.ids?.length) { sub.innerText = `${st.subject} • ${st.lab} (المحطة ${(st.index || 0) + 1} من ${st.ids.length})`; return; }
    } catch (e) {}
    sub.innerText = 'ابدأ بالمحطات الأكثر تكراراً في الاختبار (High-Yield)';
}
function resumeLastSession() {
    try {
        const st = JSON.parse(localStorage.getItem('med26_last_session') || 'null');
        const list = (st?.ids || []).map(id => questionsDB.find(q => q.id === id)).filter(Boolean);
        if (list.length) {
            currentList = list; currentIndex = Math.min(st.index || 0, list.length - 1);
            isExamSimulator = false; isBlitzMode = false; activeTimerSeconds = 0; sessionResults = {}; sessionStartTime = Date.now();
            document.getElementById('trainer-title').innerText = st.title || 'استئناف الجلسة';
            switchView('trainer'); renderQuestion(); return;
        }
    } catch (e) {}
    startTraining({ highYield: true });
}
function pickRandomSpotOfTheDay(forceRandom = false) {
    const pool = questionsDB.filter(q => !q.noSample);
    if (!pool.length) return;
    currentSpotStation = forceRandom ? pool[Math.floor(Math.random() * pool.length)] : pool[(new Date().getDate() + new Date().getMonth() * 31) % pool.length];
    const q = currentSpotStation, img = document.getElementById('spot-day-img'), qEl = document.getElementById('spot-day-q');
    if (!img || !qEl) return;
    setSlideSource(img, q.page, q.slot || 0, false);
    document.getElementById('spot-day-sub').innerText = `${q.subject} • ${q.lab} (${q.year})`;
    qEl.innerText = q.q;
    const ans = document.getElementById('spot-day-ans'); ans.innerHTML = q.a; ans.classList.add('hidden');
    document.getElementById('spot-day-reveal-btn')?.classList.remove('hidden');
}

// ================= 6. التنقل والروابط الذكية =================
function getCurrentFileName() { return (window.location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
function switchView(view, skipHistoryPush = false) {
    if (window.MED26_MULTIPAGE_MODE && !skipHistoryPush && MULTI_PAGE_FILES[view]) {
        const target = MULTI_PAGE_FILES[view], cur = getCurrentFileName();
        if (cur !== target && !(cur === '' && target === 'index.html')) { window.location.href = target; return; }
    }
    if (view !== 'trainer') toggleZenFocusMode(false);
    clearInterval(timerInterval);
    document.getElementById('f2-checklist-modal')?.classList.add('hidden');
    ['exam-timer-box', 'timeout-toast', 'srs-toast'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
    ['home', 'atlas', 'report', 'custom', 'trainer', 'no-practice', 'scoreboard'].forEach(v => {
        document.getElementById(`view-${v}`)?.classList.toggle('hidden', view !== v);
        document.getElementById(`nav-${v}`)?.classList.toggle('active', view === v);
        document.getElementById(`mob-${v}`)?.classList.toggle('active', view === v);
    });
    const mh = document.getElementById('main-header');
    if (mh) { if (view === 'trainer') mh.classList.add('hidden'); else mh.classList.remove('hidden', 'header-hidden'); }
    if (PAGE_TITLES_MAP[view]) document.title = PAGE_TITLES_MAP[view];
    if (!skipHistoryPush && !isHandlingRouteChange) {
        const h = view === 'home' ? '#/home' : `#/${view}`;
        if (window.location.hash !== h) history.pushState({ view }, PAGE_TITLES_MAP[view] || '', h);
    }
    if (view === 'custom') updateCustomCount();
    if (view === 'atlas') renderAtlasGrid();
    if (view === 'scoreboard') renderScoreboardLists();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function acceptDisclaimer() {
    sessionStorage.setItem('med26_session_agreed', '1');
    document.documentElement.classList.add('session-agreed');
    const dm = document.getElementById('disclaimer-modal'); if (dm) dm.style.display = 'none';
    document.body.classList.remove('modal-open');
    const params = new URLSearchParams(window.location.search);
    if (params.get('challenge')) {
        const matched = params.get('challenge').split(',').map(n => questionsDB.find(q => q.id === parseInt(n, 10))).filter(Boolean);
        if (matched.length) { startExamSimulator(matched, '⚔️ تحدي الأصدقاء المشترك'); return; }
    }
    const stId = parseInt(params.get('station'), 10);
    if (stId) {
        const idx = questionsDB.findIndex(q => q.id === stId);
        if (idx !== -1) {
            currentList = [...questionsDB]; currentIndex = idx; isExamSimulator = false; isBlitzMode = false; activeTimerSeconds = 0; sessionResults = {}; sessionStartTime = Date.now();
            document.getElementById('trainer-title').innerText = '🔗 محطة مشتركة';
            switchView('trainer'); renderQuestion();
        }
    }
}

// ================= 7. الأطلس والتدريب والمحاكي والتحدي =================
function getSubjectBadgeClass(sub) { return sub === 'MICROBIOLOGY' ? 'sub-micro' : sub === 'PATHOLOGY' ? 'sub-patho' : sub === 'HISTOLOGY' ? 'sub-histo' : 'sub-surg'; }
function setSlideSource(imgEl, page, slot, isFull) { imgEl.onerror = null; imgEl.src = isFull ? `slides/p${page}_full.png` : `slides/p${page}_s${slot}.png`; }

function toggleBuzzwordsSubView(showBuzz) {
    document.getElementById('atlas-images-subview')?.classList.toggle('hidden', showBuzz);
    document.getElementById('atlas-buzzwords-subview')?.classList.toggle('hidden', !showBuzz);
    document.getElementById('tab-atlas-imgs').className = showBuzz ? 'pill-btn px-3.5 py-2 rounded-xl text-xs font-bold' : 'gold-btn px-3.5 py-2 rounded-xl text-xs font-black';
    document.getElementById('tab-atlas-buzz').className = showBuzz ? 'gold-btn px-3.5 py-2 rounded-xl text-xs font-black' : 'pill-btn px-3.5 py-2 rounded-xl text-xs font-bold';
}
function filterAtlas(sub) {
    currentAtlasFilter = sub;
    document.querySelectorAll('#atlas-filter-bar button').forEach(b => b.classList.toggle('active', b.dataset.sub === sub));
    renderAtlasGrid();
}
function renderAtlasGrid() {
    const grid = document.getElementById('atlas-grid'); if (!grid) return;
    const query = (document.getElementById('atlas-search')?.value || '').toLowerCase().trim(), seen = new Set();
    const filtered = questionsDB.filter(q => {
        if (q.noSample || (currentAtlasFilter !== 'ALL' && q.subject !== currentAtlasFilter)) return false;
        const key = `${q.page}_${q.slot}`; if (seen.has(key)) return false;
        const n = (personalNotes[q.id] || '').toLowerCase();
        if (query && !q.a.toLowerCase().includes(query) && !q.lab.toLowerCase().includes(query) && !q.q.toLowerCase().includes(query) && !n.includes(query)) return false;
        seen.add(key); return true;
    });
    grid.innerHTML = filtered.map(q => `
        <div class="app-card rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div class="space-y-2.5">
                <div class="flex justify-between items-center gap-1"><span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase ${getSubjectBadgeClass(q.subject)}">${q.subject}</span><span class="text-[11px] text-[var(--text-muted)] font-bold truncate">${q.lab} (${q.year})</span></div>
                <div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2 flex items-center justify-center"><img src="${q.customImage || `slides/p${q.page}_s${q.slot || 0}.png`}" loading="lazy" decoding="async" onclick="openZoomModal(this.src)" class="w-full h-44 object-contain rounded-lg cursor-zoom-in"></div>
                <div class="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3 text-left text-xs sm:text-sm font-bold leading-relaxed" dir="ltr">${q.a}</div>
                ${personalNotes[q.id] ? `<div class="bg-amber-500/15 border border-amber-400/40 rounded-xl p-2 text-xs text-amber-200 font-bold">📝 ربطتي: ${personalNotes[q.id]}</div>` : ''}
            </div>
            <div class="flex justify-between items-center gap-2 pt-2 border-t border-[var(--border-color)]">
                <button onclick="speakMedicalText(\`${q.a.replace(/`/g, "'")}\`)" class="pill-btn px-3 py-1.5 rounded-xl text-xs font-extrabold text-[var(--gold-bright)]">🔊 نطق المصطلح</button>
                <button onclick="openStationFromAtlas(${q.id})" class="gold-btn px-3.5 py-1.5 rounded-xl text-xs font-black">تدرّب على السؤال ⬅️</button>
            </div>
        </div>`).join('');
}
function openStationFromAtlas(qId) {
    const idx = questionsDB.findIndex(q => q.id === qId);
    if (idx === -1) return;
    currentList = [...questionsDB]; currentIndex = idx; isExamSimulator = false; isBlitzMode = false; activeTimerSeconds = 0; sessionResults = {}; sessionStartTime = Date.now();
    document.getElementById('trainer-title').innerText = '🖼️ تدريب من الأطلس البصري';
    switchView('trainer'); renderQuestion();
}

function getCustomFilteredList() {
    const subs = Array.from(document.querySelectorAll('#custom-subjects input[type="checkbox"]:not(.sublab-cb):checked')).map(i => i.value);
    const yrs = Array.from(document.querySelectorAll('#custom-years input:checked')).map(i => i.value);
    const cat = document.querySelector('input[name="custom-cat"]:checked')?.value || 'all';
    const type = document.getElementById('custom-type')?.value || 'all';
    const hy = !!document.getElementById('custom-highyield')?.checked;
    return questionsDB.filter(q => subs.includes(q.subject) && (cat === 'all' || q.category === cat) && (q.category !== 'compilation' || yrs.includes(String(q.year))) && (type === 'all' || q.type === type) && (!hy || q.highYield));
}
function updateCustomCount() { const el = document.getElementById('custom-match-count'); if (el) el.innerText = getCustomFilteredList().length; }

function launchCustomTraining() {
    let list = getCustomFilteredList();
    if (!list.length) { alert('يرجى اختيار مادة واحدة على الأقل لتوليد الأسئلة.'); return; }
    if (document.getElementById('custom-shuffle')?.checked) list = [...list].sort(() => Math.random() - 0.5);
    currentList = list.slice(0, parseInt(document.getElementById('custom-limit')?.value || '999', 10));
    currentIndex = 0; sessionResults = {}; sessionStartTime = Date.now(); currentStreak = 0; maxSessionStreak = 0; isBlitzMode = false;
    activeTimerSeconds = parseInt(document.getElementById('custom-timer')?.value || '0', 10);
    isExamSimulator = activeTimerSeconds > 0; updateStreakUI();
    document.getElementById('trainer-title').innerText = `🎯 تدريب مخصص (${currentList.length} محطة)`;
    switchView('trainer'); playExamStartSound();
    if (activeTimerSeconds > 0) { document.getElementById('exam-timer-box').classList.remove('hidden'); document.getElementById('exam-timer-box').classList.add('flex'); resetStationTimer(); }
    renderQuestion();
}
function launchCustomFriendChallenge() {
    let list = getCustomFilteredList();
    if (!list.length) { alert('يرجى اختيار مادة واحدة على الأقل لإنشاء التحدي.'); return; }
    if (document.getElementById('custom-shuffle')?.checked) list = [...list].sort(() => Math.random() - 0.5);
    const sel = list.slice(0, parseInt(document.getElementById('custom-limit')?.value || '18', 10));
    const url = `${window.location.origin}${window.location.pathname}?challenge=${sel.map(q => q.id).join(',')}`;
    navigator.clipboard.writeText(url).then(() => alert(`⚔️ تم نسخ رابط التحدي المخصص (${sel.length} محطة)!`));
    startExamSimulator(sel, `⚔️ تحدي مخصص مع صاحبي (${sel.length} محطة)`);
}

function startTraining(opts = {}) {
    clearInterval(timerInterval); isExamSimulator = false; isBlitzMode = false; sessionResults = {}; sessionStartTime = Date.now(); currentStreak = 0; maxSessionStreak = 0; updateStreakUI();
    if (opts.category === 'practice') { document.getElementById('no-practice-subject').innerText = opts.subject ? `قسم التدريبات العملية • ${opts.subject}` : 'قسم التدريبات العملية • MED26'; switchView('no-practice'); return; }
    activeTimerSeconds = opts.timer || 0;
    currentList = questionsDB.filter(q => {
        if (opts.source === 'mistakes') return mistakeIds.includes(q.id);
        if (opts.source === 'bookmarks') return bookmarkIds.includes(q.id);
        if (opts.subject && q.subject !== opts.subject) return false;
        if (opts.lab && !(q.lab || '').includes(opts.lab)) return false;
        if (opts.category && opts.category !== 'all' && q.category !== opts.category) return false;
        if (opts.year && q.year !== opts.year) return false;
        if (opts.highYield && !q.highYield) return false;
        return true;
    });
    if (!currentList.length) { alert(opts.source === 'bookmarks' ? 'قائمة المفضلة فارغة حالياً!' : opts.source === 'mistakes' ? 'سلة الأخطاء فارغة حالياً، أحسنت!' : 'لا توجد محطات مطابقة حالياً.'); return; }
    currentIndex = 0;
    document.getElementById('trainer-title').innerText = opts.subject ? `${opts.subject} (${opts.lab || 'بالكامل'})` : opts.source === 'mistakes' ? '⚠️ مراجعة سلة الأخطاء' : opts.source === 'bookmarks' ? '⭐ المفضلة' : opts.highYield ? '🔥 الأكثر تكراراً' : 'التدريب الشامل';
    switchView('trainer'); playExamStartSound(); renderQuestion();
}

function startExamSimulator(customList = null, customTitle = null) {
    currentList = customList || [...questionsDB].sort(() => Math.random() - 0.5).slice(0, 18);
    currentIndex = 0; activeTimerSeconds = 90; isExamSimulator = true; isBlitzMode = false; sessionResults = {}; sessionStartTime = Date.now(); currentStreak = 0; maxSessionStreak = 0; updateStreakUI();
    document.getElementById('trainer-title').innerText = customTitle || '⏱️ محاكي الـ OSPE الفعلي (18 محطة • من 20 درجة)';
    switchView('trainer'); playExamStartSound();
    document.getElementById('exam-timer-box').classList.remove('hidden'); document.getElementById('exam-timer-box').classList.add('flex');
    renderQuestion(); resetStationTimer();
}
function startBlitzMode() {
    clearInterval(timerInterval);
    currentList = questionsDB.filter(q => q.type === 'mcq').sort(() => Math.random() - 0.5).slice(0, 25);
    currentIndex = 0; isBlitzMode = true; isExamSimulator = true; activeTimerSeconds = 60; timeLeft = 60; currentStreak = 0; maxSessionStreak = 0; sessionResults = {}; sessionStartTime = Date.now(); updateStreakUI();
    document.getElementById('trainer-title').innerText = '⚡ تحدي الـ Blitz السريع (25 سؤال في 60 ثانية)';
    switchView('trainer'); playExamStartSound();
    document.getElementById('exam-timer-box').classList.remove('hidden'); document.getElementById('exam-timer-box').classList.add('flex');
    renderQuestion(); updateTimerDisplay();
    timerInterval = setInterval(() => { timeLeft--; updateTimerDisplay(); if (timeLeft <= 0) { clearInterval(timerInterval); playOspeBell(); showWeaknessReport(); } }, 1000);
}
function resetStationTimer() {
    if (isBlitzMode) return;
    clearInterval(timerInterval); if (activeTimerSeconds <= 0) return;
    timeLeft = activeTimerSeconds; updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--; updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval); playOspeBell();
            if (!currentStationAnswered) markQuestion(false, false);
            const t = document.getElementById('timeout-toast'); t.classList.remove('hidden');
            setTimeout(() => { t.classList.add('hidden'); nextQuestion(); }, 1800);
        }
    }, 1000);
}
function updateTimerDisplay() {
    const el = document.getElementById('exam-timer'); if (!el) return;
    el.innerText = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
    el.className = timeLeft <= 15 ? 'text-sm sm:text-lg font-black text-red-400 animate-pulse' : 'text-sm sm:text-lg font-black text-amber-300';
}

// ================= 8. عرض السؤال والتصحيح وخريطة المحطات =================
function renderStationNavigator() {
    const bar = document.getElementById('station-navigator-bar');
    if (!bar || !Array.isArray(currentList)) return;
    bar.innerHTML = currentList.map((q, idx) => {
        const r = sessionResults[q.id];
        return `<button type="button" onclick="jumpToStation(${idx})" class="st-nav-box ${r ? (r.correct ? 'nav-correct' : 'nav-wrong') : ''} ${idx === currentIndex ? 'nav-current' : ''}">${idx + 1}</button>`;
    }).join('');
    bar.querySelector('.nav-current')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}
function jumpToStation(idx) {
    if (idx < 0 || idx >= currentList.length) return;
    currentIndex = idx; renderQuestion(); if (activeTimerSeconds > 0 && !isBlitzMode) resetStationTimer();
}
function toggleZenFocusMode(force) {
    const on = typeof force === 'boolean' ? force : !document.body.classList.contains('med26-zen-mode');
    document.body.classList.toggle('med26-zen-mode', on);
    const btn = document.getElementById('zen-mode-toggle-btn'), lbl = document.getElementById('zen-btn-label');
    if (btn) btn.classList.toggle('active', on);
    if (lbl) lbl.innerText = on ? 'إنهاء التركيز (Esc)' : 'وضع التركيز';
}

function renderQuestion() {
    const q = currentList[currentIndex]; if (!q) return;
    showingFullSlide = false; currentStationAnswered = false; currentRotation = 0;
    const img = document.getElementById('q-image'); if (img) img.style.transform = 'rotate(0deg)';
    const lens = document.getElementById('magnifier-lens'); if (lens) lens.style.display = 'none';
    document.getElementById('user-typed-answer').value = '';
    document.getElementById('typing-feedback').classList.add('hidden');
    document.getElementById('station-personal-note').value = personalNotes[q.id] || '';
    document.getElementById('question-counter').innerText = `${currentIndex + 1} / ${currentList.length}`;

    const subEl = document.getElementById('q-subject');
    subEl.innerText = q.subject; subEl.className = `px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase ${getSubjectBadgeClass(q.subject)}`;
    document.getElementById('q-lab').innerText = q.lab;
    document.getElementById('q-year').innerText = `دفعة ${q.year}`;
    document.getElementById('q-highyield').classList.toggle('hidden', !q.highYield);
    document.getElementById('q-compilation-tag').innerText = q.category === 'compilation' ? '📌 تجميعات سابقة موثقة' : '🧪 تدريب عملي';

    document.getElementById('q-meta-badges').classList.toggle('hidden', isExamSimulator);
    const simB = document.getElementById('q-sim-hidden-badge');
    simB.classList.toggle('hidden', !isExamSimulator); if (isExamSimulator) simB.classList.add('flex');

    updateBookmarkBtnUI(q.id);
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('img-wrapper').classList.toggle('hidden', !!q.noSample);
    document.getElementById('no-sample-badge').classList.toggle('hidden', !q.noSample);
    if (!q.noSample) setSlideSource(img, q.page, q.slot || 0, false);

    document.getElementById('team-note-box').classList.toggle('hidden', !q.note);
    if (q.note) document.getElementById('team-note-text').innerText = q.note;

    const mcqBox = document.getElementById('mcq-container'), typBox = document.getElementById('typing-checker-box');
    document.getElementById('answer-box').classList.add('hidden');
    document.getElementById('reveal-btn').classList.remove('hidden');
    document.getElementById('q-answer').innerHTML = q.a;

    if (q.type === 'mcq') {
        typBox.classList.add('hidden'); mcqBox.classList.remove('hidden'); mcqBox.innerHTML = '';
        (q.options || []).forEach((opt, i) => {
            const b = document.createElement('button');
            b.className = 'w-full text-left p-3.5 sm:p-4 rounded-xl pill-btn font-bold text-sm sm:text-base md:text-lg block';
            b.innerText = opt; b.onclick = () => checkMcq(i, q.correct);
            mcqBox.appendChild(b);
        });
    } else { typBox.classList.remove('hidden'); mcqBox.classList.add('hidden'); }

    saveLastSessionState(); rotateGlobalAdhkar(); renderStationNavigator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkMcq(selected, correct) {
    currentStationAnswered = true;
    const btns = document.getElementById('mcq-container').children;
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (i === correct) btns[i].className = 'w-full text-left p-3.5 sm:p-4 rounded-xl bg-emerald-600 text-white font-extrabold text-sm sm:text-base md:text-lg block';
        else if (i === selected) btns[i].className = 'w-full text-left p-3.5 sm:p-4 rounded-xl bg-red-600 text-white font-extrabold text-sm sm:text-base md:text-lg block';
    }
    revealAnswer();
    if (selected === correct) incrementTotalSolvedCount();
    markQuestion(selected === correct, false);
    if (isBlitzMode) setTimeout(() => nextQuestion(), 450);
}

function revealAnswer() {
    document.getElementById('reveal-btn').classList.add('hidden');
    document.getElementById('answer-box').classList.remove('hidden');
    document.getElementById('q-meta-badges').classList.remove('hidden');
    document.getElementById('q-sim-hidden-badge').classList.add('hidden');
}

function levenshteinDistance(a, b) {
    const m = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) m[i][0] = i;
    for (let j = 0; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i-1][j]+1, m[i][j-1]+1, m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return m[a.length][b.length];
}
function checkTypedAnswer() {
    const userText = (document.getElementById('user-typed-answer')?.value || '').trim().toLowerCase();
    if (!userText) { alert('اكتب التشخيص أولاً للتحقق منه.'); return; }
    const tmp = document.createElement('div'); tmp.innerHTML = currentList[currentIndex].a;
    const kws = Array.from(tmp.querySelectorAll('.kw-highlight')).map(e => e.innerText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()).filter(Boolean);
    const uWords = userText.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    let hits = 0;
    kws.forEach(kw => {
        if (userText.includes(kw) || kw.includes(userText) || kw.split(/\s+/).filter(w => w.length > 3).some(k => uWords.some(u => levenshteinDistance(u, k) <= (k.length > 6 ? 2 : 1)))) hits++;
    });
    const fb = document.getElementById('typing-feedback'); fb.classList.remove('hidden');
    fb.className = hits > 0 ? 'text-xs sm:text-sm font-extrabold p-3 rounded-xl bg-emerald-600/25 border border-emerald-400 text-emerald-300' : 'text-xs sm:text-sm font-extrabold p-3 rounded-xl bg-amber-600/25 border border-amber-400 text-amber-200';
    fb.innerText = hits > 0 ? '✅ إجابة صحيحة! طابقت الكلمات المفتاحية.' : '⚠️ لم تطابق الكلمات المفتاحية بدقة، راجع الإجابة النموذجية أدناه.';
    revealAnswer();
}

function handleSpacedRepetition(level) {
    const q = currentList[currentIndex];
    if (level === 'easy') { incrementTotalSolvedCount(); markQuestion(true, false); nextQuestion(); }
    else if (level === 'medium') { currentStreak = 0; updateStreakUI(); sessionResults[q.id] = { correct: false, q }; if (!isExamSimulator && !isBlitzMode && currentList.length < 150) currentList.push({ ...q }); renderStationNavigator(); nextQuestion(); }
    else { markQuestion(false, false); if (!isExamSimulator && !isBlitzMode && currentList.length < 150) { currentList.splice(Math.min(currentIndex + 3, currentList.length), 0, { ...q }); const t = document.getElementById('srs-toast'); t.classList.remove('hidden'); setTimeout(() => t.classList.add('hidden'), 2000); } renderStationNavigator(); nextQuestion(); }
}

function markQuestion(isMastered, autoAdvance = true) {
    currentStationAnswered = true;
    const q = currentList[currentIndex]; if (!q) return;
    sessionResults[q.id] = { correct: isMastered, q };
    if (isMastered) {
        currentStreak++; if (currentStreak > maxSessionStreak) maxSessionStreak = currentStreak;
        if (!masteredIds.includes(q.id)) masteredIds.push(q.id);
        mistakeIds = mistakeIds.filter(id => id !== q.id);
    } else {
        currentStreak = 0; if (!mistakeIds.includes(q.id)) mistakeIds.push(q.id);
    }
    updateStreakUI();
    localStorage.setItem('med26_f2_mastered', JSON.stringify(masteredIds));
    localStorage.setItem('med26_f2_mistakes', JSON.stringify(mistakeIds));
    updateStatsUI(); renderStationNavigator();
    if (autoAdvance) nextQuestion();
}

function savePersonalNote() {
    const q = currentList[currentIndex]; if (!q) return;
    const v = document.getElementById('station-personal-note').value;
    if (v.trim()) personalNotes[q.id] = v; else delete personalNotes[q.id];
    localStorage.setItem('med26_f2_notes', JSON.stringify(personalNotes));
    const ind = document.getElementById('note-saved-indicator'); ind.style.opacity = '1';
    clearTimeout(noteSaveTimeout); noteSaveTimeout = setTimeout(() => ind.style.opacity = '0', 1400);
}
function updateBookmarkBtnUI(id) {
    const fav = bookmarkIds.includes(id);
    document.getElementById('bookmark-icon').innerText = fav ? '⭐' : '☆';
    document.getElementById('bookmark-btn').classList.toggle('active', fav);
}
function toggleBookmarkCurrent() {
    const id = currentList[currentIndex]?.id; if (!id) return;
    bookmarkIds = bookmarkIds.includes(id) ? bookmarkIds.filter(x => x !== id) : [...bookmarkIds, id];
    localStorage.setItem('med26_f2_bookmarks', JSON.stringify(bookmarkIds));
    updateBookmarkBtnUI(id); updateStatsUI();
}
function copyStationLink() {
    const q = currentList[currentIndex]; if (!q) return;
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?station=${q.id}`).then(() => {
        const el = document.getElementById('copy-link-text'); el.innerText = 'تم النسخ ✅';
        setTimeout(() => el.innerText = 'نسخ رابط السؤال', 2000);
    });
}
function nextQuestion() { if (currentIndex < currentList.length - 1) { currentIndex++; renderQuestion(); if (activeTimerSeconds > 0 && !isBlitzMode) resetStationTimer(); } else { clearInterval(timerInterval); showWeaknessReport(); } }
function prevQuestion() { if (currentIndex > 0) { currentIndex--; renderQuestion(); if (activeTimerSeconds > 0 && !isBlitzMode) resetStationTimer(); } }
function toggleFullSlide() { showingFullSlide = !showingFullSlide; const q = currentList[currentIndex]; setSlideSource(document.getElementById('q-image'), q.page, q.slot || 0, showingFullSlide); }
function openZoomModal(src) { document.getElementById('zoom-img').src = src; const m = document.getElementById('zoom-modal'); m.classList.remove('hidden'); m.classList.add('flex'); }
function closeZoomModal() { document.getElementById('zoom-modal').classList.add('hidden'); }

// ================= 9. التقرير والطباعة والتحديات =================
function finishOrExitSession() { clearInterval(timerInterval); Object.keys(sessionResults).length ? showWeaknessReport() : switchView('home'); }
function recordScoreboardStats() {
    const entries = Object.values(sessionResults), ok = entries.filter(e => e.correct).length;
    const sec = Math.max(5, Math.floor((Date.now() - sessionStartTime) / 1000));
    if (maxSessionStreak > parseInt(localStorage.getItem('med26_best_streak') || '0', 10)) localStorage.setItem('med26_best_streak', String(maxSessionStreak));
    if (isExamSimulator && !isBlitzMode && ok >= 12 && sec < parseInt(localStorage.getItem('med26_best_sim_time') || '9999', 10)) localStorage.setItem('med26_best_sim_time', String(sec));
    if ((window.location.search.includes('challenge=') || (document.getElementById('trainer-title')?.innerText || '').includes('تحدي')) && ok >= Math.ceil(currentList.length * 0.6)) {
        localStorage.setItem('med26_challenge_wins', String(parseInt(localStorage.getItem('med26_challenge_wins') || '0', 10) + 1));
    }
    if (typeof window.syncLiveScoreboard === 'function') window.syncLiveScoreboard(true);
}
function showWeaknessReport() {
    clearInterval(timerInterval); toggleZenFocusMode(false);
    const entries = Object.values(sessionResults); if (!entries.length) { switchView('home'); return; }
    playExamFinishSound(); recordScoreboardStats();
    const total = isExamSimulator ? currentList.length : entries.length, ok = entries.filter(e => e.correct).length;
    const pct = Math.round((ok / Math.max(1, total)) * 100), sc20 = Math.round(((ok / Math.max(1, total)) * 20) * 10) / 10;
    const sec = Math.max(1, Math.floor((Date.now() - sessionStartTime) / 1000));
    document.getElementById('scorecard-mode-label').innerText = isBlitzMode ? '⚡ تحدي 60 ثانية' : (isExamSimulator ? `⏱️ المحاكي (${total} محطة)` : `📊 تقرير (${total} محطة)`);
    document.getElementById('report-score-20').innerText = `${sc20} / 20`;
    document.getElementById('report-score-badge').innerText = `نسبة الإتقان: ${pct}% (${ok} من ${total})`;
    document.getElementById('sc-correct').innerText = `${ok}/${total}`;
    document.getElementById('sc-streak').innerText = `🔥 ${maxSessionStreak}`;
    document.getElementById('sc-time').innerText = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

    const labs = {};
    entries.forEach(e => { const k = `${e.q.subject} • ${e.q.lab}`; if (!labs[k]) labs[k] = { t: 0, c: 0, s: e.q.subject, l: e.q.lab }; labs[k].t++; if (e.correct) labs[k].c++; });
    document.getElementById('report-labs-breakdown').innerHTML = Object.entries(labs).sort((a, b) => (a[1].c / a[1].t) - (b[1].c / b[1].t)).map(([k, st]) => {
        const p = Math.round((st.c / st.t) * 100), w = p < 75;
        return `<div class="bg-[var(--bg-secondary)] border ${w ? 'border-red-400/50' : 'border-emerald-500/40'} rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div><span class="text-xs sm:text-sm font-black ${w ? 'text-red-300' : 'text-emerald-300'}">${w ? '⚠️ يحتاج تركيز:' : '✅ متقن:'} ${k}</span><p class="text-xs text-[var(--text-muted)]">أجبت بشكل صحيح على ${st.c} من ${st.t} (${p}%)</p></div>
            <button onclick="startTraining({subject:'${st.s.replace(/'/g,"\\'")}', lab:'${st.l.replace(/'/g,"\\'")}'})" class="pill-btn px-4 py-2 rounded-xl text-xs font-bold shrink-0">تدرّب على هذا المعمل ⬅️</button>
        </div>`;
    }).join('');
    document.getElementById('report-retry-mistakes-btn').classList.toggle('hidden', !entries.some(e => !e.correct));
    switchView('report');
}
function retrySessionMistakes() {
    const m = Object.values(sessionResults).filter(e => !e.correct).map(e => e.q); if (!m.length) return;
    currentList = m; currentIndex = 0; activeTimerSeconds = 0; isExamSimulator = false; isBlitzMode = false; sessionResults = {}; sessionStartTime = Date.now();
    document.getElementById('trainer-title').innerText = `🔄 مراجعة أخطاء الجلسة (${m.length})`;
    switchView('trainer'); playExamStartSound(); renderQuestion();
}
function downloadScoreCardImage() {
    const c = document.createElement('canvas'); c.width = 1080; c.height = 680; const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 1080, 680); g.addColorStop(0, '#1e1b17'); g.addColorStop(1, '#29221a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 680); ctx.strokeStyle = '#cfa96b'; ctx.lineWidth = 5; ctx.strokeRect(28, 28, 1024, 624);
    ctx.fillStyle = '#cfa96b'; ctx.font = 'bold 28px Cairo, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('MED26 FOUNDATION 2 • OFFICIAL SCORE CARD', 540, 105);
    ctx.fillStyle = '#ebd2a4'; ctx.font = '900 96px Cairo, Arial'; ctx.fillText(document.getElementById('report-score-20').innerText, 540, 260);
    ctx.fillStyle = '#6ee7b7'; ctx.font = 'bold 30px Cairo, sans-serif'; ctx.fillText(document.getElementById('report-score-badge').innerText, 540, 330);
    [{ l: 'الصحيحة', v: document.getElementById('sc-correct').innerText, x: 220 }, { l: 'أعلى سلسلة', v: document.getElementById('sc-streak').innerText, x: 540 }, { l: 'الوقت', v: document.getElementById('sc-time').innerText, x: 860 }].forEach(b => {
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(b.x - 135, 390, 270, 130); ctx.strokeStyle = 'rgba(207,169,107,0.45)'; ctx.strokeRect(b.x - 135, 390, 270, 130);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 40px Cairo'; ctx.fillText(b.v, b.x, 455); ctx.fillStyle = '#c4baa8'; ctx.font = 'bold 20px Cairo'; ctx.fillText(b.l, b.x, 498);
    });
    ctx.fillStyle = '#c4baa8'; ctx.font = 'bold 22px Arial'; ctx.fillText('MED26 JAZAN UNIVERSITY • Done by Lester Crest', 540, 595);
    const a = document.createElement('a'); a.download = 'MED26_ScoreCard.png'; a.href = c.toDataURL('image/png'); a.click();
}
function shareCurrentChallengeLink() {
    const list = currentList.length ? currentList : [...questionsDB].sort(() => Math.random() - 0.5).slice(0, 18);
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?challenge=${list.map(q => q.id).join(',')}`).then(() => alert(`⚔️ تم نسخ رابط التحدي (${list.length} محطة)!`));
}
function createDirectFriendChallenge() {
    const r18 = [...questionsDB].sort(() => Math.random() - 0.5).slice(0, 18);
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?challenge=${r18.map(q => q.id).join(',')}`).then(() => { alert('⚔️ تم نسخ رابط التحدي (18 محطة)! أرسله لصاحبك الآن.'); startExamSimulator(r18, '⚔️ تحدي الأصدقاء (18 محطة)'); });
}
function printCustomPDF(mode = 'both') {
    const ids = mode === 'mistakes' ? [...mistakeIds] : mode === 'bookmarks' ? [...bookmarkIds] : Array.from(new Set([...mistakeIds, ...bookmarkIds]));
    const list = questionsDB.filter(q => ids.includes(q.id));
    if (!list.length) { alert('سلة الأخطاء والمفضلة فارغة حالياً!'); return; }
    document.getElementById('print-pdf-container').innerHTML = `<div style="text-align:center;border-bottom:3px solid #b88f4d;padding-bottom:12px;margin-bottom:20px;"><h1 style="font-size:22px;font-weight:900;margin:0;">ملف المراجعة الشخصي | MED26 (${list.length})</h1></div>` + list.map((q, i) => `
        <div class="print-station-box"><div style="display:flex;justify-content:space-between;border-bottom:1px solid #ddd;padding-bottom:5px;margin-bottom:8px;font-size:12px;font-weight:bold;"><span>#${i + 1} • ${q.subject} (${q.lab})</span><span>${q.year || ''}</span></div>
        <div style="text-align:left;" dir="ltr"><div style="font-weight:800;font-size:14px;margin-bottom:6px;white-space:pre-line;">${q.q}</div><div style="padding:8px;background:#eefaf4;border:1px solid #10b981;border-radius:8px;font-size:13px;font-weight:bold;">${q.a}</div></div>
        ${personalNotes[q.id] ? `<div style="margin-top:6px;font-size:12px;"><strong>📝 ملاحظتي:</strong> ${personalNotes[q.id]}</div>` : ''}</div>`).join('');
    setTimeout(() => window.print(), 300);
}

// ================= 10. جدول الختم (Checklist) + مؤقت بومودورو =================
function getChecklistData() { try { return JSON.parse(localStorage.getItem('med26_f2_lab_checklist') || '{}'); } catch (e) { return {}; } }
function triggerChecklistCelebration(evt) {
    playToneSequence([587.33, 880, 1174.66], 'triangle', 0.12, 0.07, 0.18);
    const r = evt?.target?.getBoundingClientRect() || { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 10, height: 10 };
    const cols = ['#fbbf24', '#10b981', '#f43f5e', '#8b5cf6', '#38bdf8'];
    for (let i = 0; i < 24; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:fixed;left:${r.left + r.width/2}px;top:${r.top + r.height/2}px;width:7px;height:7px;background:${cols[i % cols.length]};border-radius:50%;pointer-events:none;z-index:9999;`;
        document.body.appendChild(p);
        const ang = Math.random() * Math.PI * 2, v = 45 + Math.random() * 85;
        p.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(ang)*v}px,${Math.sin(ang)*v+40}px) scale(0.2)`, opacity: 0 }], { duration: 700 }).onfinish = () => p.remove();
    }
}
function saveChecklistItem(labId, field, value, evt) {
    const d = getChecklistData(); if (!d[labId]) d[labId] = {}; d[labId][field] = value;
    localStorage.setItem('med26_f2_lab_checklist', JSON.stringify(d));
    if (field !== 'notes' && value === true) triggerChecklistCelebration(evt);
    updateChecklistProgressUI();
}
function updateChecklistProgressUI() {
    const d = getChecklistData(), labs = window.F2_OSPE_LABS || [];
    let checks = 0, studied = 0;
    labs.forEach(l => { const r = d[l.id] || {}; if (r.study1) studied++; ['study1','rev1','rev2','rev3','qs'].forEach(f => { if (r[f]) checks++; }); });
    const pct = labs.length ? Math.round((checks / (labs.length * 5)) * 100) : 0;
    const bar = document.getElementById('cl-progress-bar'), txt = document.getElementById('cl-progress-text'), b = document.getElementById('nav-cl-badge'), hl = document.getElementById('hero-quick-labs');
    if (bar) bar.style.width = `${pct}%`;
    if (txt) txt.innerText = `أنجزت مذاكرة ${studied} من ${labs.length} (${pct}%) 🎉`;
    if (b) b.innerText = `${studied}/${labs.length}`;
    if (hl) hl.innerText = `✅ ${studied}/${labs.length} (${labs.length ? Math.round((studied / labs.length) * 100) : 0}%)`;
}
function openLabChecklistModal() {
    let m = document.getElementById('f2-checklist-modal');
    if (!m) { m = document.createElement('div'); m.id = 'f2-checklist-modal'; m.className = 'fixed inset-0 z-[120] bg-black/85 flex items-center justify-center p-2 sm:p-4 overflow-y-auto'; document.body.appendChild(m); }
    const d = getChecklistData(), labs = window.F2_OSPE_LABS || [];
    const rows = labs.map(l => {
        const r = d[l.id] || {}, cb = f => `<td class="p-2 text-center border-b border-slate-700/60"><input type="checkbox" ${r[f] ? 'checked' : ''} onchange="saveChecklistItem('${l.id}','${f}',this.checked,event)" class="w-5 h-5 rounded accent-emerald-500 cursor-pointer"></td>`;
        return `<tr class="hover:bg-slate-800/60"><td class="p-2 text-center font-black text-xs border-b border-slate-700/60 text-amber-400">${l.num}</td><td class="p-2 border-b border-slate-700/60"><span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white inline-block" style="background:${l.color}">${l.subject}</span></td><td class="p-2 font-bold text-xs text-slate-100 border-b border-slate-700/60" dir="ltr" style="text-align:left">${l.title}</td>${cb('study1')}${cb('rev1')}${cb('rev2')}${cb('rev3')}${cb('qs')}<td class="p-2 border-b border-slate-700/60 min-w-[140px]"><input type="text" value="${(r.notes || '').replace(/"/g, '&quot;')}" placeholder="ملاحظة..." oninput="saveChecklistItem('${l.id}','notes',this.value)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"></td></tr>`;
    }).join('');
    m.innerHTML = `<div class="bg-slate-900 border-2 border-amber-500/40 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-right" dir="rtl">
        <div class="p-4 bg-slate-800 border-b border-slate-700 flex flex-wrap justify-between items-center gap-3">
            <div><h2 class="text-lg font-black text-amber-400">✅ خطة وChecklist لابات F2 OSPE (${labs.length} Labs)</h2><p id="cl-progress-text" class="text-xs text-slate-300 mt-1 font-bold"></p></div>
            <div class="flex gap-2"><button onclick="if(confirm('تصفير الجدول؟')){localStorage.removeItem('med26_f2_lab_checklist');openLabChecklistModal();}" class="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold">🗑️ تصفير</button><button onclick="document.getElementById('f2-checklist-modal').classList.add('hidden')" class="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black">✖ إغلاق</button></div>
            <div class="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden"><div id="cl-progress-bar" class="bg-gradient-to-r from-emerald-500 to-amber-400 h-full" style="width:0%"></div></div>
        </div>
        <div class="overflow-auto p-3 sm:p-5"><table class="w-full border-collapse text-right"><thead><tr class="bg-slate-800 text-amber-300 text-xs font-black"><th class="p-2 text-center">#</th><th class="p-2 text-center">Subject</th><th class="p-2 text-left" dir="ltr">Lab Title</th><th class="p-2 text-center">Study 1</th><th class="p-2 text-center">Rev 1</th><th class="p-2 text-center">Rev 2</th><th class="p-2 text-center">Rev 3</th><th class="p-2 text-center">Qs</th><th class="p-2">Notes</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
    m.classList.remove('hidden'); updateChecklistProgressUI();
}
function updatePomoUI() {
    const s = formatPomoTime(pomoTimeLeft);
    const m1 = document.getElementById('pomo-mini-time'), m2 = document.getElementById('pomo-main-time'), b = document.getElementById('pomo-toggle-btn'), bar = document.getElementById('pomo-prog-bar');
    if (m1) m1.innerText = s; if (m2) m2.innerText = s; if (b) b.innerText = pomoIsRunning ? '⏸ إيقاف' : '▶ ابدأ المؤقت';
    if (bar && pomoTotalTime > 0) bar.style.width = `${Math.min(100, Math.round(((pomoTotalTime - pomoTimeLeft) / pomoTotalTime) * 100))}%`;
}
function togglePomoTimer() {
    if (pomoIsRunning) { clearInterval(pomoInterval); pomoIsRunning = false; }
    else {
        pomoIsRunning = true; playPomoStartSound();
        pomoInterval = setInterval(() => {
            if (pomoTimeLeft > 0) { pomoTimeLeft--; updatePomoUI(); }
            else { clearInterval(pomoInterval); pomoIsRunning = false; playOspeBell(); updatePomoUI(); alert(pomoMode === 'focus' ? '🎉 انتهى وقت المذاكرة!' : '⚡ انتهت الاستراحة!'); }
        }, 1000);
    }
    updatePomoUI();
}
function setPomoCustomMinutes(mins, mode = 'focus') {
    const c = Math.max(1, Math.min(240, parseInt(mins, 10) || 25));
    clearInterval(pomoInterval); pomoIsRunning = false; pomoMode = mode;
    if (mode === 'focus') localStorage.setItem('med26_pomo_custom_min', String(c));
    pomoTimeLeft = c * 60; pomoTotalTime = pomoTimeLeft;
    const inp = document.getElementById('pomo-custom-input'); if (inp) inp.value = c;
    updatePomoUI();
}
function hidePomodoroWidget() { localStorage.setItem('med26_hide_pomo', '1'); document.getElementById('med26-pomo-widget')?.classList.add('hidden'); }
function togglePomodoroVisibility() {
    const w = document.getElementById('med26-pomo-widget'); if (!w) return;
    if (w.classList.contains('hidden')) { localStorage.removeItem('med26_hide_pomo'); w.classList.remove('hidden'); } else hidePomodoroWidget();
}

// ================= 11. لوحة المتصدرين + المناضل AI + نبض الدفعة =================
function buildScoreboardHTML() {
    const user = localStorage.getItem('med26_username') || 'طالب MED26', sbU = document.getElementById('sb-current-user'), con = document.getElementById('scoreboard-four-lists');
    if (sbU) sbU.innerText = user; if (!con) return;
    const mySolved = getTotalSolvedCount(), myBestT = parseInt(localStorage.getItem('med26_best_sim_time') || '0', 10), myBestS = Math.max(parseInt(localStorage.getItem('med26_best_streak') || '0', 10), currentStreak), myW = parseInt(localStorage.getItem('med26_challenge_wins') || '0', 10);
    const boards = [
        { title: '🏆 أكثر 10 طلاب حلّوا أسئلة', unit: 'محطة', desc: true, f: 'solved', my: mySolved },
        { title: '⚡ أسرع 10 في المحاكي', unit: 'ثانية', desc: false, f: 'bestTime', my: myBestT > 0 ? myBestT : null },
        { title: '🔥 أعلى 10 في الـ Streak', unit: 'متتالية', desc: true, f: 'bestStreak', my: myBestS },
        { title: '⚔️ أكثر 10 فوزاً بالتحديات', unit: 'فوز', desc: true, f: 'wins', my: myW }
    ];
    con.innerHTML = boards.map(b => {
        let list = (Array.isArray(globalLivePlayers) ? globalLivePlayers : []).filter(p => p && p.name && p[b.f] > 0).map(p => ({ name: p.name, val: p[b.f], me: p.name.toLowerCase() === user.toLowerCase() }));
        if (b.my > 0 && !list.some(i => i.me)) list.push({ name: user, val: b.my, me: true });
        list.sort((a, z) => b.desc ? z.val - a.val : a.val - z.val); list = list.slice(0, 10);
        const rows = !list.length ? `<div class="text-center py-5 text-xs text-[var(--text-muted)] font-bold">لا توجد نتائج مسجلة بعد 🚀</div>` : list.map((it, idx) => {
            const rb = idx === 0 ? '👑 🥇' : idx === 1 ? '⚡ 🥈' : idx === 2 ? '🔥 🥉' : `#${idx + 1}`;
            const st = idx === 0 ? 'rank-1-fx border-2' : idx === 1 ? 'rank-2-fx border-2' : idx === 2 ? 'rank-3-fx border-2' : it.me ? 'bg-amber-500/25 border-amber-400 text-amber-200' : 'bg-[var(--bg-card)] border-[var(--border-color)]';
            return `<div class="flex justify-between items-center px-3.5 py-2.5 rounded-xl border ${st} text-xs sm:text-sm font-bold"><div class="flex items-center gap-2"><span class="min-w-[34px] text-center font-black">${rb}</span><span>${it.name} ${it.me ? '<span class="text-amber-300">(أنت ⭐)</span>' : ''}</span></div><span class="kw-highlight text-xs">${it.val} ${b.unit}</span></div>`;
        }).join('');
        return `<div class="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 space-y-3"><h3 class="text-sm sm:text-base font-black text-[var(--gold-bright)] border-b border-[var(--border-color)] pb-2">${b.title}</h3><div class="space-y-1.5">${rows}</div></div>`;
    }).join('');
}
async function renderScoreboardLists() {
    buildScoreboardHTML();
    if (!isFetchingScores && (Date.now() - lastScoreboardFetchTime > 15000 || !globalLivePlayers.length)) {
        isFetchingScores = true; lastScoreboardFetchTime = Date.now();
        try { if (typeof window.syncLiveScoreboard === 'function') await window.syncLiveScoreboard(false); buildScoreboardHTML(); } catch (e) {}
        isFetchingScores = false;
    }
}
function openAiTutor() { document.getElementById('ai-tutor-drawer')?.classList.remove('drawer-closed'); if (typeof window.updateAiTutorStationContext === 'function') window.updateAiTutorStationContext(); }
function closeAiTutor() { document.getElementById('ai-tutor-drawer')?.classList.add('drawer-closed'); }
function appendChatMessage(role, htmlText) {
    const box = document.getElementById('ai-chat-messages'); if (!box) return;
    const d = document.createElement('div'); d.className = role === 'user' ? 'user-msg-bubble p-3 ml-6 font-bold text-xs' : 'ai-msg-bubble p-3.5 mr-2 text-xs whitespace-pre-line leading-relaxed';
    d.innerHTML = htmlText; box.appendChild(d); box.scrollTop = box.scrollHeight;
}
function updateAiTutorStationContext() {}
function askAiPreset() {}
function configureUserApiKey() {}
function sendCustomAiMessage() {}
function changeUsernamePrompt() {}
function syncLiveScoreboard() {}

function hideCohortToast() { document.getElementById('live-cohort-toast')?.classList.remove('toast-visible'); }
function showCohortToast(msg, icon = '🔥') {
    if (document.body.classList.contains('med26-zen-mode')) return;
    const t = document.getElementById('live-cohort-toast'); if (!t) return;
    document.getElementById('cohort-toast-text').innerText = msg;
    document.getElementById('cohort-toast-icon').innerText = icon;
    t.classList.add('toast-visible'); clearTimeout(cohortToastTimer); cohortToastTimer = setTimeout(hideCohortToast, 6000);
}
async function pollLiveCohortActivity() {
    try {
        const res = await fetch(`${FIREBASE_BASE_URL}/scores.json?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) || {}, me = (localStorage.getItem('med26_username') || '').toLowerCase();
        if (Object.keys(prevCohortSnapshot).length) {
            for (const [k, p] of Object.entries(data)) {
                if (k.startsWith('_') || !p?.name || p.name.toLowerCase() === me) continue;
                const old = prevCohortSnapshot[k];
                if (old && (p.solved || 0) > (old.solved || 0)) { showCohortToast(`البطل ${p.name} رفع رصيده إلى ${p.solved} محطة محلولة! 🚀`, '🏆'); break; }
            }
        } else if (!initialPulseShown) {
            initialPulseShown = true;
            const top = Object.entries(data).filter(([k, p]) => !k.startsWith('_') && p?.solved > 0).map(([, p]) => p).sort((a, b) => b.solved - a.solved)[0];
            if (top) setTimeout(() => showCohortToast(`يتصدر الدفعة حالياً ${top.name} بـ ${top.solved} محطة! نافسه الآن 💪`, '👑'), 8000);
        }
        prevCohortSnapshot = data;
    } catch (e) {}
}
setInterval(pollLiveCohortActivity, 25000); setTimeout(pollLiveCohortActivity, 4500);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('med26-zen-mode')) { toggleZenFocusMode(false); return; }
    if (document.getElementById('view-trainer')?.classList.contains('hidden')) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.code === 'ArrowLeft') { e.preventDefault(); nextQuestion(); }
    else if (e.code === 'ArrowRight') { e.preventDefault(); prevQuestion(); }
});

window.addEventListener('DOMContentLoaded', () => {
    updateStatsUI(); updateContinueSessionBtnUI(); pickRandomSpotOfTheDay(false);
    const params = new URLSearchParams(window.location.search);
    if ((params.get('challenge') || params.get('station')) && sessionStorage.getItem('med26_session_agreed') === '1') { acceptDisclaimer(); return; }
    const def = document.body.dataset.defaultView || 'home';
    if (def === 'atlas') renderAtlasGrid();
    if (def === 'scoreboard') renderScoreboardLists();
    if (def === 'custom') updateCustomCount();
});