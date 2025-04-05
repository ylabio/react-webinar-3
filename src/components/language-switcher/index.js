import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useCallback } from 'react';

function LanguageSwitcher() {
    const store = useStore();
    const { language } = store.actions;
    const selector = useSelector(state => ({
        lang: state.language.language,
    }))

    const callbacks = {
        setLanguage: useCallback(newLang => language.setLanguage(newLang), [language]),
    }

    return (
        <div className='lang-btns'>
            <button onClick={() => { callbacks.setLanguage('ru'); console.log(selector.lang) }} className={`lang-btn left ${selector.lang === 'ru' ? 'active': ''}`}>RU</button>
            <button onClick={() => { callbacks.setLanguage('en'); console.log(selector.lang) }} className={`lang-btn right ${selector.lang === 'en' ? 'active': ''}`}>EN</button>
        </div>
    );
}

export default LanguageSwitcher;