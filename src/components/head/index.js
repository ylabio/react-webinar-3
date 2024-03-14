import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ text, title }) {
  return (
    <div className="Head">{text ? <h1>{text}</h1> : <h1>{title}</h1>}</div>
  );
}

Head.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};

export default memo(Head);
