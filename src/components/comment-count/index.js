import { memo } from "react";
import { useSelector } from "react-redux";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

const CommentCount = () => {
  const count = useSelector(state => state.comments.items.count)
  const { t } = useTranslate();

  return <h3 className="CommentCount">{t("article.comments")} ({count})</h3>
};

export default memo(CommentCount);