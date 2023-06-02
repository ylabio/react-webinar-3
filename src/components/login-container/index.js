import { memo } from "react"
import PropTypes from "prop-types";
import './style.css'

function LoginContainer({children}){
  return <div className="LoginContainer">{children}</div>
}

LoginContainer.propTypes = {
  children: PropTypes.node
  
}



export default memo(LoginContainer)