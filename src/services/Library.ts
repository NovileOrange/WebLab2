export class Library<T extends { id: number }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: number): void {
        this.items = this.items.filter((item) => item.id !== id);
    }

    find(id: number): T | undefined {
        return this.items.find((item) => item.id === id);
    }

    getAll(): T[] {
        return this.items;
    }

    setItems(items: T[]): void {
        this.items = items;
    }
}
