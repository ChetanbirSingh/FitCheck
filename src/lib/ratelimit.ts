import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const dailyLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '24h'),
  prefix: 'daily_limit',
});

const spamLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, '10s'),
  prefix: 'spam_guard',
});

export async function checkRateLimit(ip: string) {
  const spam = await spamLimit.limit(ip);
  if (!spam.success) {
    return {
      limited: true,
      status: 429,
      message: 'Slow down. Please wait a few seconds before trying again.',
    };
  }

  const daily = await dailyLimit.limit(ip);
  if (!daily.success) {
    return {
      limited: true,
      status: 429,
      message: 'You have reached your daily limit. Please come back tomorrow.',
    };
  }

  return { limited: false };
}
