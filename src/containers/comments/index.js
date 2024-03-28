import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import shallowEqual from "shallowequal";
import useStore from "../../hooks/use-store";
import { useLocation, useNavigate } from "react-router-dom";
import { default as useSelectorHook } from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import commentsActions from "../../store-redux/comments/actions";
import Spinner from "../../components/spinner";
import CommentsResult from "../../components/comments-result";
const Comments = ({ id }) => {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { currentLanguage } = useTranslate();

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id, currentLanguage]);

  const selectHook = useSelectorHook((state) => ({
    isAuth: state.session.exists,
    userId: state.session.user._id,
  }));

  const select = useSelector(
    (state) => ({
      waiting: state.comments.waiting,
      comments: state.comments.comments,
    }),
    shallowEqual
  );

  const callbacks = {
    addComment: useCallback(
      (comment, parentId) => {
        dispatch(
          commentsActions.sendComment(
            store.state.session.user,
            comment,
            parentId
          )
        );
      },
      [store]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <div>
      <Spinner active={select.waiting}>
        <CommentsResult
          id={id}
          comments={select.comments}
          addComment={callbacks.addComment}
          onSignIn={callbacks.onSignIn}
          isAuth={selectHook.isAuth}
          userId={selectHook.userId}
        />
      </Spinner>
    </div>
  );
};
export default Comments;
