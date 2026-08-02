import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Reviews from "@/components/landing/Reviews";
import Numbers from "@/components/landing/Numbers";
import LandingFooter from "@/components/landing/LandingFooter";


export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main>
      <Hero />
      <Features />
      <Reviews />
      <Numbers />
      </main>
      <LandingFooter />
    </>
  );
}