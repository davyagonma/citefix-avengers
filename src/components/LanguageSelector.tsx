
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = "", 
  variant = "ghost" 
}) => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'en', name: t('english'), flag: '🇬🇧' },
    { code: 'fon', name: t('fon'), flag: '🇧🇯' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Languages className="h-4 w-4 text-gray-600" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : variant}
            size="sm"
            onClick={() => setLanguage(lang.code)}
            className={`text-xs ${
              language === lang.code 
                ? "bg-blue-600 text-white" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
