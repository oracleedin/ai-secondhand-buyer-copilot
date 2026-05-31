import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-dark to-[#2d4a63]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Sparkles size={14} className="text-white/70" />
            <span className="text-sm text-white/80 font-medium">当前 Demo 使用模拟数据</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            现在开始分析你的第一个二手商品
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            当前 Demo 使用模拟商品数据和 Mock AI 分析结果，重点展示 C 端 AI 购买决策产品的核心路径。真实业务中可接入商品识别模型、市场价格数据和平台交易风控能力。
          </p>

          <Link
            to="/app/analyze"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-semibold text-lg shadow-[0_4px_24px_rgba(115,66,226,0.4)] hover:brightness-110 hover:scale-[1.04] active:scale-[0.96] transition-all"
          >
            进入 App Demo
            <ArrowRight size={20} />
          </Link>

          <p className="text-white/50 text-sm mt-6">
            点击查看示例报告 →
            <Link to="/app/report/P001" className="text-white/70 underline ml-1 hover:text-white">
              iPhone 15 Pro 分析示例
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}