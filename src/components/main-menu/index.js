import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css"

function MainMenu({lang}){
    return(
        <Link className="MainMenu" to={"/"}>
            {lang === "ru" ? "Главная" : "Main"}
        </Link>
    )
}

export default memo(MainMenu)