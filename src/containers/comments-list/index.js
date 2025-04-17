import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import CommentChain from '../../components/comment-chain';
import CommentForm from '../../components/comment-form';
import CommentsLayout from '../../components/comments-layout';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';

function CommentsList({ articleId }) {
  const dispatch = useDispatch();
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [rootCommentId, setRootCommentId] = useState(null);
  const [depth, setDepth] = useState(0);

  const { t, lang } = useTranslate();

  const select = useSelectorRedux(
    state => ({
      comments: state.comments.items,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  );

  // Проверка авторизации
  const exists = useSelector(state => state.session.exists);

  const callbacks = {
    handleReply: useCallback((targetCommentId, rootCommentId, depth) => {
      setReplyTargetId(targetCommentId);
      setRootCommentId(rootCommentId);
      setDepth(depth);
    }, []),

    handleResetForm: useCallback(() => {
      setReplyTargetId(null);
      setRootCommentId(null);
      setDepth(0);
    }, []),

    handleSubmitComment: useCallback(commentData => {
      dispatch(commentsActions.create(commentData));
      setReplyTargetId(null);
      setRootCommentId(null);
      setDepth(0);
    }, []),
  };

  const filteredComments = useMemo(() => {
    const result = listToTree(select.comments, '_id');
    return result;
  }, [select.comments]);

  if (!select.comments.length)
    return (
      <CommentsLayout title="Комментарии" count={select.count}>
        <CommentForm
          articleId={articleId}
          onSubmit={callbacks.handleSubmitComment}
          onReset={callbacks.handleResetForm}
          isAuth={exists}
        />
      </CommentsLayout>
    );

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout title="Комментарии" count={select.count}>
        {filteredComments[0].children.map(comment => (
          <Fragment key={comment._id}>
            <CommentChain
              comment={comment}
              onReply={callbacks.handleReply}
              rootCommentId={comment._id}
            />
            {rootCommentId === comment._id && (
              <CommentForm
                parentCommentId={replyTargetId}
                onSubmit={callbacks.handleSubmitComment}
                onReset={callbacks.handleResetForm}
                isAuth={exists}
                depth={depth}
              />
            )}
          </Fragment>
        ))}

        {!replyTargetId && (
          <CommentForm
            articleId={articleId}
            onSubmit={callbacks.handleSubmitComment}
            onReset={callbacks.handleResetForm}
            isAuth={exists}
            depth={depth}
          />
        )}
      </CommentsLayout>
    </Spinner>
  );
}

export default memo(CommentsList);
