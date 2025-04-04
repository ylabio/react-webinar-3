import { memo } from 'react';
import './style.css';
import { NavLink } from 'react-router';
import { useLanguage } from '../../i18n';

function NavBar() {
  const { translate } = useLanguage();

  return (
    <nav className={'NavBar'}>
      <NavLink to="/">{translate('navMain')}</NavLink>
    </nav>
  );
}

export default memo(NavBar);
