import React, { createContext, useState } from "react";

export const CreateTransactionContext = createContext();

export const CreateTransactionProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CreateTransactionContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CreateTransactionContext.Provider>
  );
};
