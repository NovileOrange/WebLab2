import { expect } from "chai";
import { Validators } from "../src/utils/validators";

describe("Validators", () => {
    describe("isRequired", () => {
        it("should return true for non-empty value", () => {
            expect(Validators.isRequired("The Hobbit")).to.be.true;
        });

        it("should return false for empty value", () => {
            expect(Validators.isRequired("")).to.be.false;
        });

        it("should return false for spaces", () => {
            expect(Validators.isRequired("   ")).to.be.false;
        });
    });

    describe("isValidId", () => {
        it("should accept digits", () => {
            expect(Validators.isValidId("123")).to.be.true;
        });

        it("should reject letters", () => {
            expect(Validators.isValidId("abc")).to.be.false;
        });

        it("should reject mixed value", () => {
            expect(Validators.isValidId("12abc")).to.be.false;
        });
    });

    describe("isValidYear", () => {
        it("should accept valid year", () => {
            expect(Validators.isValidYear("1937")).to.be.true;
        });

        it("should reject letters", () => {
            expect(Validators.isValidYear("year")).to.be.false;
        });

        it("should reject future year", () => {
            expect(Validators.isValidYear("9999")).to.be.false;
        });
    });
});
