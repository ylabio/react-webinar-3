import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsList({count, children, t}) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <p className={cn('title')}>{`${t('comment.listTitle')} (${count})`}</p>
      {
        children
      }
    </div>
  )
}

CommentsList.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
  t: PropTypes.func
}

CommentsList.defaultProps = {
  t: (text) => text
}

export default memo(CommentsList);