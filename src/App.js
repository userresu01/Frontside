import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaGlobe,
  FaTelegramPlane,
  FaCode,
  FaRobot,
  FaServer,
  FaStar,
  FaCheckCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const translations = {
  appTitle: {
    ua: "FrontSide - студія сучасних сайтів",
    ru: "FrontSide - студия современных сайтов",
    en: "FrontSide - modern web studio",
  },
  tagline: {
    ua: "Швидкі та виразні сайти під ключ",
    ru: "Быстрые и выразительные сайты под ключ",
    en: "Fast, expressive websites",
  },

  heroTitle: {
    ua: "Потрібен сайт? Відвідай FrontSide!",
    ru: "Нужен сайт? Посети FrontSide!",
    en: "Need a site? Visite FrontSide!",
  },
  heroSubtitle: {
    ua: "FrontSide перетворює ідею на живий, анімований продукт з характером.",
    ru: "FrontSide превращает идею в живой, анимированный продукт с характером.",
    en: "FrontSide turns ideas into living, animated products with character.",
  },
  heroPrimary: {
    ua: "Замовити сайт",
    ru: "Заказать сайт",
    en: "Start a project",
  },
  heroSecondary: {
    ua: "Подивитися послуги",
    ru: "Посмотреть услуги",
    en: "View services",
  },
  heroBadge: {
    ua: "FrontSide · Сайти · Боти",
    ru: "FrontSide · Сайты · Боты",
    en: "FrontSide · WEB · BOTS",
  },
  heroPreviewLabel: {
    ua: "МИ СТВОРЮЄМО",
    ru: "МЫ СОЗДАЁМ",
    en: "WE CREATE",
  },
  heroStat1: {
    ua: "Неперевершені макети",
    ru: "Превосходные макеты",
    en: "Perfect layouts",
  },
  heroStat2: {
    ua: "Плавні взаємодії",
    ru: "Плавные взаимодействия",
    en: "Smooth interactions",
  },
  heroStat3: {
    ua: "Telegram-боти",
    ru: "Telegram-боты",
    en: "Telegram bots",
  },
  heroStat4: {
    ua: "Швидкий запуск",
    ru: "Быстрый запуск",
    en: "Fast launch",
  },

  heroCard1Title: {
    ua: "Лендінги, промо, малий бізнес",
    ru: "Лендинги, промо, малый бизнес",
    en: "Landing · Promo · Small business",
  },
  heroCard1Pill: { ua: "Сайт", ru: "Сайт", en: "WEB" },
  heroCard2Title: {
    ua: "Оплати, підтримка, автоматизація",
    ru: "Оплаты, поддержка, автоматизация",
    en: "Payments · Support · Automation",
  },
  heroCard2Pill: { ua: "Підтримання", ru: "Поддержание", en: "Maintaining" },
  heroCard3Title: {
    ua: "Професійні боти. Швидкий звʼязок і запуск.",
    ru: "Профессиональные боты. Быстрая связь и запуск.",
    en: "Professional bots. Fast feedback and delivery.",
  },
  heroCard3Pill: { ua: "Боти", ru: "Боты", en: "Bots" },

  navServices: { ua: "Послуги", ru: "Услуги", en: "Services" },
  navPricing: { ua: "Оплата", ru: "Оплата", en: "Pricing" },
  navProcess: { ua: "Як ми працюємо", ru: "Как мы работаем", en: "Process" },
  navShowcase: { ua: "Формати робіт", ru: "Форматы работ", en: "Showcase" },
  navReviews: { ua: "FAQ", ru: "FAQ", en: "FAQ" },
  navContact: { ua: "Контакт", ru: "Контакт", en: "Contact" },

  servicesTitle: { ua: "Що ми робимо", ru: "Что мы делаем", en: "What we do" },
  servicesSubtitle: {
    ua: "Сайти та боти в одному стилі й з одних рук.",
    ru: "Сайты и боты в одном стиле и из одних рук.",
    en: "Websites and bots in one place and one visual style.",
  },
  serviceWebTitle: {
    ua: "Вишукано-анімовані сайти",
    ru: "Изысканно-анимированые сайты",
    en: "Animated websites",
  },
  serviceWebDesc: {
    ua: "Лендинги, невеликі сайти й промо-сторінки від 2500 до 15 000 грн. Адаптив, ефекти, швидке завантаження.",
    ru: "Лендинги, небольшие сайты и промо-страницы от 2500 до 15 000 грн. Адаптив, эффекты, быстрая загрузка.",
    en: "Landing pages and small sites from 2500 to 15 000 UAH. Responsive, animated and fast.",
  },
  serviceDomainTitle: {
    ua: "Домен і технічна частина",
    ru: "Домен и техническая часть",
    en: "Domain and tech setup",
  },
  serviceDomainDesc: {
    ua: "Підбираємо домен, купуємо замість вас і налаштовуємо. Вартість домену плюс 30% за наш час та досвід.",
    ru: "Подбираем домен, покупаем за вас и настраиваем. Стоимость домена плюс 30% за наше время и опыт.",
    en: "We pick, buy and configure your domain. Domain price plus 30% for our time and expertise.",
  },
  serviceBotTitle: { ua: "Telegram-боти", ru: "Telegram-боты", en: "Telegram bots" },
  serviceBotDesc: {
    ua: "Боти від 800 до 6000 грн: заявки, магазини, оплати, підтримка. Логіка повністю під ваш запит.",
    ru: "Боты от 800 до 6000 грн: заявки, магазины, оплаты, поддержка. Логика полностью под ваш запрос.",
    en: "Bots from 800 to 6000 UAH: leads, shops, payments, support. Logic tailored to your needs.",
  },

  pricingTitle: { ua: "Умови та оплата", ru: "Условия и оплата", en: "Payment and terms" },
  pricingLine1: {
    ua: "Передплата 20% для нових клієнтів",
    ru: "Предоплата 20% для новых клиентов",
    en: "20% prepayment for new clients",
  },
  pricingLine2: {
    ua: "Передплата 50% для постійних клієнтів",
    ru: "Предоплата 50% для постоянных клиентов",
    en: "50% prepayment for returning clients",
  },
  pricingLine3: {
    ua: "Домен: будь-який сервіс плюс 30% за налаштування і супровід",
    ru: "Домен: любой сервис плюс 30% за настройку и сопровождение",
    en: "Domain: any provider plus 30% for setup and support",
  },
  pricingLine4: {
    ua: "Чіткі дедлайни, без хаосу та зникнень",
    ru: "Чёткие дедлайны, без хаоса и пропаданий",
    en: "Clear deadlines, no chaos or disappearing",
  },

  processTitle: { ua: "Як ми працюємо", ru: "Как мы работаем", en: "Our process" },
  processStep1Title: { ua: "01. Короткий бриф", ru: "01. Краткий бриф", en: "01. Quick brief" },
  processStep1Desc: {
    ua: "15–30 хвилин у Telegram: цілі, стиль, приклади, дедлайни.",
    ru: "15–30 минут в Telegram: цели, стиль, примеры, дедлайны.",
    en: "15–30 minutes in Telegram: goals, style, references, deadlines.",
  },
  processStep2Title: {
    ua: "02. Структура та дизайн",
    ru: "02. Структура и дизайн",
    en: "02. Structure and design",
  },
  processStep2Desc: {
    ua: "Збираємо структуру, готуємо візуальний стиль та анімації.",
    ru: "Собираем структуру, готовим визуальный стиль и анимации.",
    en: "We design the structure, visual style and interface animations.",
  },
  processStep3Title: { ua: "03. Розробка", ru: "03. Разработка", en: "03. Development" },
  processStep3Desc: {
    ua: "Верстаємо, підключаємо домен, оптимізуємо швидкість і тестуємо.",
    ru: "Верстаем, подключаем домен, оптимизируем скорость и тестируем.",
    en: "We build, connect the domain, optimize performance and test.",
  },
  processStep4Title: { ua: "04. Запуск", ru: "04. Запуск", en: "04. Launch" },
  processStep4Desc: {
    ua: "Фінальні правки, інструкція та супровід після запуску.",
    ru: "Финальные правки, инструкция и сопровождение после запуска.",
    en: "Final tweaks, handoff and support after launch.",
  },

  showcaseTitle: {
    ua: "Формати робіт",
    ru: "Форматы работ",
    en: "What we build",
  },
  showcaseSubtitle: {
    ua: "Ми робимо два типи сайтів і Telegram-боти. Нижче — коротко про різницю та бюджети.",
    ru: "Мы делаем два типа сайтов и Telegram-боты. Ниже — коротко о разнице и бюджетах.",
    en: "We offer two types of websites plus Telegram bots. Here’s a short, budget-clear overview.",
  },

  showcaseCard1Title: {
    ua: "Якісний сайт",
    ru: "Качественный сайт",
    en: "Quality website",
  },
  showcaseCard1Tag: {
    ua: "2500 – 5000 грн",
    ru: "2500 – 5000 грн",
    en: "2,500 – 5,000 UAH",
  },
  showcaseCard1Desc: {
    ua: "Лендінги та невеликі сайти для бізнесу: швидкий запуск, акуратний дизайн і легкі анімації.",
    ru: "Лендинги и небольшие сайты для бизнеса: быстрый запуск, аккуратный дизайн и лёгкие анимации.",
    en: "Landing pages and small business sites: fast delivery, clean design, tasteful animations.",
  },
  showcaseCard1Price: {
    ua: "2500 – 5000 грн",
    ru: "2500 – 5000 грн",
    en: "2,500 – 5,000 UAH",
  },
  showcaseCard1Item1: {
    ua: "Адаптив під мобільні",
    ru: "Адаптив под мобильные",
    en: "Mobile responsive",
  },
  showcaseCard1Item2: {
    ua: "Стильний дизайн + анімація",
    ru: "Стильный дизайн + анимация",
    en: "Modern design + animation",
  },
  showcaseCard1Item3: {
    ua: "Оптимізація швидкості",
    ru: "Оптимизация скорости",
    en: "Speed optimization",
  },

  showcaseCard2Title: {
    ua: "Великий та ювелірний сайт",
    ru: "Большой и ювелирный сайт",
    en: "Large and bespoke website",
  },
  showcaseCard2Tag: {
    ua: "5000 – 15000 грн+",
    ru: "5000 – 15000 грн+",
    en: "5,000 – 15,000 UAH+",
  },
  showcaseCard2Desc: {
    ua: "Багатосторінкові та складні проєкти: глибока структура, багато контенту, унікальні ефекти. Якщо проєкт дуже великий, бюджет обговорюємо індивідуально.",
    ru: "Многостраничные и сложные проекты: глубокая структура, много контента, уникальные эффекты. Если проект огромный, бюджет обсуждаем индивидуально.",
    en: "Multi-page, feature-rich projects with deep structure and custom effects. Truly huge projects are priced individually.",
  },
  showcaseCard2Price: {
    ua: "5000 – 15000+ грн",
    ru: "5000 – 15000+ грн",
    en: "5,000 – 15,000+ UAH",
  },
  showcaseCard2Item1: {
    ua: "Складна структура сторінок",
    ru: "Сложная структура страниц",
    en: "Complex site structure",
  },
  showcaseCard2Item2: {
    ua: "Індивідуальний дизайн під бренд",
    ru: "Индивидуальный дизайн под бренд",
    en: "Brand-tailored design",
  },
  showcaseCard2Item3: {
    ua: "Розширена логіка та інтеграції",
    ru: "Расширенная логика и интеграции",
    en: "Advanced logic & integrations",
  },

  showcaseCard3Title: {
    ua: "Telegram-боти",
    ru: "Telegram-боты",
    en: "Telegram bots",
  },
  showcaseCard3Tag: {
    ua: "800 – 6000 грн",
    ru: "800 – 6000 грн",
    en: "800 – 6,000 UAH",
  },
  showcaseCard3Desc: {
    ua: "Боти під ваші задачі: заявки, підтримка, магазини, оплати, автоматизація. Ціна залежить від логіки та інтеграцій.",
    ru: "Боты под ваши задачи: заявки, поддержка, магазины, оплаты, автоматизация. Цена зависит от логики и интеграций.",
    en: "Bots for leads, support, shops, payments, and automation. Final price depends on logic and integrations.",
  },
  showcaseCard3Price: {
    ua: "800 – 6000 грн",
    ru: "800 – 6000 грн",
    en: "800 – 6,000 UAH",
  },
  showcaseCard3Item1: {
    ua: "Сценарій під ваш бізнес",
    ru: "Сценарий под ваш бизнес",
    en: "Flow tailored to you",
  },
  showcaseCard3Item2: {
    ua: "Підключення оплат / форм / CRM",
    ru: "Подключение оплат / форм / CRM",
    en: "Payments / forms / CRM",
  },
  showcaseCard3Item3: {
    ua: "Супровід після запуску",
    ru: "Поддержка после запуска",
    en: "Post-launch support",
  },

  faqTitle: {
    ua: "Поширені питання",
    ru: "Частые вопросы",
    en: "FAQ",
  },
  faqSubtitle: {
    ua: "Коротко і по справі — щоб ви одразу розуміли формат, терміни та оплату.",
    ru: "Коротко и по делу — чтобы сразу понимать формат, сроки и оплату.",
    en: "Short and clear answers about format, timelines, and payments.",
  },

  faqQ1: {
    ua: "Скільки триває розробка сайту?",
    ru: "Сколько длится разработка сайта?",
    en: "How long does a website take?",
  },
  faqA1: {
    ua: "Залежить від складності. Маленький сайт — 1–3 дні, середній — 3–7, великий — до 10–14 днів.",
    ru: "Зависит от сложности. Маленький сайт — 1–3 дня, средний — 3–7, большой — до 10–14 дней.",
    en: "Depends on complexity. Small sites take 1–3 days, medium 3–7, large up to 10–14 days.",
  },

  faqQ2: {
    ua: "Як проходить оплата?",
    ru: "Как проходит оплата?",
    en: "How does payment work?",
  },
  faqA2: {
    ua: "Оплата зручними для вас методами, навіть криптовалютою. Про передплату читайте вище.",
    ru: "Оплата удобными вам методами, включая криптовалюту. Про предоплату читайте выше.",
    en: "Payment using any method convenient for you, including cryptocurrency. Read about prepayment above.",
  },

  faqQ3: {
    ua: "Чи допоможете з доменом і запуском?",
    ru: "Поможете с доменом и запуском?",
    en: "Do you help with domain and launch?",
  },
  faqA3: {
    ua: "Так. За додаткову платню, ми підбираємо домен, купуємо замість вас і підключаємо до сайту. Ви отримуєте готовий результат.",
    ru: "Да. За дополнительную плату, одбираем домен, покупаем за вас и подключаем к сайту. Вы получаете готовый результат.",
    en: "Yes. For an aditional fee, we pick, buy, and connect your domain. You get a ready-to-go site.",
  },

  faqQ4: {
    ua: "Що саме входить у сайт за 2500 – 5000 грн?",
    ru: "Что входит в сайт за 2500 – 5000 грн?",
    en: "What’s included in a 2,500 – 5,000 UAH site?",
  },
  faqA4: {
    ua: "Лендінг або невеликий бізнес-сайт, адаптив, дизайн, базові анімації, швидке завантаження.",
    ru: "Лендинг или небольшой бизнес-сайт, адаптив, дизайн, базовые анимации, быстрая загрузка.",
    en: "Landing or small business site with responsive layout, design, basic animations, and speed tuning.",
  },

  faqQ5: {
    ua: "Скільки коштує Telegram-бот?",
    ru: "Сколько стоит Telegram-бот?",
    en: "How much does a Telegram bot cost?",
  },
  faqA5: {
    ua: "Від 300 до 2000 грн. Все залежить від логіки: заявки, оплати, магазин, підтримка.",
    ru: "От 300 до 2000 грн. Всё зависит от логики: заявки, оплаты, магазин, поддержка.",
    en: "From 300 to 2,000 UAH depending on logic: leads, payments, shop, support.",
  },

  contactTitle: { ua: "Написати нам", ru: "Написать нам", en: "Contact us" },
  contactSubtitle: {
    ua: "Найзручніше в Telegram. Коротко опишіть проєкт, бюджет і дедлайн.",
    ru: "Проще всего написать в Telegram. Кратко опишите проект, бюджет и дедлайн.",
    en: "The easiest way is Telegram. Briefly describe your project, budget and deadline.",
  },
  telegramPlaceholder: { ua: "@frontside_manager", ru: "@frontside_manager", en: "@frontside_manager" },

  footerRights: { ua: "Усі права захищені.", ru: "Все права защищены.", en: "All rights reserved." },
  footerBuiltBy: { ua: "Вироблено командою FrontSide", ru: "Сделано командой FrontSide", en: "Built by FrontSide Team" },
};

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

