import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LanguageSwitch(props) {

  const cn = bem('LanguageSwitch');

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={() => props.onSwitch('ru')}>Русский</button>
      <button className={cn('button')} onClick={() => props.onSwitch('en')}>English</button>
    </div>
  )
}

LanguageSwitch.propTypes = {
  onSwitch: PropTypes.func,
};

LanguageSwitch.defaultProps = {
  onSwitch: () => {
  }
}

export default memo(LanguageSwitch);