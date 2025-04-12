import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [{ value: '', title: 'Все' }],
    };
  }

  async initCategories(){
    try{const categories = await loadCategories();
        this.setState({
            ...this.getState(),
            categories:[...this.initState().categories, ...categories]
        })        
    }catch(error){
        console.error(error)
        this.setState(...this.initState())
    }

  }
}
 async function loadCategories () {
    const response  = await fetch('/api/v1/categories?lang=ru&fields=_id,title,parent(_id,title)&limit=*');
    const {items} = (await response.json()).result;
    const [_, roots] = items.reduce(([cats, roots], item) => {
        const node = { ...item, children: [] };
        cats[item._id] = node;

        if (item.parent && cats[item.parent._id]) {
            cats[item.parent._id].children.push(node);
        } else {
            roots.push(node);
        }
        
        return [cats, roots];
    }, [{}, []]);
    
    const result = [];
    const stack = [];

    for (let i = roots.length -1; i >= 0 ; i--){
        stack.push({node: roots[i],level:0})
    }
    
    while (stack.length) {
        const { node, level } = stack.pop();

    result.push({
        value: node._id,
        title: `${'- '.repeat(level)}${node.title}`
    });

    for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], level: level + 1 });
    }
    }
    return result;
  }
export default CategoriesState;
