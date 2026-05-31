import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Heart } from 'lucide-react';
import AppNav from '../common/AppNav';
import EmptyState from '../common/EmptyState';
import { RiskBadge, RecommendationBadge } from '../common/Badge';
import { mockProducts } from '../../data/mockProducts';

const tabs = [
  { id: 'history', label: '最近分析' },
  { id: 'favorites', label: '我的收藏' },
  { id: 'compare', label: '已加入对比' },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set([mockProducts[0].id]));
  const [compareList] = useState<Set<string>>(new Set([mockProducts[1].id]));

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'history') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && favorites.has(p.id);
    if (activeTab === 'compare') return matchesSearch && compareList.has(p.id);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-login-bg">
      <AppNav />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 mb-6 border border-gray-100">
          <h1 className="text-xl font-bold text-dark mb-4">历史记录</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索商品..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
          </div>
        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            type={activeTab === 'favorites' ? 'bookmark' : 'history'}
            action={
              <Link to="/app/analyze">
                <button className="px-5 py-2.5 bg-accent text-white rounded-full text-sm font-semibold">
                  开始分析商品
                </button>
              </Link>
            }
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/app/report/${product.id}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-accent/30 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-xl ${product.imageMeta.bgStyle} flex items-center justify-center flex-shrink-0`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-dark text-sm truncate">{product.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <RiskBadge level={product.report.riskLevel} />
                      <RecommendationBadge recommendation={product.report.recommendation} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-accent">¥{product.price}</p>
                    <p className="text-xs text-gray-400 mt-0.5">刚刚分析</p>
                  </div>
                  {activeTab === 'history' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <Heart size={18} className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}