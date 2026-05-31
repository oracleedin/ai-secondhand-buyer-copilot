import { motion } from 'framer-motion';
import { MessageCircleQuestion, TrendingDown, Eye, MessageSquare } from 'lucide-react';

const problems = [
  {
    icon: MessageCircleQuestion,
    title: '看不懂卖家描述',
    description: '不知道"轻微使用痕迹""无修无拆"等描述是否可信，信息不对称导致判断困难。',
  },
  {
    icon: TrendingDown,
    title: '不知道价格是否合理',
    description: '同款商品价格差异大，缺少专业判断依据，担心买贵了或买到问题机。',
  },
  {
    icon: Eye,
    title: '风险点隐藏在细节里',
    description: '翻新、维修、缺配件、暗病、高仿等问题不易识别，需要专业经验才能发现。',
  },
  {
    icon: MessageSquare,
    title: '不知道该问卖家什么',
    description: '沟通效率低，关键问题容易漏问，错过重要议价或决策依据。',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            二手交易，你遇到这些问题了吗？
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            每一个问题，都可能让你买到不满意的商品
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-semibold text-dark text-lg mb-2">{problem.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}