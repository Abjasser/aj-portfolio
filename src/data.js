export const projects = [
  {
    id: 'bayan',
    number: '001',
    name: 'BAYAN',
    nameAr: 'بيان',
    type: 'NLP Research System',
    stack: ['Python', 'FastAPI', 'GPT-4o', 'Claude', 'Gemini', 'Railway', 'Netlify'],
    tagline: 'Three models. One truth. No translator judges its own translation.',
    detail:
      "Arabic media bias detection using a Cross-LLM Blind Consensus Pipeline. Three LLMs translate independently, then classify each other's output — never their own. 1,468 high-confidence Arabic sentences. Chrome Extension + Web Application — live at bayanv1.netlify.app.",
    url: 'https://bayanv1.netlify.app/en',
  },
  {
    id: 'alwordle',
    number: '002',
    name: 'ALWORDLE',
    nameAr: 'الوردل',
    type: 'Full-Stack Multiplayer Game',
    stack: ['JavaScript', 'Nitro WebSockets', 'Supabase', 'Railway'],
    tagline: 'Arabic. Real-time. Nobody plays alone.',
    detail:
      'Arabic Wordle with full RTL localization and live multiplayer mode — players compete simultaneously on the same hidden word, with live game-state sync and color-coded letter feedback.',
    url: 'https://alwordle.com',
  },
  {
    id: 'poets-profiler',
    number: '003',
    name: 'POETS PROFILER',
    nameAr: null,
    type: 'Arabic NLP + Data Visualization',
    stack: ['Python', 'CAMeL Tools', 'Gemini API', 'Web Scraping'],
    tagline: '271 poems. One voice, dissected.',
    detail:
      'Automated profiling system for Abu Firas al-Hamdani. Scraping 271 poems, Arabic NLP analysis, sentiment and metaphor extraction, published Arabic infographics and LinkedIn analysis.',
    url: null,
  },
  {
    id: 'fatwak',
    number: '004',
    name: 'FATWAK',
    nameAr: null,
    type: 'Islamic Knowledge Interface',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'CSV · 2,000+ entries'],
    tagline: '2,000 rulings. One random door.',
    detail:
      "Web interface displaying random Islamic rulings scraped from Ibn Baz's official site. Minimal, distraction-free.",
    url: 'https://fatwak.com',
  },
  {
    id: 'phishing-demonstrator',
    number: '005',
    name: 'PHISHING DEMONSTRATOR',
    nameAr: null,
    type: 'Cybersecurity Awareness',
    stack: ['Python', 'Web Scraping', 'Social Engineering Concepts'],
    tagline: "Your public data is someone else's weapon.",
    detail:
      'Demonstrated how publicly available data can be harvested and weaponized for targeted phishing attacks. Selected as a distinguished project at the Information Systems Student Exhibition.',
    url: null,
  },
]

export const achievements = [
  {
    symbol: '①',
    title: 'GRADUATE READINESS MEDAL',
    description:
      'Awarded by the Education and Training Evaluation Commission of Saudi Arabia (هيئة تقويم التعليم والتدريب) for exceptional performance in the graduate readiness assessment for university graduates. A national recognition, not a certificate.',
    hasImage: true,
    imageAlt: 'Graduate Readiness Medal — وسام الجاهزية',
    labelAr: 'وسام الجاهزية',
  },
  {
    symbol: '②',
    title: 'ABET ACCREDITATION — INFORMATION SYSTEMS',
    description:
      'Participated in interviews with the ABET accreditation committee during their official university visit to Imam Muhammad ibn Saud Islamic University. The Information Systems program was successfully accredited. Student representative in the evaluation process.',
    hasImage: false,
    imageAlt: null,
    labelAr: null,
  },
  {
    symbol: '③',
    title: 'DISTINGUISHED EXHIBITION PROJECT',
    description:
      'Cybersecurity awareness project selected as a distinguished project at the Information Systems Student Exhibition.',
    hasImage: false,
    imageAlt: null,
    labelAr: null,
  },
  {
    symbol: '④',
    title: 'CYBERSECURITY FOUNDATION CERTIFICATION',
    description: 'CSFPC™ — Credential ID: 62197937',
    hasImage: false,
    imageAlt: null,
    labelAr: null,
  },
]

export const identity = {
  name: 'Abdullah K. Aljasser',
  initials: 'AJ',
  role: 'Systems · Products · Experiments · Riyadh',
  email: 'Abjasser1@gmail.com',
  github: 'github.com/abjasser',
  linkedin: 'linkedin.com/in/abjasser',
}

export const about = {
  statement:
    "I build software that solves real problems — games people play, tools teams rely on, systems that make decisions at scale. My work crosses disciplines: AI research, full-stack products, automation, and interfaces that don't feel like software.",
  domains: [
    'AI & NLP Systems',
    'Full-Stack Products',
    'Agentic Pipelines',
    'Game Development',
    'Prompt Engineering',
  ],
  education: {
    degree: 'B.Sc. Information Systems',
    school: 'Imam Muhammad ibn Saud Islamic University',
    years: '2021 – 2026',
  },
  makersMark:
    'This portfolio was designed and built in a single prompt. Not a template. Not a tutorial. One precise instruction to a frontier AI model — and this is what came out. That is what prompt engineering looks like at its ceiling.',
}
