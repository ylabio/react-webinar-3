import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import { loadComments, createComment } from '../../store-redux/comments/actions';
import Comment from '../../components/comment';
import CommentForm from '../../components/comment-form';
import Spinner from '../../components/spinner';
import AuthGuardForComments from '../auth-guard-for-comments';
import CommentsHeader from '../../components/comments-header';
import useTranslate from '../../hooks/use-translate';

function CommentsContainer() {
  const dispatch = useDispatch();
  const params = useParams();
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [text, setText] = useState('');
  const { t } = useTranslate();

  useEffect(() => {
    dispatch(loadComments(params.id));
  }, [params.id, dispatch]);

  const { 
    items: comments,
    waiting: commentsWaiting,
    creating,
  } = useSelector(state => state.comments, shallowequal);

  const countTotalComments = (commentsList) => {
    let count = 0;
    const countRecursive = (items) => {
      items.forEach(comment => {
        count++;
        if (comment.replies?.length) {
          countRecursive(comment.replies);
        }
      });
    };
    countRecursive(commentsList);
    return count;
  };

  const totalComments = countTotalComments(comments);

  const handleSubmitComment = useCallback(async (text, parentId, parentType) => {
      await dispatch(createComment(
        text,
        parentId || params.id,
        parentType || (parentId ? 'comment' : 'article')
      ));
      setActiveReplyId(null);
      setText('');
      dispatch(loadComments(params.id));
  }, [params.id, dispatch]);

  const renderComment = (comment, depth = 0) => {
    return (
      <div key={comment._id}>
        <Comment
          comment={comment}
          onReply={() => setActiveReplyId(comment._id)}
          isReplying={activeReplyId === comment._id}
          depth={depth}
          t={t}
        />
        {activeReplyId === comment._id && (
          <AuthGuardForComments onLoginRedirect={window.location.pathname}>
            <CommentForm
              parentId={comment._id}
              t={t}
              onSubmit={(text) => {
                handleSubmitComment(text, comment._id, 'comment');
                setActiveReplyId(null);
              }}
              onCancel={() => setActiveReplyId(null)}
              isSubmitting={creating}
              depth={depth + 1}
              text={text}
              onTextChange={setText}
            />
          </AuthGuardForComments>
        )}

        {comment.replies?.map(reply => renderComment(reply, depth + 1))}
      </div>
    );
  };

  return (
    <>
      <CommentsHeader count={totalComments} t={t}/>
      <Spinner active={commentsWaiting}>
        {comments.map(comment => renderComment(comment))}
        {!activeReplyId && (
          <AuthGuardForComments onLoginRedirect={window.location.pathname}>
            <CommentForm
              t={t}
              onSubmit={(text) => handleSubmitComment(text, null, 'article')}
              isSubmitting={creating}
              depth={0}
              text={text}
              onTextChange={setText}
            />
          </AuthGuardForComments>
        )}
      </Spinner>
    </>
  );
}

export default CommentsContainer;
