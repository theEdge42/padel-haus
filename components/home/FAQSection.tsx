"use client";

import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/shared/Brand";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";

const QUESTION_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export default function FAQSection() {
  const t = useTranslations("faq");

  return (
    <section className="bg-crem py-20 text-mov sm:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-12">
        <div>
          <Eyebrow className="text-mov">{t("badge")}</Eyebrow>
          <h2 className="font-editorial text-[clamp(34px,5vw,52px)] leading-[1.05]">{t("title")}</h2>
          <p className="mt-5 text-lg text-mov/75">{t("subtitle")}</p>
        </div>

        <Accordion defaultValue={["q1"]}>
          {QUESTION_NUMBERS.map((n) => (
            <AccordionItem key={n} value={`q${n}`} className="border-mov/20">
              <AccordionTrigger className="cursor-pointer items-center gap-4 rounded-none py-[22px] text-lg font-extrabold text-mov hover:no-underline focus-visible:border-mov focus-visible:ring-mov/30 **:data-[slot=accordion-trigger-icon]:text-mov">
                {t(`q${n}`)}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-mov/80 [&_a]:hover:text-mov">
                {t.rich(`a${n}`, {
                  whatsapp: (chunks) => (
                    <a
                      href={WHATSAPP_CONTACT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-mov focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mov"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
