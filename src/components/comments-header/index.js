import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsHeader({ count, t}) {
  const cn = bem('CommentsHeader');

  return (
    <h2 className={cn()}>
       {t('comments.title')}<span className={cn('Count')}> ({count})</span>
    </h2>
  );
}

CommentsHeader.propTypes = {
  count: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
};

export default React.memo(CommentsHeader);