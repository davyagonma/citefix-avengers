
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, Bell, Award, CheckCircle, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Signalement facile",
      description: "Prenez une photo, ajoutez une description et la géolocalisation automatique. En quelques clics, votre signalement est envoyé.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Géolocalisation précise",
      description: "Localisation GPS automatique avec carte interactive. Trouvez et signalez les problèmes autour de vous facilement.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Bell,
      title: "Suivi temps réel",
      description: "Recevez des notifications à chaque étape : validation, prise en charge, résolution. Restez informé en permanence.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Système de points",
      description: "Gagnez des points pour chaque signalement validé. Convertissez vos points en argent mobile ou virement bancaire.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: CheckCircle,
      title: "Résolution rapide",
      description: "Les autorités locales prennent en charge vos signalements rapidement avec un système de priorités intelligent.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Communauté active",
      description: "Rejoignez une communauté de citoyens engagés. Commentez, soutenez et suivez les résolutions ensemble.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pourquoi choisir{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              CitéFix ?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète et intuitive pour signaler et suivre la résolution 
            des problèmes urbains dans votre ville.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
