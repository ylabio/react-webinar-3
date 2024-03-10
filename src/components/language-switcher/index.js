import React from 'react';
import { useLanguage } from '../../store/language-context';

const LanguageSwitcher = () => {
    const { switchLanguage } = useLanguage();

    return (
        <div>
            <button onClick={switchLanguage}>Switch Language</button>
        </div>
    );
};

export default LanguageSwitcher;