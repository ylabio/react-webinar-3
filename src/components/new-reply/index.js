import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";

function NewReply({ onClose, onSend, session = false, t }) {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      onSend(value);
      onClose();
    }),
  };

  if (session) {
    return (
      <div className="NewReply">
        <div className="NewReply-header"> {t("comments.newReply")}</div>
        <form onSubmit={callbacks.onSubmit}>
          <textarea onChange={onChange} />
          <button type="submit"> {t("comments.send")}</button>
          <button type="button" onClick={onClose}>
            {t("comments.cancel")}
          </button>
        </form>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="NewReply-message">
        <Link to={"/login"}> {t("comments.login")}</Link>{" "}
        {t("comments.toReply")}{" "}
        <span onClick={onClose}>{t("comments.cancel")}</span>
      </div>
    );
  }
}

export default memo(NewReply);
