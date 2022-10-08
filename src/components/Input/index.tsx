import { useField } from "@unform/core";
import { HTMLProps, useEffect, useRef } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({name, label, ...rest}: Props) {
  const inputRef = useRef(null);
  const { defaultValue, error, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      }
    })
  }, [fieldName, registerField])

  return (
    <div className="col-md-4">
      <label htmlFor="validationCustom01" className="form-label">{label}</label>
      <input type="text" ref={inputRef} {...rest} defaultValue={defaultValue} className="form-control" id="validationCustom01" required />
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}