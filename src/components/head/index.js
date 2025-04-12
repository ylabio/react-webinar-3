import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

/**
 * Главная страница - первичная загрузка каталога
 */
function Head({title, children}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1>{title}</h1>
        <div className={cn('place')}>{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
