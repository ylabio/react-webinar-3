import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import 'style.css'

function Menu({menuItems}) {

  const cn = bem('Menu');

  return (<nav className={cn()}>
      <span> <Link to={'/'}> Главная </Link>  </span>
  </nav>)
}


export default memo(Menu)
