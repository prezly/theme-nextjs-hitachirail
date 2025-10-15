import {
    DEFAULT_THEME_SETTINGS,
    getGoogleFontName,
    getRelatedFont,
    type ThemeSettings,
} from '@/theme-settings';
import { withoutUndefined } from '@/utils';

import { getCssVariables } from './getCssVariables';
import { InjectCssVariables } from './InjectCssVariables';

interface Props {
    settings: Partial<ThemeSettings>;
}

export function BrandingSettings({ settings }: Props) {
    const compiledSettings: ThemeSettings = {
        ...DEFAULT_THEME_SETTINGS,
        ...withoutUndefined(settings),
    };

    const primaryGoogleFontName = getGoogleFontName(compiledSettings.font);
    const relatedFont = getRelatedFont(compiledSettings.font);

    // Skip Google Fonts loading for custom fonts (when getGoogleFontName returns empty string)
    const isCustomFont = !primaryGoogleFontName;

    let families: string[] = [];
    if (!isCustomFont) {
        const primaryFontUrlName = primaryGoogleFontName.replace(' ', '+');
        
        if (relatedFont) {
            const relatedGoogleFontName = getGoogleFontName(relatedFont);
            const relatedFontUrlName = relatedGoogleFontName.replace(' ', '+');

            families = [
                `${primaryFontUrlName}:wght@600`,
                `${relatedFontUrlName}:wght@400;500;600;700;900`,
            ];
        } else {
            families = [`${primaryFontUrlName}:wght@400;500;600;700;900`];
        }
    }

    return (
        <>
            {!isCustomFont && (
                <link
                    href={`https://fonts.googleapis.com/css2?display=swap&${families
                        .map((family) => `family=${family}`)
                        .join('&')}`}
                    rel="stylesheet"
                />
            )}

            <InjectCssVariables variables={getCssVariables(compiledSettings)} />
        </>
    );
}
