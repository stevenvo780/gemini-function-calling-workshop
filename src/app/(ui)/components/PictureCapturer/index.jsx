"use client";

import { useContext, useEffect, useState } from "react";
import { CustomWebcam } from "./CustomWebcam";
import { FileSelector } from "./FileSelector";
import { Switch } from "../Switch";
import { ErrorMessage } from "../ErrorMessage";
import { CreateTransactionContext } from "../../providers/CreateTransactionProvider";

export const PictureCapturer = ({ open, onCancel, onUsePicture }) => {
  const [hasCameraAvailable, setHasCameraAvailable] = useState();
  const [useCamera, setUseCamera] = useState(true);
  const { errorMessage } = useContext(CreateTransactionContext);

  useEffect(() => {
    const hasCameraSupport =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

    if (hasCameraSupport) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const hasCamera = devices.some(
          (device) => device.kind === "videoinput"
        );

        setHasCameraAvailable(hasCamera);
      });
    } else {
      setHasCameraAvailable(false);
    }
  }, [open]);

  if (!open) {
    return;
  }

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div
        data-dialog="dialog"
        className="relative m-4 p-4 min-w-[40%] max-w-[100%] rounded-lg bg-white shadow-sm flex flex-col gap-2"
      >
        {hasCameraAvailable && (
          <div className="flex flex-col gap-1 mb-4">
            <Switch
              label="Use camera"
              on={hasCameraAvailable && useCamera}
              onChange={(useCamera) => setUseCamera(useCamera)}
            />
            <span className="text-slate-600">
              {useCamera ? "Take invoice picture" : "Select invoice picture"}
            </span>
          </div>
        )}

        {hasCameraAvailable && useCamera ? (
          <CustomWebcam onUsePicture={onUsePicture} onCancel={onCancel} />
        ) : (
          <FileSelector onUsePicture={onUsePicture} onCancel={onCancel} />
        )}

        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
};
