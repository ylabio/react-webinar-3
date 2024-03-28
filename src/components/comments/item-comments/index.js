import React, { useEffect, useMemo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import formattedDate from "../../../utils/formattedDate";
import { memo } from "react";
import findLastChildren from "../../../utils/findLastChildren";
import PropTypes from "prop-types";
import useInit from "../../../hooks/use-init";
function ItemComments({
  item,
  action,
  textBtn,
  userId,
  lang,
  paddingLeft,
  waiting,
  idAfterRedirect,
  typeNavigation,
}) {
  const cn = bem("ItemComments");

  const displayId = item.children.length
    ? findLastChildren(item.children)
    : item._id;

  useInit(() => {
    if (
      typeNavigation === "REPLACE" &&
      idAfterRedirect === item._id &&
      !waiting
    ) {
      action(idAfterRedirect, displayId, item.level);
    }
  }, []);

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
        <div className={cn("head-date")}>
          {formattedDate(item.dateUpdate, lang)}
        </div>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <button
        className={cn("action")}
        onClick={() => action(item._id, displayId, item.level)}
      >
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
  lang: PropTypes.string,
};

ItemComments.defaultProps = {};

export default memo(ItemComments);
