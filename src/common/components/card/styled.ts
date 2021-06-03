import styled from "styled-components";

const Card = styled.div`
  height: 200px;
  width: 200px;
  border: 3px solid transparent;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  padding: 0px 20px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    border-width: 3px;
    border-color: #b90445;
  }
`;

const AddCard = styled(Card)`
  background-color: #b90445;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`;

export { Card, AddCard };
