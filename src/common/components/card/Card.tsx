import { FC } from "react";

import { Card as StyledCard } from "./styled";

interface Props {
  isForAdding?: boolean;
  onClick: () => void;
}

const Card: FC<Props> = ({ isForAdding, onClick, children }) => (
  <StyledCard isForAdding={isForAdding} onClick={onClick}>
    {children}
  </StyledCard>
);

export default Card;
