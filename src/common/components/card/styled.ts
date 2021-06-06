import styled from "styled-components";

const Card = styled.div<{ isForAdding?: boolean }>`
  height: 200px;
  width: 200px;
  border: 3px solid transparent;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  padding: 0px 20px;
  overflow: hidden;
  background-color: #fdfdfd;

  &:hover {
    cursor: pointer;
    border-width: 3px;
    border-color: #b90445;
  }

  ${props =>
    props.isForAdding &&
    `
      background-color: #b90445;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: none;
    `}
`;

export { Card };
