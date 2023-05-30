import { memo, useCallback, useEffect } from 'react'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import PageLayout from '../page-layout'
import List from '../../components/list'
import Item from '../../components/item'
import Pagination from '../../components/pagination'

function Products() {
  const store = useStore()

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    lang: state.language.lang,
    count: state.catalog.count,
  }))

  useEffect(() => {
    store.actions.catalog.loadCount()
  }, [])

  useEffect(() => {
    store.actions.catalog.loadPage(select.limit, select.currentPage)
  }, [select.currentPage])

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onChangePage: useCallback(
      (numPage) => store.actions.catalog.onChangePage(numPage),
      [select.currentPage]
    ),
  }

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />
      },
      [callbacks.addToBasket]
    ),
  }

  return (
    <PageLayout head={select.lang === 'ru' ? 'Магазин' : 'Shop'}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        length={select.count} // Забил жестко, т.к. по API приходит только 10
        limit={select.limit}
        currentPage={select.currentPage}
        onChangePage={callbacks.onChangePage}
      />
    </PageLayout>
  )
}

export default memo(Products)
