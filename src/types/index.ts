export type ProductCategory =
  | '数码手机'
  | '相机摄影'
  | '家用电器'
  | '游戏设备'
  | '箱包配饰'
  | '美妆护肤';

export type Recommendation = '值得买' | '谨慎购买' | '不建议购买';

export type ProductRiskLevel = '低风险' | '中风险' | '中高风险' | '高风险';

export type NegotiationTone = '礼貌版' | '直接版' | '简洁版';

export interface SellerInfo {
  name: string;
  creditLevel: string;
  transactionCount: number;
  positiveRate: number;
}

export interface ProductImageMeta {
  icon: string;
  bgStyle: string;
  label: string;
}

export interface PriceAnalysis {
  currentPrice: number;
  referencePrice: number;
  difference: number;
  judgement: '偏低' | '合理' | '偏高';
  explanation: string;
}

export interface RiskItem {
  label: string;
  level: ProductRiskLevel;
  explanation: string;
}

export interface NegotiationScript {
  tone: NegotiationTone;
  content: string;
}

export interface DecisionReport {
  recommendation: Recommendation;
  riskLevel: ProductRiskLevel;
  score: number;
  summary: string;
  priceAnalysis: PriceAnalysis;
  risks: RiskItem[];
  highlights: string[];
  questions: string[];
  negotiationScripts: NegotiationScript[];
  checklist: string[];
}

export interface ProductCase {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  referencePrice: number;
  condition: string;
  sellerInfo: SellerInfo;
  description: string;
  imageMeta: ProductImageMeta;
  report: DecisionReport;
  analyzedAt?: string;
  isFavorite?: boolean;
  isInCompare?: boolean;
}

export interface GuideCategory {
  id: string;
  name: string;
  icon: string;
  risks: string[];
  questions: string[];
  priceTips: string[];
  checkPoints: string[];
  warningSigns: string[];
}

export interface CompareItem {
  product: ProductCase;
  addedAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}