import React, { useCallback } from 'react';
import './style.css';
import { useLocale } from '../../store/language/language-context';

function LanguageSwitcher() {
    const { locale, changeLocale } = useLocale();

    const handleChangeLocale = useCallback(e => {
        changeLocale(e.target.dataset.lang)
    })

    return (
        <div className='Language-switcher'>
            <span
                className={`Language-switcher-item ${locale === 'ru' ? 'active' : ''}`}
                data-lang="ru"
                onClick={e => handleChangeLocale(e)}
            >
                ru
            </span>
            <div className='Language-switcher-divider' />
            <span
                className={`Language-switcher-item ${locale === 'en' ? 'active' : ''}`}
                data-lang="en"
                onClick={e => handleChangeLocale(e)}
            >
                en
            </span>
        </div>
    )
}

export default React.memo(LanguageSwitcher);