const neon = {
  heroGradient: "from-orange-400 via-rose-400 to-fuchsia-400",
  primaryButtonGradient: "from-orange-400 via-rose-400 to-fuchsia-400",
  secondaryBorder: "border-orange-400/50",
  glowFrom: "bg-orange-400/22",
  glowMid: "bg-rose-400/20",
  glowTo: "bg-fuchsia-500/26",
  dotColor: "bg-orange-400",
  brandText: "text-orange-300",
};

const motionConfig = {
  baseDuration: 0.4,
  heroDuration: 0.55,
  hoverScale: 1.02,
  hoverLift: 4,
};

const theme = {
  dark: {
    page: "bg-slate-950 text-slate-100",
    header: "bg-slate-950/80 border-orange-400/25 text-slate-200",
    surface: "bg-slate-950/85 border-slate-700/80",
    surfaceSoft: "bg-slate-950/80 border-slate-700/80",
    surfaceAlt: "bg-slate-900/80 border-orange-400/25",
    textMuted: "text-slate-300",
    textMuted2: "text-slate-400",
    input:
      "bg-slate-950/80 text-slate-100 border-slate-700/80 focus:border-orange-400 ring-orange-500/40",
  },
  light: {
    page: "bg-slate-50 text-slate-950",
    header: "bg-white/80 border-orange-500/35 text-slate-900",
    surface: "bg-white/90 border-orange-500/25",
    surfaceSoft: "bg-white/80 border-orange-500/20",
    surfaceAlt: "bg-white/70 border-orange-500/30",
    textMuted: "text-slate-700",
    textMuted2: "text-slate-600",
    input:
      "bg-white/90 text-slate-900 border-orange-500/25 focus:border-orange-500 ring-orange-500/50",
  },
};

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function smoothScrollToY(targetY, duration = 950) {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduce) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY || window.pageYOffset;
  const delta = targetY - startY;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutQuint(progress);
    window.scrollTo(0, startY + delta * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function App() {
  const [darkMode, setDarkMode] = usePersistentState("fs-theme", true);
  const [language, setLanguage] = usePersistentState("fs-language", "en");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] || entry.en;
    },
    [language]
  );

  const th = darkMode ? theme.dark : theme.light;

  const goToSection = useCallback((href) => {
    if (typeof window === "undefined") return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    setMobileNavOpen(false);

    const headerOffset = 96;
    const rect = el.getBoundingClientRect();
    const targetY =
      rect.top + (window.scrollY || window.pageYOffset) - headerOffset;

    smoothScrollToY(targetY, 980);
    window.history.replaceState(null, "", href);
  }, []);

  return (
    <div className={`min-h-screen ${th.page} transition-colors duration-500`}>
      <BackgroundGlow neon={neon} darkMode={darkMode} />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <Header
          t={t}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
          neon={neon}
          th={th}
          onNav={goToSection}
        />

        <main className="mt-6 flex flex-1 flex-col gap-20 pb-10 sm:mt-10 sm:gap-24 lg:gap-28">
          <Hero t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <Services t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <Pricing t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <Process t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <Showcase t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <FAQSection t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
          <Contact t={t} neon={neon} motionConfig={motionConfig} darkMode={darkMode} th={th} />
        </main>

        <Footer t={t} neon={neon} darkMode={darkMode} th={th} />
      </div>
    </div>
  );
}

