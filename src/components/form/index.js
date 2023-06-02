import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import useForm from '../../hooks/use-form';
import "./style.css";

const Form = ({ inputs, title, onSubmit, submitButton }) => {
  const { data, handleChange, errors, isValid, resetForm } = useForm();

  const cn = bem("Form");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
    resetForm();
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <div className={cn("title")}>{title}</div>
      <div className={cn("input-container")}>
        {inputs.map((input, i) => {
          return (
            <div className={cn("input-wrapper")} key={input.name}>
              <label className={cn("input-label")}>{input.label}</label>
              <input
                className={cn("input")}
                name={input.name}
                value={data[input.name] || ""}
                onChange={handleChange}
                type={input.type}
                required={input.required}
                pattern={input.pattern}
                minLength={input.minLength}
                maxLength={input.maxLength}
              />
              <span className={cn("input-error")}>{errors[input.name]}</span>
            </div>
          );
        })}
        <button type="submit" className={cn("submit")} disabled={!isValid}>
          {submitButton}
        </button>
      </div>
    </form>
  );
};

export default Form;
