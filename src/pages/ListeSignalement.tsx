import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Camera, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Signalements = () => {
  const { toast } = useToast();
  const [signalements, setSignalements] = useState([]);
  const [filteredSignalements, setFilteredSignalements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Données simulées - à remplacer par votre API
  const mockSignalements = [
    {
      id: "1",
      titre: "Nid de poule sur la route principale",
      description: "Important nid de poule qui endommage les véhicules près du marché central",
      categorie: "infrastructure",
      statut: "en_cours",
      dateCreation: "2024-01-15T10:30:00Z",
      localisation: {
        adresse: "Avenue des Martyrs, Cotonou",
        coordonnees: { lat: 6.3654, lng: 2.4183 }
      },
      signalePar: {
        prenom: "Jean",
        nom: "Dupont",
        avatar: null
      },
      photos: [
        { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400", description: "Photo du nid de poule" }
      ],
      nombreVues: 45,
      nombreCommentaires: 8,
      nombreLikes: 12,
      priorite: "haute"
    },
    {
      id: "2",
      titre: "Éclairage public défaillant",
      description: "Plusieurs lampadaires ne fonctionnent plus dans le quartier depuis 3 semaines",
      categorie: "eclairage",
      statut: "nouveau",
      dateCreation: "2024-01-14T14:22:00Z",
      localisation: {
        adresse: "Rue de la Paix, Quartier Zongo",
        coordonnees: { lat: 6.3698, lng: 2.4254 }
      },
      signalePar: {
        prenom: "Marie",
        nom: "Kossou",
        avatar: null
      },
      photos: [
        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", description: "Lampadaire cassé" }
      ],
      nombreVues: 23,
      nombreCommentaires: 3,
      nombreLikes: 7,
      priorite: "moyenne"
    },
    {
      id: "3",
      titre: "Déchets non collectés",
      description: "Les ordures s'accumulent depuis plus d'une semaine, créant des problèmes d'hygiène",
      categorie: "environnement",
      statut: "resolu",
      dateCreation: "2024-01-10T09:15:00Z",
      localisation: {
        adresse: "Marché Dantokpa, Cotonou",
        coordonnees: { lat: 6.3515, lng: 2.4298 }
      },
      signalePar: {
        prenom: "Adjoa",
        nom: "Mensah",
        avatar: null
      },
      photos: [
        { url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400", description: "Tas d'ordures" }
      ],
      nombreVues: 67,
      nombreCommentaires: 15,
      nombreLikes: 25,
      priorite: "haute"
    },
    {
      id: "4",
      titre: "Problème de circulation",
      description: "Feux de signalisation en panne causant des embouteillages importants",
      categorie: "transport",
      statut: "en_cours",
      dateCreation: "2024-01-13T16:45:00Z",
      localisation: {
        adresse: "Carrefour des Trois Banques",
        coordonnees: { lat: 6.3587, lng: 2.4289 }
      },
      signalePar: {
        prenom: "Kofi",
        nom: "Asante",
        avatar: null
      },
      photos: [
        { url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400", description: "Embouteillage" }
      ],
      nombreVues: 89,
      nombreCommentaires: 22,
      nombreLikes: 18,
      priorite: "haute"
    },
    {
      id: "5",
      titre: "Insécurité dans le quartier",
      description: "Plusieurs agressions signalées la nuit dans cette zone mal éclairée",
      categorie: "securite",
      statut: "nouveau",
      dateCreation: "2024-01-12T20:30:00Z",
      localisation: {
        adresse: "Rue des Cocotiers, Akpakpa",
        coordonnees: { lat: 6.3421, lng: 2.4387 }
      },
      signalePar: {
        prenom: "Fatou",
        nom: "Diallo",
        avatar: null
      },
      photos: [],
      nombreVues: 34,
      nombreCommentaires: 6,
      nombreLikes: 9,
      priorite: "haute"
    },
    {
      id: "6",
      titre: "Canalisation bouchée",
      description: "Évacuation des eaux usées problématique, risque d'inondation",
      categorie: "infrastructure",
      statut: "rejete",
      dateCreation: "2024-01-11T11:20:00Z",
      localisation: {
        adresse: "Quartier Houeyiho, Cotonou",
        coordonnees: { lat: 6.3789, lng: 2.4156 }
      },
      signalePar: {
        prenom: "Ibrahim",
        nom: "Coulibaly",
        avatar: null
      },
      photos: [
        { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", description: "Canalisation" }
      ],
      nombreVues: 28,
      nombreCommentaires: 4,
      nombreLikes: 3,
      priorite: "moyenne"
    }
  ];

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "eclairage", label: "Éclairage public" },
    { value: "environnement", label: "Environnement" },
    { value: "securite", label: "Sécurité publique" },
    { value: "transport", label: "Transport public" },
    { value: "autre", label: "Autre" }
  ];

  const statuts = [
    { value: "all", label: "Tous les statuts" },
    { value: "nouveau", label: "Nouveau" },
    { value: "en_cours", label: "En cours" },
    { value: "resolu", label: "Résolu" },
    { value: "rejete", label: "Rejeté" }
  ];

  useEffect(() => {
    const fetchSignalements = async () => {
      try {
        setIsLoading(true);
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSignalements(mockSignalements);
        setFilteredSignalements(mockSignalements);
        
        toast({
          title: "Signalements chargés",
          description: `${mockSignalements.length} signalements trouvés`,
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les signalements",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignalements();
  }, [toast]);

  useEffect(() => {
    let filtered = signalements;

    // Filtrage par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.localisation.adresse.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(s => s.categorie === selectedCategory);
    }

    // Filtrage par statut
    if (selectedStatus !== "all") {
      filtered = filtered.filter(s => s.statut === selectedStatus);
    }

    setFilteredSignalements(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, signalements]);

  const getStatusBadge = (statut) => {
    const config = {
      nouveau: { color: "bg-blue-100 text-blue-800", icon: AlertCircle, label: "Nouveau" },
      en_cours: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "En cours" },
      resolu: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Résolu" },
      rejete: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Rejeté" }
    };
    
    const { color, icon: Icon, label } = config[statut] || config.nouveau;
    
    return (
      <Badge className={`${color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getCategoryColor = (categorie) => {
    const colors = {
      infrastructure: "from-blue-500 to-cyan-500",
      eclairage: "from-yellow-500 to-orange-500",
      environnement: "from-green-500 to-emerald-500",
      securite: "from-red-500 to-pink-500",
      transport: "from-purple-500 to-indigo-500",
      autre: "from-gray-500 to-slate-500"
    };
    return colors[categorie] || colors.autre;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSignalements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSignalements.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (signalementId) => {
    // Navigation vers la page de détails
    toast({
      title: "Redirection",
      description: `Ouverture du signalement ${signalementId}`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement des signalements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Liste des{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              signalements
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Découvrez tous les signalements de votre ville et suivez leur résolution
          </p>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {signalements.filter(s => s.statut === 'nouveau').length}
                </div>
                <div className="text-sm text-blue-700">Nouveaux</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {signalements.filter(s => s.statut === 'en_cours').length}
                </div>
                <div className="text-sm text-yellow-700">En cours</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {signalements.filter(s => s.statut === 'resolu').length}
                </div>
                <div className="text-sm text-green-700">Résolus</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {signalements.length}
                </div>
                <div className="text-sm text-purple-700">Total</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres et recherche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {statuts.map(stat => (
                    <option key={stat.value} value={stat.value}>{stat.label}</option>
                  ))}
                </select>
                <div className="text-sm text-gray-500 flex items-center">
                  {filteredSignalements.length} résultat(s) trouvé(s)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des signalements */}
        {currentItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">Aucun signalement trouvé</p>
                <p className="text-sm">Essayez de modifier vos critères de recherche</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((signalement) => (
              <Card key={signalement.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  {signalement.photos.length > 0 && (
                    <img
                      src={signalement.photos[0].url}
                      alt={signalement.titre}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(signalement.statut)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(signalement.categorie)}`}>
                      {categories.find(c => c.value === signalement.categorie)?.label}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">
                    {signalement.titre}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {signalement.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {signalement.localisation.adresse}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(signalement.dateCreation)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={signalement.signalePar.avatar} />
                          <AvatarFallback className="text-xs">
                            {signalement.signalePar.prenom[0]}{signalement.signalePar.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {signalement.signalePar.prenom} {signalement.signalePar.nom}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {signalement.nombreVues}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {signalement.nombreCommentaires}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {signalement.nombreLikes}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(signalement.id)}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                onClick={() => handlePageChange(pageNumber)}
                className="w-10 h-10"
              >
                {pageNumber}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Signalements;