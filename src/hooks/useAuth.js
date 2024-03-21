import {Navigate} from "react-router-dom";
import React from "react";

/**
 * Хук для проверки аутентификации и переадресации на нужную страницу
 * @param link ссылка страницы
 */

export default function useAuth(link) {
    return (<Navigate to={link}/>)
}