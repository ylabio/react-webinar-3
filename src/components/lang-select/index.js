import React, {useState} from 'react';
import './style.css'
import PropTypes from "prop-types";

const LangSelect = ({ lang, changeLang }) => {
  const [selectedLang, setSelectedLang] = useState(lang)

  const onSelectChange = (e) => {
    setSelectedLang(e.target.value)
    changeLang(e.target.value)
  }

  return (
    <select
      className='LangSelect'
      value={selectedLang}
      onChange={(e) => onSelectChange(e)}
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
};

LangSelect.propTypes = {
  lang: PropTypes.string,
  changeLang: PropTypes.func
}

LangSelect.defaultProps = {
  changeLang: () => {}
}

export default React.memo(LangSelect);
