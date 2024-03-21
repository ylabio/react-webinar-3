import { useState, useEffect, useMemo } from 'react';

const useCategoriesList = () => {
    const [categories, setCategories] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
                const json = await response.json();
                setCategories(json.result.items);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const toggleCategorySelection = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const buildCategoryOptions = useMemo(() => {
        const flattenCategories = (categories, level = 0, parentTitle = '') => {
            let options = [];
            categories.forEach((category, index) => {
                const prefix = "-".repeat(level);
                const title = `${prefix} ${category.title}`;
                options.push({ value: category._id, title: title });
                if (category.children && category.children.length > 0) {
                    options.push(...flattenCategories(category.children, level + 1, title));
                }
                // Add separator between categories except for the last category
                if (index < categories.length - 1) {
                    options.push({ value: `separator-${category._id}`, title: '-', disabled: true });
                }
            });
            return options;
        };

        if (!categories) {
            return [];
        }

        const allCategoriesOption = { value: 'all', title: 'Все'  };
        const categoryOptions = flattenCategories(categories);

        // Filter categories based on selectedCategories
        const filteredCategoryOptions = categoryOptions.filter(category => {
            if (selectedCategories.length === 0 || selectedCategories.includes(category.value)) {
                return true;
            }
            return false;
        });

        return [allCategoriesOption, ...filteredCategoryOptions];
    }, [categories, selectedCategories]);

    return { categories, buildCategoryOptions, toggleCategorySelection, selectedCategories };
};

export default useCategoriesList;