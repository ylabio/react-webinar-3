import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductLayout({head, footer, children}) {

  const cn = bem('ProductLayout');

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
    </div>
  );
}

ProductLayout.propTypes = {
  head: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node
}

export default memo(ProductLayout);
