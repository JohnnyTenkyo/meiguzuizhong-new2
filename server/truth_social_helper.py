#!/usr/bin/env python3
"""
Truth Social API 助手脚本
使用 truthbrush 库（斯坦福大学维护）
"""
import sys
import json
import os
import subprocess

def get_user_statuses(username, limit=20):
    """
    获取用户的帖子
    使用 truthbrush CLI
    """
    try:
        # 设置环境变量
        env = os.environ.copy()
        env['TRUTHSOCIAL_USERNAME'] = os.getenv('TRUTHSOCIAL_USERNAME', '')
        env['TRUTHSOCIAL_PASSWORD'] = os.getenv('TRUTHSOCIAL_PASSWORD', '')
        
        if not env['TRUTHSOCIAL_USERNAME'] or not env['TRUTHSOCIAL_PASSWORD']:
            return {
                "success": False,
                "error": "Truth Social credentials not configured"
            }
        
        # 调用 truthbrush CLI
        result = subprocess.run(
            ['truthbrush', 'statuses', username],
            capture_output=True,
            text=True,
            timeout=30,
            env=env
        )
        
        if result.returncode != 0:
            return {
                "success": False,
                "error": f"truthbrush command failed: {result.stderr}"
            }
        
        # 解析 JSON 输出（每行一个 JSON 对象）
        statuses = []
        for line in result.stdout.strip().split('\n'):
            if line:
                try:
                    status = json.loads(line)
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
                    
                    if len(statuses) >= limit:
                        break
                except json.JSONDecodeError:
                    continue
        
        return {
            "success": True,
            "data": statuses[:limit]
        }
        
    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "error": "Truth Social API request timeout"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "Usage: python truth_social_helper.py <username>"}))
        sys.exit(1)
    
    username = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    
    result = get_user_statuses(username, limit)
    print(json.dumps(result))
