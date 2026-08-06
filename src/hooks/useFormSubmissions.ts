import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CONTACT_REASON_LABELS, type FormSubmission } from '../types/formSubmission';

interface InscriptionRow {
  id: string;
  item_table: 'courses' | 'events';
  item_title: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string | null;
  created_at: string;
}

interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  reason: string;
  message: string;
  created_at: string;
}

const ITEM_TABLE_LABELS: Record<'courses' | 'events', string> = {
  courses: 'Curso',
  events: 'Evento',
};

function inscriptionToSubmission(row: InscriptionRow): FormSubmission {
  return {
    id: row.id,
    source: 'inscription',
    formLabel: `${ITEM_TABLE_LABELS[row.item_table]}: ${row.item_title}`,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
    detailLabel: ITEM_TABLE_LABELS[row.item_table],
    detailValue: row.item_title,
  };
}

function contactToSubmission(row: ContactRow): FormSubmission {
  return {
    id: row.id,
    source: 'contact',
    formLabel: 'Contacto',
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
    detailLabel: 'Motivo',
    detailValue: CONTACT_REASON_LABELS[row.reason] ?? row.reason,
  };
}

export function useFormSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const [inscriptionsRes, contactRes] = await Promise.all([
      supabase
        .from('inscriptions')
        .select('id, item_table, item_title, first_name, last_name, email, message, created_at'),
      supabase
        .from('contact_submissions')
        .select('id, first_name, last_name, email, reason, message, created_at'),
    ]);

    if (inscriptionsRes.error) {
      setError(inscriptionsRes.error.message);
      setLoading(false);
      return;
    }
    if (contactRes.error) {
      setError(contactRes.error.message);
      setLoading(false);
      return;
    }

    const merged = [
      ...(inscriptionsRes.data as InscriptionRow[]).map(inscriptionToSubmission),
      ...(contactRes.data as ContactRow[]).map(contactToSubmission),
    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    setError(null);
    setSubmissions(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch resolves asynchronously, setState happens after the network calls
    refetch();
  }, [refetch]);

  return { submissions, loading, error, refetch };
}
