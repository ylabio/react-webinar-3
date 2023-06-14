import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function AnswerForm({ onSend, onCancel, type }) {
  const cn = bem("AnswerForm");
  const [value, setValue] = useState("");

  let title = "комментарий";
  if (type === "comment") title = "ответ";

  const sendHandler = () => {
    if (value.trim().length < 1) return;
    onSend(value);
    setValue('')
    onCancel()
  };
  return (
    <div className={cn()}>
      <label className={cn("label")}>Новый {title}</label>
      <textarea
        onChange={({ target }) => setValue(target.value)}
        value={value}
        className={cn("textarea")}
      />
      <div className={cn("controls")}>
        <button onClick={sendHandler}>Отправить</button>
        {type === "comment" && <button onClick={onCancel}>Отмена</button>}
      </div>
    </div>
  );
}

export default memo(AnswerForm);

AnswerForm.propTypes = {
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.oneOf(["comment", "article"]),
};

AnswerForm.defaultProps = {
  onSend: () => {},
  onCancel: () => {},
  type: "article",
};
