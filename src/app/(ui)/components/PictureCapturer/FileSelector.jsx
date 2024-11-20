"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { scaleImage } from "../../utils/imageOptimizer";
import { CreateTransactionContext } from "../../providers/CreateTransactionProvider";
import { Spinner } from "../Spinner";

const CAMARE_WIDTH = 480;
const CAMERA_HEIGHT = 320;

export const FileSelector = ({ onCancel, onUsePicture }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const { isLoading } = useContext(CreateTransactionContext);

  const onFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImgSrc(null);
      return;
    }

    const dataURL = await scaleImage(file, CAMARE_WIDTH);
    // console.log("dataURL", dataURL);
    setImgSrc(dataURL);
  };

  const onUse = () => onUsePicture(imgSrc);

  const handleCancel = () => {
    setImgSrc(null);
    onCancel();
  };

  return (
    <>
      <div className="relative leading-normal text-slate-600 font-light flex flex-col items-center bg-gray-200 rounded-md p-4">
        <input
          className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={onFileChange}
        />

        <Image
          src={imgSrc || "/placeholder-image.png"}
          alt="picture"
          className="rounded-lg w-[50%]"
          width={CAMARE_WIDTH}
          height={CAMERA_HEIGHT}
        />
      </div>
      <div className="flex gap-2 shrink-0 flex-wrap items-center pt-4 justify-end">
        <button
          className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
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
