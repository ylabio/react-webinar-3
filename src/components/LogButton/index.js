import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import SideLayout from "../side-layout";
import "./style.css";

function LogButton ({title, info, onClick}) {
    const cn = bem('LogButton');  
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/profile");
    }
    return (
        <div className={cn()}>
             <SideLayout side="end">
                <div className={cn("wrapper")}>
                    {info? <div className={cn("info")} onClick={handleNavigate} >{info}</div> : null}
                    <button className={cn("button")} onClick={onClick}>{title}</button>
                </div>
            </SideLayout>    
        </div>
       
    )
}

LogButton.proptypes = {
    title: PropTypes.string,
    info: PropTypes.string,
    onClick: PropTypes.func
}

export default LogButton;