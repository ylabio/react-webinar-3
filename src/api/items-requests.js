import {baseUrl} from "./index";

export const itemsRequests = {
  getAllProducts: async () => {
    const res = await fetch(`${baseUrl}`);
    return await res.json()
  },
  getAllProductsWithPagination: async (limit, skip = 0) => {
    const res = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);
    return await res.json()
  },
  getProductById: async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json()
    return data.result
  },
}