import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ServicePageLayout({ head, footer, padding, gap, children }) {
  const cn = bem('ServicePageLayout');

  return (
    <div className={cn({ padding, gap })}>
      <h2 className={cn('head')}>{head}</h2>
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

ServicePageLayout.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf(['small', 'medium', 'none']),
  gap: PropTypes.oneOf(['small', 'medium', 'none']),
};

export default memo(ServicePageLayout);
