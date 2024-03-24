import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import CommentForm from "../comment-form";
import "./style.css";

function CommentsList({ list, renderItem, formId, session, onCancelForm }) {
  const cn = bem("CommentsList");
  const { t } = useTranslate();

  const callbacks = {};

  return (
    <div className={cn("")}>
      {list.map((item) => (
        <div
          key={item._id}
          className={cn("item")}
          style={{ paddingLeft: 40 * item.offset }}
        >
          {renderItem(item)}
          {formId === item._id ? (
            <CommentForm session={session} onCancelForm={onCancelForm} />
          ) : null}
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
};

CommentsList.defaultProps = {
  list: [],
  renderItem: (item) => {},
};

export default memo(CommentsList);
