import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import useSelector from "../../store/use-selector";
import { getTranslation } from "../../utils";

function Controls({ onAdd }) {
  const select = useSelector((state) => ({
    languages: state.language,
  }));
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
