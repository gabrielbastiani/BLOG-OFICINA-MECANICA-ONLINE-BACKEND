import { Request, Response } from 'express';
import { ExportDataService } from '../../services/export_data/ExportDataService';

class ExportDataController {
    async handle(req: Request, res: Response) {
        const { user_id, tableName, columns, format, customColumnNames } = req.body;

        if (!Array.isArray(columns) || columns.some(col => typeof col !== 'string')) {
            return res.status(400).json({ error: "Parâmetro columns deve ser um array de strings" });
        }

        if (typeof customColumnNames !== 'object' || customColumnNames === null) {
            return res.status(400).json({ error: "Parâmetro customColumnNames deve ser um objeto" });
        }

        const exportDataService = new ExportDataService();

        try {
            const { buffer, mimeType, extension } = await exportDataService.execute(
                user_id,
                tableName,
                columns as string[],
                format as 'xlsx' | 'csv',
                customColumnNames
            );

            res.setHeader('Content-Disposition', `attachment; filename=data_export.${extension}`);
            res.setHeader('Content-Type', mimeType);

            return res.send(buffer);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ExportDataController };