import { memo } from 'react';
import Head from '../../components/head';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';

function HeadContainer({ title, children }) {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    token: state.user.token,
    login: state.user.token ? state.profile.data?.login : null,
    profile: state.profile.data
  }));

  const handleSignOut = async () => {
    await store.actions.user.signOut();
    navigate('/');
  };

  return (
    <Head 
      title={title}
      children={children}
      username={select.profile?.profile?.name || select.profile?.login}
      isAuth={!!select.token}
      onLogout={handleSignOut}
      t={t}
    />
  );
}

export default memo(HeadContainer);