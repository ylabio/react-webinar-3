import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import CommentsForm from '../../components/comments-form';

const Comments = ({ quantity, isAuth, comments }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="Comments">
      <span className="Comments-title">Комментарии {quantity}</span>
      {!isAuth && (
        <div className="Comments-link">
          <Link className="Comments-link-title" to="/login">
            Войдите
          </Link>
          <span>, чтобы иметь возможность комментировать</span>
        </div>
      )}

      {/* {comments?.map(comment => (
        <div>
          <span className="Comments-name">{comment.name}</span>
          <span className="Comments-text">{comment.text}</span>
        </div>
      ))} */}

      {!isAuth ? null : <CommentsForm />}
    </div>
  );
};

export default memo(Comments);
