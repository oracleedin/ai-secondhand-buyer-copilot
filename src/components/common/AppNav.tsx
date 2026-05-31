import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, GitCompare, Bookmark, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface AppNavProps {
  className?: string;
}

const navItems = [
  { path: '/app', label: '首页', icon: Home },
  { path: '/app/analyze', label: '分析', icon: Search },
  { path: '/app/compare', label: '对比', icon: GitCompare },
  { path: '/app/history', label: '收藏', icon: Bookmark },
  { path: '/app/guide', label: '指南', icon: BookOpen },
];

export default function AppNav({ className = '' }: AppNavProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className={`hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 ${className}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/app" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <span className="font-semibold text-dark">AI 二手决策助手</span>
            </NavLink>

            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-accent bg-accent/8'
                        : 'text-gray-600 hover:text-dark hover:bg-gray-100'
                    }`}
                  >
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-accent/10 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon size={16} />
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>

            <NavLink
              to="/app/analyze"
              className="px-5 py-2.5 bg-accent text-white rounded-full text-sm font-semibold hover:brightness-110 transition-all"
            >
              开始分析
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className={`md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 ${className}`}>
        <div className="flex items-center justify-between h-14 px-4">
          <NavLink to="/app" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <span className="font-semibold text-dark text-sm">AI 二手决策助手</span>
          </NavLink>

          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <Menu size={18} className="text-gray-600" />
          </button>
        </div>
      </nav>

      {/* Mobile Sheet */}
      {mobileOpen && (
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-dark/35 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-[88vw] max-w-[360px] bg-login-bg shadow-[-12px_0_48px_rgba(25,40,55,0.18)] z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <NavLink to="/app" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <span className="font-semibold text-dark">AI 二手决策助手</span>
              </NavLink>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-6 py-3.5 text-base font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-accent bg-accent/8'
                          : 'text-gray-600'
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-5 border-t border-gray-200">
              <NavLink
                to="/app/analyze"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3.5 bg-accent text-white text-center rounded-full font-semibold"
              >
                开始分析
              </NavLink>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}