import { IUser } from "./interfaces/IUser";

export class User implements IUser {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public borrowedBookIds: number[] = []
    ) {}
}
