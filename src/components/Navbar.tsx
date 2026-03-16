import { useState, useEffect } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "Recipes", "Community", "About"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">F</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            FlavorShare
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                link === "Home" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Log In
          </button>
          <button className="h-9 px-5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm font-medium text-foreground py-2"
                >
                  {link}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 h-10 text-sm font-medium border border-border rounded-full">
                  Log In
                </button>
                <button className="flex-1 h-10 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
