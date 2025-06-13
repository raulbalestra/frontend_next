"use client";
import { useState } from "react";
import CompanionsGallery from "@/components/CompanionsGallery";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/HowItWorks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarouselSection from "@/components/ImageCarousel";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [language, setLanguage] = useState<"pl" | "en">("pl");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <main>
        <Header language={language} setLanguage={setLanguage} />
        <HeroSection language={language} />
        <div id="companions">
          <CompanionsGallery language={language} />
        </div>
        <div id="services">
          <ServicesSection language={language} />
        </div>
        <div id="image-carousel">
          <ImageCarouselSection language={language} />
        </div>
        <div id="how-it-works">
          <WhyChooseUsSection language={language} />
        </div>
        <div id="contact">
          <Footer language={language} />
        </div>
      </main>

      {/* ✅ Modal fora do main */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
      />
    </>
  );
}
