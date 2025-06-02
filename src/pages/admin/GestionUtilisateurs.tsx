
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Eye, Edit, Ban, UserCheck, Download, Mail, Phone, Calendar, MapPin, Star, Trophy } from "lucide-react";
import Header from "@/components/Header";

const GestionUtilisateurs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);

  // Mock data for users
  const users = [
    {
      id: "user-001",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+229 12 34 56 78",
      role: "citizen",
      status: "active",
      registrationDate: "2023-06-15",
      lastLogin: "2024-01-15",
      location: "Cotonou, Littoral",
      totalReports: 23,
      resolvedReports: 18,
      totalPoints: 2450,
      rank: "Citoyen Actif",
      emailVerified: true,
      phoneVerified: true,
      avatar: null
    },
    {
      id: "user-002",
      firstName: "Marie",
      lastName: "Kone",
      email: "marie.kone@email.com",
      phone: "+229 23 45 67 89",
      role: "technician",
      status: "active",
      registrationDate: "2023-05-20",
      lastLogin: "2024-01-14",
      location: "Abomey-Calavi, Atlantique",
      totalReports: 5,
      resolvedReports: 89,
      totalPoints: 890,
      rank: "Technicien",
      emailVerified: true,
      phoneVerified: false,
      speciality: "Infrastructure",
      avatar: null
    },
    {
      id: "user-003", 
      firstName: "Paul",
      lastName: "Agbo",
      email: "paul.agbo@email.com",
      phone: "+229 34 56 78 90",
      role: "citizen",
      status: "suspended",
      registrationDate: "2023-08-10",
      lastLogin: "2024-01-10",
      location: "Porto-Novo, Ouémé",
      totalReports: 12,
      resolvedReports: 8,
      totalPoints: 1200,
      rank: "Citoyen",
      emailVerified: true,
      phoneVerified: true,
      suspendedReason: "Signalements répétés de mauvaise qualité",
      avatar: null
    },
    {
      id: "user-004",
      firstName: "Sophie",
      lastName: "Mensah",
      email: "sophie.mensah@admin.citefix.bj",
      phone: "+229 45 67 89 01",
      role: "admin",
      status: "active",
      registrationDate: "2023-01-01",
      lastLogin: "2024-01-15",
      location: "Cotonou, Littoral",
      totalReports: 0,
      resolvedReports: 0,
      totalPoints: 0,
      rank: "Administrateur",
      emailVerified: true,
      phoneVerified: true,
      avatar: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800">Suspendu</Badge>;
      case "banned":
        return <Badge className="bg-red-100 text-red-800">Banni</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">En attente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="destructive">Administrateur</Badge>;
      case "technician":
        return <Badge className="bg-blue-100 text-blue-800">Technicien</Badge>;
      case "citizen":
        return <Badge className="bg-gray-100 text-gray-800">Citoyen</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    suspended: users.filter(u => u.status === "suspended").length,
    citizens: users.filter(u => u.role === "citizen").length,
    technicians: users.filter(u => u.role === "technician").length,
    admins: users.filter(u => u.role === "admin").length
  };

  const handleChangeRole = (userId: string, newRole: string, comment: string) => {
    console.log(`Change role for user ${userId} to ${newRole} with comment:`, comment);
    setEditRoleOpen(false);
    // TODO: Implement role change logic
  };

  const handleChangeStatus = (userId: string, newStatus: string, reason?: string) => {
    console.log(`Change status for user ${userId} to ${newStatus} with reason:`, reason);
    // TODO: Implement status change logic
  };

  const exportUsers = () => {
    console.log("Exporting users...");
    // TODO: Implement export functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Administration des comptes utilisateurs</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.suspended}</div>
              <div className="text-sm text-gray-600">Suspendus</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.citizens}</div>
              <div className="text-sm text-gray-600">Citoyens</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.technicians}</div>
              <div className="text-sm text-gray-600">Techniciens</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
              <div className="text-sm text-gray-600">Admins</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous rôles</SelectItem>
                    <SelectItem value="citizen">Citoyen</SelectItem>
                    <SelectItem value="technician">Technicien</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                    <SelectItem value="banned">Banni</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={exportUsers}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Activité</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        {user.email}
                        {user.emailVerified && <Badge className="ml-2 bg-green-100 text-green-800 text-xs">✓</Badge>}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        {user.phone}
                        {user.phoneVerified && <Badge className="ml-2 bg-green-100 text-green-800 text-xs">✓</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getRoleBadge(user.role)}
                      {user.role === "technician" && user.speciality && (
                        <div className="text-xs text-gray-600 mt-1">{user.speciality}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getStatusBadge(user.status)}
                      {user.status === "suspended" && user.suspendedReason && (
                        <div className="text-xs text-gray-600 mt-1" title={user.suspendedReason}>
                          Motif: {user.suspendedReason.substring(0, 30)}...
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Inscrit: {new Date(user.registrationDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${
                          new Date(user.lastLogin).getTime() > Date.now() - 24*60*60*1000 
                            ? "bg-green-500" 
                            : "bg-gray-300"
                        }`}></span>
                        Dernière connexion: {new Date(user.lastLogin).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.role === "citizen" && (
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {user.totalPoints} points
                        </div>
                        <div>{user.totalReports} signalements</div>
                        <div className="text-green-600">{user.resolvedReports} résolus</div>
                      </div>
                    )}
                    {user.role === "technician" && (
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Trophy className="h-3 w-3 mr-1 text-blue-500" />
                          {user.resolvedReports} interventions
                        </div>
                        <div>{user.totalReports} signalements</div>
                      </div>
                    )}
                    {user.role === "admin" && (
                      <div className="text-sm text-gray-600">
                        Compte administrateur
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de l'utilisateur</DialogTitle>
                            <DialogDescription>
                              Informations complètes de {selectedUser?.firstName} {selectedUser?.lastName}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">Informations personnelles</h3>
                                <div className="space-y-2 text-sm">
                                  <div>Email: {selectedUser.email}</div>
                                  <div>Téléphone: {selectedUser.phone}</div>
                                  <div>Localisation: {selectedUser.location}</div>
                                  <div>Inscription: {new Date(selectedUser.registrationDate).toLocaleDateString()}</div>
                                  <div>Dernière connexion: {new Date(selectedUser.lastLogin).toLocaleDateString()}</div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">Statistiques</h3>
                                <div className="space-y-2 text-sm">
                                  <div>Rôle: {selectedUser.role}</div>
                                  <div>Statut: {selectedUser.status}</div>
                                  <div>Points: {selectedUser.totalPoints}</div>
                                  <div>Signalements: {selectedUser.totalReports}</div>
                                  <div>Résolus: {selectedUser.resolvedReports}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog open={editRoleOpen} onOpenChange={setEditRoleOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                            className="text-blue-600"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Modifier le rôle</DialogTitle>
                            <DialogDescription>
                              Changer le rôle de {selectedUser?.firstName} {selectedUser?.lastName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="role">Nouveau rôle</Label>
                              <Select defaultValue={selectedUser?.role}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="citizen">Citoyen</SelectItem>
                                  <SelectItem value="technician">Technicien</SelectItem>
                                  <SelectItem value="admin">Administrateur</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="roleComment">Commentaire</Label>
                              <Textarea 
                                id="roleComment"
                                placeholder="Raison du changement de rôle..."
                                className="mt-1"
                              />
                            </div>
                            <Button 
                              onClick={() => handleChangeRole(selectedUser?.id, 'technician', '')}
                              className="w-full"
                            >
                              Confirmer le changement
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {user.status === "active" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleChangeStatus(user.id, 'suspended')}
                          className="text-yellow-600"
                        >
                          <Ban className="h-3 w-3" />
                        </Button>
                      )}

                      {user.status === "suspended" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleChangeStatus(user.id, 'active')}
                          className="text-green-600"
                        >
                          <UserCheck className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default GestionUtilisateurs;
