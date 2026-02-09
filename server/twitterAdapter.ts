/**
 * Twitter Adapter - 完全禁用版本
 * 不使用任何 API（包括 Manus Data API），确保零成本
 */

interface TwitterUser {
  rest_id: string;
  screen_name: string;
  name: string;
  description?: string;
  followers_count: number;
  verified: boolean;
  profile_image_url?: string;
}

interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  retweet_count: number;
  favorite_count: number;
  reply_count: number;
  quote_count: number;
  is_retweet: boolean;
  is_reply: boolean;
  media?: Array<{
    type: string;
    url: string;
  }>;
}

/**
 * 获取 Twitter 用户信息
 * 已禁用：返回 null（避免产生费用）
 */
export async function getTwitterUserProfile(username: string): Promise<TwitterUser | null> {
  console.log(`[Twitter API Disabled] Cannot fetch profile for @${username} - feature disabled to ensure zero cost`);
  return null;
}

/**
 * 通过用户名获取推文
 * 已禁用：返回空数组（避免产生费用）
 */
export async function getTwitterTweetsByUsername(
  username: string,
  count: number = 20
): Promise<TwitterTweet[]> {
  console.log(`[Twitter API Disabled] Cannot fetch tweets for @${username} - feature disabled to ensure zero cost`);
  return [];
}
