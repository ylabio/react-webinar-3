import { LOCAL_USER_KEY } from '../constants';

export async function authUser(login, password) {
  const response = await fetch('/api/v1/users/sign?fields=_id,profile(name)&lang=ru', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
      remember: true,
    }),
  });
  const res = await response.json();

  if (response.ok) {
    localStorage.setItem(LOCAL_USER_KEY, res.result.token);
  }
  return res;
}
