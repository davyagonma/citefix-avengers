import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSignalementById, deleteSignalement } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignalementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await fetchSignalementById(id!);
        setReport(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Impossible de charger le signalement");
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Voulez-vous vraiment supprimer ce signalement ?")) {
      try {
        await deleteSignalement(id!);
        alert("Signalement supprimé avec succès");
        navigate("/admin/signalements");
      } catch (err: any) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Retour
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => navigate(`/edit-signalement/${report._id}`)}>
                Modifier
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Supprimer
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">{report.titre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">{report.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4" />
                {report.localisation?.adresse}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4" />
                {new Date(report.createdAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2 mb-4">
                <Badge variant="outline">{report.categorie}</Badge>
                <Badge variant="outline">{report.priorite}</Badge>
                <Badge variant="outline">{report.statut}</Badge>
              </div>

              {report.photos?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report.photos.map((p: any, i: number) => (
                    <img
                      key={i}
                      src={p.url}
                      alt={p.description || `Photo ${i + 1}`}
                      className="rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignalementDetail;
