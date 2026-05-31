import { motion } from 'framer-motion';
import { MessageSquare, Code, Zap, Globe } from 'lucide-react';

const tools = [
  {
    icon: MessageSquare,
    name: 'ChatGPT',
    role: '产品定位、PRD、用户路径、风险标签体系设计',
    color: 'bg-emerald-500',
  },
  {
    icon: Code,
    name: 'Claude Code',
    role: 'React + TypeScript 前端 Demo 生成',
    color: 'bg-orange-500',
  },
  {
    icon: Zap,
    name: 'Cursor',
    role: '交互调试、样式优化、组件拆分',
    color: 'bg-blue-500',
  },
  {
    icon: Code,
    name: 'Codex',
    role: '代码审查、构建错误修复、README 优化',
    color: 'bg-gray-700',
  },
  {
    icon: Globe,
    name: 'Vercel',
    role: '线上部署与作品集链接交付',
    color: 'bg-black',
  },
];

export default function AIWorkflowSection() {
  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            AI 辅助作品集开发流程
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            本项目由多种 AI 工具辅助完成，展示了 AI 原生工作的能力边界和边界外的判断力
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/30 hidden md:block" />

            <div className="space-y-6">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex items-start gap-5"
                  >
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center flex-shrink-0 relative z-10`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="bg-login-bg rounded-2xl p-5 flex-1 border border-gray-100">
                      <h3 className="font-semibold text-dark text-base mb-1">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.role}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}