import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, GitCompare, Share2, Copy, Check, RefreshCw,
  AlertTriangle, ShieldCheck, TrendingDown, MessageSquare, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import AppNav from '../common/AppNav';
import ScoreRing from '../common/ScoreRing';
import { RiskBadge, RecommendationBadge } from '../common/Badge';
import { mockProducts } from '../../data/mockProducts';

export default function ReportPage() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [activeScript, setActiveScript] = useState(0);
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [expandedChecklist, setExpandedChecklist] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const handleCompare = () => {
    setIsInCompare(prev => !prev);
  };

  const handleCopyQuestions = () => {
    const text = product.report.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(product.report.negotiationScripts[activeScript].content);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleShare = () => {
    // Share functionality would be implemented with a real backend
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case '高风险': return <AlertTriangle size={16} className="text-red-500" />;
      case '中高风险': return <AlertTriangle size={16} className="text-orange-500" />;
      case '中风险': return <ShieldCheck size={16} className="text-amber-500" />;
      default: return <ShieldCheck size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-login-bg pb-20">
      <AppNav />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
        {/* Back Button */}
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dark mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>

        {/* Product Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className={`w-full sm:w-40 h-40 rounded-2xl ${product.imageMeta.bgStyle} flex items-center justify-center flex-shrink-0`}>
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mx-auto">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
                </svg>
                <p className="text-xs text-gray-400 mt-2">{product.imageMeta.label}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h1 className="text-xl font-bold text-dark mb-1">{product.title}</h1>
                  <p className="text-sm text-gray-500">{product.category} · {product.condition}</p>
                </div>
                <ScoreRing score={product.report.score} size="md" />
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <RiskBadge level={product.report.riskLevel} />
                <RecommendationBadge recommendation={product.report.recommendation} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-0.5">售价</p>
                  <p className="font-semibold text-dark">¥{product.price}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-0.5">参考价</p>
                  <p className="font-semibold text-dark">¥{product.referencePrice}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-0.5">价格判断</p>
                  <p className="font-semibold text-amber-600">{product.report.priceAnalysis.judgement}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-0.5">卖家</p>
                  <p className="font-semibold text-dark text-xs">{product.sellerInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-3">购买建议</h2>
          <p className="text-gray-600 leading-relaxed">{product.report.summary}</p>
        </motion.div>

        {/* Price Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
            <TrendingDown size={18} className="text-accent" />
            价格合理性分析
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-dark">¥{product.report.priceAnalysis.currentPrice}</span>
                <span className="text-sm text-gray-400 mb-1">当前价格</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold text-gray-400 line-through">¥{product.report.priceAnalysis.referencePrice}</span>
                <span className="text-sm text-gray-400 mb-0.5">参考价</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                product.report.priceAnalysis.judgement === '偏低' ? 'bg-emerald-50 text-emerald-700' :
                product.report.priceAnalysis.judgement === '偏高' ? 'bg-red-50 text-red-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                {product.report.priceAnalysis.judgement === '偏低' ? '↓' : product.report.priceAnalysis.judgement === '偏高' ? '↑' : '→'}
                {product.report.priceAnalysis.judgement}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">{product.report.priceAnalysis.explanation}</p>
        </motion.div>

        {/* Risk Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-accent" />
            风险点识别
          </h2>
          <div className="space-y-4">
            {product.report.risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-3">
                {getRiskIcon(risk.level)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-dark">{risk.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      risk.level === '高风险' ? 'bg-red-50 text-red-600' :
                      risk.level === '中高风险' ? 'bg-orange-50 text-orange-600' :
                      risk.level === '中风险' ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {risk.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{risk.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        {product.report.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
          >
            <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              商品亮点
            </h2>
            <div className="space-y-2">
              {product.report.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" />
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-dark flex items-center gap-2">
              <MessageSquare size={18} className="text-accent" />
              建议追问清单
            </h2>
            <button
              onClick={handleCopyQuestions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {copiedQuestions ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copiedQuestions ? '已复制' : '复制清单'}
            </button>
          </div>
          <div className="space-y-3">
            {product.report.questions.map((question, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{question}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Negotiation Script */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl p-6 mb-5 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-4">议价话术</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.report.negotiationScripts.map((script, i) => (
              <button
                key={script.tone}
                onClick={() => setActiveScript(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeScript === i
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {script.tone}
              </button>
            ))}
          </div>

          <div className="p-4 bg-login-bg rounded-xl mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.report.negotiationScripts[activeScript].content}
            </p>
          </div>

          <button
            onClick={handleCopyScript}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
          >
            {copiedScript ? <Check size={14} /> : <Copy size={14} />}
            {copiedScript ? '已复制' : '复制话术'}
          </button>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 mb-8 border border-gray-100"
        >
          <button
            onClick={() => setExpandedChecklist(!expandedChecklist)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-base font-semibold text-dark flex items-center gap-2">
              <Check size={18} className="text-accent" />
              购买前检查清单
            </h2>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandedChecklist ? 'rotate-180' : ''}`} />
          </button>

          <div className={`overflow-hidden transition-all ${expandedChecklist ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-2">
              {product.report.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent/30" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {!expandedChecklist && (
            <p className="text-sm text-gray-500">点击展开查看全部检查项</p>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-3xl p-6 border border-gray-100"
        >
          <h2 className="text-base font-semibold text-dark mb-4">操作</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCompare}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                isInCompare
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-dark hover:bg-gray-200'
              }`}
            >
              <GitCompare size={16} />
              {isInCompare ? '已加入对比' : '加入对比'}
            </button>
            <button
              onClick={handleFavorite}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-50 text-red-500'
                  : 'bg-gray-100 text-dark hover:bg-gray-200'
              }`}
            >
              <Heart size={16} className={isFavorite ? 'fill-red-500' : ''} />
              {isFavorite ? '已收藏' : '收藏报告'}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-dark rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Share2 size={16} />
              分享报告
            </button>
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-dark rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <RefreshCw size={16} />
              重新分析
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}