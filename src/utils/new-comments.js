export default function newComments(list, update) {
    let arr = [];

    for (let elem of list){
        if (elem._id == update._id){
            arr.push(update);
        }

        else if (elem?.children.length > 0){
            arr.push({...elem, children: newComments(elem.children, update)});
        }

        else {
            arr.push(elem);
        }

    }
    return arr;

};
