import { describe, expect, it } from "vitest";
import { TwitterOpenApi } from 'twitter-openapi-typescript';

describe("Social Media Tokens", () => {
  it("validates Twitter AUTH_TOKEN", async () => {
    const authToken = process.env.TWITTER_AUTH_TOKEN;
    
    expect(authToken).toBeDefined();
    expect(authToken).toBeTruthy();
    
    // 尝试使用 token 创建客户端
    try {
      const api = new TwitterOpenApi();
      const ct0 = process.env.TWITTER_CT0;
      
      if (!ct0) {
        throw new Error('TWITTER_CT0 is required');
      }
      
      const client = await api.getClientFromCookies({
        auth_token: authToken!,
        ct0: ct0,
      });
      
      // 测试获取用户信息
      const response = await client.getUserApi().getUserByScreenName({ screenName: 'elonmusk' });
      
      console.log('Twitter API response:', JSON.stringify(response, null, 2));
      
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      // 只要能获取到数据就认为 token 有效
      expect(response.data.restId || response.data.id_str).toBeTruthy();
    } catch (error: any) {
      // 如果失败，打印错误信息
      console.error('Twitter token validation failed:', error.message);
      throw new Error(`Twitter AUTH_TOKEN is invalid: ${error.message}`);
    }
  }, 30000); // 30 秒超时

  it("validates Truth Social ACCESS_TOKEN", async () => {
    const accessToken = process.env.TRUTHSOCIAL_ACCESS_TOKEN;
    
    expect(accessToken).toBeDefined();
    expect(accessToken).toBeTruthy();
    
    // Truth Social token 验证会在实际使用时进行
    // 这里只检查 token 是否存在
    console.log('Truth Social ACCESS_TOKEN is set');
  });
});
