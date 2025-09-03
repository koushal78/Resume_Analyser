import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

// Point pdf.js to the worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function convertPdfToImage(file: File) {
  // 1. Load PDF
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;

  // 2. Get first page
  const page = await pdf.getPage(1);

  // 3. Setup viewport
  const scale = 2; // increase for better quality
  const viewport = page.getViewport({ scale });

  // 4. Create canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Failed to get 2D context");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // 5. Render page into canvas
  await page.render({ canvas, viewport }).promise;

  // 6. Convert canvas to image
  const imageUrl = canvas.toDataURL("image/png");

  return imageUrl; // <-- use this in <img src={imageUrl} />
}
