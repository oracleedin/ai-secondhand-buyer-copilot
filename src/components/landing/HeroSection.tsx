import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Sparkles, ArrowRightCircle, Menu, X, Scale, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import AnimatedHeroBackground from './AnimatedHeroBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const navLinks = [
  { label: '产品能力', href: '#features' },
  { label: '使用场景', href: '#scenarios' },
  { label: '示例报告', href: '/app/report/P001' },
  { label: '避坑指南', href: '/app/guide' },
  { label: '作品说明', href: '#workflow' },
];

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ background: '#f0f2f5' }}>
      {/* Animated Background */}
      <AnimatedHeroBackground />

      {/* Navbar */}
      <nav className="relative z-20 max-w-[1280px] mx-auto px-5 sm:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <span className="font-semibold text-dark text-base">AI 二手交易决策助手</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-dark/70 hover:text-dark hover:bg-dark/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/app/analyze"
              className="px-5 py-2.5 bg-accent text-white rounded-full text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_2px_12px_rgba(115,66,226,0.25)]"
            >
              开始分析
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/app/history"
              className="px-5 py-2.5 bg-white text-dark rounded-full text-sm font-semibold hover:bg-gray-50 transition-all border border-gray-200"
            >
              我的收藏
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center"
          >
            <Menu size={20} className="text-dark" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-[60] md:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-[88vw] max-w-[360px] bg-login-bg shadow-[-12px_0_48px_rgba(25,40,55,0.12)] z-[70] md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <span className="font-semibold text-dark">AI 二手交易决策助手</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-6 py-3.5 text-base font-medium text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="p-5 border-t border-gray-200 space-y-3">
              <Link
                to="/app/analyze"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3.5 bg-accent text-white text-center rounded-full font-semibold"
              >
                开始分析
              </Link>
              <Link
                to="/app/history"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3.5 bg-gray-100 text-dark text-center rounded-full font-semibold"
              >
                我的收藏
              </Link>
            </div>
          </motion.div>
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 pt-[clamp(48px,8vw,84px)]">
        <div className="max-w-[620px]">
          {/* Heading */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading text-[clamp(2.5rem,7vw,5.8rem)] leading-[0.95] tracking-[-0.04em] font-extrabold text-dark mb-6"
          >
            买二手前，
            <br />
            先让 AI
            <br />
            帮你看一眼
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(0.95rem,2.5vw,1.15rem)] leading-[1.65] text-dark/60 max-w-[580px] mb-8"
          >
            基于商品图片、描述、价格和卖家信息，识别潜在风险、判断价格是否合理，并生成追问清单和议价话术，帮助你更安心地做购买决策。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/app/analyze"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-accent text-white rounded-full font-semibold text-base shadow-[0_4px_24px_rgba(115,66,226,0.3)] hover:shadow-[0_6px_32px_rgba(115,66,226,0.4)] hover:brightness-105 active:scale-[0.98] transition-all duration-300"
            >
              开始分析商品
              <ArrowRightCircle size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/app/report/P001"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white text-dark rounded-full font-medium text-base hover:bg-gray-50 transition-all border border-gray-200 shadow-sm hover:shadow-md"
            >
              查看示例报告
            </Link>
          </motion.div>

          {/* Stats Chips */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-3 mt-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50">
              <Search size={14} className="text-accent" />
              <span className="text-sm text-dark/70 font-medium">商品风险识别</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50">
              <Scale size={14} className="text-accent" />
              <span className="text-sm text-dark/70 font-medium">价格合理性判断</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200/50">
              <MessageCircle size={14} className="text-accent" />
              <span className="text-sm text-dark/70 font-medium">追问话术生成</span>
            </div>
          </motion.div>
        </div>

        {/* Preview Card */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(25,40,55,0.15)' }}
          transition={{ duration: 0.3 }}
          className="hidden lg:block absolute right-8 top-[50%] transform -translate-y-[50%] w-[340px] bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100/80 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-accent" />
            <span className="text-sm font-semibold text-dark">AI 决策报告</span>
            <div className="ml-auto">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                中高风险
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-dark text-base mb-1">iPhone 15 Pro 256G</h3>
            <p className="text-sm text-gray-500">价格：¥4899 | 参考价：¥5200</p>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-500" />
              <span className="text-sm text-gray-600">推荐结论：</span>
              <span className="text-sm font-semibold text-amber-600">谨慎购买</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-gray-400 mt-0.5" />
              <div className="text-sm text-gray-600">
                <span className="font-medium">价格判断：</span>
                <span className="text-gray-500">略低于市场价，需确认维修记录</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">关键风险</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-100">无原盒</span>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs rounded-full border border-amber-100">电池 88%</span>
              <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs rounded-full border border-orange-100">不退不换</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">建议追问</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[10px] font-bold">1</span>
                是否维修过？
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[10px] font-bold">2</span>
                是否可验机？
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[10px] font-bold">3</span>
                配件是否齐全？
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}