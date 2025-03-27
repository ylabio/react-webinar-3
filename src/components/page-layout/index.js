import React, { memo } from 'react'
import './style.css'
import {cn as bem} from '@bem-react/classname'
import PropTypes from 'prop-types'


const PageLayout = ({ children }) => {

    const cn = bem('PageLayout');
    
  return (
    <div className={cn()}>
        <div className={cn('center')}>
            {children}
        </div>
    </div>
  )
}

PageLayout.PropTypes = { 
    children: PropTypes.node
}

export default memo(PageLayout)