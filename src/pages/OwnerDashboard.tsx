import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Users, 
  Receipt, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Loader2,
  Phone,
  Calendar,
} from "lucide-react";

const PREDEFINED_SERVICES = [
  "Haircut",
  "Hair Coloring",
  "Hair Straightening",
  "Hair Spa",
  "Facial",
  "Cleanup",
  "Threading",
  "Waxing",
  "Manicure",
  "Pedicure",
  "Bridal Makeup",
  "Party Makeup",
  "Mehendi",
  "Head Massage",
  "Other",
];

interface Customer {
  id: string;
  user_id: string;
  name: string | null;
  phone: string;
  email: string | null;
  created_at: string;
}

interface BillItem {
  service: string;
  amount: number;
}

interface Bill {
  id: string;
  customer_id: string;
  items: BillItem[];
  total_amount: number;
  notes: string | null;
  bill_date: string;
  created_at: string;
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isOwner } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [billDialogOpen, setBillDialogOpen] = useState(false);
  const [billItems, setBillItems] = useState<BillItem[]>([{ service: "", amount: 0 }]);
  const [billNotes, setBillNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isOwner)) {
      navigate("/");
    }
  }, [user, isOwner, authLoading, navigate]);

  useEffect(() => {
    if (isOwner) {
      fetchCustomers();
    }
  }, [isOwner]);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBillItem = () => {
    setBillItems([...billItems, { service: "", amount: 0 }]);
  };

  const handleRemoveBillItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const handleBillItemChange = (index: number, field: keyof BillItem, value: string | number) => {
    const newItems = [...billItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setBillItems(newItems);
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const handleGenerateBill = async () => {
    if (!selectedCustomer) return;

    const validItems = billItems.filter(item => item.service && item.amount > 0);
    if (validItems.length === 0) {
      toast.error("Please add at least one service with amount");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from("bills").insert([{
        customer_id: selectedCustomer.id,
        items: validItems as unknown as Json,
        total_amount: calculateTotal(),
        notes: billNotes || null,
      }]);

      if (error) throw error;

      toast.success("Bill generated successfully!");
      setBillDialogOpen(false);
      setBillItems([{ service: "", amount: 0 }]);
      setBillNotes("");
      setSelectedCustomer(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to generate bill");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isOwner) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Owner Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{customers.length} Customers</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Registered Customers
            </h2>
          </div>

          {customers.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No customers have signed up yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.name || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(customer.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog open={billDialogOpen && selectedCustomer?.id === customer.id} onOpenChange={(open) => {
                        setBillDialogOpen(open);
                        if (!open) {
                          setSelectedCustomer(null);
                          setBillItems([{ service: "", amount: 0 }]);
                          setBillNotes("");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                            className="gap-2"
                          >
                            <Receipt className="w-4 h-4" />
                            Generate Bill
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="font-serif">
                              Generate Bill for {customer.name || customer.phone}
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6 py-4">
                            {/* Bill Items */}
                            <div className="space-y-4">
                              <Label>Services</Label>
                              {billItems.map((item, index) => (
                                <div key={index} className="flex gap-2 items-start">
                                  <div className="flex-1 space-y-1">
                                    <Select
                                      value={PREDEFINED_SERVICES.includes(item.service) ? item.service : item.service ? "Other" : ""}
                                      onValueChange={(val) => {
                                        if (val === "Other") {
                                          handleBillItemChange(index, "service", "");
                                        } else {
                                          handleBillItemChange(index, "service", val);
                                        }
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select service" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {PREDEFINED_SERVICES.map((s) => (
                                          <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    {!PREDEFINED_SERVICES.includes(item.service) && item.service !== "" && (
                                      <Input
                                        placeholder="Custom service name"
                                        value={item.service}
                                        onChange={(e) => handleBillItemChange(index, "service", e.target.value)}
                                      />
                                    )}
                                    {PREDEFINED_SERVICES.includes("Other") && !PREDEFINED_SERVICES.includes(item.service) && item.service === "" && (
                                      <Input
                                        placeholder="Enter custom service name"
                                        onChange={(e) => handleBillItemChange(index, "service", e.target.value)}
                                      />
                                    )}
                                  </div>
                                  <Input
                                    type="number"
                                    placeholder="₹ Amount"
                                    value={item.amount || ""}
                                    onChange={(e) => handleBillItemChange(index, "amount", parseFloat(e.target.value) || 0)}
                                    className="w-28"
                                  />
                                  {billItems.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveBillItem(index)}
                                      className="mt-1"
                                    >
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddBillItem}
                                className="gap-2"
                              >
                                <Plus className="w-4 h-4" />
                                Add Service
                              </Button>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Any additional notes..."
                                value={billNotes}
                                onChange={(e) => setBillNotes(e.target.value)}
                              />
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <span className="font-medium">Total Amount</span>
                              <span className="font-serif text-2xl font-bold text-primary">
                                ₹{calculateTotal().toLocaleString()}
                              </span>
                            </div>

                            {/* Actions */}
                            <Button
                              onClick={handleGenerateBill}
                              disabled={isSaving}
                              className="w-full gap-2"
                            >
                              {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Receipt className="w-4 h-4" />
                                  Generate Bill
                                </>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
