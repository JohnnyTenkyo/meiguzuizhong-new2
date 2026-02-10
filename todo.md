# 美股智能分析系统 - 任务清单

## 数据库迁移
- [x] 迁移用户表扩展字段
- [x] 迁移回测相关表（backtest_sessions, backtest_trades, backtest_positions）
- [x] 迁移追踪人物表（tracked_people）
- [x] 迁移本地认证表（local_users）
- [x] 运行数据库迁移

## 后端 API 迁移
- [x] 迁移 Truth Social 适配器和 Python 脚本
- [x] 迁移 Twitter API 助手
- [x] 迁移 Finnhub API 适配器
- [x] 迁移 AlphaVantage API 适配器
- [x] 迁移回测路由和逻辑
- [x] 迁移信息流路由
- [x] 迁移 Foci 路由
- [x] 迁移认证路由扩展
- [x] 迁移 WebSocket 支持（momentum）
- [x] 迁移订单簿逻辑

## 前端组件迁移
- [x] 迁移股票图表组件（StockChart）
- [x] 迁移 VIP 信息流组件（VIPNewsFlow）
- [x] 迁移 Foci 相关组件（FociDashboard, FociAssistant, FociBloggerTracker）
- [x] 迁移信号面板组件（SignalPanel, SignalTimeFilter）
- [x] 迁移筛选通知栏组件（ScreenerNotificationBar）
- [x] 迁移 AI 聊天框组件（AIChatBox）
- [x] 迁移仪表板布局组件（DashboardLayout）
- [x] 迁移登录对话框组件（LoginDialog, ManusDialog）
- [x] 迁移地图组件（Map）
- [x] 迁移所有 UI 组件

## 前端页面迁移
- [x] 创建主页/仪表板页面
- [x] 创建股票详情页面
- [x] 创建回测页面
- [x] 创建 VIP 信息流页面
- [x] 创建自选股页面
- [x] 更新路由配置

## 环境变量配置
- [x] 配置 DATABASE_URL
- [x] 配置 TRUTHSOCIAL_TOKEN
- [x] 配置 FINNHUB_API_KEY
- [x] 配置 ALPHAVANTAGE_API_KEY（可选）
- [x] 配置 MASSIVE_API_KEY（可选）
- [x] 配置 ALPHAMOE_FOCI_API_KEY（可选）
- [x] 配置 NODE_ENV=production

## 依赖安装
- [x] 安装前端依赖（lightweight-charts, recharts 等）
- [x] 安装后端依赖（bcryptjs, jsonwebtoken, ws 等）
- [ ] 安装 Python 依赖（truthbrush, curl-cffi）
- [x] 配置 patches（wouter）

## 涨跌颜色修复
- [x] 审查所有涉及涨跌显示的组件
- [x] 统一涨跌颜色逻辑（红涨绿跌）
- [x] 更新 CSS 变量和 Tailwind 配置
- [x] 更新图表配置
- [x] 创建颜色规范文档（COLOR_SCHEME.md）

## 功能测试
- [x] API 密钥配置验证测试
- [x] 基础功能测试（认证、路由）
- [x] 项目状态检查和预览
- [ ] 测试股票搜索功能
- [ ] 测试自选股添加/删除功能
- [ ] 测试股票详情页数据加载
- [ ] 测试回测功能（创建会话、买卖操作、资产计算）
- [ ] 测试 Truth Social 帖子获取
- [ ] 测试 Twitter 推文获取
- [ ] 测试 VIP 信息流显示
- [ ] 测试中文翻译功能
- [ ] 测试自定义追踪人物功能
- [ ] 测试用户认证流程

## 部署准备
- [x] 运行生产构建测试
- [x] 检查所有环境变量配置
- [x] 验证数据库连接
- [ ] 创建检查点
- [ ] 提供给用户确认

## Python 依赖安装（Truth Social 支持）
- [x] 安装 curl-cffi 库
- [x] 安装 truthbrush 库
- [x] 测试 Truth Social API 连接
- [x] 验证用户查询功能
- [ ] 创建新检查点

## Truth Social 显示问题修复
- [x] 检查后端 Truth Social API 调用
- [x] 重写 truthSocialAdapter 使用 Python truthbrush
- [x] 创建 Python 辅助脚本（truth_social_helper.py）
- [x] 修复环境变量配置问题
- [x] 修复 __dirname 问题
- [x] 测试 Python 脚本获取特朗普帖子
- [x] 运行 vitest 测试验证功能
- [ ] 创建修复后的检查点

