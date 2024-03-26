import { memo, useState } from "react";
import PropTypes from 'prop-types';
import "./style.css";

function CommentTextarea({ data, onChange, comments, id, paramsId, onSubmit, onCancel, t }) {
  const [comment, setComment] = useState(data?.text);
  const handleChange = ({ target: { value } }) => {
    let id = '';
    if (comments?.parent?._type === 'article') { id = comments?._id } else if (comments?.parent?._type === 'comment') { id = comments?._id } else { id = paramsId };
    setComment(value);
    onChange({ text: value, parent: { _id: id, _type: comments ? "comment" : "article" } });
  }

  return <div className="CommentTextarea">
    {comments?.parent?._type === "article" && <b>{t("article.answer")}</b>}
    {comments?.parent?._type === "comment" && <b>{t("article.answer")}</b>}
    {!comments?.parent?._type && <b>{t("article.comment")}</b>}
    <textarea
      className="CommentTextarea-textarea"
      value={comment}
      onChange={handleChange}
      placeholder="Текст"
    />
    <div className="CommentTextarea-buttonsbox">
      <button
        onClick={() => onSubmit(data)}>{t("article.send")}</button>
      {<button
        onClick={() => onCancel(paramsId)}>{t("article.cancel")}</button>}
    </div>
  </div>
}

CommentTextarea.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired,
  comments: PropTypes.object,
  id: PropTypes.string,
  paramsId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(CommentTextarea);