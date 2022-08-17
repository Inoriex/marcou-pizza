export declare class CreateOrderDto {
    articles: {
        articleId: string;
        quantity: number;
        taille: string;
        totalArticlePrice: number;
    }[];
    totalTTC: number;
    payment: string;
    client: string;
}
