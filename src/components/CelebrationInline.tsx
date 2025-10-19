import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CelebrationInlineProps {
  onComplete: () => void;
}

const CelebrationInline = ({ onComplete }: CelebrationInlineProps) => {
  const [showYay, setShowYay] = useState(true);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    // Create confetti particles
    const confettiColors = [
      'hsl(var(--firework-magenta))',
      'hsl(var(--firework-cyan))',
      'hsl(var(--firework-saffron))',
      'hsl(var(--firework-emerald))',
      'hsl(var(--firework-purple))',
      'hsl(var(--firework-hot-pink))',
    ];

    const createConfetti = () => {
      const container = document.getElementById('confetti-container');
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${2 + Math.random()}s`;
        container.appendChild(confetti);
      }
    };

    createConfetti();

    // Show subtext after yay
    const timer1 = setTimeout(() => {
      setShowYay(false);
      setShowSubtext(true);
    }, 1200);

    // Show surprise message
    const timer2 = setTimeout(() => {
      setShowSurprise(true);
    }, 2000);

    // Complete and trigger hand cover
    const timer3 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <>
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50">
        <style>{`
          .confetti-particle {
            position: absolute;
            width: 10px;
            height: 10px;
            top: -20px;
            animation: confetti-fall 3s ease-out forwards;
          }
        `}</style>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-gradient-to-br from-[hsl(var(--romantic-pink))]/20 to-[hsl(var(--romantic-red))]/20"
      >
        {showYay && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: [0, 1.2, 1], rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            <h1 className="text-8xl md:text-9xl font-script text-[hsl(var(--romantic-red))] mb-4">
              yayyyyyyyyy we are marriedddd
            </h1>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <Sparkles className="w-24 h-24 mx-auto text-[hsl(var(--gold))] fill-current" />
            </motion.div>
          </motion.div>
        )}

        {showSubtext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-4xl font-script text-[hsl(var(--ink))] mb-8">
              Hehe, and now we're married.
            </p>
          </motion.div>
        )}

        {showSurprise && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl font-body text-[hsl(var(--ink))] italic">
              Baby, we should celebrate, shouldn't we? I've got a surprise for you.
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CelebrationInline;
