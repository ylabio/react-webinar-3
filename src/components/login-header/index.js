import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';
import "./style.css"

function LoginHeader({isLogin = false, logout = ()=>{}, userName}){
    const cn = bem('LoginHeader')
    if(isLogin){
        return(
            <div className={cn()}>
            <div className={cn('container')}>
            <Link  to={'/profile'}><span>{userName}</span></Link>
            <Link onClick={logout} to={'/'}>Выход</Link>
            </div>
        </div>
        )
    }
    return (
        <div className={cn()}>
            <div className={cn('container')}>
            <Link to={'/login'}>Вход</Link>
            </div>
        </div>
    )
}
LoginHeader.propTypes = {
  userName: PropTypes.string,
  isLogin: PropTypes.bool,
  logout: PropTypes.func,
};
export default memo(LoginHeader)