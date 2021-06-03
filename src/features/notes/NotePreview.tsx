import { FC, memo } from "react";

import { PreviewContent } from "./styles";
import { Card } from "../../common/components/card";
import { useNotes } from "../../common/context/notesContext";
import { Note } from "./types";

interface Props {
  // id: string;
  note: Note;
  handleClick: (id: string) => void;
}

const NotePreview: FC<Props> = ({ note, handleClick }) => {
  console.log("PREVIEW RERENDER", note.id);
  // const { get } = useNotes();
  // const note = get(id);

  const onClick = () => {
    handleClick(note.id);
  };

  if (note) {
    return (
      <Card onClick={onClick}>
        <PreviewContent>{note.content}</PreviewContent>
      </Card>
    );
  }

  return null;
};

export default memo(NotePreview);
