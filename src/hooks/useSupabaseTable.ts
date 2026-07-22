import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { deleteContentImage } from '../lib/contentImages';
import type { ContentItem, TableName } from '../types/content';

interface ContentRow {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string | null;
}

function formatDateEs(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

function rowToItem(row: ContentRow): ContentItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dateTime: formatDateEs(row.event_date),
    eventDate: row.event_date,
    imageUrl: row.image_url,
  };
}

export interface ContentItemInput {
  title: string;
  description: string;
  eventDate: string;
  imageUrl: string | null;
}

export function useSupabaseTable(table: TableName) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from(table)
      .select('id, title, description, event_date, image_url')
      .order('event_date', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setItems((data as ContentRow[]).map(rowToItem));
    }
    setLoading(false);
  }, [table]);

  useEffect(() => {
    // Standard fetch-on-mount: refetch resolves asynchronously (network call to
    // Supabase), so the resulting setState calls happen in a later microtask,
    // not synchronously during this effect's execution.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refetch();
  }, [refetch]);

  const create = useCallback(async (input: ContentItemInput) => {
    const { error: insertError } = await supabase.from(table).insert({
      title: input.title,
      description: input.description,
      event_date: input.eventDate,
      image_url: input.imageUrl,
    });
    if (insertError) throw insertError;
    await refetch();
  }, [table, refetch]);

  const update = useCallback(async (id: string, input: ContentItemInput) => {
    const { error: updateError } = await supabase
      .from(table)
      .update({
        title: input.title,
        description: input.description,
        event_date: input.eventDate,
        image_url: input.imageUrl,
      })
      .eq('id', id);
    if (updateError) throw updateError;
    await refetch();
  }, [table, refetch]);

  const remove = useCallback(async (id: string, imageUrl?: string | null) => {
    const { error: deleteError } = await supabase.from(table).delete().eq('id', id);
    if (deleteError) throw deleteError;
    if (imageUrl) {
      await deleteContentImage(imageUrl);
    }
    await refetch();
  }, [table, refetch]);

  return { items, loading, error, refetch, create, update, remove };
}
