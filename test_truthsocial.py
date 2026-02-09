#!/usr/bin/env python3
"""
Test Truth Social API connection using truthbrush
"""
import os
import sys

try:
    from truthbrush import Api
    print("✓ truthbrush.Api imported successfully")
except ImportError as e:
    print(f"✗ Failed to import truthbrush: {e}")
    sys.exit(1)

try:
    import curl_cffi
    print("✓ curl-cffi imported successfully")
except ImportError as e:
    print(f"✗ Failed to import curl-cffi: {e}")
    sys.exit(1)

# Get token from environment
token = os.environ.get("TRUTHSOCIAL_TOKEN")
if not token:
    print("✗ TRUTHSOCIAL_TOKEN environment variable not set")
    sys.exit(1)

print(f"✓ TRUTHSOCIAL_TOKEN found (length: {len(token)})")

# Test basic Truth Social connection
try:
    print("\n--- Testing Truth Social API Connection ---")
    api = Api(token=token)
    print("✓ Truth Social API client created successfully")
    
    # Test by looking up a user (e.g., realDonaldTrump)
    print("\nAttempting to lookup user 'realDonaldTrump'...")
    user_info = api.lookup("realDonaldTrump")
    print(f"✓ Successfully looked up user: {user_info.get('display_name', 'Unknown')}")
    print(f"   Username: @{user_info.get('username', 'unknown')}")
    print(f"   Followers: {user_info.get('followers_count', 0):,}")
    
    # Verify we can access basic user info
    print("\n✓ Truth Social API can successfully query user information")
    
except Exception as e:
    print(f"✗ Error testing Truth Social API: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n✅ All Truth Social dependencies are properly installed and configured!")
print("✅ Truth Social API is working correctly!")
