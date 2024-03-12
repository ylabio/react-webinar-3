import React from 'react';
import { useLanguage } from '../../store/language-context';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const LanguageSwitcher = () => {
    const { switchLanguage } = useLanguage();

    const cn = bem('LanguageSwitcher');

    return (
        <div className={cn()}>
            <button onClick={switchLanguage}>Switch Language</button>
        </div>
    );
};

export default LanguageSwitcher;