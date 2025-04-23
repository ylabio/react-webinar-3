import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsConatiner({ children, t, count = '0' }) {
  const cn = bem('CommentsConatiner');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>
        {t('comments.header')} ({count})
      </h2>
      {children}
    </div>
  );
}

CommentsConatiner.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  t: PropTypes.func,
  children: PropTypes.node,
};

export default memo(CommentsConatiner);
