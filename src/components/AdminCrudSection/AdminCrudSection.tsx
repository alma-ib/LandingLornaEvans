import React, { useState } from 'react';
import { useSupabaseTable } from '../../hooks/useSupabaseTable';
import { uploadContentImage, validateImageFile } from '../../lib/contentImages';
import type { ContentItem, TableName } from '../../types/content';
import '../../pages/admin/admin-shared.css';
import './AdminCrudSection.css';

interface AdminCrudSectionProps {
  table: TableName;
  label: string;
}

interface FormState {
  title: string;
  description: string;
  eventDate: string;
  imageFile: File | null;
}

const EMPTY_FORM: FormState = { title: '', description: '', eventDate: '', imageFile: null };

export const AdminCrudSection: React.FC<AdminCrudSectionProps> = ({ table, label }) => {
  const { items, loading, error, create, update, remove } = useSupabaseTable(table);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isFormOpen = isCreating || editingItem !== null;

  const openCreateForm = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setIsCreating(true);
  };

  const openEditForm = (item: ContentItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setForm({ title: item.title, description: item.description, eventDate: item.eventDate, imageFile: null });
    setFormError(null);
  };

  const closeForm = () => {
    setIsCreating(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (form.imageFile) {
      const validationError = validateImageFile(form.imageFile);
      if (validationError) {
        setFormError(validationError);
        return;
      }
    } else if (!editingItem) {
      setFormError('Seleccioná una imagen.');
      return;
    }

    setSaving(true);
    try {
      let imageUrl = editingItem?.imageUrl ?? null;
      if (form.imageFile) {
        imageUrl = await uploadContentImage(table, form.imageFile);
      }

      const input = {
        title: form.title,
        description: form.description,
        eventDate: form.eventDate,
        imageUrl,
      };

      if (editingItem) {
        await update(editingItem.id, input);
      } else {
        await create(input);
      }
      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Ocurrió un error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: ContentItem) => {
    if (!window.confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(item.id);
    try {
      await remove(item.id, item.imageUrl);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-crud-section">
      <div className="admin-crud-header">
        <h2 className="admin-crud-title">{label}</h2>
        {!isFormOpen && (
          <button className="admin-btn" onClick={openCreateForm}>Agregar nuevo</button>
        )}
      </div>

      {error && <p className="admin-error">Error al cargar datos: {error}</p>}

      {isFormOpen && (
        <form className="admin-crud-form" onSubmit={handleSubmit}>
          <div>
            <label className="admin-label" htmlFor="crud-title">Título</label>
            <input
              id="crud-title"
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="crud-description">Descripción</label>
            <textarea
              id="crud-description"
              className="admin-textarea"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="crud-date">Fecha</label>
            <input
              id="crud-date"
              type="date"
              className="admin-input"
              value={form.eventDate}
              onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="crud-image">
              Imagen {editingItem && '(dejar vacío para mantener la actual)'}
            </label>
            <input
              id="crud-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="admin-input"
              onChange={(e) => setForm((f) => ({ ...f, imageFile: e.target.files?.[0] ?? null }))}
            />
            {editingItem?.imageUrl && !form.imageFile && (
              <img src={editingItem.imageUrl} alt="" className="admin-crud-image-preview" />
            )}
          </div>

          {formError && <p className="admin-error">{formError}</p>}

          <div className="admin-crud-form-actions">
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={closeForm} disabled={saving}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="admin-crud-empty">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="admin-crud-empty">Todavía no hay {label.toLowerCase()} cargados.</p>
      ) : (
        <ul className="admin-crud-list">
          {items.map((item) => (
            <li key={item.id} className="admin-crud-list-item">
              {item.imageUrl && <img src={item.imageUrl} alt="" className="admin-crud-thumb" />}
              <div className="admin-crud-item-info">
                <span className="admin-crud-item-title">{item.title}</span>
                <span className="admin-crud-item-date">{item.dateTime}</span>
              </div>
              <div className="admin-crud-item-actions">
                <button className="admin-btn" onClick={() => openEditForm(item)} disabled={isFormOpen}>
                  Editar
                </button>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(item)}
                  disabled={isFormOpen || deletingId === item.id}
                >
                  {deletingId === item.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
