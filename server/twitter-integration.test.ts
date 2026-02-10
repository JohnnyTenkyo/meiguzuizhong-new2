import { describe, expect, it } from "vitest";
import { getTwitterUserProfile, getTwitterTweetsByUsername } from "./twitterAdapter";

describe("Twitter Integration", () => {
  it("fetches Twitter user profile", async () => {
    const profile = await getTwitterUserProfile("elonmusk");
    
    expect(profile).toBeDefined();
    expect(profile).not.toBeNull();
    expect(profile?.screen_name).toBe("elonmusk");
    expect(profile?.followers_count).toBeGreaterThan(0);
    
    console.log("Twitter user profile:", JSON.stringify(profile, null, 2));
  }, 30000);

  it("fetches Twitter tweets", async () => {
    const tweets = await getTwitterTweetsByUsername("elonmusk", 5);
    
    expect(tweets).toBeDefined();
    expect(Array.isArray(tweets)).toBe(true);
    expect(tweets.length).toBeGreaterThan(0);
    expect(tweets.length).toBeLessThanOrEqual(5);
    
    console.log(`Fetched ${tweets.length} tweets from @elonmusk`);
    console.log("First tweet:", JSON.stringify(tweets[0], null, 2));
  }, 30000);
});
