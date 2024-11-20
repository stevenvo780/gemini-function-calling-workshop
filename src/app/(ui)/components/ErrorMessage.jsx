import React from "react";

export const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <span className="text-red-500 bg-red-100 rounded-md p-2">{message}</span>
  );
};
