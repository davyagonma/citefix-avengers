
import { MapPin, Bell, Camera, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CitéFix</h3>
                <p className="text-sm text-gray-400">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('aboutDescription')}
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Camera className="h-4 w-4" />
                <span>{t('report')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Bell className="h-4 w-4" />
                <span>Suivre</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Award className="h-4 w-4" />
                <span>Gagner</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="/signaler" className="text-gray-300 hover:text-white transition-colors">{t('report')}</a></li>
              <li><a href="/carte" className="text-gray-300 hover:text-white transition-colors">{t('map')}</a></li>
              <li><a href="/profil" className="text-gray-300 hover:text-white transition-colors">{t('profile')}</a></li>
              <li><a href="/mes-signalements" className="text-gray-300 hover:text-white transition-colors">{t('myReports')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('helpCenter')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('userGuide')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('contactUs')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('terms')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('privacy')}</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md">
            <h4 className="font-semibold mb-4">{t('stayInformed')}</h4>
            <p className="text-gray-300 text-sm mb-4">
              {t('emailUpdates')}
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder={t('emailPlaceholder')}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                {t('subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t('copyright')}
          </p>
          <LanguageSelector variant="outline" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
