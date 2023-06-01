import { memo, useState } from "react"

function Login(){
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState();

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
  };


  return (<>
    <input
      value={value}
      type={props.type}
      onChange={onChange}
    />
    <input
      className={cn({theme: props.theme})}
      onChange={onChange}
    />
    </>
  )
}

export default memo(Login);




