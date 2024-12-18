import { StatusMarketingPublication } from '@prisma/client';
import prismaClient from '../../prisma';
import fs from 'fs';
import path from 'path';

interface PublicationProps {
    marketingPublication_id: string;
    title?: string;
    description?: string;
    image_url?: string;
    status?: string;
    redirect_url?: string;
    publish_at_start?: Date;
    publish_at_end?: Date;
    configurationMarketingOnPublication?: string[];
}

class MarketingUpdateDataService {
    async execute({
        marketingPublication_id,
        title,
        description,
        image_url,
        status,
        redirect_url,
        publish_at_start,
        publish_at_end,
        configurationMarketingOnPublication
    }: PublicationProps) {

        const marketingPublication = await prismaClient.marketingPublication.findUnique({
            where: { id: marketingPublication_id }
        });

        const dataToUpdate: any = {};

        if (title) {
            dataToUpdate.title = title;
        }

        if (description) {
            dataToUpdate.description = description;
        }

        if (image_url) {
            if (marketingPublication.image_url) {
                const imagePath = path.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + marketingPublication.image_url);
                console.log(`Deleting image: ${imagePath}`);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_url = image_url;
        }

        if (status) {
            dataToUpdate.status = status as StatusMarketingPublication;
        }

        if (redirect_url) {
            dataToUpdate.redirect_url = redirect_url;
        }

        if (publish_at_start) {
            dataToUpdate.publish_at_start = publish_at_start;
        }

        if (publish_at_end) {
            dataToUpdate.publish_at_end = publish_at_end;
        }

        if (configurationMarketingOnPublication) {
            // Deletar antigas
            await prismaClient.configurationMarketingOnPublication.deleteMany({
                where: { marketingPublication_id },
            });

            // Adicionar novas
            const configurationRelation = configurationMarketingOnPublication.map((configurationMarketingType_id) => ({
                marketingPublication_id,
                configurationMarketingType_id,
            }));

            await prismaClient.configurationMarketingOnPublication.createMany({
                data: configurationRelation,
            });
        }

        const update_publications = await prismaClient.marketingPublication.update({
            where: {
                id: marketingPublication_id
            },
            data: dataToUpdate
        });

        return update_publications;
    }
}

export { MarketingUpdateDataService };