import { Link } from "react-router-dom"
import { useTranslate } from "../../translate"
const Menu=(props)=>{
    const {translate}=useTranslate()
    return <Link  to={props.url}>{translate('home')}</Link>
}

export default Menu;