import { OrderItem } from './OrderItem';

export class Order {
    public _id: string;
    public createdAt: Date;
    public items: OrderItem[];
    public total: number;

    constructor() { }
}
