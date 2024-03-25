import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes, { bool } from "prop-types";
import "./style.css";

function NewComment({ onSend, onClose, session = false, t }) {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      console.log(value);
      onSend(value);
      onClose();
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

NewComment.propTypes = {
  onSend: PropTypes.func,
  onClose: PropTypes.func,
  session: PropTypes.bool,
  t: PropTypes.func,
};

NewComment.defaultProps = {
  onSend: () => {},
  onClose: () => {},
  session: false,
  t: (text) => text,
};

export default memo(NewComment);
