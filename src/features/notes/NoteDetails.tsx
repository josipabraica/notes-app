import ReactMarkdown from "react-markdown";

import { useState, ChangeEvent, FC } from "react";
import {
  faArrowLeft,
  faTrash,
  faPen,
  faSave
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../../common/components/modal";

import {
  ModalHeader as Header,
  ModalHeaderRightContent as HeaderRightContent,
  ModalHeaderIcon as Icon,
  Textarea
} from "./styles";
import { useNotes } from "../../common/utilities/notes";

const defaultContent = `
  This is a note
  ==============
  
  Subtitle
  --------
  

  Shopping list:
  * apples
  * oranges
  * toilet paper
`;

interface Props {
  id: string;
  handleClose: () => void;
}

const NoteDetails: FC<Props> = ({ id, handleClose }) => {
  const [content, setContent] = useState(defaultContent);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { remove } = useNotes();

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleSaveClick = () => {
    setIsInEditMode(false);
  };

  const handleDeleteClick = () => {
    remove(id);
    handleClose();
  };

  const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <Modal>
      <>
        <Header>
          <Icon icon={faArrowLeft} onClick={handleClose} />

          <HeaderRightContent>
            {!isInEditMode ? (
              <Icon icon={faPen} onClick={handleEditClick} />
            ) : (
              <Icon icon={faSave} onClick={handleSaveClick} />
            )}

            <Icon icon={faTrash} onClick={handleDeleteClick} />
          </HeaderRightContent>
        </Header>

        {!isInEditMode ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <Textarea value={content} onChange={handleValueChange} />
        )}
      </>
    </Modal>
  );
};

export default NoteDetails;
