// Koret assistant knowledge base. Every answer uses only facts stated on the site; anything
// the site doesn't cover is handed to the team rather than guessed. To change what the bot
// says, edit the `answer` text here. `keys` are word stems (matched after light stemming and
// synonym folding); `phrases` are exact multi-word matches worth extra weight.

export type Topic = {
  id: string;
  keys: string[];
  phrases?: string[];
  answer: string;
  follow?: string[]; // suggested next questions (chips)
};

const DEMOS =
  'Real estate: https://koret-estate-demo.vercel.app/\nSchool: https://koretschool.vercel.app/\nBakery: https://koretbakes-demo.vercel.app/';

export const TOPICS: Topic[] = [
  {
    id: 'hello',
    keys: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'greet'],
    answer: 'Hi! Ask me anything about Koret: what we build, how pricing works, or how the free Lead Leak Check works.',
    follow: ['What does Koret do?', 'How much does it cost?', 'Get my free audit'],
  },
  {
    id: 'overview',
    keys: ['koret', 'do', 'offer', 'service', 'help', 'about', 'company', 'agency', 'business', 'what'],
    phrases: ['what do you do', 'what does koret do', 'who are you', 'what is koret', 'how can you help', 'what do you offer', 'your services'],
    answer:
      'Koret is one team for three things: AI assistants and automation that answer, qualify, book and follow up every enquiry; consulting on what to automate first; and the brand and website your customers land on. Every project is fixed-price, and no tech skills are needed on your side.',
    follow: ['Tell me about the AI assistants', 'How much does it cost?', 'How does it work?'],
  },
  {
    id: 'assistant',
    keys: ['ai', 'assistant', 'chatbot', 'bot', 'whatsapp', 'instagram', 'dm', 'chat', 'reply', 'respond', 'answer', 'enquiry', 'message'],
    phrases: ['ai assistant', 'whatsapp bot', 'chat bot', 'reply to customers', 'answer enquiries', 'instagram dms'],
    answer:
      'The AI assistant replies on the channel your customer used (WhatsApp, Instagram, your website or the phone) within seconds, any hour. It asks the questions your team would ask, books the appointment into your calendar, follows up with people who go quiet, and sends your team a morning summary. You approve it before it goes live.',
    follow: ['Can it answer phone calls?', 'Does it work with my tools?', 'Will it sound robotic?'],
  },
  {
    id: 'voice',
    keys: ['phone', 'call', 'voice', 'ring', 'missed', 'receptionist'],
    phrases: ['answer the phone', 'missed calls', 'voice agent', 'phone calls'],
    answer:
      'Yes. Koret builds AI voice agents that answer the phone, so every caller gets an answer even when your team is busy. One is already live for a real estate company. It can book the appointment while it has them on the line.',
    follow: ['See your work', 'How much does it cost?', 'Get my free audit'],
  },
  {
    id: 'automation',
    keys: ['automat', 'automation', 'workflow', 'reminder', 'followup', 'follow', 'admin', 'crm', 'list', 'spreadsheet', 'manual', 'repetitive'],
    phrases: ['follow up', 'customer list', 'no shows', 'save time', 'data entry'],
    answer:
      'Automation takes the repetitive work off your team: every enquiry lands in one customer list, reminders go out on time so people turn up, follow-ups are sent automatically, and you still see everything that happens.',
    follow: ['What does consulting include?', 'Does it work with my tools?', 'How does it work?'],
  },
  {
    id: 'consulting',
    keys: ['consult', 'consulting', 'advice', 'plan', 'strategy', 'audit', 'review', 'roadmap', 'start', 'unsure'],
    phrases: ['where to start', 'not sure what i need', '90 day plan', 'what should i automate'],
    answer:
      "Consulting starts with a review of your tools and processes. You get a costed 90-day plan for what to fix first, second and third, what each step costs and what it saves, and monthly check-ins after. It's the right place to start if you're not sure what you need.",
    follow: ['How much does it cost?', 'Get my free audit', 'How does it work?'],
  },
  {
    id: 'brand',
    keys: ['brand', 'branding', 'logo', 'identity', 'design', 'website', 'site', 'web', 'content', 'social', 'post', 'rebrand', 'redesign'],
    phrases: ['new website', 'build a website', 'visual identity', 'social media content'],
    answer:
      'Brand and website covers positioning, name and voice; logo and visual identity; fast websites built to get enquiries, with booking and enquiry forms wired in; and regular content, checked by our team. It is designed together with the assistant so everything looks like one trustworthy business.',
    follow: ['How much does it cost?', 'See your work', 'Get my free audit'],
  },
  {
    id: 'price',
    keys: ['price', 'cost', 'pricing', 'fee', 'charge', 'pay', 'expensive', 'cheap', 'budget', 'afford', 'quote', 'rate', 'much', 'money', 'retainer', 'monthly'],
    phrases: ['how much', 'what does it cost', 'how much does it cost', 'price list', 'monthly fee'],
    answer:
      "Every project is fixed-fee: after a free 30-minute call you get the price in writing before any work starts, so there are no surprise bills. Ongoing support is a simple monthly retainer. We don't publish prices because each one depends on what you need.",
    follow: ['Get a quote', 'How does it work?', 'What does the free call cover?'],
  },
  {
    id: 'process',
    keys: ['process', 'work', 'step', 'happen', 'next', 'onboard', 'begin', 'procedure'],
    phrases: ['how does it work', 'how do you work', 'what happens next', 'what are the steps'],
    answer:
      '1. Talk: a free 30-minute call about what is slowing you down.\n2. Plan: a clear plan and a fixed price, in writing, before work starts.\n3. Build: we set everything up and you approve it before anything goes live.\n4. Grow: we watch the results and keep improving on a simple monthly retainer.',
    follow: ['How much does it cost?', 'How long does it take?', 'Get my free audit'],
  },
  {
    id: 'timeline',
    keys: ['long', 'time', 'timeline', 'week', 'weeks', 'fast', 'quick', 'soon', 'deadline', 'launch', 'live', 'ready'],
    phrases: ['how long', 'how soon', 'how quickly', 'when can', 'turnaround'],
    answer:
      "It depends on what you need, so we don't quote a timeline until we've talked. You get the plan, the timing and the fixed price in writing after the free call, before any work starts.",
    follow: ['Get my free audit', 'How does it work?'],
  },
  {
    id: 'leakcheck',
    keys: ['leak', 'check', 'audit', 'free', 'test', 'losing', 'lose', 'lost'],
    phrases: ['lead leak check', 'free audit', 'free check', 'how many enquiries', 'losing leads'],
    answer:
      "The free Lead Leak Check shows where enquiries slip through. We send an enquiry in the evening and time the first reply, message you on WhatsApp, Instagram and your website form, call at a busy time, and see whether anyone follows up. Then we show you what we'd fix first. It's free, with no obligation, and we reply within one business day.",
    follow: ['Get my free audit', 'What happens after?'],
  },
  {
    id: 'call',
    keys: ['call', 'meet', 'meeting', 'talk', 'speak', 'chat', 'book', 'appointment', 'demo', 'consultation', 'discuss'],
    phrases: ['free call', 'book a call', 'talk to someone', 'speak to someone', 'set up a meeting', 'free consultation'],
    answer:
      "The first step is a free 30-minute call: tell us what's slowing you down and we'll tell you honestly whether we can help and what to fix first. You leave with a clear next step, whether or not we work together. I can pass your details to the team now.",
    follow: ['Yes, contact me', 'How much does it cost?'],
  },
  {
    id: 'technical',
    keys: ['technical', 'tech', 'code', 'coding', 'skill', 'skills', 'complicated', 'difficult', 'hard', 'manage', 'maintain', 'learn'],
    phrases: ['do i need to be technical', 'no tech skills', 'is it complicated', 'do i need a developer'],
    answer:
      'Not at all. You tell us the result you want; we handle the build and explain everything in plain English.',
    follow: ['How does it work?', 'Does it work with my tools?'],
  },
  {
    id: 'tools',
    keys: ['tool', 'tools', 'integrat', 'integration', 'connect', 'hubspot', 'notion', 'airtable', 'sheets', 'google', 'calendar', 'email', 'existing', 'software', 'system', 'platform'],
    phrases: ['work with my tools', 'tools i already use', 'google sheets', 'google calendar', 'my crm'],
    answer:
      "Almost always. We connect to what you already have (your email, calendar, WhatsApp, forms, spreadsheets and CRM) instead of making you start over. Tools we work with include WhatsApp, Instagram, Google Sheets, your calendar, HubSpot, Notion and Airtable.",
    follow: ['Tell me about the AI assistants', 'Get my free audit'],
  },
  {
    id: 'industries',
    keys: ['industry', 'industries', 'sector', 'estate', 'property', 'realtor', 'school', 'education', 'clinic', 'dental', 'dentist', 'health', 'medical', 'store', 'shop', 'ecommerce', 'retail', 'law', 'lawyer', 'legal', 'gym', 'fitness', 'coach', 'salon', 'restaurant', 'finance', 'nonprofit', 'charity', 'type'],
    phrases: ['who is it for', 'do you work with', 'my industry', 'real estate', 'online store'],
    answer:
      'Koret is built for businesses where a missed enquiry is a missed sale: real estate (buyer enquiries answered, viewings booked), schools (admissions questions, tours), clinics and dental (fewer no-shows), online stores (instant replies on price and delivery), law and professional services (faster intake), and gyms and coaches (every trial lead followed up). We work with businesses in real estate, education, healthcare, retail and finance.',
    follow: ['See your work', 'Get my free audit'],
  },
  {
    id: 'work',
    keys: ['work', 'portfolio', 'example', 'examples', 'client', 'clients', 'case', 'proof', 'testimonial', 'review', 'reviews', 'past', 'previous', 'built', 'project', 'projects', 'result', 'results'],
    phrases: ['your work', 'see your work', 'case studies', 'who have you worked with', 'past projects'],
    answer:
      "Some of what we've built: an AI voice agent that answers the phone for a real estate company, a school website with a portal for teachers and parents, and a lead CRM for a finance education business. Clients aren't named on the site, but you can read what they say in the Work section and try our demos.",
    follow: ['Show me the demos', 'Get my free audit'],
  },
  {
    id: 'demos',
    keys: ['demo', 'demos', 'try', 'sample', 'preview', 'live'],
    phrases: ['show me the demos', 'try a demo', 'live demo'],
    answer: `Working demos you can click around (sample data only):\n${DEMOS}`,
    follow: ['Get my free audit', 'How much does it cost?'],
  },
  {
    id: 'after',
    keys: ['after', 'support', 'maintenance', 'maintain', 'update', 'fix', 'break', 'broken', 'ongoing', 'improve', 'help'],
    phrases: ['after launch', 'what happens after', 'ongoing support', 'if something breaks'],
    answer:
      "We don't disappear. We keep an eye on how everything is performing, fix anything that needs fixing, and suggest what to improve next, on a simple monthly retainer.",
    follow: ['How much does it cost?', 'Get my free audit'],
  },
  {
    id: 'robotic',
    keys: ['robotic', 'robot', 'human', 'natural', 'sound', 'personal', 'wrong', 'mistake', 'mistakes', 'accurate', 'trust', 'control', 'say'],
    phrases: ['will it sound robotic', 'what if it says something wrong', 'sounds like a robot'],
    answer:
      "The assistant asks the questions your own team would ask, and you approve it before anything goes live, so it says things the way your business would. The team can walk you through exactly how it handles your enquiries on the free call.",
    follow: ['How does it work?', 'Get my free audit'],
  },
  {
    id: 'response',
    keys: ['reply', 'respond', 'response', 'hear', 'back', 'contact', 'wait'],
    phrases: ['how fast do you reply', 'when will you reply', 'how soon will i hear'],
    answer: 'The team replies within one business day, on WhatsApp if you give a number, or by email.',
    follow: ['Get my free audit'],
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'reach', 'address', 'number', 'whatsapp', 'phone', 'instagram', 'linkedin', 'social'],
    phrases: ['contact you', 'your email', 'how do i reach you', 'get in touch'],
    answer:
      'You can email koretconsult@outlook.com, use the Free Lead Leak Check form on this page, or give me your details here and the team will reply within one business day. Koret is also on Instagram (https://www.instagram.com/koretconsult) and LinkedIn (https://www.linkedin.com/company/koret-consulting/).',
    follow: ['Yes, contact me'],
  },
  {
    id: 'location',
    keys: ['where', 'location', 'located', 'based', 'country', 'city', 'office', 'local', 'remote', 'abroad', 'international'],
    phrases: ['where are you based', 'where are you located', 'do you work remotely', 'my country'],
    answer:
      "Koret works with businesses wherever they are. Tell the team where you're based and they'll confirm how it would work for your business.",
    follow: ['Get my free audit', 'How does it work?'],
  },
  {
    id: 'small',
    keys: ['small', 'startup', 'solo', 'freelancer', 'tiny', 'new', 'just'],
    phrases: ['small business', 'just starting', 'one person business', 'too small'],
    answer:
      "Koret is built for small and growing businesses. Because every project is fixed-fee and quoted in writing first, you know exactly what you're paying before anything starts. If you're not sure what's worth doing, consulting gives you a costed plan before you build anything.",
    follow: ['What does consulting include?', 'Get my free audit'],
  },
  {
    id: 'guarantee',
    keys: ['guarantee', 'guaranteed', 'roi', 'return', 'promise', 'percent', 'increase', 'more', 'sales', 'leads', 'results'],
    phrases: ['do you guarantee', 'how many more leads', 'what results', 'return on investment'],
    answer:
      "We don't promise numbers before we've seen your business. The free Lead Leak Check shows where you're losing enquiries today, and consulting shows what each fix costs and what it saves, so you can judge the return before you spend anything.",
    follow: ['Get my free audit', 'What does consulting include?'],
  },
  {
    id: 'unknown-policy',
    keys: ['contract', 'refund', 'cancel', 'cancellation', 'terms', 'privacy', 'gdpr', 'data', 'own', 'ownership', 'secure', 'security', 'legal', 'nda', 'language', 'languages'],
    phrases: ['who owns the data', 'is my data safe', 'can i cancel', 'do you offer refunds', 'what languages'],
    answer:
      "That's a good question for the team, so you get an exact answer for your situation rather than a general one. Ask on the free call, or I can pass your question on now and they'll reply within one business day.",
    follow: ['Yes, contact me', 'How does it work?'],
  },
  {
    id: 'team',
    keys: ['team', 'who', 'people', 'founder', 'staff', 'behind', 'employees'],
    phrases: ['who is behind koret', 'who are the team', 'how big is your team'],
    answer:
      'Koret is one team that plans, builds and designs everything, so you get one plan, one price and one person to call, rather than juggling separate freelancers.',
    follow: ['What does Koret do?', 'Get my free audit'],
  },
  {
    id: 'thanks',
    keys: ['thanks', 'thank', 'cheers', 'great', 'awesome', 'perfect', 'nice', 'cool', 'ok', 'okay', 'bye', 'goodbye'],
    answer: "You're welcome! If you'd like the team to look at your business, I can pass your details on in a few seconds.",
    follow: ['Get my free audit', 'How much does it cost?'],
  },
];

