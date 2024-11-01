import prismaClient from "../../prisma";
import * as XLSX from 'xlsx';

class ExportDataService {
    async execute(user_id: string, tableName: string, columns: string[], format: 'xlsx' | 'csv', customColumnNames: { [key: string]: string }) {

        const dataExport = await prismaClient[tableName].findMany({
            select: columns.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
        });

        // Substitui os nomes das colunas pelos personalizados
        const formattedData = dataExport.map(item => {
            return columns.reduce((acc, col) => {
                acc[customColumnNames[col] || col] = item[col];
                return acc;
            }, {});
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        const buffer = format === 'xlsx' 
            ? XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
            : XLSX.write(workbook, { bookType: 'csv', type: 'buffer' });
    
            await prismaClient.notificationUser.create({
                data: {
                    user_id: user_id,
                    message: "Planilha de dados dos formularios de contato exportados com sucesso.",
                    type: "export_data"
                }
            });

        return {
            buffer,
            mimeType: format === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv',
            extension: format,
        };
    }
}

export { ExportDataService };