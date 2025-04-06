import {memo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {OPTIONS_LANG} from "../../constants";
import PropTypes from "prop-types";

const ButtonsLang = ({options, currentLang, onLangChange}) => {
  const cn = bem('LangSwitcher');
  return (
    <div className={cn()}>
      {options.map((option) => (
        <span
          key={option}
          className={cn('option', {active: option === currentLang})}
          onClick={() => onLangChange(option)}
        >
          {option.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

ButtonsLang.propTypes = {
  options: PropTypes.array,
  currentLang: PropTypes.oneOf([...OPTIONS_LANG]),
  onLangChange: PropTypes.func.isRequired,
};

export default memo(ButtonsLang);
