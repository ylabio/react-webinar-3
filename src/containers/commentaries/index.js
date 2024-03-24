import { memo, useCallback, useMemo, useState } from "react";
import CommentariesBlock from "../../components/commentaries-block";
import Spinner from "../../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";
import commentsActions from "../../store-redux/comments/actions";
import commentsToTree from "../../utils/comments-to-tree";
import CommentForm from "../../components/comment-form";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

import useCustomSelector from "../../hooks/use-selector";

function Commentaries({ id }) {
  const [formPosition, setFormPosition] = useState("main")
  const dispatch = useDispatch();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
      comments: state.comments.data.items,
      count: state.comments.data.count,
      waiting: state.comments.waiting,
    }), shallowequal);

  const commentsTree = commentsToTree(select.comments, '_id', id)
  

  const navigate = useNavigate();
  
  const session = useCustomSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
    user: state.session.user.profile
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    addComment: useCallback((parentId, parentType, text) => {
      dispatch(commentsActions.add(parentId, parentType, text, session.user.name ))
    }, [session.user])
  };


  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  return (
    <Spinner active={select.waiting}>
      <CommentariesBlock
        t={t}
        article={id}
        count={select.count}
        comments={commentsTree}
        formPosition={formPosition}
        setFormPosition={setFormPosition}
        isAuth={session.exists}
        onUnAuth={callbacks.onSignIn}
        onAdd={callbacks.addComment}
      />
      {formPosition === "main" && <CommentForm translate={t} article={id} parentId={id} onAdd={callbacks.addComment} type={"article"} isAuth={session.exists} onUnAuth={callbacks.onSignIn} />}
    </Spinner>
  );
}

export default memo(Commentaries);
