import { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import useTranslate from '../../hooks/use-translate';
import { useNavigate, useLocation } from 'react-router-dom';
import CommentsLayout from "../../components/comments-layout";
import CommentLoginPrompt from "../../components/comment-login-prompt";
import FormComment from "../../components/form-comment";
import FormReply from "../../components/form-reply";
import Comment from "../../components/comment";
import Spinner from "../../components/spinner";
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import shallowequal from 'shallowequal';

function Comments({ articleId, comments }) {
  const {translateService, locale} = useTranslate();
  const dispatch = useDispatch();
  const [commentFormVisible, setCommentFormVisibility] = useState(true);

  const [commentsList, setCommentsList] = useState(
      comments.items ? treeToList(listToTree(comments.items), (item, level) => {
        return {
          ...item,
          offset: level,
        }
      }).filter(item => item.hasOwnProperty('_id'))
      : []
  );
  const navigate = useNavigate();
  const location = useLocation();

  const authSelect = useSelector(state => ({
    user: state.session.user,
    sessionExists: state.session.exists
  }));

  const commentsSelect = useReduxSelector(state => ({
    postData: state.comments.postData,
    waitingAfterPost: state.comments.waitingAfterPost,
  }), shallowequal);

  const newCommentRef = useCallback(node => {
    if (node !== null) {
      node.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (!commentsSelect.waitingAfterPost && commentsSelect.postData._id) {
      const repliedId = commentsSelect.postData.parent._id;
      const offset = commentsSelect.postData.parent._tree?.length || 0;
      setCommentsList(prevList => prevList.toSpliced(
        prevList.findIndex(item => item._id === repliedId) + 1, 
        0, 
        {
          ...commentsSelect.postData, 
          offset, 
          new: true
        }
      ));      
    }
  }, [commentsSelect.waitingAfterPost]);

  const callbacks = {
    onLogin: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    
    onSendReply: (id, form) => {
      dispatch(commentsActions.post({ id, text: form.text, replyMode: true }));
      callbacks.onCloseReply();
    },

    onSendComment: (form) => {
      dispatch(commentsActions.post({ articleId, text: form.text, replyMode: false }));
    },

    onCloseReply: () => {
      setCommentsList(prevComments => prevComments.map(comment => {
        if (comment.replyOpen) {
          return { ...comment, replyOpen: false };
        }
        return comment;
      }));
      setCommentFormVisibility(true);
    },

    onOpenReply: (id) => {
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
    }
  }

  const forms = {
    reply: (id) => {
      return authSelect.sessionExists ? <FormReply
        to={id}
        onSendReply={callbacks.onSendReply}
        onCloseReply={callbacks.onCloseReply}
        t={translateService}
      />
      : <CommentLoginPrompt
        onLogin={callbacks.onLogin}
        onCloseReply={callbacks.onCloseReply}
        t={translateService}
      />;
    },

    comment: useMemo(() => {
      return (authSelect.sessionExists && commentFormVisible) ? <FormComment 
        onSendComment={callbacks.onSendComment}
        t={translateService}  
      />
      : <></>;
    }, [authSelect.sessionExists, commentFormVisible])
  }

  return (
    <Spinner active={commentsSelect.waitingAfterPost}>
      <CommentsLayout 
        commentForm={forms.comment}
        t={translateService}
      >
        {commentsList.map(comment => {
          return (
             <Comment
               key={`comment-${comment._id}`}
               ref={comment.new ? newCommentRef : null}
               comment={comment}
               replyForm={forms.reply(comment._id)}
               onOpenReply={callbacks.onOpenReply}
               t={translateService}
             />
           )
         })}      
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);