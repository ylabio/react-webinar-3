import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ title, head, footer, children }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={`${cn('center')} ${title}`}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  title: string,
  head: PropTypes.node,
  footer: PropTypes.node,
};

export default memo(PageLayout);
