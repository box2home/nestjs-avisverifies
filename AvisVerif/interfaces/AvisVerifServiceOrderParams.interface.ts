import { IAvisVerifServiceProductParams } from './AvisVerifServiceProductParams.interface';

export interface IAvisVerifServiceOrderParams {
    query: string;
    order_ref: number;
    email: string;
    order_date: string;
    firstname: string;
    lastname: string;
    type?: string;
    id_shop?: number;
    name_shop?: string;
    delay?: number;
    PRODUCTS: IAvisVerifServiceProductParams ;
}
