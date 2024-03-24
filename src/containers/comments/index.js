import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';
import CommentList from '../../components/comment-list';
import useCustomSelector from '../../hooks/use-selector';
import getNestedComments from '../../utils/comments-nested';
import commentActions from "../../store-redux/comment/actions";

function Comments() {  
  
  const {t} = useTranslate(); 
  const dispatch = useDispatch();  
  const params = useParams(); 
  const [showCommentForm, setShowCommentForm] = useState(true);

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
          parentType: 'comment'
        };
        
        dispatch(commentActions.createOrAddComment(data)).then(() =>
        dispatch(commentActions.loadComments(params.id)));      
      },
      [params.id, select.comments]
    ),

    createNewComment: useCallback((text) => {
        const data = {
          text,
          parentId: params.id,
          parentType: 'article'        
        };

        dispatch(commentActions.createOrAddComment(data)).then(() =>
        dispatch(commentActions.loadComments(params.id)));                    
      },
      [params.id, select.comments]
    ),
  };

  const nestedComments = getNestedComments(select.comments);

  return (     
    <CommentList
      comments={nestedComments} 
      count={select.count} 
      userId={customSelect.currentUser._id}               
      session={customSelect.isAuthenticated}
      onOpenReply={callbacks.openReply}
      onCloseReply={callbacks.closeReply}
      onCreateNewComment={callbacks.createNewComment}
      onAddReplyComment={callbacks.addReplyComment}
      showCommentForm={showCommentForm}
      t={t}
    />    
  );
}

export default memo(Comments);
