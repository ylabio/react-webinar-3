import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import CommentList from "../../components/comment-list";
import buildCommentTree from "../../utils/buildCommentTree";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import shallowequal from "shallowequal";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

const Comments = () => {
  const { t, lang } = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [postCommentText, setPostCommentText] = useState("");

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    state => ({
      comments: state.comments.data,
      commentCount: state.comments.count,
      waiting: state.comments.waiting,
      userName: state,
    }),
    shallowequal,
  );

  const sessionUserId = useSelector((state) => state.session?.user._id);

  const options = {
    commentTree: useMemo(() => buildCommentTree(select.comments), [select.comments]),
  }

  const callbacks = {
    postComment: useCallback(() => {
      dispatch(commentsActions.post(
        postCommentText,
        activeReplyId ? activeReplyId : params.id,
        activeReplyId ? 'comment' : 'article',
      )).then(() => {
        dispatch(commentsActions.load(params.id));
        setPostCommentText('');
        setActiveReplyId(null);
      }).catch((err) => {
        console.error("Ошибка при отправке комментария", err);
      });
    }, [dispatch, postCommentText, activeReplyId, params.id]),
    goToLogin: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [navigate, location]),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentList
        isAuth={!!sessionUserId}
        commentTree={options.commentTree}
        commentCount={select.commentCount}
        onPost={callbacks.postComment}
        postCommentText={postCommentText}
        setPostCommentText={setPostCommentText}
        activeReplyId={activeReplyId}
        setActiveReplyId={setActiveReplyId}
        sessionUserId={sessionUserId}
        goToLogin={callbacks.goToLogin}
        t={t}
        lang={lang}
      />
    </Spinner>
  );
};

export default memo(Comments);
