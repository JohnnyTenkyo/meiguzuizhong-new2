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
