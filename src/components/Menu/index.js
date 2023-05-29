import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useTranslation from '../../hooks/use-translation';

function Menu() {
  const cn = bem('Menu');
  const { t } = useTranslation();
  return (
    <Link to="/" className={cn('link')}>
      {t('main')}
    </Link>
  );
}

export default Menu;
