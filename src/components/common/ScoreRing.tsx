import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export default function ScoreRing({
  score,
  size = 'md',
  className = '',
  showLabel = true,
}: ScoreRingProps) {
  const sizes = {
    sm: { ring: 56, stroke: 4, text: 'text-sm' },
    md: { ring: 80, stroke: 5, text: 'text-lg' },
    lg: { ring: 120, stroke: 7, text: 'text-3xl' },
  };

  const { ring, stroke, text } = sizes[size];
  const radius = (ring - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 65) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={ring} height={ring} className="transform -rotate-90">
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`font-bold text-dark ${text}`}
        >
          {score}
        </motion.span>
        {showLabel && size !== 'sm' && (
          <span className="text-xs text-gray-400 font-medium">综合评分</span>
        )}
      </div>
    </div>
  );
}