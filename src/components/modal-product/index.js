import './style.css'
import {cn as bem} from '@bem-react/classname';
const ModalProduct=({children})=>{
    const cn = bem('ModalProduct');
    return (<div className={cn()}>
    {children}
    </div>)
}

export default ModalProduct;