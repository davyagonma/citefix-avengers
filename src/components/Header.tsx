
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "@/components/LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isLoggedIn, logout, isAdmin } = useAuth();

  // Navigation items for regular users
  const userNavItems = [
    { to: "/", label: t('home') },
    { to: "/signaler", label: t('report') },
    { to: "/carte", label: t('map') },
    { to: "/a-propos", label: t('about') }
  ];

  // Navigation items for admin users
  const adminNavItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/signalements", label: "Gestion Signalements" },
    { to: "/admin/utilisateurs", label: "Gestion Utilisateurs" },
    { to: "/a-propos", label: t('about') }
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                CitéFix
              </h1>
              <p className="text-xs text-gray-600">{t('tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            
            {/* Notification Button - only when logged in */}
            {isLoggedIn && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
              </Button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={logout}>
                  {t('logout')}
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" asChild>
                  <Link to="/profil">{t('profile')}</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
                  <Link to="/login">{t('login')}</Link>
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" asChild>
                  <Link to="/signup">{t('signup')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <LanguageSelector className="mb-4" />
                
                {/* Mobile Notification Button - only when logged in */}
                {isLoggedIn && (
                  <Button variant="ghost" className="w-full justify-start mb-2 relative" asChild>
                    <Link to="/notifications">
                      <Bell className="h-5 w-5 mr-2" />
                      {t('notifications')}
                      <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button variant="outline" onClick={logout}>
                      {t('logout')}
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600" asChild>
                      <Link to="/profil">{t('profile')}</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-blue-600 text-blue-600" asChild>
                      <Link to="/login">{t('login')}</Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600" asChild>
                      <Link to="/signup">{t('signup')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
