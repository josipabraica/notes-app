import { FC } from "react";

import { AddCard as StyledAddCard } from "./styled";

interface Props {
  onClick: () => void;
}

const Card: FC<Props> = ({ children, onClick }) => (
  <StyledAddCard onClick={onClick}>{children}</StyledAddCard>
);

export default Card;
