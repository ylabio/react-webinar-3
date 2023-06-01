import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from './use-selector';

/**
 * Костыль хук для проверки юзера, т.к. она повторяется в разных местах.. 
 * Если пользователь авторизован, то возвращаются его поля, токен и прочее
 * Если не авторизован и задан параметр orRedirectTo, то переходим на страницу логина или куда прописали
 */

export default function useUser(options = { orRedirectTo: '/login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const select = useSelector(state => ({
    fields: state.user.fields,
    token: state.user.token,
    waiting: state.user.waiting,
    error: state.user.error,
    misc: state.user.misc
  }));

  useEffect(() => {
    if (!select.token && options.orRedirectTo)
      navigate(options.orRedirectTo, { state: { from: location } });
  }, [select.token]); // пока мониторим только токен

  return { fields: select.fields, token: select.token, waiting: select.waiting, error: select.error, misc: select.misc };
}