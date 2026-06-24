"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { HomeScreen } from "@/components/home/HomeScreen";
import { GalleryScreen } from "@/components/screens/GalleryScreen";
import { TracingScreen } from "@/components/screens/TracingScreen";
import { LetterTracingScreen } from "@/components/screens/LetterTracingScreen";
import { MazeScreen } from "@/components/screens/MazeScreen";
import { ConnectDotsScreen } from "@/components/screens/ConnectDotsScreen";
import { LearnToDrawScreen } from "@/components/screens/LearnToDrawScreen";
import { MatchingScreen } from "@/components/screens/MatchingScreen";
import { PixelArtScreen } from "@/components/screens/PixelArtScreen";
import { FreeDrawScreen } from "@/components/screens/FreeDrawScreen";
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
    (cardId: string) => {
      const target = getScreenForGalleryCard(galleryId, cardId, lastCategory);
      if (target) navigate(target);
    },
    [galleryId, lastCategory, navigate],
  );

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
            <motion.div key="home" className="h-full w-full" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <HomeScreen initialCategory={lastCategory} onNavigate={navigate} />
            </motion.div>
          )}
          {screen === "gallery" && (
            <motion.div key={`gallery-${galleryId}`} className="h-full w-full" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <GalleryScreen galleryId={galleryId} onBack={() => goHome()} onSelectCard={handleGalleryCard} />
            </motion.div>
          )}
          {screen === "line-tracing" && (
            <motion.div key={`line-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <TracingScreen templateId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "letter-tracing" && (
            <motion.div key={`letter-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <LetterTracingScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "maze" && (
            <motion.div key={`maze-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <MazeScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "connect-dots" && (
            <motion.div key={`connect-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ConnectDotsScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "learn-to-draw" && (
            <motion.div key={`learn-${activityId}`} className="h-full w-full" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <LearnToDrawScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "matching" && (
            <motion.div key={`match-${activityId}`} className="h-full w-full" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <MatchingScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "pixel-art" && (
            <motion.div key={`pixel-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <PixelArtScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
          {screen === "free-draw" && (
            <motion.div key={`free-${activityId}`} className="h-full w-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <FreeDrawScreen activityId={activityId} onBack={() => goHome(lastCategory)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
