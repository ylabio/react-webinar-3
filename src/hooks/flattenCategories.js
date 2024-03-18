function flattenCategories(categories, depth = 0) {
    let options = [];
    categories.forEach(category => {
        const prefix = depth > 0 ? '- '.repeat(depth) : '';
        options.push({
            value: category.value,
            title: prefix + category.title, 
        });
        if (category.children && category.children.length > 0) {
            const childOptions = flattenCategories(category.children, depth + 1);
            options = options.concat(childOptions);
        }
    });

    return options;
}
export default flattenCategories