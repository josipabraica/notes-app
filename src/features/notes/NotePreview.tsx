import { FC, memo } from "react";

import { Markdown } from "../../common/components/markdown";
import { Card } from "../../common/components/card";
import { Note } from "./types";

interface Props {
  note: Note;
  onClick: (id: string) => void;
}

const NotePreview: FC<Props> = ({ note, onClick }) => {
  const handleClick = () => {
    onClick(note.id);
  };

  return (
    <Card onClick={handleClick}>
      <Markdown isPreview={true}>{note.content}</Markdown>
    </Card>
  );
};

export default memo(NotePreview);
