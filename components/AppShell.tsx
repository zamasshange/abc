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
  const [galleryId, setGalleryId] = useState<GalleryId>("printables");
  const [pageId, setPageId] = useState<string | undefined>();

  const goHome = useCallback((category?: CategoryId) => {
    if (category) setLastCategory(category);
    setScreen("home");
  }, []);

  const navigate = useCallback((target: ScreenTarget) => {
    if (target.categoryId) setLastCategory(target.categoryId);
    if (target.activityId) setActivityId(target.activityId);
    if (target.galleryId) setGalleryId(target.galleryId);
    setPageId(target.pageId);
    setScreen(target.screen);
  }, []);

  const handleGalleryCard = useCallback((cardId: string) => {
    const target = getScreenForGalleryCard(galleryId, cardId, lastCategory);
    if (target) navigate({ ...target, pageId: target.pageId ?? cardId });
  }, [galleryId, lastCategory, navigate]);

  const wrap = (key: string, children: React.ReactNode) => (
    <motion.div key={key} className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );

  return (
    <div className="mobile-app-shell">
      <div className="portrait-only-message">
        <p className="text-lg font-bold text-white">Rotate your device</p>
        <p className="mt-2 text-sm text-white/80">Please use landscape mode</p>
      </div>
      <div className="mobile-viewport">
        <AnimatePresence mode="wait">
          {screen === "splash" && <SplashScreen key="splash" onComplete={() => setScreen("home")} />}
          {screen === "home" && wrap("home", <HomeScreen initialCategory={lastCategory} onNavigate={navigate} />)}
          {screen === "gallery" && wrap(`gallery-${galleryId}`, <GalleryScreen galleryId={galleryId} onBack={() => goHome()} onSelectCard={handleGalleryCard} />)}
          {screen === "line-tracing" && wrap(`line-${activityId}`, <TracingScreen templateId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "letter-tracing" && wrap(`letter-${activityId}-${pageId}`, <LetterTracingScreen activityId={activityId} pageId={pageId} onBack={() => goHome(lastCategory)} />)}
          {screen === "maze" && wrap(`maze-${activityId}`, <MazeScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "connect-dots" && wrap(`connect-${activityId}`, <ConnectDotsScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "learn-to-draw" && wrap(`learn-${activityId}`, <LearnToDrawScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "matching" && wrap(`match-${activityId}`, <MatchingScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "pixel-art" && wrap(`pixel-${activityId}`, <PixelArtScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
          {screen === "free-draw" && wrap(`free-${activityId}`, <FreeDrawScreen activityId={activityId} onBack={() => goHome(lastCategory)} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}
