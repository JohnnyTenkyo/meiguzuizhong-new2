#!/usr/bin/env python3.11
"""
Truth Social API 助手脚本
使用 truthbrush 库（斯坦福大学维护）的 Python API
"""
import sys
import json
import os

def get_user_statuses(username, limit=20):
    """
    获取用户的帖子
    使用 truthbrush Python API
    """
    try:
        from truthbrush import Api
        
        # 获取凭据
        ts_username = os.getenv('TRUTHSOCIAL_USERNAME')
        ts_password = os.getenv('TRUTHSOCIAL_PASSWORD')
        ts_token = os.getenv('TRUTHSOCIAL_TOKEN', '')
        
        if not ts_username or not ts_password:
            return {
                "success": False,
                "error": "Truth Social credentials not configured"
            }
        
        # 创建 API 实例（自动登录）
        api = Api(username=ts_username, password=ts_password, token=ts_token)
        
        # 获取用户帖子（返回生成器）
        statuses_raw = api.pull_statuses(username, replies=False)
        
        # 转换为标准格式
        statuses = []
        for i, status in enumerate(statuses_raw):
            if i >= limit:
                break
            statuses.append({
                "id": status.get("id"),
                "created_at": status.get("created_at"),
                "content": status.get("content", ""),
                "url": status.get("url"),
                "replies_count": status.get("replies_count", 0),
                "reblogs_count": status.get("reblogs_count", 0),
                "favourites_count": status.get("favourites_count", 0),
                "media_attachments": status.get("media_attachments", []),
                "account": {
                    "username": status.get("account", {}).get("username"),
                    "display_name": status.get("account", {}).get("display_name"),
                    "followers_count": status.get("account", {}).get("followers_count", 0),
                    "avatar": status.get("account", {}).get("avatar"),
                }
            })
        
        return {
            "success": True,
            "data": statuses
        }
        
    except Exception as e:
        import traceback
        return {
            "success": False,
            "error": f"{str(e)}\n{traceback.format_exc()}"
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "Usage: python truth_social_helper.py <username> [limit]"}))
        sys.exit(1)
    
    username = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    
    result = get_user_statuses(username, limit)
    print(json.dumps(result))
