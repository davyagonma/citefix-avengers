import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'fon';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    tagline: "Signaler. Suivre. Améliorer.",
    home: "Accueil",
    report: "Signaler",
    map: "Carte",
    about: "À propos",
    login: "Connexion",
    signup: "Inscription",
    logout: "Déconnexion",
    profile: "Profil",
    notifications: "Notifications",
    french: "Français",
    english: "Anglais",
    fon: "Fon",
    ourMission: "Notre Mission",
    ourMissionDesc: "CitéFix a été créé pour permettre aux citoyens de signaler facilement les problèmes urbains et de suivre leur résolution. Notre plateforme connecte les résidents avec les autorités locales pour créer des villes plus vivables.",
    howItWorks: "Comment ça marche",
    step1: "Signaler",
    step1Desc: "Prenez une photo du problème et décrivez-le en quelques mots.",
    step2: "Suivre",
    step2Desc: "Recevez des notifications sur l'état de votre signalement.",
    step3: "Voir les résultats",
    step3Desc: "Voyez votre quartier s'améliorer grâce à vos signalements.",
    ourValues: "Nos Valeurs",
    transparency: "Transparence",
    transparencyDesc: "Nous croyons en la transparence totale dans le traitement des signalements citoyens.",
    efficiency: "Efficacité",
    efficiencyDesc: "Notre technologie permet un traitement rapide et efficace des problèmes urbains.",
    community: "Communauté",
    communityDesc: "Nous construisons une communauté engagée pour l'amélioration de nos villes.",
    joinUs: "Rejoignez-nous",
    joinUsDesc: "Ensemble, nous pouvons rendre nos villes plus belles et plus fonctionnelles.",
    startReporting: "Commencer à signaler",
    contactUs: "Nous contacter"
  },
  en: {
    tagline: "Report. Track. Improve.",
    home: "Home",
    report: "Report",
    map: "Map",
    about: "About",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    profile: "Profile",
    notifications: "Notifications",
    french: "French",
    english: "English",
    fon: "Fon",
    ourMission: "Our Mission",
    ourMissionDesc: "CitéFix was created to enable citizens to easily report urban problems and track their resolution. Our platform connects residents with local authorities to create more livable cities.",
    howItWorks: "How it works",
    step1: "Report",
    step1Desc: "Take a photo of the problem and describe it in a few words.",
    step2: "Track",
    step2Desc: "Receive notifications about the status of your report.",
    step3: "See results",
    step3Desc: "Watch your neighborhood improve thanks to your reports.",
    ourValues: "Our Values",
    transparency: "Transparency",
    transparencyDesc: "We believe in complete transparency in handling citizen reports.",
    efficiency: "Efficiency",
    efficiencyDesc: "Our technology enables fast and efficient processing of urban issues.",
    community: "Community",
    communityDesc: "We build an engaged community for the improvement of our cities.",
    joinUs: "Join us",
    joinUsDesc: "Together, we can make our cities more beautiful and functional.",
    startReporting: "Start reporting",
    contactUs: "Contact us"
  },
  fon: {
    tagline: "Xlɛ́. Kpɔ́n. Wiwlena.",
    home: "Awe",
    report: "Xlɛ́",
    map: "Taflá",
    about: "Etɔn",
    login: "Yi awe",
    signup: "Xlɛ towe",
    logout: "Do awe",
    profile: "Nɔvi tɔn",
    notifications: "Xlɛ lɛ",
    french: "Fransegbe",
    english: "Inglisigbe",
    fon: "Fɔngbe",
    ourMission: "Mí ɖokpo",
    ourMissionDesc: "CitéFix wá ɖo alɔ́ bo nɔvi lɛ na te ɖé gbedide lɛ kpo blewu eye woakpɔ́ alɔ́ɖe ɖé edzi. Mí platform lɔ̃ nɔvi lɛ kple dukplɔla lɛ ɖo alɔ́ bo woawɔ du nyui lɛ.",
    howItWorks: "Alɔ́ si wowɔnɛ",
    step1: "Xlɛ́",
    step1Desc: "Ɖé gbedide la foto eye nàɖo alɔ́ɖe le eŋú le nyá ɖeka ɖeka me.",
    step2: "Kpɔ́n",
    step2Desc: "Xɔ xlɛdɔ tso wo xlɛ la ƒe nɔnɔme ŋú.",
    step3: "Kpɔ emɛnu lɛ",
    step3Desc: "Kpɔ ale si wo kɔƒe nyona le wo xlɛ lɛ ta.",
    ourValues: "Mí susu lɛ",
    transparency: "Kɔkɔe",
    transparencyDesc: "Míexɔ se be kɔkɔe blibo le nɔvi lɛ ƒe xlɛ lɛ wɔwɔ me.",
    efficiency: "Nyonyo",
    efficiencyDesc: "Mí teknologi na mɔ bo woawɔ du ƒe nya lɛ kabakaba eye woanyoa.",
    community: "Nɔvi lɛ",
    communityDesc: "Míetua nɔvi lɛ ƒe ha si di be yewoana míaƒe du lɛ nanyo ɖe edzi.",
    joinUs: "Va míade",
    joinUsDesc: "Ne míewɔ ɖeka la, míateɖé mɔ na míaƒe du lɛ naɖi ɖɔ eye woasɔ nyuie.",
    startReporting: "Dze xlɛ́ gɔme",
    contactUs: "Ƒo míade"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['fr', 'en', 'fon'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
