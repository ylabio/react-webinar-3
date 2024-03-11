import {memo} from 'react';
import {NavLink} from "react-router-dom";
import useSelector from '../../store/use-selector';
import './style.css';

function NavMain() {
  const currentPage = useSelector((state) => state.catalog.pages.currentPage);

  return (
      <NavLink className="Nav-main" to={`/${currentPage}`}>{'Главная'}</NavLink>
  )
}

export default memo(NavMain);