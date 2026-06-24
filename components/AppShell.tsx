"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { HomeScreen } from "@/components/home/HomeScreen";
import { WorksheetsScreen } from "@/components/screens/WorksheetsScreen";
import { TracingScreen } from "@/components/screens/TracingScreen";
import type { AppScreen } from "@/lib/navigation";
import type { CategoryId } from "@/lib/theme";

export function AppShell() {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [lastCategory, setLastCategory] = useState<CategoryId>("lines");

  const goHome = useCallback((category?: CategoryId) => {
    if (category) setLastCategory(category);
    setScreen("home");
  }, []);

  return (
    <div className="mobile-app-shell">
      <div className="desktop-only-message">
        <p className="text-lg font-bold text-white">ABC Preschool</p>
        <p className="mt-2 text-sm text-white/80">
          This app is designed for mobile only.
        </p>
        <p className="mt-1 text-sm text-white/80">
          Open on your phone in landscape mode.
        </p>
      </div>

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
            <motion.div
              key="home"
              className="h-full w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HomeScreen
                initialCategory={lastCategory}
                onNavigate={(next, categoryId) => {
                  if (categoryId) setLastCategory(categoryId);
                  setScreen(next);
                }}
              />
            </motion.div>
          )}
          {screen === "worksheets" && (
            <motion.div
              key="worksheets"
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorksheetsScreen
                onBack={() => goHome()}
                onStartTracing={() => setScreen("tracing")}
              />
            </motion.div>
          )}
          {screen === "tracing" && (
            <motion.div
              key="tracing"
              className="h-full w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TracingScreen onBack={() => goHome()} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
