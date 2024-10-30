import { Request, Response } from 'express';
import { ExportDataService } from '../../services/export_data/ExportDataService';

class ExportDataController {
    async handle(req: Request, res: Response) {
        const { tableName, columns, format, customColumnNames } = req.body;

        // Valida se columns é um array de strings
        if (!Array.isArray(columns) || columns.some(col => typeof col !== 'string')) {
            return res.status(400).json({ error: "Parâmetro columns deve ser um array de strings" });
        }

        // Valida se customColumnNames é um objeto
        if (typeof customColumnNames !== 'object' || customColumnNames === null) {
            return res.status(400).json({ error: "Parâmetro customColumnNames deve ser um objeto" });
        }

        const exportDataService = new ExportDataService();

        try {
            const { buffer, mimeType, extension } = await exportDataService.execute(
                tableName,
                columns as string[],
                format as 'xlsx' | 'csv',
                customColumnNames
            );

            // Configura os cabeçalhos para download do arquivo
            res.setHeader('Content-Disposition', `attachment; filename=data_export.${extension}`);
            res.setHeader('Content-Type', mimeType);

            // Envia o buffer do arquivo como resposta
            return res.send(buffer);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ExportDataController };