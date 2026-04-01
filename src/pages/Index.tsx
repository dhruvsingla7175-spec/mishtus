import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import StarWall from "@/components/StarWall";
import MemoryGallery from "@/components/MemoryGallery";
import DailyMessage from "@/components/DailyMessage";
import LoveLetter from "@/components/LoveLetter";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mishtu-unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return (
      <AnimatePresence>
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StarWall />
      <MemoryGallery />
      <DailyMessage />
      <LoveLetter />
      <FooterSection />
    </div>
  );
};

export default Index;
