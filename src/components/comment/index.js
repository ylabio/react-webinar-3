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
	item,
	userId,
  children,
  locale,
  isNested,
  onReplySubmit,
  onReplyOpen,
}) => {
  const [unauthMess, setUnauthMess] = useState(false);
	const [replyBlock, setReplyBlock] = useState(false)
  const cn = bem("Comment");
  const { t } = useTranslate();

  const handleReplyClick = () => {
    if (userId) {
			onReplyOpen(() => setReplyBlock(false))
			setReplyBlock(true)
    } else {
      setUnauthMess(true);
    }
  };
  const handleReplySubmit = (text) => {
    onReplySubmit(text, item.id);
    onReplyOpen(undefined);
  };

  return (
    <div className={cn({ nested: isNested })}>
      <div className={cn("head")}>
        <div className={cn("author", userId === item.authorId && "current")}>
          {item.authorName}
        </div>
        <div className={cn("date")}>{formatDate(item.date, locale)}</div>
      </div>
      <div className={cn("text")}>{item.text}</div>
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
      {userId && replyBlock && (
        <TextareaBlock
          className={cn("textarea")}
          title={t("comments.textareaHeader")}
          buttonText={t("comments.sendComment")}
          onSubmin={handleReplySubmit}
        >
          <Button onClick={() => onReplyOpen(undefined)}>
            {t("comments.cancelReply")}
          </Button>
        </TextareaBlock>
      )}
    </div>
  );
};

export default memo(Comment);
