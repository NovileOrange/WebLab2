export namespace Validators {
    export function isRequired(value: string): boolean {
        return value.trim().length > 0;
    }

    export function isValidId(value: string): boolean {
        return /^\d+$/.test(value);
    }

    export function isValidYear(value: string): boolean {
        if (!/^\d{4}$/.test(value)) {
            return false;
        }

        const year = Number(value);
        const currentYear = new Date().getFullYear();

        return year >= 1000 && year <= currentYear;
    }
}
