 export async function loadAll() {
    const response = await fetch(`/api/v1/articles?limit=*`);
    if(!response.ok){
        throw new Error('An error occurred while fetching items')
    }
    const json = await response.json();
    return  json.result.items;
  }


  export async function loadItem(id) {
    const response = await fetch(`/api/v1/articles/`+ id);
    if(!response.ok){
        throw new Response(JSON.stringify({message: 'Could not fetch item detail', }))
    }else{
        const json = await response.json();
        return json.result;
    }
  }