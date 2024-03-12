import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import "./style.css";

function Head({ title }) {
  const store = useStore();
  const select = useSelector((state) => ({ lang: state.translator.language }));

  const callbacks = {
    langChange: useCallback(() => {
      store.actions.translator.langChange();
    }, [store]),
  };

  return (
    <div className="Head">
      <h1>{title}</h1>
      <button onClick={callbacks.langChange}>
        {select.lang === "ru" ? "en" : "ru"}
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
