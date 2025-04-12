import { memo } from "react";

function Form({children,submit = ()=>{},} ) {
    return(
        <form  onSubmit={submit}>
            {children}
        </form>
    )
}

export default memo(Form)