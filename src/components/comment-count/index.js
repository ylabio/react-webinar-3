import { memo } from "react";
import "./style.css";

const CommentCount = ({ count }) => {
  return <h3 className="CommentCount">Комментарии ({count})</h3>
};

export default memo(CommentCount);