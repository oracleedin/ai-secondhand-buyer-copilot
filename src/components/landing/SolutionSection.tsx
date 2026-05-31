import { motion } from 'framer-motion';
import { FileInput, Cpu, ShieldCheck, FileOutput, Heart, GitCompare } from 'lucide-react';

const steps = [
  {
    icon: FileInput,
    title: '输入商品信息',
    description: '粘贴商品描述或选择示例商品，快速开始分析',
  },
  {
    icon: Cpu,
    title: 'AI 提取关键字段',
    description: '自动识别价格、成色、配件、品牌和描述中的关键信息',
  },
  {
    icon: ShieldCheck,
    title: '识别风险点',
    description: '结合商品特征和市场数据，识别潜在风险和价格合理性',
  },
  {
    icon: FileOutput,
    title: '生成购买建议',
    description: '输出追问清单、议价话术和购买前检查清单',
  },
  {
    icon: Heart,
    title: '支持收藏',
    description: '收藏感兴趣的商品，方便后续对比和回看',
  },
  {
    icon: GitCompare,
    title: '多商品对比',
    description: '将多个商品加入对比，获得推荐排序和综合建议',
  },
];

export default function SolutionSection() {
  return (
    <section className="py-20 sm:py-28 bg-login-bg">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            AI 驱动，让购买决策更简单
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            从信息输入到决策输出，全流程智能辅助
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-dark text-base mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}