import { useState } from "react";
import { motion } from "framer-motion";

interface LetterCardProps {
  onOpen: () => void;
  isOpen: boolean;
}

const LetterCard = ({ onOpen, isOpen }: LetterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen) return null;

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      aria-label="Open the letter"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="relative bg-gradient-to-br from-[hsl(var(--parchment))] to-[hsl(var(--parchment-dark))] rounded-lg shadow-2xl p-8 border-4 border-[hsl(var(--gold))]">
        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[hsl(var(--gold))]"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[hsl(var(--gold))]"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[hsl(var(--gold))]"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[hsl(var(--gold))]"></div>

        {/* Wax seal */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--romantic-red))] to-[hsl(var(--romantic-pink))] shadow-lg flex items-center justify-center">
              <span className="text-2xl text-white font-script">H&S</span>
            </div>
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--romantic-red))] to-[hsl(var(--romantic-pink))]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </div>
        </div>

        {/* Letter content preview */}
        <div className="mt-8 space-y-4 text-center">
          <h2 className="text-3xl font-script text-[hsl(var(--ink))] mb-4">
            For Hiba
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] italic">
            A Diwali letter for my love
          </p>
          <div className="mt-6 text-xs text-[hsl(var(--gold))] uppercase tracking-wider">
            {isHovered ? "Click to open" : "Tap to open"}
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LetterCard;
