import {test} from "@playwright/test";
import {$} from "../test-utils";

test.describe("Employee Management", () => {
    test.beforeEach(async ({page}) => {
        await page.goto($("add_employee"));
    });

    test.describe("Add Employee", () => {
        test("should add a new employee", async ({page}) => {
        });
        test("should not add a new employee with invalid data", async ({page}) => {

        });
        test("should not add a new employee with empty data", async ({page}) => {

        });
    });

    test.describe("Edit Employee", () => {

    });
});

