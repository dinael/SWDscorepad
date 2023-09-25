import { ChangeEvent, FC } from "react"

import { Input } from "./SWDinput-styles"

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
    e.target.value.length <= maxLength && onChange(e)
  }

  const pattern = type === "number" ? "\\d*" : undefined

  return (
    <Input.Wrapper
      htmlFor={id}
      {...props}>
      {image && (
        <Input.ImageWrapper>
          <Input.Image
            src={image}
            alt={label}
            aria-hidden="true" />
        </Input.ImageWrapper>
      )}
      <Input.LabelText id={`label-${id}`}>
        {label}
      </Input.LabelText>
      <Input.Field
        type={type}
        pattern={pattern}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-describedby={`label-${id}`}
      />
    </Input.Wrapper>
  )
}

export default SWDinput
