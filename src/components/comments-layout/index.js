import { memo, useEffect, useState } from 'react';
import "./style.css";

function CommentsLayout({ children, count, commentForm, t }) {

  return (
    <div className="CommentsLayout">
      <h3 className="CommentsLayout-title">
        {`${t.translate("comments.title")}(${count})`}
      </h3>
      <ul className="CommentsLayout-comments">
        {children}
      </ul>
      {commentForm}
    </div>
  );
}

export default memo(CommentsLayout);