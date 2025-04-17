import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import CommentChain from '../../components/comment-chain';
import CommentForm from '../../components/comment-form';
import CommentsLayout from '../../components/comments-layout';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import useTranslate from '../../hooks/use-translate';

function CommentsList({ articleId }) {
  const dispatch = useDispatch();
  const [activeFormTargetId, setActiveFormTargetId] = useState(null);

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
    handleReply: useCallback(commentId => {
      setActiveFormTargetId(commentId);
    }, []),

    handleResetForm: useCallback(() => {
      setActiveFormTargetId(null);
    }, []),

    handleSubmitComment: useCallback(commentData => {
      dispatch(commentsActions.create(commentData));
      setActiveFormTargetId(null);
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
        {filteredComments[0] && (
          <CommentChain
            comments={filteredComments[0].children}
            onReply={callbacks.handleReply}
            isAuth={exists}
            activeFormTargetId={activeFormTargetId}
            handleSubmitComment={callbacks.handleSubmitComment}
            handleResetForm={callbacks.handleResetForm}
          />
        )}

        {!activeFormTargetId && (
          <CommentForm
            articleId={articleId}
            onSubmit={callbacks.handleSubmitComment}
            onReset={callbacks.handleResetForm}
            isAuth={exists}
          />
        )}
      </CommentsLayout>
    </Spinner>
  );
}

export default memo(CommentsList);
