import prismaClient from "../../prisma";
import * as xlsx from 'xlsx';
import { readFileSync } from 'fs';

class BulkDeleteUsersService {
    async execute(fileBuffer: Buffer) {
        try {
            // Lê o arquivo da planilha com o buffer
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

            // Acessa a primeira planilha
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Converte os dados da planilha para um formato utilizável
            const data = xlsx.utils.sheet_to_json(sheet);

            if (!data || data.length === 0) {
                throw new Error('Planilha vazia ou dados não encontrados.');
            }

            // Assumindo que a coluna de identificadores seja 'email' ou 'id'
            const ids = data.map((row: any) => row.email || row.id).filter(Boolean);
            if (ids.length === 0) {
                throw new Error('Nenhum identificador encontrado na planilha.');
            }

            // Realize a exclusão no banco de dados usando os IDs
            const result = await prismaClient.user.deleteMany({
                where: {
                    email: { in: ids }  // ou 'id' se for baseado em ID
                }
            });

            return result;
        } catch (error) {
            console.error('Erro ao processar o arquivo e deletar usuários:', error);
            throw new Error('Erro ao processar o arquivo e deletar usuários.');
        }
    }
}

export { BulkDeleteUsersService };