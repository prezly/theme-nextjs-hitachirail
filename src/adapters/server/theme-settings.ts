import { ThemeSettingsAdapter } from '@prezly/theme-kit-nextjs/server';

import { DEFAULT_THEME_SETTINGS, type ThemeSettings } from '@/theme-settings';

import { initPrezlyClient } from './prezly';

/**
 * Custom theme settings loader that prioritizes local DEFAULT_THEME_SETTINGS
 * over API settings. This ensures the Hitachi Rail custom configuration
 * takes precedence over any settings configured in the Prezly CMS.
 */
export const { useThemeSettings: themeSettings } = ThemeSettingsAdapter.connect<ThemeSettings>({
    defaults: DEFAULT_THEME_SETTINGS,
    settings: async () => {
        const apiSettings = await initPrezlyClient().contentDelivery.themeSettings();
        
        // Merge API settings with local defaults, with local defaults taking priority
        // This reverses the typical pattern where API settings override defaults
        return {
            ...apiSettings,
            ...DEFAULT_THEME_SETTINGS,
        } as ThemeSettings;
    },
});
