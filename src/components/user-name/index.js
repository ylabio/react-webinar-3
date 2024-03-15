import { Link } from "react-router-dom";
import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import "./style.css"

function UserName({ name, link }) {

  const cn = bem('UserName');

  return (
    <Link className={cn('')} to={link}>{name}</Link>
  )
}

UserName.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string
}

UserName.defaultProps = {}

export default memo(UserName);