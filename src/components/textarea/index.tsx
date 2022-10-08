import { useRef, useEffect } from 'react'
import { useField } from '@unform/core'
import classNames from 'classnames';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export default function Textarea({ name, label, ...rest }: Props) {
  const inputRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className="col-md-4">
      <label htmlFor={label} className="form-label">{label}</label>
      <textarea ref={inputRef} className="form-control" {...rest} id={label}></textarea>
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
} 