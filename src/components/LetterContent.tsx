import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface LetterContentProps {
  onComplete: () => void;
}

const PART_ONE = `Diwali is a festival full of brightness and lights. During the days of Diwali, I used to be at my grandpa's place. Everyone gathers there to celebrate, all of us together. The entire thing the lights, the happiness, and most of all, there will be gifts. There used to be prestige issues and small competitions over who would give a better gift to their loved ones. I always gave something mundane to one of my cousins or my brother when I was there, something really small once in three years, or never. I always wondered what I would get my love if I had one in my "chinna vayasu" (childhood/young days). It was always a wonder, and I never found an accurate answer.`;

const PART_TWO = `Now, I have you. I just want to say that I love you because every piece of you is so beautiful that I often find myself wondering what I did to deserve having such an incredible woman, the best ever who loves me. It feels like I give all my love, every part of me, and it still won't be enough because you deserve the world. You see yourself as an overthinker, but all I see is how deeply you care, how sensitive and loving you are, and that comes out in ways that are beautiful, baby. I have seen it; the world can go fuck itself for all I care.

Every time, I ask myself what I did to be worthy of your love. I love you not despite those things, but because of them. You make me feel like I'm home, and no matter how chaotic the world becomes, I would choose you every single time, just as you are. And don't worry, even if it's just for a second, I'm always with you.

This is the greatest my love could ever be, and will ever be. Maybe it will grow more, but I wonder if I could fall any more harder than I already am. (I would sell my kidneys if I didn't have a logical brain holding me back, just to see you smile for a second.) And you are THE one.

Now that I think of it, I still can't think of a gift. But this time, it's not just confusion; it's a sense of overwhelming. I have soooooooooooooo much and more to give. I want to, but nothing could ever get near the love or the gift I want to give you. I could try all of them, but I still don't think it is enough. Maybe the stars? But you already are my Moon. Wouldn't that be petty? Giving a star to one made out of celestial stardust and who is my world? What could a star do that you don't already?

So, here I go. I came up with something comparatively smaller and, well, digital to give you, baby.`;

const PART_THREE = `Ammu,

Everything I've said is true every word, every feeling. And still, there's more waiting in every tomorrow I see with you. I want to keep choosing you, again and again in the quiet mornings and in the stormy nights, in laughter and in silence. I want to be the home you lean on, the reason your days feel safer and brighter. I want to build little festivals for you not just every year, but every month, every single day.

So here I am, with all that I am, and all that I can give...`;

const LetterContent = ({ onComplete }: LetterContentProps) => {
  const [showPartOne, setShowPartOne] = useState(false);
  const [showPartTwo, setShowPartTwo] = useState(false);
  const [showPartThree, setShowPartThree] = useState(false);
  const [partOneComplete, setPartOneComplete] = useState(false);
  const [partTwoComplete, setPartTwoComplete] = useState(false);
  const partTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start showing part one after unfold animation
    const timer = setTimeout(() => {
      setShowPartOne(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPartOne) {
      // Mark part one complete after animation
      const timer = setTimeout(() => {
        setPartOneComplete(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPartOne]);

  useEffect(() => {
    if (showPartTwo) {
      // Mark part two complete after animation
      const timer = setTimeout(() => {
        setPartTwoComplete(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showPartTwo]);

  useEffect(() => {
    if (showPartThree) {
      // Trigger proposal after part three completes
      const timer = setTimeout(() => {
        onComplete();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showPartThree, onComplete]);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-[hsl(var(--parchment))] to-[hsl(var(--parchment-dark))] rounded-lg shadow-2xl border-4 border-[hsl(var(--gold))]"
      initial={{ opacity: 0, rotateX: 90, scale: 0.8 }}
      animate={{ opacity: 1, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Letter header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-[hsl(var(--gold))]">
        <h1 className="text-4xl font-script text-[hsl(var(--ink))] mb-2">
          My Dearest Hiba
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] italic">
          Happy Diwali, my love
        </p>
      </div>

      {/* Part One */}
      {showPartOne && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 font-body text-[hsl(var(--ink))] text-lg leading-relaxed tracking-wide"
          style={{ letterSpacing: '0.1px' }}
        >
          {PART_ONE.split('\n').map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.4 }}
              className="mb-6"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* Next button for Part 2 */}
      {partOneComplete && !showPartTwo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center my-8"
        >
          <motion.button
            onClick={() => setShowPartTwo(true)}
            className="px-6 py-2 text-base font-script bg-[hsl(var(--gold))] text-white rounded-full shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </motion.div>
      )}

      {/* Part Two */}
      <div ref={partTwoRef}>
        {showPartTwo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-body text-[hsl(var(--ink))] text-lg leading-relaxed tracking-wide"
            style={{ letterSpacing: '0.1px' }}
          >
            {PART_TWO.split('\n\n').map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.4, duration: 0.4 }}
                className="mb-6"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        )}
      </div>

      {/* Next button for Part 3 */}
      {partTwoComplete && !showPartThree && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center my-8"
        >
          <motion.button
            onClick={() => setShowPartThree(true)}
            className="px-6 py-2 text-base font-script bg-[hsl(var(--gold))] text-white rounded-full shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </motion.div>
      )}

      {/* Part Three */}
      {showPartThree && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-body text-[hsl(var(--ink))] text-lg leading-relaxed tracking-wide"
          style={{ letterSpacing: '0.1px' }}
        >
          {PART_THREE.split('\n\n').map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.4, duration: 0.4 }}
              className="mb-6"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* Decorative footer */}
      <div className="mt-12 pt-6 border-t-2 border-[hsl(var(--gold))] flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
      </div>
    </motion.div>
  );
};

export default LetterContent;
