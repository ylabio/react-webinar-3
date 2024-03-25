import { memo, useState } from "react";
import PropTypes from 'prop-types';
import CommentTextarea from "../comment-textarea"
import "./style.css"
import { cn as bem } from '@bem-react/classname';
import WelcomeText from "../welcome-text";


const CommentItem = ({ comment, setIsOpenTextarea, isOpenTextarea, data, onChange, paramsId, onSubmit, exists, onCancel }) => {
  const cn = bem('CommentItem');
  const newDate = new Date(comment.dateCreate)
  const formatedDate = new Intl.DateTimeFormat('ru', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(newDate);

  return <div className={cn("wrapper")}>
    <div className={cn("head")}>
      <p className={cn('author')}>{comment.author.profile?.name}</p>
      <p className={cn("data")}>{formatedDate}</p>
    </div>
    <p className={cn("comment")}>{comment.text}</p>
    <button className={cn('button')} onClick={() => setIsOpenTextarea(comment._id)}>Ответить</button>
    {!exists && isOpenTextarea === comment._id &&
      <div className={cn('welcome-box')}>
        <WelcomeText />
        <button className={cn('cancel-button')} onClick={() => onCancel(paramsId)}>Отмена</button>
      </div>}
    {isOpenTextarea === comment._id && exists &&
      <CommentTextarea data={data} onChange={onChange} id={comment._id} paramsId={paramsId}
        comments={comment} onSubmit={onSubmit} onCancel={onCancel} />}
    {comment.children && (
      <ul className="CommentList">
        {comment?.children?.map(child => (
          <CommentItem
            key={child._id} comment={child} setIsOpenTextarea={setIsOpenTextarea}
            isOpenTextarea={isOpenTextarea} data={data} onChange={onChange}
            onCancel={onCancel} onSubmit={onSubmit} exists={exists} paramsId={paramsId}
          />
        ))}
      </ul>
    )}
  </div>
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired
    }).isRequired,
    dateCreate: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    children: PropTypes.array
  }).isRequired,
  setIsOpenTextarea: PropTypes.func.isRequired,
  isOpenTextarea: PropTypes.string,
  data: PropTypes.object,
  onChange: PropTypes.func,
  paramsId: PropTypes.string,
  onSubmit: PropTypes.func,
  exists: PropTypes.bool,
  onCancel: PropTypes.func
};

export default memo(CommentItem);