import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const Markdown = styled(ReactMarkdown)<{ isPreview?: boolean }>`
  ${props =>
    props.isPreview &&
    `
      transform: scale(0.25);
      transform-origin: top left;
      width: 400%;
      text-shadow: 0px 1.09677px 1.09677px rgba(0, 0, 0, 0.25);
    `}
`;

export { Markdown };
