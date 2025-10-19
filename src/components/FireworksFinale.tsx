import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fireworksBg from "@/assets/fireworks-bg.jpg";
import coupleSilhouette from "@/assets/couple-silhouette.png";
import { Heart } from "lucide-react";

const FireworksFinale = () => {
  const [showSilhouettes, setShowSilhouettes] = useState(false);
  const [kissAnimation, setKissAnimation] = useState(false);

  useEffect(() => {
    // Show silhouettes after transition
    const timer1 = setTimeout(() => setShowSilhouettes(true), 400);

    // Kiss animation loop
    const kissInterval = setInterval(() => {
      setKissAnimation(true);
      setTimeout(() => setKissAnimation(false), 600);
    }, 15000); // Every 15 seconds

    return () => {
      clearTimeout(timer1);
      clearInterval(kissInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[hsl(var(--night-sky-deep))] overflow-hidden">
      {/* Fireworks background with animation overlay */}
      <div className="absolute inset-0">
        <img
          src={fireworksBg}
          alt="Colorful Diwali fireworks"
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Animated firework launches and bursts */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => {
            const startX = Math.random() * 90 + 5;
            const endX = startX + (Math.random() - 0.5) * 10;
            const endY = Math.random() * 40 + 10;
            const color = [
              'hsl(var(--firework-magenta))',
              'hsl(var(--firework-cyan))',
              'hsl(var(--firework-saffron))',
              'hsl(var(--firework-emerald))',
              'hsl(var(--firework-purple))',
              'hsl(var(--firework-hot-pink))',
            ][i % 6];

            return (
              <div key={i}>
                {/* Launch trail */}
                <motion.div
                  className="absolute w-1 h-8 rounded-full"
                  style={{
                    left: `${startX}%`,
                    bottom: '0%',
                    background: `linear-gradient(to top, ${color}, transparent)`,
                  }}
                  initial={{ bottom: '0%', opacity: 0 }}
                  animate={{
                    bottom: [`0%`, `${100 - endY}%`],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeOut",
                  }}
                />
                
                {/* Burst */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: '250px',
                    height: '250px',
                    left: `${endX}%`,
                    top: `${endY}%`,
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.8],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.6 + 1.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeOut",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Ground plane */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--night-sky-deep))] to-transparent" />

      {/* Couple silhouettes */}
      {showSilhouettes && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={kissAnimation ? { rotate: -5 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="relative animate-gentle-sway"
          >
            <img
              src={coupleSilhouette}
              alt="Couple silhouette embracing"
              className="h-96 w-auto filter drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]"
              style={{ filter: 'brightness(0) saturate(100%)' }}
            />
            
            {/* Heart particles during kiss */}
            {kissAnimation && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '30%',
                    }}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.8],
                      x: (Math.random() - 0.5) * 60,
                      y: -60 - Math.random() * 40,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                    }}
                  >
                    <Heart
                      className="w-6 h-6 text-[hsl(var(--romantic-red))] fill-current"
                    />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>

          {/* Reflection */}
          <div
            className="absolute top-full left-0 right-0 h-32 opacity-20"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      )}


    </div>
  );
};

export default FireworksFinale;
