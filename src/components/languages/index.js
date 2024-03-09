import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Languages({onChangeLang, lang}) {

	const handleChange = (e) => {
    onChangeLang(e.target.value);
		e.target.blur()
  };

  return (
    <>
      <select onChange={handleChange} value={lang}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </>
  )
}

Languages.propTypes = {
  lang: PropTypes.string,
  onChangeLang: PropTypes.func,
};

Languages.defaultProps = {
  onChangeLang: () => {}
};

export default memo(Languages);