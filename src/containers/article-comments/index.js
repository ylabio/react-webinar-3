import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import Comment from "../../components/comment";
import Layout from "../../components/layout";
import TextareaBlock from "../../components/textarea-block";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { commentsActions } from "../../store-redux/comments/actions";
import renderComponentTree from "../../utils/renderComponentTree";

const loginButtonStyles = {
  theme: "underline",
  color: "primary",
};

const CommentsLayoutStyles = {
  padding: "big",
};

const ArticleComments = () => {
  const { t } = useTranslate();
  const [openedReplyId, setOpenedReplyId] = useState();
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
  }));

  useEffect(() => {
    if (!sendCommentWaiting) dispatch(commentsActions.load(params.id));
  }, [sendCommentWaiting]);

  if (!session.exists && session.waiting) return null;

  const handleCommentSubmit = useCallback((text) => {
    dispatch(commentsActions.sendComment(text, "article", params.id));
  }, []);
  const handleReplySubmit = useCallback(
    (commentId) => (text) => {
      dispatch(commentsActions.sendComment(text, "comment", commentId));
    },
    []
  );
  const handleReplyChange = useCallback((commentId) => {
    setOpenedReplyId(commentId);
  }, []);

  const commentsMemo = useMemo(
    () =>
      renderComponentTree(comments, Comment, (el) => ({
        id: el._id,
        onReplySubmit: handleReplySubmit(el._id),
        isAuth: session.exists,
        author: el.author.name,
        date: el.dateCreate,
        text: el.text,
        locale: locale,
        onReplyChange: handleReplyChange,
        isReplyOpened: openedReplyId === el._id,
      })),
    [comments, locale, openedReplyId]
  );

  return (
    <Layout styles={CommentsLayoutStyles}>
      <h3>
        {t("comments.head")} ({commentsLen})
      </h3>
      {commentsMemo}
      {!session.exists ? (
        <div className="pt-md pb-md">
          <Button styles={loginButtonStyles} type="link" to="/login">
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
