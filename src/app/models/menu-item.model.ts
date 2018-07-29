export class MenuItem {
    constructor(
        public id: number,
        public category: string,
        public title: string,
        public description: string,
        public price: number,
        public imageUrl?: string,
        public howMany?: number

    ) {}

}
