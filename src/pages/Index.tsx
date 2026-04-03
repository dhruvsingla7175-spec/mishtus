import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import ThingsIMiss from "@/components/ThingsIMiss";
import StarWall from "@/components/StarWall";
import MemoryGallery from "@/components/MemoryGallery";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import DailyMessage from "@/components/DailyMessage";
import DreamFuture from "@/components/DreamFuture";
import SecretMessage from "@/components/SecretMessage";
import LoveLetter from "@/components/LoveLetter";
import MandirMoment from "@/components/MandirMoment";
import IfYoureReadingThis from "@/components/IfYoureReadingThis";
import FooterSection from "@/components/FooterSection";
import EmojiRain from "@/components/EmojiRain";
import DoubleTapHeart from "@/components/DoubleTapHeart";
import FloatingNav from "@/components/FloatingNav";

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
    <DoubleTapHeart>
      <div className="min-h-screen relative">
        <EmojiRain />
        <FloatingNav />
        <HeroSection />
        <BirthdayCountdown />
        <div id="miss"><ThingsIMiss /></div>
        <div id="stars"><StarWall /></div>
        <div id="gallery"><MemoryGallery /></div>
        <div id="reasons"><ReasonsILoveYou /></div>
        <div id="spotify"><SpotifyEmbed /></div>
        <div id="daily"><DailyMessage /></div>
        <div id="dreams"><DreamFuture /></div>
        <SecretMessage />
        <div id="letter"><LoveLetter /></div>
        <div id="mandir"><MandirMoment /></div>
        <div id="reading"><IfYoureReadingThis /></div>
        <FooterSection />
      </div>
    </DoubleTapHeart>
  );
};

export default Index;
