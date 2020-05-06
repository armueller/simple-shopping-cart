import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/Order';

@Pipe({
    name: 'orderItemCount'
})
export class OrderItemCountPipe implements PipeTransform {

    transform(order: Order): string {
        const itemCount = order.items.reduce((total, orderItem) => total + orderItem.qty, 0);
        return itemCount + ` item${(itemCount === 1) ? '' : 's'}`;
    }
}
