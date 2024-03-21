import React from "react";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useCategoriesList from "../../hooks/use-сategories-list";

function CatalogFilter() {
  const { buildCategoryOptions } = useCategoriesList();
  const store = useStore();

  const select = useSelector((state) => ({
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    onCategory: (category) =>
      store.actions.catalog.setParams({ category, page: 1 }),
    onSort: (sort) => store.actions.catalog.setParams({ sort }),
    onSearch: (query) => store.actions.catalog.setParams({ query, page: 1 }),
    onReset: () => store.actions.catalog.resetParams(),
  };

  const options = {
    category: [
      {value: '', title: 'Все'},
      ...buildCategoryOptions
    ],
    sort: [
      { value: "order", title: "По порядку" },
      { value: "title.ru", title: "По именованию" },
      { value: "-price", title: "Сначала дорогие" },
      { value: "edition", title: "Древние" },
    ]
  };
  
  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategory}
        theme="big"
      >
      </Select>
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder="Поиск"
        delay={600}
        theme="big"
      />
      <button onClick={callbacks.onReset}>Сброс</button>
    </SideLayout>
  );
}

export default CatalogFilter;
