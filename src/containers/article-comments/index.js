import {useDispatch, useSelector as useReduxSelector} from "react-redux";
import useSelector from "../../hooks/use-selector";
import CommentsTree from "../../components/comments-tree";
import {memo, useCallback, useState} from "react";
import AddCommentForm from "../../components/add-comment-form";
import Spinner from "../../components/spinner";
import AuthMessage from "../../components/auth-message";
import commentsActions from "../../store-redux/comments/actions";
import PropTypes from "prop-types";
import listToTree from "../../utils/list-to-tree";
import {useLocation, useNavigate} from "react-router-dom";

function ArticleComments(props) {

  const [openReplyForm, setOpenReplyForm] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    onOpenReplyForm: useCallback((id) => {
      setOpenReplyForm(id)
    }, []),
    onCloseReplyForm: useCallback(() => setOpenReplyForm(null), []),
    onSendComment: useCallback((comment) => {
      dispatch(commentsActions.sendComment(props.id, comment))
    }, [props.id]),
    onReplyComment: useCallback((id, reply) => {
      dispatch(commentsActions.sendReply(id, reply));
      setOpenReplyForm(null);
    }, [props.id]),
    onMessage: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname])
  }

  const selectRedux = useReduxSelector(state => ({
    comments: state.comments
  }));

  const select = useSelector(state => ({
    session: state.session
  }));

  return (
    <Spinner active={selectRedux.comments.waiting}>
      <CommentsTree
        onMessage={callbacks.onMessage}
        sessionId={select.session.user._id || ""}
        comments={listToTree(selectRedux.comments.data)}
        isAuth={select.session.exists}
        count={selectRedux.comments.data.length}
        onCloseReplyForm={callbacks.onCloseReplyForm}
        onOpenReplyForm={callbacks.onOpenReplyForm}
        currentReplyFormId={openReplyForm}
        onReply={callbacks.onReplyComment}
      />
      {select.session.exists ? !openReplyForm && <AddCommentForm onSubmit={callbacks.onSendComment} /> : !openReplyForm && <AuthMessage onClick={callbacks.onMessage} />}
    </Spinner>
  )
}

ArticleComments.propTypes = {
  id: PropTypes.string
}

export default memo(ArticleComments)