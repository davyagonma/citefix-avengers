
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Award, Target, Heart, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const APropos = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('citizenEngagement'),
      description: t('citizenEngagementDesc')
    },
    {
      icon: Zap,
      title: t('innovation'),
      description: t('innovationDesc')
    },
    {
      icon: Users,
      title: t('collaboration'),
      description: t('collaborationDesc')
    },
    {
      icon: Target,
      title: t('measurableImpact'),
      description: t('measurableImpactDesc')
    }
  ];

  const team = [
    {
      name: "Dr. Amina Kouassi",
      role: "Fondatrice & CEO",
      description: "Experte en urbanisme durable avec 15 ans d'expérience en Afrique de l'Ouest"
    },
    {
      name: "Jean-Baptiste Adou",
      role: "Directeur Technique",
      description: "Ingénieur logiciel passionné par les solutions tech for good"
    },
    {
      name: "Fatou Diallo",
      role: "Responsable Partenariats",
      description: "Spécialiste en relations publiques et développement communautaire"
    }
  ];

  const stats = [
    { number: "12", label: t('partnerCities'), description: t('acrossBenin') },
    { number: "15k+", label: t('activeCitizens'), description: t('engagedUsers') },
    { number: "3,247", label: t('problemsSolved'), description: t('sinceLaunch') },
    { number: "89%", label: t('satisfactionRate'), description: t('ofUsers') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            <span>Plateforme citoyenne certifiée</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('aboutTitle')}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              CitéFix
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('ourMission')}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('missionText1')}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('missionText2')}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                {t('joinMovement')}
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 text-center">
                <MapPin className="h-24 w-24 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('yourCityOurPriority')}</h3>
                <p className="text-gray-600">
                  {t('buildSmartCities')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('ourValues')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('valuesDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('ourImpact')}</h2>
            <p className="text-xl text-gray-600">
              {t('impactDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="py-8 px-6">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('ourTeam')}</h2>
            <p className="text-xl text-gray-600">
              {t('teamDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white p-12">
          <h2 className="text-3xl font-bold mb-4">{t('readyToTransform')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('transformDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              {t('createAccount')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              {t('reportProblem')}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default APropos;
