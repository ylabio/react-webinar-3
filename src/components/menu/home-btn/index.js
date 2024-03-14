import { Link } from 'react-router-dom';
import './style.css'
import { UI_TEXTS } from '../../../consts/content';

const HomeBtn = () => {
  const currentLanguage = document.documentElement.lang;
  const uiText = {
    homeBtn: UI_TEXTS[currentLanguage].main.basketTool.homeBtn,
  }

  return (
    <div>
      <Link className={'Head-home-btn'} to='/'>{uiText.homeBtn}</Link>
    </div>
  );
};

export default HomeBtn;