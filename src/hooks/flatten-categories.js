function flattenCategories(categories, depth = 0, result = []) {
    categories.forEach(category => {
        const prefix = depth > 0 ? '- '.repeat(depth) : '';
        result.push({
            value: category.value,
            title: prefix + category.title,
        });
        if (category.children && category.children.length > 0) {
            flattenCategories(category.children, depth + 1, result);
        }
    });
    return result;
}

export default flattenCategories;