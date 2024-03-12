import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Head(props) {

  const cn = bem('Head');

  const callbacks = {
    changeLanguage : (language) => props.changeLanguage(language)
  }

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      <div className={cn('languages')}>
        <button className={cn('languages-ru')} onClick={() => callbacks.changeLanguage("ru")}>RU</button>
        <button onClick={() => callbacks.changeLanguage("en")}>EN</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

Head.defaultProps = {
  changeLanguage: () => {},
}

export default memo(Head);
