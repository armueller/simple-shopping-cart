import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../models/OrderItem';

@Pipe({
    name: 'orderTotal'
})
export class OrderTotalPipe implements PipeTransform {

    transform(value: OrderItem[]): unknown {
        return value.reduce((total, item) => total + (item.product.price * item.qty), 0);
    }
}
