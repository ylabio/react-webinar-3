import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/language-context';
import './style.css';

const Nav = () => {
  const cn = bem('Nav');
  const { translate } = useLanguage();

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        <li>
          <Link to="/" className={cn('link')}>
            {translate('main')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
