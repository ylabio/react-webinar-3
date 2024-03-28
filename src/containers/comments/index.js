import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shallowEqual from "shallowequal";
import Comment from "../../components/comment";
import CommentForm from "../../components/comment-form";
import CommentsLayout from "../../components/comments-layout";
import CommentsList from "../../components/comments-list";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";

function Comments() {
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, userId, article } = useSelector((state) => ({
    isLoggedIn: state.session.exists,
    userId: state.session.user._id,
  }));
  const { comments, amount, waiting } = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      amount: state.comments.data.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const callbacks = {
    onReply: useCallback(
      (id) => setSelectedCommentId(id),
      [setSelectedCommentId]
    ),
    onSubmit: (text, isReply) => {
      dispatch(
        commentsActions.post({
          text: text,
          parent: {
            _id: isReply ? selectedCommentId : params.id,
            _type: isReply ? "comment" : "article",
          },
        })
      );
      setSelectedCommentId(null);
    },
    onCancel: useCallback(() => {
      setSelectedCommentId(null);
    }, [setSelectedCommentId]),
    onLogin: () => {
      navigate("/login", { state: { back: location.pathname } });
    },
  };

  const renders = {
    comment: useCallback(
      (comment) => (
        <Comment
          data={comment}
          currentUserId={userId}
          isLoggedIn={isLoggedIn}
          selectedCommentId={selectedCommentId}
          onSubmit={callbacks.onSubmit}
          onReply={callbacks.onReply}
          onCancel={callbacks.onCancel}
          onLogin={callbacks.onLogin}
        />
      ),
      [userId, isLoggedIn, selectedCommentId]
    ),
  };

  return (
    <Spinner active={waiting}>
      <CommentsLayout>
        <CommentsList
          items={comments}
          amount={amount}
          renderItem={renders.comment}
        />
        {selectedCommentId == null && (
          <CommentForm
            onSubmit={callbacks.onSubmit}
            onLogin={callbacks.onLogin}
            isLoggedIn={isLoggedIn}
            label="Новый комментарий"
          />
        )}
      </CommentsLayout>
    </Spinner>
  );
}

export default memo(Comments);
