import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function NewComment({ onSend, session = false, t }) {
  const [value, setValue] = useState("");

  console.log("session new comment");
  console.log(session);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      console.log(value);
      onSend(value);
    }),
  };

  if (session) {
    return (
      <div className="NewComment">
        <div className="NewComment-header">
          {t("comments.newComment")}
          <form onSubmit={callbacks.onSubmit}>
            <textarea onChange={onChange} />
            <button type="submit"> {t("comments.send")}</button>
          </form>
        </div>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="NewComment-message">
        <Link to={"/login"}> {t("comments.login")}</Link>{" "}
        {t("comments.toComment")}
      </div>
    );
  }
}

export default memo(NewComment);
