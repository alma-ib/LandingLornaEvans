import { supabase } from './supabaseClient';

const BUCKET = 'content-images';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Formato no soportado. Usá PNG, JPG o WEBP.';
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'La imagen supera el tamaño máximo de 5MB.';
  }
  return null;
}

export async function uploadContentImage(folder: string, file: File): Promise<string> {
  const path = `${folder}/${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function deleteContentImage(imageUrl: string): Promise<void> {
  const marker = `/${BUCKET}/`;
  const index = imageUrl.indexOf(marker);
  if (index === -1) return;
  const path = imageUrl.slice(index + marker.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
