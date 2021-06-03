import { useState } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import NotePreview from "./NotePreview";
import NoteDetails from "./NoteDetails";

import { Container, AddCard, PlusIcon } from "./styles";
import { useNotes } from "../../common/utilities/notes";

const defaultContent = `This is a note
==============

Subtitle
--------


Shopping list:
* apples
* oranges
* toilet paper
`;

// TODO: sejvati u local storage u unmount ili u custom hooku?
const NotesList = () => {
  console.log("LIST RERENDER");
  const { add, getAllIds } = useNotes();
  const [noteIdInPreview, setNodeIdInPreview] = useState<string | null>(null);

  const handleAddClick = () => {
    const newNoteId = add(defaultContent);

    newNoteId && setNodeIdInPreview(newNoteId);
  };

  const handlePreviewClick = (id: string) => {
    setNodeIdInPreview(id);
  };

  const handleClosePreview = () => {
    setNodeIdInPreview(null);
  };

  const allNoteIds = getAllIds();

  return (
    <Container>
      <AddCard onClick={handleAddClick}>
        <PlusIcon icon={faPlus} />
      </AddCard>

      {allNoteIds.map(id => (
        <NotePreview key={id} id={id} handleClick={handlePreviewClick} />
      ))}

      {noteIdInPreview && (
        <NoteDetails id={noteIdInPreview} handleClose={handleClosePreview} />
      )}
    </Container>
  );
};

export default NotesList;
