import { api } from '@/lib/api'; 
const API_URL = 'http://localhost:3000/api/users';
import axios from 'axios';

export const AuthService = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/users/login', credentials),

  signup: async (userData: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
    role?: string;
    adresse?: {
      rue: string;
      quartier: string;
      ville: string;
      commune: string;
      coordonnees: {
        type: string;
        coordinates: number[];
      };
    };
  }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
};  