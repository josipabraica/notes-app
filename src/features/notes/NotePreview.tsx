import { FC, memo } from "react";

import { Markdown } from "../../common/components/markdown";
import { Card } from "../../common/components/card";
import { Note } from "./types";

interface Props {
  note: Note;
  handleClick: (id: string) => void;
}

const NotePreview: FC<Props> = ({ note, handleClick }) => {
  console.log("PREVIEW RERENDER", note.id);

  const onClick = () => {
    handleClick(note.id);
  };

  return (
    <Card onClick={onClick}>
      <Markdown isPreview={true}>{note.content}</Markdown>
    </Card>
  );
};

export default memo(NotePreview);
