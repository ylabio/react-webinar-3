import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import useInit from "../../hooks/use-init";
import findLastChildren from "../../utils/findLastChildren";
import { useNavigationType } from "react-router-dom";
import ItemComments from "../../components/comments/item-comments";
import setPaddingLeft from "../../utils/setPaddingLeft";
import { useDispatch } from "react-redux";
import commentsActions from "./../../store-redux/comments/actions";
import formattedDate from "../../utils/formattedDate";
function ScrollAfterRedirect({
  item,
  action,
  textBtn,
  userId,
  lang,
  waiting,
  idAfterRedirect,
}) {
  const dispatch = useDispatch();

  const typeNavigation = useNavigationType();
  const callbacks = {
    onOpenForm: useCallback((clickedId, showId, levelPadding) => {
      dispatch(commentsActions.setTypeComments("comment"));
      dispatch(commentsActions.setShowForm(clickedId, showId, levelPadding));
    }, []),
  };
  const displayId = item.children.length
    ? findLastChildren(item.children)
    : item._id;

  useInit(() => {
    if (
      typeNavigation === "REPLACE" &&
      idAfterRedirect === item._id &&
      !waiting
    ) {
      callbacks.onOpenForm(idAfterRedirect, displayId, item.level);
    }
  }, []);

  return (
    <ItemComments
      displayId={displayId}
      item={item}
      textBtn={textBtn}
      action={() => callbacks.onOpenForm(item._id, displayId, item.level)}
      userId={userId}
      paddingLeft={item.level && setPaddingLeft(item.level, 30)}
      dateComment={formattedDate(item.dateUpdate, lang)}
    />
  );
}

ScrollAfterRedirect.propTypes = {
  item: PropTypes.shape({}),
  action: PropTypes.func,
  textBtn: PropTypes.string,
  userId: PropTypes.string,
  lang: PropTypes.string,
  waiting: PropTypes.bool,
  idAfterRedirect: PropTypes.string,
};

export default memo(ScrollAfterRedirect);
