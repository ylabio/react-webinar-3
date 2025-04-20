import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../../components/comments-item';
import CommentForm from '../../components/comment-form';
import CommentsLink from '../comments-link';
import useTranslate from '../../hooks/use-translate';
function CommentsList({
  comment,
  children,
  replyFormId,
  onReplyClick,
  onSubmitReply,
  onCancelReply,
  isAuth,
  depth = 0,
  userId,
}) {
  const { t } = useTranslate();
  const formRef = useRef(null);

  useEffect(() => {
    if (replyFormId === comment._id && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [replyFormId, comment._id]);

  return (
    <CommentItem
      comment={comment}
      onReplyClick={onReplyClick}
      isReplyFormVisible={replyFormId === comment._id} //форма выходит если id совпадает
      depth={depth}
      currentUserId={userId}
    >
      {replyFormId === comment._id &&
        (isAuth ? (
          <CommentForm
            title={t('comments.new-reply')}
            onSubmit={text => onSubmitReply(text, comment._id)}
            onCancel={onCancelReply}
            formRef={formRef}
          />
        ) : (
          <CommentsLink />
        ))}
      {children}
    </CommentItem>
  );
}

CommentsList.propTypes = {
  comment: PropTypes.object.isRequired,
  children: PropTypes.node,
  replyFormId: PropTypes.string,
  onReplyClick: PropTypes.func,
  onSubmitReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  isAuth: PropTypes.bool,
  depth: PropTypes.number,
};

export default memo(CommentsList);
