import {expect, Page, test} from "@playwright/test";
import {_, addUser, Employee, fillAddUserWithTestData, resetDB} from "../test-utils";

test.describe("Employee Management", () => {
    test.describe("Add Employee", () => {
        test.beforeEach(async ({page}) => {
            await page.goto(_("add_employee"));
        });

        test("should add a new employee", async ({page}) => {
            // Given
            const user = await fillAddUserWithTestData(page);

            // When
            await page.locator("button").getByText("Add").click();
            await page.waitForURL(_("employees"));

            // Then
            expect(page.getByText(user.name)).toBeTruthy();
            expect(page.getByText(user.email)).toBeTruthy();
        });
        test.describe("should not add a new employee with invalid data",() => {
            test("should not add a new employee with invalid email", async ({page}) => {
                // Given
                const user = await fillAddUserWithTestData(page, { email: "a@c" });

                // When
                await page.locator("button").getByText("Add").click();

                // Then
                expect(page.locator("p").getByText(/Enter a valid email address./i)).toBeTruthy();
            });
            test("should not add a new employee with invalid zip code", async ({page}) => {
                test.fail();

                // Given
                const user = await fillAddUserWithTestData(page, { zipCode: "123" });

                // When
                await page.locator("button").getByText("Add").click();

                // Then
                expect(page.locator("p").getByText(/Enter a valid zip code./i)).toBeTruthy();
            });
            test("should not add a new employee with invalid hiring date", async ({page}) => {
                test.fail();

                // Given
                const user = await fillAddUserWithTestData(page, { hiringDate: "123" });

                // When
                await page.locator("button").getByText("Add").click();

                // Then
                await expect(page.locator('input[name="hiring_date"]')).toBeFocused();
            });
            test("should not add a new employee with empty data", async ({page}) => {
                // Given no user data
                const firstEmptyInput = page.locator("input").getByText("").nth(0)

                // When
                await page.locator("button").getByText("Add").click();

                // Then it should focus on the first empty input
                await expect(firstEmptyInput).toBeFocused();
            });
        });
    });

    test.describe("Edit Employee", () => {
        let defaultUser: Employee;
        let defaultUser2: Employee;

        test.beforeEach(async ({page}) => {
            // Reset DB
            await resetDB(page);

            // Add default users
            defaultUser = await addUser(page, { email: "test@gmail.com" });
            defaultUser2 = await addUser(page, { email: "test2@gmail.com" });
        });

        test.describe("Basic info", () => {
            test("Confirm that the employee has been updated", async ({page}) => {

            });
            test("Validate that the data shown on dialog is correct", async ({page}) => {

            });
            test("Should show an error if the email is an already existing one", async ({page}) => {
                test.fixme();

                // Given
                const alreadyExistingEmail = defaultUser.email;

                // When
                await page.locator("tr").nth(1).locator("a").getByText("Edit").click();
                await page.waitForURL(_("employee/**"));
                await page.locator("a").getByText(/Update basic info/i).click();
                await page.waitForURL(_("employee/**/basic_info"));
                await page.locator('input[name="email"]').fill(alreadyExistingEmail);
                await page.locator('button').getByText('Update').click();

                // Then
                await expect(page.locator("p").getByText("Email already exists")).toBeVisible({ timeout: 1000 });
            });
        });
        test.describe("Add to a team", () => {
            test("Confirm that the employee has been added to a team", async ({page}) => {

            });
            test("Should show the current team of the employee", async ({page}) => {
            });
        })
        test.describe("Delete an employee", () => {
            let defaultUser: Employee;
            let defaultUser2: Employee;

            test.beforeEach(async ({page}) => {
                // Reset DB
                await resetDB(page);

                // Add default users
                defaultUser = await addUser(page, { email: "test@gmail.com" });
                defaultUser2 = await addUser(page, { email: "test2@gmail.com" });

            });
            test("Confirm that the employee is correctly deleted", async ({page}) => {
                // Given
                test.fixme();
                // When
                await page.goto(_("employees"));
                await page.locator("tr").nth(1).locator("a").getByText(/Delete/i).click();
                await page.waitForURL(_("employee/delete/**"));
                await page.locator("button").getByText(/Proceed/i).click();

                // Then
                console.log(page.locator("tr"));
            });
            test("Validate that the team they was in is correctly updated", async ({page}) => {
                test.skip();
            });
        })
    });
});