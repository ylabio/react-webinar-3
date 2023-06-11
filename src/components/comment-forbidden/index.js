import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function CommentForbidden({t, isAnswer, onSignIn, onCancel}) {
  const cn = bem('CommentForbidden');

  return (
    <p className={cn()}>
      <span onClick={onSignIn} className={cn("signInButton")}>{t("commentaries.signIn")}</span>
      <span className={cn("text")}>, {
        isAnswer
          ? t("commentaries.forbiddenAnswer")
          : t("commentaries.forbiddenComment")
      } </span>
      {isAnswer && <span onClick={onCancel} className={cn("cancelButton")}>{t("commentaries.cancel")}</span>}
    </p>
  )
}

CommentForbidden.propTypes = {
  t: PropTypes.func.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default memo(CommentForbidden);
