<<<<<<< HEAD
import {memo, useContext} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageSwitcher from "../language-switcher";
import {useLanguage} from "../../language-provider";

function Head({title}) {
  const { t } = useLanguage()
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageSwitcher/>
=======
import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
