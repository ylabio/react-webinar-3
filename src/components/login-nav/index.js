import { memo } from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import './style.css';

function LoginNav(props) {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
    name: state.login.loginData.loginName,
    })
  )

  const cn = bem('LoginNav');
  return (
    <SideLayout side='end' padding='medium'>
      <div className={cn()}>
        {select.isLogin && <Link to={'/profile'}>{select.name}</Link>}
        <button onClick={props.onClick}>{select.isLogin ? t('login.exit') : t('login.enter')}</button>
      </div>
    </SideLayout>
  )
}

export default memo(LoginNav);