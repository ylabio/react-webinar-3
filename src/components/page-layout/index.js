import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

/**
 * Компонент лэйаута основной страницы
 * @param {Node} children - дочерний компонент
 * @returns разметку
 */
function PageLayout({children}) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>
        {children}
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node
};

export default React.memo(PageLayout);
