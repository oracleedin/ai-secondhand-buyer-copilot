import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Camera, Wind, Gamepad2, BaggageClaim, Sparkles, ChevronRight, AlertTriangle, type LucideIcon } from 'lucide-react';
import AppNav from '../common/AppNav';
import { mockGuides } from '../../data/mockProducts';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Camera,
  Wind,
  Gamepad2,
  BaggageClaim,
  Sparkles,
};

export default function GuidePage() {
  const [activeCategory, setActiveCategory] = useState(mockGuides[0].id);
  const [expandedSection, setExpandedSection] = useState<string | null>('risks');

  const currentGuide = mockGuides.find(g => g.id === activeCategory) || mockGuides[0];
  const IconComponent = iconMap[currentGuide.icon] || Smartphone;

  return (
    <div className="min-h-screen bg-login-bg">
      <AppNav />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 mb-6 border border-gray-100">
          <h1 className="text-xl font-bold text-dark mb-1">新手避坑指南</h1>
          <p className="text-sm text-gray-500">了解各品类常见风险，安全买二手</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {mockGuides.map(category => {
            const CatIcon = iconMap[category.icon] || Smartphone;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setExpandedSection('risks');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <CatIcon size={16} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Guide Content */}
        <motion.div
          key={currentGuide.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
        >
          {/* Category Header */}
          <div className={`p-6 bg-gradient-to-br ${currentGuide.id === 'phone' ? 'from-blue-100 to-blue-200' : currentGuide.id === 'camera' ? 'from-slate-100 to-slate-200' : currentGuide.id === 'bag' ? 'from-amber-100 to-amber-200' : 'from-purple-100 to-purple-200'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center`}>
                <IconComponent size={28} className="text-gray-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-dark">{currentGuide.name}购买指南</h2>
                <p className="text-sm text-gray-600">了解常见风险，买得更安心</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Common Risks */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'risks' ? null : 'risks')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  <span className="font-semibold text-dark">常见风险词</span>
                </div>
                <ChevronRight size={18} className={`text-gray-400 transition-transform ${expandedSection === 'risks' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'risks' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {currentGuide.risks.map((risk, i) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-full border border-red-100">
                        {risk}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Must Ask Questions */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'questions' ? null : 'questions')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-accent" />
                  <span className="font-semibold text-dark">必问问题</span>
                </div>
                <ChevronRight size={18} className={`text-gray-400 transition-transform ${expandedSection === 'questions' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'questions' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="space-y-2">
                    {currentGuide.questions.map((q, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-700">{q}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Price Tips */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'price' ? null : 'price')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                    <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span className="font-semibold text-dark">价格参考</span>
                </div>
                <ChevronRight size={18} className={`text-gray-400 transition-transform ${expandedSection === 'price' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'price' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="space-y-1.5">
                    {currentGuide.priceTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Check Points */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'checkpoints' ? null : 'checkpoints')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-semibold text-dark">验货重点</span>
                </div>
                <ChevronRight size={18} className={`text-gray-400 transition-transform ${expandedSection === 'checkpoints' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'checkpoints' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="space-y-1.5">
                    {currentGuide.checkPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {point}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Warning Signs */}
            <div className="border border-red-200 rounded-2xl overflow-hidden bg-red-50/50">
              <button
                onClick={() => setExpandedSection(expandedSection === 'warnings' ? null : 'warnings')}
                className="w-full flex items-center justify-between p-4 hover:bg-red-100/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  <span className="font-semibold text-dark">不建议购买信号</span>
                </div>
                <ChevronRight size={18} className={`text-gray-400 transition-transform ${expandedSection === 'warnings' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'warnings' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="space-y-1.5">
                    {currentGuide.warningSigns.map((sign, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        {sign}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}