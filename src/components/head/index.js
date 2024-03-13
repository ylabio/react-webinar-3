import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, onChangeLang }) {
  const callbacks = {
    onClickCategory: (e) => onChangeLang(e),
  };

  return (
    <div className="Head">
      <h1 className="flag-Head-title">{title}</h1>
      <div className="Head-lang">
        <select
          className="Head-lang-select"
          onChange={(e) => callbacks.onClickCategory(e.target.value)}
        >
          <option value="ru" defaultValue>
            RU
          </option>
          <option value="en">EN</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLang: PropTypes.func,
};

Head.defaultProps = {
  onChangeLang: () => {},
};

export default memo(Head);
