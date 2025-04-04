export const fetchData = async (url, signal) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error(`status: ${response.status}, text: ${response.statusText}`);
    error.status = response.status;
    console.log(`status: ${response.status}, text: ${response.statusText}`);
    throw error;
  }

  return await response.json();
};
