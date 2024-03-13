import {memo} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';
import { useTranslate } from '../../hooks/useTranslate';

function NavMain(props) {
  const tr = useTranslate()

  return (
      <NavLink className="Nav-main" to={props.link}>{tr('Home')}</NavLink>
  )
}

NavMain.propTypes = {
  link: PropTypes.string,
}

export default memo(NavMain);