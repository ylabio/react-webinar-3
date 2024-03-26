import { memo } from "react";
import "./style.css";

const CommentCount = ({ count, t }) => {
  return <h3 className="CommentCount">{t("article.comments")} ({count})</h3>
};

export default memo(CommentCount);