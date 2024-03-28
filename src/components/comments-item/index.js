import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsItem({ comment, setFormId, username }) {
  const cn = bem("CommentsItem");
  const month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const convertTime = (num) => {
    return num >= 10 ? num : `0${num}`;
  };

  const callbacks = {
    setFormId: () => {
      setFormId(comment._id);
    },
  };

  const date = new Date(comment.date);

  return (
    <>
      <div className={cn("head")}>
        <span
          className={
            comment?.username === username
              ? cn("username", { authorized: true })
              : cn("username")
          }
        >
          {comment?.username}
        </span>
        <span className={cn("date")}>{`${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()} в ${date.getHours()}:${convertTime(
          date.getMinutes()
        )}`}</span>
      </div>
      <div className={cn("text")}>{comment?.text}</div>
      <div className={cn("control")}>
        <span className={cn("answer")} onClick={callbacks.setFormId}>
          Ответить
        </span>
      </div>
    </>
  );
}

CommentsItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  setFormId: PropTypes.func,
};

CommentsItem.defaultProps = {
  comment: {},
  setFormId: () => {},
};

export default memo(CommentsItem);
