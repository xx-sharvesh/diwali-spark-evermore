import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import coupleIllustration from "@/assets/couple-illustration.png";
import { Heart } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  type: 'standard' | 'heart' | 'ring' | 'spiral';
  angle?: number;
  radius?: number;
  spiralSpeed?: number;
}

const FireworksFinale = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [kissAnimation, setKissAnimation] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Firework colors
    const colors = [
      'hsl(var(--firework-magenta))',
      'hsl(var(--firework-cyan))',
      'hsl(var(--firework-saffron))',
      'hsl(var(--firework-emerald))',
      'hsl(var(--firework-purple))',
      'hsl(var(--firework-hot-pink))',
    ];

    // Create firework explosion
    const createFirework = (x: number, y: number) => {
      const types: Array<'standard' | 'heart' | 'ring' | 'spiral'> = ['standard', 'heart', 'ring', 'spiral'];
      const type = types[Math.floor(Math.random() * types.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const secondaryColor = colors[Math.floor(Math.random() * colors.length)];

      let particleCount = 0;

      if (type === 'standard') {
        particleCount = 150;
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            color,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 3 + 1,
            type: 'standard',
          });
        }
      } else if (type === 'heart') {
        particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 2 + 1,
            type: 'heart',
          });
        }
      } else if (type === 'ring') {
        particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            color,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 2 + 1,
            type: 'ring',
            angle,
            radius: Math.random() * 30 + 20,
          });
        }
      } else if (type === 'spiral') {
        particleCount = 120;
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x,
            y,
            vx: 0,
            vy: 0,
            color: i % 2 === 0 ? color : secondaryColor,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 2 + 1,
            type: 'spiral',
            angle: Math.random() * Math.PI * 2,
            radius: 0,
            spiralSpeed: Math.random() * 0.1 + 0.05,
          });
        }
      }

      // Secondary explosion
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const secondaryType = types[Math.floor(Math.random() * types.length)];
          const particleCount = secondaryType === 'standard' ? 80 : 60;
          
          for (let i = 0; i < particleCount; i++) {
            if (secondaryType === 'standard') {
              particlesRef.current.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: secondaryColor,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 3 + 1,
                type: 'standard',
              });
            } else if (secondaryType === 'heart') {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 6 + 2;
              particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: secondaryColor,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 2 + 1,
                type: 'heart',
              });
            }
          }
        }, 300 + Math.random() * 500);
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle position
        if (particle.type === 'standard' || particle.type === 'heart') {
          particle.vy += 0.05; // gravity
          particle.x += particle.vx;
          particle.y += particle.vy;
        } else if (particle.type === 'ring' && particle.angle !== undefined) {
          particle.angle += 0.05;
          particle.x += Math.cos(particle.angle) * 2;
          particle.y += Math.sin(particle.angle) * 2;
        } else if (particle.type === 'spiral' && particle.angle !== undefined && particle.radius !== undefined && particle.spiralSpeed !== undefined) {
          particle.radius += 0.5;
          particle.angle += particle.spiralSpeed;
          particle.x += Math.cos(particle.angle) * particle.radius * 0.1;
          particle.y += Math.sin(particle.angle) * particle.radius * 0.1;
        }

        particle.alpha -= particle.decay;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;

        if (particle.type === 'heart') {
          // Draw heart shape
          ctx.beginPath();
          const size = particle.size * 2;
          ctx.moveTo(particle.x, particle.y);
          ctx.bezierCurveTo(
            particle.x - size, particle.y - size,
            particle.x - size * 2, particle.y + size,
            particle.x, particle.y + size * 2
          );
          ctx.bezierCurveTo(
            particle.x + size * 2, particle.y + size,
            particle.x + size, particle.y - size,
            particle.x, particle.y
          );
          ctx.fill();
        } else {
          // Draw circle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Remove dead particles
        return particle.alpha > 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create random fireworks
    const fireworkInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.6; // Upper part only
      createFirework(x, y);
    }, 500 + Math.random() * 500);

    // Initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        createFirework(x, y);
      }, i * 300);
    }

    // Kiss animation loop
    const kissInterval = setInterval(() => {
      setKissAnimation(true);
      setTimeout(() => setKissAnimation(false), 600);
    }, 5000); // Every 5 seconds

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearInterval(fireworkInterval);
      clearInterval(kissInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[hsl(var(--night-sky-deep))] overflow-hidden">
      {/* Canvas for fireworks */}
      <canvas ref={canvasRef} className="absolute inset-0 z-1" />

      {/* Ground plane */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--night-sky-deep))] to-transparent z-2" />

      {/* Couple illustration */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={kissAnimation ? { scale: 1.05, rotate: -2 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <img
            src={coupleIllustration}
            alt="Couple embracing"
            className="h-64 w-auto drop-shadow-[0_0_30px_rgba(255,100,150,0.5)]"
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
    </div>
  );
};

export default FireworksFinale;
