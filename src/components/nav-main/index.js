import {memo} from 'react';
import {NavLink} from "react-router-dom";
import useSelector from '../../store/use-selector';
import './style.css';
import { useTranslate } from '../../hooks/useTranslate';

function NavMain() {
  const currentPage = useSelector((state) => state.catalog.pages.currentPage);
  const tr = useTranslate()

  return (
      <NavLink className="Nav-main" to={`/${currentPage}`}>{tr('Home')}</NavLink>
  )
}

export default memo(NavMain);