import React, {memo, useCallback, useRef, useState} from 'react'
import CommentsList from "../../components/comment-list";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import shallowequal from "shallowequal";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from '../../hooks/use-selector';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";


const Comments = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const [showCommentForm, setShowCommentForm] = useState(true);
  const {t, lang} = useTranslate();
  const commentsEndRef = useRef()
  const navigate = useNavigate();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);


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

    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

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

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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
      lang={lang}
      t={t}
      onSignIn={callbacks.onSignIn}
      commentsEndRef={commentsEndRef}
      scrollToBottom={scrollToBottom}
     />
  )
}
export default memo(Comments);
