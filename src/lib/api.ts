import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteurs pour gérer les erreurs/tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Utilisez console global (pas d'import nécessaire)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ✅ Utilisez l'URL correcte du backend
export async function createSignalement(payload: any) {
  const response = await fetch(`${API_BASE_URL}/signalements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    console.error('Erreur API:', data);
    throw new Error(data?.message || 'Erreur lors de la création du signalement');
  }

  return data;
}

export async function fetchSignalements() {
  const response = await fetch('http://localhost:3000/api/signalements');
  if (!response.ok) {
    console.error('Erreur API:', response.json());
    throw new Error('Erreur chargement des signalements');
  }
  return response.json(); // On suppose que backend répond { data: [...] }
}

export async function fetchSignalementById(id: string) {
  const response = await fetch(`http://localhost:3000/api/signalements/${id}`);
  if (!response.ok) throw new Error('Erreur de chargement');
  return response.json();
}

export async function deleteSignalement(id: string) {
  const response = await fetch(`http://localhost:3000/api/signalements/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erreur suppression');
  return response.json();
}

export async function validateSignalement(id: string, action: 'approve' | 'reject', comment: string) {
  const res = await fetch(`http://localhost:3000/api/signalements/${id}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, comment })
  });
  if (!res.ok) throw new Error('Erreur lors de la validation');
  return res.json();
}
