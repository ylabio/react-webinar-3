import React, {memo, useEffect, useRef} from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../../components/comment-item";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentNew from "../comment-new";

function CommentsList({ comments, count, userId, session, onSignIn,onOpenReply, onCloseReply, onCreateNewComment, onAddReplyComment, showCommentForm, t, lang, scrollToBottom, commentsEndRef}) {

  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('comments.comments')} ({count})</div>
      {comments.length > 0 ? (
        <>
          {treeToList(listToTree(comments), (item, level) => ({
            _id: item?._id,
            text: item?.text,
            dateCreate: item?.dateCreate,
            author: item?.author,
            level: level,
            reply: item?.reply,
            parent: !item.parent || item.parent._type == "article" ? {} : item.parent,
          }))
            .slice(1)
            .map((item, index) => (
               <CommentItem key={index} item={item}
                            reply={false}
                            session={session}
                            currentUserId={userId}
                            onOpenReply={onOpenReply}
                            onCloseReply={onCloseReply}
                            onAddReplyComment={onAddReplyComment}
                            t={t}
                            scrollToBottom={scrollToBottom}
                            lang={lang}
                            onSignIn={onSignIn}
               />
            ))}
          <div ref={commentsEndRef} />
        </>
      ) : (
        <></>
      )}
      {showCommentForm && (
        <CommentNew onSignIn={onSignIn} session={session} onCreateNewComment={(text) => onCreateNewComment(text)} t={t} />
      )}
    </div>
  );
}

export default memo(CommentsList);