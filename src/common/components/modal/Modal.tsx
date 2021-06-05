import { FC } from "react";

import { Background, Modal as StyledModal } from "./styled";

const Modal: FC = ({ children }) => {
  return (
    <Background>
      <StyledModal>{children}</StyledModal>
    </Background>
  );
};

export default Modal;
