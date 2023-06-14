import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function CommentWriter({visible, onSendComment, chosenComment, onChoseComment, hasChild, answerRef}) {
  const cn = bem("CommentWriter");

  const [commentText, setCommentText] = useState("");

  const changeText = e => {
    setCommentText(e.target.value);
  };

  const onClickSend = _ => {
    if (commentText.trim().length > 0) {
      onSendComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div style={{paddingLeft: !hasChild ? 30 : 0}} ref={visible ? answerRef : null}>
      <div className={cn(`${visible ? "" : "hidden"}`)}>
        <p className={cn("write")}>{`Новый ${chosenComment ? "ответ" : "комментарий"}`}</p>
        <textarea type="textarea" value={commentText} onChange={changeText} />
        <div className={cn("buttons")}>
          <button onClick={onClickSend}>Отправить</button>
          {chosenComment && <button onClick={() => onChoseComment(null)}>Отмена</button>}
        </div>
      </div>
    </div>
  );
}

CommentWriter.propTypes = {
  visible: PropTypes.bool,
  onSendComment: PropTypes.func,
  onChoseComment: PropTypes.func,
  articleId: PropTypes.string,
  hasChild: PropTypes.bool,
  answerRef: PropTypes.oneOfType([PropTypes.shape({current: PropTypes.instanceOf(Element)})]),
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

CommentWriter.defaultProps = {
  visible: false,
  chosenComment: null,
  articleId: "",
  hasChild: true,
  onSendComment: () => {},
  onChoseComment: () => {},
};

export default memo(CommentWriter);
