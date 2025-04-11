export async function signOut(token) {
  const response = await fetch(`/api/v1/users/sign`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });
  const res = await response.json();

  if (response.ok) {
    localStorage.removeItem('user-auth');
  }
  return res;
}
