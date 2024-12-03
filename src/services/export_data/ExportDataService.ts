import prismaClient from "../../prisma";
import * as XLSX from 'xlsx';

class ExportDataService {
    async execute(user_id: string, tableName: string, columns: string[], format: 'xlsx' | 'csv', customColumnNames: { [key: string]: string }) {
        try {
            const filter = tableName === 'user'
                ? {
                    role: { in: ["ADMIN", "EMPLOYEE"] },
                    id: { not: user_id },
                }
                : {};

            const queryOptions: any = {
                where: filter,
            };

            // Ajustando lógica de busca para a tabela 'comment'
            let dataExport: any[] = [];
            if (tableName === 'comment') {
                // Se o 'comment' estiver sendo exportado, inclui apenas as colunas necessárias
                dataExport = await prismaClient.comment.findMany({
                    include: {
                        post: { select: { title: true } },
                        userBlog: { select: { name: true } },
                        replies: { select: { comment: true } },
                    },
                });
            } else {
                // Se a tabela não for 'comment', inclui apenas as colunas selecionadas
                if (tableName === 'category') {
                    // Se o 'category' estiver sendo exportado, inclui apenas as colunas necessárias
                    dataExport = await prismaClient.category.findMany({
                        include: {
                            children: { select: { name_category: true } }
                        }
                    });

                }

                if (columns.length > 0) {
                    queryOptions.select = columns.reduce((acc, col) => ({ ...acc, [col]: true }), {});
                }
                dataExport = await prismaClient[tableName].findMany(queryOptions);
            }

            if (!dataExport || dataExport.length === 0) {
                throw new Error('Nenhum dado encontrado para exportação.');
            }

            const formattedData = await Promise.all(dataExport.map(async (item) => {
                const formattedItem: { [key: string]: any } = {};

                // Preencher apenas as colunas selecionadas
                columns.forEach((col) => {
                    formattedItem[customColumnNames[col] || col] = item[col];
                });

                if (tableName === 'comment') {
                    // Verificar se as colunas relacionadas a 'comment' estão selecionadas antes de adicionar
                    if (columns.includes('post')) {
                        formattedItem['Título do Post'] = item.post?.title || 'Sem Título';
                    }
                    if (columns.includes('userBlog')) {
                        formattedItem['Nome do Usuário'] = item.userBlog?.name || 'Sem Nome';
                    }
                    if (columns.includes('replies')) {
                        formattedItem['Respostas'] = item.replies.length > 0
                            ? item.replies.map((reply: { comment: any; }) => reply.comment).join(', ')
                            : 'Sem Respostas';
                    }
                }

                if (tableName === 'category') {
                    if (columns.includes('children')) {
                        formattedItem['Subcategorias'] = item.children.length > 0
                            ? item.children.map((child: {
                                name_category: any; children: any;
                            }) => child.name_category).join(', ')
                            : 'Sem Dados';

                    }
                }

                if (tableName === 'post' && item.categories && item.tags) {
                    const categoryIds = item.categories.map((cat: any) => cat.category_id);
                    const tagIds = item.tags.map((tag: any) => tag.tag_id);

                    const categories = await prismaClient.category.findMany({
                        where: { id: { in: categoryIds } },
                        select: { name_category: true }
                    });

                    const tags = await prismaClient.tag.findMany({
                        where: { id: { in: tagIds } },
                        select: { tag_name: true }
                    });

                    if (columns.includes('categories')) {
                        formattedItem['Categorias do post'] = categories.map((cat) => cat.name_category).join(', ') || 'Sem Categorias';
                    }
                    if (columns.includes('tags')) {
                        formattedItem['Tags do post'] = tags.map((tag) => tag.tag_name).join(', ') || 'Sem Tags';
                    }
                }

                return formattedItem;
            }));

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

        } catch (error) {
            console.error('Erro durante a exportação:', error);
            throw new Error(`Erro durante a exportação: ${error.message}`);
        }
    }
}

export { ExportDataService };