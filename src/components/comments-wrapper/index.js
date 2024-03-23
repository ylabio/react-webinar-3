import { memo } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsWrapper({ children, commentsAmount, t }) {
  const cn = bem('CommentsWrapper');

  return (
    <div className={cn()}>
      <span className={cn('amount')}>{`${t('comment.comments')} (${commentsAmount})`}</span>
      {children}
    </div>
  )
}

CommentsWrapper.propTypes = {
  children: PropTypes.node,
  commentsAmount: PropTypes.number,
  t: PropTypes.func
};

export default memo(CommentsWrapper);