export  const  api={
    getAddPriceApi: async function (id){
    const response = await fetch(`api/v1/articles/${id}?fields=price,title`);
    const json = await response.json();
    return json;
  },
  getProductPriceApi: async function (id){
    const response = await fetch(`api/v1/articles/${id}`);
    const json = await response.json();
    return json;
  },
  
}