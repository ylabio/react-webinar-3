import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';

import CommentsTitle from '../../components/comments/comment-title';
import CommentsTree from '../../components/comments/comments-tree';
import CommentNew from '../../components/comments/comment-new';
import CommentLogin from '../../components/comments/comment-login';

import buildCommentTree from '../../utils/buildCommentTree';
import flattenCommentTree from '../../utils/tree-to-flat';
import listToTree from "../../utils/list-to-tree";

/**
 * Компонент списка комментариев с формами и логикой добавления/ответа
 */
function CommentsList({ comments, commentsCount, articleId }) {
  const dispatch = useDispatch();
  const [activeCommentId, setActiveCommentId] = useState(null);

  const select = useSelector(state => ({
    exist: state.session.exists,
    profileName: state.session.user?.profile?.name,
  }));

  const tree = listToTree(comments, {
    key: '_id',
    rootKey: item => item.parent?._type === 'article',
    parentKey: 'parent._id',
    levelKey: 'level',
  });

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

    dispatch(commentsActions.create(text, parent));
    resetActiveComment();
  };

  return (
    <>
      <CommentsTitle commentsCount={commentsCount} />

      <CommentsTree
        comments={tree}
        onReply={setActiveCommentId}
        activeCommentId={activeCommentId}
        resetActiveComment={resetActiveComment}
        sessionExists={select.exist}
        createComment={createComment}
        profileName={select.profileName}
      />

      {!activeCommentId && (
        select.exist
          ? <CommentNew status="global" onSubmit={createComment} />
          : <CommentLogin />
      )}
    </>
  );
}

export default memo(CommentsList);
