import { cn as bem } from "@bem-react/classname";
import React, { memo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import formatDate from "../../utils/format-date";
import Button from "../button";
import TextareaBlock from "../textarea-block";
import "./style.css";

const replyButtonStyles = {
  theme: "none",
  color: "primary",
};

const cancelReplyButtonStyles = {
  theme: "underline",
  color: "dark",
};


const Comment = ({
  id,
  isAuth,
	isAuthor,
  author,
  date,
  text,
  children,
  locale,
  isNested,
  onReplySubmit,
  onReplyChange,
  isReplyOpened,
}) => {
  const [unauthMess, setUnauthMess] = useState(false);
  const cn = bem("Comment");
  const { t } = useTranslate();

  const handleReplyClick = () => {
    if (isAuth) {
      onReplyChange(id);
    } else {
      setUnauthMess(true);
    }
  };
  const handleReplySubmit = (text) => {
    onReplySubmit(text, id);
    onReplyChange(undefined);
  };

  return (
    <div className={cn({ nested: isNested })}>
      <div className={cn("head")}>
        <div className={cn("author", isAuthor && "current")}>{author}</div>
        <div className={cn("date")}>{formatDate(date, locale)}</div>
      </div>
      <div className={cn("text")}>{text}</div>
      <Button onClick={handleReplyClick} styles={replyButtonStyles}>
        {t("comments.reply")}
      </Button>
      {children}
      {unauthMess && (
        <p className={cn("mess")}>
          <Button
            type="link"
            to="/login"
            state={{ back: location.pathname }}
            styles={replyButtonStyles}
          >
            {t("comments.login")}
          </Button>
          {", "}
          <span>{t("comments.loginToReply")}</span>
          {". "}
          <Button
            styles={cancelReplyButtonStyles}
            onClick={() => setUnauthMess(false)}
          >
            {t("comments.cancelReply")}
          </Button>
        </p>
      )}
      {isAuth && isReplyOpened && (
        <TextareaBlock
          className={cn("textarea")}
          title={t("comments.textareaHeader")}
          buttonText={t("comments.sendComment")}
          onSubmin={handleReplySubmit}
        >
          <Button onClick={() => onReplyChange(undefined)}>
            {t("comments.cancelReply")}
          </Button>
        </TextareaBlock>
      )}
    </div>
  );
};

export default memo(Comment);
