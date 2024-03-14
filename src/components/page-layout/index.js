import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Basket from '../../app/basket';

function PageLayout({head, footer, children, modalStatus}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
      {modalStatus === 'basket' && <Basket/>}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
