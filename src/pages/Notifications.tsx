
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, Eye } from "lucide-react";
import { useState } from "react";

const Notifications = () => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Votre signalement a été pris en compte",
      message: "Le problème de nid de poule sur l'Avenue de la République a été transmis aux services compétents.",
      date: "2024-01-15",
      read: false,
      type: "success"
    },
    {
      id: 2,
      title: "Mise à jour de votre signalement",
      message: "Les travaux de réparation ont commencé sur l'Avenue de la République.",
      date: "2024-01-10",
      read: true,
      type: "info"
    },
    {
      id: 3,
      title: "Nouveau signalement à proximité",
      message: "Un autre citoyen a signalé un problème similaire dans votre quartier.",
      date: "2024-01-08",
      read: false,
      type: "warning"
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600 mb-8">
            Vous devez être connecté pour voir vos notifications.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-green-600">
            Se connecter
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                {t('notifications')}
              </h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-sm rounded-full px-3 py-1">
                  {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}
                </span>
              )}
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Tout marquer comme lu</span>
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune notification
              </h3>
              <p className="text-gray-500">
                Vous n'avez aucune notification pour le moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                    notification.type === 'success' ? 'border-green-500' :
                    notification.type === 'warning' ? 'border-yellow-500' :
                    'border-blue-500'
                  } ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-blue-800' : 'text-gray-800'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                            Nouveau
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(notification.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Notifications;
