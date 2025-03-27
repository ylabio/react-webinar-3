import React, { memo } from 'react'
import './style.css'

const Head = ({ title, className }) => {
  return (
    <div className='Head'>
        <h1>{title}</h1>
    </div>
  )
}

export default memo(Head)