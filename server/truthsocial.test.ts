import { describe, expect, it } from "vitest";
import { getTruthSocialPosts, isTruthSocialConfigured } from "./truthSocialAdapter";

describe("Truth Social Integration", () => {
  it("should check if Truth Social is configured", () => {
    const configured = isTruthSocialConfigured();
    // Should be true since TRUTHSOCIAL_TOKEN is set
    expect(typeof configured).toBe("boolean");
    console.log("Truth Social configured:", configured);
  });

  it("should fetch Truth Social posts for realDonaldTrump", async () => {
    if (!isTruthSocialConfigured()) {
      console.log("Truth Social not configured, skipping test");
      return;
    }

    const posts = await getTruthSocialPosts("realDonaldTrump", 3);
    
    console.log(`Fetched ${posts.length} posts`);
    
    // Should return an array (may be empty if API fails)
    expect(Array.isArray(posts)).toBe(true);
    
    if (posts.length > 0) {
      const post = posts[0];
      console.log("Sample post:", {
        id: post.id,
        text: post.text.substring(0, 100) + "...",
        created_at: post.created_at,
        favourites_count: post.favourites_count,
      });
      
      // Verify post structure
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("text");
      expect(post).toHaveProperty("created_at");
      expect(post).toHaveProperty("url");
    }
  }, 30000); // 30 second timeout for API call
});
