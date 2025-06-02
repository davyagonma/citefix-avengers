
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard, Smartphone, History, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Header from "@/components/Header";

const Paiement = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const userBalance = {
    points: 2450,
    money: 24500, // en FCFA
    conversionRate: 10 // 1 point = 10 FCFA
  };

  const transactions = [
    {
      id: "1",
      type: "gain",
      amount: 50,
      source: "Signalement validé",
      date: "2024-01-15",
      status: "completed",
      reference: "RPT-001"
    },
    {
      id: "2", 
      type: "withdrawal",
      amount: -200,
      source: "Retrait Mobile Money",
      date: "2024-01-10",
      status: "completed",
      reference: "WTH-001"
    },
    {
      id: "3",
      type: "gain",
      amount: 30,
      source: "Signalement validé",
      date: "2024-01-08",
      status: "completed",
      reference: "RPT-002"
    }
  ];

  const withdrawals = [
    {
      id: "1",
      pointsAmount: 200,
      moneyAmount: 2000,
      method: "Mobile Money MTN",
      number: "+229 XX XX XX XX",
      status: "completed",
      date: "2024-01-10",
      transactionId: "MTN-12345"
    },
    {
      id: "2",
      pointsAmount: 500,
      moneyAmount: 5000,
      method: "Mobile Money MOOV",
      number: "+229 XX XX XX XX",
      status: "pending",
      date: "2024-01-14"
    }
  ];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || !paymentMethod) return;
    
    setIsLoading(true);
    // TODO: Implement withdrawal logic
    console.log("Withdrawal request:", { withdrawAmount, paymentMethod, mobileNumber, operator });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Paiements</h1>
          <p className="text-gray-600">Gérez vos points, retraits et historiques de transactions</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Disponibles</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userBalance.points}</div>
              <p className="text-xs text-gray-600">+12% par rapport au mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valeur en FCFA</CardTitle>
              <Wallet className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userBalance.money.toLocaleString()} FCFA</div>
              <p className="text-xs text-gray-600">1 point = {userBalance.conversionRate} FCFA</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retraits en attente</CardTitle>
              <History className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">1</div>
              <p className="text-xs text-gray-600">500 points en cours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="withdraw" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="withdraw">Retirer de l'argent</TabsTrigger>
            <TabsTrigger value="transactions">Historique des transactions</TabsTrigger>
            <TabsTrigger value="withdrawals">Historique des retraits</TabsTrigger>
          </TabsList>

          <TabsContent value="withdraw" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Retrait de Points</CardTitle>
                <CardDescription>
                  Convertissez vos points en argent et effectuez un retrait
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Nombre de points à retirer</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Minimum 100 points"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="100"
                      max={userBalance.points}
                    />
                    {withdrawAmount && (
                      <p className="text-sm text-gray-600">
                        Équivaut à {parseInt(withdrawAmount) * userBalance.conversionRate} FCFA
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Méthode de paiement</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">Mobile Money MTN</SelectItem>
                        <SelectItem value="moov">Mobile Money MOOV</SelectItem>
                        <SelectItem value="bank">Virement bancaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(paymentMethod === "mtn" || paymentMethod === "moov") && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Numéro de téléphone</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+229 XX XX XX XX"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                    disabled={isLoading || !withdrawAmount || !paymentMethod}
                  >
                    {isLoading ? "Traitement..." : "Demander le retrait"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Transactions</CardTitle>
                <CardDescription>Toutes vos transactions de points</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Référence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.type === "gain" ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600 mr-2" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-600 mr-2" />
                            )}
                            {transaction.type === "gain" ? "Gain" : "Retrait"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                            {transaction.amount > 0 ? "+" : ""}{transaction.amount} points
                          </span>
                        </TableCell>
                        <TableCell>{transaction.source}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Retraits</CardTitle>
                <CardDescription>Tous vos retraits d'argent</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Montant FCFA</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal.id}>
                        <TableCell>{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
                        <TableCell>{withdrawal.pointsAmount} points</TableCell>
                        <TableCell>{withdrawal.moneyAmount.toLocaleString()} FCFA</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            {withdrawal.method}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {withdrawal.transactionId || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Paiement;
