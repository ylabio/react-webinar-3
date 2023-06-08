
export default (tree, Component, returnProps) => {

	const render = (item, nested) => {
		const props = returnProps(item)
		if (item.children.length === 0) return <Component {...props} isNested={nested} />;
		return <Component {...props} isNested={nested}>{item.children.map((el) => render(el, true))}</Component>
	}
	return tree.map((el) => render(el))
}
