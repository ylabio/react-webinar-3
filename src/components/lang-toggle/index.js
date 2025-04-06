import { memo, useCallback } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function LangToggle() {
    const store = useStore();
    const cn = bem('LangToggle');

    const select = useSelector(state => ({
        lang: state.language.lang,
    }));

    const callbacks = {
        switchLanguage: useCallback(lang => store.actions.language.switch(lang), [store]),
    };

    return (
        <div className={cn()}>
            <button className={select.lang === 'ru' ? cn('active') : ''} onClick={() => callbacks.switchLanguage('ru')}>
                RU
            </button>
            <button className={select.lang === 'en' ? cn('active') : ''} onClick={() => callbacks.switchLanguage('en')}>
                EN
            </button>
        </div>
    );
}

export default memo(LangToggle);
