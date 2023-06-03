import { memo, useCallback, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useInit from "../../hooks/use-init";

function CatalogFilter() {
  const store = useStore();
  const { t } = useTranslate();
  const [categories, setCategories] = useState([]);

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    onCategory: useCallback(
      (category) => {
        store.actions.catalog.setParams({ category });
      },
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

  useInit(() => {
    let result = [{ _id: "", value: "", title: "Все", parent: null }];

    function sortCategory(arr) {
      let child = [];

      for (let item of arr) {
        if (!item.parent) {
          item.value = item._id;
          result.push(item);
        } else {
          child.push(item);
        }
      }

      for (let item of child) {
        if (
          result.find((el) => el._id === item.parent._id && el.parent === null)
        ) {
          item.title = "- " + item.title;
          item.value = item._id;
          let it = result.indexOf(
            result.find(
              (el) => el._id === item.parent._id && el.parent === null
            )
          );
          result.splice(it + 1, 0, item);
        } else if (
          result.find((el) => el._id === item.parent._id && el.parent !== null)
        ) {
          item.title = "- - " + item.title;
          item.value = item._id;
          let it = result.indexOf(
            result.find(
              (el) => el._id === item.parent._id && el.parent !== null
            )
          );
          result.splice(it + 1, 0, item);
        }
      }
    }
    sortCategory(select.categories);
    setCategories(result);
  }, [select.categories]);

  return (
    <SideLayout padding="medium">
      <Select
        options={categories}
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
        theme={"big"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