## API 成本审查（确保零运维成本）
- [x] 审查所有 Manus 内置 API 调用
- [x] 检查 Twitter API 使用情况（确认使用 Manus 免费 API）
- [x] 检查 LLM API 使用情况（发现使用 invokeLLM）
- [x] 检查其他可能的付费服务
- [x] 保留 Twitter API（使用 Manus 免费 API）
- [x] 移除 FOCI LLM 功能（改为直接返回数据）
- [x] 创建 API 成本审查报告
- [x] 测试验证系统功能
- [ ] 创建完全免费版本的检查点

## Truth Social 显示修复（完整认证配置）
- [ ] 配置 Truth Social access_token
- [ ] 配置 Truth Social account ID
- [ ] 配置 Truth Social client_id 和 client_secret
- [ ] 更新 Python 脚本使用完整认证信息
- [ ] 修复 Python JSON 模块错误
- [ ] 测试获取特朗普帖子
- [ ] 创建修复后的检查点

## 彻底排查付费 API（消费金额仍在增长）
- [x] 检查 Twitter API 是否真的免费（发现使用 callDataApi 产生费用）
- [x] 检查 callDataApi 的实际费用（确认是 Manus 付费 Data API）
- [x] 禁用 Twitter API（改为返回空数据）
- [ ] 检查前端是否有直接 API 调用
- [ ] 检查所有路由中的其他 API 调用
- [ ] 监控消费金额变化
- [ ] 创建完全零成本版本

## 免费社交媒体信息流方案
- [x] 搜索免费的 Twitter/X API 或抓取方案（找到 twikit）
- [x] 搜索免赹的 Truth Social API 或抓取方案（curl-cffi）
- [x] 尝试 Truth Social（token 已过期）
- [x] 尝试 ntscraper（Nitter 实例已关闭）
- [x] 尝试 twikit（Cloudflare 阻止）
- [x] 发现 x-kit 项目（使用 twitter-openapi-typescript）
- [x] 安装 twitter-openapi-typescript npm 包
- [x] 更新 twitterAdapter 使用 twitter-openapi-typescript
- [x] 配置 Twitter AUTH_TOKEN 和 CT0 环境变量
- [x] 测试 Twitter 用户信息获取（成功）
- [x] 测试 Twitter 推文获取（成功）
- [ ] 测试 VIP 信息流显示
- [ ] 创建检查点

## Truth Social Token 测试
- [x] 发现 truthbrush（斯坦福大学维护）不需要 token
- [x] 安装 truthbrush 库
- [x] 配置 Truth Social 用户名和密码
- [x] 测试 truthbrush CLI 获取特朗普帖子（成功）
- [x] 创建 Python 辅助脚本
- [x] 更新 truthSocialAdapter 使用 truthbrush
- [ ] 创建检查点

## VIP 信息流显示问题修复
- [x] 检查 newsflowRouter 的 API 实现
- [x] 检查 VIPNewsFlow 前端组件
- [x] 修复 Python 版本问题（使用 python3.11）
- [x] 测试 Truth Social 数据获取（成功）
- [x] 添加 Twitter engagement 数据（点赞、转发、评论）
- [x] 添加 Truth Social engagement 数据
- [x] 修复 Home.tsx 中的 toFixed null 错误
- [x] 测试前端显示（成功）
- [ ] 创建修复后的检查点

## Truth Social 显示和缓存优化
- [x] 诊断 Truth Social 为什么没有显示（Python 版本问题、truthbrush CLI 问题）
- [x] 删除转发/评论板块（API 不支持区分）
- [x] 创建社交媒体缓存表（social_media_cache）
- [x] 实现缓存写入逻辑（socialMediaCacheManager.ts）
- [x] 实现缓存读取逻辑（5分钟过期）
- [x] 实现定时刷新机制（每 5 分钟后台刷新）
- [x] 修改 API 使用缓存（newsflowRouter.ts）
- [x] 测试缓存功能（成功，加载速度极快）
- [x] Truth Social 暂时禁用（API 太慢，40-50秒，影响用户体验）
- [ ] 创建检查点

## Twitter 推文排序和 Truth Social curl-cffi 集成
- [x] 修复 Twitter 推文排序（最新在前，按 created_at 降序）
- [x] 安装 curl-cffi Python 库（已安装 0.14.0）
- [x] 使用 curl-cffi 重写 Truth Social Python 脚本（truth_social_cffi.py）
- [x] 配置最新的 Truth Social 认证信息（registration-data token）
- [x] 创建 shell 脚本包装器解决 Python 版本问题（run_truth_social.sh）
- [x] 测试 Truth Social 数据获取（成功，<5秒）
- [x] 启用 Truth Social 缓存刷新（20 条帖子成功缓存）
- [x] 测试前端显示（20 条 Truth Social 帖子成功显示）
- [ ] 创建检查点
