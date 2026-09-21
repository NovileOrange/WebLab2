import { IBook } from "./interfaces/IBook";

export class Book implements IBook {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public publicationYear: number,
        public isBorrowed: boolean = false
    ) {}
}
