import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Search, Package } from 'lucide-react';
import AppNav from '../common/AppNav';
import { mockProducts } from '../../data/mockProducts';

const loadingMessages = [
  '正在识别风险词...',
  '正在评估价格合理性...',
  '正在生成追问清单...',
  '正在生成议价话术...',
  '正在生成购买检查清单...',
];

const categories = ['全部', '数码手机', '相机摄影', '家用电器', '游戏设备', '箱包配饰', '美妆护肤'];

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('全部');
  const [sellerInfo, setSellerInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSampleProducts, setShowSampleProducts] = useState(false);

  const handleSelectSample = (product: typeof mockProducts[0]) => {
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price.toString());
    setCategory(product.category);
    setSellerInfo(`芝麻信用${product.sellerInfo.creditLevel}，历史交易${product.sellerInfo.transactionCount}次，好评率${product.sellerInfo.positiveRate}%`);
    setShowSampleProducts(false);
  };

  const handleAnalyze = async () => {
    if (!title.trim() && !description.trim()) {
      return;
    }

    setIsLoading(true);
    let msgIndex = 0;
    setLoadingMessage(loadingMessages[0]);

    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[msgIndex]);
    }, 800);

    await new Promise(resolve => setTimeout(resolve, 2500));

    clearInterval(interval);
    setIsLoading(false);
    navigate('/app/report/P001');
  };

  const filteredProducts = category === '全部'
    ? mockProducts
    : mockProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-login-bg">
      <AppNav />

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Search size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark">商品分析</h1>
              <p className="text-sm text-gray-500">输入或选择二手商品信息，AI 帮你分析是否值得买</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Sample Products Toggle */}
            <div>
              <button
                onClick={() => setShowSampleProducts(!showSampleProducts)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-dark rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
              >
                <Package size={14} />
                选择示例商品
                <ArrowRight size={14} className={`transition-transform ${showSampleProducts ? 'rotate-90' : ''}`} />
              </button>
            </div>

            <AnimatePresence>
              {showSampleProducts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            category === cat
                              ? 'bg-accent text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {filteredProducts.map(product => (
                        <button
                          key={product.id}
                          onClick={() => handleSelectSample(product)}
                          className="w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-accent/5 transition-colors text-left"
                        >
                          <div className={`w-10 h-10 rounded-lg ${product.imageMeta.bgStyle} flex items-center justify-center`}>
                            <Package size={18} className="text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark truncate">{product.title}</p>
                            <p className="text-xs text-gray-500">¥{product.price} · {product.category}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">商品标题</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="例如：iPhone 15 Pro 256G 原色钛金属"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">商品描述</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="粘贴卖家发布的商品描述..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">价格（元）</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="例如：4899"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">商品品类</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                >
                  {categories.filter(c => c !== '全部').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seller Info */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">卖家信息</label>
              <input
                type="text"
                value={sellerInfo}
                onChange={e => setSellerInfo(e.target.value)}
                placeholder="例如：芝麻信用优秀，历史交易 36 次，好评率 96%"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              {isLoading ? (
                <div className="flex flex-col items-center py-4">
                  <Loader2 size={28} className="text-accent animate-spin mb-3" />
                  <p className="text-sm text-gray-500">{loadingMessage}</p>
                </div>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={!title.trim() && !description.trim()}
                  className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-base hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  开始 AI 分析
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}