import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import axios, { isAxiosError } from 'axios';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'user' | 'admin';
  telephone?: string;
  status?: string;
}

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    role: 'user' | 'admin';
    telephone?: string;
    status?: string;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean }>;
  logout: () => void;
  user: User | null;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    isLoading: true,
    user: null as User | null,
  });

  // Fonction pour vérifier si le token est valide
  const validateToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }, []);

  // Fonction pour initialiser l'authentification
  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        // Vérifier si le token est toujours valide
        const isValidToken = await validateToken(token);
        
        if (isValidToken) {
          const user = JSON.parse(savedUser);
          setState({
            isLoggedIn: true,
            isLoading: false,
            user,
          });
        } else {
          // Token invalide, nettoyer le localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          setState({
            isLoggedIn: false,
            isLoading: false,
            user: null,
          });
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          isLoading: false 
        }));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setState({
        isLoggedIn: false,
        isLoading: false,
        user: null,
      });
    }
  }, [validateToken]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Fonction de connexion
  const login = async (credentials: { email: string; password: string }) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3000/api/auth/login',
        credentials
      );

      const { token, user: userData } = response.data;

      const user: User = {
        _id: userData._id,
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        role: userData.role,
        telephone: userData.telephone,
        status: userData.status
      };
      
      // Stocker les données
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user._id);

      setState({
        isLoggedIn: true,
        isLoading: false,
        user,
      });

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.prenom} !`,
      });

      return { success: true };
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      
      let errorMessage = "Erreur lors de la connexion";
      
      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });

      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
  }, []);

  // Fonction pour rafraîchir les données utilisateur
  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data as User;
      const user: User = {
        _id: userData._id,
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        role: userData.role,
        telephone: userData.telephone,
        status: userData.status
      };

      localStorage.setItem('user', JSON.stringify(user));
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  }, [logout]);

  const isAdmin = state.user?.role === 'admin';

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    isAdmin,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};