import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import { Link } from 'react-router-dom';
import Button from '../button';

/**
 * Главная страница - первичная загрузка каталога
 */
function AuthHeader({auth, userName, t, handleLogout}) {
  const cn = bem('AuthHeader');

  return (
    <div className={cn()}>

      <div className={cn('container')}>

        {auth ? (
          <SideLayout side={'end'} gap={'big'}>
            <Link to="/profile">{userName}</Link>
            <Button title={t('auth.signOut')} style="text" onClick={handleLogout}/>
          </SideLayout>
        ) : (
           <Link to="/login">
             <Button title={t('auth.signIn')} style="text"/>
           </Link>
         )}

      </div>


    </div>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(AuthHeader);
