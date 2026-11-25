import HomePageClient from "@/components/home/HomePageClient";
import { HOME_INTRO_COOKIE } from "@/lib/constants";

// Home is built ahead of time, so it can't know who has seen the intro. This runs while the HTML is
// read, before anything is drawn: for a returning visitor it hides the intro, so it never flashes.
const HIDE_SEEN_INTRO = `if (document.cookie.split("; ").includes("${HOME_INTRO_COOKIE}=true")) {
  var style = document.createElement("style");
  style.textContent = "[data-intro]{display:none}";
  document.head.appendChild(style);
}`;

export default function HomePage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_SEEN_INTRO }} />
      <HomePageClient />
    </>
  );
}
