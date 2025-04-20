import { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import CommentsLayout from '../../components/comments-layout';
import CommentForm from '../../components/comment-form';
import CommentsList from '../../components/comments-list';
import listToTree from '../../utils/list-to-tree';
import commentActions from '../../store-redux/comment/action';
import CommentsLink from '../../components/comments-link';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Comments({ articleId, parentType = 'article' }) {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [replyFormId, setReplyFormId] = useState(null);

  const items = useSelectorRedux(state => state.comment.data.items);
  const waiting = useSelectorRedux(state => state.comment.waiting);
  const raw = useMemo(() => items || [], [items]);
  const comments = useMemo(() => listToTree(raw, '_id', parentType), [raw, parentType]);
  const count = raw.length;
  const maxDepth = 3;
  // const { comments, waiting, count } = useSelectorRedux(state => {
  //   const raw = state.comment.data.items || [];
  //   return {
  //     comments: listToTree(raw),
  //     waiting: state.comment.waiting,
  //     count: raw.length,
  //   };
  // });

  const isAuth = useSelector(state => state.session.exists);
  const userId = useSelector(state => state.session.user?._id);

  useEffect(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  const handleReplyClick = useCallback(id => {
    setReplyFormId(prev => (prev === id ? null : id)); //закрыть, если уже открыта
  }, []);

  const handleSubmitReply = useCallback(
    (text, parentId) => {
      dispatch(commentActions.addComment(text, parentId, 'comment'));
      setReplyFormId(null); //закрыть форму, после отправить
    },
    [dispatch],
  );

  const handleSubmitNew = useCallback(
    text => {
      dispatch(commentActions.addComment(text, articleId, 'article'));
    },
    [dispatch, articleId],
  );

  const renderCommentsTree = (items, depth = 0) => {
    const flat = [];

    const traverse = (nodes, currentDepth) => {
      for (const comment of nodes) {
        const limitedDepth = Math.min(currentDepth, maxDepth);

        flat.push(
          <CommentsList
            key={comment._id}
            comment={comment}
            replyFormId={replyFormId}
            onReplyClick={handleReplyClick}
            onSubmitReply={handleSubmitReply}
            onCancelReply={() => setReplyFormId(null)}
            isAuth={isAuth}
            depth={limitedDepth}
            userId={userId}
          />,
        );

        // если depth меньше maxDepth, то рисуем детей
        if (currentDepth < maxDepth && comment.children?.length) {
          traverse(comment.children, currentDepth + 1);
        }

        // если depth >= maxDepth, то плоско, на этом же уровне
        if (currentDepth >= maxDepth && comment.children?.length) {
          for (const child of comment.children) {
            flat.push(
              <CommentsList
                key={child._id}
                comment={child}
                replyFormId={replyFormId}
                onReplyClick={handleReplyClick}
                onSubmitReply={handleSubmitReply}
                onCancelReply={() => setReplyFormId(null)}
                isAuth={isAuth}
                depth={maxDepth}
                userId={userId}
              />,
            );

            //отсальное плоско
            if (child.children?.length) {
              traverse(child.children, maxDepth);
            }
          }
        }
      }
    };

    traverse(items, depth);

    return flat;
  };
  return (
    <CommentsLayout head={`${t('comments.head')} (${count})`}>
      <Spinner active={waiting}>
        {renderCommentsTree(comments)}
        {/* новый коммент */}
        {isAuth && replyFormId === null && (
          <CommentForm
            title={t('comments.new-comment')}
            onSubmit={handleSubmitNew}
            onCancel={() => setReplyFormId(null)}
          />
        )}

        {!isAuth && <CommentsLink />}
      </Spinner>
    </CommentsLayout>
  );
}

export default memo(Comments);
