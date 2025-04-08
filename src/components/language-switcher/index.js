import {cn as bem} from '@bem-react/classname'
import { memo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './style.css';

function LanguageSwitcher() {
  const { setLang, lang } = useTranslation();
  const cn = bem('LanguageSwitcher');

  return (
    <div className={cn()}>
      <button 
        onClick={() => setLang('ru')}
        className={cn('button', { active: lang === 'ru' })}
      >
        RU
      </button>
      <button 
        onClick={() => setLang('en')}
        className={cn('button', { active: lang === 'en' })}
      >
        EN
      </button>
    </div>
  )
}

export default memo(LanguageSwitcher);