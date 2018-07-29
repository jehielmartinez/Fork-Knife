import { MenuItem } from './menu-item.model';

export class Order {
    constructor(
        public orderId: number,
        public orderDate: Date,
        public waiter?: string,
        public tableNumber?: string,
        public orderList?: MenuItem,
        public subtotal?: number,
        public ISV?: number,
        public total?: number,

    ) { }
}
