// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'http://127.0.0.1:5173/api',
  }
};
export default config;