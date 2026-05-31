import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Brain, MessageSquare, Megaphone, GitCompare } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: '商品风险识别',
    description: '基于商品描述和图片信息，识别翻新、维修、配件缺失等潜在风险点',
    tag: '风险洞察',
  },
  {
    icon: Scale,
    title: '价格合理性判断',
    description: '对比市场参考价，判断当前价格是否合理，给出议价空间建议',
    tag: '价格分析',
  },
  {
    icon: Brain,
    title: 'AI 购买建议',
    description: '综合商品信息和市场数据，给出值得买/谨慎购买/不建议购买的结论',
    tag: '智能决策',
  },
  {
    icon: MessageSquare,
    title: '追问清单生成',
    description: '自动生成应问卖家的关键问题清单，不遗漏重要决策信息',
    tag: '沟通效率',
  },
  {
    icon: Megaphone,
    title: '议价话术生成',
    description: '基于商品弱点和市场价格，生成自然、有说服力的议价话术',
    tag: '高效议价',
  },
  {
    icon: GitCompare,
    title: '多商品对比',
    description: '支持多个商品同时分析并加入对比，获得推荐排序和综合评估',
    tag: '决策闭环',
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            核心功能
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            从风险识别到购买决策，全方位辅助你的二手购物
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-login-bg rounded-2xl p-6 border border-gray-100 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-dark text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}