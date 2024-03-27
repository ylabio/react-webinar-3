import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import CommentsCard from "../../components/comments-card";
import { useDispatch, useSelector } from "react-redux";
import commentsActions from "../../store-redux/comments/comments";
import listToTree from "../../utils/list-to-tree";
import useCustomSelector from '../../hooks/use-selector'
import {Link, useLocation} from 'react-router-dom';


function Comments({ postId }) {
  const dispatch = useDispatch();
  const location = useLocation();

  useInit(() => {
    dispatch(commentsActions.load(postId));
  }, []);

  const select = useSelector((state) => ({
    comments: listToTree(state.comments.data),
    count: state.comments.count,
    waiting: state.comments.waiting,
  }));

  const customSelect = useCustomSelector((state) => ({
    loggedIn: state.session.exists,
    currentUser: state.session.user
  }));

  const callbacks = {
    addComment: ({text, parent}) => {
      dispatch(commentsActions.create({postId, text, parent}));
    }
  }
  
  const { t, lang } = useTranslate();

  const renders = {
    loginLink: <Link to={'/login'} state={{back: location.pathname}}>{t("comment.login")}</Link>
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsCard
        comments={select.comments.length ? select.comments[0]["children"] : []}
        t={t}
        lang={lang}
        count={select.count}
        loggedIn={customSelect.loggedIn}
        loginLink={renders.loginLink}
        onCreateComment={callbacks.addComment}
        postId={postId}
        currentUser={customSelect.currentUser}
      />
    </Spinner>
  );
}

export default memo(Comments);
