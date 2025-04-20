import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import DateFormat from '../../utils/date-format';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentItem({ comment, onReplyClick, currentUserId, children, depth = 0 }) {
  const cn = bem('CommentItem');
  const maxDepth = 3;

  // const indent = Math.min(depth, 1) * 40;
  const indent = Math.min(depth, maxDepth) * 40;
  const { t, lang } = useTranslate();
  const isCurrentUser = currentUserId === comment.author?._id;

  return (
    <div className={cn()} style={{ marginLeft: `${indent}px` }}>
      <div className={cn('wrap')}>
        <div className={cn('header')}>
          <span className={cn('author', { me: isCurrentUser })}>
            {comment.author?.profile?.name}
          </span>
          <span className={cn('date')}> {DateFormat(comment.dateCreate, lang)}</span>
        </div>
        <div className={cn('comment')}>{comment.text}</div>
        {!comment.isDeleted && (
          <div className={cn('button')}>
            <Button
              style="text"
              onClick={() => onReplyClick(comment._id)}
              title={t('comments.reply')}
            />
          </div>
        )}
      </div>
      <div className={cn('children')}>{children}</div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onReplyClick: PropTypes.func,
  isReplyFormVisible: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number,
};

export default memo(CommentItem);
