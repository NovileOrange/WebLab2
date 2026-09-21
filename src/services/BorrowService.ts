import { Book } from "../models/Book";
import { User } from "../models/User";

export class BorrowService {
    static borrowBook(book: Book, user: User): boolean {
        if (book.isBorrowed) {
            return false;
        }

        if (user.borrowedBookIds.length >= 3) {
            return false;
        }

        book.isBorrowed = true;
        user.borrowedBookIds.push(book.id);

        return true;
    }

    static returnBook(book: Book, user: User): boolean {
        if (!book.isBorrowed) {
            return false;
        }

        if (!user.borrowedBookIds.includes(book.id)) {
            return false;
        }

        book.isBorrowed = false;

        user.borrowedBookIds = user.borrowedBookIds.filter(
            (id) => id !== book.id
        );

        return true;
    }
}
