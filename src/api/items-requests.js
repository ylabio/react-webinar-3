import {baseUrl} from "./index";

export const itemsRequests = {
  getAllProducts: async () => {
    const res = await fetch(`${baseUrl}`);
    return await res.json()
  },
  getProductsWithPagination: async (limit, skip = 0) => {
    const res = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);
    return await res.json()
  },
  getAllProductsWithPaginationAndProperties: async (limit, skip = 0) => {
    const res = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    return await res.json()
  },
  getProductById: async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json()
    return data.result
  },
}