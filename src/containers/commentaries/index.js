import { memo, useCallback } from "react";
import CommentariesBlock from "../../components/commentaries-block";
import Spinner from "../../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";
import commentsActions from "../../store-redux/comments/actions";
import commentsToTree from "../../utils/comments-to-tree";
import CommentForm from "../../components/comment-form";
import LoginToLabel from "../../components/login-to-label";
import { useNavigate } from "react-router-dom";

import useCustomSelector from "../../hooks/use-selector";

function Commentaries({ id }) {
  const dispatch = useDispatch();

  const select = useSelector(
    (state) => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }),
    shallowequal
  );
  
  const navigate = useNavigate()

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

  }

  const session = useCustomSelector((state) => ({
    exists: state.session.exists,
  }));

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  return (
    <Spinner active={select.waiting}>
      <CommentariesBlock
        count={select.comments.count}
        comments={commentsToTree(select.comments.items)}
      />
      {
        session.exists ?
        <CommentForm isAuth={session.exists} /> :
        <LoginToLabel onClick={callbacks.onSignIn}/>
      }
    </Spinner>
  );
}

export default memo(Commentaries);
