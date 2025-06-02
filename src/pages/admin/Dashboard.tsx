
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = {
    totalReports: 1247,
    pendingReports: 89,
    inProgressReports: 156,
    resolvedReports: 892,
    totalUsers: 3421,
    activeUsers: 234,
    totalPoints: 124570,
    averageResolutionTime: 4.2 // days
  };

  const recentReports = [
    {
      id: "1",
      title: "Nid de poule avenue Steinmetz",
      location: "Cotonou, Littoral",
      category: "Infrastructure",
      status: "pending",
      priority: "high",
      reportedBy: "Jean Dupont",
      date: "2024-01-15",
      points: 0
    },
    {
      id: "2",
      title: "Éclairage défaillant",
      location: "Abomey-Calavi, Atlantique", 
      category: "Éclairage",
      status: "in_progress",
      priority: "medium",
      reportedBy: "Marie Kone",
      date: "2024-01-14",
      points: 30
    },
    {
      id: "3",
      title: "Accumulation de déchets",
      location: "Porto-Novo, Ouémé",
      category: "Environnement", 
      status: "resolved",
      priority: "low",
      reportedBy: "Paul Agbo",
      date: "2024-01-13",
      points: 25
    }
  ];

  const monthlyData = [
    { month: "Jan", reports: 120, resolved: 95 },
    { month: "Fév", reports: 132, resolved: 108 },
    { month: "Mar", reports: 145, resolved: 122 },
    { month: "Avr", reports: 159, resolved: 134 },
    { month: "Mai", reports: 167, resolved: 143 },
    { month: "Jun", reports: 178, resolved: 156 }
  ];

  const categoryData = [
    { name: "Infrastructure", value: 35, count: 437 },
    { name: "Environnement", value: 28, count: 349 },
    { name: "Éclairage", value: 22, count: 274 },
    { name: "Sécurité", value: 10, count: 125 },
    { name: "Autre", value: 5, count: 62 }
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Résolu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Élevée</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Moyenne</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Faible</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme CitéFix</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signalements</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalReports.toLocaleString()}</div>
              <p className="text-xs text-gray-600">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingReports}</div>
              <p className="text-xs text-gray-600">Nécessitent validation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Résolution</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((stats.resolvedReports / stats.totalReports) * 100)}%
              </div>
              <Progress 
                value={(stats.resolvedReports / stats.totalReports) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{stats.activeUsers} connectés aujourd'hui</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="reports">Signalements</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Reports Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Évolution Mensuelle des Signalements</CardTitle>
                  <CardDescription>Signalements reçus vs résolus par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="reports" fill="#3B82F6" name="Signalements" />
                      <Bar dataKey="resolved" fill="#10B981" name="Résolus" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Catégorie</CardTitle>
                  <CardDescription>Distribution des signalements par type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Signalements Récents</CardTitle>
                  <CardDescription>Les derniers signalements nécessitant attention</CardDescription>
                </div>
                <Button variant="outline">Voir tout</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{report.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          {new Date(report.date).toLocaleDateString()}
                          <span>•</span>
                          Par {report.reportedBy}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status)}
                        {getPriorityBadge(report.priority)}
                        <Badge variant="outline">{report.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Valider signalements en attente ({stats.pendingReports})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Assigner aux techniciens
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Exporter rapport mensuel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temps de Résolution Moyen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.averageResolutionTime} jours
                  </div>
                  <p className="text-sm text-gray-600">
                    Objectif: moins de 5 jours
                  </p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Points Distribués</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stats.totalPoints.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Ce mois: +15%
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Engagement en hausse</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Utilisateurs Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Actifs Aujourd'hui</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Nouveaux ce Mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">127</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Taux de Rétention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">73%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendances et Prévisions</CardTitle>
                <CardDescription>Analyses avancées pour la prise de décision</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
