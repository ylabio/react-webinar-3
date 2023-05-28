import React from 'react'
import PropTypes from "prop-types";
import './style.css';

function LocalizationSelect(props) {

  const options = props.languages.map((item, index) => (
    <option key={`lang-${item}-${index}`}>{item}</option>
  ))

  return (
    <select defaultValue={props.currentLanguage} className='Localization-select' onChange={(e) => props.onChangeLanguage(e.target.value)}>
      {options}
    </select>
  )
}

LocalizationSelect.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
  currentLanguage: PropTypes.string
}

export default React.memo(LocalizationSelect)