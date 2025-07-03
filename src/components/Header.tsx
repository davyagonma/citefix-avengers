import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Bell, User, LogOut, Home, MapIcon, AlertTriangle, Info, Settings, Users, CreditCard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isLoggedIn, logout, isAdmin, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Navigation items communes (visibles par tous les utilisateurs connectés)
  const commonNavItems = [
    // { 
    //   to: "/", 
    //   label: t('home') || "Accueil", 
    //   icon: Home,
    //   show: true 
    // },
    { 
      to: "/a-propos", 
      label: t('about') || "À propos", 
      icon: Info,
      show: true 
    },
  ];

  // Navigation items pour utilisateurs simples
  const userNavItems = [
    { 
      to: "/signaler", 
      label: t('report') || "Signaler", 
      icon: AlertTriangle,
      show: isLoggedIn && !isAdmin 
    },
    { 
      to: "/carte", 
      label: t('map') || "Carte", 
      icon: MapIcon,
      show: isLoggedIn && !isAdmin 
    },
    // { 
    //   to: "/paiement", 
    //   label: "Paiement", 
    //   icon: CreditCard,
    //   show: isLoggedIn && !isAdmin 
    // },
    { 
      to: "/mes-signalements", 
      label: "Mes signalements", 
      icon: AlertTriangle,
      show: isLoggedIn && !isAdmin 
    },
    { 
      to: "/notifications", 
      label: "Notifications", 
      icon: Bell,
      show: isAdmin 
    }
  ];

  // Navigation items pour admin
  const adminNavItems = [
    { 
      to: "/admin/dashboard", 
      label: "Dashboard", 
      icon: Settings,
      show: isAdmin 
    },
    { 
      to: "/admin/signalements", 
      label: "Signalements", 
      icon: AlertTriangle,
      show: isAdmin 
    },
    { 
      to: "/admin/utilisateurs", 
      label: "Utilisateurs", 
      icon: Users,
      show: isAdmin 
    },
    { 
      to: "/signaler", 
      label: t('report') || "Signaler", 
      icon: AlertTriangle,
      show: isAdmin 
    },
    { 
      to: "/carte", 
      label: t('map') || "Carte", 
      icon: MapIcon,
      show: isAdmin 
    },
    { 
      to: "/notifications", 
      label: "Notifications", 
      icon: Bell,
      show: isAdmin 
    }
  ];

  // Combiner les items selon le rôle
  const getNavItems = () => {
    if (isAdmin) {
      return [ ...adminNavItems];
    }
    return [ ...userNavItems, ...commonNavItems];
  };

  const navItems = getNavItems();

  // Afficher un skeleton pendant le chargement
  if (isLoading) {
    return (
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  CitéFix
                </h1>
                <p className="text-xs text-gray-600">
                  {t('tagline') || "Améliorer notre ville ensemble"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                CitéFix
              </h1>
              <p className="text-xs text-gray-600">
                {t('tagline') || "Améliorer notre ville ensemble"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.show ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ) : null;
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />

            {isLoggedIn ? (
              <>
                {/* Notifications pour utilisateurs simples */}
                {!isAdmin && (
                  <Button variant="ghost" size="icon" className="relative" asChild>
                    <Link to="/notifications">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </Link>
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {user?.prenom || 'Utilisateur'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.prenom} {user?.nom}
                      {isAdmin && <span className="block text-xs text-blue-600 font-medium">Administrateur</span>}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profil" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        {t('profile') || 'Profil'}
                      </Link>
                    </DropdownMenuItem>
                    {!isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/mes-signalements" className="cursor-pointer">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Mes signalements
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('logout') || 'Déconnexion'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50" 
                  asChild
                >
                  <Link to="/login">{t('login') || 'Connexion'}</Link>
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" 
                  asChild
                >
                  <Link to="/signup">{t('signup') || 'Inscription'}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return item.show ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.to
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ) : null;
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="mb-4">
                <LanguageSelector />
              </div>

              {isLoggedIn ? (
                <div className="space-y-2">
                  {/* Notifications pour utilisateurs simples en mobile */}
                  {!isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start relative" 
                      asChild
                    >
                      <Link 
                        to="/notifications"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Bell className="h-5 w-5 mr-2" />
                        {t('notifications') || 'Notifications'}
                        <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          3
                        </span>
                      </Link>
                    </Button>
                  )}

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    asChild
                  >
                    <Link 
                      to="/profil"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      {user?.prenom || t('profile') || 'Profil'}
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t('logout') || 'Déconnexion'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600" 
                    asChild
                  >
                    <Link 
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('login') || 'Connexion'}
                    </Link>
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600" 
                    asChild
                  >
                    <Link 
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('signup') || 'Inscription'}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;