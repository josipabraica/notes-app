import { useState, useCallback, useMemo } from "react";

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
  const [noteIdInModal, setNodeIdInModal] = useState<string | null>(null);
  const [showNoteInModalInEditMode, setShowNoteInModalInEditMode] =
    useState(false);

  const handleAddClick = useCallback(() => {
    const newNoteId = add(defaultContent);

    if (newNoteId) {
      setNodeIdInModal(newNoteId);
      setShowNoteInModalInEditMode(true);
    }
  }, [add]);

  const handlePreviewClick = useCallback((id: string) => {
    setNodeIdInModal(id);
    setShowNoteInModalInEditMode(false);
  }, []);

  const handleClosePreview = useCallback(() => {
    setNodeIdInModal(null);
  }, []);

  const allNoteIds = useMemo(() => getAllIds(), [getAllIds]);

  const plusCard = useMemo(
    () => (
      <Card isForAdding={true} onClick={handleAddClick}>
        <PlusIcon icon={faPlus} />
      </Card>
    ),
    [handleAddClick]
  );

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
      {plusCard}

      {renderNotes()}

      {noteIdInModal && (
        <NoteDetails
          id={noteIdInModal}
          isEditMode={showNoteInModalInEditMode}
          handleClose={handleClosePreview}
        />
      )}
    </Container>
  );
};

export default NotesList;
