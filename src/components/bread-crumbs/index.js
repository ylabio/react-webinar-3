import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BreadCrumbs(props) {

  const cn = bem('BreadCrumbs');

  return (
    <ul  className={cn()}>
      {props.crumbs.map(item => {
        return (
          <li className={cn('li')} key={item.title}>
            <Link to={ item.link }>{ props.language }</Link>
          </li>
        )})}
    </ul>)
}

BreadCrumbs.propTypes = {
  crumbs: PropTypes.arrayOf( PropTypes.shape( {
    link: PropTypes.string,
    title: PropTypes.string,
  })),
  language: PropTypes.string
}

BreadCrumbs.defaultProps = {
  crumbs: []
}

export default memo(BreadCrumbs);