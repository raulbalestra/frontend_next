"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Globe, Menu, Phone, User, X } from "lucide-react";
import AuthModal from "./AuthModal";
import { fetchFromStrapi } from "../lib/api";

interface NavItem {
  name: string;
  href: string;
}
interface HeaderProps {
  language: "pl" | "en";
  setLanguage: React.Dispatch<React.SetStateAction<"pl" | "en">>;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [callNowText, setCallNowText] = useState("Call Now");
  const [loginText, setLoginText] = useState("Login");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadHeaderData() {
      const res = await fetchFromStrapi(`/api/header-content?populate=*&locale=${language}`);

      if (res) {
        setNavItems(res.navItems || []);
        setCallNowText(res.callNowButtonText || "Call Now");
        setLoginText(res.loginButtonText || "Login");
      }
    }
    loadHeaderData();
  }, [language]);

  const handleNavClick = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const y = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  };
const toggleLanguage = () => {
  setLanguage((prev) => (prev === "pl" ? "en" : "pl"));
};

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Le Privê</h1>
              <p className="text-xs text-rose-400">Luxury Men&#39;s Spa</p>
            </div>
          </motion.div>

          {/* Navegação desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-white/80 hover:text-white font-medium transition-all duration-300 relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Botões desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </motion.button>
            <motion.a
              href="tel:+48794583263"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{callNowText}</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-medium shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span>{loginText}</span>
            </motion.button>
          </div>

          {/* Botão mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Navegação mobile */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-white/10">
           <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language.toUpperCase()}</span>
              </motion.button>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{
                  duration: 0.4,
                  delay: isOpen ? index * 0.1 : 0,
                  ease: "easeOut",
                }}
                className="block text-white/80 hover:text-white font-medium py-2 transition-colors cursor-pointer"
              >
                {item.name}
              </motion.a>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="tel:+48794583263"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>{callNowText}</span>
              </motion.a>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-medium"
              >
                <User className="w-4 h-4" />
                <span>{loginText}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} language={language} />
    </motion.header>
  );
}
