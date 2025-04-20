import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import CommentsForm from '../../components/comments-form';
import commentsActions from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import shallowEqual from 'shallowequal';

// TODO вынести в отдельный компонент
export const Comment = ({ by, text, isMine, date }) => {
  return (
    <div className="Comment">
      <div className="Comment-subtitle-block">
        <span className="Comment-userName" data-mine-comment={isMine ? 'isMine' : ''}>
          {by}
        </span>
        <span className="Comment-date">{date}</span>
      </div>
      <div className="Comment-text" dangerouslySetInnerHTML={{ __html: text }} />
      <button className="Comment-answer">
        <span>ответить</span>
      </button>
    </div>
  );
};

// TODO вынести в отдельный компонент
export const SmartComment = ({ comment, userId }) => {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.getAuthor(comment.author._id));
  }, []);

  const select = useReduxSelector(
    state => ({
      author: state.comments.authors[comment.author._id]?.profile.name,
    }),
    shallowEqual,
  );

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(comment.dateCreate));

  return (
    <div className="Smart-Comments">
      {comment && (
        <Comment
          by={select.author}
          text={comment.text}
          isMine={userId === comment.author._id}
          date={formattedDate}
        />
      )}
      <div className="Smart-Comment">
        {comment &&
          comment.children.map(comment => (
            <SmartComment key={comment._id} comment={comment} userId={userId} />
          ))}
      </div>
    </div>
  );
};

const Comments = ({ isAuth, comments, userId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
            <SmartComment key={comment._id} comment={comment} userId={userId} />
          ))}
      </div>
      {!isAuth ? null : <CommentsForm />}
    </div>
  );
};

export default memo(Comments);
