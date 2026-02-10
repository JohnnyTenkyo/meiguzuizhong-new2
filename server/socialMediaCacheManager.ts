/**
 * Social Media Cache Manager
 * 管理 Twitter 和 Truth Social 数据的数据库缓存
 * 定时后台刷新，大幅提升加载速度
 */
import { getDb } from "./db";
import { socialMediaCache } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { getTwitterTweetsByUsername } from "./twitterAdapter";
import { getTruthSocialPosts } from "./truthSocialAdapter";

// 缓存有效期：5分钟
const CACHE_TTL_MS = 5 * 60 * 1000;

// 后台刷新间隔：5分钟
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

// 需要缓存的账号列表
const ACCOUNTS_TO_CACHE = [
  { platform: "twitter" as const, handle: "realDonaldTrump" },
  { platform: "truthsocial" as const, handle: "realDonaldTrump" },
];

/**
 * 从数据库缓存获取社交媒体帖子
 */
export async function getCachedPosts(
  platform: "twitter" | "truthsocial",
  handle: string,
  limit: number = 20
) {
  try {
    const db = await getDb();
    if (!db) return null;
    
    const posts = await db
      .select()
      .from(socialMediaCache)
      .where(
        and(
          eq(socialMediaCache.platform, platform),
          eq(socialMediaCache.handle, handle)
        )
      )
      .orderBy(socialMediaCache.createdAt)
      .limit(limit);

    // 检查缓存是否过期
    if (posts.length > 0) {
      const latestCacheTime = posts[0].cachedAt;
      const cacheAge = Date.now() - latestCacheTime.getTime();
      
      if (cacheAge < CACHE_TTL_MS) {
        console.log(`Using cached ${platform} posts for @${handle} (age: ${Math.round(cacheAge / 1000)}s)`);
        return posts.map(post => ({
          id: post.postId,
          text: post.content,
          created_at: post.createdAt.toISOString(),
          url: post.url || "",
          ...JSON.parse(post.metrics || "{}"),
          media: JSON.parse(post.media || "[]"),
        }));
      } else {
        console.log(`Cache expired for ${platform} @${handle} (age: ${Math.round(cacheAge / 1000)}s)`);
      }
    }

    return null; // 缓存不存在或已过期
  } catch (error) {
    console.error(`Error reading cache for ${platform} @${handle}:`, error);
    return null;
  }
}

/**
 * 刷新单个账号的缓存
 */
export async function refreshCache(
  platform: "twitter" | "truthsocial",
  handle: string
) {
  try {
    console.log(`Refreshing ${platform} cache for @${handle}...`);

    let posts: any[] = [];

    if (platform === "twitter") {
      posts = await getTwitterTweetsByUsername(handle, 20);
    } else if (platform === "truthsocial") {
      posts = await getTruthSocialPosts(handle, 20);
    }

    if (posts.length === 0) {
      console.log(`No posts fetched for ${platform} @${handle}`);
      return;
    }

    const db = await getDb();
    if (!db) return;

    // 删除旧缓存
    await db
      .delete(socialMediaCache)
      .where(
        and(
          eq(socialMediaCache.platform, platform),
          eq(socialMediaCache.handle, handle)
        )
      );

    // 插入新缓存
    const cacheEntries = posts.map((post: any) => ({
      platform,
      handle,
      postId: post.id,
      content: post.text || "",
      createdAt: new Date(post.created_at),
      metrics: JSON.stringify({
        retweet_count: post.retweet_count || 0,
        favorite_count: post.favorite_count || 0,
        reply_count: post.reply_count || 0,
        quote_count: post.quote_count || 0,
        views_count: post.views_count || 0,
      }),
      url: post.url || "",
      media: JSON.stringify(post.media || []),
    }));

    await db.insert(socialMediaCache).values(cacheEntries);

    console.log(`Successfully cached ${posts.length} ${platform} posts for @${handle}`);
  } catch (error) {
    console.error(`Error refreshing cache for ${platform} @${handle}:`, error);
  }
}

/**
 * 刷新所有账号的缓存
 */
export async function refreshAllCaches() {
  console.log("Starting background cache refresh...");
  
  for (const account of ACCOUNTS_TO_CACHE) {
    await refreshCache(account.platform, account.handle);
  }
  
  console.log("Background cache refresh completed");
}

/**
 * 启动后台定时刷新任务
 */
export function startCacheRefreshJob() {
  console.log(`Starting cache refresh job (interval: ${REFRESH_INTERVAL_MS / 1000}s)`);

  // 立即执行一次
  refreshAllCaches();

  // 定时执行
  setInterval(() => {
    refreshAllCaches();
  }, REFRESH_INTERVAL_MS);
}
