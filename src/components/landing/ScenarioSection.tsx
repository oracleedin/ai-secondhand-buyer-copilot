import { motion } from 'framer-motion';
import { Smartphone, Camera, BaggageClaim, Gamepad2 } from 'lucide-react';

const scenarios = [
  {
    icon: Smartphone,
    title: '买二手手机',
    items: ['判断是否换电池', '是否维修过', '国行还是水货', '配件是否齐全'],
    color: 'from-blue-100 to-blue-200',
    iconBg: 'bg-blue-500',
  },
  {
    icon: Camera,
    title: '买二手相机',
    items: ['快门次数核实', '镜头是否霉斑', '机身是否磕碰', '维修记录确认'],
    color: 'from-slate-100 to-slate-200',
    iconBg: 'bg-slate-600',
  },
  {
    icon: BaggageClaim,
    title: '买二手包包',
    items: ['识别高仿风险', '磨损程度评估', '五金氧化情况', '购买凭证核实'],
    color: 'from-amber-100 to-amber-200',
    iconBg: 'bg-amber-600',
  },
  {
    icon: Gamepad2,
    title: '买游戏机',
    items: ['手柄是否漂移', '账号是否被锁', '是否被破解', '配件完整度'],
    color: 'from-purple-100 to-purple-200',
    iconBg: 'bg-purple-600',
  },
];

export default function ScenarioSection() {
  return (
    <section id="scenarios" className="py-20 sm:py-28 bg-login-bg">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-4">
            适用场景
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            覆盖主流二手交易品类，定制化风险识别策略
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario, i) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-br ${scenario.color} rounded-2xl p-6 border border-gray-100 card-hover`}
              >
                <div className={`w-14 h-14 rounded-2xl ${scenario.iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-semibold text-dark text-lg mb-3">{scenario.title}</h3>
                <ul className="space-y-2">
                  {scenario.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}