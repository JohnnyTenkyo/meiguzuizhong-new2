export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Stock & Social Media API Keys
  finnhubApiKey: process.env.FINNHUB_API_KEY ?? "",
  alphaVantageApiKey: process.env.ALPHAVANTAGE_API_KEY ?? "",
  truthSocialToken: process.env.TRUTHSOCIAL_TOKEN ?? "",
  polygonIoApiKey: process.env.POLYGON_IO_API_KEY ?? "",
  massiveApiKey: process.env.MASSIVE_API_KEY ?? "",
  alphamoeFociApiKey: process.env.ALPHAMOE_FOCI_API_KEY ?? "",
};
