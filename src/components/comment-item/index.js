import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import dateFormat from "../../utils/date-format";
import './style.css';
import CommentAnswer from "../comment-answer";


function CommentItem({
  comment, 
  onCancel, 
  exists, 
  addComment, 
  onAnswer, 
  username, 
  place, 
  lastIndex, 
  lastChild,
  active,
  setActive,
  level,
  formRef
}) {
  const cn = bem('CommentItem');
  const date = dateFormat(comment.date)
  const margin = Math.min(comment.level, 4) * 30
  const marginAnswer = lastIndex === -1 && level > 3 ? 30 : 0
  const isAnswer = place === comment.id

  const onHandleClick = () => {
     setActive({id: comment.id , level: comment.level})
  }

  return (
    <div className={cn()} style={{marginLeft: `${margin}px`}}>
        <div className={cn('header')}>
            <span className={comment.author === username ? cn('authorlog') : cn('author') }>
              {comment.author}
            </span>
            <span className={cn('date')}>{date}</span>
        </div>
        <div className={cn('text')}>{comment.text}</div>
        <button className={cn('btn')} onClick={(onHandleClick)}>Ответить</button>
        {
        isAnswer && (
        <div style={{paddingLeft: `${marginAnswer}px`}} ref={formRef}>
            <CommentAnswer
            id={comment.id}
            isAuth={exists}
            addComment={addComment}
            onCancel={onCancel}
            lastIndex={lastIndex}
            comment={comment}
            level={level}
            place={place}
            />     
        </div>
        )} 
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  onAnswer: PropTypes.func,
  addComment: PropTypes.func,
  onCancel: PropTypes.func,
  username: PropTypes.string,
  active: PropTypes.object,
  exists: PropTypes.bool,
};

CommentItem.defaultProps = {
  addComment: () => {},
  onAnswer: () => {}
}


export default memo(CommentItem);