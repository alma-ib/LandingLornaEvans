import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { rowToItem, type ContentRow } from '../lib/contentMapping';
import type { ContentItem, TableName } from '../types/content';

export function useSupabaseItem(table: TableName, id: string | undefined) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- terminal edge case (no :id in the URL), not a network-driven update
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from(table)
        .select('id, title, description, event_date, image_url')
        .eq('id', id)
        .maybeSingle();

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
        setItem(null);
      } else {
        setError(null);
        setItem(data ? rowToItem(data as ContentRow) : null);
      }
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [table, id]);

  return { item, loading, error };
}
