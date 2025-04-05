import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageSwitcher({ language = 'ru', onChange = () => { } }) {
    const cn = bem('LanguageSwitcher');

    const handleChange = useCallback((e) => {
        const selectedLanguage = e.target.value;
        onChange(selectedLanguage);
    }, [onChange]);

    return (
        <div className={cn()}>
            <select value={language} onChange={handleChange} className={cn('select')}>
                <option value="ru">Русский</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}

export default LanguageSwitcher;
