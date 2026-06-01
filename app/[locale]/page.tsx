import { cookies } from "next/headers";
import HomePageClient from "@/components/home/HomePageClient";

const HOME_LOADER_COOKIE_NAME = "padel-haus-home-loader-seen";

export default async function HomePage() {
  const cookieStore = await cookies();
  const initialShowLoader =
    cookieStore.get(HOME_LOADER_COOKIE_NAME)?.value !== "true";

  return <HomePageClient initialShowLoader={initialShowLoader} />;
}
