import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function LocaleSwitcher(props) {

  const callbacks = {
    setLocale: locale => props.setLocale(locale)
  }

  const cn = bem('LocaleSwitcher');

  return (
    <div className='LocaleSwitcher'>
      {props.locales.map(item =>
        <div
          key={item}
          className={cn('item', {active: item === props.locale})}
          onClick={() => callbacks.setLocale(item)}
        >{item}</div>
      )}
    </div>
  )
}

LocaleSwitcher.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string).isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func
};

LocaleSwitcher.defaultProps = {
  setLocale: locale => {},
}

export default memo(LocaleSwitcher);