import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { useNavigate } from "react-router-dom";
import LoginTool from "../../components/login-tool";
import useSelector from "../../hooks/use-selector";
import ProfileTool from "../../components/profile-tool";

function Login() {
  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting
  }));

  const callbacks = {
    // Переход на страницу входа
    openLoginPage: useCallback(() => navigate('/login'), [store]),
    // Переход на страницу пользователя
    openProfile: useCallback(() => navigate('/progile'), [store]),
    // Выход из под пользователя
    onSignOut: useCallback(() => store.actions.user.signOut(), [store]),
  }

  // Функция для локализации текстов
  const { t } = useTranslate();

  if (select.user && Object.keys(select.user).length !== 0) {
    return (
      <SideLayout side='end'>
        <ProfileTool username={select.user.profile.name} openProfile={callbacks.openProfile} />
        <LoginTool login={callbacks.onSignOut} title={t('login.sign-out')} />
      </SideLayout>
    )
  }

  return (
    <SideLayout side='end'>
      <LoginTool login={callbacks.openLoginPage} title={t('login.log-in')} />
    </SideLayout>
  );
}

export default memo(Login);
