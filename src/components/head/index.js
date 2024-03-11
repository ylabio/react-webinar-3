import {memo, useState, useContext, useEffect} from "react";
import {LanguagesContext} from "../../lang/context";
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {
  const languages = [{name: "RU"}, {name: "EN"}];
  const [currentLang, setCurrentLang] = useState(languages[0].name);
  const {setLang} = useContext(LanguagesContext);
  
  useEffect(() => {
    setLang(currentLang);
  }, [currentLang])

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select
        value={currentLang}
        onChange={(e) => setCurrentLang(e.currentTarget.value)}
      >
        {languages.map((item, index) => {
          return <option key={index} value={item.name}>{item.name}</option>
        })}
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
