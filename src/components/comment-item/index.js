import React, {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentReply from "../comment-reply";

const CommentItem = ({item, session,  onOpenReply, onCloseReply, onAddReplyComment, }) => {
  const cn = bem('CommentItem');
  console.log(item)

  return (
    <div className={cn()} style={{paddingLeft: `${20*(item.level - 1)}px`}} >
      <div className={cn('title')}>
        <span>{item.author?.profile.name}</span>
        <div>
          {item.dateCreate}
        </div>
      </div>
      <div className={cn('text')} >
        <p>{item.text}</p>
      </div>
      <button className={cn('btn')} type='button' onClick={() => onOpenReply(item._id)}>Ответить</button>
      {item.reply &&
        <CommentReply
          session={session}
          onCancel={() => onCloseReply(item._id)}
          onAddReplyComment={(text) => onAddReplyComment(item._id, text)}
          />
      }

    </div>
  );
}

export default memo(CommentItem)