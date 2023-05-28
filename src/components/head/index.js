import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Head({title, languageSwitcher, languageSwitcherTitle}){

  const cn = bem('Head');

  const callbacks = {
    languageSwitcher: () => languageSwitcher()
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className={cn('button')} onClick={callbacks.languageSwitcher}>{languageSwitcherTitle}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

Head.defaultProps = {
  languageSwitcher: () => {},
};

export default memo(Head);
