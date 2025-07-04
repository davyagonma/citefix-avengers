import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserService, User } from "@/services/userService";
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
import { toast } from "@/hooks/use-toast";
import { Search, Eye, Edit, Ban, UserCheck, Download, Mail, Phone, Calendar, MapPin, Star, Trophy } from "lucide-react";
import Header from "@/components/Header";

// Interface pour typer les utilisateurs
// (Utilisé depuis userService)

interface FormattedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  registrationDate: string;
  lastLogin: string;
  location: string;
  totalReports: number;
  resolvedReports: number;
  totalPoints: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  speciality?: string;
  suspendedReason?: string;
  avatar?: string;
}

const GestionUtilisateurs = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<FormattedUser | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [roleComment, setRoleComment] = useState("");

  // Chargement des utilisateurs
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const usersData = await UserService.getAllUsers();

        // Validation supplémentaire
        if (!usersData || !Array.isArray(usersData)) {
          throw new Error('Les données reçues ne sont pas un tableau valide');
        }

        setUsers(usersData);
        setError(null);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(err.message);
        setUsers([]); // Réinitialise à un tableau vide
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  // Fonction pour formater les données utilisateur
  const formatUserData = (user: User): FormattedUser => ({
    id: user._id,
    firstName: user.prenom || 'Non spécifié',
    lastName: user.nom || 'Non spécifié',
    email: user.email,
    phone: user.telephone || 'Non spécifié',
    role: user.role || 'user',
    status: user.status || 'active',
    registrationDate: user.createdAt || new Date().toISOString(),
    lastLogin: user.lastLogin || new Date().toISOString(),
    location: user.adresse?.ville || 'Non spécifié',
    totalReports: user.totalReports || 0,
    resolvedReports: user.resolvedReports || 0,
    totalPoints: user.totalPoints || 0,
    emailVerified: user.emailVerified || false,
    phoneVerified: user.phoneVerified || false,
    speciality: user.specialite,
    suspendedReason: user.suspendedReason
  });

  // Gestion du changement de rôle
  const handleChangeRole = async (userId: string, newRole: string, comment: string) => {
    try {
      await UserService.changeUserRole(userId, newRole);
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast({
        title: "Succès",
        description: "Rôle utilisateur mis à jour",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour du rôle",
        variant: "destructive",
      });
    }
    setEditRoleOpen(false);
    setRoleComment("");
  };

  // Gestion du changement de statut
  const handleChangeStatus = async (userId: string, newStatus: string, reason?: string) => {
    try {
      await UserService.changeUserStatus(userId, newStatus);
      setUsers(users.map(user =>
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      toast({
        title: "Succès",
        description: "Statut utilisateur mis à jour",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour du statut",
        variant: "destructive",
      });
    }
  };

  // Fonction d'export
  const exportUsers = () => {
    const formattedUsers = users.map(formatUserData);
    const csvContent = [
      ['ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Rôle', 'Statut', 'Date inscription', 'Dernière connexion', 'Localisation'].join(','),
      ...formattedUsers.map(user => [
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.role,
        user.status,
        new Date(user.registrationDate).toLocaleDateString(),
        new Date(user.lastLogin).toLocaleDateString(),
        user.location
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'utilisateurs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Attendre que l'authentification soit vérifiée
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Vérifier les droits d'accès après le chargement de l'authentification
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-bold">Accès refusé</h2>
          <p>Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Formatage des données pour l'affichage
  const formattedUsers = users.map(formatUserData);

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

  const filteredUsers = formattedUsers.filter(user => {
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
    total: formattedUsers.length,
    active: formattedUsers.filter(u => u.status === "active").length,
    suspended: formattedUsers.filter(u => u.status === "suspended").length,
    citizens: formattedUsers.filter(u => u.role === "citizen").length,
    technicians: formattedUsers.filter(u => u.role === "technician").length,
    admins: formattedUsers.filter(u => u.role === "admin").length
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
                        <span className={`h-2 w-2 rounded-full mr-2 ${new Date(user.lastLogin).getTime() > Date.now() - 24 * 60 * 60 * 1000
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
                      <Dialog open={userDetailsOpen && selectedUser?.id === user.id} onOpenChange={setUserDetailsOpen}>
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

                      <Dialog open={editRoleOpen && selectedUser?.id === user.id} onOpenChange={setEditRoleOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setNewRole(user.role);
                            }}
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
                              <Select value={newRole} onValueChange={setNewRole}>
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
                                value={roleComment}
                                onChange={(e) => setRoleComment(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <Button
                              onClick={() => selectedUser && handleChangeRole(selectedUser.id, newRole, roleComment)}
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