import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsHead({ count, t }) {
  const cn = bem("CommentsHead");
  return (
    <div className={cn()}>
      <span>{`Комментарии (${count})`}</span>
    </div>
  );
}

CommentsHead.propTypes = {
  count: PropTypes.number,
  t: PropTypes.func,
};

CommentsHead.defaultProps = {
  count: 0,
  t: (text) => text,
};

export default memo(CommentsHead);
