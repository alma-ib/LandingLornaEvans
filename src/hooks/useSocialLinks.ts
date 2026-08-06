import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SOCIAL_PLATFORMS, type SocialLinkRow, type SocialPlatform } from '../types/social';

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('social_links')
      .select('platform, url');

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setLinks(data as SocialLinkRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch resolves asynchronously, setState happens after the network call
    refetch();
  }, [refetch]);

  const save = useCallback(async (urls: Record<string, string>) => {
    const rows = SOCIAL_PLATFORMS.map((platform) => ({
      platform: platform.key,
      url: urls[platform.key]?.trim() ? urls[platform.key].trim() : null,
    }));
    const { error: upsertError } = await supabase
      .from('social_links')
      .upsert(rows, { onConflict: 'platform' });
    if (upsertError) throw upsertError;
    await refetch();
  }, [refetch]);

  return { links, loading, error, refetch, save };
}

export interface VisibleSocialLink extends SocialPlatform {
  url: string;
}

export function getVisibleSocialLinks(links: SocialLinkRow[]): VisibleSocialLink[] {
  return SOCIAL_PLATFORMS.flatMap((platform) => {
    const row = links.find((link) => link.platform === platform.key);
    if (!row || !row.url) return [];
    return [{ ...platform, url: row.url }];
  });
}
