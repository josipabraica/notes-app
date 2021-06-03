import { useState, useEffect } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import NotePreview from "./NotePreview";
import NoteDetails from "./NoteDetails";

import { Container, AddCard, PlusIcon } from "./styles";
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

// TODO: sejvati u local storage u unmount ili u custom hooku?
const NotesList = () => {
  const notes = useNotes();
  const [noteIdInPreview, setNodeIdInPreview] = useState<string | null>(
    "1d4f2aaf-3aad-4589-9aa1-9ede38f7f00c"
  );

  const handleAddClick = () => {
    notes.add(defaultContent);

    // setnoteid(true);
  };

  const handlePreviewClick = (id: string) => {
    console.log("CLICKED ", id);
  };

  const handleClosePreview = () => {
    setNodeIdInPreview(null);
  };

  const allNoteIds = notes.getAllIds();

  useEffect(() => {
    console.log("CHANGED");
  }, [allNoteIds]);

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
