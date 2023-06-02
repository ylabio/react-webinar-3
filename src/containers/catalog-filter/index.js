import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    category: state.catalog.params.category,
  }));
  // Стейт для Select
  const [categoryOptions, setCategoryOptions] = useState([]);

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Категории
    onCategory: useCallback(
      (category) => {
        store.actions.catalog.setParams({ category, page: 1 });
      },
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

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
  };

  useEffect(() => {
    // Превращение категорий из АПИ в форматированный вид с дефисами
    if (select.categories) {
      const children = select.categories.filter((item) => {
        if (item.parent) return item;
      });
      const readyArr = [];
      select.categories.map((parent) => {
        const arr = [];
        children.forEach((child) => {
          if (parent._id === child.parent._id) arr.push(parent, child);
        });
        const set = new Set(arr);
        const uniqueArr = Array.from(set);

        const parentChild = uniqueArr.map((item, index) => {
          if (index === 0 && item.parent === null) {
            return {
              value: item._id,
              title: item.title,
            };
          } else if (index === 0 && item.parent) {
            return {
              value: item._id,
              title: `- ${item.title}`,
            };
          } else if (uniqueArr[0].parent === null && index !== 0) {
            return {
              value: item._id,
              title: `- ${item.title}`,
            };
          } else {
            return {
              value: item._id,
              title: `- - ${item.title}`,
            };
          }
        });
        if (parentChild.length !== 0) {
          readyArr.push(...parentChild);
        }
      });

      readyArr.splice(4, 1);
      setCategoryOptions([{ value: "", title: "Все" }, ...readyArr]);
    }
  }, [select.categories]);

  const { t } = useTranslate();
  return (
    <SideLayout padding="medium">
      <Select
        options={categoryOptions}
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
