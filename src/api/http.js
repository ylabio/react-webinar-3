import { redirect } from "react-router-dom";

 export function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
  }
  
  const token = getCookie('token')

export async function loadCategories () {
    const categories = new Map();
    const roots = [];
    const readyNodes = [];
    const response  = await fetch('/api/v1/categories?lang=ru&fields=_id,title,parent(_id,title)&limit=*');
    const json = await response.json();
    json.result.items.forEach(item => categories[item._id]= {...item, children: []});
    json.result.items.forEach((item)=>{
        const node = categories[item._id];
        if (item.parent){
            const parent = categories[item.parent._id]
            parent.children.push(node)
        }else{
            roots.push(node);
        }
    });
    const categoriesWithPrefix = (roots, level = 0) =>{
        roots.forEach(node =>{
            node.title = '-'.repeat(level) + (level > 0 ? " " : '') + node.title;
            readyNodes.push({value: node._id, title: node.title});
            if (node.children.length > 0){
                return categoriesWithPrefix(node.children, level + 1 )
            }
        })
        return readyNodes
    };
    const ready = categoriesWithPrefix(roots);
    return ready;
  }

export async function login (data) {
    const response = await fetch('api/v1/users/sign', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({login: `${data.login}`, password: `${data.password}`,})
        
        })

    const json = await response.json()
    if(json.error){
        const issues = json.error.data.issues.map(issue=> (issue.message))
        throw new Error(JSON.stringify({issues}))
    }
    return json.result.user;
}

export async function  getUser () {
    const token = getCookie('token');
    if(!token){
        return null;
    }
    const response = await fetch('api/v1/users/self?&fields=*', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'X-Token' : `${token}`
            
        },
        
    })
    const json = await response.json();
    if(json.error){
        const issues = json.error.data.issues.map(issue=> (issue.message))
        console.log(issues)
        throw new Error(JSON.stringify({issues}))
    }
    return  json.result
}

export async function deleteUser () {
    const token = getCookie('token');
    if(!token){
        console.log('fdsfsdfs')
        return 
    }
    const response = await fetch('api/v1/users/sign', {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'X-Token' : `${token}`
            
        },
        
    })
    if(!response.ok){
        throw new Error('Не удалось разлогиниться')
    }else{
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        redirect('/')
    }
}