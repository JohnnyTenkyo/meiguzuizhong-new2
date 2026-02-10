/**
 * Truth Social API Adapter
 * 使用 truthbrush CLI 直接调用（完全免费）
 */
import { spawn } from 'child_process';

interface TruthSocialPost {
  id: string;
  text: string;
  created_at: string;
  reblogs_count: number;
  favourites_count: number;
  replies_count: number;
  url: string;
  media?: Array<{
    type: string;
    url: string;
  }>;
}

// 缓存 Truth Social 数据，避免频繁请求
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

/**
 * 检查 Truth Social 是否已配置
 */
export function isTruthSocialConfigured(): boolean {
  return !!(process.env.TRUTHSOCIAL_USERNAME && process.env.TRUTHSOCIAL_PASSWORD);
}

/**
 * 从缓存获取数据
 */
function getFromCache(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

/**
 * 保存数据到缓存
 */
function saveToCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * 调用 truthbrush CLI 获取 Truth Social 数据
 */
async function callTruthbrushCLI(username: string, limit: number = 20): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const truthbrush = spawn('truthbrush', ['statuses', username], {
      env: {
        ...process.env,
        TRUTHSOCIAL_USERNAME: process.env.TRUTHSOCIAL_USERNAME || '',
        TRUTHSOCIAL_PASSWORD: process.env.TRUTHSOCIAL_PASSWORD || '',
      },
    });

    let stdout = '';
    let stderr = '';

    truthbrush.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    truthbrush.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    truthbrush.on('close', (code) => {
      if (code !== 0) {
        console.error(`truthbrush CLI error: ${stderr}`);
        reject(new Error(`truthbrush CLI exited with code ${code}`));
        return;
      }

      try {
        // 解析 JSON 输出（每行一个 JSON 对象）
        const statuses = [];
        for (const line of stdout.trim().split('\n')) {
          if (line && statuses.length < limit) {
            try {
              const status = JSON.parse(line);
              statuses.push(status);
            } catch (e) {
              // 跳过无效的 JSON 行
              continue;
            }
          }
        }
        resolve(statuses);
      } catch (error) {
        console.error(`Failed to parse truthbrush output:`, error);
        reject(error);
      }
    });

    truthbrush.on('error', (error) => {
      console.error(`Failed to spawn truthbrush process:`, error);
      reject(error);
    });
  });
}

/**
 * 通过用户名获取 Truth Social 帖子
 */
export async function getTruthSocialPosts(
  handle: string,
  limit: number = 20
): Promise<TruthSocialPost[]> {
  try {
    if (!isTruthSocialConfigured()) {
      console.log("Truth Social credentials not configured, skipping");
      return [];
    }

    // 检查缓存
    const cacheKey = `posts:${handle}:${limit}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.log(`Using cached Truth Social posts for @${handle}`);
      return cached;
    }

    console.log(`Fetching Truth Social posts for @${handle} via truthbrush CLI...`);

    // 调用 truthbrush CLI
    const statuses = await callTruthbrushCLI(handle, limit);

    const posts: TruthSocialPost[] = statuses.map((status: any) => ({
      id: status.id,
      text: status.content || '',
      created_at: status.created_at,
      reblogs_count: status.reblogs_count || 0,
      favourites_count: status.favourites_count || 0,
      replies_count: status.replies_count || 0,
      url: status.url || `https://truthsocial.com/@${handle}/posts/${status.id}`,
      media: status.media_attachments?.map((m: any) => ({
        type: m.type || 'image',
        url: m.url,
      })),
    }));

    // 保存到缓存
    saveToCache(cacheKey, posts);

    console.log(`Successfully fetched ${posts.length} Truth Social posts for @${handle}`);
    return posts;
  } catch (error) {
    console.error(`Error fetching Truth Social posts for @${handle}:`, error);
    return [];
  }
}

/**
 * 获取当前认证用户的信息
 */
export async function getTruthSocialUserInfo() {
  try {
    if (!isTruthSocialConfigured()) {
      return null;
    }

    // 检查缓存
    const cacheKey = "userinfo";
    const cached = getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    // Truth Social CLI 不支持直接获取用户信息
    // 返回基本信息
    const userInfo = {
      username: process.env.TRUTHSOCIAL_USERNAME,
      authenticated: true,
    };

    saveToCache(cacheKey, userInfo);
    return userInfo;
  } catch (error) {
    console.error("Error verifying Truth Social credentials:", error);
    return null;
  }
}
