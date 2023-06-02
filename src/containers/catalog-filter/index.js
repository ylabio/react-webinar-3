import { memo, useCallback, useMemo } from "react";
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
    category: state.catalog.params.category,
    categories: state.catalog.categories,
    page: state.catalog.params.page,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    onSortCategory: useCallback(
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
    category: useMemo(
      () => sortedCategories(select.categories),
      [select.categories]
    ),
  };

  function sortedCategories(array) {
    let values = [
      {
        title: "Все",
        value: "",
      },
    ];
    // нашел всех родителей
    const parents = array.reduce((acc, category) => {
      if (!category.parent) {
        return [...acc, category._id];
      }
      if (acc.includes(category.parent._id)) {
        return acc;
      }
      return [...acc, category.parent._id];
    }, []);
    const children = array.reduce((acc, category) => {
      if (category.parent) {
        return [...acc, category._id];
      }
      if (!category.parent) {
        return acc;
      }
      return [...acc, category._id];
    }, []);
    console.log(children);
    console.log(parents);
    //перебор родителей в массиве
    parents.map((parent) => {
      const parentItem = array.find((item) => item._id === parent);
      values.push({ title: parentItem.title, value: parentItem._id });
      array.map((item) => {
        if (!item.parent) {
          return;
        }
        if (parents.find((p) => p === item._id)) {
          array.map((i) => {
            if (!i.parent) {
              return;
            }
            if (i.parent._id === item._id) {
              values.push({ title: `-- ${item.title}`, value: item._id });
            }
          });
        }
        if (item.parent._id === parent) {
          values.push({ title: `- ${item.title}`, value: item._id });
        }
      });
    });
    return values;
  }

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onSortCategory}
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
