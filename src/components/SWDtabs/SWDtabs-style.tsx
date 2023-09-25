import styled from 'styled-components'

export const Tabs = {
  Wrapper: styled.section`
    display: grid;
    inline-size: 100%;
  `,

  Bar: styled.div`
    position: sticky;
    inset-block-start: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-block-end: 2rem;
    border-block-end: max(0.0625rem, 1px) solid var(--SWD-color-primary);
    background: var(--SWD-background-color)
  `,

  Control: styled.button`
    appearance: none;
    position: relative;
    font-family: var(--SWD-title-font-family);
    font-size: 2rem;
    display: block;
    text-align: center;
    flex: 1 1 100%;
    max-inline-size: 20rem;
    block-size: 4rem;
    color: var(--SWD-text-color-opacity);
    background: none;
    border: none;
    cursor: pointer;
    // Ellipsis
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 1rem;

    &.active {
      --total-background: var(--SWD-color-primary);
      --total-scale: 1;

      color: var(--SWD-color-primary);
      border-block-end: max(0.25rem, 4px) solid var(--SWD-color-primary);
    }
  `,

  Total: styled.span`
    position: absolute;
    inset-inline-end: 0.5rem;
    inset-block-start: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: 16rem;
    border: max(0.25rem, 4px) solid var(--SWD-background-color);
    color: var(--SWD-background-color);
    background: var(--total-background, var(--SWD-text-color));
    transform: scale(var(--total-scale, 0.75));
    transition: transform .25s ease-in-out;

    :empty {
      display: none;
    }
  `,

  Container: styled.article`
    padding-inline: 2rem;
  `,
}
