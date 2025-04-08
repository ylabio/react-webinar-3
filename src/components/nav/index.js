import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Nav({ title }) {
  const cn = bem('Nav');

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        <li>
          <Link to="/" className={cn('link')}>
            {title}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
