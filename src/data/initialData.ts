import { RegistrationTicket, Speaker } from '../types';

export const EVENT_DETAILS = {
  title: "BUSINESS TALK",
  chineseTitle: "銀保渠道 事業發展分享會",
  brand: "PP 彼坡 PASSION",
  year: "2026",
  dateFormatted: "2026年11月20日 (星期五)",
  timeFormatted: "20:00 PM (19:30 開放入場)",
  targetDateIso: "2026-11-20T20:00:00+08:00",
  venue: "香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life",
  venueShort: "尖沙咀港威大廈5座11樓 BOC Life",
  totalSeats: 50,
  initialTakenSeats: 43,
  prize: "IPAD Wifi 128GB 一部",
  posterPath: "/assets/aistudio/WhatsApp_Image_2026-11-05_at_11.18.00_8edf0ae9.jpeg",
};

export const SPEAKERS: Speaker[] = [
  {
    id: "yue-wong",
    name: "YUE WONG",
    englishName: "Yue Wong",
    title: "分行經理",
    role: "Branch Manager · BOC Life Partner Team",
    transitionOrigin: "非牟利機構文職轉型",
    experienceYears: 8,
    honors: ["入行 8 年", "連續 6 年榮獲 COT (Court of the Table 尊尚會員)"],
    keyQuote: "從 NGO 文職的固定月薪與重複日常，到掌控自己的人生與財務自由。銀保渠道給予我的是制度化的信任與穩定客源，而非孤立無援的陌生開發。",
    bio: "曾於本地非牟利機構擔任全職文職人員，面對有限的晉升空間與生活成本壓力，於8年前毅然投身銀保渠道。憑藉誠懇耐心的溝通特質與銀行的龐大客群支持，連續6年達成國際頂尖COT標準，目前帶領一支充滿活力的理財策劃菁英團隊。",
    keyTopics: [
      "文職人員轉職金融界的核心優勢與心態調適",
      "如何善用銀行分行龐大優質客源，免除敲門陌生拜訪的壓力",
      "建立長期信賴感：8年維持高續保率與高轉介率的服務心法",
      "新人首年突破 100 萬年薪的實戰路徑圖"
    ]
  },
  {
    id: "cecilia-yik",
    name: "CECILIA YIK",
    englishName: "Cecilia Yik",
    title: "高級分部經理",
    role: "Senior Division Manager · PP PASSION Lead",
    transitionOrigin: "集團公司私人助理轉型",
    experienceYears: 6,
    honors: [
      "入行 6 年",
      "1 年 TOT (Top of the Table - 業界頂峰最高榮譽，等同6倍MDRT)",
      "榮獲 COT (Court of the Table)",
      "3 年 MDRT (百萬圓桌會員)"
    ],
    keyQuote: "作為私人助理，我每天替老闆管理百萬事務，卻難以積累屬於自己的資產。轉型銀保6年，我將細膩高效的統籌能力轉化為事業利器，登頂全球頂級 TOT 榮譽。",
    bio: "入行前曾擔任大型跨國企業集團高管私人助理 (PA)，具備極佳的跨部門協調能力與高資產人士溝通經驗。加入銀保渠道後僅短短6年間，便締造了1年TOT（超越業界常規6倍）、多次COT及3年MDRT的耀眼紀錄，並晉升為高級分部經理，培養出多位百萬年薪新星。",
    keyTopics: [
      "私人助理 / 秘書的溝通技能如何降維打擊高資產理財規劃",
      "6年內達成1年TOT、COT及3年MDRT的戰術方法與日程管理",
      "打造凝聚力極強的「彼坡 PASSION」菁英團隊孵化文化",
      "從個人銷售到團隊領袖：實現被動收入與事業裂變的飛輪效應"
    ]
  }
];

export const AGENDA = [
  {
    time: "19:30 - 20:00",
    title: "迎賓接待 & 交流簽到",
    tag: "簽到環節",
    description: "入場領取活動手冊、嘉賓紀念品，並領取專屬「iPad WiFi 128GB」幸運抽獎號碼券。"
  },
  {
    time: "20:00 - 20:15",
    title: "大會致辭：2026 金融市場與銀保渠道爆發機遇",
    tag: "市場宏觀",
    description: "剖析香港中銀集團（BOC Life）銀保生態優勢，為何銀行分行推薦模式已成為頂級財富顧問的成長快車道。"
  },
  {
    time: "20:15 - 20:45",
    title: "專題演講：文職轉型實錄 —— 從固定薪水到6年COT",
    tag: "主講：Yue Wong",
    description: "分享嘉賓 Yue Wong 現身說法：告別 NGO 文職舒適圈、克服轉行恐懼、如何在零金融背景下透過體系培訓穩健成長。"
  },
  {
    time: "20:45 - 21:15",
    title: "專題演講：突破職涯天花板 —— 6年登頂TOT巔峰心法",
    tag: "主講：Cecilia Yik",
    description: "分享嘉賓 Cecilia Yik 傾囊相授：PA 秘書技能如何轉化為頂級客戶服務力、1年榮獲 TOT 榮譽的時間管理與團隊複利。"
  },
  {
    time: "21:15 - 21:35",
    title: "閉門圓桌互動：嘉賓 1-on-1 職涯答疑與真實診斷",
    tag: "互動答疑",
    description: "現場自由提問：無論是無相關經驗、牌照考試準備、底薪津貼保障方案，嘉賓均直接真實解答。"
  },
  {
    time: "21:35 - 21:45",
    title: "壓軸盛典：iPad WiFi 128GB 幸運大抽獎 & 自由交流",
    tag: "抽獎環節",
    description: "現場即時電腦抽獎，送出全新 Apple iPad WiFi 128GB 一部！會後合影與導師私享茶敘交流。"
  }
];

