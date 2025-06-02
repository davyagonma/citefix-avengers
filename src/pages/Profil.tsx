
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Bell, Shield, Camera, Award, Star } from "lucide-react";
import Header from "@/components/Header";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+229 12 34 56 78",
    address: "Cotonou, Littoral, Bénin",
    bio: "Citoyen engagé pour l'amélioration de ma ville"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reportUpdates: true,
    newsletter: false
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  // Mock user stats
  const userStats = {
    totalReports: 23,
    resolvedReports: 18,
    totalPoints: 2450,
    rank: "Citoyen Actif",
    joinDate: "2023-06-15",
    lastActivity: "2024-01-15"
  };

  const achievements = [
    { id: 1, name: "Premier Signalement", description: "Votre premier signalement validé", earned: true, date: "2023-06-20" },
    { id: 2, name: "Citoyen Régulier", description: "10 signalements validés", earned: true, date: "2023-09-15" },
    { id: 3, name: "Expert Local", description: "25 signalements validés", earned: false },
    { id: 4, name: "Champion de la Ville", description: "50 signalements validés", earned: false }
  ];

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const handleSecurityChange = (setting: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [setting]: value }));
  };

  const saveProfile = async () => {
    // TODO: Implement profile update API call
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-xl">{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                    variant="secondary"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                <CardTitle>{profileData.firstName} {profileData.lastName}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <Badge className="bg-blue-100 text-blue-800">{userStats.rank}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalReports}</div>
                    <div className="text-sm text-gray-600">Signalements</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{userStats.totalPoints}</div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    Membre depuis {new Date(userStats.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2" />
                    Dernière activité {new Date(userStats.lastActivity).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personnel</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="achievements">Récompenses</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informations Personnelles</CardTitle>
                      <CardDescription>Gérez vos données personnelles</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                    >
                      {isEditing ? "Sauvegarder" : "Modifier"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileUpdate("email", e.target.value)}
                          disabled={!isEditing}
                          className="flex-1"
                        />
                        <Badge className="ml-2 bg-green-100 text-green-800">Vérifié</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleProfileUpdate("address", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                        disabled={!isEditing}
                        placeholder="Parlez-nous de vous..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de Notification</CardTitle>
                    <CardDescription>Choisissez comment vous souhaitez être informé</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Notifications par email
                        </div>
                        <div className="text-sm text-gray-600">Recevoir les mises à jour par email</div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Notifications SMS
                        </div>
                        <div className="text-sm text-gray-600">Recevoir les alertes importantes par SMS</div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications push
                        </div>
                        <div className="text-sm text-gray-600">Notifications dans l'application</div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Mises à jour des signalements</div>
                        <div className="text-sm text-gray-600">Notifications sur le statut de vos signalements</div>
                      </div>
                      <Switch
                        checked={notifications.reportUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("reportUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Newsletter</div>
                        <div className="text-sm text-gray-600">Recevoir la newsletter CitéFix</div>
                      </div>
                      <Switch
                        checked={notifications.newsletter}
                        onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de Sécurité</CardTitle>
                    <CardDescription>Protégez votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Authentification à deux facteurs
                        </div>
                        <div className="text-sm text-gray-600">Sécurité renforcée pour votre compte</div>
                      </div>
                      <Switch
                        checked={security.twoFactor}
                        onCheckedChange={(checked) => handleSecurityChange("twoFactor", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Alertes de connexion</div>
                        <div className="text-sm text-gray-600">Être notifié des nouvelles connexions</div>
                      </div>
                      <Switch
                        checked={security.loginAlerts}
                        onCheckedChange={(checked) => handleSecurityChange("loginAlerts", checked)}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        Changer le mot de passe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Récompenses et Badges</CardTitle>
                    <CardDescription>Vos accomplissements en tant que citoyen actif</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border ${
                            achievement.earned 
                              ? "bg-blue-50 border-blue-200" 
                              : "bg-gray-50 border-gray-200 opacity-60"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <Award className={`h-6 w-6 mr-3 ${
                              achievement.earned ? "text-blue-600" : "text-gray-400"
                            }`} />
                            <div>
                              <div className="font-semibold">{achievement.name}</div>
                              {achievement.earned && achievement.date && (
                                <div className="text-sm text-gray-600">
                                  Obtenu le {new Date(achievement.date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
