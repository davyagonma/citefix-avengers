
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Camera, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Carte = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for reports
  const mockReports = [
    {
      id: 1,
      title: "Nid de poule dangereux",
      category: "infrastructure",
      status: "pending",
      location: "Carrefour Dantokpa",
      date: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "Éclairage défaillant",
      category: "eclairage",
      status: "in_progress",
      location: "Boulevard de la Marina",
      date: "2024-01-14",
      priority: "medium"
    },
    {
      id: 3,
      title: "Dépôt d'ordures sauvage",
      category: "environnement",
      status: "resolved",
      location: "Quartier Gbegamey",
      date: "2024-01-13",
      priority: "low"
    }
  ];

  const categories = [
    { value: "all", label: "Tous", color: "bg-gray-500" },
    { value: "infrastructure", label: "Infrastructure", color: "bg-red-500" },
    { value: "eclairage", label: "Éclairage", color: "bg-yellow-500" },
    { value: "environnement", label: "Environnement", color: "bg-green-500" },
    { value: "securite", label: "Sécurité", color: "bg-orange-500" },
    { value: "transport", label: "Transport", color: "bg-blue-500" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "resolved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Résolu</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500";
      case "medium": return "border-yellow-500";
      case "low": return "border-green-500";
      default: return "border-gray-300";
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Carte des{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              signalements
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Explorez les problèmes signalés dans votre région
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Search */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Rechercher
                </h3>
                <Input
                  placeholder="Rechercher par titre ou localisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <h4 className="font-semibold mb-3 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Catégories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        selectedCategory === category.value
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span>{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Statistiques</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total signalements</span>
                    <span className="font-semibold">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En cours</span>
                    <span className="font-semibold text-blue-600">124</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Résolus ce mois</span>
                    <span className="font-semibold text-green-600">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Reports */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
                  <div className="text-center z-10">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Carte interactive</p>
                    <p className="text-sm text-gray-500">Intégration Mapbox à venir</p>
                  </div>
                  
                  {/* Mock map markers */}
                  <div className="absolute top-20 left-20 bg-red-500 rounded-full p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute top-32 right-32 bg-yellow-500 rounded-full p-2">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute bottom-20 left-32 bg-green-500 rounded-full p-2">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Signalements récents</h3>
              {filteredReports.map((report) => (
                <Card key={report.id} className={`border-l-4 ${getPriorityColor(report.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{report.title}</h4>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(report.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carte;
