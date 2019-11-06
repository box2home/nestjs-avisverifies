import { IAvisVerifServiceProductParams } from './avis-verif-service-product-params.interface';

export interface IAvisVerifServiceOrderParams {
    query: string;
    order_ref: string;
    email: string;
    order_date: string;
    firstname: string;
    lastname: string;
    type?: string;
    id_shop?: string;
    name_shop?: string;
    delay?: number;
    PRODUCTS: IAvisVerifServiceProductParams[];
}
