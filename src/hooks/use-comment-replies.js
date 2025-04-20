import { useState } from 'react';

export function useCommentReplies() {
  const [replyTo, setReplyTo] = useState(null);
  const [replyIndex, setReplyIndex] = useState(null);

  const handleReplyClick = (comment, index, commentsList) => {
    setReplyTo(replyTo === comment._id ? null : comment._id);
    
    const depth = comment.depth;
    let newIndex = index + 1;
    
    for (let i = index + 1; i < commentsList.length; i++) {
      if (commentsList[i].depth <= depth) {
        newIndex = i;
        break;
      }
    }
    
    setReplyIndex(newIndex);
  };

  const resetReply = () => {
    setReplyTo(null);
    setReplyIndex(null);
  };

  return { replyTo, replyIndex, handleReplyClick, resetReply };
}