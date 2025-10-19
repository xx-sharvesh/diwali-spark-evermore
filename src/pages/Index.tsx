import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LetterCard from "@/components/LetterCard";
import LetterContent from "@/components/LetterContent";
import ProposalSection from "@/components/ProposalSection";
import CelebrationInline from "@/components/CelebrationInline";
import HandCover from "@/components/HandCover";
import FireworksFinale from "@/components/FireworksFinale";
import parchmentTexture from "@/assets/parchment-texture.jpg";

type Stage = 
  | "letter-closed"
  | "letter-open"
  | "proposal"
  | "celebration"
  | "hand-cover"
  | "fireworks";

const Index = () => {
  const [stage, setStage] = useState<Stage>("letter-closed");

  const handleLetterOpen = () => {
    setStage("letter-open");
  };

  const handleLetterComplete = () => {
    setStage("proposal");
  };

  const handleYes = () => {
    setStage("celebration");
  };

  const handleCelebrationComplete = () => {
    setStage("hand-cover");
  };

  const handleHandComplete = () => {
    setStage("fireworks");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 transition-all duration-1000"
        style={{
          backgroundImage:
            stage === "fireworks"
              ? "none"
              : `url(${parchmentTexture})`,
          backgroundColor:
            stage === "fireworks"
              ? "hsl(var(--night-sky-deep))"
              : "hsl(var(--background))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === "letter-closed" && (
            <motion.div
              key="letter-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center p-4"
            >
              <LetterCard onOpen={handleLetterOpen} isOpen={false} />
            </motion.div>
          )}

          {stage === "letter-open" && (
            <motion.div
              key="letter-open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen py-12 px-4"
            >
              <LetterContent onComplete={handleLetterComplete} />
            </motion.div>
          )}

          {stage === "proposal" && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center p-4"
            >
              <ProposalSection onYes={handleYes} />
            </motion.div>
          )}

          {stage === "celebration" && (
            <CelebrationInline onComplete={handleCelebrationComplete} />
          )}

          {stage === "hand-cover" && (
            <HandCover onComplete={handleHandComplete} />
          )}

          {stage === "fireworks" && <FireworksFinale />}
        </AnimatePresence>
      </div>

      {/* Accessibility: Text-only transcript */}
      <div id="transcript" className="sr-only">
        <h1>A Diwali Proposal</h1>
        <p>
          This is an interactive proposal experience. The content includes a
          heartfelt letter, a marriage proposal, and a celebration with
          fireworks.
        </p>
      </div>
    </div>
  );
};

export default Index;
