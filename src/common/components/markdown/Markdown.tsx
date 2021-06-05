import { FC, memo } from "react";

import { Markdown as StyledMarkdown } from "./styled";

interface Props {
  isPreview?: boolean;
  children: string;
}

const Markdown: FC<Props> = ({ isPreview, children }) => (
  <StyledMarkdown isPreview={isPreview}>{children}</StyledMarkdown>
);

export default memo(Markdown);
