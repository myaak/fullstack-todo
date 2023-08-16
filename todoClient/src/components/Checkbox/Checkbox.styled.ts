import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  --s-xsmall: 0.625em;
  --s-small: 1.2em;
  --border-width: 1px;
  --c-primary: #5f11e8;
  --c-primary-20-percent-opacity: rgba(95, 17, 232, 0.2);
  --c-primary-10-percent-opacity: rgba(95, 17, 232, 0.1);
  --t-base: 0.4s;
  --t-fast: 0.2s;
  --e-in: ease-in;
  --e-out: cubic-bezier(0.11, 0.29, 0.18, 0.98);
`;

export const VisuallyHidden = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    cursor: pointer;
  }
`;

export const CheckboxSymbol = styled.span<{ checked: boolean }>`
  display: flex;
  border: var(--border-width) solid var(--c-primary);
  position: relative;
  border-radius: 0.1em;
  width: 1.5em;
  height: 1.5em;
  transition:
    box-shadow var(--t-base) var(--e-out),
    background-color var(--t-base);
  box-shadow: 0 0 0 0 var(--c-primary-10-percent-opacity);

  @keyframes check {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale(20);
    }
  }

  /* Apply the ripple animation when the checkbox is checked */
  ${({ checked }) =>
    checked &&
    `
    &:after {
      animation: check 1.5s var(--e-out);
    }
  `}

  &:after {
    content: "";
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    width: 0.25em;
    height: 0.25em;
    background-color: var(--c-primary-20-percent-opacity);
    opacity: 0;
    border-radius: 3em;
    transform: scale(1);
    transform-origin: 50% 50%;
  }
`;
export const IconCheckbox = styled.svg<{ checked: boolean }>`
  width: 1em;
  height: 1em;
  margin: auto;
  fill: none;
  stroke-width: 3;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  color: var(--c-primary);
  display: inline-block;

  path {
    transition: stroke-dashoffset var(--t-fast) var(--e-in);
    stroke-dasharray: 30px, 31px;
    stroke-dashoffset: ${({ checked }) => (checked ? "0" : "31px")};
  }
`;
