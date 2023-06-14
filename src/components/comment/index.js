import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { dateFormat } from "../../utils/dateFormat";

import "./style.css";

function Comment({ comment, component, onAnswer, answerId, userId, answers, level = 1 }) {
  const cn = bem("Comment");

  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <div
          className={cn("username", {
            active: userId === comment.author._id,
          })}
        >
          {comment.author.profile.name}
        </div>
        <div className={cn("date")}>
          {dateFormat(new Date(comment.dateCreate))}
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <button onClick={() => onAnswer(comment._id)} className={cn("answer")}>
          Ответить
        </button>
      </div>
      <div className={cn("answers")}>
        {level < 20 &&
          <div className={cn("branch")}/>
        }
        <div className={cn("wrapper")}>
          {answers.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              component={component}
              onAnswer={onAnswer}
              answerId={answerId}
              userId={userId}
              answers={comment.children}
              level={level + 1}
            />
          ))}
          {answerId === comment._id && component}
        </div>
      </div>
    </div>
  );
}

export default memo(Comment);

Comment.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  component: PropTypes.node,
  answers: PropTypes.array,
  show: PropTypes.string,
};

Comment.defaultProps = {
  username: "user",
  date: "2023-04-06",
  text: "Благодаря компактному размеру гирлянду можно взять с собой и создать праздничную атмосферу в любом месте. Уникальным преимуществом изделия является возможность использовать его при создании декоративных букетов из конфет, фруктов, игрушек, а также живых цветов. Мягкий свет добавит волшебства и сказочности в композицию.",
  answerId: "",
  answers: [],
};
