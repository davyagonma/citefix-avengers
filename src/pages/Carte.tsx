
// Add Leaflet type to window for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 
import { MapPin, Search, Filter, Camera, Clock, CheckCircle, Navigation, Plus, Trash2, Copy, Download } from "lucide-react";
import { useRef } from "react";

const Carte = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [newMarkerTitle, setNewMarkerTitle] = useState("");
  const [newMarkerCategory, setNewMarkerCategory] = useState("infrastructure");
  const mapRef = useRef(null);

  // Mock data for reports with real Benin coordinates
  const mockReports = [
    // Infrastructure
    {
      id: 1,
      title: "Nid de poule dangereux",
      category: "infrastructure",
      status: "pending",
      location: "Carrefour Dantokpa",
      date: "2024-01-15",
      priority: "high",
      coordinates: [6.3703, 2.4188] // Cotonou
    },
    {
      id: 4,
      title: "Route endommagée",
      category: "infrastructure",
      status: "pending",
      location: "Porto-Novo Centre",
      date: "2024-01-12",
      priority: "high",
      coordinates: [6.4969, 2.6289] // Porto-Novo
    },
    {
      id: 12,
      title: "Pont détérioré",
      category: "infrastructure",
      status: "in_progress",
      location: "Pont de Cotonou",
      date: "2024-01-10",
      priority: "high",
      coordinates: [6.3651, 2.4219]
    },
    {
      id: 18,
      title: "Chaussée défoncée",
      category: "infrastructure",
      status: "pending",
      location: "Abomey-Calavi",
      date: "2024-01-08",
      priority: "medium",
      coordinates: [6.4482, 2.3563]
    },
    {
      id: 24,
      title: "Trottoir dangereux",
      category: "infrastructure",
      status: "resolved",
      location: "Ganvié",
      date: "2024-01-05",
      priority: "low",
      coordinates: [6.4556, 2.4167]
    },
    
    // Éclairage
    {
      id: 2,
      title: "Éclairage défaillant",
      category: "eclairage",
      status: "in_progress",
      location: "Boulevard de la Marina",
      date: "2024-01-14",
      priority: "medium",
      coordinates: [6.3654, 2.4183]
    },
    {
      id: 8,
      title: "Lampadaires éteints",
      category: "eclairage",
      status: "pending",
      location: "Rue Bayol",
      date: "2024-01-11",
      priority: "medium",
      coordinates: [6.3625, 2.4275]
    },
    {
      id: 13,
      title: "Éclairage public défectueux",
      category: "eclairage",
      status: "pending",
      location: "Ouidah Centre",
      date: "2024-01-09",
      priority: "medium",
      coordinates: [6.3622, 2.0852]
    },
    {
      id: 19,
      title: "Ampoules grillées",
      category: "eclairage",
      status: "resolved",
      location: "Allada",
      date: "2024-01-07",
      priority: "low",
      coordinates: [6.6651, 2.1514]
    },
    {
      id: 25,
      title: "Absence d'éclairage",
      category: "eclairage",
      status: "pending",
      location: "Bohicon",
      date: "2024-01-04",
      priority: "high",
      coordinates: [7.1781, 2.0667]
    },
    
    // Environnement
    {
      id: 3,
      title: "Dépôt d'ordures sauvage",
      category: "environnement",
      status: "resolved",
      location: "Quartier Gbegamey",
      date: "2024-01-13",
      priority: "low",
      coordinates: [6.3598, 2.4281]
    },
    {
      id: 5,
      title: "Problème d'eau",
      category: "environnement",
      status: "in_progress",
      location: "Parakou",
      date: "2024-01-11",
      priority: "medium",
      coordinates: [9.3370, 2.6308] // Parakou
    },
    {
      id: 9,
      title: "Caniveaux bouchés",
      category: "environnement",
      status: "pending",
      location: "Quartier Sikè",
      date: "2024-01-10",
      priority: "high",
      coordinates: [6.3587, 2.4156]
    },
    {
      id: 14,
      title: "Pollution de l'air",
      category: "environnement",
      status: "in_progress",
      location: "Zone industrielle",
      date: "2024-01-08",
      priority: "high",
      coordinates: [6.3745, 2.4298]
    },
    {
      id: 20,
      title: "Décharge sauvage",
      category: "environnement",
      status: "pending",
      location: "Sèmè-Podji",
      date: "2024-01-06",
      priority: "medium",
      coordinates: [6.3967, 2.7000]
    },
    {
      id: 26,
      title: "Égouts à ciel ouvert",
      category: "environnement",
      status: "pending",
      location: "Adjarra",
      date: "2024-01-03",
      priority: "high",
      coordinates: [6.4608, 2.6431]
    },
    
    // Sécurité
    {
      id: 6,
      title: "Éclairage insuffisant - zone dangereuse",
      category: "securite",
      status: "pending",
      location: "Marché Dantokpa",
      date: "2024-01-12",
      priority: "high",
      coordinates: [6.3689, 2.4203]
    },
    {
      id: 10,
      title: "Barrière de sécurité manquante",
      category: "securite",
      status: "in_progress",
      location: "Pont de l'Ouémé",
      date: "2024-01-09",
      priority: "high",
      coordinates: [6.4975, 2.6250]
    },
    {
      id: 15,
      title: "Panneau de signalisation absent",
      category: "securite",
      status: "pending",
      location: "Carrefour Godomey",
      date: "2024-01-07",
      priority: "medium",
      coordinates: [6.3833, 2.3833]
    },
    {
      id: 21,
      title: "Feux de signalisation défaillants",
      category: "securite",
      status: "resolved",
      location: "Carrefour Agla",
      date: "2024-01-05",
      priority: "high",
      coordinates: [6.3456, 2.4123]
    },
    {
      id: 27,
      title: "Zone non sécurisée",
      category: "securite",
      status: "pending",
      location: "Natitingou",
      date: "2024-01-02",
      priority: "medium",
      coordinates: [10.3167, 1.3833]
    },
    
    // Transport
    {
      id: 7,
      title: "Arrêt de bus détérioré",
      category: "transport",
      status: "pending",
      location: "Station Etoile Rouge",
      date: "2024-01-11",
      priority: "medium",
      coordinates: [6.3612, 2.4167]
    },
    {
      id: 11,
      title: "Embouteillage récurrent",
      category: "transport",
      status: "in_progress",
      location: "Carrefour Jéricho",
      date: "2024-01-09",
      priority: "medium",
      coordinates: [6.3778, 2.4089]
    },
    {
      id: 16,
      title: "Panne de transport en commun",
      category: "transport",
      status: "resolved",
      location: "Gare routière",
      date: "2024-01-06",
      priority: "low",
      coordinates: [6.3634, 2.4201]
    },
    {
      id: 22,
      title: "Stationnement anarchique",
      category: "transport",
      status: "pending",
      location: "Marché Ganhi",
      date: "2024-01-04",
      priority: "medium",
      coordinates: [6.3567, 2.4134]
    },
    {
      id: 28,
      title: "Route impraticable",
      category: "transport",
      status: "pending",
      location: "Savè",
      date: "2024-01-01",
      priority: "high",
      coordinates: [7.9333, 2.6833]
    },
    
    // Données supplémentaires
    {
      id: 17,
      title: "Coupure d'électricité fréquente",
      category: "eclairage",
      status: "in_progress",
      location: "Kandi",
      date: "2024-01-06",
      priority: "medium",
      coordinates: [11.1342, 2.9386]
    },
    {
      id: 23,
      title: "Pollution sonore",
      category: "environnement",
      status: "pending",
      location: "Akpakpa",
      date: "2024-01-04",
      priority: "low",
      coordinates: [6.3456, 2.4345]
    },
    {
      id: 29,
      title: "Circulation dangereuse",
      category: "transport",
      status: "pending",
      location: "Djougou",
      date: "2023-12-30",
      priority: "high",
      coordinates: [9.7081, 1.6661]
    },
    {
      id: 30,
      title: "Insécurité routière",
      category: "securite",
      status: "in_progress",
      location: "Lokossa",
      date: "2023-12-29",
      priority: "high",
      coordinates: [6.6389, 1.7167]
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

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet CSS and JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    script.onload = () => {
      // Initialize map centered on Benin
      const mapInstance = window.L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      }).setView([9.30769, 2.315834], 7);
      
      // Add multiple tile layers for professional look
      const osmLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      });
      
      const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      });
      
      const terrainLayer = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
      });

      // Add default layer
      osmLayer.addTo(mapInstance);
      
      // Add layer control
      const baseMaps = {
        "Plan": osmLayer,
        "Satellite": satelliteLayer,
        "Terrain": terrainLayer
      };
      
      window.L.control.layers(baseMaps).addTo(mapInstance);
      
      // Add scale control
      window.L.control.scale({
        position: 'bottomright',
        imperial: false,
        metric: true
      }).addTo(mapInstance);
      
      // Custom zoom control
      mapInstance.zoomControl.setPosition('topright');
      
      // Add fullscreen button
      const fullscreenButton = window.L.control({position: 'topright'});
      fullscreenButton.onAdd = function(map) {
        const div = window.L.DomUtil.create('div', 'leaflet-control-fullscreen');
        div.innerHTML = '<button style="width: 30px; height: 30px; background: white; border: 2px solid rgba(0,0,0,0.2); border-radius: 4px; cursor: pointer; font-size: 18px;">⛶</button>';
        div.onclick = function() {
          if (mapRef.current.requestFullscreen) {
            mapRef.current.requestFullscreen();
          }
        };
        return div;
      };
      fullscreenButton.addTo(mapInstance);

      // Add click handler for adding markers
      mapInstance.on('click', (e) => {
        if (isAddingMarker) {
          setSelectedCoordinates([e.latlng.lat, e.latlng.lng]);
        }
      });

      // Add location marker on map click when not adding markers
      mapInstance.on('click', (e) => {
        if (!isAddingMarker) {
          setSelectedCoordinates([e.latlng.lat, e.latlng.lng]);
        }
      });

      setMap(mapInstance);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [isAddingMarker]);

  // Add markers to map
  useEffect(() => {
    if (!map || !window.L) return;

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    
    const newMarkers = [];
    
    // Add mock report markers with custom icons
    mockReports.forEach(report => {
      const color = getCategoryColor(report.category);
      const icon = getCategoryIcon(report.category);
      
      // Create custom marker with better styling
      const marker = window.L.circleMarker(report.coordinates, {
        radius: 10,
        fillColor: color,
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
        className: 'custom-marker'
      }).addTo(map);
      
      // Add pulsing effect for pending high priority items
      if (report.status === 'pending' && report.priority === 'high') {
        marker.setStyle({
          className: 'custom-marker pulsing'
        });
      }
      
      // Enhanced popup with better styling
      const popupContent = `
        <div style="min-width: 200px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="width: 12px; height: 12px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
            <strong style="font-size: 14px; color: #1f2937;">${report.title}</strong>
          </div>
          <div style="margin-bottom: 6px;">
            <span style="font-size: 12px; color: #6b7280;">📍 ${report.location}</span>
          </div>
          <div style="margin-bottom: 6px;">
            <span style="font-size: 12px; color: #6b7280;">📅 ${new Date(report.date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div style="margin-bottom: 6px;">
            <span style="font-size: 12px; color: #6b7280;">🎯 Priorité: ${report.priority === 'high' ? 'Haute' : report.priority === 'medium' ? 'Moyenne' : 'Basse'}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-size: 11px; color: #9ca3af;">Coordonnées: ${report.coordinates[0].toFixed(6)}, ${report.coordinates[1].toFixed(6)}</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <span style="font-size: 10px; padding: 2px 6px; background: ${getStatusColor(report.status)}; color: white; border-radius: 10px;">
              ${getStatusLabel(report.status)}
            </span>
            <span style="font-size: 10px; padding: 2px 6px; background: ${color}; color: white; border-radius: 10px;">
              ${getCategoryLabel(report.category)}
            </span>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });
      
      newMarkers.push(marker);
    });
    
    // Add custom CSS for markers
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-marker {
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      }
      .custom-marker:hover {
        transform: scale(1.2);
      }
      .pulsing {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);
    
    setMarkers(newMarkers);
  }, [map, mockReports]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "infrastructure": return "#ef4444";
      case "eclairage": return "#eab308";
      case "environnement": return "#22c55e";
      case "securite": return "#f97316";
      case "transport": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "infrastructure": return "🚧";
      case "eclairage": return "💡";
      case "environnement": return "🌱";
      case "securite": return "🛡️";
      case "transport": return "🚌";
      default: return "📍";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#eab308";
      case "in_progress": return "#3b82f6";
      case "resolved": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending": return "En attente";
      case "in_progress": return "En cours";
      case "resolved": return "Résolu";
      default: return "Inconnu";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "infrastructure": return "Infrastructure";
      case "eclairage": return "Éclairage";
      case "environnement": return "Environnement";
      case "securite": return "Sécurité";
      case "transport": return "Transport";
      default: return "Autre";
    }
  };

  const getStatusBadge = (status) => {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "border-red-500";
      case "medium": return "border-yellow-500";
      case "low": return "border-green-500";
      default: return "border-gray-300";
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedCoordinates([latitude, longitude]);
          if (map) {
            map.setView([latitude, longitude], 15);
          }
        },
        (error) => {
          alert("Impossible d'obtenir votre position actuelle");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
    }
  };

  const handleAddMarker = () => {
    if (!selectedCoordinates || !newMarkerTitle.trim()) return;

    const newReport = {
      id: Date.now(),
      title: newMarkerTitle,
      category: newMarkerCategory,
      status: "pending",
      location: `${selectedCoordinates[0].toFixed(6)}, ${selectedCoordinates[1].toFixed(6)}`,
      date: new Date().toISOString().split('T')[0],
      priority: "medium",
      coordinates: selectedCoordinates
    };

    // Add marker to map
    if (map && window.L) {
      const color = getCategoryColor(newMarkerCategory);
      const marker = window.L.circleMarker(selectedCoordinates, {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-2">
          <h4 class="font-semibold">${newReport.title}</h4>
          <p class="text-sm text-gray-600">${newReport.location}</p>
          <p class="text-xs text-gray-500">${new Date(newReport.date).toLocaleDateString('fr-FR')}</p>
          <p class="text-xs"><strong>Coordonnées:</strong> ${selectedCoordinates[0].toFixed(6)}, ${selectedCoordinates[1].toFixed(6)}</p>
        </div>
      `);
      
      setMarkers([...markers, marker]);
    }

    // Reset form
    setNewMarkerTitle("");
    setSelectedCoordinates(null);
    setIsAddingMarker(false);
  };

  const copyCoordinates = () => {
    if (selectedCoordinates) {
      navigator.clipboard.writeText(`${selectedCoordinates[0].toFixed(6)}, ${selectedCoordinates[1].toFixed(6)}`);
      alert("Coordonnées copiées dans le presse-papiers !");
    }
  };

  const exportData = () => {
    const data = {
      reports: mockReports,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signalements_benin.json';
    a.click();
    URL.revokeObjectURL(url);
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
          {/* Filters and Controls */}
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

            {/* Map Controls */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Contrôles de la carte
                </h3>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleGetCurrentLocation}
                    className="w-full"
                    variant="outline"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Ma position
                  </Button>
                  
                  <Button 
                    onClick={() => setIsAddingMarker(!isAddingMarker)}
                    className="w-full"
                    variant={isAddingMarker ? "destructive" : "default"}
                  >
                    {isAddingMarker ? <Trash2 className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                    {isAddingMarker ? "Annuler" : "Ajouter marqueur"}
                  </Button>
                  
                  <Button 
                    onClick={exportData}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exporter données
                  </Button>
                </div>

                {isAddingMarker && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-3">
                      Cliquez sur la carte pour sélectionner une position
                    </p>
                    
                    <Input
                      placeholder="Titre du signalement"
                      value={newMarkerTitle}
                      onChange={(e) => setNewMarkerTitle(e.target.value)}
                      className="mb-3"
                    />
                    
                    <select
                      value={newMarkerCategory}
                      onChange={(e) => setNewMarkerCategory(e.target.value)}
                      className="w-full p-2 border rounded-lg mb-3"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    
                    {selectedCoordinates && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Coordonnées:</span>
                          <Button size="sm" variant="outline" onClick={copyCoordinates}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                          {selectedCoordinates[0].toFixed(6)}, {selectedCoordinates[1].toFixed(6)}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleAddMarker}
                      disabled={!selectedCoordinates || !newMarkerTitle.trim()}
                      className="w-full"
                    >
                      Confirmer
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Statistiques</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total signalements</span>
                    <span className="font-semibold">{mockReports.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En cours</span>
                    <span className="font-semibold text-blue-600">
                      {mockReports.filter(r => r.status === 'in_progress').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Résolus</span>
                    <span className="font-semibold text-green-600">
                      {mockReports.filter(r => r.status === 'resolved').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Reports */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="relative">
                  <div 
                    ref={mapRef} 
                    className="h-96 w-full rounded-lg"
                    style={{ minHeight: '500px' }}
                  />
                  
                  {/* Map legend */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                    <h4 className="font-semibold text-sm mb-2">Légende</h4>
                    <div className="space-y-1">
                      {categories.slice(1).map((category) => (
                        <div key={category.value} className="flex items-center space-x-2 text-xs">
                          <div 
                            className="w-3 h-3 rounded-full border-2 border-white" 
                            style={{ backgroundColor: getCategoryColor(category.value) }}
                          ></div>
                          <span>{category.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Coordinates display */}
                  {selectedCoordinates && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-mono">
                          {selectedCoordinates[0].toFixed(6)}, {selectedCoordinates[1].toFixed(6)}
                        </span>
                        <Button size="sm" variant="outline" onClick={copyCoordinates}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Signalements récents ({filteredReports.length})
              </h3>
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
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (map) {
                              map.setView(report.coordinates, 15);
                            }
                          }}
                        >
                          Localiser
                        </Button>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
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

