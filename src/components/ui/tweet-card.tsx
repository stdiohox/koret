'use client';

import * as React from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Heart, MessageCircle, Repeat2, Share, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TweetCardProps {
  author: {
    name: string;
    handle: string;
    avatarSrc: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    replies: number;
    retweets: number;
    likes: number;
    views: string | number;
  };
  className?: string;
}

const compact = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
      : `${n}`;

/** Neutral stand-in while there is no real avatar. Deliberately not a stock face. */
function AvatarFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: 'var(--color-dock-hairline)' }}
      aria-hidden="true"
    >
      <User className="h-6 w-6" style={{ color: 'var(--color-dock-steel)' }} />
    </div>
  );
}

export default function TweetCard({ author, content, timestamp, stats, className }: TweetCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [retweeted, setRetweeted] = React.useState(false);
  const [avatarFailed, setAvatarFailed] = React.useState(false);
  const reduceMotion = useReducedMotion();

  // Spotlight follows the cursor across the card surface.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(0, 204, 255, 0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const showFallback = !author.avatarSrc || avatarFailed;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative w-full max-w-[550px] overflow-hidden rounded-2xl p-5 transition-shadow duration-300',
        className
      )}
      style={{
        backgroundColor: 'var(--color-surface-ivory)',
        border: '1px solid var(--color-dock-hairline)',
      }}
    >
      {/* Spotlight layer — decorative, sits under the content */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative z-10">
        {/* Author */}
        <div className="flex items-start gap-3">
          <div
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(0,204,255,0.5)]"
          >
            {showFallback ? (
              <AvatarFallback />
            ) : (
              <img
                src={author.avatarSrc}
                alt={author.name}
                className="h-full w-full object-cover"
                onError={() => setAvatarFailed(true)}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="truncate font-semibold" style={{ color: 'var(--color-ink-charcoal)' }}>
                {author.name}
              </span>
              {author.isVerified && (
                <BadgeCheck
                  className="h-4 w-4 shrink-0 text-[var(--color-koret-cyan)]"
                  aria-label="Verified account"
                />
              )}
            </div>
            <span className="block truncate text-sm" style={{ color: 'var(--color-dock-slate)' }}>
              @{author.handle}
            </span>
          </div>

          <button
            type="button"
            aria-label="Share"
            className="rounded-full p-2 transition-colors hover:bg-[rgba(0,204,255,0.1)]"
          >
            <Share className="h-4 w-4" style={{ color: 'var(--color-dock-slate)' }} />
          </button>
        </div>

        {/* Content */}
        <p
          className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed"
          style={{ color: 'var(--color-ink-charcoal)' }}
        >
          {content}
        </p>

        {/* Timestamp */}
        <p className="mt-3 text-sm" style={{ color: 'var(--color-dock-slate)' }}>
          {timestamp}
        </p>

        {/* Action bar */}
        <div
          className="mt-4 flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--color-dock-hairline)' }}
        >
          <button
            type="button"
            aria-label={`Reply, ${stats.replies}`}
            className="flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-[rgba(0,204,255,0.1)]"
            style={{ color: 'var(--color-dock-slate)' }}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{compact(stats.replies)}</span>
          </button>

          {/* Green / pink are X's own interaction conventions, kept deliberately. */}
          <button
            type="button"
            aria-pressed={retweeted}
            aria-label={`Repost, ${stats.retweets + (retweeted ? 1 : 0)}`}
            onClick={() => setRetweeted((v) => !v)}
            className={cn(
              'flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-green-500/10',
              retweeted ? 'text-green-600' : ''
            )}
            style={retweeted ? undefined : { color: 'var(--color-dock-slate)' }}
          >
            <Repeat2 className="h-4 w-4" />
            <span>{compact(stats.retweets + (retweeted ? 1 : 0))}</span>
          </button>

          <button
            type="button"
            aria-pressed={liked}
            aria-label={`Like, ${stats.likes + (liked ? 1 : 0)}`}
            onClick={() => setLiked((v) => !v)}
            className={cn(
              'flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors hover:bg-pink-500/10',
              liked ? 'text-pink-600' : ''
            )}
            style={liked ? undefined : { color: 'var(--color-dock-slate)' }}
          >
            <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
            <span>{compact(stats.likes + (liked ? 1 : 0))}</span>
          </button>

          <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-dock-slate)' }}>
            <span className="sr-only">Views</span>
            <span aria-hidden="true">{typeof stats.views === 'number' ? compact(stats.views) : stats.views}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
