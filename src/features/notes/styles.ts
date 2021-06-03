import styled from "styled-components";
import ReactMarkdown from "react-markdown";

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

// TODO: odvojiti Card u common/components?
// TODO: pomakne se content na hover
const Card = styled.div`
  height: 200px;
  width: 200px;
  border: 2px solid transparent;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  padding: 20px 20px 20px 20px;

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

const PlusIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: white;
`;

const PreviewContent = styled(ReactMarkdown)`
  transform: scale(0.25);
  transform-origin: top left;
  width: 400%;
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

const ModalHeaderIcon = styled(FontAwesomeIcon)`
  color: rgba(0, 0, 0, 0.57);
  font-size: 20px;

  &:hover {
    color: #b90445;
    cursor: pointer;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 60%;
`;

export {
  Container,
  Card,
  AddCard,
  PlusIcon,
  PreviewContent,
  ModalHeader,
  ModalHeaderRightContent,
  ModalHeaderIcon,
  Textarea
};
