import TweetCard from './ui/tweet-card';
import MotionSection from './MotionSection';

const posts = [
  {
    content: "If your AI agent doesn't sound like your brand, it's not finished yet.",
    timestamp: '3d',
  },
  {
    content: 'Manual data entry is not a personality trait.',
    timestamp: '1d',
  },
  {
    content: "We don't do \"set it and forget it.\" We do \"set it and it just works.\"",
    timestamp: 'Today',
  },
];

export default function Testimonials() {
  return (
    <MotionSection className="py-24 px-4 flex flex-col items-center gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
          From Our Timeline
        </h2>
      </div>
      <div className="flex flex-col gap-6 w-full items-center">
        {posts.map((post) => (
          <TweetCard
            key={post.content}
            author={{
              name: 'Koret',
              handle: 'koret',
              avatarSrc: '/logo/koret-logo-mark.png',
              isVerified: false,
            }}
            content={post.content}
            timestamp={post.timestamp}
            stats={{ replies: 0, retweets: 0, likes: 0, views: '' }}
          />
        ))}
      </div>
    </MotionSection>
  );
}
