import { memo, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, onChangeLang, lang }) {
  const handleChange = (e) => {
    onChangeLang(e.target.value);
  };

  console.log(4545, lang);
  return (
    <div className="Head">
      <h1>{title}</h1>
      <select onChange={handleChange} defaultValue={lang}>
        <option value="ru">РУС</option>
        <option value="en">ENG</option>
      </select>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  onChangeLang: PropTypes.func,
};

export default memo(Head);
