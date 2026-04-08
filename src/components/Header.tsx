import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import logo from "@/assets/sris-logo-only.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { user, isOwner, signOut, isLoading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Reviews", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const renderAuth = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              {isOwner ? "Owner" : "Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isOwner && (
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
      />
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/95 backdrop-blur-md shadow-md' : 'bg-card/80 backdrop-blur-md'} border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Sri's Beauty Parlour Logo"
            className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 object-contain"
          />
          <div className="flex items-baseline gap-1.5 sm:gap-2 whitespace-nowrap leading-none">
            <span className="font-serif text-lg sm:text-[1.35rem] font-semibold italic tracking-[0.01em] text-primary">
              Sri's
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] sm:tracking-[0.3em] text-foreground/70 uppercase">
              Beauty Parlour
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
          {renderAuth()}
        </nav>

        {/* Mobile: Auth + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {renderAuth()}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-9 h-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
              <Menu className="w-5 h-5" />
            </span>
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
              <X className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-card border-t border-border px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-left py-3 px-3 rounded-lg font-medium"
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: 'all 300ms ease-out',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;