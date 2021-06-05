import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding: 100px;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  /* grid-gap: 60px; */
  /* justify-content: center; */
  justify-content: space-between;
  grid-row-gap: 30px;
`;

const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
  height: 60px;
`;

const ModalHeaderRightContent = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
`;

const ModalBody = styled.div<{ isScrollable: boolean }>`
  overflow-y: ${props => (props.isScrollable ? "auto" : "none")};
  height: inherit;
`;

export { Container, PlusIcon, ModalHeader, ModalHeaderRightContent, ModalBody };
