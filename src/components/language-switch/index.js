import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {useLanguage} from "../../hooks";

function LanguageSwitch() {
  const {language, switchLanguage} = useLanguage()

  const cn = bem('LanguageSwitch');

  const callbacks = {
    onSwitch: () => switchLanguage()
  }

  return (
    <div className={cn()}>
      <button className={cn('button', {active: language === 'rus'})} onClick={callbacks.onSwitch}>RUS</button>
      <button className={cn('button', {active: language === 'eng'})} onClick={callbacks.onSwitch}>ENG</button>
    </div>
  );
}

export default memo(LanguageSwitch);
