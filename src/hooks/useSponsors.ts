import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { deleteContentImage } from '../lib/contentImages';
import type { Sponsor } from '../types/sponsor';

interface SponsorRow {
  id: string;
  name: string;
  image_url: string | null;
  url: string | null;
}

function rowToSponsor(row: SponsorRow): Sponsor {
  return { id: row.id, name: row.name, imageUrl: row.image_url, url: row.url };
}

export interface SponsorInput {
  name: string;
  imageUrl: string | null;
  url: string | null;
}

export function useSponsors() {
  const [items, setItems] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('sponsors')
      .select('id, name, image_url, url')
      .order('created_at', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setItems((data as SponsorRow[]).map(rowToSponsor));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch resolves asynchronously, setState happens after the network call
    refetch();
  }, [refetch]);

  const create = useCallback(async (input: SponsorInput) => {
    const { error: insertError } = await supabase.from('sponsors').insert({
      name: input.name,
      image_url: input.imageUrl,
      url: input.url,
    });
    if (insertError) throw insertError;
    await refetch();
  }, [refetch]);

  const update = useCallback(async (id: string, input: SponsorInput) => {
    const { error: updateError } = await supabase
      .from('sponsors')
      .update({ name: input.name, image_url: input.imageUrl, url: input.url })
      .eq('id', id);
    if (updateError) throw updateError;
    await refetch();
  }, [refetch]);

  const remove = useCallback(async (id: string, imageUrl?: string | null) => {
    const { error: deleteError } = await supabase.from('sponsors').delete().eq('id', id);
    if (deleteError) throw deleteError;
    if (imageUrl) {
      await deleteContentImage(imageUrl);
    }
    await refetch();
  }, [refetch]);

  return { items, loading, error, refetch, create, update, remove };
}
