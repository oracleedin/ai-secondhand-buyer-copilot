import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import AppNav from '../common/AppNav';
import EmptyState from '../common/EmptyState';
import { RiskBadge, RecommendationBadge } from '../common/Badge';
import ScoreRing from '../common/ScoreRing';
import { mockProducts } from '../../data/mockProducts';
import Button from '../common/Button';

interface CompareItem {
  id: string;
  addedAt: string;
}

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([
    { id: 'P001', addedAt: new Date().toISOString() },
    { id: 'P002', addedAt: new Date().toISOString() },
  ]);

  const products = compareItems
    .map(item => mockProducts.find(p => p.id === item.id))
    .filter(Boolean) as typeof mockProducts;

  const handleRemove = (id: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const getRecommendationOrder = () => {
    return products.sort((a, b) => b.report.score - a.report.score);
  };

  const recommended = getRecommendationOrder()[0];

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-login-bg">
        <AppNav />
        <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
          <Link to="/app" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dark mb-4">
            <ArrowLeft size={16} />
            返回首页
          </Link>
          <EmptyState
            type="compare"
            action={
              <Link to="/app/analyze">
                <Button>开始分析商品</Button>
              </Link>
            }
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-login-bg">
      <AppNav />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-6">
        <Link to="/app" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dark mb-4">
          <ArrowLeft size={16} />
          返回首页
        </Link>

        {/* Recommendation Banner */}
        {recommended && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl p-6 mb-6 border border-emerald-200"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-emerald-700 font-medium mb-1">综合推荐</p>
                <h3 className="text-lg font-bold text-dark mb-1">{recommended.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{recommended.report.summary}</p>
                <Link
                  to={`/app/report/${recommended.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold hover:brightness-110 transition-all"
                >
                  查看详情
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compare Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 text-sm font-semibold text-dark">商品</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">价格</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">参考价</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">评分</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">风险</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">建议</th>
                  <th className="text-center p-4 text-sm font-semibold text-dark">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product.id} className={`border-b border-gray-100 ${i !== 0 ? '' : ''}`}>
                    <td className="p-4">
                      <Link to={`/app/report/${product.id}`} className="flex items-center gap-3 group">
                        <div className={`w-12 h-12 rounded-xl ${product.imageMeta.bgStyle} flex items-center justify-center`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-dark text-sm group-hover:text-accent transition-colors">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="text-center p-4">
                      <span className="text-base font-bold text-accent">¥{product.price}</span>
                    </td>
                    <td className="text-center p-4">
                      <span className="text-sm text-gray-500">¥{product.referencePrice}</span>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex justify-center">
                        <ScoreRing score={product.report.score} size="sm" showLabel={false} />
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex justify-center">
                        <RiskBadge level={product.report.riskLevel} />
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex justify-center">
                        <RecommendationBadge recommendation={product.report.recommendation} />
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Risk Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-accent" />
            风险对比
          </h2>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id}>
                <p className="text-sm font-medium text-dark mb-2">{product.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.report.risks.slice(0, 3).map((risk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-100">
                      {risk.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}