export  const  api={
    getProductPriceApi: async function (id){
    const response = await fetch(`api/v1/articles/${id}?fields=price,title`);
    const json = await response.json();
    return json;
  },
  
}