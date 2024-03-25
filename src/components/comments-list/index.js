import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import CommentForm from "../comment-form";
import "./style.css";

function CommentsList({
  list,
  renderItem,
  formId,
  session,
  location,
  onCloseForm,
  onCommentSend,
}) {
  const cn = bem("CommentsList");

  return (
    <div className={cn("")}>
      {list.map((item) => (
        <div
          key={item._id}
          className={cn("item")}
          style={{ paddingLeft: 40 * item.offset }}
        >
          {renderItem(item)}
          {formId === item._id && (
            <CommentForm
              formId={formId}
              session={session}
              type="comment"
              location={location}
              onCloseForm={onCloseForm}
              onCommentSend={onCommentSend}
            />
          )}
        </div>
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      offset: PropTypes.number,
      username: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  renderItem: PropTypes.func,
  formId: PropTypes.string,
  location: PropTypes.string,
};

CommentsList.defaultProps = {
  list: [],
  renderItem: (item) => {},
};

export default memo(CommentsList);
