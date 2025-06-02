
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, Eye, CheckCircle, XCircle, UserCheck, Download, MapPin, Calendar, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

const GestionSignalements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock data for reports
  const reports = [
    {
      id: "RPT-001",
      title: "Nid de poule avenue Steinmetz",
      description: "Gros nid de poule dangereux pour les véhicules",
      category: "infrastructure",
      status: "pending",
      priority: "high",
      reportedBy: "Jean Dupont",
      reportedDate: "2024-01-15",
      location: "Avenue Steinmetz, Cotonou",
      coordinates: { lat: 6.3703, lng: 2.3912 },
      photos: 2,
      views: 45,
      likes: 12,
      assignedTo: null,
      estimatedPoints: 50
    },
    {
      id: "RPT-002",
      title: "Éclairage public défaillant",
      description: "Plusieurs lampadaires ne fonctionnent plus dans le quartier",
      category: "lighting",
      status: "in_progress",
      priority: "medium",
      reportedBy: "Marie Kone",
      reportedDate: "2024-01-14",
      location: "Quartier Agla, Cotonou",
      coordinates: { lat: 6.3848, lng: 2.3888 },
      photos: 3,
      views: 32,
      likes: 8,
      assignedTo: "Équipe Électricité",
      assignedDate: "2024-01-15",
      estimatedPoints: 30
    },
    {
      id: "RPT-003",
      title: "Accumulation de déchets",
      description: "Tas de déchets non collectés depuis une semaine",
      category: "environment",
      status: "resolved",
      priority: "low",
      reportedBy: "Paul Agbo",
      reportedDate: "2024-01-13",
      location: "Marché Dantokpa, Cotonou",
      coordinates: { lat: 6.3550, lng: 2.4186 },
      photos: 1,
      views: 28,
      likes: 5,
      assignedTo: "Service Propreté",
      resolvedDate: "2024-01-16",
      pointsAwarded: 25
    }
  ];

  const technicians = [
    { id: "tech-001", name: "Équipe Infrastructure", speciality: "infrastructure" },
    { id: "tech-002", name: "Équipe Électricité", speciality: "lighting" },
    { id: "tech-003", name: "Service Propreté", speciality: "environment" },
    { id: "tech-004", name: "Équipe Sécurité", speciality: "security" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "validated":
        return <Badge className="bg-blue-100 text-blue-800">Validé</Badge>;
      case "in_progress":
        return <Badge className="bg-purple-100 text-purple-800">En cours</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Résolu</Badge>;
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesPriority = filterPriority === "all" || report.priority === filterPriority;
    const matchesCategory = filterCategory === "all" || report.category === filterCategory;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on reports:`, selectedReports);
    // TODO: Implement bulk actions
  };

  const handleValidateReport = (reportId: string, action: 'approve' | 'reject', comment: string) => {
    console.log(`${action} report ${reportId} with comment:`, comment);
    setValidationDialogOpen(false);
    // TODO: Implement validation logic
  };

  const handleAssignReport = (reportId: string, technicianId: string, comment: string) => {
    console.log(`Assign report ${reportId} to ${technicianId} with comment:`, comment);
    setAssignDialogOpen(false);
    // TODO: Implement assignment logic
  };

  const exportReports = () => {
    console.log("Exporting reports...");
    // TODO: Implement export functionality
  };

  const pendingReports = filteredReports.filter(r => r.status === "pending");
  const inProgressReports = filteredReports.filter(r => r.status === "in_progress");
  const resolvedReports = filteredReports.filter(r => r.status === "resolved");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Signalements</h1>
          <p className="text-gray-600">Administration et suivi de tous les signalements</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingReports.length}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{inProgressReports.length}</div>
              <div className="text-sm text-gray-600">En cours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{resolvedReports.length}</div>
              <div className="text-sm text-gray-600">Résolus</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{filteredReports.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par titre, description, lieu ou utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="validated">Validé</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="resolved">Résolu</SelectItem>
                    <SelectItem value="rejected">Rejeté</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes priorités</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="low">Faible</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
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

                <Button variant="outline" onClick={exportReports}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedReports.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedReports.length} signalement(s) sélectionné(s)
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleBulkAction('validate')}>
                      Valider
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('assign')}>
                      Assigner
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction('reject')}>
                      Rejeter
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tous ({filteredReports.length})</TabsTrigger>
            <TabsTrigger value="pending">En attente ({pendingReports.length})</TabsTrigger>
            <TabsTrigger value="in_progress">En cours ({inProgressReports.length})</TabsTrigger>
            <TabsTrigger value="resolved">Résolus ({resolvedReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedReports(filteredReports.map(r => r.id));
                          } else {
                            setSelectedReports([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Signalement</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedReports([...selectedReports, report.id]);
                            } else {
                              setSelectedReports(selectedReports.filter(id => id !== report.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{report.title}</div>
                          <div className="text-sm text-gray-600">{getCategoryName(report.category)}</div>
                          <div className="text-xs text-gray-500">ID: {report.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {report.location}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(report.reportedDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          
                          {report.status === "pending" && (
                            <>
                              <Dialog open={validationDialogOpen} onOpenChange={setValidationDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedReport(report)}
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Validation du Signalement</DialogTitle>
                                    <DialogDescription>
                                      Valider ou rejeter le signalement "{selectedReport?.title}"
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="comment">Commentaire</Label>
                                      <Textarea 
                                        id="comment"
                                        placeholder="Ajouter un commentaire..."
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button 
                                        onClick={() => handleValidateReport(selectedReport?.id, 'approve', '')}
                                        className="bg-green-600"
                                      >
                                        Valider
                                      </Button>
                                      <Button 
                                        variant="outline"
                                        onClick={() => handleValidateReport(selectedReport?.id, 'reject', '')}
                                        className="text-red-600"
                                      >
                                        Rejeter
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedReport(report)}
                                    className="text-blue-600"
                                  >
                                    <UserCheck className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Assigner le Signalement</DialogTitle>
                                    <DialogDescription>
                                      Assigner "{selectedReport?.title}" à une équipe
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="technician">Équipe</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Choisir une équipe" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {technicians.map((tech) => (
                                            <SelectItem key={tech.id} value={tech.id}>
                                              {tech.name} ({tech.speciality})
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="assignComment">Instructions</Label>
                                      <Textarea 
                                        id="assignComment"
                                        placeholder="Instructions pour l'équipe..."
                                        className="mt-1"
                                      />
                                    </div>
                                    <Button 
                                      onClick={() => handleAssignReport(selectedReport?.id, 'tech-001', '')}
                                      className="w-full"
                                    >
                                      Assigner
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Signalements en Attente de Validation
                </CardTitle>
                <CardDescription>
                  {pendingReports.length} signalements nécessitent votre attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Same table structure but filtered for pending reports */}
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Par {report.reportedBy}</span>
                            <span>{report.location}</span>
                            <span>{new Date(report.reportedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getPriorityBadge(report.priority)}
                          <Button size="sm" className="bg-green-600">Valider</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Rejeter</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in_progress">
            <Card>
              <CardHeader>
                <CardTitle>Signalements en Cours de Traitement</CardTitle>
                <CardDescription>
                  Suivi des interventions en cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Assigné à: {report.assignedTo}</span>
                            <span>Depuis: {report.assignedDate && new Date(report.assignedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
                          <Button size="sm" variant="outline">Voir progrès</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card>
              <CardHeader>
                <CardTitle>Signalements Résolus</CardTitle>
                <CardDescription>
                  Historique des résolutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolvedReports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Résolu par: {report.assignedTo}</span>
                            <span>Le: {report.resolvedDate && new Date(report.resolvedDate).toLocaleDateString()}</span>
                            <span className="text-green-600 font-semibold">Points attribués: {report.pointsAwarded}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-green-100 text-green-800">Résolu</Badge>
                          <Button size="sm" variant="outline">Voir résolution</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GestionSignalements;
