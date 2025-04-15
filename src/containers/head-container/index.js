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
    user: state.user.data,
    token: state.user.token
  }));

  const handleSignOut = async () => {
    await store.actions.user.signOut();
    navigate('/');
  };

  return (
    <Head 
      title={title}
      children={children}
      username={select.user?.profile?.name || select.user?.login}
      isAuth={!!select.token}
      onLogout={handleSignOut}
      t={t}
    />
  );
}

export default memo(HeadContainer);