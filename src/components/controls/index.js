import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import useTranslation from "../../hooks/useTranslation";

function Controls({ onAdd }) {
  const [getTranslation] = useTranslation();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{getTranslation("add")}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
