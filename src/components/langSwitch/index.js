import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import RuFlag from '../../assets/icon/ru1.svg';
import EngFlag from '../../assets/icon/eng1.svg';
import './style.css';

function LangSwitch() {
  const store = useStore();
  const cn = bem('LangSwitch');

  const select = useSelector(state => ({
    language: state.language.lang,
  }));

  //если в будущем станет больше языков, можно будет добавить больше вариантов
  function setFlag() {
    switch(select.language) {
      case 'ru': return <RuFlag className={cn('flag')}/>
      case 'eng': return <EngFlag className={cn('flag')}/>
    }
  }

  function changeLang() {
    const newLang = select.language === 'ru' ? 'eng' : 'ru';
    store.actions.language.changeLanguage(newLang);
  }

  return (
    <button className={cn()} onClick={changeLang}>
      {select.language}
      {setFlag()}
    </button>
  );
}

export default memo(LangSwitch);