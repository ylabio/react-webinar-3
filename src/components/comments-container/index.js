import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsContainer({ children, title = '', count = 0 }) {
  const cn = bem('CommentsContainer');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>
        {title} ({count})
      </h2>
      {children}
    </div>
  );
}

CommentsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  count: PropTypes.number,
};

export default memo(CommentsContainer);
