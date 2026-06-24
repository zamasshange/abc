"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WorksheetsScreenProps = {
  onBack: () => void;
  onStartTracing: () => void;
};

export function WorksheetsScreen({ onBack, onStartTracing }: WorksheetsScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Image
        src="/assets/screens/worksheets.jpg"
        alt=""
        fill
        className="object-fill"
        priority
        sizes="100vw"
      />

      {/* Back */}
      <button
        type="button"
        className="absolute left-[1.5%] top-[2%] z-10 h-[14%] w-[7%] bg-transparent"
        onClick={onBack}
        aria-label="Back"
      />
      {/* Music */}
      <button type="button" className="absolute left-[9%] top-[2%] z-10 h-[14%] w-[7%] bg-transparent" aria-label="Music" />
      {/* Play */}
      <button
        type="button"
        className="absolute right-[11%] top-[2%] z-10 h-[14%] w-[7%] bg-transparent"
        onClick={onStartTracing}
        aria-label="Play"
      />
      {/* Download */}
      <button
        type="button"
        className="absolute bottom-[3%] left-[32%] z-10 h-[12%] w-[36%] bg-transparent"
        onClick={onStartTracing}
        aria-label="Download And Print"
      />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg">
              <span className="text-lg">🖍️</span>
              <p className="text-xs font-semibold text-gray-600">
                Please wait! Downloading more worksheets...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
