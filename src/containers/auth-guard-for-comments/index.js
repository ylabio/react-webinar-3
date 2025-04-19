import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import AuthPrompt from '../../components/auth-prompt';
import useTranslate from '../../hooks/use-translate';

function AuthGuardForComments({ children, onLoginRedirect }) {
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  if (!select.exists) {
    return <AuthPrompt onLoginRedirect={onLoginRedirect} t={t}/> 
  }

  return children;
}

export default memo(AuthGuardForComments);
