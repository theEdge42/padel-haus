"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    titleKey: "Social Tournament",
    date: "Apr 5, 2026",
    time: "10:00",
    category: "Tournament",
    spots: 8,
    color: "bg-[#B5F03D]",
  },
  {
    id: 2,
    titleKey: "Beginner Night",
    date: "Apr 12, 2026",
    time: "18:00",
    category: "Social",
    spots: 12,
    color: "bg-purple-400",
  },
  {
    id: 3,
    titleKey: "Pro League Round 1",
    date: "Apr 19, 2026",
    time: "09:00",
    category: "League",
    spots: 4,
    color: "bg-orange-400",
  },
];

export default function EventsSection() {
  const t = useTranslations("home.events");
  const tEvents = useTranslations("events.upcoming");
  const locale = useLocale();

  return (
    <section className="py-24 bg-[#4A2060]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
              {t("title")}
            </h2>
            <p className="text-[#E2D9F3] text-lg">{t("subtitle")}</p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white self-start sm:self-auto"
          >
            <Link href={`/${locale}/events`}>
              {t("viewAll")} <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#341743] rounded-2xl p-6 border border-white/10 hover:border-[#B5F03D]/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${event.color} text-[#341743] font-bold text-xs px-3 py-1 rounded-full`}
                >
                  {event.category}
                </div>
                <div className="flex items-center gap-1 text-[#E2D9F3] text-sm">
                  <Calendar size={14} />
                  <span>{event.date}</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{event.titleKey}</h3>
              <p className="text-[#E2D9F3] text-sm mb-4">
                {event.time} · {event.spots} {tEvents("spotsLeft")}
              </p>
              <Button
                asChild
                size="sm"
                className="bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold w-full"
              >
                <Link href={`/${locale}/events`}>{tEvents("register")}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
