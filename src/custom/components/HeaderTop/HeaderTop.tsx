'use client';

import type { Locale } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';

import { Link } from '@/components/Link';
import HitachiLogo from '@/public/images/hitachi-logo.svg';

import { IconEnvelope, IconGlobe } from './icons';
import styles from './HeaderTop.module.scss';

interface Props {
    localeCode: Locale.Code;
    onSearchClick?: () => void;
}

export function HeaderTop({ localeCode, onSearchClick }: Props) {
    return (
        <div className={styles.headerTop}>
            <div className="container">
                <div className={styles.content}>
                    {/* Hitachi Logo */}
                    <Link
                        href={{ routeName: 'index', params: { localeCode } }}
                        className={styles.logoLink}
                    >
                        <HitachiLogo className={styles.logo} aria-label="Hitachi" />
                    </Link>

                    {/* Navigation Links */}
                    <nav className={styles.navigation}>
                        <Link
                            href={{ routeName: 'index', params: { localeCode } }}
                            className={styles.navLink}
                        >
                            <span className="icon zmdi zmdi-globe-bold" aria-hidden="true" />
                            <span>Our Locations</span>
                        </Link>
                        
                        <Link
                            href={{ routeName: 'index', params: { localeCode } }}
                            className={styles.navLink}
                        >
                            <span className="icon zmdi zmdi-envelope" aria-hidden="true" />
                            <span>Contact</span>
                        </Link>
                        
                        <button
                            type="button"
                            className={classNames(styles.navLink, styles.navButton)}
                            onClick={onSearchClick}
                        >
                            <span className="icon font-ico-search" aria-hidden="true" />
                            <span>Search</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

