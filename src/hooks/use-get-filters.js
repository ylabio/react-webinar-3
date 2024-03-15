import {useState, useEffect} from 'react';

export default function useGetFilters() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
  
      setData((await response.json()).result.items);
    }

    fetchData();
  }, [])

  function transform(data = [], parentId = null, depth = 0) {
    const result = [];

    for (const item of data) {
      if ((parentId === null && item.parent === null) || (item.parent && item.parent._id === parentId)) {
        const title = "- ".repeat(depth) + item.title;
        result.push({ value: item._id, title });
        const children = transform(data, item._id, depth + 1);
        result.push(...children);
      }
    }

    return result;
  }

  return transform(data);
}
