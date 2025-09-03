import { fromPath } from "pdf2pic";

export const dropResume = async (req, res) => {
  try {
    const pdfPath = req.file.path; // assuming multer
    const pdf2pic = fromPath(pdfPath, { format: "png", width: 600 });

    const result = await pdf2pic(1); // first page

    // ✅ Send only once
    res.json({
      pages: 1,
      images: [result.base64]  // already "data:image/png;base64,..."
    });
  } catch (error) {
    console.error("dropResume error:", error);
    res.status(500).json({ error: error.message });
  }
};
