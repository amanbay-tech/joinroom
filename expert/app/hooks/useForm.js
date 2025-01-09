import { useEffect, useState } from "react";

export default function useForm(initialValues, validators) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touchedValues, setTouchedValues] = useState({});

  useEffect(() => {
    validate();
  }, [values]);

  const validate = () => {
    const validationErrors = {};
    Object.keys(values).forEach((key) => {
      if (validators[key] && touchedValues[key]) {
        const error = validators[key](values[key]);
        if (error) {
          validationErrors[key] = error;
        }
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setTouchedValues((prevTouchedValues) => ({
      ...prevTouchedValues,
      [name]: true,
    }));
  };

  const resetTouchedValues = () => {
    setTouchedValues({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    setValues,
    setErrors,
    resetTouchedValues,
    setTouchedValues
  };
}