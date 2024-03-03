import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onBtnClick: (e) => {
      e.stopPropagation();
      props.btn.onClick(props.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.code}</div>
      <div className="Item-title">{props.title}</div>
      <div className="Item-info">
        {props.infoContent.map((info, index) => (
          <div key={index}>{info}</div>
        ))}
      </div>
      { props.btn ? (
        <div className="Item-actions">
          <button onClick={callbacks.onBtnClick}>{props.btn.title}</button>
        </div>
      ) : null}
    </div>
  );
}

Item.propTypes = {
  code: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  infoContent: PropTypes.arrayOf(PropTypes.string),
  btn: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  })
};

Item.defaultProps = {
  infoContent: [""],
};

export default React.memo(Item);
