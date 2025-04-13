export async function getUserData(token) {

  const response = await fetch('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-token': token,
    },
  });
  return await response.json();
}
