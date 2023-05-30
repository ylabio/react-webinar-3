import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import './style.css';
import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';


function Menu(props){
  const cn = bem('Nav');
  return <nav className={cn()}>
    {props.links.map(link => 
    <NavLink key = {link.link} to={link.link} className={cn("link")}>
      {link.title}
    </NavLink>)}
  </nav>
}
Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string
  })),
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  links: [],
};

export default memo(Menu)
