import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import './InscriptionForm.css';

interface InscriptionFormProps {
  table: 'courses' | 'events';
  itemId: string;
  itemTitle: string;
}

export const InscriptionForm: React.FC<InscriptionFormProps> = ({ table, itemId, itemTitle }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from('inscriptions').insert({
      item_table: table,
      item_id: itemId,
      item_title: itemTitle,
      first_name: firstName,
      last_name: lastName,
      email,
      message: message || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError('No pudimos enviar tu inscripción. Probá de nuevo en un momento.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="inscription-success">
        <p>¡Listo, {firstName}! Recibimos tu inscripción a "{itemTitle}". Te vamos a contactar a {email}.</p>
      </div>
    );
  }

  return (
    <form className="inscription-form" onSubmit={handleSubmit}>
      <h3 className="inscription-form-title">Inscribirse</h3>

      <div className="inscription-form-row">
        <div>
          <label className="inscription-label" htmlFor="insc-first-name">Nombre</label>
          <input
            id="insc-first-name"
            className="inscription-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="inscription-label" htmlFor="insc-last-name">Apellido</label>
          <input
            id="insc-last-name"
            className="inscription-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="inscription-label" htmlFor="insc-email">Email</label>
        <input
          id="insc-email"
          type="email"
          className="inscription-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="inscription-label" htmlFor="insc-motivo">Motivo</label>
        <input id="insc-motivo" className="inscription-input" value={itemTitle} readOnly disabled />
      </div>

      <div>
        <label className="inscription-label" htmlFor="insc-message">Mensaje (opcional)</label>
        <textarea
          id="insc-message"
          className="inscription-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {error && <p className="inscription-error">{error}</p>}

      <button type="submit" className="inscription-submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar inscripción'}
      </button>
    </form>
  );
};
