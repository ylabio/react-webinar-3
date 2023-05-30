import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Dots () {
    const cn = bem("Dots");
    return(
        <span className={cn()}>...</span>
        )
};

export default Dots;