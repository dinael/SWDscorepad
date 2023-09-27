import { ChangeEvent, FC } from "react"

import './SWDinput.scss'

export type SWDinputProps = {
  id: string
  label: string
  type?: string
  value?: string
  placeholder?: string
  maxLength?: number
  image?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const SWDinput: FC<SWDinputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  maxLength = 2,
  image,
  onChange,
  ...props
}: SWDinputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (type === "number") {
      if (/^[+]?\d+$/.test(newValue) || newValue === "") {
        if (newValue.length <= maxLength) {
          onChange(e)
        }
      }
    } else {
      onChange(e)
    }
  }

  const pattern = type === "number" ? "\\d*" : undefined

  return (
    <label className="input-wrapper"
      htmlFor={id}
      {...props}>
      {image && (
        <span className="input-image-wrapper">
          <img
            className=""
            src={image}
            alt={label}
            aria-hidden="true" />
        </span>
      )}
      <span
        className="input-label-text"
        id={`label-${id}`}>
        {label}
      </span>
      <input
        className="input-field"
        type={type}
        pattern={pattern}
        id={id}
        step="any"
        min={type === "number" ? 0 : undefined}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-describedby={`label-${id}`}
      />
    </label>
  )
}

export default SWDinput
