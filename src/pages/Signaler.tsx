import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Upload, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createSignalement } from "../lib/api";

const Signaler = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    coordinates: { lat: "", lng: "" }
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "infrastructure", label: "Infrastructure (routes, ponts, trottoirs)" },
    { value: "eclairage", label: "Éclairage public" },
    { value: "environnement", label: "Environnement (déchets, pollution)" },
    { value: "securite", label: "Sécurité publique" },
    { value: "transport", label: "Transport public" },
    { value: "autre", label: "Autre" }
  ];

  // Récupérer l'utilisateur connecté au chargement
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoadingUser(true);
        
        // Vérifier si l'utilisateur est connecté
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentification requise",
            description: "Vous devez être connecté pour créer un signalement",
            variant: "destructive"
          });
          // Rediriger vers la page de connexion
          window.location.href = '/login';
          return;
        }

        const userData = await UserService.getCurrentUser();
        if (!userData) {
          throw new Error('Impossible de récupérer les données utilisateur');
        }

        setCurrentUser(userData);
        
        toast({
          title: "Bienvenue !",
          description: `Bonjour ${userData.prenom || 'utilisateur'}, vous pouvez maintenant créer un signalement.`,
        });

      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        
        let errorMessage = "Impossible de récupérer les données utilisateur";
        if (error.response?.status === 401) {
          errorMessage = "Session expirée - Veuillez vous reconnecter";
          window.location.href = '/login';
        }

        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > 5) {
      toast({
        title: "Limite atteinte",
        description: "Vous ne pouvez ajouter que 5 photos maximum",
        variant: "destructive"
      });
      return;
    }
    setPhotos(prev => [...prev, ...files].slice(0, 5));
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Récupération de la position",
      description: "Recherche de votre position en cours...",
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          coordinates: {
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          }
        }));
        
        toast({
          title: "Position récupérée",
          description: "Votre position a été ajoutée au signalement",
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        let errorMessage = "Impossible d'obtenir votre position";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permission de géolocalisation refusée";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Position indisponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Délai d'attente dépassé";
            break;
        }
        
        toast({
          title: "Erreur de géolocalisation",
          description: errorMessage,
          variant: "destructive"
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Erreur",
        description: "Utilisateur non connecté",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Validation des champs requis
      if (!formData.title.trim() || !formData.description.trim() || !formData.category || !formData.address.trim()) {
        toast({
          title: "Champs requis manquants",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive"
        });
        return;
      }

      // Préparation des données photos
      const photosData = photos.map(p => ({
        url: 'https://exemple.com/photo.jpg', // TODO: gérer upload réel si nécessaire
        description: ''
      }));

      // Préparation des données du signalement
      const signalementData = {
        titre: formData.title.trim(),
        description: formData.description.trim(),
        categorie: formData.category,
        localisation: {
          adresse: formData.address.trim(),
          coordonnees: formData.coordinates.lat && formData.coordinates.lng ? {
            type: 'Point',
            coordinates: [
              parseFloat(formData.coordinates.lng),
              parseFloat(formData.coordinates.lat)
            ]
          } : undefined
        },
        signalePar: currentUser._id || currentUser.id, // Utiliser l'ID de l'utilisateur connecté
        photos: photosData
      };

      await createSignalement(signalementData);

      toast({
        title: "Signalement créé avec succès",
        description: "Votre signalement a été enregistré et sera traité prochainement",
      });

      // Réinitialiser le formulaire
      setFormData({
        title: "",
        description: "",
        category: "",
        address: "",
        coordinates: { lat: "", lng: "" }
      });
      setPhotos([]);

    } catch (err: any) {
      console.error('Erreur lors de la création du signalement:', err);
      
      let errorMessage = "Une erreur est survenue lors de la création du signalement";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant le chargement des données utilisateur
  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Signaler un{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                problème
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Contribuez à améliorer votre ville en signalant les problèmes urbains
            </p>
            {currentUser && (
              <p className="text-sm text-gray-500 mt-2">
                Connecté en tant que {currentUser.prenom} {currentUser.nom}
              </p>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Nouveau signalement</span>
              </CardTitle>
              <CardDescription>
                Décrivez le problème avec le maximum de détails pour faciliter sa résolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du problème *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Nid de poule sur la route principale"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le problème, son impact, et toute information utile..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse ou localisation *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="address"
                      placeholder="Ex: Carrefour des Trois-Banques, Cotonou"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      className="flex-shrink-0"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.coordinates.lat && formData.coordinates.lng && (
                    <p className="text-sm text-gray-500">
                      Position: {formData.coordinates.lat}, {formData.coordinates.lng}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Photos (optionnel, max 5)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {photos.length < 5 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Ajouter</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  disabled={isLoading || !currentUser}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer le signalement"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signaler;