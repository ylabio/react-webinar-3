import {
  memo,
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

function NewReply({ onClose, onSend, session, pathname, t }) {
  const [value, setValue] = useState("");
  const formRef = useRef(null);

  useEffect(
    () =>
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" }),
    []
  );

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
      <div className="NewReply" ref={formRef}>
        <div className="NewReply-header"> {t("comments.newReply")}</div>
        <form onSubmit={callbacks.onSubmit}>
          <textarea onChange={onChange} />
          <button
            type="submit"
            disabled={!value || value.trim() === ""}
            // className={!value && "NewReply-button_disabled"}
          >
            {" "}
            {t("comments.send")}
          </button>
          <button type="button" onClick={onClose}>
            {t("comments.cancel")}
          </button>
        </form>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="NewReply-message" ref={formRef}>
        <Link to={"/login"} state={{ back: pathname }}>
          {" "}
          {t("comments.login")}
        </Link>{" "}
        {t("comments.toReply")}{" "}
        <span onClick={onClose}>{t("comments.cancel")}</span>
      </div>
    );
  }
}

NewReply.propTypes = {
  onSend: PropTypes.func,
  onClose: PropTypes.func,
  session: PropTypes.bool,
  t: PropTypes.func,
};

NewReply.defaultProps = {
  onSend: () => {},
  onClose: () => {},
  session: false,
  t: (text) => text,
};

export default memo(NewReply);
