import { Request, Response } from "express";
import { BulkCategoryImportService } from "../../services/category/BulkCategoryImportService"; 
import multer from "multer";
import path from "path";

const upload = multer({ dest: path.resolve(__dirname, "../../../temp_file") });

class BulkCategoryImportController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "File is required." });
        }

        const service = new BulkCategoryImportService();

        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Failed to import categories." });
        }
    }
}

export { BulkCategoryImportController, upload };