import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LanguageSwitch from "../language-switch";
import {cn as bem} from "@bem-react/classname";

function Head({title}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <LanguageSwitch/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
