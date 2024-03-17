
import { useMemo } from 'react';

function buildCategoryTree(categories) {
    const categoryMap = new Map(); 
    categories.forEach(category => {
        categoryMap.set(category.value, { ...category, children: [] });
    });
    const tree = []; 
    categoryMap.forEach(category => {
        if (category.parent) {
            const parentCategory = categoryMap.get(category.parent);
            if (parentCategory) {
                parentCategory.children.push(category); 
            }
        } else {
            tree.push(category); 
        }
    });
    return tree; 
}






export default buildCategoryTree