// Wanting to be contacted always starts the details flow.
export const LEAD_KEYS = ['interested', 'quote', 'signup', 'started', 'hire', 'buy', 'purchase', 'proceed', 'contact', 'callback'];
export const LEAD_PHRASES = [
  'get my free audit', 'free audit', 'get a quote', 'contact me', 'yes contact me', 'call me', 'get started',
  'sign me up', 'book a call', 'book my', 'talk to someone', 'speak to someone',
  'reach out to me', 'get in touch with me', 'work with you', 'lets do it', "let's do it", 'start the check',
];

// Folded to one form before matching.
export const SYNONYMS: Record<string, string> = {
  pricing: 'price', prices: 'price', costs: 'cost', fees: 'fee', charges: 'charge', quotation: 'quote',
  chatbots: 'chatbot', bots: 'bot', assistants: 'assistant', automations: 'automation', automate: 'automat', automating: 'automat',
  websites: 'website', sites: 'site', logos: 'logo', calls: 'call', calling: 'call', phones: 'phone',
  integrations: 'integration', integrate: 'integrat', connects: 'connect', tools: 'tool',
  clinics: 'clinic', schools: 'school', stores: 'store', shops: 'shop', lawyers: 'lawyer', gyms: 'gym', coaches: 'coach',
  realestate: 'estate', properties: 'property', dentists: 'dentist',
  wa: 'whatsapp', insta: 'instagram', ig: 'instagram', dms: 'dm', msgs: 'message', messages: 'message',
  reminders: 'reminder', followups: 'followup', enquiries: 'enquiry', inquiries: 'enquiry', inquiry: 'enquiry', leads: 'lead',
  hello: 'hello', hiya: 'hi', yo: 'hey', thx: 'thanks', ty: 'thanks',
};

export const FALLBACK = {
  answer:
    "I'm not sure I understood that. I can tell you what Koret does, how pricing works, how the free Lead Leak Check works, or pass your question to the team (they reply within one business day). You can also email koretconsult@outlook.com.",
  follow: ['What does Koret do?', 'How much does it cost?', 'Get my free audit', 'Yes, contact me'],
};
