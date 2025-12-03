"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/layout/hero";
import { InputCard } from "@/components/analysis/input-card";
import { ResultsView } from "@/components/analysis/results-view";
import { UserProfile, Skill, ProjectMatch } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [analysisData, setAnalysisData] = React.useState<{
    user: UserProfile;
    skills: Skill[];
    matches: ProjectMatch[];
  } | null>(null);

  const handleAnalysisComplete = (data: {
    user: UserProfile;
    skills: Skill[];
    matches: ProjectMatch[];
  }) => {
    setAnalysisData(data);
  };

  const handleReset = () => {
    setAnalysisData(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {!analysisData ? (
            <motion.div
              key="input"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <div className="container mx-auto px-4 pb-20">
                <InputCard onAnalysisComplete={handleAnalysisComplete} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 py-8"
            >
              <ResultsView
                user={analysisData.user}
                skills={analysisData.skills}
                matches={analysisData.matches}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
