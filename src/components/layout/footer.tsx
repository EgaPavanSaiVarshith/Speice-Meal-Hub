"use client";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { SpiceMealLogo } from "./logo";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <SpiceMealLogo className="h-10 w-10" />
              <span className="text-2xl font-bold font-headline text-foreground">
                SpiceMeal Hub
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Authentic Indian flavors, crafted with passion and the finest ingredients. Delivered fast to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-foreground text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/restaurants" className="hover:text-primary transition-colors">Choose Restaurant</Link>
              <Link href="/offers" className="hover:text-primary transition-colors">Special Offers</Link>
              <Link href="/delivery" className="hover:text-primary transition-colors">Delivery Areas</Link>
              <Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Help & Support</Link>
              <Link href="/admin/orders" className="hover:text-primary transition-colors text-primary font-bold">Restaurant Partner</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-foreground text-lg">Get in Touch</h3>
            <div className="text-sm space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-primary mt-0.5">📍</span>
                <span>Maisammaguda, Dulapally,<br/>Hyderabad, Telangana 500100</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <a href="mailto:hello@spicemealhub.in" className="hover:text-primary transition-colors">hello@spicemealhub.in</a>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-foreground text-lg">Join the Club</h3>
            <p className="text-sm">Subscribe for exclusive offers and spicy updates!</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
                Join
              </button>
            </form>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors p-2 bg-background rounded-full shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors p-2 bg-background rounded-full shadow-sm"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.538V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SpiceMeal Hub. All rights reserved.</p>
          <p className="mt-1 text-xs opacity-75">Authentic Indian Flavors • Hyderabad • Fast Delivery</p>
        </div>
      </div>
    </footer>
  );
}
