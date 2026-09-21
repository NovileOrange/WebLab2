export class Storage {
    static save<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as T;
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }
}
