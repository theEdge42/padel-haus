"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
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
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">{t("hero.title")}</h1>
            <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-black text-white mb-8">{t("form.title")}</h2>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={48} className="text-[#B5F03D] mx-auto mb-4" />
                  <p className="text-white font-bold text-lg">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[#E2D9F3]">{t("form.name")}</Label>
                      <Input
                        required
                        className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#E2D9F3]">{t("form.email")}</Label>
                      <Input
                        type="email"
                        required
                        className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.subject")}</Label>
                    <Input
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.message")}</Label>
                    <Textarea
                      required
                      rows={5}
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-12"
                  >
                    {t("form.submit")}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-black text-white mb-6">{t("info.title")}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#B5F03D] mt-0.5 flex-shrink-0" />
                    <span className="text-[#E2D9F3]">{t("info.address")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-[#B5F03D] flex-shrink-0" />
                    <a
                      href={`tel:${t("info.phone")}`}
                      className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors"
                    >
                      {t("info.phone")}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-[#B5F03D] flex-shrink-0" />
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors"
                    >
                      {t("info.email")}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-[#B5F03D] mt-0.5 flex-shrink-0" />
                    <div className="text-[#E2D9F3]">
                      <p>{t("info.hours")}</p>
                      <p>{t("info.weekendHours")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-8 text-center"
          >
            {t("map.title")}
          </motion.h2>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-80 lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.6245643968098!2d26.179369830486497!3d44.428051670800954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff005138e94d%3A0x859648e1e9b81efa!2sPadel%20Haus%20Bucharest!5e0!3m2!1sen!2sro!4v1775249393523!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Padel Haus Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
