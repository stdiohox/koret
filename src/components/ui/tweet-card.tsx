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
  /** Rendered as #hashtags beneath the post body. */
  tags?: string[];
  /** Optional post image. */
  mediaUrl?: string;
  /** Alt text for `mediaUrl`. Defaults to empty — the post body carries the meaning, so an
   *  illustrative image is decorative unless a real description is supplied. */
  mediaAlt?: string;
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

/**
 * A count of 0 (or an empty string) renders as no number at all, rather than a literal "0".
 * Zeroed engagement is the honest state for a card that isn't mirroring a real post — and
 * showing "0 likes" reads as failure rather than as "not applicable".
 */
function ActionButton({
  icon: Icon,
  count,
  label,
  onClick,
  active = false,
  activeClass,
  hoverClass,
  fillWhenActive = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  count?: number | string;
  label: string;
  onClick?: () => void;
  active?: boolean;
  activeClass?: string;
  hoverClass: string;
  fillWhenActive?: boolean;
}) {
  const hasCount = count !== undefined && count !== null && count !== '' && count !== 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={onClick ? active : undefined}
      aria-label={hasCount ? `${label}, ${count}` : label}
      className={cn(
        'flex items-center gap-2 rounded-full px-2 py-1 text-sm transition-colors',
        hoverClass,
        active && activeClass
      )}
      style={active ? undefined : { color: 'var(--color-dock-slate)' }}
    >
      <Icon className={cn('h-4 w-4', active && fillWhenActive && 'fill-current')} />
      {hasCount && <span>{count}</span>}
    </button>
  );
}

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

export default function TweetCard({
  author,
  content,
  timestamp,
  tags,
  mediaUrl,
  mediaAlt,
  stats,
  className,
}: TweetCardProps) {
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
        'group card-lift relative w-full max-w-[550px] overflow-hidden rounded-2xl p-5',
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
        </div>

        {/* Content */}
        <p
          className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed"
          style={{ color: 'var(--color-ink-charcoal)' }}
        >
          {content}
        </p>

        {/* Hashtags — navy rather than the card's cyan accent: cyan on ivory is ~1.8:1,
            which is unreadable at this size. Navy reads as a link and clears contrast. */}
        {tags && tags.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-x-2 text-[15px]" style={{ color: 'var(--color-koret-navy)' }}>
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        )}

        {/* Post image */}
        {mediaUrl && (
          <div
            className="mt-3 overflow-hidden rounded-xl"
            style={{ border: '1px solid var(--color-dock-hairline)' }}
          >
            <img src={mediaUrl} alt={mediaAlt ?? ''} className="h-auto w-full object-cover" loading="lazy" />
          </div>
        )}

        {/* Timestamp */}
        <p className="mt-3 text-sm" style={{ color: 'var(--color-dock-slate)' }}>
          {timestamp}
        </p>

        {/* Action bar */}
        <div
          className="mt-4 flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--color-dock-hairline)' }}
        >
          <ActionButton
            icon={MessageCircle}
            label="Reply"
            count={stats.replies ? compact(stats.replies) : undefined}
            hoverClass="hover:bg-[rgba(0,204,255,0.1)]"
          />

          {/* Green / pink are X's own interaction conventions, kept deliberately. */}
          <ActionButton
            icon={Repeat2}
            label="Repost"
            onClick={() => setRetweeted((v) => !v)}
            active={retweeted}
            activeClass="text-green-600"
            hoverClass="hover:bg-green-500/10"
            count={stats.retweets + (retweeted ? 1 : 0) ? compact(stats.retweets + (retweeted ? 1 : 0)) : undefined}
          />

          <ActionButton
            icon={Heart}
            label="Like"
            onClick={() => setLiked((v) => !v)}
            active={liked}
            activeClass="text-pink-600"
            hoverClass="hover:bg-pink-500/10"
            fillWhenActive
            count={stats.likes + (liked ? 1 : 0) ? compact(stats.likes + (liked ? 1 : 0)) : undefined}
          />

          <ActionButton
            icon={Share}
            label="Share"
            count={typeof stats.views === 'number' ? (stats.views ? compact(stats.views) : undefined) : stats.views || undefined}
            hoverClass="hover:bg-[rgba(0,204,255,0.1)]"
          />
        </div>
      </div>
    </div>
  );
}
