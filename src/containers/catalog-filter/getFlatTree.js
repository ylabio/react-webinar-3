

function buildTree(arr, id,newEl) {
    for(let i = 0;i < arr.length;i++){
        let el = arr[i];
        if(el._id == id){
            el.children = el.children ? [...el.children,newEl] : [newEl]
            break
        }
        else if(el.children){
            return buildTree(el.children,id,newEl)
        }
    }
    return null;
}

function buildFlattTree(node, depth = 0,delimeter) {
    const result = [{ title : `${delimeter.repeat(depth)}${node.title}`,value: node._id }];
    console.log(result)
    if (node.children) {
        node.children.forEach(child => {
            result.push(...buildFlattTree(child, depth + 1,delimeter));
        });
    }
    return result;
}

function getFlatTree(data,delimeter) {
    const  newData =  data.map(el => {
        if(el.parent){
            buildTree(data, el.parent._id,el)
            return undefined
        }
        return el
    }).filter(el => el !== undefined);
    const res = []
    newData.forEach(el => res.push(...buildFlattTree(el,0,delimeter)));
    res.unshift({title : "Все", value : ""})
    return res
}

export default getFlatTree