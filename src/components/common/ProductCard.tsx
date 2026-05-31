import { motion } from 'framer-motion';
import { ProductCase } from '../../types';
import { RiskBadge, RecommendationBadge } from './Badge';
import { Heart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: ProductCase;
  onClick?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  showActions?: boolean;
  compact?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  onClick,
  onFavorite,
  isFavorite = false,
  showActions = true,
  compact = false,
  className = '',
}: ProductCardProps) {
  const IconComponent = getIconComponent(product.imageMeta.icon);

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`bg-white rounded-2xl p-4 cursor-pointer card-hover border border-gray-100 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${product.imageMeta.bgStyle} flex items-center justify-center flex-shrink-0`}>
            <IconComponent size={22} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-dark text-sm truncate">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-accent font-bold">¥{product.price}</span>
              <RiskBadge level={product.report.riskLevel} />
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl overflow-hidden cursor-pointer card-hover border border-gray-100 ${className}`}
    >
      <div
        className={`h-32 ${product.imageMeta.bgStyle} flex items-center justify-center relative`}
        onClick={onClick}
      >
        <IconComponent size={48} className="text-gray-500" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-dark">
          {product.category}
        </div>
        {showActions && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.();
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              size={16}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        )}
      </div>

      <div className="p-4" onClick={onClick}>
        <h3 className="font-semibold text-dark text-base mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-accent">¥{product.price}</span>
          <span className="text-sm text-gray-400 line-through">¥{product.referencePrice}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <RiskBadge level={product.report.riskLevel} />
          <RecommendationBadge recommendation={product.report.recommendation} />
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.condition}</p>
      </div>
    </motion.div>
  );
}

function getIconComponent(iconName: string) {
  const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Smartphone: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
      </svg>
    ),
    Camera: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
      </svg>
    ),
    Wind: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
    ),
    Gamepad2: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" />
      </svg>
    ),
    BaggageClaim: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 18h-2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2 3h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" /><rect width="6" height="8" x="3" y="8" rx="1" />
      </svg>
    ),
    Sparkles: ({ size, className }) => (
      <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
      </svg>
    ),
  };

  return icons[iconName] || icons.Smartphone;
}