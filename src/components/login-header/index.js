import { memo } from "react"
import './style.css'

function LoginHeader({title}){
  return <h1 className="LoginHeader">{title}</h1>
}

export default memo(LoginHeader)