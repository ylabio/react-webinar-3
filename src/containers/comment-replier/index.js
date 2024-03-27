import React, {useCallback} from 'react';
import CommentReplierForm from "../../components/comment-replier-form";
import useSelector from "../../hooks/use-selector";
import CommentReminder from "../../components/comment-reminder";
import {useDispatch} from "react-redux";
import commentReplierActions from "../../store-redux/comment-replier/actions";
import commentsActions from "../../store-redux/comments/actions";
import {useSelector as useSelectorRedux} from 'react-redux'
import propTypes from "prop-types";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useServiceTranslate} from "../../hooks/use-translate";

const CommentReplier = ({ parent }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const select = useSelector(state => ({
    user: state.session.user._id,
    token: state.session.token
  }))

  const selectRedux = useSelectorRedux(state => ({
    replierActive: state.commentReplier.active
  }))

  const callbacks = {
    setReplierActive: useCallback((type) => dispatch(commentReplierActions.setActive(type)), []),
    onCreate: useCallback((text) =>
      dispatch(commentsActions.create(selectRedux.replierActive, parent, text, select.token)),
      [select.token, selectRedux.replierActive]),
    onSignIn: useCallback(() => navigate('/login', { state: {back: location.pathname} }), [location.state])
  }

  const { translate: tt } = useServiceTranslate()

  if (select.user) {
    return <CommentReplierForm tt={tt} parent={parent} setReplierActive={callbacks.setReplierActive} onCreate={callbacks.onCreate} />
  } else {
    return <CommentReminder tt={tt} onSignIn={callbacks.onSignIn} parent={parent} setReplierActive={callbacks.setReplierActive} />
  }
};

CommentReplier.propTypes = {
  parent: propTypes.string,
}

export default React.memo(CommentReplier);
