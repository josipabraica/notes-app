import { useState, ChangeEvent, FC, useCallback } from "react";
import {
  faArrowLeft,
  faTrash,
  faPen,
  faSave
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../../common/components/modal";
import { Icon } from "../../common/components/icon";
import { Markdown } from "../../common/components/markdown";
import { Textarea } from "../../common/components/textarea";

import {
  ModalHeader as Header,
  ModalHeaderRightContent as HeaderRightContent,
  ModalBody as Body
} from "./styled";
import { useNotes } from "../../common/context/notesContext";

interface Props {
  id: string;
  isEditMode: boolean;
  onClose: () => void;
}

const NoteDetails: FC<Props> = ({ id, isEditMode, onClose }) => {
  const { get, save, remove } = useNotes();
  const [noteContent, setNoteContent] = useState(() => {
    const note = get(id);
    return note?.content || "";
  });
  const [isInEditMode, setIsInEditMode] = useState(isEditMode);

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleSaveClick = () => {
    save(id, noteContent);

    setIsInEditMode(false);
  };

  const handleDeleteClick = useCallback(() => {
    remove(id);

    onClose();
  }, [onClose, id, remove]);

  const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
  };

  return (
    <Modal>
      <Header>
        <Icon icon={faArrowLeft} onClick={onClose} />

        <HeaderRightContent>
          {!isInEditMode ? (
            <Icon icon={faPen} onClick={handleEditClick} />
          ) : (
            <Icon icon={faSave} onClick={handleSaveClick} />
          )}

          <Icon icon={faTrash} onClick={handleDeleteClick} />
        </HeaderRightContent>
      </Header>

      <Body isScrollable={!isInEditMode}>
        {!isInEditMode ? (
          <Markdown>{noteContent}</Markdown>
        ) : (
          <Textarea value={noteContent} onChange={handleValueChange} />
        )}
      </Body>
    </Modal>
  );
};

export default NoteDetails;
