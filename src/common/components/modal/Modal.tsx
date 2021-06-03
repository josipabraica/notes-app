import { Background, Modal as StyledModal } from "./styles";

const Modal = ({ children }: { children: any }) => {
  return (
    <Background>
      <StyledModal>{children}</StyledModal>
    </Background>
  );
};

export default Modal;
