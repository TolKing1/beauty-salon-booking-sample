

// Test isValidEmail function
import {isValidEmail, isValidPassword} from "../util/validate";

describe("isValidEmail", () => {
    test("Valid email format", () => {
        expect(isValidEmail("test@example.com")).toBe(true);
    });
    test("Valid email format with subdomain", () => {
        expect(isValidEmail("user@sub.example.com")).toBe(true);
    });
    test("Invalid email format", () => {
        expect(isValidEmail("invalid_email")).toBe(false);
    });
    test("Valid email format with hyphen in domain", () => {
        expect(isValidEmail("user@example-domain.com")).toBe(true);
    });
    test("Valid email format with underscore in local part", () => {
        expect(isValidEmail("user_with_underscore@example.com")).toBe(true);
    });


    // Add more tests as needed
});

// Test isValidPassword function
describe("isValidPassword", () => {
    test("Valid password format", () => {
        expect(isValidPassword("Test1234")).toBe(true);
    });
    test("Valid password format with minimum length", () => {
        expect(isValidPassword("Absadsa2")).toBe(true);
    });
    test("Invalid password format without uppercase letters", () => {
        expect(isValidPassword("lowercase1234")).toBe(false);
    });

    test("Invalid password format without numeric characters", () => {
        expect(isValidPassword("NoNumbers")).toBe(false);
    });
    test("Invalid password format", () => {
        expect(isValidPassword("weakpassword")).toBe(false);
    });

    // Add more tests as needed
});
