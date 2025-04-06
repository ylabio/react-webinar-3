const BASE_URL = 'api/v1';

const request = async (endpoint, options) => {
  const url = `${BASE_URL}/${endpoint}`;
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...options?.headers,
    },
  };
  return checkResponse(await fetch(url, params));
};

const checkResponse = res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

export const getProductDetails = async ({ params }) => {
  const searchParams = new URLSearchParams({
    fields: '*,madeIn(title,code),category(title)',
  });

  return await request(`articles/${params.id}?${searchParams.toString()}`);
};

const defaultFields = `items(_id,title,price),count`;

export const getCatalog = async ({
  limit = 10,
  skip = 0,
  fields = defaultFields,
  language = 'ru',
}) => {
  const searchParams = new URLSearchParams({
    fields,
    limit,
    skip,
    lang: language,
  });
  return await request(`articles?${searchParams.toString()}`);
};
