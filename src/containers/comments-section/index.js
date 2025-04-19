import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import CommentItem from '../../components/comment-item';
import CommentForm from '../../components/comment-form';
import commentsActions from '../../store-redux/comments/actions';
import useStore from '../../hooks/use-store';
import AuthHint from "../../components/auth-hint";

function CommentsSection({ articleId }) {
  const dispatch = useDispatch();
  const store = useStore();


  const [isAuthorized, setIsAuthorized] = useState(store.getState().session.exists);
  const [user, setUser] = useState(store.getState().profile.data);

  useEffect(() => {
    const unsubscribe = store.subscribe(state => {
      setIsAuthorized(state.session.exists);
      setUser(state.profile.data);
    });
    if (store.getState().session.exists && !store.getState().profile.data._id) {
      store.actions.profile.load();
    }
    return unsubscribe;
  }, [store]);

  const commentsTree = useSelector(state => state.comments.items);
  const activeFormTargetId = useSelector(state => state.comments.activeFormTargetId);

  const countComments = list => {
    let count = 0;
    const walk = items => {
      for (const item of items) {
        count += 1;
        if (Array.isArray(item.children)) walk(item.children);
      }
    };
    walk(list);
    return count;
  };

  const totalComments = countComments(commentsTree);

  const handleReply = id => dispatch(commentsActions.setFormTarget(id));
  const handleCancel = () => dispatch(commentsActions.resetFormTarget());
  const handleSend = (text, parent) => dispatch(commentsActions.create(text, parent));

  const waiting = useSelector(state => state.comments.waiting);
  return (
    <div className="comments">
      <h2 style={{ padding: '20px 0', fontFamily: 'var(--second-font-family)' }}>
        Комментарии ({totalComments})
      </h2>

      {waiting ? (
        <p>Загрузка комментариев...</p>
      ) : (
        commentsTree.map((comment, i) => (
          <CommentItem
            key={`${comment._id}-${i}`}
            comment={comment}
            onReply={handleReply}
            onCancel={handleCancel}
            onSend={handleSend}
            activeFormTargetId={activeFormTargetId}
            isAuthorized={isAuthorized}
            user={user}
            level={0}
          />
        ))
      )}

      {isAuthorized ? (
        !activeFormTargetId && (
          <CommentForm onSubmit={text => handleSend(text, { _id: articleId, _type: 'article' })} />
        )
      ) : (
        <AuthHint/>
      )}
    </div>
  );
}

CommentsSection.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsSection);
