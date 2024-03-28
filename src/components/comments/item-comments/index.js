import React from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { memo } from "react";

import PropTypes from "prop-types";
function ItemComments({
  item,
  action,
  textBtn,
  userId,
  paddingLeft,
  dateComment,
}) {
  const cn = bem("ItemComments");

  return (
    <div className={cn()} style={{ paddingLeft: `${paddingLeft}px` }}>
      <div className={cn("head")}>
        <div
          className={`${cn("head-user_name")} ${
            userId === item.author._id && cn("head-author")
          }`}
        >
          {item.author.profile.name}
        </div>
        <div className={cn("head-date")}>{dateComment}</div>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <button className={cn("action")} onClick={action}>
        {textBtn}
      </button>
    </div>
  );
}

ItemComments.propTypes = {
  item: PropTypes.shape({}),
  action: PropTypes.func.isRequired,
  textBtn: PropTypes.string,
  userId: PropTypes.string,
  dateComment: PropTypes.string,
};

ItemComments.defaultProps = {};

export default memo(ItemComments);
