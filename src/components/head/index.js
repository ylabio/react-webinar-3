import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
function Head({ title, onChangeLang, valueLang }) {
  return (
    <div className="Head">
      <h1>{title}</h1>      
      <button onClick={onChangeLang}>{ valueLang ? "ru" : "en" }</button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
