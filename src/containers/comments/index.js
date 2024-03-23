import { memo, useCallback, useEffect, useMemo } from "react";
import CommentList from "../../components/comment-list";
import { useDispatch, useSelector as useStoreRedux } from "react-redux";
import shallowEqual from "shallowequal";
import Spinner from "../../components/spinner";
import getNestedComments from "../../utils/comment-tree";
import commentsActions from "../../store-redux/comments/actions";
import newCommentActions from "../../store-redux/comments/new/actions";
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Comments() {
  const params = useParams();

  const { t } = useTranslate();

  const select = useStoreRedux(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
      sent: state.newComment.success,
      newCommentWaiting: state.newComment.waiting,
    }),
    shallowEqual
  );

  const session = useSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
  }));

  const dispatch = useDispatch();

  const callbacks = {
    openReply: useCallback((_id) => {
      dispatch(commentsActions.openReply(_id));
    }, []),

    closeReply: useCallback((_id) => {
      dispatch(commentsActions.closeReply(_id));
    }, []),

    sendReply: useCallback(
      async (parentId, text) => {
        const data = {
          text: text,
          parent: { _id: parentId, _type: "comment" },
        };
        dispatch(newCommentActions.sendComment(data)).then(() =>
          dispatch(commentsActions.load(params.id))
        );
      },
      [select.comments]
    ),

    sendComment: useCallback(
      async (text) => {
        const data = {
          text: text,
          parent: { _id: params.id, _type: "article" },
        };

        dispatch(newCommentActions.sendComment(data)).then(() =>
          dispatch(commentsActions.load(params.id))
        );
        console.log(select.comments);
      },
      [select.comments]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentList
        list={getNestedComments(select.comments)}
        count={select.count}
        onOpenReply={callbacks.openReply}
        onCloseReply={callbacks.closeReply}
        onSendReply={callbacks.sendReply}
        onSendComment={callbacks.sendComment}
        session={session.exists}
        t={t}
      />
    </Spinner>
  );
}

export default memo(Comments);
