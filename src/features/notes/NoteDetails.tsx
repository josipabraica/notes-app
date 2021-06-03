import ReactMarkdown from "react-markdown";

import { useState, ChangeEvent, FC } from "react";
import {
  faArrowLeft,
  faTrash,
  faPen,
  faSave
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../../common/components/modal";
import { Icon } from "../../common/components/icon";

import {
  ModalHeader as Header,
  ModalHeaderRightContent as HeaderRightContent,
  ModalBody as Body,
  Textarea
} from "./styles";
import { useNotes } from "../../common/context/notesContext";

interface Props {
  id: string;
  handleClose: () => void;
}

const NoteDetails: FC<Props> = ({ id, handleClose }) => {
  console.log("DETAILS RERENDER", id);
  const { get, save, remove } = useNotes();
  const [content, setContent] = useState(() => {
    const note = get(id);
    return note?.content || "";
  });
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleSaveClick = () => {
    save(id, content);

    setIsInEditMode(false);
  };

  const handleDeleteClick = () => {
    remove(id);
    handleClose();
  };

  const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const renderViewOrEditIcon = () =>
    !isInEditMode ? (
      <Icon icon={faPen} onClick={handleEditClick} />
    ) : (
      <Icon icon={faSave} onClick={handleSaveClick} />
    );

  const renderViewOrEditContent = () =>
    !isInEditMode ? (
      <ReactMarkdown>{content}</ReactMarkdown>
    ) : (
      <Textarea value={content} onChange={handleValueChange} />
    );

  return (
    <Modal>
      <Header>
        <Icon icon={faArrowLeft} onClick={handleClose} />

        <HeaderRightContent>
          {renderViewOrEditIcon()}

          <Icon icon={faTrash} onClick={handleDeleteClick} />
        </HeaderRightContent>
      </Header>

      <Body isScrollable={!isInEditMode}>{renderViewOrEditContent()}</Body>
    </Modal>
  );
};

export default NoteDetails;
