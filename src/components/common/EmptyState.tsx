import { ReactNode } from 'react';
import { ShoppingBag, Search, FileX, Bookmark, Frown } from 'lucide-react';

interface EmptyStateProps {
  type?: 'compare' | 'history' | 'search' | 'bookmark' | 'general';
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const emptyConfigs = {
  compare: {
    icon: ShoppingBag,
    title: '还没有加入对比的商品',
    description: '去分析几个商品，加入对比后可以在这里查看并比较。',
  },
  history: {
    icon: Search,
    title: '暂无分析记录',
    description: '开始分析你的第一个二手商品吧！',
  },
  search: {
    icon: Frown,
    title: '没有找到相关商品',
    description: '试试其他关键词或浏览全部商品。',
  },
  bookmark: {
    icon: Bookmark,
    title: '还没有收藏的商品',
    description: '看到心仪的商品可以先收藏，方便后续对比。',
  },
  general: {
    icon: FileX,
    title: '暂无内容',
    description: '这里还没有任何内容。',
  },
};

export default function EmptyState({
  type = 'general',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  const config = emptyConfigs[type];
  const IconComponent = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <IconComponent size={28} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-dark mb-2">{title || config.title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">{description || config.description}</p>
      {action}
    </div>
  );
}