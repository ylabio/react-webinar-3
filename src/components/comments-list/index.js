import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { memo } from "react";
import listToTree from "../../utils/list-to-tree";

const CommentsList = ({ items, amount, renderItem }) => {
  const commentsTree = amount ? listToTree(items)[0].children : [];

  const cn = bem("CommentsList");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Комментарии ({amount})</h2>
      {amount > 0 && (
        <div className={cn("list")}>
          {commentsTree?.map((c) => (
            <div key={c._id}>{renderItem(c)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

CommentsList.propTypes = {
  items: PropTypes.array,
  amount: PropTypes.number,
  renderItem: PropTypes.func,
};

CommentsList.defaultProps = {
  items: [],
  amount: 0,
  renderItem: () => {},
};

export default memo(CommentsList);
