import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10002;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 50%;
  height: 90%;
  background-color: white;
  box-sizing: border-box;
  padding: 60px;
`;

export { Background, Modal };
