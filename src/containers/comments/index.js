import { memo, useCallback, useEffect, useMemo, useState } from "react";
import CommentList from "../../components/comment-list";
import { useDispatch, useSelector as useStoreRedux } from "react-redux";
import shallowEqual from "shallowequal";
import Spinner from "../../components/spinner";
import getNestedComments from "../../utils/comment-tree";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";
import { useLocation, useParams } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import listToTree from "../../utils/list-to-tree";

function Comments() {
  const params = useParams();
  const location = useLocation();

  const { t } = useTranslate();

  const select = useStoreRedux(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const session = useSelector((state) => ({
    exists: state.session.exists,
    user: state.session.user,
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
        dispatch(commentsActions.sendComment(data, session.user.profile.name));
      },
      [select]
    ),

    sendComment: useCallback(
      async (text) => {
        const data = {
          text: text,
          parent: { _id: params.id, _type: "article" },
        };

        dispatch(commentsActions.sendComment(data, session.user.profile.name));
      },
      [select]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentList
        list={select.count ? listToTree(select.comments)[0].children : []}
        // list={getNestedComments(select.comments)}
        count={select.count}
        onOpenReply={callbacks.openReply}
        onCloseReply={callbacks.closeReply}
        onSendReply={callbacks.sendReply}
        onSendComment={callbacks.sendComment}
        session={session}
        pathname={location.pathname}
        t={t}
      />
    </Spinner>
  );
}

export default memo(Comments);
