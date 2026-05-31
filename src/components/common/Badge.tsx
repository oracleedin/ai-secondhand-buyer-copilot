import { ProductRiskLevel, Recommendation } from '../../types';
import { ShieldCheck, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

interface RiskBadgeProps {
  level: ProductRiskLevel;
  className?: string;
}

export function RiskBadge({ level, className = '' }: RiskBadgeProps) {
  const config: Record<ProductRiskLevel, { variant: 'success' | 'warning' | 'danger' | 'info'; icon: React.ReactNode; label: string }> = {
    '低风险': { variant: 'success', icon: <ShieldCheck size={12} />, label: '低风险' },
    '中风险': { variant: 'warning', icon: <AlertTriangle size={12} />, label: '中风险' },
    '中高风险': { variant: 'danger', icon: <ShieldAlert size={12} />, label: '中高风险' },
    '高风险': { variant: 'danger', icon: <XCircle size={12} />, label: '高风险' },
  };

  const { variant, icon, label } = config[level];

  return (
    <Badge variant={variant} size="sm" className={className}>
      {icon}
      {label}
    </Badge>
  );
}

interface RecommendationBadgeProps {
  recommendation: Recommendation;
  className?: string;
}

export function RecommendationBadge({ recommendation, className = '' }: RecommendationBadgeProps) {
  const config: Record<Recommendation, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
    '值得买': { variant: 'success', label: '值得买' },
    '谨慎购买': { variant: 'warning', label: '谨慎购买' },
    '不建议购买': { variant: 'danger', label: '不建议购买' },
  };

  const { variant, label } = config[recommendation];

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}