import { useState, useCallback } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import NotePreview from "./NotePreview";
import NoteDetails from "./NoteDetails";

import { Container, PlusIcon } from "./styled";
import { Card } from "../../common/components/card";
import { useNotes } from "../../common/context/notesContext";

const defaultContent = `This is a note
==============

Subtitle
--------


Shopping list:
* apples
* oranges
* toilet paper
`;

const NotesList = () => {
  console.log("LIST RERENDER");
  const { add, getAllIds, get } = useNotes();
  const [noteIdInPreview, setNodeIdInPreview] = useState<string | null>(null);

  const handleAddClick = () => {
    const newNoteId = add(defaultContent);

    newNoteId && setNodeIdInPreview(newNoteId);
  };

  const handlePreviewClick = useCallback((id: string) => {
    setNodeIdInPreview(id);
  }, []);

  const handleClosePreview = () => {
    setNodeIdInPreview(null);
  };

  const allNoteIds = getAllIds();

  const renderNotes = () =>
    allNoteIds.map(id => {
      const note = get(id);

      if (note) {
        return (
          <NotePreview key={id} note={note} handleClick={handlePreviewClick} />
        );
      }
      return null;
    });

  return (
    <Container>
      <Card isForAdding={true} onClick={handleAddClick}>
        <PlusIcon icon={faPlus} />
      </Card>

      {renderNotes()}

      {noteIdInPreview && (
        <NoteDetails id={noteIdInPreview} handleClose={handleClosePreview} />
      )}
    </Container>
  );
};

export default NotesList;
