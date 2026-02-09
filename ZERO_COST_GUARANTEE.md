# 零成本保证报告

## 最终审查日期
2026-02-09 23:00

## 问题发现

用户报告 Manus 集成 API 消费金额仍在增长，经过彻底排查发现：

### ❌ 产生费用的 API（已全部禁用）

1. **Manus LLM API (`invokeLLM`)**
   - 位置：`server/fociRouter.ts`
   - 状态：✅ 已移除（改为直接返回数据）

2. **Manus Data API (`callDataApi` - Twitter)**
   - 位置：`server/twitterAdapter.ts`
   - 问题：调用 `callDataApi("Twitter/...")` 产生费用
   - 状态：✅ 已完全禁用（改为返回空数据）
   - 说明：虽然之前理解为"Manus 免费 API"，但实际上 Data API 是付费服务

## 最终配置

### ✅ 完全免费的功能

1. **Truth Social**
   - 实现：Python truthbrush 开源库
   - 成本：完全免费
   - 文件：`server/truthSocialAdapter.ts`, `server/truth_social_helper.py`

2. **FOCI 数据**
   - 实现：AlphaMoe MCP API
   - 成本：完全免费（用户自己的 API KEY）
   - 文件：`server/fociRouter.ts`

3. **Finnhub 股票数据**
   - 实现：直接调用 Finnhub API
   - 成本：免费额度（用户自己的 API KEY）
   - 文件：`server/finnhubAdapter.ts`

4. **AlphaVantage 股票数据**
   - 实现：直接调用 AlphaVantage API
   - 成本：免费额度（用户自己的 API KEY）
   - 文件：`server/alphaVantageAdapter.ts`

### ❌ 已禁用的功能

1. **Twitter 数据**
   - 原因：需要使用 Manus 付费 Data API
   - 状态：完全禁用，返回空数据
   - 影响：VIP 信息流中不再显示 Twitter 推文，只显示 Truth Social 帖子

2. **FOCI AI 助手**
   - 原因：需要使用 Manus 付费 LLM API
   - 状态：改为直接返回结构化数据
   - 影响：不再有 AI 生成的自然语言回答，改为展示原始数据

## 零成本保证

✅ **系统现在完全免费运行，不会产生任何 Manus API 费用**

所有功能使用：
- 开源免费库（Truth Social - truthbrush）
- 用户自己的免费 API KEY（FOCI、Finnhub、AlphaVantage）
- 无任何 Manus 付费服务调用

## 功能清单

**仍然可用的功能：**
- ✅ 股票搜索和详情（Finnhub、AlphaVantage）
- ✅ 自选股管理
- ✅ 回测模拟器
- ✅ VIP 信息流（仅 Truth Social，Twitter 已禁用）
- ✅ FOCI 数据查询（情绪、持仓、观点）
- ✅ 技术指标图表
- ✅ 红涨绿跌颜色规范

**已禁用的功能：**
- ❌ Twitter 推文获取
- ❌ FOCI AI 智能回答

## 监控建议

建议用户在部署后监控 Manus 消费金额：
1. 如果金额不再增长 → 确认零成本成功
2. 如果金额继续增长 → 可能有其他未知的 API 调用，需要进一步排查

## 技术细节

**已移除的 Manus API 调用：**
```typescript
// ❌ 已移除
import { invokeLLM } from "./_core/llm";
await invokeLLM({ messages: [...] });

// ❌ 已移除
import { callDataApi } from "./_core/dataApi";
await callDataApi("Twitter/...", {...});
```

**替代方案：**
```typescript
// ✅ 直接返回数据（FOCI）
return { response: formatData(fociData), fociData };

// ✅ 返回空数据（Twitter）
return [];
```
