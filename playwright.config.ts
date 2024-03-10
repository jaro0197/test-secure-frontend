import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './e2e/tests',
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' },
        }
    ],
};

export default config;