import prismaClient from "../../prisma";
import * as XLSX from 'xlsx';

class ExportDataService {
    async execute(user_id: string, tableName: string, columns: string[], format: 'xlsx' | 'csv', customColumnNames: { [key: string]: string }) {
        const filter = tableName === 'user'
            ? {
                role: { in: ["ADMIN", "EMPLOYEE"] },
                id: { not: user_id },
            }
            : {};

        const includeRelations: Record<string, any> = {
            posts: {
                tags: { select: { tag: { select: { name: true } } } },
                categories: { select: { category: { select: { name: true } } } },
            },
        };

        const queryOptions: any = {
            where: filter,
            select: columns.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
            include: includeRelations[tableName] || undefined,
        };

        const dataExport = await prismaClient[tableName].findMany(queryOptions);

        const formattedData = dataExport.map(item => {
            const formattedItem = columns.reduce((acc, col) => {
                acc[customColumnNames[col] || col] = item[col];
                return acc;
            }, {} as { [key: string]: any });

            if (tableName === 'posts') {
                formattedItem['categories'] = item.categories?.map((cat: any) => cat.category.name_category).join(', ') || '';
                formattedItem['tags'] = item.tags?.map((tag: any) => tag.tag.tag_name).join(', ') || '';
            }

            return formattedItem;
        });

        console.log(formattedData)

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