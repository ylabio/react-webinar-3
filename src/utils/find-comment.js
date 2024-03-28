export default function findComment(list, parent) {
	for (let elem of list) {
		if (elem._id == parent) return elem;
		
		if (elem?.children.length > 0) {
			let childrenElem = findComment(elem.children, parent);
			if (childrenElem) {
				return childrenElem;
			}
		}
	}

	return null;
};