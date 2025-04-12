import React from 'react'
import 'style.css'
import { memo } from 'react'

const Header = ({children}) => {
  return (
    <div className='Header'><div className='Header-container'>{children}</div></div>
  )
}

export default memo(Header)