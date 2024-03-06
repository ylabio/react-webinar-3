
import React from 'react'
import {cn as bem} from "@bem-react/classname"
import { formatPrice } from '../../utils'
import { PropTypes } from 'prop-types'
import "./style.css"
function ModalFooter(props) {
const cn = bem(props.className)

  return (
    <div className={cn("footer")}>
            <span><b>Итого</b></span>
            <span><b>{`${formatPrice(props.totalCost)} ₽`}</b></span>
    </div>
  )
}

ModalFooter.propTypes = {
    className : PropTypes.string.isRequired,
    totalCost : PropTypes.number.isRequired
}

export default ModalFooter