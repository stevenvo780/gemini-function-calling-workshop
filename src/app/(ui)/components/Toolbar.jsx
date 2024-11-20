"use client";

import { HiCamera } from "react-icons/hi";
import { PictureCapturer } from "./PictureCapturer";
import { useContext, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { CreateTransactionContext } from "../providers/CreateTransactionProvider";
import { Spinner } from "./Spinner";

export const Toolbar = ({ onTransactionCreated }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { errorMessage, setErrorMessage, isLoading, setIsLoading } = useContext(
    CreateTransactionContext
  );
  const inputRef = useRef(null);

  const onInputSubmit = (e) => {
    e.preventDefault();
    onCreate({ description: e.target[0].value });
  };

  const onOpenPictureDialog = () => {
    onClear();
    setShowDialog(true);
  };

  const onUsePicture = (picture) => onCreate({ picture });

  const onClose = () => {
    setShowDialog(false);
    onClear();
  };

  const onClear = () => {
    inputRef.current.value = "";
    setErrorMessage(null);
  };

  const onCreate = async ({ description, picture }) => {

    try {
      setIsLoading(true);
      setErrorMessage(null);

      console.log("onCreate", { description, picture });
      const formData = new FormData();
      if (description) {
        formData.append("description", description);
      } else if (picture) {
        formData.append("picture", picture);
      }

      const response = await fetch("/api/transaction", {
        method: "POST",
        body: formData,
      });
      console.log("onCreate:response", response);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const { transaction } = data;
      onTransactionCreated(transaction);

      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="w-full flex flex-row items-center rounded overflow-hidden gap-2">
        <div className="font-bold flex w-full">
          <form
            className="w-full h-full relative items-center"
            onSubmit={onInputSubmit}
          >
            <input
              ref={inputRef}
              disabled={isLoading}
              type="text"
              placeholder="Pago de Uber para ir al DevFest por 18000, C1408"
              className="border border-gray-300 p-2 rounded-md w-full"
            />

            <div className="absolute bottom-1 right-1">
              {isLoading && <Spinner size="8" />}
            </div>
          </form>
        </div>
        <button
          className="button-primary"
          onClick={() => onOpenPictureDialog()}
        >
          <HiCamera size={30} />
        </button>
      </div>
      <ErrorMessage message={errorMessage} />
      <PictureCapturer
        open={showDialog}
        onCancel={onClose}
        onUsePicture={onUsePicture}
      />
    </div>
  );
};
