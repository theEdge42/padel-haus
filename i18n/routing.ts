import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en"],
  defaultLocale: "ro",
  // For now "/" always opens in Romanian, whatever the browser's language. Set to true to send English browsers to /en again.
  localeDetection: false,
});
