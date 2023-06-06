import {memo} from "react";
import PropTypes from "prop-types";
import LocaleSelect from "../../containers/locale-select";
import "./style.css";

function Head({title}) {
  return (
    <div className="Head">
      <div className="Head-place">
        <h1>{title}</h1>
      </div>
      <div className="Head-place">
        <LocaleSelect />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
