import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = styled(FontAwesomeIcon)`
  color: rgba(0, 0, 0, 0.57);
  font-size: 18px;

  &:hover {
    color: #b90445;
    cursor: pointer;
  }
`;

export { Icon };
