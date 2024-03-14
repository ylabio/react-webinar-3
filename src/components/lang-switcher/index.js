import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function LangSwitcher({ lang, supportedLangs, onChange }) {
  return (
    <div className="LangSwitcher">
      <select
        value={lang}
        onChange={onChange}
      >
        {Object.entries(supportedLangs).map(
          ([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

LangSwitcher.propTypes = {
  lang: PropTypes.string,
  supportedLangs: PropTypes.object,
  onChange: PropTypes.func
};

LangSwitcher.defaultProps = {
  lang: 'ru',
  supportedLangs: {},
  onChange: () => {}
}

export default memo(LangSwitcher);
