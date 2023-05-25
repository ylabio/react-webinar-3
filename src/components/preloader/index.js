import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Контейнер для деактивации всего что внутри, пока идут загрузки
 */

function Preloader({ children, isLoading }) {
  const cn = bem('Preloader');

  return (
    <>
      {
        isLoading ?
          <div className={cn()}>
            <div className={cn('block')}/>
            {children}
          </div>
        : children
      }
    </>
  );
}

Preloader.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool
}

Preloader.defaultProps = {
  isLoading: false
}

export default React.memo(Preloader);