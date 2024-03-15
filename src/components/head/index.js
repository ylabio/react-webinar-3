import { memo } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import "./style.css";

function Head(props) {
  const store = useStore();
  const t = props.useTranslate;

  return (
    <div className="Head">
      <h1>{t(props.title)}</h1>
      <button onClick={props.langChange}>
        {props.lang === "ru" ? "en" : "ru"}
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
