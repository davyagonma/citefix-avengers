
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Eye, MessageSquare, ThumbsUp, Filter, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";

const MesSignalements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for reports
  const allReports = [
    {
      id: "1",
      title: "Nid de poule sur l'avenue Steinmetz",
      description: "Gros nid de poule dangereux pour les véhicules",
      category: "infrastructure",
      status: "resolved",
      priority: "high",
      date: "2024-01-15",
      location: "Avenue Steinmetz, Cotonou",
      views: 45,
      likes: 12,
      comments: 3,
      points: 50,
      photos: 2,
      resolutionDate: "2024-01-20"
    },
    {
      id: "2", 
      title: "Éclairage public défaillant",
      description: "Plusieurs lampadaires ne fonctionnent plus",
      category: "lighting",
      status: "in_progress",
      priority: "medium",
      date: "2024-01-10",
      location: "Quartier Agla, Cotonou",
      views: 32,
      likes: 8,
      comments: 1,
      points: 30,
      photos: 3,
      assignedTo: "Équipe Électricité"
    },
    {
      id: "3",
      title: "Accumulation de déchets",
      description: "Tas de déchets non collectés depuis une semaine",
      category: "environment",
      status: "pending",
      priority: "low",
      date: "2024-01-08",
      location: "Marché Dantokpa, Cotonou", 
      views: 28,
      likes: 5,
      comments: 0,
      points: 0,
      photos: 1
    },
    {
      id: "4",
      title: "Canalisation d'eau cassée",
      description: "Fuite d'eau importante sur la chaussée",
      category: "infrastructure",
      status: "rejected",
      priority: "urgent",
      date: "2024-01-05",
      location: "Rue des Cheminots, Cotonou",
      views: 18,
      likes: 2,
      comments: 1,
      points: 0,
      photos: 2,
      rejectionReason: "Signalement en doublon"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Résolu</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Élevée</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Moyenne</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Faible</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getCategoryName = (category: string) => {
    const categories = {
      infrastructure: "Infrastructure",
      environment: "Environnement", 
      lighting: "Éclairage",
      security: "Sécurité",
      other: "Autre"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const filterReports = (reports: typeof allReports, status?: string) => {
    return reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           report.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || report.category === filterCategory;
      const matchesStatus = !status || report.status === status;
      const matchesFilterStatus = filterStatus === "all" || report.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus && matchesFilterStatus;
    });
  };

  const resolvedReports = filterReports(allReports, "resolved");
  const pendingReports = filterReports(allReports.filter(r => r.status !== "resolved"));

  const stats = {
    total: allReports.length,
    resolved: allReports.filter(r => r.status === "resolved").length,
    pending: allReports.filter(r => r.status === "pending").length,
    inProgress: allReports.filter(r => r.status === "in_progress").length,
    rejected: allReports.filter(r => r.status === "rejected").length,
    totalPoints: allReports.reduce((sum, r) => sum + r.points, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Signalements</h1>
          <p className="text-gray-600">Suivez l'état de tous vos signalements</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-gray-600">Résolus</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">En cours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejetés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalPoints}</div>
              <div className="text-sm text-gray-600">Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans mes signalements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="environment">Environnement</SelectItem>
                  <SelectItem value="lighting">Éclairage</SelectItem>
                  <SelectItem value="security">Sécurité</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous ({filterReports(allReports).length})</TabsTrigger>
            <TabsTrigger value="resolved">Résolus ({resolvedReports.length})</TabsTrigger>
            <TabsTrigger value="pending">En cours ({pendingReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterReports(allReports).map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(report.status)}
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(report.date).toLocaleDateString()}
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(report.status)}
                      {getPriorityBadge(report.priority)}
                      <Badge variant="outline">{getCategoryName(report.category)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{report.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {report.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {report.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {report.comments}
                      </div>
                      <div className="text-green-600 font-semibold">
                        +{report.points} points
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                      {report.status === "pending" && (
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Additional info based on status */}
                  {report.status === "resolved" && report.resolutionDate && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-800">
                        ✅ Résolu le {new Date(report.resolutionDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {report.status === "in_progress" && report.assignedTo && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-800">
                        🔧 Assigné à : {report.assignedTo}
                      </div>
                    </div>
                  )}
                  
                  {report.status === "rejected" && report.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-800">
                        ❌ Raison du rejet : {report.rejectionReason}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                {/* Same card structure as above */}
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(report.date).toLocaleDateString()}
                        {report.resolutionDate && (
                          <>
                            <span>→</span>
                            <span className="text-green-600">Résolu le {new Date(report.resolutionDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800">Résolu</Badge>
                      <Badge variant="outline">+{report.points} points</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{report.description}</p>
                  <Button variant="outline" size="sm">
                    Voir les photos avant/après
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                {/* Same structure but with action buttons for pending reports */}
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(report.status)}
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(report.date).toLocaleDateString()}
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(report.status)}
                      {getPriorityBadge(report.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{report.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Voir détails</Button>
                    {report.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Supprimer</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MesSignalements;
