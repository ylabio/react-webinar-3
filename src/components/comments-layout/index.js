import { memo, useEffect, useState } from 'react';
import "./style.css";

function CommentsLayout({ children, commentFormVisible, onSend, labelTitle, labelNewComment, labelSend }) {

  const [form, setForm] = useState({});  
  
  return (
    <div className="CommentsLayout">
      <h3 className="CommentsLayout-title">
        {`${labelTitle}(${children ? children.length : 0})`}
      </h3>
      <div className="CommentsLayout-comments">
        {children}
      </div>
      {commentFormVisible && <form>
        <label>{labelNewComment}</label>
        <textarea />
        <div className="CommentsLayout-form-buttons">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onSend(form);
            }}
          >{labelSend}</button>
        </div>
      </form>}
    </div>
  );
}

export default memo(CommentsLayout);