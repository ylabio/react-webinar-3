import React, {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentReply from "../comment-reply";
import formatDate from "../../utils/formatDate";

const CommentItem = ({item, session,  onOpenReply, onCloseReply, onAddReplyComment, lang, t, }) => {
  const cn = bem('CommentItem');

  return (
    <div className={cn()} style={{paddingLeft: `${20*(item.level - 1)}px`}} >
      <div className={cn('title')}>
        <span>{item.author?.profile.name}</span>
        <div>
          {formatDate(item.dateCreate, lang)}
        </div>
      </div>
      <div className={cn('text')} >
        <p>{item.text}</p>
      </div>
      <button className={cn('btn')} type='button' onClick={() => onOpenReply(item._id)}>{t("comments.reply")}</button>
      {item.reply &&
        <CommentReply
          session={session}
          t={t}
          onCancel={() => onCloseReply(item._id)}
          onAddReplyComment={(text) => onAddReplyComment(item._id, text)}
          />
      }

    </div>
  );
}

export default memo(CommentItem)