import { memo} from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LanguageSelectButton({lang, active, onClick}) {

  const cn = bem('LanguageSelectButton');
  
  return (
    <div
      className={active ? cn('active') : cn()}
      onClick={onClick}
    >
      {lang}
    </div>
  );
}

export default memo(LanguageSelectButton);