import Hero from "@/components/home/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import CourtsCarousel from "@/components/courts/CourtsCarousel";
import CommunitySection from "@/components/home/CommunitySection";
import EventsSection from "@/components/home/EventsSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <CourtsCarousel />
      <CommunitySection />
      <EventsSection />
      <CTASection />
    </>
  );
}
