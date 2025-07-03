import { api } from '@/lib/api';
interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    nom: string;
    prenom: string;
    role: 'user' | 'admin';
    status: string;
  };
}

export const AuthService = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  signup: (userData: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
    role?: 'user' | 'admin';
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
  }) => api.post('/users', userData),
  
  logout: async (token: string): Promise<void> => {
    try {
      await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
      // On continue quand même la déconnexion côté front
    }
  }
};