function BackgroundGlow({ neon, darkMode }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute -top-36 -left-36 h-96 w-96 rounded-full blur-3xl ${
          darkMode ? neon.glowFrom : "bg-orange-400/40"
        }`}
      />
      <div
        className={`absolute -bottom-44 -right-28 h-[28rem] w-[28rem] rounded-full blur-3xl ${
          darkMode ? neon.glowTo : "bg-fuchsia-500/45"
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          darkMode ? neon.glowMid : "bg-rose-400/38"
        }`}
      />
      {!darkMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/10 via-transparent to-fuchsia-200/10" />
      )}
    </div>
  );
}

function Header({
  t,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  mobileNavOpen,
  setMobileNavOpen,
  neon,
  th,
  onNav,
}) {
  const ThemeIcon = darkMode ? FaSun : FaMoon;

  const navItems = [
    { href: "#services", label: t("navServices") },
    { href: "#pricing", label: t("navPricing") },
    { href: "#process", label: t("navProcess") },
    { href: "#showcase", label: t("navShowcase") },
    { href: "#faq", label: t("navReviews") },
    { href: "#contact", label: t("navContact") },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onNav?.(href);
  };

  return (
    <header
      className={`relative sticky top-0 z-30 mb-4 rounded-2xl border pl-4 pr-10 py-3 backdrop-blur-md shadow-lg
      w-[calc(100%+2.5rem)] -mr-[2.5rem]
      sm:pr-12 sm:w-[calc(100%+3rem)] sm:-mr-[3rem]
      lg:pr-14 lg:w-[calc(100%+3.5rem)] lg:-mr-[3.5rem]
      ${darkMode ? "shadow-orange-500/20" : "shadow-orange-500/35"} ${th.header}`}
      style={{ overflow: "visible" }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionConfig.baseDuration }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-orange-400/50 via-transparent to-fuchsia-500/50 blur-sm" />
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode ? "bg-slate-950" : "bg-white"
                }`}
              >
                <FaCode className={`text-xl ${darkMode ? "text-orange-200" : "text-orange-500"}`} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium uppercase tracking-[0.2em] ${neon.brandText}`}>
                FrontSide
              </span>
              <span className={`text-xs ${th.textMuted2}`}>{t("tagline")}</span>
            </div>
          </motion.div>

          <nav
            className={`hidden items-center gap-5 text-sm font-medium lg:flex ${
              darkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] transition ${
                  darkMode
                    ? "text-slate-300 hover:text-orange-300"
                    : "text-slate-700 hover:text-orange-600"
                }`}
              >
                <span>{item.label}</span>
                <span className="h-px w-4 bg-orange-400/70" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#showcase"
              onClick={(e) => handleNavClick(e, "#showcase")}
              className={`hidden items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold shadow-sm transition hover:scale-105 md:inline-flex ${
                darkMode
                  ? "border-orange-400/50 bg-slate-950/80 text-orange-200 shadow-orange-500/30 hover:bg-slate-900"
                  : "border-orange-500/60 bg-white/80 text-orange-700 shadow-orange-500/40 hover:bg-white"
              }`}
            >
              <FaStar className="text-xs" />
              <span>{t("navShowcase")}</span>
            </a>

            <LanguageSelector language={language} setLanguage={setLanguage} darkMode={darkMode} />

            <button
              onClick={() => setDarkMode((v) => !v)}
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition hover:scale-105 ${
                darkMode
                  ? "border-orange-400/50 bg-slate-900/80 text-orange-200 shadow-orange-500/30 hover:bg-slate-800"
                  : "border-orange-500/60 bg-white text-orange-700 shadow-orange-500/40 hover:bg-orange-50"
              }`}
              aria-label="Toggle theme"
            >
              {!darkMode && (
                <span className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${neon.heroGradient} opacity-15`} />
              )}
              <ThemeIcon className="relative text-[14px] leading-none" />
            </button>

            <button
              className={`ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border transition lg:hidden ${
                darkMode
                  ? "border-slate-700/80 bg-slate-900/80 text-slate-200 hover:bg-slate-800"
                  : "border-orange-500/30 bg-white text-slate-800 hover:bg-orange-50"
              }`}
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              className={`mt-3 flex flex-col gap-2 rounded-xl border p-3 text-sm lg:hidden ${
                darkMode
                  ? "border-slate-700/70 bg-slate-950/95 text-slate-100"
                  : "border-orange-500/25 bg-white/95 text-slate-900"
              }`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`rounded-lg px-2 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                    darkMode
                      ? "text-slate-300 hover:bg-slate-900 hover:text-orange-300"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function LanguageSelector({ language, setLanguage, darkMode }) {
  const langs = ["ua", "ru", "en"];
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] ${
        darkMode
          ? "border-slate-700/80 bg-slate-950/80 text-slate-300"
          : "border-orange-500/25 bg-white/80 text-slate-700"
      }`}
    >
      <FaGlobe className={`mr-1 text-xs ${darkMode ? "text-orange-300" : "text-orange-500"}`} />
      {langs.map((lng) => (
        <button
          key={lng}
          onClick={() => setLanguage(lng)}
          className={`rounded-full px-2 py-0.5 font-semibold transition ${
            language === lng
              ? "bg-orange-400 text-slate-950"
              : darkMode
              ? "text-slate-400 hover:bg-slate-800"
              : "text-slate-600 hover:bg-orange-50"
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Hero({ t, neon, motionConfig, darkMode, th }) {
  return (
    <section
      id="hero"
      className="grid gap-10 pt-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center"
    >
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.heroDuration }}
      >
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow ${
            darkMode
              ? "border-orange-400/40 bg-slate-950/70 text-orange-200 shadow-orange-500/30"
              : "border-orange-500/45 bg-white/70 text-orange-700 shadow-orange-500/40"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{t("heroBadge")}</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <span className={`bg-gradient-to-br ${neon.heroGradient} bg-clip-text text-transparent`}>
            {t("heroTitle")}
          </span>
        </h1>

        <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${th.textMuted}`}>
          {t("heroSubtitle")}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${
              neon.primaryButtonGradient
            } px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg transition hover:scale-[1.02] ${
              darkMode ? "shadow-orange-500/40" : "shadow-orange-500/55"
            }`}
          >
            {t("heroPrimary")}
          </a>

          <a
            href="#services"
            className={`inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium shadow transition ${
              darkMode
                ? `${neon.secondaryBorder} bg-slate-950/70 text-orange-100 shadow-orange-500/20 hover:bg-slate-900`
                : "border-orange-500/50 bg-white/70 text-orange-700 shadow-orange-500/25 hover:bg-orange-50"
            }`}
          >
            {t("heroSecondary")}
          </a>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:flex sm:flex-wrap sm:gap-4">
          <StatBadge label={t("heroStat1")} darkMode={darkMode} />
          <StatBadge label={t("heroStat2")} darkMode={darkMode} />
          <StatBadge label={t("heroStat3")} darkMode={darkMode} />
          <StatBadge label={t("heroStat4")} darkMode={darkMode} />
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-sm items-center justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: motionConfig.heroDuration, delay: 0.1 }}
      >
        <div className="relative w-full">
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${
              neon.heroGradient
            } blur-xl opacity-90 ${darkMode ? "" : "opacity-100"}`}
          />
          <div
            className={`relative rounded-3xl border p-4 shadow-xl ${
              darkMode
                ? "border-orange-400/50 bg-slate-950/90 shadow-orange-500/30"
                : "border-orange-500/50 bg-white/90 shadow-orange-500/45"
            }`}
          >
            <div className={`flex items-center justify-between text-xs ${th.textMuted2}`}>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>{t("heroPreviewLabel")}</span>
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
                  darkMode ? "bg-slate-900/80 text-orange-200" : "bg-orange-50 text-orange-700"
                }`}
              >
                FRONTSIDE
              </span>
            </div>

            <div className={`mt-3 space-y-2 rounded-2xl p-3 ${darkMode ? "bg-slate-950/80" : "bg-white/80"}`}>
              <FakeCard
                icon={<FaServer className={darkMode ? "text-orange-200" : "text-orange-600"} />}
                title={t("heroCard1Title")}
                pill={t("heroCard1Pill")}
                darkMode={darkMode}
              />
              <FakeCard
                icon={<FaRobot className={darkMode ? "text-fuchsia-300" : "text-fuchsia-600"} />}
                title={t("heroCard2Title")}
                pill={t("heroCard2Pill")}
                darkMode={darkMode}
              />
              <FakeCard
                icon={
                  <FaTelegramPlane className={darkMode ? "text-rose-300" : "text-rose-600"} />
                }
                title={t("heroCard3Title")}
                pill={t("heroCard3Pill")}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatBadge({ label, darkMode }) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] ${
        darkMode
          ? "border-slate-700/80 bg-slate-950/80 text-slate-200"
          : "border-orange-500/25 bg-white/80 text-slate-800"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      <span>{label}</span>
    </div>
  );
}

