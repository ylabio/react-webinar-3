import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import CommentWriter from "../comment-writer";
import dateFormat from "../../utils/date-format";
import EnterRequirement from "../enter-requirement";

function Comment(props) {
  const cn = bem("Comment");

  const formatedDate = dateFormat(props.commentData.dateCreate);

  const handleChoseComment = () => {
    props.onChoseComment(props.commentData._id);
  }

  return (
    <div style={{paddingLeft: props.commentData.level < 11 ? props.commentData.level * 30 : 300}}>
      <div className={cn()}>
        <div className={cn("info")}>
          <p className={cn(props.userId === props.commentData.author._id ? "chosen-user" : "user")}>{props.commentData.author.profile.name}</p>
          <p className={cn("date")}>{formatedDate}</p>
        </div>
        <div className={cn("text")}>
          {props.commentData.isDeleted ? <p className={cn("deleted")}>Комментарий удален</p> : props.commentData.text}
        </div>
        <p className={cn("answer")} onClick={handleChoseComment}>
          Ответить
        </p>
      </div>
      <CommentWriter
        visible={props.exists && props.commentData._id === props.chosenComment}
        onSendComment={props.onSendComment}
        chosenComment={props.chosenComment}
        onChoseComment={props.onChoseComment}
        articleId={props.articleId}
        hasChild={props.hasChild}
        answerRef={props.answerRef}
      />
      <EnterRequirement
        visible={!props.exists && props.commentData._id === props.chosenComment}
        chosenComment={props.chosenComment}
        onChoseComment={props.onChoseComment}
        onNavigate={props.onNavigate}
        hasChild={props.hasChild}
        answerRef={props.answerRef}
      />
    </div>
  );
}

Comment.propTypes = {
  commentData: PropTypes.shape({
    parent: PropTypes.shape({
      _id: PropTypes.string,
      type: PropTypes.string,
    }),
    author: PropTypes.shape({
      _id: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    isDeleted: PropTypes.bool,
    level: PropTypes.number,
  }).isRequired,
  onSendComment: PropTypes.func,
  exists: PropTypes.bool,
  onChoseComment: PropTypes.func,
  onNavigate: PropTypes.func,
  articleId: PropTypes.string,
  userId: PropTypes.string,
  hasChild: PropTypes.bool,
  answerRef: PropTypes.oneOfType([PropTypes.shape({current: PropTypes.instanceOf(Element)})]),
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

Comment.defaultProps = {
  chosenComment: null,
  exists: false,
  articleId: "",
  hasChild: true,
  onSendComment: () => {},
  onChoseComment: () => {},
  onNavigate: () => {},
};

export default memo(Comment);
