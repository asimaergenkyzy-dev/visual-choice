// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Eye, ShoppingCart, BarChart2, Brain, CheckCircle2, 
  XCircle, AlertTriangle, RefreshCw, ChevronRight, ChevronLeft, 
  Award, TrendingUp, BookOpen, ExternalLink, Download, Lock, 
  User, Check, Sparkles, Activity, FileText, HelpCircle, Terminal, Home, Smartphone, WifiOff
} from 'lucide-react';

// Recharts for dashboards
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, Legend 
} from 'recharts';

// --- ДЕРЕКТЕР МЕН КЕЙСТЕР ---

const TEST_QUESTIONS = [
  {
    id: 1,
    category: "Ақпараттың шынайылығы",
    question: "Әлеуметтік желіде «Ертеңнен бастап барлық банктердің карталары бұғатталады» деген хабарлама тарады. Сіздің әрекетіңіз қандай?",
    options: [
      "Бірден барлық достарыма таратып, ескертемін",
      "Ресми банк қолданбасын немесе жаңалықтардың ресми көзін тексеремін",
      "Шоттағы ақшаны шұғыл түрде басқа біреуге аударамын",
      "Мән бермей, ұмытып кетемін"
    ],
    correct: 1,
    explanation: "Ресми емес ақпаратты таратпас бұрын әрқашан ресми көздерден (банк сайттары, мемлекеттік порталдар) тексеру қажет."
  },
  {
    id: 2,
    category: "Fake News",
    question: "Танымал сайтта «Ғалымдар Айдың үстінен жасырулы қала тапты» деген сенгісіз мақала шықты, бірақ ешбір беделді ғылыми ұйым мұны растамаған. Бұл не?",
    options: [
      "Ғылыми жаңалық",
      "Clickbait немесе жалған жаңалық (Fake News)",
      "Ресми үкімет мәлімдемесі",
      "Құпия құжаттың тарап кетуі"
    ],
    correct: 1,
    explanation: "Беделді ғылыми көздер растамаған сенсациялық жаңалықтар көбінесе назар аудару үшін ойдан шығарылады."
  },
  {
    id: 3,
    category: "Clickbait",
    question: "«Бұл видеоны көргендер есінен танып қала жаздады! Шок!» деген атауы бар сілтемеге тап болдыңыз. Бұл қандай тәсіл?",
    options: [
      "Ақпараттық сараптама",
      "Кликбейт (Clickbait) — эмоция мен қызығушылық арқылы назар аудару",
      "Ғылыми зерттеу нәтижесі",
      "Пайдалы кеңес"
    ],
    correct: 1,
    explanation: "Кликбейт — адамның қызығушылығын немесе үрейін ояту арқылы сілтемеге басуға мәжбүрлейтін айла."
  },
  {
    id: 4,
    category: "Жарнамалық манипуляция",
    question: "Инстаграмда блогер «Бұл сиқырлы кремді жаққаным сол еді, 3 күнде 10 кг салмақ тастадым!» деп жарнамалайды. Сіздің ойыңызша шешім қандай?",
    options: [
      "Бірден сатып аламын, өйткені танымал адам айтты",
      "Ғылыми тұрғыдан бұл мүмкін емес, жарнамалық манипуляция",
      "Бағасы арзан болса көріп көремін",
      "Бұл медициналық жаңалық шығар"
    ],
    correct: 1,
    explanation: "Қысқа мерзімде керемет нәтиже уәде ететін денсаулыққа қатысты өнімдер көбінесе жалған болып келеді."
  },
  {
    id: 5,
    category: "AI арқылы жасалған контент",
    question: "Әлеуметтік желіде президенттің ешқашан айтпаған сөздерін айтып тұрған видеосы шықты. Саусақтары немесе дауысы біртүрлі көрінеді. Бұл не?",
    options: [
      "Монтажсыз шынайы видео",
      "Дипфейк (Deepfake) — Жасанды интеллект көмегімен жасалған жалған видео",
      "Тікелей эфир қатесі",
      "Арнайы фильм кадры"
    ],
    correct: 1,
    explanation: "Дипфейк — адамдардың бет-әлпетін немесе дауысын ЖИ көмегімен шынайы етіп қолдан жасау технологиясы."
  },
  {
    id: 6,
    category: "Deepfake",
    question: "Deepfake видеоларды анықтаудың ең сенімді тәжірибесі қандай?",
    options: [
      "Видеоның астындағы лайктар санына қарау",
      "Көздің жыпылықтау жиілігін, дыбыс пен ерін қимылының сәйкестігін бақылау",
      "Видеоны достарға жіберу",
      "Комментарийлерді оқу"
    ],
    correct: 1,
    explanation: "Дипфейктерде көбінесе кішігірім техникалық қателер (жыпылықтамау, дауыс тембрінің сәл бұзылуы) болады."
  },
  {
    id: 7,
    category: "Жалған пікірлер",
    question: "Интернет-дүкендегі тауардың барлық 500 пікірі бірдей мәтінмен «Керемет! Керемет!» деп жазылған. Бұл нені білдіреді?",
    options: [
      "Тауар өте сапалы",
      "Пікірлер боттар арқылы немесе жасанды түрде жазылған",
      "Сатушы сыйлық беріп жатыр",
      "Барлық адамдар бірдей ойлайды"
    ],
    correct: 1,
    explanation: "Бір үлгідегі және жасанды мадақтаулар дүкеннің немесе тауардың сенімсіз екенін көрсетеді."
  },
  {
    id: 8,
    category: "Интернет-дүкен сенімділігі",
    question: "Бейтаныс Instagram парақшасынан тауар алғыңыз келеді. Олар тек толық алдын ала төлемді (kaspi перевод арқылы) талап етеді және байланыс нөмірі жоқ. Не істейсіз?",
    options: [
      "Ақшаны аудара саламын",
      "Сатып алудан бас тартамын, себебі бұл алаяқтық тәуекелі жоғары дүкен",
      "Жартысын төлеймін",
      "Басқа картадан аударамын"
    ],
    correct: 1,
    explanation: "Байланыс деректері жоқ және тек жеке карт-шотқа төлем сұрайтын парақшалар көбінесе алаяқтарға тиесілі."
  },
  {
    id: 9,
    category: "Ақпарат көзін тексеру",
    question: "Мақаланың авторы белгісіз, ешқандай сілтеме көрсетілмеген, тек «Ғалымдар дәлелдеді» делінген. Мұндай ақпаратқа сенуге бола ма?",
    options: [
      "Иә, ғалымдар қателеспейді",
      "Жоқ, сенімді дереккөз бен нақты зерттеу көрсетілмеген",
      "Егер мақала ұнаса сенемін",
      "Басқалар оқыса шындық"
    ],
    correct: 1,
    explanation: "Шынайы ақпарат әрқашан нақты дереккөзге, зерттеуге немесе мамандардың пікіріне сүйенеді."
  },
  {
    id: 10,
    category: "Эмоциялық ықпал ету",
    question: "Жаңалық тақырыбы сізде қатаң қорқыныш немесе шектен тыс ашу тудырды. Манипуляторлар мұны не үшін қолданады?",
    options: [
      "Сізді күлдіру үшін",
      "Эмоцияға беріліп, ойланбай ақпаратты бөлісуіңіз немесе әрекет етуіңіз үшін",
      "Пайдалы ақпарат беру үшін",
      "Ғылыми білімді арттыру үшін"
    ],
    correct: 1,
    explanation: "Қарқынды эмоциялар (ашу, үрей, шектен тыс қуаныш) сыни ойлауды бәсеңдетіп, басқаруды жеңілдетіді."
  },
  {
    id: 11,
    category: "Фото және видео манипуляциясы",
    question: "Интернеттегі фотода шенеунік басқа адамдарға агрессивті түрде қарап тұрғаны көрсетілген. Бірақ түпнұсқа фотода оның күлімсіреп тұрғаны анықталды. Бұл қандай құбылыс?",
    options: [
      "Фотошоп немесе көрнекі манипуляция",
      "Табиғи түсірілім",
      "Видео сапасының бұзылуы",
      "Компьютерлік ойын"
    ],
    correct: 0,
    explanation: "Фотосуреттерді контекстен жұлып алу немесе өзгерту арқылы қоғамдық пікірді манипуляциялау жиі кездеседі."
  },
  {
    id: 12,
    category: "Influencer marketing",
    question: "Танымал блогер ешқашан қолданбаған сусынын мақтап, «Мен тек осыны ішемін» дейді, бірақ бұл жарнама екені кішкене әріппен жазылған. Бұл нені білдіреді?",
    options: [
      "Блогердің шынайы таңдауы",
      "Жасырын немесе демеушілік жарнама (Influencer endorsement)",
      "Тегін сыйлық",
      "Әлеуметтік көмек"
    ],
    correct: 1,
    explanation: "Инфлюенсерлер ақша үшін кез келген өнімді жарнамалауы мүмкін, сондықтан олардың кеңесіне сын көзбен қарау керек."
  },
  {
    id: 13,
    category: "Жалған жеңілдіктер",
    question: "Киім дүкені «Бағаны 100 000 теңгеден 20 000 теңгеге түсірдік, соңғы 1 сағат!» деп хабарлайды. Шын мәнінде бұл зат бұрыннан 18 000 теңге тұрған еді. Бұл қандай айла?",
    options: [
      "Үлкен жеңілдік",
      "Жалған скидка / Маркетингтік манипуляция",
      "Мемлекеттік субсидия",
      "Қайырымдылық акциясы"
    ],
    correct: 1,
    explanation: "Жалған скидкалар бағаны алдымен көтеріп, кейін «жеңілдік» жасап көрсету арқылы сатып алуға асықтырады."
  },
  {
    id: 14,
    category: "Интернеттегі қауіпсіз төлем",
    question: "Интернет-дүкеннен зат сатып алғанда төлем жасау үшін сайттың мекенжай жолағында не болуы міндетті?",
    options: [
      "Тек цифрлық кодтар",
      "https:// протоколы және құлыпша (lock) белгісі",
      "Кез келген әріптер жиынтығы",
      "«БЕСПЛАТНО» сөзі"
    ],
    correct: 1,
    explanation: "HTTPS протоколы деректеріңіздің шифрланғанын және қауіпсіз екенін білдіреді."
  },
  {
    id: 15,
    category: "Саналы тұтынушылық шешім",
    question: "Интернеттен импульсивті түрде қымбат зат сатып алмас бұрын ең дұрыс қадам қандай?",
    options: [
      "Бірден картадағы бар ақшаны шығару",
      "«24 сағат ережесін» қолданып, шынымен қажет пе жоқ па ойлану және бағасын басқа жерден салыстыру",
      "Достарға мақтану",
      "Дүкенге хабарласпай тапсырыс беру"
    ],
    correct: 1,
    explanation: "Эмоционалды сатып алулардан қорғану үшін пауза жасап, баға мен сапаны сараптаған жөн."
  }
];

