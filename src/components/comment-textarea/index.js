import { memo, useState } from "react";
import useSelector from '../../hooks/use-selector';
import PropTypes from 'prop-types';
import "./style.css";

function CommentTextarea({ comments, id, paramsId, onCancel, t, handleCommentSubmit }) {
  const exists = useSelector(state => state.session.exists);
  const [comment, setComment] = useState('');

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  }
  const handleSubmit = () => {
    if ((/^\s*$/.test(comment))) return alert(t("article.empty"));
    let id = null;
    if (comments?.parent?._type === 'article') { id = comments?._id } else if (comments?.parent?._type === 'comment') { id = comments?._id } else { id = paramsId };
    handleCommentSubmit({ text: comment, parent: { _id: id, _type: comments ? "comment" : "article" } });
    setComment('');
  }

  return exists && <div className="CommentTextarea">
    {comments?.parent?._type === "article" && <b>{t("article.answer")}</b>}
    {comments?.parent?._type === "comment" && <b>{t("article.answer")}</b>}
    {!comments?.parent?._type && <b>{t("article.comment")}</b>}
    <textarea
      className="CommentTextarea-textarea"
      value={comment}
      onChange={handleChange}
    />
    <div className="CommentTextarea-buttonsbox">
      <button
        onClick={handleSubmit}>{t("article.send")}</button>
      {id !== paramsId && <button
        onClick={() => onCancel(paramsId)}>{t("article.cancel")}</button>}
    </div>
  </div>
}

CommentTextarea.propTypes = {
  comments: PropTypes.object,
  id: PropTypes.string,
  paramsId: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  handleCommentSubmit: PropTypes.func.isRequired,
};

export default memo(CommentTextarea);