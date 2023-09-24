import { ChangeEvent, FC } from "react";

import { Input } from "./SWDinput-styles";

export type SWDInputProps = {
  id: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  image?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const SWDInput: FC<SWDInputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  maxLength = 3,
  image,
  onChange,
  ...props
}: SWDInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Input.Wrapper htmlFor={id} {...props}>
      {image && (
        <Input.ImageWrapper>
          <Input.Image src={image} alt={label} aria-hidden="true" />
        </Input.ImageWrapper>
      )}
      <Input.LabelText id={`label-${id}`} hasImage={!!image}>
        {label}:
      </Input.LabelText>
      <Input.Field
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-describedby={`label-${id}`}
      />
    </Input.Wrapper>
  );
};

export default SWDInput;
