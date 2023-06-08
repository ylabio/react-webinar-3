import { cn as bem } from "@bem-react/classname";
import React, { useRef } from "react";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

const TextareaBlock = ({ title, buttonText, onSubmin, disabled, children }) => {
  const ref = useRef();
  const cn = bem("Textarea");
  const { t } = useTranslate();

  const handleSubmit = () => {
    if (!ref.current.value) return;
    onSubmin(ref.current.value);
    ref.current.value = "";
  };

  return (
    <div className={cn()}>
      {title && <b>{title}</b>}
      <textarea
        placeholder={t("comments.textareaPlaceholder")}
        disabled={disabled}
        ref={ref}
        rows={4}
      />
      <div className={cn("buttonArea")}>
        <button disabled={disabled} onClick={handleSubmit}>
          {buttonText}
        </button>
        {children}
      </div>
    </div>
  );
};

export default TextareaBlock;
