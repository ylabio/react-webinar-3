import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangSelect from "../lang-select";

function Head({title}) {
  return (
    <div className='Head'>
      <h1 className='Head-title'>{title}</h1>
      <LangSelect />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
