"use client";

import Image from "next/image";
import { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CreateTransactionContext } from "../../providers/CreateTransactionProvider";
import { Spinner } from "../Spinner";

const CAMARE_WIDTH = 400;
const CAMERA_HEIGHT = 300;
const videoConstraints = {
  width: CAMARE_WIDTH,
  height: CAMERA_HEIGHT,
  facingMode: "environment",
};

export const CustomWebcam = ({ onCancel, onUsePicture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const { isLoading } = useContext(CreateTransactionContext);

  const onCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const onRetake = () => {
    setImgSrc(null);
  };

  const onUse = () => {
    onUsePicture(imgSrc);
  };

  const handleCancel = () => {
    setImgSrc(null);
    onCancel();
  };

  return (
    <>
      <div className="relative leading-normal text-slate-600 font-light flex justify-center">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="webcam"
            className="mb-4 rounded-lg"
            width={CAMARE_WIDTH}
            height={CAMERA_HEIGHT}
          />
        ) : (
          <Webcam
            ref={webcamRef}
            className="mb-4 rounded-lg"
            screenshotFormat="image/jpeg"
            width={CAMARE_WIDTH}
            height={CAMERA_HEIGHT}
            audio={false}
            forceScreenshotSourceSize={true}
            videoConstraints={videoConstraints}
          />
        )}
      </div>
      <div className="flex gap-2 shrink-0 flex-wrap items-center pt-4 justify-end">
        <button
          className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          disabled={isLoading}
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        {imgSrc ? (
          <button
            className="button-success"
            type="button"
            onClick={onRetake}
            disabled={isLoading}
          >
            Retake
          </button>
        ) : (
          <button
            className="button-success"
            type="button"
            onClick={onCapture}
            disabled={isLoading}
          >
            Take
          </button>
        )}
        <button
          className="button-primary flex flex-row items-center gap-2"
          type="button"
          disabled={!imgSrc || isLoading}
          onClick={() => onUse()}
        >
          {isLoading && <Spinner />}
          Use
        </button>
      </div>
    </>
  );
};
