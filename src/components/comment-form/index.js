import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function CommentForm(props) {
  const cn = bem("CommentForm");
  return (
    <form className={cn()} onSubmit={props.onSubmit}>
      <div className={cn("field")}>
        <label className={cn("label")}>
          Новый {props.isReply ? "ответ" : "комментарий"}
        </label>
        <textarea name="text" className={cn("input")} />
      </div>
      <div className={cn("actions")}>
        <button type="submit" className={cn("submit")}>
          Отправить
        </button>
        {props.isReply && (
          <button
            type="button"
            onClick={props.onCancel}
            className={cn("cancel")}
          >
            Отменить
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  isReply: PropTypes.bool,
};

CommentForm.defaultProps = {
  onSubmit: () => {},
  isReply: false,
};

export default CommentForm;
