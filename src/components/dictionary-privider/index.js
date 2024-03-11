import { useState, memo } from "react";
import PropTypes from "prop-types";

import { DictionaryContext } from "../../store/context";

import ru from "./ru";
import en from "./en";

const lngs = {
  ru, en
};

function DictionaryProvider({ children }) {
  const [currentDictionary, setCurrentDictionary] = useState(lngs.ru);
  const [currentLng, setCurrentLng] = useState('ru')
  const setRuLng = () => {
    setCurrentLng('ru')
    setCurrentDictionary(lngs.ru)
  }
  const setEngLng = () => {
    setCurrentLng('eng')
    setCurrentDictionary(lngs.en)
  }


  return (
    <DictionaryContext.Provider value={{
      setRuLng,
      setEngLng,
      currentDictionary,
      currentLng
    }}>
      {children}
    </DictionaryContext.Provider>
  )
}

DictionaryProvider.propTypes = {
  children: PropTypes.node,
}

export default memo(DictionaryProvider);
