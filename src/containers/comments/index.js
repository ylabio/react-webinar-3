import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import { useNavigate, useLocation } from 'react-router-dom';
import CommentsLayout from "../../components/comments-layout";
import Comment from "../../components/comment";
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from '../../hooks/use-selector';

function Comments({ comments }) {
  const {t} = useTranslate();
  const [commentFormVisible, setCommentFormVisibility] = useState(true);
  const [commentsList, setCommentsList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.session.user,
    sessionExists: state.session.exists
  }));
  
  const openReply = useCallback((id) => {
    setCommentsList(prevComments => prevComments.map(comment => {
      if (comment._id === id) {
        return { ...comment, replyOpen: true };
      }
      if (comment.replyOpen && comment.id !== id) {
        return { ...comment, replyOpen: false };
      }
      return comment;
    }));
    setCommentFormVisibility(false);
  }, []);

  const closeReply = () => {
    setCommentsList(prevComments => prevComments.map(comment => {
      if (comment.replyOpen) {
        return { ...comment, replyOpen: false };
      }
      return comment;
    }));
    setCommentFormVisibility(true);
  };

  useEffect(() => {
    if (comments.items) {
      setCommentsList(treeToList(listToTree(comments.items), (item, level) => {
        return {
          ...item,
          offset: level,
        }
      }).filter(item => item.hasOwnProperty('_id')));
    }
  }, [comments.items]);

  const callbacks = {
    login: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    
    onSend: (form) => {
      
    }
  }

  return (
    <CommentsLayout 
      commentFormVisible={select.sessionExists && commentFormVisible}
      onSend={callbacks.onSend}
      labelTitle={t("comments.title")}
      labelNewComment={t("comments.newComment")}
      labelSend={t("comments.send")}
    >
      {commentsList.map(comment => {
         return (
           <Comment 
             key={`comment-${comment._id}`} 
             comment={comment} 
             offset={comment.offset}
             replyOpen={comment.replyOpen}
             authorized={select.sessionExists}
             onLogin={(e) => {
               e.preventDefault();
               callbacks.login();
             }}
             onSendReply={(e) => {
               e.preventDefault();
               console.log('send');
             }}
             onOpenReply={() => openReply(comment._id)}
             onCloseReply={(e) => {
               e.preventDefault();
               closeReply();
             }}
             labelReplyButton={t("comments.replyButton")}
             labelNewReply={t("comments.newReply")}
             labelSendButton={t("comments.send")}
             labelCancelButton={t("comments.cancel")}
             labelLogin={t("comments.login")}
             labelLoginPrompt={t("comments.loginPrompt")}
           />
         )
       })}
    </CommentsLayout>
  )
}

export default memo(Comments);