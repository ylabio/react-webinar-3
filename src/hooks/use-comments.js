import { useState } from 'react';
import { useDispatch } from 'react-redux';
import commentActions from '../store-redux/comments/actions';

export default function useComments(articleId, isAuth) {
  // Добавляем isAuth в параметры
  const dispatch = useDispatch();
  const [replyTo, setReplyTo] = useState(null);
  const [showLoginForComment, setShowLoginForComment] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleSubmit = async (text, parentId, parentType) => {
    const success = await dispatch(commentActions.add(text, parentId, parentType));
    if (success) {
      setReplyTo(null);
      setCommentText('');
      setReplyText('');
      dispatch(commentActions.load(articleId));
    }
  };

  const handleReplyClick = commentId => {
    if (isAuth) {
      setReplyTo(commentId);
      setShowLoginForComment(null);
    } else {
      setShowLoginForComment(commentId);
      setReplyTo(null);
    }
  };

  return {
    replyTo,
    showLoginForComment,
    commentText,
    replyText,
    setCommentText,
    setReplyText,
    handleSubmit,
    handleReplyClick,
  };
}
