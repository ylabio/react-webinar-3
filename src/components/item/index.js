import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onBtnClick: (e) => {
      e.stopPropagation();
      props.btn.onClick({...props.itemData});
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.itemData.code}</div>
      <div className="Item-title">{props.itemData.title}</div>
      <div className="Item-info">
        {props.content.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {props.btn ? (
        <div className="Item-actions">
          <button onClick={callbacks.onBtnClick}>{props.btn.title}</button>
        </div>
      ) : null}
    </div>
  );
}

Item.propTypes = {
  itemData: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  btn: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

Item.defaultProps = {
  info: [""],
};

export default React.memo(Item);
