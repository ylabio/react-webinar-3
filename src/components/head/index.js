import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, lang, callback }) {
  const handleChange = (e) => {
    callback(e.target.value);
  };

  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Head-lang-tool">
        <select onChange={(e) => handleChange(e)} value={lang}>
          <option value={"RU"}>Ru</option>
          <option value={"ENG"}>Eng</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default memo(Head);
