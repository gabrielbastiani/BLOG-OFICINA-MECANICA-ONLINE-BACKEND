import prismaClient from "../../prisma";
import * as XLSX from 'xlsx';

class ExportDataService {
    async execute(user_id: string, tableName: string, columns: string[], format: 'xlsx' | 'csv', customColumnNames: { [key: string]: string }) {
        
        // Configura o filtro base e aplica condições específicas para a tabela "user"
        const filter = tableName === 'user'
            ? {
                role: { in: ["ADMIN", "EMPLOYEE"] },
                id: { not: user_id },
            }
            : {};

        const dataExport = await prismaClient[tableName].findMany({
            where: filter,
            select: columns.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
        });

        const formattedData = dataExport.map(item => {
            return columns.reduce((acc, col) => {
                acc[customColumnNames[col] || col] = item[col];
                return acc;
            }, {} as { [key: string]: any });
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
                message: "Planilha de dados exportada com sucesso.",
                type: "export_data",
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