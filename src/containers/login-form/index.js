import { memo, useState } from "react";
import Form from "../../components/form";


function LoginForm(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [data, setData] = useState({ login: "", password: "" });

  // Обработчик изменений в поле
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
  <Form props={props} data={data} handleChange={handleChange} handleSubmit={props.handleSubmit} t={props.t}/>
  );
}

export default memo(LoginForm);
