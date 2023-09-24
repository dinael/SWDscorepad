import styled from 'styled-components'

export const Tabs = {
  Wrapper: styled.section`
    display: grid;
    inline-size: 100%;
  `,

  Bar: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-block-end: 2rem;
    border-block-end: max(0.0625rem, 1px) solid var(--SWD-color-primary);
  `,

  Control: styled.button`
    appearance: none;
    font-family: var(--SWD-title-font-family);
    font-size: 2rem;
    display: block;
    text-align: center;
    flex: 1 1 100%;
    max-inline-size: calc(100% - 2rem);
    block-size: 4rem;
    color: var(--SWD-color-primary);
    background: none;
    border: none;
    cursor: pointer;
    // Ellipsis
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 1rem;

    &.active {
      border-block-end: max(0.25rem, 4px) solid var(--SWD-color-primary);
    }
  `,

  Container: styled.article`
    padding-inline: 2rem;
  `,
}
