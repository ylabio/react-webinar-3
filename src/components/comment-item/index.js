import React, {memo, useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentReply from "../comment-reply";
import formatDate from "../../utils/formatDate";

const CommentItem = ({item, session,  onOpenReply, onCloseReply, onAddReplyComment, lang, t, scrollToBottom, onSignIn }) => {
  const cn = bem('CommentItem');
  const [paddingLeft, setPaddingLeft] = useState(item.level);

  useEffect(() => {
    if(item.level > 5) {
      setPaddingLeft(5)
    }
  }, [item.level])

  return (
    <div className={cn()} style={{paddingLeft: `${20*(paddingLeft - 1)}px`}} >
      <div className={cn('title')}>
        <span>{item.author?.profile.name}</span>
        <div className={cn('date')}>
          {formatDate(item.dateCreate, lang)}
        </div>
      </div>
      <div className={cn('text')} >
        <p>{item.text}</p>
      </div>
      <button className={cn('btn')} type='button' onClick={() => onOpenReply(item._id)}>{t("comments.reply")}</button>
      {item.reply &&
        <CommentReply
          scrollToBottom={scrollToBottom}
          session={session}
          t={t}
          onCancel={() => onCloseReply(item._id)}
          onAddReplyComment={(text) => onAddReplyComment(item._id, text)}
          onSignIn={onSignIn}
        />
      }
    </div>
  );
}

export default memo(CommentItem)