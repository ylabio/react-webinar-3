import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import dateFormat from '../../utils/date-format';
import Button from '../button';
import CommentForm from '../comment-form';
import './style.css';

function CommentItem({
  comment,
  onReply,
  isAuth,
  depth = 0,
  activeFormTargetId,
  handleSubmitComment,
  handleResetForm,
}) {
  const cn = bem('CommentItem');
  const { author, text, dateCreate, _id } = comment;

  const isReplyFormVisible = activeFormTargetId === _id;

  return (
    <div className={cn()} style={{ paddingLeft: 40 * depth }}>
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('author')}>{author?.profile?.name}</div>
          <div className={cn('date')}>{dateFormat(dateCreate)}</div>
        </div>
        <div className={cn('text')}>{text}</div>
        <Button
          style="text-primary"
          title={'Ответить'}
          fontSize="small"
          onClick={() => onReply(_id)}
        />
      </div>

      {isReplyFormVisible && (
        <CommentForm
          parentCommentId={_id}
          onSubmit={handleSubmitComment}
          onReset={handleResetForm}
          isAuth={isAuth}
        />
      )}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.object,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    _id: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  }).isRequired,
  isAuth: PropTypes.bool.isRequired,
  handleSubmitComment: PropTypes.func.isRequired,
  handleResetForm: PropTypes.func.isRequired,
  depth: PropTypes.number,
  activeFormTargetId: PropTypes.string,
};

export default memo(CommentItem);
