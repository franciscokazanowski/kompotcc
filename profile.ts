import type { User } from '@supabase/supabase-js';

export function getProfile(user: User | null) {
  const metadata = user?.user_metadata;
  const fullName = [metadata?.full_name, metadata?.name]
    .find((value): value is string => typeof value === 'string' && value.trim().length > 0)
    ?.trim() || '';
  const candidates = [metadata?.avatar_url, metadata?.picture,
    ...(user?.identities || []).flatMap(identity => [identity.identity_data?.avatar_url, identity.identity_data?.picture])];
  let avatarUrl = '';
  for (const candidate of candidates) {
    if (typeof candidate !== 'string') continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === 'https:' && !url.username && !url.password && !url.port &&
        (url.hostname === 'googleusercontent.com' || url.hostname.endsWith('.googleusercontent.com'))) {
        avatarUrl = url.href;
        break;
      }
    } catch { /* A conta continua utilizável sem foto. */ }
  }
  return {
    fullName,
    firstName: fullName.split(/\s+/)[0] || 'Você',
    initials: fullName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'K',
    avatarUrl,
  };
}
