import React, {memo, useCallback, useState} from 'react'
import CommentsList from "../../components/comment-list";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import shallowequal from "shallowequal";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from '../../hooks/use-selector';
import {useParams} from "react-router-dom";

const Comments = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const [showCommentForm, setShowCommentForm] = useState(true);

  const select = useSelector(state => ({
    currentUser: state.session.user,
    isAuth: state.session.exists,
  }))

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
  }), shallowequal);

  const callbacks = {
    openReply: useCallback((id) => {
      setShowCommentForm(false);
      dispatch(commentsActions.openReply(id));
    }, []),

    closeReply: useCallback((id) => {
      setShowCommentForm(true);
      dispatch(commentsActions.closeReply(id));
    }, []),

    addReplyComment: useCallback((parentId, text) => {
        const data = {
          text,
          parentId,
          parentType: 'comment',
          currentUser: select.currentUser
        };

        dispatch(commentsActions.createOrAddComment(data))
      },
      [params.id, selectRedux.comments]
    ),

    createNewComment: useCallback((text) => {
        const data = {
          text,
          parentId: params.id,
          parentType: 'article',
          currentUser: select.currentUser
        };

        dispatch(commentsActions.createOrAddComment(data))
      },
      [params.id, selectRedux.comments]
    ),
  };


  return (
    <CommentsList
      comments={selectRedux?.comments}
      count={selectRedux?.comments.length}
      session={select.isAuth}
      userId={select.currentUser._id}
      onOpenReply={callbacks.openReply}
      onCloseReply={callbacks.closeReply}
      onCreateNewComment={callbacks.createNewComment}
      onAddReplyComment={callbacks.addReplyComment}
      showCommentForm={showCommentForm}
      onComment={callbacks.createNewComment}
     />
  )
}
export default memo(Comments);
