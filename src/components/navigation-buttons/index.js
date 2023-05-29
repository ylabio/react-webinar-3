import {memo} from "react";
import PropTypes from "prop-types";
import {translateWord} from "../../utils";
import {Link} from "react-router-dom";
import './style.css';

function NavigationButtons({selectedLanguage}){

  return (
    <div className='NavigationButtons'>
      <Link to="/">{translateWord("Главная", selectedLanguage)}</Link>
    </div>
  )
}

NavigationButtons.propTypes = {
  selectedLanguage: PropTypes.string,
};

NavigationButtons.defaultProps = {
  selectedLanguage: "ru-RU",
};

export default memo(NavigationButtons);
