import React from "react";

import { FallbackProps } from "react-error-boundary";

import { useStyles } from "./ErrorFallback.styles";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const classes = useStyles();

  return (
    <div role="alert" className={classes.container}>
      <p>Something went wrong</p>
      <pre>
        {error?.name} {error?.message}
      </pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
