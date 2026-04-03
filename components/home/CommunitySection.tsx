"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Users, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunitySection() {
  const t = useTranslations("home.community");

  const stats = [
    { icon: Users, label: t("stat1") },
    { icon: Trophy, label: t("stat2") },
    { icon: Star, label: t("stat3") },
  ];

  return (
    <section className="py-24 bg-[#341743]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-[#E2D9F3] text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#4A2060] rounded-2xl p-8 border border-white/10"
          >
            <div className="w-14 h-14 bg-green-500/15 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle size={28} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {t("whatsappTitle")}
            </h3>
            <p className="text-[#E2D9F3] mb-6 leading-relaxed">
              {t("whatsappDesc")}
            </p>
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold w-full sm:w-auto">
              <a href="https://chat.whatsapp.com/CqGix2BlvAtIyz7z3ic30I" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" size={18} />
                {t("joinButton")}
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            {stats.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-[#4A2060] rounded-xl p-5 border border-white/10"
              >
                <div className="w-10 h-10 bg-[#B5F03D]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#B5F03D]" />
                </div>
                <span className="text-white font-semibold">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
