import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { useLanguage } from '../../language';
import { cn as bem } from '@bem-react/classname';

function Head({title}) {
  const cn = bem('Head')
  const { currentLanguage, toggleLanguage } = useLanguage()

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className={cn('button')} onClick={toggleLanguage}>Переключить на {currentLanguage === 'ru' ? 'Английский' : 'Русский'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
