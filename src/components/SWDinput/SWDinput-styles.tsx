import styled from 'styled-components'

export const Input = {
  Wrapper: styled.label`
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    align-items: center;
    gap: 1.5rem;
    inline-size: 100%;
  `,
  LabelText: styled.span`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
  `,
  ImageWrapper: styled.span`
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: center;
    min-inline-size: 2.75rem;
    block-size: 2.75rem;
  `,
  Equal: styled.span`
    line-height: 0;
    font-size: 2.875rem;
    padding-inline: 0.25rem;
    color: var(--SWD-color-primary);
  `,
  Image: styled.img`
    display: block;
    width: 100%;
    height: auto;
  `,
  Field: styled.input`
    font-family: var(--SWD-title-font-family);
    font-size: 1.5rem;
    text-align: end;
    display: flex;
    flex: 1 1 100%;
    inline-size: calc(100% - 2.75rem);
    font-weight: 800;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    block-size: 2.75rem;
    padding-inline: 1rem;
    border-radius: max(0.25rem, 4px);
    border: max(0.125rem, 2px) solid var(--SWD-input-color-opacity);
    color: #000;
    background: var(--SWD-input-color-opacity);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }

    &:focus {
      outline: max(0.125rem, 2px) solid var(--SWD-color-primary);
      outline-offset: max(0.25rem, 4px);
    }

    &:not(:placeholder-shown) {
      background: none;
      color: var(--SWD-color-primary);
      border-color: transparent;
    }
  `,
}