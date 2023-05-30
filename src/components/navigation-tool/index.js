import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function Navigation () {

    const cn = bem('Navigation');

    return(
        <div className={cn()}>
            <Link to={`/`} className={cn('link')}>Главная</Link>
        </div>
    )
}

export default memo(Navigation);