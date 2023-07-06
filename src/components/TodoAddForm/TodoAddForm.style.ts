import { styled } from "styled-components";

export const AddForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 15px;
`;

export const AddFormInput = styled.input.attrs({type: "text"})`
  width: 250px;
  padding: 5px;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;
