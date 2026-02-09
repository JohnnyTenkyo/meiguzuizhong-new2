# 涨跌颜色规范

## 全局规则：红涨绿跌

本系统统一采用**红涨绿跌**的颜色规范，与中国大陆股市习惯一致。

### 颜色定义

#### 涨（看涨/买入）
- **主色**: `text-red-400` / `bg-red-500` / `#ef4444`
- **边框**: `border-red-500/20`
- **背景**: `bg-red-500/15` 或 `bg-red-500/5`
- **图表**: `upColor: '#ef4444'`

#### 跌（看跌/卖出）
- **主色**: `text-green-400` / `bg-green-500` / `#22c55e`
- **边框**: `border-green-500/20`
- **背景**: `bg-green-500/15` 或 `bg-green-500/5`
- **图表**: `downColor: '#22c55e'`

#### 其他情绪
- **观望**: `text-yellow-400` / `bg-yellow-500` / `#eab308`
- **震荡**: `text-blue-400` / `bg-blue-500` / `#3b82f6`

### 应用场景

1. **K线图**
   - 上涨K线：红色 (`#ef4444`)
   - 下跌K线：绿色 (`#22c55e`)

2. **情绪标签**
   - 看涨：红色背景 + 红色文字
   - 看跌：绿色背景 + 绿色文字

3. **交易按钮**
   - 买入按钮：红色 (`bg-red-500`)
   - 卖出按钮：绿色 (`bg-green-500`)

4. **盈亏显示**
   - 盈利（正值）：红色文字
   - 亏损（负值）：绿色文字

5. **排行榜**
   - 涨幅榜：红色图标/文字
   - 跌幅榜：绿色图标/文字

### 已修复文件

- ✅ `client/src/components/StockChart.tsx` - K线图颜色
- ✅ `client/src/components/FociAssistant.tsx` - 情绪emoji
- ✅ `client/src/components/FociBloggerTracker.tsx` - 情绪配置
- ✅ `client/src/components/FociDashboard.tsx` - 情绪徽章和排行
- ✅ `client/src/pages/Backtest.tsx` - 盈亏显示
- ✅ `client/src/pages/BacktestSimulator.tsx` - 交易按钮和盈亏
- ✅ `client/src/pages/Home.tsx` - 涨幅榜

### 注意事项

- 所有新增功能必须遵循此颜色规范
- 不得使用绿涨红跌的配色方案
- 确保颜色对比度足够，保证可读性
