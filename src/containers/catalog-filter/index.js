import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { indexOf } from "lodash";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort) => store.actions.catalog.setParams({ sort }), [
      store,
    ]),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Поиск по категориям
    onCategory: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
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

  const categoriesList = {
    category: useMemo(
      () => [
        { value: "", title: "Все" },
        ...sortCategories(getCategories(select.categories)),
      ],
      [select.categories]
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={categoriesList.category}
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

const getCategories = (items) => {
  // Expensive computation
  // Imagine some heavy processing here
  return items.map((item) => ({
    value: item._id,
    title: item.title,
    parent: item.parent ? item.parent._id : "",
  }));
};

const sortCategories = (items) => {
  var sortedCat = items.filter((item) => !item.parent);
  var catList;
  var quantity;
  while (sortedCat.length < items.length) {
    for (var item of sortedCat) {
      quantity = item.title.split("-").length;
      catList = items.filter((i) => i.parent != "" && i.parent == item.value);
      if (
        catList.length > 0 &&
        sortedCat
          .map((x) => x.title)
          .indexOf("-".repeat(quantity) + catList[0].title) == -1
      ) {
        sortedCat = [
          ...sortedCat.slice(0, sortedCat.indexOf(item)),
          item,
          ...catList.map((i) => ({
            value: i.value,
            title: "-".repeat(quantity) + i.title,
            parent: i.parent,
          })),
          ...sortedCat.slice(sortedCat.indexOf(item) + 1),
        ];
        break;
      }
    }
  }
  return sortedCat;
};

export default memo(CatalogFilter);
