import TweetCard from './ui/tweet-card';
import MotionSection from './MotionSection';
import ScrollReveal from './ScrollReveal';
import { useParallax } from '@/hooks/useParallax';

const posts = [
  {
    content: "If your AI agent doesn't sound like your brand, it's not finished yet.",
    timestamp: '3d',
    tags: ['AI', 'branding'],
    stats: { replies: 4, retweets: 6, likes: 28, views: '340' },
  },
  {
    content: 'Manual data entry is not a personality trait.',
    timestamp: '1d',
    tags: ['automation'],
    stats: { replies: 7, retweets: 11, likes: 43, views: '512' },
  },
  {
    content: "We don't do \"set it and forget it.\" We do \"set it and it just works.\"",
    timestamp: 'Today',
    tags: ['automation', 'AI'],
    stats: { replies: 3, retweets: 5, likes: 19, views: '210' },
  },
];

export default function Testimonials() {
  const driftRef = useParallax<HTMLDivElement>(0.08);

  return (
    <MotionSection className="py-24 px-4 flex flex-col items-center gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
          From Our Timeline
        </h2>
      </div>
      {/* max-w-6xl matches the other sections' container. Without it the grid is full-bleed,
          columns outgrow the card's max-width past ~1440px, and each column shows a gap. */}
      <div ref={driftRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl items-start">
        {posts.map((post) => (
          <ScrollReveal key={post.content}>
          <TweetCard
            author={{ name: 'Koret', handle: 'koret', avatarSrc: '/logo/koret-logo-mark.png', isVerified: false }}
            content={post.content}
            timestamp={post.timestamp}
            tags={post.tags}
            stats={post.stats}
          />
          </ScrollReveal>
        ))}
      </div>
    </MotionSection>
  );
}
