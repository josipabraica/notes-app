import { FC, ReactNode } from "react";

import { Card as StyledCard } from "./styled";

interface Props {
  isForAdding?: boolean;
  onClick: () => void;
  children: ReactNode | Element;
}

const Card: FC<Props> = ({ isForAdding, onClick, children }) => (
  <StyledCard isForAdding={isForAdding} onClick={onClick}>
    {children}
  </StyledCard>
);

export default Card;
