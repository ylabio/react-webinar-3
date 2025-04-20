import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import CommentsForm from '../../components/comments-form';
import commentsActions from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Comment } from '../../components/comment';
import { SmartComment } from '../../components/smart-comment';

const Comments = ({ isAuth, comments, userId, articleId }) => {
  const [openFormForId, setOpenFormForId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const handleToggleForm = id => {
    setOpenFormForId(prev => (prev === id ? null : id));
  };

  const handleSubmit = () => {
    dispatch(commentsActions.create(commentText, openFormForId, articleId));
    setCommentText('');
    setOpenFormForId(null);
  };

  return (
    <div className="Comments">
      <span className="Comments-title">Комментарии ({comments.length})</span>
      {!isAuth && (
        <div>
          <Link className="Comments-link-title" to="/login">
            Войдите
          </Link>
          <span>, чтобы иметь возможность комментировать</span>
        </div>
      )}
      <div className="Comments-line">
        {comments.length > 0 &&
          comments.map(comment => (
            <SmartComment
              key={comment._id}
              comment={comment}
              userId={userId}
              openFormForId={openFormForId}
              handleToggleForm={handleToggleForm}
              onSubmit={handleSubmit}
              value={commentText}
              onChange={setCommentText}
            />
          ))}
      </div>
      {!isAuth || openFormForId ? null : (
        <CommentsForm onSubmit={handleSubmit} value={commentText} onChange={setCommentText} />
      )}
    </div>
  );
};

export default memo(Comments);
