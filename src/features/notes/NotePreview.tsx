import { FC } from "react";

import { Card, PreviewContent } from "./styles";
import { useNotes } from "../../common/utilities/notes";

interface Props {
  id: string;
  handleClick: (id: string) => void;
}

// TODO: mozda koristiti usememo
const NotePreview: FC<Props> = ({ id, handleClick }) => {
  const notes = useNotes();
  const note = notes.get(id);

  const onClick = () => {
    handleClick(id);
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

export default NotePreview;
