import ExcelJS from "exceljs";
import prismaClient from "../../prisma";

interface PostsProps {
    user_id: string;
}

class GenerateExcelPostsService {
    async execute({ user_id }: PostsProps) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Posts");

        worksheet.columns = [
            { header: "Autor", key: "author", width: 80 },
            { header: "Titulo do post", key: "title", width: 80 },
            { header: "Texto do post", key: "text_post", width: 80 },
            { header: "Status", key: "status", width: 80 },
            { header: "Publicação programada", key: "publish_at", width: 80 },
            { header: "Tags do post", key: "tags", width: 80 },
            { header: "Categorias do post", key: "categories", width: 80 }
        ];

        const posts = [
            {
                author: "Aqui insira seu nome, ou algum nome de forma exata como esta no cadastro",
                title: "Como funciona um motor?",
                status: "Indisponivel",
                publish_at: "01/01/2033 01:00",
                categories: `6eac8901-8a2b-49a7-aea9-abfcde426e84, ca7e14db-b5bb-4d17-accf-62c059105b52`,
                tags: `273c1d02-03b3-4085-ac40-d9da142b9a00, ba95c0b0-7720-4aea-b3f2-0b392609e898`,
                text_post: `<p>Digite seu conte&uacute;do aqui...&nbsp;</p>
<p><img src="https://sumig.fbits.app/images/payment/mastercard.png"></p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor tempus purus, id ullamcorper libero aliquet non. Sed in nisl vitae urna congue auctor. Donec ut porttitor purus. Sed pretium justo ut diam maximus pellentesque. Suspendisse vitae euismod nibh. Maecenas aliquet in ante eget mollis. Nulla vitae diam vulputate, elementum risus non, imperdiet purus. Praesent eget libero volutpat magna venenatis condimentum. Nullam in rutrum ante. Ut egestas orci vel dolor venenatis, at aliquam odio ornare. Phasellus hendrerit, dolor eget venenatis tincidunt, risus nunc tempor enim, et dictum libero nunc sed nibh. Pellentesque lobortis hendrerit nunc, tempus posuere leo vulputate at. Quisque ut lacus at quam mattis accumsan. Proin eget sem non sem luctus sollicitudin eget sit amet metus.</p>
<p>Sed condimentum lectus a eros rutrum consequat. Proin tristique in ipsum ac tristique. Curabitur finibus magna nec orci gravida, sed finibus velit volutpat. Suspendisse ut lacinia dolor. Donec consequat dignissim efficitur. Mauris elementum purus sed fermentum accumsan. Sed tincidunt ligula justo, eu viverra orci fringilla eu. Duis accumsan blandit massa quis fringilla. Cras consequat nulla leo, non blandit libero molestie semper. Maecenas vehicula lobortis dui, in sagittis lacus pharetra a. Sed at semper elit. Quisque a lobortis risus, vel porttitor justo.</p>
<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis dignissim nunc nunc, at cursus purus rhoncus sed. Nunc a elit at libero mattis dapibus eget nec purus. Fusce a ipsum tristique, mattis elit nec, luctus leo. Phasellus luctus metus at metus pellentesque interdum. Nulla sed cursus nibh. Nulla consectetur facilisis elit, eu scelerisque leo maximus nec. Vestibulum quis iaculis leo. Sed ac vestibulum nunc. Sed ultricies consectetur massa, non commodo lorem porttitor a. Donec luctus, nisl vitae imperdiet viverra, ligula massa viverra justo, in rutrum metus arcu in elit. In volutpat euismod dui, a tincidunt massa rutrum nec.</p>`
            }
        ];

        posts.forEach((post) => {
            worksheet.addRow(post);
        });

        await prismaClient.notificationUser.create({
            data: {
                user_id: user_id,
                message: "Planilha de modelo de importação de posts gerada com suscesso",
                type: "post"
            }
        });

        return workbook;
    }
}

export { GenerateExcelPostsService };
