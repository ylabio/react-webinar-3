import React, { useCallback, useState } from "react";

function useForm() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setData({...data, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newData = {}, newErrors = {}, newIsValid = false) => {
      setData(newData);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setData, setErrors, setIsValid]
  );

  return { data, handleChange, errors, isValid, resetForm, setData };
}

export default useForm;