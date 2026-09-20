import TweetCard from './ui/tweet-card';
import MotionSection from './MotionSection';

export default function Testimonials() {
  return (
    <MotionSection className="py-24 px-4 flex flex-col items-center gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl mb-2" style={{ color: 'var(--color-ink-charcoal)' }}>
          What People Are Saying
        </h2>
        <p style={{ color: 'var(--color-dock-slate)' }}>
          Real feedback goes here once we have it.
        </p>
      </div>
      <TweetCard
        author={{
          name: '[Client Name]',
          handle: '[handle]',
          avatarSrc: '',
          isVerified: false,
        }}
        content="[Add a real client quote or social post here]"
        timestamp="[date]"
        stats={{ replies: 0, retweets: 0, likes: 0, views: '—' }}
      />
    </MotionSection>
  );
}
