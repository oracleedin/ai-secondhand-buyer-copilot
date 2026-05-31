# AI 二手交易决策助手

> **SecondHand AI Buyer Copilot** — 面向二手交易买家的 AI 购买决策助手

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)

---

## 📋 项目简介

AI 二手交易决策助手是一个面向二手交易买家的 C 端 AI 产品 Demo。用户可以输入或选择二手商品信息，系统会基于商品标题、描述、价格和卖家信息生成购买建议、风险识别、价格合理性分析、追问清单、议价话术和购买前检查清单。

该项目重点展示：
- **C 端用户体验设计**：轻量、友好、有购买决策感的交互设计
- **AI 消费决策产品能力**：商品风险识别、价格合理性判断、话术生成
- **二手交易场景理解**：覆盖手机、相机、包包、游戏机等主流品类
- **多商品对比与留存路径**：收藏、对比、历史记录完整闭环

---

## 🎯 产品背景

在二手交易中，买家面临三大核心困境：

1. **信息不对称**：看不懂卖家描述，不知道"轻微使用痕迹""无修无拆"是否可信
2. **价格判断困难**：同款商品价格差异大，缺少专业判断依据
3. **风险识别门槛高**：翻新、维修、缺配件、暗病、高仿等问题不易识别

本产品旨在帮助用户在购买二手商品前，基于商品信息做出更明智的购买决策。

---

## ✨ 核心功能

| 功能 | 描述 |
|------|------|
| 商品风险识别 | 基于商品描述和图片信息，识别翻新、维修、配件缺失等潜在风险点 |
| 价格合理性判断 | 对比市场参考价，判断当前价格是否合理，给出议价空间建议 |
| AI 购买建议 | 综合商品信息和市场数据，给出值得买/谨慎购买/不建议购买的结论 |
| 追问清单生成 | 自动生成应问卖家的关键问题清单，不遗漏重要决策信息 |
| 议价话术生成 | 基于商品弱点和市场价格，生成自然、有说服力的议价话术 |
| 多商品对比 | 支持多个商品同时分析并加入对比，获得推荐排序和综合评估 |

---

## 🗺️ 页面结构

```
/                           Landing Page，产品介绍首页
├── Hero 首屏区              全屏背景视频 + 产品定位
├── 问题背景区               二手交易买家常见问题
├── 解决方案区               核心流程展示
├── 核心功能区               6 个功能卡片
├── 使用场景区               4 个典型品类场景
├── AI 开发流程说明          工具链展示
└── CTA 区                  行动引导

/app                        App 首页 / 分析入口
/app/analyze                商品分析页
/app/report/:id             AI 决策报告页
/app/compare                商品对比页
/app/history                历史记录与收藏页
/app/guide                 新手避坑指南页
```

---

## 🛠️ 技术栈

- **React 18** + **TypeScript 5**
- **Vite** 构建工具
- **Tailwind CSS** 样式
- **React Router** 路由
- **Framer Motion** 动画
- **Lucide React** 图标
- **Vercel** 部署

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# Windows PowerShell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

---

## 📊 核心指标体系

**北极星指标：**

```
有效购买决策完成率 = 完成 AI 分析后执行收藏、加入对比、复制话术或查看检查清单的用户数 / 完成 AI 分析的用户数
```

**一级指标：**

- 商品分析完成率
- 报告查看完成率
- 追问清单复制率
- 议价话术复制率
- 加入对比率
- 收藏率
- 报告分享率
- 次日/7 日复访率

**用户漏斗：**

```
Landing Page 访问
    ↓
点击开始分析
    ↓
填写/选择商品信息
    ↓
完成 AI 分析
    ↓
查看完整报告
    ↓
复制话术 / 加入对比 / 收藏
    ↓
返回查看或分析第二个商品
```

---

## 📁 项目结构

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── types/
│   └── index.ts                  # TypeScript 类型定义
├── data/
│   └── mockProducts.ts          # Mock 商品数据和指南数据
└── components/
    ├── common/
    │   ├── Button.tsx
    │   ├── Badge.tsx
    │   ├── ProductCard.tsx
    │   ├── ScoreRing.tsx
    │   ├── EmptyState.tsx
    │   ├── Toast.tsx
    │   └── AppNav.tsx
    ├── landing/
    │   ├── HeroSection.tsx
    │   ├── ProblemSection.tsx
    │   ├── SolutionSection.tsx
    │   ├── FeatureSection.tsx
    │   ├── ScenarioSection.tsx
    │   ├── AIWorkflowSection.tsx
    │   └── CTASection.tsx
    └── app/
        ├── AppHomePage.tsx
        ├── AnalyzePage.tsx
        ├── ReportPage.tsx
        ├── ComparePage.tsx
        ├── HistoryPage.tsx
        └── GuidePage.tsx
```

---

## 🎨 项目亮点

1. **融合 VaultShield Hero 风格**：全屏背景视频 + floating navbar + glassmorphism pill
2. **C 端产品体验**：轻量、友好、有购买决策感，非 B 端后台风格
3. **完整决策闭环**：从分析到收藏、对比、历史记录完整路径
4. **品类化指南**：6 个品类的避坑知识，增强产品价值
5. **AI 辅助开发**：使用 ChatGPT + Claude Code + Cursor 辅助完成

---

## ⚠️ Mock 数据说明

本项目使用前端 Mock 数据，不接真实后端、大模型 API、图片识别或价格 API。

- 商品数据：6 个内置完整商品案例（手机、相机、吹风机、游戏机、包包、美妆）
- 分析结果：每个商品包含完整的风险识别、价格分析、话术生成
- 指南数据：6 个品类的常见风险、必问问题、价格参考、验货重点

---

## 🔮 后续迭代方向

1. **接入真实 AI 能力**：接入商品识别模型、市场价格 API、风控能力
2. **图片识别增强**：支持上传商品图片，识别品牌型号和成色
3. **用户系统**：登录后支持历史记录同步和个性化推荐
4. **社区功能**：用户可分享验货经验和商品评价
5. **小程序适配**：开发微信小程序，降低使用门槛

---

## 📝 作品集展示价值

本项目展示了以下能力：

- **C 端产品设计**：从用户需求洞察到产品方案的全链路能力
- **AI 消费决策产品理解**：对 AI 在消费领域应用的产品思考
- **二手交易场景理解**：对二手交易风险点和人际信任的洞察
- **Vibe Coding 能力**：从产品方案到网页 Demo 的快速落地能力
- **技术栈掌握**：React + TypeScript + Tailwind CSS 的工程能力

---

## 📄 License

MIT License - 仅供学习和作品集展示使用