"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTION_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"] as const;

export default function FAQSection() {
  const t = useTranslations("faq");

  return (
    <section className="py-24 bg-background-alternate">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 mb-4">
            {t("badge")}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">{t("title")}</h2>
          <p className="text-[#E2D9F3]/80">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion className="w-full">
            {QUESTION_KEYS.map((key, i) => (
              <AccordionItem key={key} value={key} className="border-white/10">
                <AccordionTrigger className="text-white text-left hover:text-[#FFD700] text-base font-semibold">
                  {t(`q${i + 1}`)}
                </AccordionTrigger>
                <AccordionContent className="text-[#E2D9F3]/80 leading-relaxed">
                  {t(`a${i + 1}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
