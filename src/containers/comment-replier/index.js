import React, {useCallback} from 'react';
import CommentReplierForm from "../../components/comment-replier-form";
import useSelector from "../../hooks/use-selector";
import CommentReminder from "../../components/comment-reminder";
import {useDispatch} from "react-redux";
import commentReplierActions from "../../store-redux/comment-replier/actions";
import createCommentActions from '../../store-redux/create-comment/actions';
import {useSelector as useSelectorRedux} from 'react-redux'
import propTypes from "prop-types";

const CommentReplier = ({ parent }) => {
  const dispatch = useDispatch()

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
      dispatch(createCommentActions.create(selectRedux.replierActive, parent, text, select.token)),
      [select.token, selectRedux.replierActive])
  }

  if (select.user) {
    return <CommentReplierForm parent={parent} setReplierActive={callbacks.setReplierActive} onCreate={callbacks.onCreate} />
  } else {
    return <CommentReminder login={'/login'} parent={parent} setReplierActive={callbacks.setReplierActive} />
  }
};

CommentReplier.propTypes = {
  parent: propTypes.string,
}

export default React.memo(CommentReplier);
