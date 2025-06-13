"use client";

import { motion } from "framer-motion";
import { Heart, Star, MapPin, Eye, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "./BookingModal";

interface Companion {
  id: number;
  name: string;
  age: number;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  tags: string[];
  availability: string;
  description: string;
  image?: string;
}
interface CompanionsGalleryProps {
  language: "pl" | "en";
}

// ✅ Novo tipo para o conteúdo da galeria
interface GalleryContent {
  title: string;
  subtitle: string;
  viewAllButtonText: string;
  bookNowButtonText?: string;
}

export default function CompanionsGallery({ language }: CompanionsGalleryProps) {

  const router = useRouter();
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null
  );

  // ✅ Novo estado para título, subtítulo e texto do botão
  const [galleryContent, setGalleryContent] = useState<GalleryContent>({
    title: "Our Elite Collection",
    subtitle:
      "Handpicked companions who embody elegance, intelligence, and sophistication for the most discerning clientele.",
    viewAllButtonText: "View All Companions",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://usable-crown-91e30743ba.strapiapp.com/api/companions?locale=${language}`);

        const json = await res.json();
        type ApiCompanion = {
          id: number;
          name: string;
          age: number;
          location: string;
          rating?: number;
          reviews: number;
          price: number;
          tags?: string[];
          availability?: string;
          description: string;
        };

        const formatted = (json.data as ApiCompanion[]).map((c) => ({
          id: c.id,
          name: c.name,
          age: c.age,
          location: c.location,
          rating: c.rating || 0,
          reviews: c.reviews,
          price: `R$ ${c.price}/h`,
          tags: c.tags || [],
          availability: c.availability
            ? (c.availability.toLowerCase().includes("zawsze") ? "Available" : c.availability)
            : "Unavailable",
          description: c.description,
        }));
        setCompanions(formatted);
      } catch (error) {
        console.error("Failed to load companions:", error);
      }
    }
    // ✅ Buscar título, subtítulo e botão de "View All"
    async function fetchGalleryContent() {
      try {
        const res = await fetch(`https://usable-crown-91e30743ba.strapiapp.com/api/companions-gallery-content?locale=${language}`);

        const json = await res.json();
        const data = json.data;
        if (data) {
          setGalleryContent({
            title: data.title?.trim() || galleryContent.title,
            subtitle: data.subtitle?.trim() || galleryContent.subtitle,
            viewAllButtonText:
              data.viewAllButtonText?.trim() ||
              galleryContent.viewAllButtonText,
              bookNowButtonText: data.bookNowButtonText?.trim() || "Book Now", 
          });
        }
      } catch (error) {
        console.error("Failed to load gallery content:", error);
      }
    }
    fetchData();
    fetchGalleryContent();
  }, [
    language,
    galleryContent.title,
    galleryContent.subtitle,
    galleryContent.viewAllButtonText
  ]);

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openBooking = (companion: Companion) => {
    setSelectedCompanion(companion);
    setIsBookingOpen(true);
  };

  const navigateToCompanion = (id: number) => {
    router.push(`/companion/${id}`);
  };

  const companionsToDisplay = isExpanded ? companions : companions.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título e Filtro aqui ... (sem alterações) */}
        {/* ✅ Título e Subtítulo dinâmicos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {galleryContent.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {galleryContent.subtitle}
          </p>
        </motion.div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {companionsToDisplay.map((companion, index) => (
            <motion.div
              key={companion.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(companion.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card inteiro permanece o mesmo */}
              <div
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/50 transition-all duration-500 cursor-pointer h-full flex flex-col"
                onClick={() => navigateToCompanion(companion.id)}
              >
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredCard === companion.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full bg-gradient-to-br from-rose-900/50 to-pink-900/50"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                      <Eye className="w-12 h-12" />
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        companion.availability === "Available"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      } backdrop-blur-sm`}
                    >
                      {companion.availability}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(companion.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/50 transition-all z-10"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedItems.includes(companion.id)
                          ? "text-rose-400 fill-current"
                          : "text-white/80"
                      }`}
                    />
                  </motion.button>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">
                        {companion.rating}
                      </span>
                      <span className="text-white/60 text-xs">
                        ({companion.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {companion.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-300 text-sm">
                        <MapPin className="w-4 h-4" />
                        {companion.location} • {companion.age} anos
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-rose-400 font-bold text-lg">
                        {companion.price}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed h-10 overflow-hidden">
                    {companion.description}
                  </p>

                  <div className="flex flex-wrap gap-2 h-8 overflow-hidden">
                    {(companion.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openBooking(companion);
                      }}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                    >
                      {galleryContent.bookNowButtonText || "Book Now"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToCompanion(companion.id);
                      }}
                      className="p-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão Ver Todos / Ver Menos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            {isExpanded
              ? galleryContent.viewAllButtonText.replace("Zobacz", "Ukryj")
              : galleryContent.viewAllButtonText}
          </motion.button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {selectedCompanion && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          companion={{
            id: selectedCompanion.id,
            name: selectedCompanion.name,
            price: selectedCompanion.price,
            image: selectedCompanion.image ?? "",
            location: selectedCompanion.location,
          }}
        />
      )}
    </section>
  );
}
