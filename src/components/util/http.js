 export async function loadAll() {
    const response = await fetch(`/api/v1/articles?limit=*`);
    if(!response.ok){
        throw new Error('An error occurred while fetching items')
    }
    const json = await response.json();
    return  json.result.items;
  }
