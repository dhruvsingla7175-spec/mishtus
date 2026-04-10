import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import EmojiRain from "@/components/EmojiRain";
import DoubleTapHeart from "@/components/DoubleTapHeart";
import FloatingNav from "@/components/FloatingNav";
import FloatingQuotes from "@/components/FloatingQuotes";
import LazySection from "@/components/LazySection";
import ChatColumn from "@/components/ChatColumn";
import BirthdayCountdown from "@/components/BirthdayCountdown";
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
    <DoubleTapHeart>
      <div className="min-h-screen relative">
        <EmojiRain />
        <FloatingNav />
        <FloatingQuotes />
        <HeroSection />
        <SectionDivider variant="glow" />
        <ChatColumn />
        <SectionDivider variant="dots" />

        <LazySection>
          <BirthdayCountdown />
        </LazySection>
        <SectionDivider variant="dots" />

        <LazySection>
          <div id="timeline"><AnimatedTimeline /></div>
        </LazySection>
        <SectionDivider variant="glow" />

        <LazySection>
          <div id="stars"><StarWall /></div>
        </LazySection>
        <SectionDivider variant="glow" />

        <LazySection>
          <div id="gallery"><MemoryGallery /></div>
        </LazySection>
        <SectionDivider variant="dots" />

        <LazySection>
          <div id="reasons"><ReasonsILoveYou /></div>
        </LazySection>
        <SectionDivider variant="glow" />

        <LazySection>
          <div id="daily"><DailyMessage /></div>
        </LazySection>
        <SectionDivider variant="dots" />

        <LazySection>
          <div id="dreams"><DreamFuture /></div>
        </LazySection>
        <SectionDivider variant="glow" />

        <LazySection>
          <SecretMessage />
        </LazySection>
        <SectionDivider variant="dots" />

        <LazySection>
          <div id="letter"><LoveLetter /></div>
        </LazySection>
        <SectionDivider variant="glow" />

        <LazySection>
          <div id="mandir"><MandirMoment /></div>
        </LazySection>
        <SectionDivider variant="dots" />

        <LazySection>
          <div id="reading"><IfYoureReadingThis /></div>
        </LazySection>
        <SectionDivider variant="dots" />
        <FooterSection />
      </div>
    </DoubleTapHeart>
  );
};

export default Index;
