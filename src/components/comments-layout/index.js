import { memo, useEffect, useState } from 'react';
import "./style.css";

function CommentsLayout({ children, commentForm, t }) {

  return (
    <div className="CommentsLayout">
      <h3 className="CommentsLayout-title">
        {`${t.translate("comments.title")}(${children ? children.length : 0})`}
      </h3>
      <div className="CommentsLayout-comments">
        {children}
      </div>
      {commentForm}
    </div>
  );
}

export default memo(CommentsLayout);