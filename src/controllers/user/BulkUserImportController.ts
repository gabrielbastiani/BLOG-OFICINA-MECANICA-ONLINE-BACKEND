import { Request, Response } from "express";
import { BulkUserImportService } from "../../services/user/BulkUserImportService";
import multer from "multer";
import path from "path";

const upload = multer({ dest: path.resolve(__dirname, "../../../uploads") });

class BulkUserImportController {
    async handle(req: Request, res: Response) {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "File is required." });
        }

        const service = new BulkUserImportService();

        try {
            const result = await service.execute(file.path);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Failed to import users." });
        }
    }
}

export { BulkUserImportController, upload };