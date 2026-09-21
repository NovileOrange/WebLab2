import { expect } from "chai";
import { Library } from "../src/services/Library";

interface TestItem {
    id: number;
    name: string;
}

describe("Library", () => {
    let library: Library<TestItem>;

    beforeEach(() => {
        library = new Library<TestItem>();
    });

    it("should add an item", () => {
        const item: TestItem = {
            id: 1,
            name: "Book"
        };

        library.add(item);

        expect(library.getAll()).to.have.lengthOf(1);
        expect(library.find(1)).to.equal(item);
    });

    it("should find an item by id", () => {
        const item: TestItem = {
            id: 1,
            name: "Book"
        };

        library.add(item);

        const result = library.find(1);

        expect(result).to.equal(item);
    });

    it("should return undefined if item is not found", () => {
        const result = library.find(999);

        expect(result).to.be.undefined;
    });

    it("should remove an item", () => {
        const item: TestItem = {
            id: 1,
            name: "Book"
        };

        library.add(item);
        library.remove(1);

        expect(library.getAll()).to.have.lengthOf(0);
        expect(library.find(1)).to.be.undefined;
    });
});
