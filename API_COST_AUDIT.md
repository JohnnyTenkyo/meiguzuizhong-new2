# API 成本审查报告

## 审查日期
2026-02-09

## 审查目标
确保系统完全免费运行，零运维成本

## 审查结果

### ✅ 完全免费的 API

1. **Truth Social API**
   - 实现方式：Python truthbrush 开源库
   - 成本：完全免费
   - 文件：`server/truthSocialAdapter.ts`, `server/truth_social_helper.py`
   - 环境变量：`TRUTHSOCIAL_TOKEN`（用户提供）

2. **Twitter API**
   - 实现方式：Manus 平台内置免费 API
   - 成本：完全免费
   - 文件：`server/twitterAdapter.ts`
   - 调用：`callDataApi("Twitter/...")`
   - 说明：Manus 提供的免费 Twitter 数据访问服务

3. **FOCI API**
   - 实现方式：AlphaMoe 平台 MCP API
   - 成本：完全免费
   - 文件：`server/fociRouter.ts`
   - API Key：`mm_VSinPRmcMAoo1jCK2ToBQhoAi0g8ZCKLCnVrD7YkTBE`（用户提供的免费 KEY）

4. **Finnhub API**
   - 实现方式：直接调用 Finnhub 公开 API
   - 成本：免费额度
   - 文件：`server/finnhubAdapter.ts`
   - API Key：`FINNHUB_API_KEY`（用户提供）

5. **AlphaVantage API**
   - 实现方式：直接调用 AlphaVantage 公开 API
   - 成本：免费额度
   - 文件：`server/alphaVantageAdapter.ts`
   - API Key：`ALPHAVANTAGE_API_KEY`（用户提供）

### ❌ 已移除的付费 API

1. **Manus LLM API (invokeLLM)**
   - 原位置：`server/fociRouter.ts` 中的 FOCI 助手
   - 问题：调用 Manus 付费 LLM 服务
   - 解决方案：移除 AI 生成回答，改为直接返回 FOCI 数据的格式化展示
   - 影响：FOCI 助手不再使用 AI 生成自然语言回答，改为直接展示结构化数据

### 🔍 其他 Manus 内置服务（未使用）

以下 Manus 内置服务在代码中有引用但**未实际使用**，不产生费用：

- `storage.ts` - S3 存储服务（未调用）
- `imageGeneration.ts` - 图片生成服务（未调用）
- `voiceTranscription.ts` - 语音转文字服务（未调用）
- `map.ts` - 地图服务（未调用）
- `notification.ts` - 通知服务（未调用）

## 结论

✅ **系统现在完全免费运行，零运维成本**

所有使用的 API 都是：
1. 开源免费库（Truth Social - truthbrush）
2. Manus 平台提供的免费服务（Twitter API）
3. 用户自己的免费 API KEY（FOCI、Finnhub、AlphaVantage）

唯一移除的付费服务是 Manus LLM API，已替换为直接数据展示。

## 建议

如果未来需要 AI 功能，可以考虑：
1. 使用用户自己的 OpenAI API KEY
2. 使用开源本地 LLM 模型
3. 使用其他免费的 AI API 服务
