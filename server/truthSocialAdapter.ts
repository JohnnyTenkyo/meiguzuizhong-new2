/**
 * Truth Social Adapter - 使用 curl-cffi 绕过 Cloudflare
 */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TruthSocialPost {
  id: string;
  text: string;
  created_at: string;
  reblogs_count: number;
  favourites_count: number;
  replies_count: number;
  url: string;
}

/**
 * 检查 Truth Social 是否已配置
 */
export function isTruthSocialConfigured(): boolean {
  return !!process.env.TRUTHSOCIAL_ACCESS_TOKEN;
}

/**
 * 获取 Truth Social 用户的帖子
 */
export async function getTruthSocialPosts(
  username: string,
  limit: number = 20
): Promise<TruthSocialPost[]> {
  return new Promise((resolve, reject) => {
    const accessToken = process.env.TRUTHSOCIAL_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("TRUTHSOCIAL_ACCESS_TOKEN not configured");
      return resolve([]);
    }

    const scriptPath = path.join(__dirname, "truth_social_cffi.py");

    console.log(`Fetching Truth Social posts for @${username} using curl-cffi...`);

    // 使用 shell 脚本包装器调用 Python 3.11
    const wrapperPath = path.join(__dirname, "run_truth_social.sh");
    const pythonProcess = spawn(wrapperPath, [
      scriptPath,
      username,
      accessToken,
      limit.toString(),
    ]);

    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Truth Social Python script error: ${stderr}`);
        return resolve([]);
      }

      try {
        const posts = JSON.parse(stdout);
        console.log(`Successfully fetched ${posts.length} Truth Social posts for @${username}`);
        resolve(posts);
      } catch (error) {
        console.error(`Failed to parse Truth Social response: ${error}`);
        resolve([]);
      }
    });

    // 设置超时（60秒）
    setTimeout(() => {
      pythonProcess.kill();
      console.error("Truth Social request timed out");
      resolve([]);
    }, 60000);
  });
}
