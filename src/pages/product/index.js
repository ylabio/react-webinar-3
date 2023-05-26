import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from "prop-types";
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import { numberFormat } from '../../utils'
import './style.css'

function Product(props) {
  const { id } = useParams()
  const store = useStore()

  const select = useSelector((state) => ({
    product: state.catalog.product,
  }))

  const callbacks = {
    onAdd: (e) => props.onAdd(id)
  }

  useEffect(() => {
    store.actions.catalog.getProduct(id)
  }, [])

  return (
    <div className="Product">
      <p>{select.product?.description}</p>
      <p>Страна производитель: <b>Россия (RU)</b></p>
      <p>Категория: <b>{select.product?.category.title}</b></p>
      <p>Год выпуска: <b>{select.product?.dateCreate}</b></p>
      <h2>Цена: {numberFormat(select.product?.price)} ₽</h2>
      <button className="Product-button" onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

Product.propTypes = {
     onAdd: PropTypes.func,
  };
  
  Product.defaultProps = {
    onAdd: () => {},
  }

export default memo(Product)
