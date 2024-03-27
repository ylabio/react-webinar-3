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

  const [commentsList, setCommentsList] = useState(
      comments.items ? treeToList(listToTree(comments.items), (item, level) => {
        return {
          ...item,
          offset: level,
        }
      }).filter(item => item.hasOwnProperty('_id'))
      : []
  );
  const [newPostReceived, setNewPostReceived] = useState(false);

  const findLastChild = (item) => {
    if (item.children?.length) {
      return findLastChild(item.children[item.children.length - 1]);
    }
    return item;
  };

  const findLastChildIndex = (list, item) => {
    const lastChild = findLastChild(item);
    return list.findIndex(item => item._id === lastChild._id);
  }

  const [replyTo, setReplyTo] = useState({
    id: articleId, 
    lastReplyIndex: commentsList?.length - 1 || 0,
    offset: 1
  });
  
  const [replyOpen, setReplyOpen] = useState(false);
  
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

  const scrollToRef = useCallback(node => {
    if (node !== null) {
      node.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (!commentsSelect.waitingAfterPost && commentsSelect.postData._id) {
      const repliedIndex = replyTo.lastReplyIndex;
      const offset = replyTo.offset;
      
      setCommentsList(prevList => prevList.toSpliced(
        repliedIndex + 1, 
        0, 
        {
          ...commentsSelect.postData, 
          offset, 
          new: true
        }
      ));
      setCommentsList(prevList => prevList.map((item, index) => {
        if (index === repliedIndex) {
          if (!item.hasOwnProperty('children')) {
            item.children = [];
          }
          return {
            ...item,
            children: [
              ...item.children,
              commentsSelect.postData
            ]
          }
        }
        return item;
      }));
      onCloseReply();
      setNewPostReceived(true);
    }
  }, [commentsSelect.waitingAfterPost]);

  useEffect(() => {
    if (newPostReceived) {
      dispatch(commentsActions.clearPostData());
    }
  }, [newPostReceived, dispatch]);
  
  const onLogin = useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
  }, [location.pathname]);
  
  const onSendReply = (id, form) => {
    dispatch(commentsActions.post({ id, text: form.text, replyMode: true }));      
  };

  const onSendComment = useCallback((form) => {
    setReplyTo({
      id: articleId,
      lastReplyIndex: commentsList.length - 1,
      offset: 1
    });
    dispatch(commentsActions.post({ id: articleId, text: form.text, replyMode: false }));
  }, [commentsList.length]);

  const onCloseReply = useCallback(() => {
    setReplyOpen(false);
    setReplyTo({
      id: articleId, 
      lastReplyIndex: commentsList.length - 1,
      offset: 1
    });
  }, [commentsList.length]);

  const onOpenReply = useCallback((id) => {
    const repliedComment = commentsList.find(item => item._id === id); 
    const lastReplyIndex = findLastChildIndex(commentsList, repliedComment);
    const offset = repliedComment.offset + 1 || 1;
    setReplyTo({id, lastReplyIndex, offset});
    setReplyOpen(true);
  }, [commentsList]);

  const forms = {
    reply: useMemo(() => {
      if (replyTo) {
        return authSelect.sessionExists ? <FormReply
          to={replyTo.id}
          key={`reply-form-${replyTo.lastReplyIndex}`}
          ref={scrollToRef}
          offset={replyTo.offset - 1}
          onSendReply={onSendReply}
          onCloseReply={onCloseReply}
          t={translateService}
        />
        : <CommentLoginPrompt
            ref={scrollToRef}
            key={`login-prompt-${replyTo.lastReplyIndex}`}
            offset={replyTo.offset - 1}
            onLogin={onLogin}
            onCloseReply={onCloseReply}
            t={translateService}
          />;
      } else {
        return <></>
      }
    }, [authSelect.sessionExists, replyTo, onSendReply, onCloseReply, onLogin]),

    comment: useMemo(() => {
      return (authSelect.sessionExists && !replyOpen) ? <FormComment 
        key={`form-comment-${articleId}`}
        onSendComment={onSendComment}
        t={translateService}  
      />
      : <></>;
    }, [authSelect.sessionExists, replyOpen, onSendComment])
  }

  return (
    <Spinner active={commentsSelect.waitingAfterPost}>
      <CommentsLayout
        key={`comments-layout-${articleId}`}
        t={translateService}
      >
        {commentsList.map((comment, index) => {
          return (
            <> 
              <Comment
                 key={`comment-${index}`}
                 own={comment.author?.profile.name === authSelect.user?.profile.name}
                 ref={comment.new ? scrollToRef : null}
                 comment={comment}
                 onOpenReply={onOpenReply}
                 t={translateService}
              />              
              {(replyOpen && replyTo?.lastReplyIndex === index) && forms.reply}
            </>
           )
         })}      
        {forms.comment}
      </CommentsLayout>
    </Spinner>
  )
}

export default Comments;