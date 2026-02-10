"""
Truth Social API - 使用 curl-cffi 绕过 Cloudflare
"""
import sys
import json
from curl_cffi import requests

def get_user_statuses(username: str, access_token: str, limit: int = 20):
    """
    获取 Truth Social 用户的帖子
    
    Args:
        username: Truth Social 用户名（如 realDonaldTrump）
        access_token: 访问令牌
        limit: 返回的帖子数量
    
    Returns:
        包含帖子数据的 JSON 数组
    """
    try:
        # Truth Social API 端点
        base_url = "https://truthsocial.com/api/v1"
        
        # 首先获取用户 ID
        lookup_url = f"{base_url}/accounts/lookup?acct={username}"
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Origin": "https://truthsocial.com",
            "Referer": "https://truthsocial.com/",
        }
        
        # 使用 curl-cffi 模拟 Chrome 浏览器
        session = requests.Session(impersonate="chrome120")
        
        # 调试信息
        print(json.dumps({"debug": "Fetching user info", "url": lookup_url}), file=sys.stderr)
        
        # 获取用户信息
        user_response = session.get(lookup_url, headers=headers, timeout=30)
        print(json.dumps({"debug": "User response status", "status": user_response.status_code}), file=sys.stderr)
        user_response.raise_for_status()
        user_data = user_response.json()
        
        user_id = user_data.get("id")
        if not user_id:
            print(json.dumps({"error": "User not found"}), file=sys.stderr)
            return []
        
        # 获取用户的帖子
        statuses_url = f"{base_url}/accounts/{user_id}/statuses?limit={limit}&exclude_replies=true&exclude_reblogs=true"
        
        statuses_response = session.get(statuses_url, headers=headers, timeout=30)
        statuses_response.raise_for_status()
        statuses = statuses_response.json()
        
        # 转换为统一格式
        posts = []
        for status in statuses:
            post = {
                "id": status.get("id", ""),
                "text": status.get("content", "").replace("<p>", "").replace("</p>", "").replace("<br />", "\n"),
                "created_at": status.get("created_at", ""),
                "reblogs_count": status.get("reblogs_count", 0),
                "favourites_count": status.get("favourites_count", 0),
                "replies_count": status.get("replies_count", 0),
                "url": status.get("url", ""),
            }
            posts.append(post)
        
        return posts
        
    except requests.exceptions.HTTPError as e:
        print(json.dumps({"error": f"HTTP error: {e}"}), file=sys.stderr)
        return []
    except Exception as e:
        print(json.dumps({"error": f"Unexpected error: {str(e)}"}), file=sys.stderr)
        return []

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: truth_social_cffi.py <username> <access_token> [limit]"}), file=sys.stderr)
        sys.exit(1)
    
    username = sys.argv[1]
    access_token = sys.argv[2]
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 20
    
    posts = get_user_statuses(username, access_token, limit)
    print(json.dumps(posts, ensure_ascii=False))
