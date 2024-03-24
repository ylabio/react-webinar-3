import {memo, useState} from "react";
import PropTypes from 'prop-types';
import CommentsCard from "../comment-card";
import CommentHint from "../comment-hint";
import CommentForm from "../comment-form";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comments(props) {
  const {count, list, exists, commentValue, setCommentValue, createNewComment, answerComment, t} = props;

  // Внутреннее состояние для открытия выбранной формы
  const [activeForm, setActiveForm] = useState('');
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({count})</h2>

      <div className={cn('items')}>
        {list.map(item => (
          <CommentsCard 
            key={item._id} item={item} exists={exists} 
            activeForm={activeForm} setActiveForm={setActiveForm}
            commentValue={commentValue} setCommentValue={setCommentValue}
            answerComment={answerComment} t={t} 
          />
        ))}
      </div>

      {!activeForm.length && (
        <div className={cn('form')}>
          {!exists
            ? <CommentHint link={'/login'} text={'комментировать'} />
            : <CommentForm text={'комментарий'} value={commentValue} onChange={setCommentValue} onClick={createNewComment} t={t} />
          }
        </div>
      )}
    </div>
  )
}

Comments.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  exists: PropTypes.bool,
  commentValue: PropTypes.string,
  setCommentValue: PropTypes.func,
  createNewComment: PropTypes.func,
  answerComment: PropTypes.func,
  t: PropTypes.func,
}

Comments.defaultProps = {
  setCommentValue: () => {},
  createNewComment: () => {},
  answerComment: () => {},
  t: (text) => text,
}

export default memo(Comments);