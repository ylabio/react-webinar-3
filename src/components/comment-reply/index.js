import { useRef, useState } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
const CommentReply = ({
  title,
  setOpenInput,
  addComment,
  countBt = 2,
  parentId,
}) => {
  const cn = bem("InputComment");
  const ref = useRef();
  const [warning, setWarning] = useState("");
  const onClick = () => {
    if (ref.current.value.trim().length > 0) {
      addComment(ref.current.value, parentId);
      ref.current.value = "";
      setOpenInput(false);
      setWarning("");
    } else {
      setWarning("Для отправи комментария необходимо минимум один символ");
    }
  };

  return (
    <div className={cn()}>
      <div className={cn() + "-title"}>
        <b>Новый комментарий</b>
      </div>

      <textarea ref={ref} className={cn() + "-text"}></textarea>

      <div className={cn() + "-buttons"}>
        <button onClick={onClick}>Отправить</button>
        {countBt == 2 && (
          <button onClick={() => setOpenInput(false)}>Отмена</button>
        )}
      </div>
      {warning && <div className={cn() + "-warning"}>{warning}</div>}
    </div>
  );
};

export default CommentReply;
