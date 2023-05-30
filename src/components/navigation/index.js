import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";

function Navigation () {
  const cn = bem('Navigation');
    
    return(
        <div className={cn()}>
            <Link to={"/"}>Главная</Link>
        </div>    
    )
}

export default Navigation;
