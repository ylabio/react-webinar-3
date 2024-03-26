import React, { memo } from "react";
import { useSelector as useSelectorRedux } from "react-redux";
import shallowEqual from "shallowequal";

import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments";

import ListComments from "./list-comments";
import useTranslate from "../../hooks/use-translate";
import FooterComments from "./footer";

function CommentsArticle() {
  const { t } = useTranslate();

  const selectRedux = useSelectorRedux(
    (state) => ({
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  return (
    <CommentsLayout title={`${t("comment.title")} (${selectRedux.count})`}>
      {!!selectRedux.count && <ListComments />}
      <FooterComments />
    </CommentsLayout>
  );
}

export default memo(CommentsArticle);
