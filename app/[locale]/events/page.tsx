"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Trophy, CheckCircle2 } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Spring Social Tournament",
    date: "Apr 5, 2026",
    time: "10:00 – 16:00",
    category: "Tournament",
    spots: 8,
    total: 16,
    level: "All Levels",
    color: "bg-[#B5F03D] text-[#1A0530]",
  },
  {
    id: 2,
    title: "Beginner Night",
    date: "Apr 12, 2026",
    time: "18:00 – 21:00",
    category: "Social",
    spots: 12,
    total: 20,
    level: "Beginner",
    color: "bg-purple-400 text-white",
  },
  {
    id: 3,
    title: "Pro League Round 1",
    date: "Apr 19, 2026",
    time: "09:00 – 18:00",
    category: "League",
    spots: 4,
    total: 32,
    level: "Advanced",
    color: "bg-orange-400 text-white",
  },
  {
    id: 4,
    title: "Mixed Doubles Open",
    date: "May 3, 2026",
    time: "11:00 – 17:00",
    category: "Tournament",
    spots: 16,
    total: 32,
    level: "Intermediate",
    color: "bg-[#B5F03D] text-[#1A0530]",
  },
  {
    id: 5,
    title: "Club Night — May Edition",
    date: "May 10, 2026",
    time: "19:00 – 23:00",
    category: "Social",
    spots: 30,
    total: 50,
    level: "All Levels",
    color: "bg-blue-400 text-white",
  },
  {
    id: 6,
    title: "Pro League Round 2",
    date: "May 17, 2026",
    time: "09:00 – 18:00",
    category: "League",
    spots: 2,
    total: 32,
    level: "Advanced",
    color: "bg-orange-400 text-white",
  },
];

const pastResults = [
  { id: 1, title: "Winter Championship 2025", winner: "Andrei M. & Bogdan T.", date: "Mar 2026" },
  { id: 2, title: "New Year Social", winner: "50 participants", date: "Jan 2026" },
  { id: 3, title: "Autumn League Finals", winner: "Team Alpha", date: "Nov 2025" },
];

export default function EventsPage() {
  const t = useTranslations("events");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#1A0530]">
      {/* Hero */}
      <section className="py-24 bg-[#2D0A4E] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B5F03D]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#B5F03D]/20 text-[#B5F03D] border-[#B5F03D]/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white mb-10"
          >
            {t("upcoming.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#2D0A4E] rounded-2xl p-6 border border-white/10 hover:border-[#B5F03D]/40 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`${event.color} text-xs font-bold px-3 py-1 rounded-full`}>
                    {event.category}
                  </span>
                  <span className="text-[#E2D9F3] text-xs bg-white/10 px-2 py-1 rounded-full">
                    {event.level}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-4 flex-1">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#E2D9F3] text-sm">
                    <Calendar size={14} className="text-[#B5F03D]" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-[#E2D9F3] text-sm">
                    <Clock size={14} className="text-[#B5F03D]" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-[#E2D9F3] text-sm">
                    <Users size={14} className="text-[#B5F03D]" />
                    {event.spots} {t("upcoming.spotsLeft")}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B5F03D] rounded-full"
                      style={{
                        width: `${((event.total - event.spots) / event.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <Button asChild className="bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold w-full">
                  <a href="https://playtomic.com/clubs/padel-haus-bucharest" target="_blank" rel="noopener noreferrer">
                    {t("upcoming.register")}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Results */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-8"
          >
            {t("past.title")}
          </motion.h2>
          <div className="space-y-4">
            {pastResults.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-[#1A0530] rounded-xl p-5 border border-white/10"
              >
                <Trophy size={20} className="text-[#B5F03D] flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{result.title}</h4>
                  <p className="text-[#E2D9F3] text-sm">{result.winner}</p>
                </div>
                <span className="text-[#E2D9F3] text-sm">{result.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Form */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-black text-white mb-8">{t("registerForm.title")}</h2>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-[#B5F03D] mx-auto mb-4" />
                <p className="text-white font-bold text-lg">Successfully registered!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("registerForm.name")}</Label>
                    <Input
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("registerForm.email")}</Label>
                    <Input
                      type="email"
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#E2D9F3]">{t("registerForm.event")}</Label>
                  <select
                    required
                    className="w-full bg-[#1A0530] border border-white/20 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#B5F03D]"
                  >
                    <option value="">--</option>
                    {upcomingEvents.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.title} — {e.date}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#E2D9F3]">{t("registerForm.partner")}</Label>
                  <Input
                    className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-12"
                >
                  {t("registerForm.submit")}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
