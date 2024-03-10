import {memo} from "react";
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
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
