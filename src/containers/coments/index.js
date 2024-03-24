import React, {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import shallowequal from 'shallowequal';
import useCustomSelector from '../../hooks/use-selector';
import commentActions from '../../store-redux/comment/actions';
import CommentList from '../../components/comment-list';
import buildCommentTree from '../../utils/arrea-to-tree';

function Comments() {  
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
  };

  const comments = select.comments ? buildCommentTree(select.comments) : {};

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
    />
  );
}


export default memo(Comments);