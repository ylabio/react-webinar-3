import {memo} from "react";
import {useTranslation} from "../../locales";
import {cn as bem} from "@bem-react/classname";
import './style.css';


function LangSwitcher(props) {
  const cn = bem('LangSwitcher');
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.currentLanguage === 'ru' ? 'en' : 'ru');
  }

  return <button onClick={toggle} className={cn()}>
    {t('language')}
  </button>
}

export default memo(LangSwitcher);
