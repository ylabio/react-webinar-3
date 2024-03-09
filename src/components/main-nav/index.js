import {memo, useContext} from 'react';
import {NavLink} from "react-router-dom";
import useSelector from '../../store/use-selector';
import {LanguageContext} from "../../contexts";
import './style.css';


function MainNav() {
  const tralslate = useContext(LanguageContext);
  const currentPage = useSelector((state) => state.catalog.pagination.current);

  return (
    <ul className="Main-nav">
      <NavLink to={'/' + currentPage}>{tralslate('Главная')}</NavLink>
    </ul>
  )
}

export default memo(MainNav);