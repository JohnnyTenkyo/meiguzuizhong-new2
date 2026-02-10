import { describe, expect, it } from "vitest";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Truth Social Credentials Validation", () => {
  it("should successfully fetch Trump's posts using truthbrush", async () => {
    const scriptPath = path.join(__dirname, "truth_social_helper.py");
    
    const result = await new Promise<{ success: boolean; data?: any; error?: string }>((resolve) => {
      const python = spawn("python3", [scriptPath, "realDonaldTrump", "5"], {
        env: {
          ...process.env,
          TRUTHSOCIAL_USERNAME: process.env.TRUTHSOCIAL_USERNAME || "",
          TRUTHSOCIAL_PASSWORD: process.env.TRUTHSOCIAL_PASSWORD || "",
        },
      });

      let stdout = "";
      let stderr = "";

      python.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      python.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      python.on("close", (code) => {
        if (code !== 0) {
          resolve({ success: false, error: `Python script exited with code ${code}: ${stderr}` });
          return;
        }

        try {
          const parsed = JSON.parse(stdout);
          resolve(parsed);
        } catch (e) {
          resolve({ success: false, error: `Failed to parse JSON: ${stdout}` });
        }
      });

      // 30秒超时
      setTimeout(() => {
        python.kill();
        resolve({ success: false, error: "Timeout after 30s" });
      }, 30000);
    });

    console.log("Truth Social API Result:", JSON.stringify(result, null, 2));

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data!.length).toBeGreaterThan(0);
    
    // 验证第一条帖子的结构
    const firstPost = result.data![0];
    expect(firstPost).toHaveProperty("id");
    expect(firstPost).toHaveProperty("content");
    expect(firstPost).toHaveProperty("created_at");
    expect(firstPost.account).toHaveProperty("username");
    
    console.log(`✅ Successfully fetched ${result.data!.length} posts from @realDonaldTrump`);
  }, 40000); // 40秒超时
});
