export async function scaleImage(file, targetWidth) {
  const imageString = await convertToBase64(file);
  const { img, width, height } = await getImageSize(imageString);

  const aspectRatio = width / height;
  const canvasWidth = targetWidth;
  const canvasHeight = canvasWidth / aspectRatio;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", 0.92);
}

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function getImageSize(imageDataURL) {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = imageDataURL;

    // we are waiting until the image has rendered by targeting its onload event, which is required when we'd like to get a height and width to use for the final output's length:width ratio
    img.onload = (e) => {
      const { width, height } = e.target;
      resolve({ img, width, height });
    };
  });
}
