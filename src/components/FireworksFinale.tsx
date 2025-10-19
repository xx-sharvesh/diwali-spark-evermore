import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fireworksBg from "@/assets/fireworks-bg.jpg";
import coupleSilhouette from "@/assets/couple-silhouette.png";
import { Heart } from "lucide-react";

const FireworksFinale = () => {
  const [showSilhouettes, setShowSilhouettes] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [kissAnimation, setKissAnimation] = useState(false);

  useEffect(() => {
    // Show silhouettes after transition
    const timer1 = setTimeout(() => setShowSilhouettes(true), 400);
    
    // Show final message
    const timer2 = setTimeout(() => setShowMessage(true), 2000);

    // Kiss animation loop
    const kissInterval = setInterval(() => {
      setKissAnimation(true);
      setTimeout(() => setKissAnimation(false), 600);
    }, 15000); // Every 15 seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
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
        
        {/* Animated firework bursts */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '200px',
                height: '200px',
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 60 + 10}%`,
                background: `radial-gradient(circle, ${
                  [
                    'hsl(var(--firework-magenta))',
                    'hsl(var(--firework-cyan))',
                    'hsl(var(--firework-saffron))',
                    'hsl(var(--firework-emerald))',
                    'hsl(var(--firework-purple))',
                    'hsl(var(--firework-hot-pink))',
                  ][i % 6]
                } 0%, transparent 70%)`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
          ))}
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

      {/* Final message overlay */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center px-4 w-full max-w-2xl"
        >
          <motion.div
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border-2 border-[hsl(var(--gold))]"
            animate={{
              boxShadow: [
                '0 0 20px hsl(var(--gold))',
                '0 0 40px hsl(var(--gold))',
                '0 0 20px hsl(var(--gold))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-5xl md:text-6xl font-script text-white mb-4">
              Happy Diwali, my love.
            </h2>
            <p className="text-2xl md:text-3xl font-body text-white/90 italic">
              You are my brightest light in every festival, in every lifetime. 💖
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FireworksFinale;
