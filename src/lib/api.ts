import axios from 'axios';
import { console } from 'inspector';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteurs pour gérer les erreurs/tokens (optionnel)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export async function createSignalement(payload: any) {
  const response = await fetch('http://localhost:3000/api/signalements', {
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
    console.log(response)
    throw new Error(data?.message || 'Erreur lors de la création du signalement');
  }

  return data;
}
