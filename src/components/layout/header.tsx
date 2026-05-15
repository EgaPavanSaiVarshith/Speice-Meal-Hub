"use client";

import Link from "next/link";
import { Menu, Sun, Moon, ShoppingBag, User, LogOut } from "lucide-react";
import { SpiceMealLogo } from "./logo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/delivery", label: "Delivery" },
  { href: "/track-order", label: "Track Order" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem("spicemeal-theme");
    setIsDark(stored === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("spicemeal-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <SpiceMealLogo className="h-10 w-10" />
          <span className="text-2xl font-bold font-headline text-foreground">
            SpiceMeal Hub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm font-medium">Hi, {user?.name}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="rounded-full gap-2 font-bold border-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden md:flex rounded-full gap-2 font-bold border-2">
                <User className="h-4 w-4" /> Login
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 mb-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <SpiceMealLogo className="h-10 w-10" />
                    <span className="text-2xl font-bold font-headline text-foreground">
                      SpiceMeal Hub
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-xl font-medium transition-colors hover:text-primary ${
                          pathname === link.href
                            ? "text-primary font-bold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
