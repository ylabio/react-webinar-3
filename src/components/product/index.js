import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import PageLayout from '../page-layout'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Product() {
  const cn = bem('Product')

  const store = useStore()

  const { id } = useParams()

  const select = useSelector((state) => ({
    product: state.product.item,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    lang: state.language.lang,
  }))

  useEffect(() => {
    store.actions.modals.close()
    store.actions.catalog.loadPage(select.limit, select.currentPage)
  })

  useEffect(() => {
    store.actions.product.loadProduct(id)
  }, [id])

  const callbacks = {
    // Добавление в корзину
    addToBasket: (_id) => {
      store.actions.basket.addToBasket(_id)
    },
  }

  if (!select.product) return
  return (
    <PageLayout head={select.product.title}>
      <div className={cn()}>
        <div className={cn('description')}>{select.product.description}</div>
        <div className={cn('madeIn')}>
          <span>
            {select.lang === 'ru' ? 'Страна производитель:' : 'Made in:'}
          </span>
          <span className={cn('value')}>
            {` ${select.product.madeIn.title} (${select.product.madeIn.code})`}
          </span>
        </div>
        <div className={cn('category')}>
          <span>{select.lang === 'ru' ? ' Категория:' : 'Category:'}</span>
          <span
            className={cn('value')}
          >{` ${select.product.category.title}`}</span>
        </div>
        <div className={cn('edition')}>
          <span>
            {select.lang === 'ru' ? 'Год выпуска:' : 'Year of manufacture:'}
          </span>
          <span className={cn('value')}>{` ${select.product.edition}`}</span>
        </div>
        <div className={cn('price')}>
          <span>{select.lang === 'ru' ? 'Цена: ' : 'Price: '}</span>
          <span className={cn('value')}>
            {select.product.price} {select.lang === 'ru' ? '₽' : '$'}
          </span>
        </div>
        <button className={cn('btn')} onClick={() => callbacks.addToBasket(id)}>
          {select.lang === 'ru' ? 'Добавить' : 'Add'}
        </button>
      </div>
    </PageLayout>
  )
}

export default Product
