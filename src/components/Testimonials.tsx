import TweetCard from './ui/tweet-card';
import MotionSection from './MotionSection';

export default function Testimonials() {
  return (
    <MotionSection className="py-24 px-4 flex flex-col items-center gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl" style={{ color: 'var(--color-ink-charcoal)' }}>
          A Word From Us
        </h2>
      </div>
      <TweetCard
        author={{
          name: 'Koret',
          handle: 'koret',
          avatarSrc: '/logo/koret-logo-mark.png',
          isVerified: false,
        }}
        content="If your AI agent doesn't sound like your brand, it's not finished yet."
        timestamp="Today"
        stats={{ replies: 0, retweets: 0, likes: 0, views: '' }}
      />
    </MotionSection>
  );
}
