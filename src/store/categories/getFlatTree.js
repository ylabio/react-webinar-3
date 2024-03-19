
function buildTree(arr, id,newEl) {
    const len = arr.length;
    for(let i = 0;i < len;i++){
        let el = arr[i];
        if(el._id == id){
            el.children = el.children ? [...el.children,newEl] : [newEl]
            return true
        }
        else if(el.children){
            if(buildTree(el.children,id,newEl))
            return true
        }
    }
    return false;
}

function buildFlattTree(node, depth = 0,delimeter) {
    const result = [{ title : `${delimeter.repeat(depth)}${node.title}`,value: node._id }];
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
            if(!buildTree(data, el.parent._id,el)) return el
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