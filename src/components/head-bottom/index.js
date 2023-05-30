import React, {memo} from 'react'
import NavMenu from '../nav-menu/index.js'
import BasketTool from '../basket-tool/index.js'
import './style.css'

function HeadBottom(props){
  return(
    <div className='Head-bottom'>
      <NavMenu/>
      <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
    </div>
  )
}

export default memo(HeadBottom)