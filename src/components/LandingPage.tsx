import { Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeatureSection />
      <ScenarioSection />
      <AIWorkflowSection />
      <CTASection />
      <Footer />
    </div>
  );
}

import HeroSection from './landing/HeroSection';
import ProblemSection from './landing/ProblemSection';
import SolutionSection from './landing/SolutionSection';
import FeatureSection from './landing/FeatureSection';
import ScenarioSection from './landing/ScenarioSection';
import AIWorkflowSection from './landing/AIWorkflowSection';
import CTASection from './landing/CTASection';

function Footer() {
  return (
    <footer className="bg-dark py-12">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <span className="font-semibold text-white">AI 二手交易决策助手</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-white/50">
            <span>Made with</span>
            <Heart size={14} className="text-red-400 fill-red-400" />
            <span>for product portfolio</span>
          </div>

          <p className="text-sm text-white/40">
            Demo 使用模拟数据 · 不构成真实交易建议
          </p>
        </div>
      </div>
    </footer>
  );
}