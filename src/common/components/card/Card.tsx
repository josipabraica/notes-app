import { FC } from "react";

import { Card as StyledCard } from "./styled";

interface Props {
  onClick: () => void;
}

const Card: FC<Props> = ({ children, onClick }) => (
  <StyledCard onClick={onClick}>{children}</StyledCard>
);

export default Card;
