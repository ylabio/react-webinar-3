import { memo } from 'react';
import './style.css';
import useTranslate from '../../hooks/use-translation'

function LangSwitcher () {
    const { lang, toggleLang } = useTranslate();
    
    return (
        <button
            className="LangSwitcher"
            onClick={toggleLang}
        >
            {lang}
        </button>
    );
}
export default memo(LangSwitcher);
