import React, {memo, useCallback, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';
import CommentList from '../../components/comment-list';
import useCustomSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import commentActions from "../../store-redux/comment/actions";
import formatCommentDate from '../../utils/format-comment-date';

function Comments() {  
  
  const {t, lang} = useTranslate(); 
  const dispatch = useDispatch();  
  const params = useParams(); 
  const [showCommentForm, setShowCommentForm] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector((state) => ({    
    comments: state.comment.comments, 
    count: state.comment.count,    
    waiting: state.comment.waiting    
  }), shallowequal);   

  const customSelect = useCustomSelector((state) => ({
    currentUser: state.session.user,
    isAuthenticated: state.session.exists,
  }));     
    
  const callbacks = {
    openReply: useCallback((id) => {
      setShowCommentForm(false);
      dispatch(commentActions.openReply(id));
    }, []),

    closeReply: useCallback((id) => {
      setShowCommentForm(true);
      dispatch(commentActions.closeReply(id));
    }, []),

    addReplyComment: useCallback((parentId, text) => {
        const data = {
          text,
          parentId,
          parentType: 'comment',
          currentUser: customSelect.currentUser 
        };
        
        dispatch(commentActions.createOrAddComment(data))     
      },
      [params.id, select.comments]
    ),

    createNewComment: useCallback((text) => {
        const data = {
          text,
          parentId: params.id,
          parentType: 'article',
          currentUser: customSelect.currentUser       
        };

        dispatch(commentActions.createOrAddComment(data))                   
      },
      [params.id, select.comments]
    ),

    transformDate: useCallback((date) => formatCommentDate(date, lang), [lang]),

    onLogin: useCallback(() => { navigate('/login', { state: { back: location.pathname } }) }, [location])
  };
 
  const comments = useMemo(function() {
    return listToTree(select.comments, '_id', callbacks.transformDate)[0]?.children ?? [];
  }, [select.comments, callbacks.transformDate]);   
  
  return (     
    <CommentList
      comments={comments} 
      count={select.count} 
      userId={customSelect.currentUser._id}               
      session={customSelect.isAuthenticated}
      onOpenReply={callbacks.openReply}
      onCloseReply={callbacks.closeReply}
      onCreateNewComment={callbacks.createNewComment}
      onAddReplyComment={callbacks.addReplyComment}
      showCommentForm={showCommentForm}
      t={t}      
      onLogin={callbacks.onLogin}
      isReply={showCommentForm}
    />    
  );
}

export default memo(Comments);
