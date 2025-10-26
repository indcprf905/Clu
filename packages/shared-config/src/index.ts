import { z } from 'zod';

export const CONSTANTS = {
  CATEGORIES: [
    { slug: 'voice-over', name: 'Voice-over', nameAr: 'التعليق الصوتي' },
    { slug: 'ad-shoot', name: 'Ad Shoot', nameAr: 'تصوير الإعلانات' },
    { slug: 'editing', name: 'Editing', nameAr: 'المونتاج' },
    { slug: 'ugc', name: 'UGC', nameAr: 'محتوى المستخدمين' },
    { slug: 'copywriting', name: 'Copywriting', nameAr: 'كتابة المحتوى' },
  ],
  DEFAULT_PLATFORM_FEE_PCT: 10,
  MIN_PAYOUT_AMOUNT: 100,
  DEFAULT_CURRENCY: 'SAR',
  MAX_SAMPLES_PER_LISTING: 10,
  MIN_SAMPLES_PER_LISTING: 1,
  CONTACT_FILTER_PATTERNS: [
    /05\d{8}/g,
    /\+966\s?5\d{8}/g,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    /@[a-zA-Z0-9_]{3,}/g,
  ],
} as const;

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string().min(8),
  JWT_REFRESH_SECRET: z.string().min(8),
  PORT: z.string().transform(Number).default('4000'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(env: Record<string, string | undefined>): EnvConfig {
  return envSchema.parse(env);
}
