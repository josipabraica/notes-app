import { FC } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { Icon as StyledIcon } from "./styled";

interface Props {
  icon: IconDefinition;
  onClick: () => void;
}

const Icon: FC<Props> = ({ icon, onClick }) => (
  <StyledIcon icon={icon} onClick={onClick} />
);

export default Icon;
