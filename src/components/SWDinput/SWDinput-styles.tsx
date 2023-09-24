import styled, { css } from 'styled-components'

export const Input = {
  Wrapper: styled.label`
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    align-items: center;
    gap: 1.5rem;
    inline-size: 100%;
  `,
  LabelText: styled.span<{ hasImage?: boolean }>`
    ${(props) => props.hasImage
      ? css`
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        `
      : css`
          font-size: 1.25rem;
          padding-inline-end: 1rem;
    `};
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
    display: flex;
    flex: 1 1 100%;
    font-size: 1.5rem;
    inline-size: calc(100% - 2.75rem);
    font-weight: 800;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    block-size: 2.75rem;
    padding-inline: 1rem;
    border-radius: max(0.25rem, 4px);
    border: max(0.125rem, 2px) solid var(--SWD-text-color-opacity);
    color: #000;
    background: var(--SWD-text-color-opacity);

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