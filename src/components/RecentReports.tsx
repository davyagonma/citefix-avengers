
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

const RecentReports = () => {
  const reports = [
    {
      id: 1,
      title: "Nid de poule sur l'Avenue Steinmetz",
      category: "Infrastructure",
      location: "Cotonou, Littoral",
      status: "validated",
      statusText: "Validé",
      time: "Il y a 2 heures",
      priority: "high",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Éclairage public défaillant",
      category: "Éclairage",
      location: "Porto-Novo, Ouémé",
      status: "in_progress",
      statusText: "En cours",
      time: "Il y a 5 heures",
      priority: "medium",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Dépôt sauvage d'ordures",
      category: "Environnement",
      location: "Parakou, Borgou",
      status: "resolved",
      statusText: "Résolu",
      time: "Il y a 1 jour",
      priority: "medium",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated": return <CheckCircle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Signalements{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              récents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les derniers signalements de la communauté et leur état d'avancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reports.map((report) => (
            <Card key={report.id} className={`border-l-4 ${getPriorityColor(report.priority)} shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={report.image} 
                  alt={report.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{report.statusText}</span>
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
                  {report.title}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {report.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{report.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{report.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
          >
            Voir tous les signalements
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentReports;
