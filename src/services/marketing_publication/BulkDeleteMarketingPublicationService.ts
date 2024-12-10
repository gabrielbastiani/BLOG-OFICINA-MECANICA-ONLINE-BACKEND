import prismaClient from "../../prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import { RoleUser } from "@prisma/client";
import path from "path";

class BulkDeleteMarketingPublicationService {
    async execute(filePath: string, user_id: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json<{ Nome?: string }>(worksheet);

            const publicationToDelete = data
                .map(publication => publication.Nome)
                .filter(title => title !== undefined && title !== null);

            const publications = await prismaClient.marketingPublication.findMany({
                where: {
                    title: {
                        in: publicationToDelete
                    }
                }
            });

            const users_crate = await prismaClient.user.findUnique({
                where: {
                    id: user_id
                }
            });

            const users_superAdmins = await prismaClient.user.findMany({
                where: {
                    role: RoleUser.SUPER_ADMIN
                }
            });

            const all_user_ids = [
                ...users_superAdmins.map(user => user.id)
            ];

            const notificationsData = all_user_ids.map(user_id => ({
                user_id,
                message: `Publicação de marketing deletada(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "marketing"
            }));

            publications.forEach((publication) => {
                if (publication.image_url) {
                    const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + publication.image_url);
                    console.log(`Deleting image: ${imagePath}`);

                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete image for publication ${publication.id}: ${err.message}`);
                        } else {
                            console.log(`Image for marketingPublication ${publication.id} deleted successfully`);
                        }
                    });
                }
            });

            const delete_publications = await prismaClient.marketingPublication.deleteMany({
                where: {
                    title: { in: publicationToDelete },
                },
            });

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            return delete_publications;

        } finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
}

export { BulkDeleteMarketingPublicationService };