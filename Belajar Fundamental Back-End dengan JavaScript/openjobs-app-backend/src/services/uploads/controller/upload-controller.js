import { ClientError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import UploadRepositories from "../repositories/upload-repositories.js";
import fs from "fs";
import path from "path";
import { UPLOAD_FOLDER } from "../storage/storage-config.js";

export const uploadDocuments = async (req, res, next) => {
  const { id: user_id } = req.user;

  if (!req.file) {
    return next(new ClientError("File is required"));
  }

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

  const document = await UploadRepositories.createDocument({
    user_id,
    name: encodedFilename,
  });

  return response(res, 201, "success", {
    documentId: document.id,
    filename: encodedFilename,
    originalName: req.file.originalname,
    size: req.file.size,
    fileLocation: fileLocation,
  });
};

export const getDocuments = async (req, res) => {
  const documents = await UploadRepositories.getDocuments();

  return response(res, 200, "Bookmark sukses ditampilkan", {
    documents,
  });
};

export const getDocumentById = async (req, res, next) => {
  const { id } = req.params;
  const document = await UploadRepositories.getDocumentById(id);

  if (!document) {
    return next(new NotFoundError("Dokumen tidak ditemukan"));
  }
  const filePath = `src/services/uploads/files/documents/${document.name}`;

  res.set("Content-Disposition", `attachment; filename="${document.name}"`);

  return res.sendFile(
    document.name,
    {
      root: "src/services/uploads/files/documents",
    },
    (err) => {
      if (err) console.error(err);
    },
  );
};

export const deleteDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const document = await UploadRepositories.getDocumentById(id);

    if (!document) {
      return next(new NotFoundError("Dokumen tidak ditemukan"));
    }

    // path file di disk
    const filePath = path.join(UPLOAD_FOLDER, document.name);

    // hapus file jika ada
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const deletedDocument = await UploadRepositories.deleteDocumentById(id);

    return response(res, 200, "Dokumen berhasil dihapus", deletedDocument);
  } catch (error) {
    return next(error);
  }
};
