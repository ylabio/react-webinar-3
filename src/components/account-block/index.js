import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link, useNavigate } from 'react-router-dom'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'

function AccountBlock() {
  const navigate = useNavigate()
  const store = useStore()
  const select = useSelector(state => ({
    user: state.users.data
  }));
  const login = () => {
    navigate('/login')
  }

  const logout = () => {
    store.actions.users.logout();
  }

  const {t} = useTranslate();

  if (select.user?.profile?.name) {
    return (
      <div className='AccountBlock'>
        <Link to={'/profile'}>{select.user?.profile?.name}</Link>
        <button onClick={logout}>{t('account.logout')}</button>
      </div>
    )
  }

  return (
    <div className='AccountBlock'>
      <button onClick={login}>{t('account.login')}</button>
    </div>
  )
}

AccountBlock.propTypes = {
  title: PropTypes.node,
};

export default memo(AccountBlock);