function FakeCard({ icon, title, pill, darkMode }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs ${
        darkMode
          ? "border-slate-800 bg-slate-950/90 text-slate-200"
          : "border-orange-500/20 bg-white/90 text-slate-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${darkMode ? "bg-slate-900" : "bg-orange-50"}`}>
          {icon}
        </div>
        <span className="text-[11px] sm:text-xs">{title}</span>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          darkMode ? "bg-orange-500/15 text-orange-200" : "bg-orange-100 text-orange-700"
        }`}
      >
        {pill}
      </span>
    </div>
  );
}

function Services({ t, neon, motionConfig, darkMode, th }) {
  const items = [
    {
      icon: <FaServer className={darkMode ? "text-orange-200" : "text-orange-600"} />,
      title: t("serviceWebTitle"),
      desc: t("serviceWebDesc"),
      badge: "WEB",
    },
    {
      icon: <FaGlobe className={darkMode ? "text-emerald-300" : "text-emerald-600"} />,
      title: t("serviceDomainTitle"),
      desc: t("serviceDomainDesc"),
      badge: "DOMAIN",
    },
    {
      icon: <FaRobot className={darkMode ? "text-fuchsia-300" : "text-fuchsia-600"} />,
      title: t("serviceBotTitle"),
      desc: t("serviceBotDesc"),
      badge: "BOT",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        <span className={`bg-gradient-to-r ${neon.heroGradient} bg-clip-text text-transparent`}>
          {t("servicesTitle")}
        </span>
      </motion.h2>

      <motion.p
        className={`mt-2 text-center text-xs sm:text-sm ${th.textMuted2}`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration, delay: 0.05 }}
      >
        {t("servicesSubtitle")}
      </motion.p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl border p-4 shadow ${
              darkMode
                ? "border-orange-400/20 bg-slate-950/80 shadow-orange-500/20"
                : "border-orange-500/25 bg-white/85 shadow-orange-500/35"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: motionConfig.baseDuration,
              delay: idx * 0.07,
            }}
            whileHover={{
              y: -motionConfig.hoverLift,
              scale: motionConfig.hoverScale,
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100">
              <div className={`absolute -inset-6 bg-gradient-to-br ${neon.heroGradient}`} />
            </div>

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${darkMode ? "bg-slate-900" : "bg-orange-50"}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <div className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-orange-200">
                    <span className="h-px w-3 bg-orange-400/70" />
                    <span className={darkMode ? "text-orange-200" : "text-orange-700"}>
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className={`relative mt-3 text-xs leading-relaxed ${th.textMuted}`}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Pricing({ t, motionConfig, darkMode }) {
  const items = [
    t("pricingLine1"),
    t("pricingLine2"),
    t("pricingLine3"),
    t("pricingLine4"),
  ];

  return (
    <section id="pricing" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        {t("pricingTitle")}
      </motion.h2>

      <div
        className={`mx-auto mt-6 max-w-xl rounded-2xl border p-5 shadow-lg ${
          darkMode
            ? "border-emerald-400/25 bg-gradient-to-br from-slate-950/90 via-slate-950/90 to-slate-900/90 shadow-emerald-500/25"
            : "border-emerald-500/25 bg-white/90 shadow-emerald-500/30"
        }`}
      >
        <ul className={`space-y-3 text-sm ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
          {items.map((text, idx) => (
            <li key={idx} className="flex gap-2.5">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <FaCheckCircle className={`text-[13px] ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process({ t, motionConfig, darkMode }) {
  const steps = [
    { title: t("processStep1Title"), desc: t("processStep1Desc") },
    { title: t("processStep2Title"), desc: t("processStep2Desc") },
    { title: t("processStep3Title"), desc: t("processStep3Desc") },
    { title: t("processStep4Title"), desc: t("processStep4Desc") },
  ];

  return (
    <section id="process" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        {t("processTitle")}
      </motion.h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            className={`relative rounded-2xl border p-4 shadow ${
              darkMode
                ? "border-slate-700/80 bg-slate-950/85 shadow-slate-900/80"
                : "border-orange-500/25 bg-white/90 shadow-orange-500/20"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: motionConfig.baseDuration,
              delay: idx * 0.05,
            }}
          >
            <div className={`absolute right-4 top-4 text-xs font-semibold ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              {String(idx + 1).padStart(2, "0")}
            </div>
            <h3 className="text-sm font-semibold">{step.title}</h3>
            <p className={`mt-1.5 text-xs ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Showcase({ t, neon, motionConfig, darkMode }) {
  const cards = [
    {
      title: t("showcaseCard1Title"),
      tag: t("showcaseCard1Tag"),
      desc: t("showcaseCard1Desc"),
      price: t("showcaseCard1Price"),
      items: [
        t("showcaseCard1Item1"),
        t("showcaseCard1Item2"),
        t("showcaseCard1Item3"),
      ],
    },
    {
      title: t("showcaseCard2Title"),
      tag: t("showcaseCard2Tag"),
      desc: t("showcaseCard2Desc"),
      price: t("showcaseCard2Price"),
      items: [
        t("showcaseCard2Item1"),
        t("showcaseCard2Item2"),
        t("showcaseCard2Item3"),
      ],
    },
    {
      title: t("showcaseCard3Title"),
      tag: t("showcaseCard3Tag"),
      desc: t("showcaseCard3Desc"),
      price: t("showcaseCard3Price"),
      items: [
        t("showcaseCard3Item1"),
        t("showcaseCard3Item2"),
        t("showcaseCard3Item3"),
      ],
    },
  ];

  return (
    <section id="showcase" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        <span className={`bg-gradient-to-r ${neon.heroGradient} bg-clip-text text-transparent`}>
          {t("showcaseTitle")}
        </span>
      </motion.h2>

      <motion.p
        className={`mt-2 text-center text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration, delay: 0.05 }}
      >
        {t("showcaseSubtitle")}
      </motion.p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border p-4 shadow-lg ${
              darkMode
                ? "border-orange-400/25 bg-slate-950/85 shadow-orange-500/25"
                : "border-orange-500/25 bg-white/90 shadow-orange-500/35"
            }`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: motionConfig.baseDuration,
              delay: idx * 0.06,
            }}
            whileHover={{
              y: -motionConfig.hoverLift,
              scale: motionConfig.hoverScale,
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-100">
              <div className={`absolute -inset-6 bg-gradient-to-br ${neon.heroGradient}`} />
            </div>

            <div className="relative flex items-start justify-between gap-2">
              <div>
                <div className={`text-[10px] uppercase tracking-[0.22em] ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                  {card.tag}
                </div>
                <h3 className={`mt-1 text-sm font-semibold ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
                  {card.title}
                </h3>
              </div>
              <div
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  darkMode ? "bg-orange-500/15 text-orange-200" : "bg-orange-100 text-orange-700"
                }`}
              >
                {card.price}
              </div>
            </div>

            <p className={`relative mt-2 text-[11px] leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {card.desc}
            </p>

            <ul className={`mt-3 space-y-1.5 text-[11px] ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[5px] h-1 w-1 rounded-full bg-orange-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ t, neon, motionConfig, darkMode, th }) {
  const items = [
    { q: t("faqQ1"), a: t("faqA1") },
    { q: t("faqQ2"), a: t("faqA2") },
    { q: t("faqQ3"), a: t("faqA3") },
    { q: t("faqQ4"), a: t("faqA4") },
    { q: t("faqQ5"), a: t("faqA5") },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        <span className={`bg-gradient-to-r ${neon.heroGradient} bg-clip-text text-transparent`}>
          {t("faqTitle")}
        </span>
      </motion.h2>

      <motion.p
        className={`mt-1 text-center text-xs sm:text-sm ${th.textMuted2}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration, delay: 0.05 }}
      >
        {t("faqSubtitle")}
      </motion.p>

      <div className="mt-6 grid gap-3 lg:gap-4">
        {items.map((item, idx) => {
          const isOpen = idx === openIndex;
          return (
            <motion.div
              key={item.q}
              className={`relative overflow-hidden rounded-2xl border p-0 shadow ${
                darkMode
                  ? "border-orange-400/25 bg-slate-950/85 shadow-orange-500/20"
                  : "border-orange-500/25 bg-white/90 shadow-orange-500/30"
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: motionConfig.baseDuration, delay: idx * 0.04 }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      darkMode ? "bg-slate-900 text-orange-200" : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                  <span className={`text-sm font-semibold ${darkMode ? "text-slate-50" : "text-slate-950"}`}>
                    {item.q}
                  </span>
                </div>

                <motion.div
                  className={`h-px flex-1 ${
                    darkMode
                      ? "bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                      : "bg-gradient-to-r from-transparent via-orange-500/35 to-transparent"
                  }`}
                  animate={{ opacity: isOpen ? 1 : 0.5 }}
                  transition={{ duration: 0.2 }}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="px-4 pb-4"
                  >
                    <div
                      className={`rounded-xl border px-3 py-2 text-xs leading-relaxed ${
                        darkMode
                          ? "border-slate-700/70 bg-slate-950/90 text-slate-300"
                          : "border-orange-500/15 bg-white text-slate-700"
                      }`}
                    >
                      {item.a}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
                      <span className="h-px w-4 bg-orange-400/70" />
                      <span className={darkMode ? "text-orange-200" : "text-orange-700"}>
                        FRONTSIDE
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Contact({ t, neon, motionConfig, darkMode }) {
  const handleText = t("telegramPlaceholder");
  const handle = handleText.replace("@", "") || "yourtelegram";

  return (
    <section id="contact" className="scroll-mt-24">
      <motion.h2
        className="text-center text-xl font-semibold sm:text-2xl"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        {t("contactTitle")}
      </motion.h2>

      <motion.p
        className={`mt-1 text-center text-xs sm:text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration, delay: 0.05 }}
      >
        {t("contactSubtitle")}
      </motion.p>

      <motion.div
        className="mt-5 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: motionConfig.baseDuration }}
      >
        <a
          href={`https://t.me/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${
            neon.primaryButtonGradient
          } px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg transition hover:scale-[1.03] ${
            darkMode ? "shadow-orange-500/40" : "shadow-orange-500/55"
          }`}
        >
          <FaTelegramPlane className="text-lg" />
          <span>{handleText}</span>
        </a>
      </motion.div>
    </section>
  );
}

function Footer({ t, neon, darkMode }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={`mt-10 flex flex-col items-center gap-1 border-t pt-4 text-[11px] sm:flex-row sm:justify-between ${
        darkMode ? "border-slate-800/70 text-slate-500" : "border-orange-500/15 text-slate-600"
      }`}
    >
      <span>
        © {year} FrontSide. {t("footerRights")}
      </span>
      <span>
        <span
          className={`bg-gradient-to-r ${neon.heroGradient} bg-clip-text font-semibold text-transparent`}
        >
          {t("footerBuiltBy")}
        </span>
      </span>
    </footer>
  );
}

export default App;
