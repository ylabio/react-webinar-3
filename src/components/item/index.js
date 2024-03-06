import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural, pluralNumber } from "../../utils";
import "./style.css";

import { cn as bem } from "@bem-react/classname";

function Item({ item, onClick, actionsText, actionsBtnText, extraText }) {
  const cn = bem("Item");

  const callbacks = {
    onBtnClick: () => {
      onClick(item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("actions")}>
        <p className={`${cn("text")} ${extraText && cn("text_extra")} Text`}>
          <span className="Text-main">{actionsText}</span>
          {extraText && <span className="Text-extra">{extraText}</span>}
        </p>
        <button onClick={callbacks.onBtnClick}>{actionsBtnText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
