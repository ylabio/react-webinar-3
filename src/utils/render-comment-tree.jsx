
const NESTED_LIMIT = 5

export default (tree, Component, returnProps) => {

	const render = (item, deep) => {
		const isNested = deep < NESTED_LIMIT
		const props = returnProps(item)
		return <Component key={item._id} {...props} isNested={isNested}>{item.children.map((el) => render(el, deep + 1))}</Component>
	}
	return tree.map((el) => render(el, 0))
}
