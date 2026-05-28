import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";

const DISMISS_KEY = "sris_signin_prompt_dismissed_at";
const SNOOZE_MS = 1000 * 60 * 60 * 24; // 24h

const SignInPrompt = () => {
  const { user, isLoading } = useAuth();
  const [visible, setVisible] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (isLoading || user) return;
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - dismissedAt < SNOOZE_MS) return;
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, [user, isLoading]);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (user || !visible) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-40 max-w-sm sm:max-w-xs mx-auto sm:mx-0 animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="relative bg-card/95 backdrop-blur-md border border-primary/20 rounded-2xl shadow-xl p-4 sm:p-5">
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 pr-4">
              <p className="font-serif text-base font-semibold text-foreground leading-tight">
                Welcome to Sri's
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Sign in to save your visits, view bills, and get personalised offers.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setAuthOpen(true)}
                >
                  Sign in
                </Button>
                <button
                  onClick={dismiss}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        trigger={<span className="hidden" />}
      />
    </>
  );
};

export default SignInPrompt;