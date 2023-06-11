import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import formatDate from "../../utils/format-date";
import {MAX_LEVEL, PADDING_SIZE} from "../../containers/comments";

function Comment({t, lang, data, username, isOwnComment, onAnswer}) {
  const cn = bem('Comment');

  const paddingLeft = {paddingLeft: `calc(${data.level < MAX_LEVEL ? data.level : MAX_LEVEL} * ${PADDING_SIZE}px )`}

  return (
    <div style={paddingLeft} className={cn()}>
      <div className={cn('form')}>
        <div className={cn('header')}>
          <span className={cn('username', {ownComment: isOwnComment})}>{username}</span>
          <span className={cn('dateCreate')}>{formatDate(data?.dateCreate, lang)}</span>
        </div>
        <div className={cn('text')}>
          {data.text}
        </div>
        <button onClick={() => onAnswer(data._id)}
                className={cn('answerButton')}>{t("commentaries.answer")}</button>
      </div>
    </div>
  )
}

Comment.propTypes = {
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
      _tree: PropTypes.object
    }),
    parent: PropTypes.shape({
      _id: PropTypes.string,
    })
  }).isRequired,
  username: PropTypes.string.isRequired,
  isOwnComment: PropTypes.bool.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default memo(Comment);
