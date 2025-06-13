"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Shield,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import BookingModal from "@/components/BookingModal";

const companion = {
  id: 1,
  name: "Isabella",
  age: 25,
  location: "São Paulo",
  rating: 4.9,
  reviews: 47,
  price: "R$ 800/h",
  tags: ["VIP", "Bilingual", "Outcall", "Dinner", "Travel", "Events"],
  availability: "Available",
  description:
    "Sophisticated and elegant companion for exclusive events. I specialize in providing premium companionship for discerning gentlemen who appreciate intelligence, beauty, and discretion.",
  about:
    "With a background in international relations and fluency in three languages, I bring sophistication and cultural awareness to every encounter. Whether you need a companion for a business dinner, social event, or private evening, I ensure every moment is memorable and tailored to your preferences.",
  languages: ["Portuguese", "English", "Spanish"],
  services: [
    "Dinner Companion",
    "Event Partner",
    "Travel Companion",
    "Business Events",
  ],
 photos: [
  "/WhatsApp Image 2025-06-02 at 17.41.38 (1).jpeg",
  "/WhatsApp Image 2025-06-02 at 17.41.38.jpeg",
  "/WhatsApp Image 2025-06-02 at 17.41.39 (1).jpeg",
  "/WhatsApp Image 2025-06-02 at 17.41.39 (2).jpeg",
  "/WhatsApp Image 2025-06-02 at 17.41.39.jpeg",
  "/WhatsApp Image 2025-06-02 at 17.41.40.jpeg",
],

  availableDates: [
    { date: "2025-06-10", time: "19:00" },
    { date: "2025-06-12", time: "20:00" },
    { date: "2025-06-15", time: "18:30" },
    { date: "2025-06-18", time: "19:30" },
    { date: "2025-06-20", time: "20:30" },
    { date: "2025-06-22", time: "19:00" },
  ],
  contact: {
    phone: "+55 11 99999-9999",
    whatsapp: "+55 11 99999-9999",
    telegram: "@isabella_Le Privê",
  },
};

export default function CompanionProfile() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % companion.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + companion.photos.length) % companion.photos.length
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.history.back()}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl font-bold text-white">Back to Gallery</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="relative h-96 md:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 to-pink-900/30 flex items-center justify-center">
                  {companion.photos.length > 0 ? (
                    <Image
                      src={companion.photos[currentImageIndex]}
                      alt={companion.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Camera className="w-16 h-16 text-white/50" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {companion.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "text-rose-400 fill-current" : "text-white"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      companion.availability === "Available"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {companion.availability}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {companion.name}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {companion.location} • {companion.age} anos
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{companion.rating}</span>
                        <span className="text-slate-400">
                          ({companion.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-rose-400 mb-1">
                      {companion.price}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">per hour</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      About
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {companion.about}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {companion.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {companion.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {companion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm border border-rose-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-400" />
                Available Dates
              </h3>
              <div className="space-y-3">
                {companion.availableDates.map((slot, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDate(slot.date)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedDate === slot.date
                        ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                        : "bg-white/5 border-white/20 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-medium">{formatDate(slot.date)}</div>
                    <div className="text-sm opacity-80">{slot.time}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-xl border border-green-500/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl border border-blue-500/30 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl border border-purple-500/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Telegram</span>
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/30"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-rose-500/25 transition-all"
              >
                Book Appointment
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-2 text-green-300">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Verified & Secure</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <BookingModal
        companion={{
          id: companion.id,
          name: companion.name,
          price: companion.price,
          image: companion.photos[0] || "",
          location: companion.location,
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
