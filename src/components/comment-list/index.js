import React, { memo } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../../components/comment-item";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CommentNew from "../comment-new";
import useTranslate from "../../hooks/use-translate";

function CommentsList({ comments, count, userId, session, onOpenReply, onCloseReply, onCreateNewComment, onAddReplyComment, showCommentForm,}) {

  const cn = bem('CommentList');
  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({count})</div>
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
              />
            ))}
        </>
      ) : (
        <></>
      )}
      {showCommentForm && (
        <CommentNew session={session} onCreateNewComment={(text) => onCreateNewComment(text)} t={t} />
      )}
    </div>
  );
}

export default memo(CommentsList);