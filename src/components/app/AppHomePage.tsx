import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';
import AppNav from '../common/AppNav';
import ProductCard from '../common/ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { useState } from 'react';

export default function AppHomePage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const recentProducts = mockProducts.slice(0, 4);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-login-bg">
      <AppNav />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Sparkles size={22} className="text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark mb-1">今天想买什么二手商品？</h1>
              <p className="text-gray-500">粘贴商品描述或选择示例商品，AI 帮你判断是否值得买</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full font-semibold hover:brightness-110 transition-all"
            >
              开始分析
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-dark rounded-full font-medium hover:bg-gray-200 transition-all"
            >
              查看示例商品
            </Link>
          </div>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 px-5 py-3.5 bg-amber-50 border border-amber-200 rounded-2xl mb-8"
        >
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-medium">Demo 说明：</span>
            当前使用模拟商品数据和 Mock AI 分析结果，购买建议仅用于展示产品流程，不构成真实交易建议。
          </p>
        </motion.div>

        {/* Quick Example Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-dark mb-4">快速示例商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <ProductCard
                  product={product}
                  onFavorite={() => toggleFavorite(product.id)}
                  isFavorite={favorites.has(product.id)}
                  onClick={() => {}}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recently Analyzed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark">最近分析记录</h2>
            <Link to="/app/history" className="text-sm text-accent font-medium hover:underline">
              查看全部
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {recentProducts.map((product, i) => (
              <Link
                key={product.id}
                to={`/app/report/${product.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  i !== 0 ? 'border-t border-gray-100' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${product.imageMeta.bgStyle} flex items-center justify-center flex-shrink-0`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-dark text-sm truncate">{product.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.report.riskLevel} · {product.report.recommendation}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-semibold text-accent">¥{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Guide Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 border border-accent/20"
        >
          <h3 className="font-semibold text-dark text-base mb-2">第一次买二手？</h3>
          <p className="text-sm text-gray-600 mb-4">先看一份品类避坑清单，了解常见风险点和必问问题。</p>
          <Link
            to="/app/guide"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            查看避坑指南
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}