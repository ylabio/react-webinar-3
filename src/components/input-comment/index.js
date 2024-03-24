import { useRef } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
const InputComment = ({
  title,
  setOpenInput,
  addComment,
  countBt = 2,
  element,
}) => {
  const cn = bem("InputComment");
  const ref = useRef();
  const onClick = () => {
    addComment(element, ref.current.value);
    ref.current.value = "";
    setOpenInput(false);
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
    </div>
  );
};

export default InputComment;
