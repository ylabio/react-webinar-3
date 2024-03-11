import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import Language from "../language";

function Head({ title, setLang, selectedLang }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Head-languages">
        <Language lang={'ru'} selectedLang={selectedLang} setLang={setLang} />
        <Language lang={'en'} selectedLang={selectedLang} setLang={setLang} />
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
