import {cn as bem} from '@bem-react/classname';
import { useNavigate } from "react-router-dom";
import './style.css';

function EnterToComment() {
    const navigate = useNavigate();
    const cn = bem("EnterToComment");

    return(
        <div>
            <div className={cn()}>
                <div className={cn("enter")} onClick={() => navigate("/login")}>Войдите</div> 
                <div>
                    , чтобы иметь возможность комментировать.
                </div>
            </div> 
        </div>
           
    )
}

export default EnterToComment;