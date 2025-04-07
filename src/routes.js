export const ROUTES = {
  main: '/',
  product: (id) => `/product/${id}`,
}

export const ROUTES_API = {
  base: '/api/v1/articles',
  page: (limit, skip) => `/api/v1/articles?limit=${limit}&skip=${skip}`,
  product: (id) => `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
}