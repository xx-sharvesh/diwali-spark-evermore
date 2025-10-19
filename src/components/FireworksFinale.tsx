import { useEffect, useRef } from "react";
import coupleWatching from "@/assets/couple-watching-transparent.png";

const FireworksFinale = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fireworks particles
    const particles: ParticleClass[] = [];
    const colors = [
      '#FFD700', '#FF00FF', '#00FFFF', '#FFB6C1', '#FFFFFF',
      '#FF4500', '#7CFC00', '#9370DB', '#00FF7F', '#1E90FF',
      '#FF1493', '#00CED1', '#FF8C00', '#DA70D6', '#F0E68C'
    ];

    // Resize canvas when window resizes
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };
    window.addEventListener('resize', handleResize);

    // Create stars in the background
    function createStars() {
      const stars = container?.querySelectorAll('.star');
      stars?.forEach(star => star.remove());

      const starCount = 150;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = 'twinkle 5s infinite';
        star.style.animationDelay = Math.random() * 5 + 's';
        container?.appendChild(star);
      }
    }

    // Particle class
    class ParticleClass {
      x: number;
      y: number;
      velocity: { x: number; y: number };
      color: string;
      type: 'standard' | 'heart' | 'ring' | 'spiral';
      alpha: number;
      decay: number;
      size: number;
      radius?: number;
      angle?: number;
      spiralSpeed?: number;

      constructor(x: number, y: number, color: string, type: 'standard' | 'heart' | 'ring' | 'spiral' = 'standard') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;

        if (type === 'standard') {
          this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
          };
          this.size = Math.random() * 3 + 1;
        } else if (type === 'heart') {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          };
          this.size = Math.random() * 2 + 1;
        } else if (type === 'ring') {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 30 + 20;
          this.velocity = {
            x: Math.cos(angle) * 3,
            y: Math.sin(angle) * 3
          };
          this.size = Math.random() * 2 + 1;
          this.radius = radius;
          this.angle = angle;
        } else if (type === 'spiral') {
          this.angle = Math.random() * Math.PI * 2;
          this.radius = 0;
          this.velocity = {
            x: 0,
            y: 0
          };
          this.size = Math.random() * 2 + 1;
          this.spiralSpeed = Math.random() * 0.1 + 0.05;
        } else {
          this.velocity = { x: 0, y: 0 };
          this.size = 1;
        }
      }

      update() {
        if (this.type === 'standard' || this.type === 'heart') {
          this.velocity.y += 0.05; // gravity
          this.x += this.velocity.x;
          this.y += this.velocity.y;
        } else if (this.type === 'ring' && this.angle !== undefined) {
          this.angle += 0.05;
          this.x += Math.cos(this.angle) * 2;
          this.y += Math.sin(this.angle) * 2;
        } else if (this.type === 'spiral' && this.angle !== undefined && this.radius !== undefined && this.spiralSpeed !== undefined) {
          this.radius += 0.5;
          this.angle += this.spiralSpeed;
          this.x = this.x + Math.cos(this.angle) * this.radius * 0.1;
          this.y = this.y + Math.sin(this.angle) * this.radius * 0.1;
        }

        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
          ctx.beginPath();
          const size = this.size * 2;
          ctx.moveTo(this.x, this.y);
          ctx.bezierCurveTo(
            this.x - size, this.y - size,
            this.x - size * 2, this.y + size,
            this.x, this.y + size * 2
          );
          ctx.bezierCurveTo(
            this.x + size * 2, this.y + size,
            this.x + size, this.y - size,
            this.x, this.y
          );
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Create firework explosion with different patterns
    function createFirework(x: number, y: number) {
      const types: Array<'standard' | 'heart' | 'ring' | 'spiral'> = ['standard', 'heart', 'ring', 'spiral'];
      const type = types[Math.floor(Math.random() * types.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const secondaryColor = colors[Math.floor(Math.random() * colors.length)];

      let particleCount;

      if (type === 'standard') {
        particleCount = 150;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new ParticleClass(x, y, color, 'standard'));
        }
      } else if (type === 'heart') {
        particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new ParticleClass(x, y, color, 'heart'));
        }
      } else if (type === 'ring') {
        particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new ParticleClass(x, y, color, 'ring'));
        }
      } else if (type === 'spiral') {
        particleCount = 120;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new ParticleClass(x, y, i % 2 === 0 ? color : secondaryColor, 'spiral'));
        }
      }

      // Add a secondary explosion for more variety
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const secondaryType = types[Math.floor(Math.random() * types.length)];
          const secondaryColor = colors[Math.floor(Math.random() * colors.length)];

          if (secondaryType === 'standard') {
            for (let i = 0; i < 80; i++) {
              particles.push(new ParticleClass(x, y, secondaryColor, 'standard'));
            }
          } else if (secondaryType === 'heart') {
            for (let i = 0; i < 60; i++) {
              particles.push(new ParticleClass(x, y, secondaryColor, 'heart'));
            }
          }
        }, 300 + Math.random() * 500);
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      // Fade out the canvas slightly to create trails
      ctx.fillStyle = 'rgba(10, 10, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        // Remove dead particles
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    // Create random fireworks more frequently
    const fireworkInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.8;
      createFirework(x, y);
    }, 500 + Math.random() * 500);

    // Initialize
    createStars();
    animate();

    // Create initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.8;
        createFirework(x, y);
      }, i * 300);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(to bottom, #0a0a2a, #000)'
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Couple watching fireworks */}
      <div className="absolute bottom-0 right-8 z-10">
        <img 
          src={coupleWatching} 
          alt="Couple watching fireworks together" 
          className="h-64 w-auto"
        />
      </div>
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FireworksFinale;
