export class Item {
    constructor(
        public id: string,
        public title: string,
        public quantity?: number,
        public weight?: number,
        public insertion_date?: string,
        public best_before_date?: string) {

    }
}
export interface Note{
    id?:string
    title:string
    quantity?:number
    weight?:number
    insertion_date?:string
    best_before_date?:string
}

export default Item;