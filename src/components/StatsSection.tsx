
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    {
      number: "67%",
      label: "Taux de résolution",
      description: "Des problèmes signalés sont résolus sous 30 jours",
      color: "text-green-600"
    },
    {
      number: "12h",
      label: "Temps de réponse moyen",
      description: "Les autorités valident vos signalements rapidement",
      color: "text-blue-600"
    },
    {
      number: "850k",
      label: "Points distribués",
      description: "FCFA convertis et versés aux citoyens actifs",
      color: "text-purple-600"
    },
    {
      number: "24/7",
      label: "Disponibilité",
      description: "Signalez à tout moment, où que vous soyez",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Des résultats{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              concrets
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            CitéFix transforme déjà les villes du Bénin grâce à l'engagement 
            de milliers de citoyens comme vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="py-8 px-6">
                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
