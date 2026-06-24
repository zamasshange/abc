"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { HomeScreen } from "@/components/home/HomeScreen";
import { GalleryScreen } from "@/components/screens/GalleryScreen";
import {
  LineTracingScreen,
  MazeActivityScreen,
  LetterTracingScreen,
  ConnectDotsScreen,
  LearnToDrawScreen,
  LetterMatchScreen,
  MatchingActivityScreen,
  FreeDrawScreen,
  JigsawScreen,
} from "@/components/screens/ActivityScreens";
import { PixelArtGridScreen } from "@/components/screens/PixelArtScreen";
import type { AppScreen, ActivityId, ScreenTarget } from "@/lib/navigation";
import { getScreenForGalleryCard } from "@/lib/navigation";
import type { GalleryId } from "@/lib/galleries";
import type { CategoryId } from "@/lib/theme";

export function AppShell() {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [lastCategory, setLastCategory] = useState<CategoryId>("lines");
  const [activityId, setActivityId] = useState<ActivityId>("lines-dots");
  const [galleryId, setGalleryId] = useState<GalleryId>("lines-worksheets");

  const goHome = useCallback((category?: CategoryId) => {
    if (category) setLastCategory(category);
    setScreen("home");
  }, []);

  const navigate = useCallback((target: ScreenTarget) => {
    if (target.categoryId) setLastCategory(target.categoryId);
    if (target.activityId) setActivityId(target.activityId);
    if (target.galleryId) setGalleryId(target.galleryId);
    setScreen(target.screen);
  }, []);

  const handleGalleryCard = useCallback(
    (cardIndex: number) => {
      const target = getScreenForGalleryCard(galleryId, cardIndex, lastCategory);
      if (target) navigate(target);
    },
    [galleryId, lastCategory, navigate],
  );

  const back = () => goHome(lastCategory);

  return (
    <div className="mobile-app-shell">
      <div className="portrait-only-message">
        <p className="text-lg font-bold text-white">Rotate your device</p>
        <p className="mt-2 text-sm text-white/80">Please use landscape mode</p>
      </div>

      <div className="mobile-viewport">
        <AnimatePresence mode="wait">
          {screen === "splash" && (
            <SplashScreen key="splash" onComplete={() => setScreen("home")} />
          )}
          {screen === "home" && (
            <motion.div key="home" className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeScreen initialCategory={lastCategory} onNavigate={navigate} />
            </motion.div>
          )}
          {screen === "gallery" && (
            <motion.div key={`gallery-${galleryId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GalleryScreen galleryId={galleryId} onBack={() => goHome()} onSelectCard={handleGalleryCard} />
            </motion.div>
          )}
          {screen === "line-tracing" && (
            <motion.div key={`line-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LineTracingScreen onBack={back} />
            </motion.div>
          )}
          {screen === "letter-tracing" && (
            <motion.div key={`letter-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LetterTracingScreen onBack={back} />
            </motion.div>
          )}
          {screen === "maze" && (
            <motion.div key={`maze-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MazeActivityScreen onBack={back} />
            </motion.div>
          )}
          {screen === "connect-dots" && (
            <motion.div key={`connect-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ConnectDotsScreen onBack={back} />
            </motion.div>
          )}
          {screen === "learn-to-draw" && (
            <motion.div key={`learn-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LearnToDrawScreen onBack={back} />
            </motion.div>
          )}
          {screen === "letter-match" && (
            <motion.div key={`lmatch-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LetterMatchScreen onBack={back} />
            </motion.div>
          )}
          {screen === "matching" && (
            <motion.div key={`match-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MatchingActivityScreen onBack={back} />
            </motion.div>
          )}
          {screen === "pixel-art" && (
            <motion.div key={`pixel-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PixelArtGridScreen onBack={back} />
            </motion.div>
          )}
          {screen === "free-draw" && (
            <motion.div key={`free-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FreeDrawScreen onBack={back} />
            </motion.div>
          )}
          {screen === "jigsaw" && (
            <motion.div key={`jig-${activityId}`} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <JigsawScreen onBack={back} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
