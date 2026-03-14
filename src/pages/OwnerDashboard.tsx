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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import jsPDF from "jspdf";
import {
  Users,
  Receipt,
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  Phone,
  Calendar,
  Pencil,
  Download,
  UserPlus,
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
  user_id: string | null;
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

  // Add customer state
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  // Edit customer state
  const [editCustomerId, setEditCustomerId] = useState<string | null>(null);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isOwner)) {
      navigate("/");
    }
  }, [user, isOwner, authLoading, navigate]);

  useEffect(() => {
    if (isOwner) {
      fetchCustomers();
      fetchBills();
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

  const fetchBills = async () => {
    try {
      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .order("bill_date", { ascending: false });

      if (error) throw error;
      setBills((data || []).map((b: any) => ({ ...b, items: b.items as BillItem[] })));
    } catch (error: any) {
      toast.error("Failed to fetch bills");
    }
  };

  // Add customer
  const handleAddCustomer = async () => {
    if (!newCustomerPhone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    setIsAddingCustomer(true);
    try {
      const { error } = await supabase.from("customers").insert([{
        name: newCustomerName.trim() || null,
        phone: newCustomerPhone.trim(),
        email: newCustomerEmail.trim() || null,
      }]);
      if (error) throw error;
      toast.success("Customer added!");
      setAddCustomerOpen(false);
      setNewCustomerName("");
      setNewCustomerPhone("");
      setNewCustomerEmail("");
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || "Failed to add customer");
    } finally {
      setIsAddingCustomer(false);
    }
  };

  // Edit customer name
  const handleEditCustomer = async () => {
    if (!editCustomerId) return;
    setIsEditingCustomer(true);
    try {
      const { error } = await supabase
        .from("customers")
        .update({ name: editCustomerName.trim() || null })
        .eq("id", editCustomerId);
      if (error) throw error;
      toast.success("Customer updated!");
      setEditDialogOpen(false);
      setEditCustomerId(null);
      setEditCustomerName("");
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update customer");
    } finally {
      setIsEditingCustomer(false);
    }
  };

  // Bill helpers
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
      fetchBills();
    } catch (error: any) {
      toast.error(error.message || "Failed to generate bill");
    } finally {
      setIsSaving(false);
    }
  };

  // Download bill as PDF
  const handleDownloadBill = (bill: Bill) => {
    const customer = customers.find(c => c.id === bill.customer_id);
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Sri's Beauty Parlour", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Invoice / Bill", 105, 28, { align: "center" });

    // Divider
    doc.setDrawColor(200, 150, 180);
    doc.setLineWidth(0.5);
    doc.line(20, 33, 190, 33);

    // Bill info
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Customer:", 20, 42);
    doc.setFont("helvetica", "normal");
    doc.text(customer?.name || customer?.phone || "Unknown", 55, 42);

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(customer?.phone || "—", 55, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Date:", 130, 42);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(bill.bill_date).toLocaleDateString(), 150, 42);

    // Table header
    let y = 65;
    doc.setFillColor(245, 230, 240);
    doc.rect(20, y - 6, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("#", 25, y);
    doc.text("Service", 35, y);
    doc.text("Amount (₹)", 160, y, { align: "right" });

    // Table rows
    doc.setFont("helvetica", "normal");
    y += 10;
    bill.items.forEach((item, i) => {
      doc.text(`${i + 1}`, 25, y);
      doc.text(item.service, 35, y);
      doc.text(`₹${Number(item.amount).toLocaleString()}`, 160, y, { align: "right" });
      y += 8;
    });

    // Total
    y += 4;
    doc.setDrawColor(200, 150, 180);
    doc.line(20, y - 4, 190, y - 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Total:", 120, y + 2);
    doc.text(`₹${Number(bill.total_amount).toLocaleString()}`, 160, y + 2, { align: "right" });

    // Notes
    if (bill.notes) {
      y += 16;
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(`Notes: ${bill.notes}`, 20, y);
    }

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    doc.text("Thank you for choosing Sri's Beauty Parlour!", 105, 280, { align: "center" });

    const fileName = `bill-${customer?.name || customer?.phone || "customer"}-${new Date(bill.bill_date).toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Owner Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>{customers.length} Customers</span>
            </div>

            {/* Add Customer Button */}
            <Dialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif">Add New Customer</DialogTitle>
                  <DialogDescription>Enter customer details below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cust-name">Name</Label>
                    <Input
                      id="cust-name"
                      placeholder="Customer name"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-phone">Phone *</Label>
                    <Input
                      id="cust-phone"
                      placeholder="Phone number"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-email">Email</Label>
                    <Input
                      id="cust-email"
                      type="email"
                      placeholder="Email (optional)"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddCustomer}
                    disabled={isAddingCustomer}
                    className="w-full gap-2"
                  >
                    {isAddingCustomer ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Add Customer
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
              <p>No customers yet. Add one above!</p>
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
                      <div className="flex items-center gap-2">
                        {customer.name || "—"}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setEditCustomerId(customer.id);
                            setEditCustomerName(customer.name || "");
                            setEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-3 h-3 text-muted-foreground" />
                        </Button>
                      </div>
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
                            <DialogDescription>Add services and amounts below.</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 py-4">
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
                                    {!PREDEFINED_SERVICES.includes(item.service) && item.service === "" && (
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
                              <Button variant="outline" size="sm" onClick={handleAddBillItem} className="gap-2">
                                <Plus className="w-4 h-4" />
                                Add Service
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Any additional notes..."
                                value={billNotes}
                                onChange={(e) => setBillNotes(e.target.value)}
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <span className="font-medium">Total Amount</span>
                              <span className="font-serif text-2xl font-bold text-primary">
                                ₹{calculateTotal().toLocaleString()}
                              </span>
                            </div>

                            <Button onClick={handleGenerateBill} disabled={isSaving} className="w-full gap-2">
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

        {/* Bills History */}
        <div className="bg-card rounded-lg border border-border overflow-hidden mt-8">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Generated Bills
            </h2>
          </div>

          {bills.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No bills generated yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => {
                  const customer = customers.find(c => c.id === bill.customer_id);
                  return (
                    <TableRow key={bill.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(bill.bill_date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer?.name || customer?.phone || "Unknown"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {bill.items.map((item, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                              {item.service} — ₹{item.amount}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {bill.notes || "—"}
                      </TableCell>
                      <TableCell className="text-right font-serif font-bold text-primary">
                        ₹{Number(bill.total_amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownloadBill(bill)}
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      {/* Edit Customer Name Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) {
          setEditCustomerId(null);
          setEditCustomerName("");
        }
      }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit Customer Name</DialogTitle>
            <DialogDescription>Update the customer's name below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="Customer name"
                value={editCustomerName}
                onChange={(e) => setEditCustomerName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleEditCustomer}
              disabled={isEditingCustomer}
              className="w-full gap-2"
            >
              {isEditingCustomer ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Pencil className="w-4 h-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerDashboard;