const VISUAL_CASES = [
  {
    id: 1,
    title: "Instagram: «90% жеңілдік — соңғы 3 сағат!»",
    category: "Instagram жарнамасы",
    imageType: "ad",
    visualText: "Тек бүгін! Премиум смарт-сағат небәрі 4990 ₸ (Бастапқы бағасы: 50 000 ₸). Барлығы сатып алып жатыр! Саны шектеулі!",
    redFlags: [
      "Шектен тыс арзан баға (90% скидка)",
      "Асықтыру әдісі («соңғы 3 сағат», «саны шектеулі»)",
      "Дүкен туралы нақты заңды ақпарат жоқ",
      "Байланыс үшін тек Директ көрсетілген"
    ],
    analysis5D: {
      detect: "Жарнамада шұғыл сатып алуға итермелейтін факторлар мен күмәнді төмен баға көрсетілген.",
      decode: "Психологиялық қысым көрсету арқылы сатып алушының сыни ойлауын тежеу көзделген.",
      doubleCheck: "Басқа ресми дүкендерде бұл сағаттың нарықтық бағасы 45 000 ₸ екені анықталды.",
      decide: "Бұл күмәнді жарнама. Сатып алудан бас тарту қажет.",
      develop: "Болашақта әлеуметтік желідегі шектен тыс арзан ұсыныстарға сенбей, бағаны нарықпен салыстыруды үйрендім."
    }
  },
  {
    id: 2,
    title: "TikTok: «Үй жағдайында 1 аптада тісті ағартудың құпиясы»",
    category: "TikTok контенті",
    imageType: "tiktok",
    visualText: "Блогер белгісіз ұнтақты тісіне жағып, бір минутта голливудтық күлкіге қол жеткізгенін көрсетеді.",
    redFlags: [
      "Стоматологтардың мақұлдауы жоқ",
      "Бейнеролик монтаждалған (эффектілер қолданылған)",
      "Эмальға кесапат келтіру қаупі бар",
      "Өнімнің құрамы көрсетілмеген"
    ],
    analysis5D: {
      detect: "Видеода өнімнің қауіпсіздігі туралы ешқандай ғылыми дәлел келтірілмеген.",
      decode: "Көрнекі визуалды алдамшы монтаж арқылы тез нәтижеге қол жеткізуге болатыны көрсетілген.",
      doubleCheck: "Медициналық дереккөздер мен стоматологтар мұндай әдістердің эмальды бұзатынын ескертеді.",
      decide: "Өнім денсаулыққа қауіпті және жарнама шындыққа жанаспайды.",
      develop: "Блогерлердің денсаулыққа қатысты кеңестерін әрқашан мамандар арқылы тексеру керектігін түсіндім."
    }
  },
  {
    id: 3,
    title: "Интернет-дүкен: «Керемет бренд кроссовкалары»",
    category: "Интернет-дүкен жарнамасы",
    imageType: "shop",
    visualText: "Әлемдік бренд кроссовкалары 12 000 ₸. Төлем тек алдын ала Kaspi перевод арқылы. Сайтта мекенжай мен иесі туралы ақпарат жоқ.",
    redFlags: [
      "Түпнұсқа бағасынан 10 есе арзан",
      "Заңды тіркеу немесе кепилдік жоқ",
      "Жеке шотқа аудару талабы",
      "Пікірлердің барлығы бір күнде жазылған"
    ],
    analysis5D: {
      detect: "Бренд атауын жамылған, байланыс деректері жоқ күмәнді сатушы.",
      decode: "Арзан бағамен қызықтырып, ақшаны алып, тауарды жібермеу схемасы.",
      doubleCheck: "Ресми брендтің сайтында бұл модель тек 70 000 ₸ тұратыны анықталды.",
      decide: "Бұл алаяқтық дүкен. Төлем жасауға болмайды.",
      develop: "Интернет-дүкендердің сенімділігін (реквизиттер, пікірлер, нарықтық баға) тексеру дағдысын күшейттім."
    }
  },
  {
    id: 4,
    title: "Жаңалық постері: «Ғалымдар суды электр тоғымен байыту арқылы мәңгілік жастық тапты»",
    category: "Жаңалық постері",
    imageType: "news",
    visualText: "Әлеуметтік желілердегі арнада жас көрінетін қарт кісінің суреті мен сенсациялық тақырып тұр.",
    redFlags: [
      "Беделді ғылыми институттарға сілтеме жоқ",
      "Фотосурет ЖИ (AI) арқылы жасалған",
      "Биология заңдарына қайшы тұжырым",
      "Ақпарат көзі беймәлім паблик"
    ],
    analysis5D: {
      detect: "Сенсациялық және ғылыми тұрғыдан мүмкін емес мәлімдеме.",
      decode: "Оқырмандардың таңданысын тудырып, сайтқа трафик жинау мақсатындағы фейк.",
      doubleCheck: "Әлемдік ғылыми журналдарда мұндай зерттеу мүлде жоқ.",
      decide: "Жалған жаңалық (Fake News).",
      develop: "Ғылыми жаңалықтарды әрқашан академиялық дереккөздерден тексеруді үйрендім."
    }
  },
  {
    id: 5,
    title: "Инфлюенсер жарнамасы: «Қаржылық тәуелсіздік — 3 күнде миллионер бол!»",
    category: "Инфлюенсер жарнамасы",
    imageType: "influencer",
    visualText: "Танымал вайнер қымбат көліктің қатында тұрып: «Осы сілтеме арқылы тіркеліп, крипто-ботқа ақша сал, ертеңге дейін екі есе көбейеді» дейді.",
    redFlags: [
      "Қаржылық пиратамида немесе алаяқтық белгілері",
      "«Кепілдік берілген жоғары табыс» уәдесі",
      "Лицензиясы жоқ платформа",
      "Блогер жарнама үшін ақша алатынын жасырмаған"
    ],
    analysis5D: {
      detect: "Жылдам әрі оңай ақ табуды уәде ететін қаржылық алаяқтық.",
      decode: "Адамдардың ақша табуға деген құштарлығы мен сенімділігін теріс пайдалану.",
      doubleCheck: "Қаржы нарығын реттеуші агенттіктің ескертулерін қарау.",
      decide: "Бұл қауіпті қаржылық схема. Қатысуға болмайды.",
      develop: "Инвестициялық ұсыныстарға сыни көзбен қарап, ресми лицензияларды тексеруді дағдыға айналдырдым."
    }
  },
  {
    id: 6,
    title: "AI-generated image: «Белгілі қаладағы төтенше жағдай»",
    category: "AI-generated image",
    imageType: "ai",
    visualText: "Қала көшелерін су басып, алыпモンスター жүрген сурет тарады. Тұрғындар дүрбелеңде.",
    redFlags: [
      "Суреттегі физикалық қателер (ғимараттардың қисықтығы, көлеңкелердің сәйкес келмеуі)",
      "Ешқандай ресми төтенше жағдайлар қызметі растамаған",
      "ЖИ генераторының су белгісі (шала өшірілген)",
      "Пайдаланушылардың үрейін тудыруға бағытталған"
    ],
    analysis5D: {
      detect: "Шындыққа жанаспайтын фантастикалық элементтері бар ЖИ суреті.",
      decode: "Қоғамда дүрбелең мен жалған ақпарат тарату мақсатында қолданылған.",
      doubleCheck: "Жергілікті әкімдік пен төтенше жағдайлар департаментінің ақпаратын тексеру.",
      decide: "Жасанды интеллект көмегімен жасалған манипуляциялық контент.",
      develop: "Көрінген әсерлі суреттерге бірден сенбей, оның шынайылығын тексеру маңызды екенін түсіндім."
    }
  }
];

