import {memo} from 'react';
import {NavLink} from "react-router-dom";
import './style.css';
import useSelector from '../../store/use-selector';


function MainNav() {
  const currentPage = useSelector((state) => state.catalog.pagination.current)
  return (
    <ul className="Main-nav">
      <NavLink to={'/' + currentPage}>Главная</NavLink>
      <NavLink to='/product/1'>11111</NavLink>
      <NavLink to='/product/2'>22222</NavLink>
    </ul>
  )
}

export default memo(MainNav);