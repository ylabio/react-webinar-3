import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function Navigation () {
    const cn = bem('Navigation');
    return (
        <>
            <nav className={cn()}>
                <ul>
                    <Link to='/' className={cn('home')}><li>Главная</li></Link>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;