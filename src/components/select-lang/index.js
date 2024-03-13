import React, { useState } from 'react'
import "./style.css"
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {cn as bem} from "@bem-react/classname"
function SelectLang(props) {
    const [selectedLang, setSelectedLang] = useState(useSelector(state =>state.locale.lang));
    const store = useStore();
    const cn = bem("SelectLang");
    const handleChange = (event) => {
        store.actions.locale.changeLang(event.target.value)
        setSelectedLang(event.target.value);
    };
    return (
        <div className={cn()}>
            {props.locale.chooseLanguage}
        <select id="select" name="select" onChange={handleChange} value={selectedLang}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
        </select>
        </div>
    )
}

export default React.memo(SelectLang)