export default function App() {
  // Навигация мен күйлер
  const [activeTab, setActiveTab] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Network status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Test state
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  // Visual Lab state
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseStep, setCaseStep] = useState(1); 
  const [userInputs, setUserInputs] = useState({ detect: '', decode: '', check: '', decide: '', develop: '' });
  const [caseCompleted, setCaseCompleted] = useState(false);

  // Shop Check state
  const [shopLink, setShopLink] = useState('');
  const [productName, setProductName] = useState('');
  const [shopResult, setShopResult] = useState(null);

  // Real or Manipulated Game state
  const [gameRound, setGameRound] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswered, setGameAnswered] = useState(false);
  const [gameFeedback, setGameFeedback] = useState('');

  const gameItems = [
    {
      id: 1,
      title: "Авиабилет 90% жеңілдікпен",
      imageDesc: "«Dubai travel» аккаунтында барлық рейстер 5000 теңге.",
      isManipulated: true,
      reason: "Авиакомпаниялар ешқашан 90% шегерім жасамайды, бұл фишингтік сайттардың әдісі."
    },
    {
      id: 2,
      title: "Ұлттық банк хабарламасы",
      imageDesc: "Ресми `.gov.kz` сайтындағы инфляция деңгейі туралы есеп.",
      isManipulated: false,
      reason: "Бұл сенімді ресми мемлекеттік көзден алынған шынайы ақпарат."
    },
    {
      id: 3,
      title: "Жұлдыздардың сұхбаты",
      imageDesc: "Белгілі актер криптобиржаға ақша салып байығанын айтуда (Deepfake).",
      isManipulated: true,
      reason: "Бұл танымал адамдардың бейнесін қолданған алаяқтық жарнама (Deepfake)."
    }
  ];

  // Прогрессті сақтау (LocalStorage)
  useEffect(() => {
    const savedScore = localStorage.getItem('visual_choice_score');
    if (savedScore) {
      setTestScore(parseInt(savedScore));
    }
  }, []);

  const handleAnswerSelect = (optionIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIdx
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < TEST_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateTestResult();
    }
  };

  const calculateTestResult = () => {
    let score = 0;
    TEST_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setTestScore(score);
    localStorage.setItem('visual_choice_score', score);
    setTestCompleted(true);
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121c35] via-[#1a264a] to-[#251f4f] text-slate-100 font-sans pb-24 md:pb-12 selection:bg-[#8B5CF6] selection:text-white">
      
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center space-x-2 z-50 sticky top-0">
          <WifiOff className="w-4 h-4" />
          <span>Сіз офлайн режимдесіз. Жасанды интеллект (AI) функциялары мен онлайн іздеу жұмыс істемеуі мүмкін.</span>
        </div>
      )}

      {/* Навигация панелі (Desktop & Tablet Header) */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#121c35]/85 border-b border-indigo-900/40 px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-[#22D3EE] bg-clip-text text-transparent">
              VISUAL CHOICE
            </h1>
            <p className="text-xs text-[#22D3EE] font-medium tracking-widest">PWA MEDIA LAB</p>
          </div>
        </div>

        {/* Desktop Мәзір батырмалары */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            Басты бет
          </button>
          <button 
            onClick={() => setActiveTab('test')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'test' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            Media IQ
          </button>
          <button 
            onClick={() => setActiveTab('lab')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'lab' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            Visual Lab
          </button>
          <button 
            onClick={() => setActiveTab('shopcheck')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'shopcheck' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            Shop Check
          </button>
          <button 
            onClick={() => setActiveTab('game')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'game' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            Ойын
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'progress' ? 'bg-[#1f305e] text-[#22D3EE] border border-[#22D3EE]/30' : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'}`}
          >
            My Progress
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <button 
            onClick={() => alert("PWA орнату нұсқаулығы: Браузер мәзірінен 'На главный экран' (Add to Home Screen) түймесін басыңыз.")}
            className="bg-[#1c2d59] border border-indigo-400/30 text-[#22D3EE] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#25396e] transition-all flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>PWA Орнату</span>
          </button>
        </div>
      </nav>

      {/* НЕГИЗГИ КОНТЕНТ */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        
        {/* 1. БАСТЫ БЕТ (HOME) */}
        {activeTab === 'home' && (
          <div className="relative overflow-hidden rounded-3xl p-6 md:p-20 bg-cover bg-center min-h-[80vh] w-full flex flex-col justify-center border border-indigo-500/30 shadow-2xl"
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(18, 28, 53, 0.35), rgba(18, 28, 53, 0.75)), url('https://mavlenai.kz/storage/uploads/82/images/98cf1f5e-27a7-437a-8520-23ef862f6ac8.png')` }}>
            <div className="space-y-12 py-6 relative z-10">
              <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1c2d59]/90 border border-[#8B5CF6]/40 text-[#22D3EE] text-xs font-semibold backdrop-blur-md shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span>Mobile PWA Edition • 9–11 сынып оқушыларына арналған</span>
                </div>
                
                <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
                  Think. Check. Choose.
                </h1>
                
                <p className="text-lg md:text-2xl text-slate-200 italic font-light drop-shadow">
                  «Әр суреттің артында қандай шындық бар?»
                </p>
                
                <p className="text-slate-200 text-sm md:text-lg max-w-2xl mx-auto drop-shadow-sm">
                  Ақпаратты талда. Манипуляцияны анықта. Саналы таңдау жаса. Телефон экранынан ыңғайлы қол жетімді цифрлық зертхана.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('test')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-bold text-base shadow-xl shadow-[#8B5CF6]/30 hover:scale-105 transition-all flex items-center justify-center space-x-3"
                  >
                    <span>Медиасауаттылық тестін бастау</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('lab')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1c2d59]/85 backdrop-blur-md border border-indigo-400/40 text-[#22D3EE] font-bold text-base hover:bg-[#25396e] transition-all flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <span>Визуалды зертханаға өту</span>
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 4 негізгі модуль карточкалары */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                
                <div 
                  onClick={() => setActiveTab('test')}
                  className="bg-[#1c2d59]/90 backdrop-blur-md border border-indigo-900/50 hover:border-[#22D3EE]/60 p-5 rounded-2xl cursor-pointer transition-all shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-3 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Media IQ</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    15 сұрақтан тұратын кешенді диагностика.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('lab')}
                  className="bg-[#1c2d59]/90 backdrop-blur-md border border-indigo-900/50 hover:border-[#22D3EE]/60 p-5 rounded-2xl cursor-pointer transition-all shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] mb-3 group-hover:bg-[#22D3EE] group-hover:text-[#121c35] transition-all">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Visual Lab</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    VISUAL 5D әдістемесі арқылы контентті зерттеу.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('shopcheck')}
                  className="bg-[#1c2d59]/90 backdrop-blur-md border border-indigo-900/50 hover:border-[#22D3EE]/60 p-5 rounded-2xl cursor-pointer transition-all shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Shop Check</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Instagram дүкендері мен бағаны ЖИ арқылы тексеру.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('progress')}
                  className="bg-[#1c2d59]/90 backdrop-blur-md border border-indigo-900/50 hover:border-[#22D3EE]/60 p-5 rounded-2xl cursor-pointer transition-all shadow-xl group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">My Progress</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Жеке даму панелі мен нәтижелер динамикасы.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. MEDIA IQ (ТЕСТ) */}
        {activeTab === 'test' && (
          <div className="max-w-3xl mx-auto py-2">
            {!testStarted ? (
              <div className="relative overflow-hidden rounded-3xl p-6 md:p-12 text-center space-y-6 bg-cover bg-center border border-indigo-900/50 shadow-2xl"
                   style={{ backgroundImage: `linear-gradient(to bottom, rgba(18, 28, 53, 0.88), rgba(18, 28, 53, 0.96)), url('https://mavlenai.kz/storage/uploads/82/images/f2ff2c37-a631-43dd-9419-0bd512f44b61.png')` }}>
                <div className="w-16 h-16 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-2xl mx-auto flex items-center justify-center shadow">
                  <Brain className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Media IQ — Диагностикалық тест</h2>
                <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  15 сұрақ арқылы Fake news, кликбейт, дипфейк және жарнамалық манипуляцияларды анықтау деңгейіңізді тексеріңіз.
                </p>
                <button 
                  onClick={() => setTestStarted(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all text-sm md:text-base"
                >
                  Тестті бастау
                </button>
              </div>
            ) : !testCompleted ? (
              <div className="relative overflow-hidden rounded-3xl p-5 md:p-10 space-y-6 bg-cover bg-center border border-indigo-900/50 shadow-2xl"
                   style={{ backgroundImage: `linear-gradient(to bottom, rgba(18, 28, 53, 0.9), rgba(18, 28, 53, 0.97)), url('https://mavlenai.kz/storage/uploads/82/images/f2ff2c37-a631-43dd-9419-0bd512f44b61.png')` }}>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm text-slate-300 font-medium">
                    <span>Сұрақ {currentQuestion + 1} / {TEST_QUESTIONS.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / TEST_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#121c35] h-2 rounded-full overflow-hidden border border-indigo-900/30">
                    <div 
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] h-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / TEST_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full text-xs font-semibold">
                    {TEST_QUESTIONS[currentQuestion].category}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">
                    {TEST_QUESTIONS[currentQuestion].question}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {TEST_QUESTIONS[currentQuestion].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-sm md:text-base ${
                        selectedAnswers[currentQuestion] === idx 
                          ? 'bg-[#8B5CF6]/25 border-[#8B5CF6] text-white font-medium shadow-md' 
                          : 'bg-[#121c35]/70 border-indigo-900/40 text-slate-200 hover:border-indigo-600'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${selectedAnswers[currentQuestion] === idx ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-indigo-800'}`}>
                        {selectedAnswers[currentQuestion] === idx && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button 
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="px-5 py-2.5 rounded-xl bg-[#121c35] text-slate-300 text-sm font-medium disabled:opacity-50 hover:bg-[#25396e] transition-all flex items-center space-x-2 border border-indigo-900/40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Алдыңғы</span>
                  </button>
                  
                  <button 
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-sm font-bold disabled:opacity-50 shadow-lg hover:opacity-90 transition-all flex items-center space-x-2"
                  >
                    <span>{currentQuestion === TEST_QUESTIONS.length - 1 ? 'Нәтижені көру' : 'Келесі'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-3xl p-6 md:p-12 text-center space-y-6 bg-cover bg-center border border-indigo-900/50 shadow-2xl"
                   style={{ backgroundImage: `linear-gradient(to bottom, rgba(18, 28, 53, 0.9), rgba(18, 28, 53, 0.97)), url('https://mavlenai.kz/storage/uploads/82/images/f2ff2c37-a631-43dd-9419-0bd512f44b61.png')` }}>
                <div className="w-16 h-16 bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] rounded-full mx-auto flex items-center justify-center shadow-xl shadow-[#8B5CF6]/30">
                  <Award className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Тест аяқталды!</h2>
                  <p className="text-slate-300 text-sm">Сіздің жинаған ұпайыңыз:</p>
                  <div className="text-4xl font-extrabold text-[#22D3EE]">
                    {testScore} / {TEST_QUESTIONS.length}
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 font-medium">
                    Пайыздық көрсеткіш: {Math.round((testScore / TEST_QUESTIONS.length) * 100)}%
                  </p>
                </div>

                <div className="bg-[#121c35]/80 p-5 rounded-2xl border border-indigo-900/40 text-left space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Медиасауаттылық деңгейі:</span>
                  </h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                    {testScore >= 13 ? "Керемет! Сіздің медиасауаттылығыңыз жоғары деңгейде." :
                     testScore >= 8 ? "Жақсы нәтиже! Дегенмен, кейбір күмәнді контенттерді тексеруді жақсарту қажет." :
                     "Бастапқы деңгей. Visual Lab зертханасында көбірек жаттығу жасаңыз."}
                  </p>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <button 
                    onClick={resetTest}
                    className="px-5 py-2.5 bg-[#121c35] text-white text-sm font-medium rounded-xl hover:bg-[#25396e] transition-all flex items-center space-x-2 border border-indigo-900/40"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Қайта тапсыру</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('lab')}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center space-x-2"
                  >
                    <span>Зертханаға өту</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. VISUAL LAB (ЗЕРТХАНА) */}
        {activeTab === 'lab' && (
          <div className="relative overflow-hidden rounded-3xl p-5 md:p-10 space-y-6 bg-cover bg-center border border-indigo-900/50 shadow-2xl"
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(18, 28, 53, 0.9), rgba(18, 28, 53, 0.97)), url('https://mavlenai.kz/storage/uploads/82/images/9a9d9e0b-8076-471e-932d-ae6c81c8367d.png')` }}>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold">Visual Lab — Зертхана</h2>
              <p className="text-slate-300 text-xs md:text-sm">
                Авторлық <strong>VISUAL 5D</strong> әдісі (Detect, Decode, Double-Check, Decide, Develop) арқылы контентті зерттеңіз.
              </p>
            </div>

            {!selectedCase ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VISUAL_CASES.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-[#1c2d59]/90 backdrop-blur-md border border-indigo-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-[#22D3EE]/60 transition-all shadow-xl"
                  >
                    <div className="space-y-3">
                      <span className="px-2.5 py-0.5 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="text-slate-300 text-xs bg-[#121c35]/70 p-3 rounded-xl border border-indigo-950 italic">
                        «{item.visualText}»
                      </p>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          setSelectedCase(item);
                          setCaseStep(1);
                          setUserInputs({ detect: '', decode: '', check: '', decide: '', develop: '' });
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-sm font-bold rounded-xl shadow hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Талдауды бастау</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto bg-[#1c2d59]/95 backdrop-blur-md border border-indigo-900/50 rounded-3xl p-5 md:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-indigo-900/40 pb-3">
                  <div>
                    <span className="text-xs text-[#22D3EE] font-semibold">{selectedCase.category}</span>
                    <h3 className="text-lg font-bold text-white">{selectedCase.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="px-3 py-1.5 bg-[#121c35] text-slate-300 text-xs rounded-xl hover:bg-[#25396e] border border-indigo-900/40"
                  >
                    Артқа
                  </button>
                </div>

                <div className="bg-[#121c35]/80 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Контент:</h4>
                  <p className="text-sm text-slate-200 italic">«{selectedCase.visualText}»</p>
                </div>

                {/* 5D Steps Progress */}
                <div className="grid grid-cols-5 gap-1 text-center">
                  {['1. Detect', '2. Decode', '3. Check', '4. Decide', '5. Develop'].map((stepName, idx) => (
                    <div 
                      key={idx} 
                      className={`py-1.5 px-0.5 rounded-lg text-[10px] md:text-xs font-bold ${
                        caseStep === idx + 1 ? 'bg-[#8B5CF6] text-white' : 
                        caseStep > idx + 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#121c35] text-slate-400'
                      }`}
                    >
                      {stepName}
                    </div>
                  ))}
                </div>

                {/* Step Form */}
                <div className="space-y-3">
                  {caseStep === 1 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm">1. DETECT — Күмәнді белгіні анықтау</h4>
                      <p className="text-xs text-slate-300">Бұл жарнамада немесе контентте күмән тудырған қандай белгілер бар?</p>
                      <textarea 
                        rows="3"
                        value={userInputs.detect}
                        onChange={(e) => setUserInputs({...userInputs, detect: e.target.value})}
                        placeholder="Ойыңызды жазыңыз..."
                        className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#8B5CF6]"
                      ></textarea>
                    </div>
                  )}

                  {caseStep === 2 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm">2. DECODE — Визуалды манипуляцияны түсіндіру</h4>
                      <p className="text-xs text-slate-300">Бұл контент қандай психологиялық тәсілді қолданып тұр?</p>
                      <textarea 
                        rows="3"
                        value={userInputs.decode}
                        onChange={(e) => setUserInputs({...userInputs, decode: e.target.value})}
                        placeholder="Талдауыңыз..."
                        className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#8B5CF6]"
                      ></textarea>
                    </div>
                  )}

                  {caseStep === 3 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm">3. DOUBLE-CHECK — Дереккөзді салыстыру</h4>
                      <p className="text-xs text-slate-300">Бұл ақпаратты тексеру үшін қандай көздерді қарау керек?</p>
                      <textarea 
                        rows="3"
                        value={userInputs.check}
                        onChange={(e) => setUserInputs({...userInputs, check: e.target.value})}
                        placeholder="Тексеру тәсілі..."
                        className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#8B5CF6]"
                      ></textarea>
                    </div>
                  )}

                  {caseStep === 4 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm">4. DECIDE — Шешім қабылдау</h4>
                      <p className="text-xs text-slate-300">Соңғы шешіміңіз қандай?</p>
                      <textarea 
                        rows="3"
                        value={userInputs.decide}
                        onChange={(e) => setUserInputs({...userInputs, decide: e.target.value})}
                        placeholder="Шешіміңіз..."
                        className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#8B5CF6]"
                      ></textarea>
                    </div>
                  )}

                  {caseStep === 5 && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-white text-sm">5. DEVELOP — Қорытынды</h4>
                      <div className="bg-[#121c35] p-3 rounded-xl border border-indigo-900/50 space-y-1">
                        <h5 className="text-[11px] font-bold text-[#22D3EE] uppercase">Күтілетін белгілер (Red Flags):</h5>
                        <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                          {selectedCase.redFlags.map((rf, idx) => (
                            <li key={idx}>{rf}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#8B5CF6]/15 p-3 rounded-xl border border-[#8B5CF6]/30">
                        <h5 className="text-[11px] font-bold text-[#8B5CF6] uppercase">Сарапшы түйіні:</h5>
                        <p className="text-xs text-slate-200 mt-1">{selectedCase.analysis5D.develop}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    {caseStep > 1 && (
                      <button 
                        onClick={() => setCaseStep(caseStep - 1)}
                        className="px-4 py-2 bg-[#121c35] text-slate-300 text-xs font-medium rounded-xl border border-indigo-900/40"
                      >
                        Артқа
                      </button>
                    )}
                    
                    <div className="ml-auto">
                      {caseStep < 5 ? (
                        <button 
                          onClick={() => setCaseStep(caseStep + 1)}
                          className="px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold rounded-xl shadow"
                        >
                          Келесі
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedCase(null)}
                          className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
                        >
                          Аяқтау
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. SHOP CHECK — АҚЫЛДЫ САТЫП АЛУ КӨМЕКШІСІ */}
        {activeTab === 'shopcheck' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-[#22D3EE]/20 text-[#22D3EE] rounded-full text-xs font-semibold">
                AI Store Intelligence
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Shop Check — Дүкенді тексеру</h2>
              <p className="text-slate-300 text-xs md:text-sm">
                Instagram дүкен сілтемесін енгізіңіз. Нақты талдау үшін API интеграциясы қажет; ойдан шығарылған деректер көрсетілмейді.
              </p>
            </div>

            <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-3xl p-5 md:p-8 space-y-6 shadow-2xl">
              <form onSubmit={(e) => {
                e.preventDefault();
                setShopResult(null);
                alert('Instagram дүкенін нақты тексеру үшін серверлік AI және рұқсат етілген дереккөздер қосылуы керек. Бұл нұсқа деректерді ойдан шығармайды.');
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Instagram сілтемесі немесе Username</label>
                    <input 
                      type="text"
                      required
                      value={shopLink}
                      onChange={(e) => setShopLink(e.target.value)}
                      placeholder="@shop_name немесе сілтеме"
                      className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#22D3EE]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Тауар атауы (міндетті емес)</label>
                    <input 
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Мысалы: Wireless Headphones"
                      className="w-full bg-[#121c35] border border-indigo-900/50 rounded-xl p-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-[#22D3EE]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-[11px] text-slate-400">
                    💡 <em>Нақты Instagram талдауы әзірге қосылмаған. Серверлік API интеграциясы қажет.</em>
                  </p>
                  <button 
                    type="submit"
                    disabled={shopResult?.loading}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs md:text-sm font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {shopResult?.loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>ЖИ талдауда...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>AI Store Intelligence</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {shopResult && !shopResult.loading && (
                <div className="space-y-6 pt-6 border-t border-indigo-900/40">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#121c35]/85 p-5 rounded-2xl border border-indigo-900/40">
                    <div>
                      <span className="text-xs text-[#22D3EE] font-semibold">{shopResult.shopName}</span>
                      <h3 className="text-xl font-bold text-white">Дүкенді талдау нәтижесі</h3>
                      <p className="text-xs text-slate-300 mt-0.5">{shopResult.profileDesc}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold">
                      {shopResult.riskLevel}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#121c35] p-3 rounded-xl border border-indigo-900/40">
                      <span className="text-[11px] text-slate-400">Оқырмандар</span>
                      <p className="text-sm font-bold text-white mt-0.5">{shopResult.followers}</p>
                    </div>
                    <div className="bg-[#121c35] p-3 rounded-xl border border-indigo-900/40">
                      <span className="text-[11px] text-slate-400">Жарияланым</span>
                      <p className="text-sm font-bold text-white mt-0.5">{shopResult.postsCount}</p>
                    </div>
                    <div className="bg-[#121c35] p-3 rounded-xl border border-indigo-900/40">
                      <span className="text-[11px] text-slate-400">Жиілігі</span>
                      <p className="text-sm font-bold text-[#22D3EE] mt-0.5">{shopResult.postFrequency}</p>
                    </div>
                    <div className="bg-[#121c35] p-3 rounded-xl border border-indigo-900/40">
                      <span className="text-[11px] text-slate-400">Активтілік</span>
                      <p className="text-sm font-bold text-white mt-0.5">{shopResult.avgEngagement}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#121c35]/80 p-4 rounded-xl border border-indigo-900/40 space-y-2">
                      <h5 className="font-bold text-emerald-400 text-xs uppercase">Расталған фактілер</h5>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {shopResult.verifiedFacts?.map((fact, idx) => (
                          <li key={idx}>{fact}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#121c35]/80 p-4 rounded-xl border border-indigo-900/40 space-y-2">
                      <h5 className="font-bold text-rose-400 text-xs uppercase">Күмәнді белгілер</h5>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {shopResult.redFlags?.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {shopResult.marketPrice && shopResult.shopPrice && (
                    <div className="bg-[#121c35]/80 p-5 rounded-xl border border-indigo-900/40 space-y-4">
                      <h4 className="font-bold text-white text-sm">Price Intelligence & Comparison</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-[#1c2d59] p-3 rounded-lg">
                          <span className="text-[11px] text-slate-400">Дүкен бағасы</span>
                          <p className="text-lg font-bold text-white">{Number(shopResult.shopPrice).toLocaleString()} ₸</p>
                        </div>
                        <div className="bg-[#1c2d59] p-3 rounded-lg">
                          <span className="text-[11px] text-slate-400">Нарықтық баға</span>
                          <p className="text-lg font-bold text-[#22D3EE]">{Number(shopResult.marketPrice).toLocaleString()} ₸</p>
                        </div>
                        <div className="bg-[#1c2d59] p-3 rounded-lg">
                          <span className="text-[11px] text-slate-400">Айырмасы</span>
                          <p className="text-lg font-bold text-amber-400">{shopResult.priceDiffPercent}% төмен</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-[#8B5CF6]/15 to-[#22D3EE]/15 p-5 rounded-xl border border-[#8B5CF6]/30 space-y-3">
                    <h4 className="font-bold text-white text-sm">AI Final Report & Recommendations</h4>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {shopResult.recommendations}
                    </p>
                    <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400 border-t border-[#8B5CF6]/20">
                      <span>{shopResult.sources}</span>
                      <button 
                        onClick={() => alert("PDF есеп жүктелді!")}
                        className="px-3 py-1.5 bg-[#121c35] text-slate-200 text-xs rounded-lg border border-indigo-900/40"
                      >
                        PDF есеп
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. REAL OR MANIPULATED — ОЙЫН МОДУЛІ */}
        {activeTab === 'game' && (
          <div className="max-w-xl mx-auto bg-[#1c2d59] border border-indigo-900/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-center">
            <div className="space-y-1.5">
              <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full text-xs font-semibold">
                Интерактивті ойын
              </span>
              <h2 className="text-2xl font-bold">Real or Manipulated?</h2>
              <p className="text-slate-300 text-xs">Контенттің шынайы немесе фейк екенін анықтаңыз.</p>
            </div>

            {gameRound < gameItems.length ? (
              <div className="space-y-5">
                <div className="bg-[#121c35]/90 p-6 rounded-2xl border border-indigo-900/40 space-y-3">
                  <h3 className="text-lg font-bold text-white">{gameItems[gameRound].title}</h3>
                  <p className="text-slate-300 text-xs italic">{gameItems[gameRound].imageDesc}</p>
                </div>

                {!gameAnswered ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        setGameAnswered(true);
                        const correct = gameItems[gameRound].isManipulated === true;
                        if (correct) setGameScore(gameScore + 1);
                        setGameFeedback(correct ? "Дұрыс! Бұл манипуляция." : "Қате! Бұл манипуляция емес.");
                      }}
                      className="py-3 bg-rose-600/20 border border-rose-500/50 text-rose-300 text-xs md:text-sm font-bold rounded-xl"
                    >
                      Манипуляция (Fake)
                    </button>
                    <button 
                      onClick={() => {
                        setGameAnswered(true);
                        const correct = gameItems[gameRound].isManipulated === false;
                        if (correct) setGameScore(gameScore + 1);
                        setGameFeedback(correct ? "Дұрыс! Бұл шынайы ақпарат." : "Қате! Бұл жерде манипуляция бар.");
                      }}
                      className="py-3 bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 text-xs md:text-sm font-bold rounded-xl"
                    >
                      Шынайы (Real)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 bg-[#121c35] p-5 rounded-xl border border-indigo-900/40">
                    <p className="font-bold text-white text-sm">{gameFeedback}</p>
                    <p className="text-xs text-slate-300">{gameItems[gameRound].reason}</p>
                    <button 
                      onClick={() => {
                        setGameAnswered(false);
                        setGameRound(gameRound + 1);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold rounded-xl"
                    >
                      Келесі
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 py-6">
                <div className="w-14 h-14 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full mx-auto flex items-center justify-center">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold">Ойын аяқталды!</h3>
                <p className="text-slate-300 text-sm">Ұпайыңыз: <span className="text-[#22D3EE] font-bold">{gameScore} / {gameItems.length}</span></p>
                <button 
                  onClick={() => {
                    setGameRound(0);
                    setGameScore(0);
                    setGameAnswered(false);
                  }}
                  className="px-5 py-2.5 bg-[#121c35] text-white text-xs font-medium rounded-xl border border-indigo-900/40"
                >
                  Қайта ойнау
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. MY PROGRESS (ПАНЕЛЬ) */}
        {activeTab === 'progress' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold">My Progress — Жеке панель</h2>
              <p className="text-slate-300 text-xs md:text-sm">Медиасауаттылық дағдыларының өсу динамикасы.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-2xl p-5 space-y-1 shadow-xl">
                <span className="text-xs text-slate-300">Бастапқы тест</span>
                <div className="text-2xl font-extrabold text-white">7 / 15</div>
                <p className="text-[11px] text-slate-400">Алғашқы көрсеткіш</p>
              </div>

              <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-2xl p-5 space-y-1 shadow-xl">
                <span className="text-xs text-slate-300">Қорытынды тест</span>
                <div className="text-2xl font-extrabold text-[#22D3EE]">{testScore} / 15</div>
                <p className="text-[11px] text-emerald-400 font-medium">Соңғы сақталған тест нәтижесі</p>
              </div>

              <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-2xl p-5 space-y-1 shadow-xl">
                <span className="text-xs text-slate-300">Visual Lab кейстері</span>
                <div className="text-2xl font-extrabold text-[#8B5CF6]">6 кейс</div>
                <p className="text-[11px] text-slate-400">Оқу кейстері қолжетімді</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <h3 className="font-bold text-white text-base">Дағдылар диаграммасы</h3>
                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                      { subject: 'Fake News', A: 120, fullMark: 150 },
                      { subject: 'Clickbait', A: 110, fullMark: 150 },
                      { subject: 'Deepfake', A: 95, fullMark: 150 },
                      { subject: 'Shop Check', A: 130, fullMark: 150 },
                      { subject: 'Эмоция', A: 100, fullMark: 150 },
                      { subject: 'AI Контент', A: 115, fullMark: 150 },
                    ]}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" tick={{fontSize: 10}} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar name="Student" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#1c2d59] border border-indigo-900/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <h3 className="font-bold text-white text-base">Мұғалім панелі (Анонимді)</h3>
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center bg-[#121c35] p-3 rounded-xl border border-indigo-900/40 text-xs">
                    <span className="text-slate-300">Қатысушылар саны</span>
                    <span className="font-bold text-white">Дерек жоқ</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#121c35] p-3 rounded-xl border border-indigo-900/40 text-xs">
                    <span className="text-slate-300">Орташа қорытынды балл</span>
                    <span className="font-bold text-[#22D3EE]">Дерек жоқ</span>
                  </div>
                  <button 
                    onClick={() => alert("Нақты мұғалім статистикасы мен CSV экспорты әлі қосылмаған.")}
                    className="w-full py-2.5 bg-[#121c35] hover:bg-[#25396e] text-slate-200 text-xs font-medium rounded-xl border border-indigo-900/40 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>CSV экспорттау</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR (PWA Mobile First) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121c35]/95 backdrop-blur-lg border-t border-indigo-900/50 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'home' ? 'text-[#22D3EE]' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Басты</span>
        </button>

        <button 
          onClick={() => setActiveTab('test')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'test' ? 'text-[#22D3EE]' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Brain className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Media IQ</span>
        </button>

        <button 
          onClick={() => setActiveTab('lab')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'lab' ? 'text-[#22D3EE]' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Eye className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Lab</span>
        </button>

        <button 
          onClick={() => setActiveTab('shopcheck')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'shopcheck' ? 'text-[#22D3EE]' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Shop Check</span>
        </button>

        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${activeTab === 'progress' ? 'text-[#22D3EE]' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="hidden md:block border-t border-indigo-900/40 mt-16 py-6 px-4 text-center text-slate-400 text-xs bg-[#121c35]/50 backdrop-blur-md">
        <p>© 2026 VISUAL CHOICE — Media Intelligence Lab. Progressive Web App (PWA) нұсқасы.</p>
      </footer>
    </div>
  );
}
