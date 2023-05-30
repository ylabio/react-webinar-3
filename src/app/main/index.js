import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../../components/products'
import Product from '../../components/product'

function Main() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='products/:id' element={<Product />} />
    </Routes>
  )
}

export default memo(Main)
