import { FC, ChangeEvent } from "react";

import { Textarea as StyledTextarea } from "./styled";

interface Props {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<Props> = ({ value, onChange }) => (
  <StyledTextarea value={value} onChange={onChange} />
);

export default Textarea;
