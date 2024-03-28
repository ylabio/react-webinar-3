import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import shallowequal from 'shallowequal';
import useInit from "../../hooks/use-init";
import modalsActions from '../../store-redux/modals/actions';
import CommentCount from "../../components/comment-count"
import CommentList from "../../components/comment-list"
import WelcomeText from "../../components/welcome-text"
import CommentTextarea from "../../components/comment-textarea"
import CommentItem from "../../components/comment-item";
import commentsActions from '../../store-redux/comments/actions';
import scrollToElement from "../../utils/scroll-to-el";

function Comments() {
  const params = useParams();
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslate();

  const select = useSelectorRedux(state => ({
    comments: state.comments.items.items,
    count: state.comments.items.count,
    modal: state.modals.name
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const exists = useSelector(state => state.session.exists);
  const callbacks = {
    setIsOpenTextarea: useCallback(_id => {
      dispatch(modalsActions.open(_id))
    }, [dispatch]),
    handleCommentSubmit: useCallback(commentData => {
      dispatch(commentsActions.sendComment(commentData));
      dispatch(modalsActions.open(params.id))
    }, [store]),
    onCancel: useCallback((id) => {
      dispatch(modalsActions.open(id))
    }, [dispatch, params.id]),
    onSignIn: useCallback(() => navigate('/login', { state: { back: location.pathname } }), [navigate, location.pathname]),
  }
  const renders = {
    commentItem: useCallback((comment) => (
      <CommentItem
        comment={comment} setIsOpenTextarea={callbacks.setIsOpenTextarea} isOpenTextarea={select.modal} onChange={callbacks.onChange} paramsId={params.id} onSubmit={callbacks.onSubmit} onCancel={callbacks.onCancel}
        exists={exists} t={t} onSignIn={callbacks.onSignIn} handleCommentSubmit={callbacks.handleCommentSubmit} />
    ), [select.comments, select.modal, callbacks.onSubmit]
    )
  };
  useInit(() => dispatch(commentsActions.loadComments(params.id)), []);

  useInit(() => dispatch(modalsActions.open(params.id)), [params.id], exists);
  useInit(() => {
    if (select.modal === params.id) return;
    select.modal && exists && scrollToElement('.CommentTextarea')
  }, [select.modal, exists]);

  return <>
    <CommentCount />
    <CommentList comments={select.comments} renderItem={renders.commentItem} />
    {!exists ? <WelcomeText t={t} onSignIn={callbacks.onSignIn} /> : select.modal === params.id &&
      <CommentTextarea onChange={callbacks.onChange} paramsId={params.id}
        id={params.id} onSubmit={callbacks.onSubmit} onCancel={callbacks.onCancel} t={t} handleCommentSubmit={callbacks.handleCommentSubmit} exists={exists} />}
  </>
}

export default memo(Comments);