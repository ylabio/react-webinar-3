import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import FormComments from "../form-comments";
import AuthAlert from "../auth-alert";
import { memo } from "react";

function FooterComments({ isAuth, onSubmit, children, visible, t }) {
  const cn = bem("FooterComments");
  return (
    <div className={cn()}>
      {visible &&
        (isAuth ? (
          <FormComments
            cb={onSubmit}
            labelBtn={t("comment.send")}
            label={t("comment.new")}
          />
        ) : (
          <AuthAlert text={t("comment.textAuthAlert")}>{children}</AuthAlert>
        ))}
    </div>
  );
}

FooterComments.propTypes = {
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  visible: PropTypes.bool,
};

FooterComments.defaultProps = {
  isAuth: false,
  onSubmit: () => {},
  children: "",
  visible: false,
};

export default memo(FooterComments);
