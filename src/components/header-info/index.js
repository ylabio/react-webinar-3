import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';

function HeaderInfo(props) {
  return (
    <div className="HeaderInfo">
      <Link to={props.link}>{props.user_name}</Link>
      <Button text_btn={props.text_btn} onClick={props.onClick} />
    </div>
  )
}

HeaderInfo.propTypes = {
  user_name: PropTypes.string,
  text_btn: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
}

HeaderInfo.defaultProps = {
  onClick: () => {},
}

export default memo(HeaderInfo);