import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserBlock from "../../components/user-block";
import {useNavigate} from "react-router-dom";

function TopControls({logoutLink}) {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
  }));

  const navigate = useNavigate();
  const callbacks = {
    onLogIn: useCallback(() => navigate('/login'), []),
    onLogOut: useCallback(() => {
      store.actions.user.logOut();
      navigate(logoutLink);
    } , [store]),
  }
  const {t} = useTranslate();

  const userCallback = select.user
    ? callbacks.onLogOut
    : callbacks.onLogIn;

  const userBtnLabel = select.user
    ? t('user.logout')
    : t('user.login');

  const sideLayoutStyle = {
    borderBottom: '1px solid #CCCCCC',
  }

  return (
    <SideLayout side='end' padding='small' style={sideLayoutStyle}>
      <UserBlock onClick={userCallback}
                    user={select.user}
                    btnLabel={userBtnLabel}
                    link='/profile'
      />
    </SideLayout>
  );
}

TopControls.defaultProps = {
  logoutLink: '/',
}

export default memo(TopControls);
