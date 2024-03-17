import { memo, useCallback, useMemo, useState, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const [itemsCategory, setItemsCategory] = useState([]);

  const select = useSelector((state) => ({
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка по категориям
    onCategory: useCallback(
      (category) => store.actions.catalog.setParams({ category }),
      [store]
    ),
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = useMemo(
    () => ({
      sort: [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      category: itemsCategory,
    }),
    [itemsCategory]
  );

  const CategoryOptions = (categories, parentId = null, depth = 0) => {
    const result = [];

    if (!parentId) {
      result.push({ value: "all", title: "Все категории" });
    }

    categories.forEach((category) => {
      const { _id, title, parent } = category;

      if (parent && parent._id === parentId) {
        const prefix = "-".repeat(depth);
        const titleName = `${prefix} ${title}`;
        result.push({ value: _id, title: titleName });

        const children = CategoryOptions(categories, _id, depth + 1);
        result.push(...children);
      } else if (!parent && !parentId) {
        const prefix = "-".repeat(depth);
        const titleName = `${prefix} ${title}`;
        result.push({ value: _id, title: titleName });

        const children = CategoryOptions(categories, _id, depth + 1);
        result.push(...children);
      }
    });

    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
        );
        const data = await response.json();
        const categories = CategoryOptions(data.result.items);
        setItemsCategory(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const { t } = useTranslate();

  // console.log("itemCategory", itemCategory);
  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
