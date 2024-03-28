import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CommentTextarea from "../comment-textarea"
import "./style.css"
import { cn as bem } from '@bem-react/classname';
import WelcomeText from "../welcome-text";

import formatingDate from "../../utils/formatingDate"


const CommentItem = ({ comment, setIsOpenTextarea, isOpenTextarea, paramsId, exists, onCancel, t, onSignIn, handleCommentSubmit }) => {
  const cn = bem('CommentItem');
  const formatedDate = formatingDate(comment.dateCreate);

  return <div className={cn("wrapper")}>
    <div className={cn("head")}>
      {comment.author.profile?.authorName ? <p className={cn('commentator')}>{comment.author.profile?.authorName}</p> : <p className={cn('author')}>{comment.author.profile?.name}</p>}
      <p className={cn("data")}>{formatedDate}</p>
    </div>
    <p className={cn("comment")}>{comment.text}</p>
    <button className={cn('button')}
      onClick={() => setIsOpenTextarea(comment._id)}>{t("article.reply")}</button>
    {!exists && isOpenTextarea === comment._id &&
      <div className={cn('welcome-box')}>
        <WelcomeText t={t} onSignIn={onSignIn} />
        <button className={cn('cancel-button')} onClick={() => onCancel(paramsId)}>{t("article.cancel")}</button>
      </div>}
    {comment.children && (
      <ul className="CommentList">
        {comment?.children?.map(child => (
          <CommentItem
            key={child._id} t={t} comment={child} setIsOpenTextarea={setIsOpenTextarea}
            isOpenTextarea={isOpenTextarea}
            onCancel={onCancel} exists={exists} paramsId={paramsId} onSignIn={onSignIn}
            handleCommentSubmit={handleCommentSubmit}
          />
        ))}
      </ul>
    )}
    {isOpenTextarea === comment._id && exists &&
      <CommentTextarea id={comment._id} paramsId={paramsId}
        comments={comment} onCancel={onCancel} t={t} handleCommentSubmit={handleCommentSubmit} exists={exists} />}
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
  paramsId: PropTypes.string,
  handleCommentSubmit: PropTypes.func,
  onSignIn: PropTypes.func,
  exists: PropTypes.bool,
  onCancel: PropTypes.func,
  t: PropTypes.func.isRequired
};

export default memo(CommentItem);