import { memo } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

function Controls({ onAdd }) {
  const { currentLanguage } = useLanguage();
  const { add } = dictionary[currentLanguage];
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{add}</button>
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
