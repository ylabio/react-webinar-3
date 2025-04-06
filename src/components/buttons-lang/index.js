import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {useLocation, useNavigate} from "react-router";

const ButtonsLang = () => {
  const cn = bem('LangSwitcher');
  const options = ['ru', 'en'];

  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = location.pathname.split('/')[1] || 'ru';

  const handleClick = (lang) => {
    if (lang === currentLang) return;

    const parts = location.pathname.split('/');
    parts[1] = lang; // заменяем язык
    navigate(parts.join('/') + location.search);
  };

  return (
    <div className={cn()}>
      {options.map((option) => (
        <span
          key={option}
          className={cn('option', { active: option === currentLang })}
          onClick={() => handleClick(option)}
        >
          {option.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export default memo(ButtonsLang);
