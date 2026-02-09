#!/usr/bin/env python3
"""
Truth Social Helper Script
使用 truthbrush 库获取 Truth Social 数据
"""
import sys
import json
import os
from truthbrush import Api

def get_posts(username, limit=20):
    """获取用户的帖子"""
    try:
        token = os.environ.get('TRUTHSOCIAL_TOKEN')
        if not token:
            return {'success': False, 'error': 'TRUTHSOCIAL_TOKEN not set'}
        
        api = Api(token=token)
        
        # 查找用户
        user_info = api.lookup(username)
        if not user_info:
            return {'success': False, 'error': f'User @{username} not found'}
        
        # 获取用户ID
        user_id = user_info.get('id')
        if not user_id:
            return {'success': False, 'error': 'User ID not found'}
        
        # 获取帖子（pull_statuses 返回生成器）
        posts_generator = api.pull_statuses(username)
        posts = []
        
        try:
            for i, post in enumerate(posts_generator):
                if i >= limit:
                    break
                posts.append(post)
        except Exception as e:
            # 如果生成器出错，返回已获取的帖子
            print(f"Warning: Error while fetching posts: {e}", file=sys.stderr)
        
        return {
            'success': True,
            'posts': posts,
            'count': len(posts)
        }
        
    except Exception as e:
        return {'success': False, 'error': str(e)}

def get_user_info():
    """获取当前认证用户信息"""
    try:
        token = os.environ.get('TRUTHSOCIAL_TOKEN')
        if not token:
            return {'success': False, 'error': 'TRUTHSOCIAL_TOKEN not set'}
        
        api = Api(token=token)
        auth_id = api.get_auth_id()
        
        return {
            'success': True,
            'user': {
                'id': auth_id,
                'authenticated': True
            }
        }
        
    except Exception as e:
        return {'success': False, 'error': str(e)}

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No command specified'}))
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == 'get_posts':
        if len(sys.argv) < 3:
            print(json.dumps({'success': False, 'error': 'Username required'}))
            sys.exit(1)
        
        username = sys.argv[2]
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else 20
        result = get_posts(username, limit)
        
    elif command == 'get_user_info':
        result = get_user_info()
        
    else:
        result = {'success': False, 'error': f'Unknown command: {command}'}
    
    print(json.dumps(result))

if __name__ == '__main__':
    main()
