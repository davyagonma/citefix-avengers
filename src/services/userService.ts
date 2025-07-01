// src/services/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const UserService = {
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data) {
        throw new Error('Empty response from server');
      }

      return response.data;
    } catch (error) {
      console.error('Error in UserService.getCurrentUser:', error);
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur
        console.error('Server responded with:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error; // Propagez l'erreur pour la gérer dans le composant
    }
  },

  updateUser: async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};