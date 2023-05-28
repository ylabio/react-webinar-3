import { memo, useContext } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { StoreContext } from "../../store/context";

function Head({ title }) {
  const store = useContext(StoreContext);

  const changeLanguage = (language) => {
    store.setLanguage(language);
  };

  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="language-buttons">
        <button onClick={() => changeLanguage("ru")}>Русский</button>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("tm")}>Türkmen</button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
