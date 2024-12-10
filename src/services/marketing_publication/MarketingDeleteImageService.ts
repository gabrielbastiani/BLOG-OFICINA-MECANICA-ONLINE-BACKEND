import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';

interface PublicationProps {
    marketingPublication_id: string;
}

class MarketingDeleteImageService {
    async execute({ marketingPublication_id }: PublicationProps) {

        const image_publication = await prismaClient.marketingPublication.findUnique({
            where: {
                id: marketingPublication_id
            }
        });

        const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + image_publication.image_url);
        console.log(`Deleting image: ${imagePath}`);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            } else {
                console.log('Old image deleted successfully');
            }
        });

        const marketingPublication = await prismaClient.marketingPublication.update({
            where: {
                id: marketingPublication_id
            },
            data: {
                image_url: ""
            }
        });

        return marketingPublication;

    }
}

export { MarketingDeleteImageService }