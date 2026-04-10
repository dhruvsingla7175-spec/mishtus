import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import SectionDivider from "@/components/SectionDivider";
import AnimatedTimeline from "@/components/AnimatedTimeline";

import StarWall from "@/components/StarWall";
import MemoryGallery from "@/components/MemoryGallery";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";

import DailyMessage from "@/components/DailyMessage";
import DreamFuture from "@/components/DreamFuture";
import SecretMessage from "@/components/SecretMessage";
import LoveLetter from "@/components/LoveLetter";
import MandirMoment from "@/components/MandirMoment";
import IfYoureReadingThis from "@/components/IfYoureReadingThis";
import ChatColumn from "@/components/ChatColumn";
import FooterSection from "@/components/FooterSection";
import EmojiRain from "@/components/EmojiRain";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import LoveQuiz from "@/components/LoveQuiz";
import WishJar from "@/components/WishJar";
import DoubleTapHeart from "@/components/DoubleTapHeart";
import FloatingNav from "@/components/FloatingNav";
import FloatingQuotes from "@/components/FloatingQuotes";


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
        <FloatingQuotes />
        <HeroSection />
        <SectionDivider variant="glow" />
        <ChatColumn />
        <SectionDivider variant="dots" />
        <BirthdayCountdown />
        <SectionDivider variant="dots" />
        <div id="timeline"><AnimatedTimeline /></div>
        <SectionDivider variant="glow" />
        
        <div id="stars"><StarWall /></div>
        <SectionDivider variant="glow" />
        <div id="gallery"><MemoryGallery /></div>
        <SectionDivider variant="dots" />
        <div id="reasons"><ReasonsILoveYou /></div>
        <SectionDivider variant="glow" />
        
        <div id="daily"><DailyMessage /></div>
        <SectionDivider variant="dots" />
        <div id="dreams"><DreamFuture /></div>
        <SectionDivider variant="glow" />
        <SecretMessage />
        <SectionDivider variant="dots" />
        <div id="letter"><LoveLetter /></div>
        <SectionDivider variant="glow" />
        <div id="mandir"><MandirMoment /></div>
        <SectionDivider variant="dots" />
        <div id="reading"><IfYoureReadingThis /></div>
        <SectionDivider variant="glow" />
        <div id="slideshow"><PhotoSlideshow /></div>
        <SectionDivider variant="dots" />
        <div id="quiz"><LoveQuiz /></div>
        <SectionDivider variant="glow" />
        <div id="wishjar"><WishJar /></div>
        <SectionDivider variant="dots" />
        <FooterSection />
      </div>
    </DoubleTapHeart>
  );
};

export default Index;
