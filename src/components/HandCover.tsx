import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HandCoverProps {
  onComplete: () => void;
}

const HandCover = ({ onComplete }: HandCoverProps) => {
  const [isUncovering, setIsUncovering] = useState(false);

  useEffect(() => {
    // Hold for 3 seconds then uncover
    const holdTimer = setTimeout(() => {
      setIsUncovering(true);
    }, 3000);

    // Complete after uncover animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3700); // 3000ms hold + 700ms uncover animation

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hand SVG */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isUncovering ? "-100%" : "0%" }}
        transition={{
          duration: isUncovering ? 0.7 : 0.4,
          ease: "easeOut",
        }}
        className="relative"
      >
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Hand shape - stylized */}
          <g>
            {/* Palm */}
            <ellipse
              cx="150"
              cy="250"
              rx="90"
              ry="120"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
            />
            
            {/* Thumb */}
            <ellipse
              cx="80"
              cy="220"
              rx="30"
              ry="60"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
              transform="rotate(-20 80 220)"
            />
            
            {/* Index finger */}
            <rect
              x="110"
              y="100"
              width="30"
              height="100"
              rx="15"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
            />
            
            {/* Middle finger */}
            <rect
              x="145"
              y="80"
              width="30"
              height="120"
              rx="15"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
            />
            
            {/* Ring finger */}
            <rect
              x="180"
              y="100"
              width="30"
              height="100"
              rx="15"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
            />
            
            {/* Pinky */}
            <rect
              x="210"
              y="120"
              width="25"
              height="80"
              rx="12"
              fill="#F5D0C5"
              stroke="#E0B0A0"
              strokeWidth="2"
            />

            {/* Gentle breathing animation */}
            {!isUncovering && (
              <motion.circle
                cx="150"
                cy="250"
                r="5"
                fill="rgba(255, 255, 255, 0.3)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        </svg>

        {/* Anticipation glow */}
        {!isUncovering && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-[hsl(var(--gold))]/20 to-transparent rounded-full blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default HandCover;
