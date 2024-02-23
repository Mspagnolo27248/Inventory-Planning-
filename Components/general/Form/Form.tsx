import { error } from "console";
import React, { useState } from "react";

type FormProps<T extends Record<string, any>> = {
  initalData: T;
  submitHandler: (formData: T) => void;
  validate?: (formData: T) => Record<keyof T, string>;
};

function Form<T extends Record<string, any>>({
  initalData,
  submitHandler,
  validate,
}: FormProps<T>) {

  const [formData, setFormData] = useState<T>(initalData);
  const [formErrors, setFormErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate
      ? validate(formData)
      : ({} as Record<keyof T, string>);
    setFormErrors(errors);
    if (Object.keys(formErrors).length === 0) {
      submitHandler(formData);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        {Object.entries(initalData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
            {formErrors[key]&& <p>{formErrors[key]}</p>}
          </div>
        ))};
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Form;
