import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import CommentList from "../../components/comment-list";
import Layout from "../../components/layout";
import TextareaBlock from "../../components/textarea-block";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { commentsActions } from "../../store-redux/comments/actions";
import createCommentTree from "../../utils/create-comment-tree";

const loginButtonStyles = {
  theme: "underline",
  color: "primary",
};

const CommentsLayoutStyles = {
  padding: "big",
};

const ArticleComments = () => {
  const { t } = useTranslate();
  const params = useParams();
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.locale.lang);
  const comments = useSelectorRedux((state) => state.comments.comments);
  const commentsLen = useSelectorRedux((state) => state.comments.commentsLen);
  const sendCommentWaiting = useSelectorRedux(
    (state) => state.comments.sendCommentWaiting
  );
  const session = useSelector((state) => ({
    exists: state.session.exists,
    waitin: state.session.waiting,
    userId: state.session.user._id,
  }));

  useEffect(() => {
    dispatch(commentsActions.load(params.id));
  }, []);

  if (!session.exists && session.waiting) return null;

	const handleCloseOpenedReply = useRef()

  const handleCommentSubmit = useCallback((text) => {
    dispatch(commentsActions.sendComment(text, "article", params.id));
  }, []);
  const handleReplySubmit = useCallback((text, commentId) => {
    dispatch(commentsActions.sendComment(text, "comment", commentId));
  }, []);
  const handleOpenReply = useCallback((closeCallback) => {
		handleCloseOpenedReply.current && handleCloseOpenedReply.current()
		handleCloseOpenedReply.current = closeCallback;
  }, []);

  const commentsMemo = useMemo(() => createCommentTree(comments), [comments]);

  return (
    <Layout styles={CommentsLayoutStyles}>
      <h3>
        {t("comments.head")} ({commentsLen})
      </h3>
      {commentsMemo.map((el) => (
        <CommentList
          key={el.id}
          item={el}
          onReplySubmit={handleReplySubmit}
          userId={session.userId}
          locale={locale}
          onReplyOpen={handleOpenReply}
        />
      ))}

      {!session.exists ? (
        <div className="pt-md pb-md">
          <Button
            styles={loginButtonStyles}
            type="link"
            to="/login"
            state={{ back: location.pathname }}
          >
            {t("comments.login")}
          </Button>
          {", "}
          <span>{t("comments.loginToComment")}</span>
        </div>
      ) : (
        <TextareaBlock
          disabled={sendCommentWaiting}
          title={t("comments.newComment")}
          buttonText={t("comments.sendComment")}
          onSubmin={handleCommentSubmit}
        />
      )}
    </Layout>
  );
};

export default memo(ArticleComments);
