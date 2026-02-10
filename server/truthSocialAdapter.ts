/**
 * Truth Social API Adapter
 * 使用 truthbrush Python 库通过子进程调用
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
 * 调用 Python 脚本获取 Truth Social 数据
 */
async function callPythonScript(scriptName: string, args: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    const python = spawn('python3', [scriptPath, ...args], {
      env: { ...process.env },
    });

    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    python.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script error: ${stderr}`);
        reject(new Error(`Python script exited with code ${code}`));
        return;
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (error) {
        console.error(`Failed to parse Python output: ${stdout}`);
        reject(error);
      }
    });

    python.on('error', (error) => {
      console.error(`Failed to spawn Python process:`, error);
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

    console.log(`Fetching Truth Social posts for @${handle} via truthbrush...`);

    // 调用 truthbrush Python 脚本
    const result = await callPythonScript('truth_social_helper.py', [
      handle,
      limit.toString(),
    ]);

    if (!result.success) {
      console.error(`Failed to get Truth Social posts: ${result.error}`);
      return [];
    }

    const posts: TruthSocialPost[] = result.data.map((post: any) => ({
      id: post.id,
      text: post.content || '',
      created_at: post.created_at,
      reblogs_count: post.reblogs_count || 0,
      favourites_count: post.favourites_count || 0,
      replies_count: post.replies_count || 0,
      url: post.url || `https://truthsocial.com/@${handle}/posts/${post.id}`,
      media: post.media_attachments?.map((m: any) => ({
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

    const result = await callPythonScript('truth_social_helper.py', ['get_user_info']);

    if (!result.success) {
      console.error(`Failed to get Truth Social user info: ${result.error}`);
      return null;
    }

    saveToCache(cacheKey, result.user);
    return result.user;
  } catch (error) {
    console.error("Error verifying Truth Social credentials:", error);
    return null;
  }
}
