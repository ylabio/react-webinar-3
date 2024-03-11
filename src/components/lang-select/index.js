import React, {useCallback, useState} from 'react';
import './style.css'
import useStore from "../../store/use-store";
import PropTypes from "prop-types";

const LangSelect = ({ lang }) => {
  const [selectedLang, setSelectedLang] = useState(lang)

  const store = useStore()

  const callbacks = {
    changeLang: useCallback((lang) => store.actions.lang.changeLang(lang), [store])
  }

  const onSelectChange = (e) => {
    setSelectedLang(e.target.value)
    callbacks.changeLang(e.target.value)
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
  lang: PropTypes.string
}

export default React.memo(LangSelect);
