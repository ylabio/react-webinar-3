import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentList({ title, children }) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{title}</h3>
      <div className={cn('list')}>{children}</div>
    </div>
  );
}

CommentList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default memo(CommentList);
