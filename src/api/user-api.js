export async function getUserData(token, id) {
  const response = await fetch(`/api/v1/users/${id}?fields=_id,email,profile(name,phone)`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });
  return await response.json();
}
