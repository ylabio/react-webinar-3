import { memo } from 'react';
import './style.css';

function CommentsTitle({ commentsCount }) {
  return <div className="Comments-title">Комментарии ({commentsCount})</div>;
}
export default memo(CommentsTitle);
