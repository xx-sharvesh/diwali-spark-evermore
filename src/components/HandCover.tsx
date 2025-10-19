import { useEffect } from "react";
import { motion } from "framer-motion";

interface HandCoverProps {
  onComplete: () => void;
}

const HandCover = ({ onComplete }: HandCoverProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 10500); // 10.5 seconds total (slide in + hold + slide out)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Blindfold/cloth animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--night-sky-deep))] via-gray-900 to-[hsl(var(--night-sky-deep))]"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 10.5,
          times: [0, 0.15, 0.85, 1],
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center",
        }}
      />

      {/* Soft fabric texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0.3, 0],
        }}
        transition={{
          duration: 10.5,
          times: [0, 0.15, 0.85, 1],
        }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Center text during hold */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0],
        }}
        transition={{
          duration: 10.5,
          times: [0, 0.15, 0.25, 0.75, 0.85],
        }}
      >
        <p className="text-2xl md:text-3xl font-script text-white/80">
          Close your eyes... ✨
        </p>
      </motion.div>
    </div>
  );
};

export default HandCover;
