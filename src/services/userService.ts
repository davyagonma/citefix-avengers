// src/services/userService.ts
import axios from 'axios';

// Define the User type or import it from your models if it exists elsewhere
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  registrationDate?: string;
  lastLogin?: string;
  location?: string;
  totalReports?: number;
  resolvedReports?: number;
  totalPoints?: number;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  speciality?: string;
  suspendedReason?: string;
  avatar?: string;
  // Add other fields as needed
}

const API_URL = 'http://localhost:3000/api/users';

export const UserService = {
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    try {
      const response = await axios.get<{ data: User[] }>(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Vérification approfondie de la réponse
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Format de réponse invalide: tableau d\'utilisateurs attendu');
      }

      return response.data.data; // Extrait le tableau du champ data
    } catch (error) {
      console.error('Erreur dans getAllUsers:', error);
      throw new Error(error.response?.data?.error || 'Échec de la récupération des utilisateurs');
    }
  },

  getUserById: async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateUser: async (id: string, data: any) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  changeUserRole: async (id: string, role: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.patch(
      `${API_URL}/${id}/role`, 
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  changeUserStatus: async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.patch(
      `${API_URL}/${id}/status`, 
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};