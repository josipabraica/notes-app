import { FC } from "react";

import { Message } from "./styled";

interface Props {
  error?: any;
}

const ErrorFallback: FC<Props> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <Message>{error?.message}</Message>
    </div>
  );
};

export default ErrorFallback;
