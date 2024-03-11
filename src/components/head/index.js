import { memo, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Head({ title }) {
  const store = useStore();
  const select = useSelector((state) => ({
    lang: state.translate.lang,
  }));
  const handleChange = (e) => {
    store.actions.translate.setLang(e.target.value);
  };
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Head-lang-tool">
        <select onChange={(e) => handleChange(e)} value={select.lang}>
          <option value={"RU"}>Ru</option>
          <option value={"ENG"}>Eng</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
