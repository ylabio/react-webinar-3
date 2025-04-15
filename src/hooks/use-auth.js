import useSelector from './use-selector';

export default function useAuth() {

  const select = useSelector(state => ({
    user: state.user.data,
    token: state.user.token,
    waitingAuth: state.user.waitingAuth,
  }));

  const auth = Boolean(select.token && select.user);
  const waiting = select.waitingAuth;
  const user = select.user;

  return { auth, user, waiting };
}
