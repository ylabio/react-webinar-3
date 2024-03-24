import React, { memo, useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import shallowEqual from "shallowequal";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments";
import useSelector from "../../hooks/use-selector";
import FooterComments from "../../components/comments/footer-comments";
import ListComments from "../../containers/list-comments";
import useTranslate from "../../hooks/use-translate";

function CommentsArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    user: state.session.user,
  }));

  const selectRedux = useSelectorRedux(
    (state) => ({
      count: state.comments.count,
      comments: state.comments.data,
      waiting: state.comments.waiting,
      type: state.comments.typeComments,
    }),
    shallowEqual
  );

  const callbacks = {
    addComment: useCallback(
      (text) => {
        dispatch(
          commentsActions.add({
            text: text,
            parent: {
              _id: id,
              _type: "article",
            },
          })
        );
      },
      [id]
    ),
  };

  return (
    <CommentsLayout title={`${t("comment.title")} (${selectRedux.count})`}>
      <Spinner active={selectRedux.waiting}>
        {!!selectRedux.count && <ListComments />}
        <FooterComments
          visible={!!(selectRedux.type == "article")}
          onSubmit={callbacks.addComment}
          isAuth={!!select.user.username}
          t={t}
        >
          <Link to={"/login"} state={{ back: pathname }}>
            {t("comment.textLink")}
          </Link>
        </FooterComments>
      </Spinner>
    </CommentsLayout>
  );
}

export default memo(CommentsArticle);
