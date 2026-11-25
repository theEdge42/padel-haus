import { pageTitle } from "@/lib/metadata";

// The page is a client component, so its tab title is set here
export const generateMetadata = pageTitle("nav.coaching");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
