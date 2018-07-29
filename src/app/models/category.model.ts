import {MenuItem} from './menu-item.model';

export class Category {
    constructor(
        public categoryName: string,
        public menu: MenuItem[]
    ) { }
}
