import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

export function NavBar({links}){

  const cn = bem('NavBar');

  return (
    <div className={cn()}>
      {
        links.map((e, i) => {
          return <Link className={cn('link')} key={i} to={e.link}>{e.title}</Link>
        })
      }
    </div>
  )
}