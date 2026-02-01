import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, ArrowRight, Loader2 } from "lucide-react";

interface PhoneAuthProps {
  onSuccess?: () => void;
}

const PhoneAuth = ({ onSuccess }: PhoneAuthProps) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "name">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    try {
      // Format phone number with country code if not present
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      toast.success("OTP sent to your phone!");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });

      if (error) throw error;

      // Check if customer profile exists
      if (data.user) {
        const { data: customerData } = await supabase
          .from("customers")
          .select("id, name")
          .eq("user_id", data.user.id)
          .maybeSingle();

        if (!customerData) {
          // New customer - ask for name
          setStep("name");
        } else if (!customerData.name) {
          setStep("name");
        } else {
          toast.success("Welcome back!");
          onSuccess?.();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Not authenticated");

      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

      // Upsert customer profile
      const { error } = await supabase
        .from("customers")
        .upsert({
          user_id: user.id,
          name: name.trim(),
          phone: formattedPhone,
        }, {
          onConflict: "user_id",
        });

      if (error) throw error;

      toast.success("Welcome to Sri's Beauty Parlour!");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === "phone" && (
        <>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Sign In
            </h3>
            <p className="text-muted-foreground text-sm">
              Enter your phone number to receive a verification code
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-md border border-input">
                  <span className="text-muted-foreground text-sm">+91</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={isLoading || phone.length < 10}
              className="w-full gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Verify OTP
            </h3>
            <p className="text-muted-foreground text-sm">
              Enter the 6-digit code sent to +91 {phone}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>

            <button
              onClick={() => {
                setStep("phone");
                setOtp("");
              }}
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Change phone number
            </button>
          </div>
        </>
      )}

      {step === "name" && (
        <>
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Welcome!
            </h3>
            <p className="text-muted-foreground text-sm">
              Please enter your name to complete registration
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSaveName}
              disabled={isLoading || !name.trim()}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
