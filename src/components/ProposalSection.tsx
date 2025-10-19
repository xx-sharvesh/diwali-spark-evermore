import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ProposalSectionProps {
  onYes: () => void;
}

const PRE_PROPOSAL = `Ammu,

Everything I've said is true every word, every feeling. And still, there's more waiting in every tomorrow I see with you. I want to keep choosing you, again and again in the quiet mornings and in the stormy nights, in laughter and in silence. I want to be the home you lean on, the reason your days feel safer and brighter. I want to build little festivals for you not just every year, but every month, every single day.
So here I am, with all that I am, and all that I can give…`;

const ProposalSection = ({ onYes }: ProposalSectionProps) => {
  const [showPreProposal, setShowPreProposal] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [thinkButtonPos, setThinkButtonPos] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);

  useEffect(() => {
    // Show pre-proposal text
    const timer1 = setTimeout(() => setShowPreProposal(true), 500);
    // Show proposal question
    const timer2 = setTimeout(() => setShowProposal(true), 4000);
    // Show buttons
    const timer3 = setTimeout(() => setShowButtons(true), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleThinkHover = () => {
    if (escapeCount < 5) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 100;
      setThinkButtonPos({ x: randomX, y: randomY });
      setEscapeCount(escapeCount + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Pre-proposal text */}
      {showPreProposal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 p-8 bg-gradient-to-br from-[hsl(var(--parchment))] to-[hsl(var(--parchment-dark))] rounded-lg border-2 border-[hsl(var(--gold))] shadow-xl"
        >
          <p className="font-body text-[hsl(var(--ink))] text-lg leading-relaxed whitespace-pre-line">
            {PRE_PROPOSAL}
          </p>
        </motion.div>
      )}

      {/* Proposal question */}
      {showProposal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-script text-[hsl(var(--romantic-red))] mb-8 animate-pulse-glow"
            style={{
              textShadow: '0 0 30px hsl(var(--gold))',
            }}
          >
            Will you marry me, my love?
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <Heart
              className="w-16 h-16 mx-auto text-[hsl(var(--romantic-red))] fill-current"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Buttons */}
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Yes button */}
          <motion.button
            onClick={onYes}
            className="relative px-12 py-4 text-2xl font-script bg-gradient-to-r from-[hsl(var(--romantic-red))] to-[hsl(var(--romantic-pink))] text-white rounded-full shadow-2xl border-2 border-white hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Say yes"
          >
            Yes! 💖
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--romantic-red))] to-[hsl(var(--romantic-pink))]"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.button>

          {/* Let me think button */}
          <motion.button
            onMouseEnter={handleThinkHover}
            onFocus={handleThinkHover}
            animate={{
              x: thinkButtonPos.x,
              y: thinkButtonPos.y,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-12 py-4 text-2xl font-script bg-[hsl(var(--secondary))] text-[hsl(var(--ink))] rounded-full shadow-lg border-2 border-[hsl(var(--gold))] hover:bg-[hsl(var(--parchment-dark))] transition-colors"
            aria-label="Let me think"
            style={{ position: escapeCount > 0 ? 'relative' : 'static' }}
          >
            Let me think... 🤔
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ProposalSection;