export const INITIAL_REGISTRATIONS: RegistrationTicket[] = [
  {
    id: "reg-001",
    registrationNo: "PP-20261120-001",
    ticketCode: "TKT-8841",
    luckyDrawNumber: "LUCKY-108",
    seatNumber: "A-01",
    createdAt: "2026-11-02T10:15:00Z",
    formData: {
      chineseName: "陳慧欣",
      englishName: "Karen Chan",
      phonePrefix: "+852",
      phone: "91234567",
      email: "karen.chan@example.com",
      currentCareer: "NGO 文職人員",
      yearsExperience: "4年",
      bringingGuest: false,
      careerQuestion: "想了解非相關學科背景考取 IIQE 牌照的難度與培訓支援。",
      agreedTerms: true
    }
  },
  {
    id: "reg-002",
    registrationNo: "PP-20261120-002",
    ticketCode: "TKT-8842",
    luckyDrawNumber: "LUCKY-109",
    seatNumber: "A-02",
    createdAt: "2026-11-03T14:20:00Z",
    formData: {
      chineseName: "李俊傑",
      englishName: "Jason Li",
      phonePrefix: "+852",
      phone: "62345678",
      email: "jason.li@example.com",
      currentCareer: "行政助理 / 秘書",
      yearsExperience: "5年",
      bringingGuest: true,
      guestName: "張雅婷",
      careerQuestion: "私人助理轉型初期，大概需要多久時間能夠穩定收入？",
      agreedTerms: true
    }
  },
  {
    id: "reg-003",
    registrationNo: "PP-20261120-003",
    ticketCode: "TKT-8843",
    luckyDrawNumber: "LUCKY-110",
    seatNumber: "A-03",
    createdAt: "2026-11-04T09:45:00Z",
    formData: {
      chineseName: "何芷晴",
      englishName: "Chloe Ho",
      phonePrefix: "+852",
      phone: "98765432",
      email: "chloe.ho@example.com",
      currentCareer: "零售店長 / 服務業",
      yearsExperience: "6年",
      bringingGuest: false,
      careerQuestion: "銀保渠道與普通保險代理人相比，客戶資源如何分配？",
      agreedTerms: true
    }
  }
];

export const FAQS = [
  {
    question: "本次分享會需要收取任何入場或報名費用嗎？",
    answer: "完全免費！本次活動由 PP 彼坡 PASSION 全額贊助主辦，旨在為有志突破現狀、探索金融財富管理渠道的人士提供高價值的行業洞察與職涯諮詢。現場席位僅限 50 名，額滿即止。"
  },
  {
    question: "我目前沒有任何金融、保險或銷售背景，適合參加嗎？",
    answer: "非常適合！兩位主講嘉賓 Yue Wong 與 Cecilia Yik 入行前分別為 NGO 文職人員及集團公司私人助理 (PA)，皆為零金融背景跨界轉型的典型成功代表。現場將重點剖析行政文職技能如何轉化為專業理財優勢，並介紹團隊由淺入深的漸進式孵化機制。"
  },
  {
    question: "「iPad WiFi 128GB」抽獎活動的規則是怎樣的？",
    answer: "所有經本網站成功在線登記並於 2026年11月20日 20:00 前抵達尖沙咀港威大廈5座11樓 BOC Life 簽到出席的嘉賓，均可獲派一張實體幸運抽獎號碼券。大會將於分享會尾聲 (約 21:35) 進行公開電腦抽獎，獲獎者必須在場領獎。"
  },
  {
    question: "活動現場的著裝要求 (Dress Code) 是什麼？",
    answer: "建議著商務休閒服裝 (Business Casual)，以展現專業形象並方便交流。現場備有精緻茶點與咖啡招待。"
  },
  {
    question: "如果我想攜帶朋友或同事一同前往，需要分開登記嗎？",
    answer: "可以在報名表格中勾選「攜帶一位同行夥伴」並填寫同行朋友姓名，系統會為您與朋友預留相鄰席位；或者建議朋友自行單獨登記一份表格，這樣兩人均可獲得各自獨立的 iPad 抽獎資格！"
  },
  {
    question: "活動地點的具體交通與步行路線如何？",
    answer: "活動地點位於香港九龍尖沙咀廣東道15號港威大廈5座11樓 BOC Life。搭乘港鐵於尖沙咀站 A1 出口步行約 5 分鐘，或由柯士甸站 D2 出口步行約 8 分鐘；亦可直接停泊於海港城／港威大廈停車場。"
  }
];
