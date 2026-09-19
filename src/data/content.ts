import {
  Bot,
  Compass,
  Globe,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

/**
 * Every string the page renders lives here, so the copy can be edited without
 * touching layout — and so the FAQ accordion and its FAQPage JSON-LD are
 * generated from one source and cannot drift apart.
 */

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'AI & Automation', href: '#ai-services' },
  { label: 'Why Koret', href: '#why-koret' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'FAQ', href: '#faq' },
] as const

export type ServiceCard = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  /** The one card carrying the hard-offset shadow. Exactly one is true. */
  highlight?: boolean
}

export const AI_SERVICES: ServiceCard[] = [
  {
    id: 'automation',
    title: 'Automation',
    description:
      'We map one process end to end, then replace the repetitive parts. Intake, onboarding, reporting, order handling. The steps that need judgement stay with your team.',
    icon: Zap,
  },
  {
    id: 'web',
    title: 'Website & Web App Development',
    description:
      'Marketing sites that load fast, rank and convert — plus the internal tools, client portals and dashboards behind them. AI goes in where it earns its place.',
    icon: Globe,
  },
  {
    id: 'workflow',
    title: 'Workflow Systems',
    description:
      'Before anything gets built we redraw how the work flows. Most automation projects fail because a broken process was automated faithfully.',
    icon: Workflow,
  },
  {
    id: 'agentic',
    title: 'Agentic AI Builds',
    description:
      'Custom agents with real tool access, an evaluation set that proves they work, and approval gates where the cost of being wrong is high.',
    icon: Bot,
    highlight: true,
  },
  {
    id: 'consultation',
    title: 'AI Consultation',
    description:
      'A readiness review that names which processes are worth automating, which are not, what it will cost, and what your team needs to be able to run it.',
    icon: Compass,
  },
]

export const TRACKS = [
  {
    id: 'brand',
    eyebrow: 'Track one',
    title: 'Brand & Marketing',
    isNew: false,
    description:
      'The work that makes people care before they ever see a price. Positioning first, so every campaign stops re-explaining the company.',
    items: [
      'Brand strategy & positioning',
      'Identity systems & art direction',
      'Campaign concepting & production',
      'Content & social',
      'Paid media & performance',
    ],
  },
  {
    id: 'ai',
    eyebrow: 'Track two',
    title: 'AI & Automation',
    isNew: true,
    description:
      'The infrastructure that carries the demand marketing creates, so growth stops costing you headcount.',
    items: [
      'Business process automation',
      'Website & web app development',
      'Workflow design & systems',
      'Agentic AI builds',
      'AI readiness consultation',
    ],
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We map what you actually do — the positioning, the pipeline, and the processes underneath both. No deck, no discovery theatre.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'The brand story and the system architecture get drawn together, so neither one gets retrofitted to the other later.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Campaigns, sites, agents and workflows ship in the same sprint cadence, reviewed against the same success measures.',
  },
  {
    number: '04',
    title: 'Scale',
    description:
      'We hand over what ran, what it cost and what it returned — then tune it. You own the system, not a dependency on us.',
  },
] as const

/**
 * Placeholder metrics. Do not publish these as-is.
 * TODO (Samuel): replace each [X] with a verified figure from a real engagement,
 * or delete the row. Invented numbers here are a legal and trust problem.
 */
export const RESULTS = [
  { value: '[X]%', label: 'Average reduction in manual processing time' },
  { value: '[X]x', label: 'Return on ad spend across managed campaigns' },
  { value: '[X]+', label: 'Workflows and agents shipped to production' },
] as const

/**
 * TODO (Samuel): every answer below is a promise about how Koret operates.
 * Read all five and correct anything that is not how you actually work — the
 * FAQPage structured data is generated from this same array, so a fix here
 * fixes both the page and the schema.
 */
export const FAQS = [
  {
    question: 'What does an AI automation agency actually do?',
    answer:
      'We find the parts of your business that run on repetition — data moving between systems, intake, triage, reporting — and rebuild them as software that runs itself. That covers process automation, custom AI agents, workflow design and the web apps that sit around them. The steps that genuinely need human judgement stay with your team.',
  },
  {
    question: 'Do I have to choose between the marketing work and the AI work?',
    answer:
      'No. Most clients start with one and grow into the other. Because both disciplines sit in one team, the brand work and the systems work share the same context — there is no agency-to-developer handoff where the strategy gets lost.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A workflow automation or a marketing site is usually measured in weeks. A custom agentic build or a full rebrand is measured in months, because both need an evaluation stage before they are trusted with anything that matters. We scope the first milestone precisely and the rest honestly.',
  },
  {
    question: 'What happens if an AI agent gets something wrong?',
    answer:
      'Every agent we ship is scored for confidence on each run, and anything below the threshold stops and waits for a person instead of guessing. You set the threshold, every decision is logged, and you get a view of what ran, what it cost and every case it escalated.',
  },
  {
    question: 'We are not sure what to automate yet. Can you help with that?',
    answer:
      'That is what the consultation is for. It is a readiness review that names which processes are worth automating, which are not, what each would cost, and what your team needs in place to run it afterwards. You can take that assessment and build it elsewhere — there is no obligation to continue with us.',
  },
] as const

export const FOOTER_COLUMNS = [
  {
    heading: 'AI & Automation',
    links: [
      { label: 'Business process automation', href: '#ai-services' },
      { label: 'Agentic AI builds', href: '#ai-services' },
      { label: 'Workflow systems', href: '#ai-services' },
      { label: 'AI consultation', href: '#ai-services' },
    ],
  },
  {
    heading: 'Build & Market',
    links: [
      { label: 'Website development', href: '#services' },
      { label: 'Web app development', href: '#ai-services' },
      { label: 'Brand strategy', href: '#services' },
      { label: 'Paid media', href: '#services' },
    ],
  },
  {
    heading: 'Agency',
    links: [
      { label: 'Why Koret', href: '#why-koret' },
      { label: 'How we work', href: '#how-we-work' },
      { label: 'Frequently asked questions', href: '#faq' },
    ],
  },
] as const

/** TODO (Samuel): replace with the real inbox before launch. */
export const CONTACT_EMAIL = 'hello@koret.agency'
