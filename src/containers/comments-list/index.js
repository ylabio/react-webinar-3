import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import CommentsTree from '../../components/comments-tree';
import CommentsTitle from '../../components/comments-title';
import buildHierarchy from '../../utils/buildHierarchy';
import flattenTree from '../../utils/flattenTree';
import CommentNew from '../../components/comment-new';
import CommentLogin from '../../components/comment-login';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function CommentsList({ comments, commentsCount, articleId }) {
  const tree = buildHierarchy(comments);
  const hierarchicalComments = flattenTree(tree);
  const dispatch = useDispatch();
  const [activeCommentId, setActiveCommentId] = useState(null);

  const select = useSelector(state => ({
    exist: state.session.exists,
    profileName: state.session.user?.profile?.name,
  }));

  const resetActiveComment = () => {
    setActiveCommentId(null);
  };

  const createComment = (text, parentId = null) => {
    if (!select.exist) {
      console.error('Пользователь не авторизован');
      return;
    }

    const parent = parentId
      ? { _id: parentId, _type: 'comment' }
      : { _id: articleId, _type: 'article' };

    dispatch(commentsActions.createComment(text, parent));
    resetActiveComment();
  };

  return (
    <>
      <CommentsTitle commentsCount={commentsCount} />
      <CommentsTree
        comments={hierarchicalComments}
        onReply={id => setActiveCommentId(id)}
        activeCommentId={activeCommentId}
        resetActiveComment={resetActiveComment}
        sessionExists={select.exist}
        createComment={createComment}
        profileName={select.profileName}
      />
      {!activeCommentId && select.exist && (
        <CommentNew status="global" onSubmit={text => createComment(text)} />
      )}
      {!activeCommentId && !select.exist && <CommentLogin />}
    </>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      parent: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _type: PropTypes.string,
      }),
    }),
  ).isRequired,
  commentsCount: PropTypes.number.isRequired,
  articleId: PropTypes.string,
};

export default memo(CommentsList);
