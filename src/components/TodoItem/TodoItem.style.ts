import { styled } from "styled-components";

export const TodoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: black;
`;

export const TodoTitle = styled.div<{ done: string }>`
  color: ${(props) => 
    (props.done === "true" ? 'gray' : 'black' )};
  text-decoration: ${(props) => 
    (props.done === "true" ? 'line-through #000 !important' : 'none' )};

`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })``;
