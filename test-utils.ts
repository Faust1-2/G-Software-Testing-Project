import {Page} from "@playwright/test";


export const baseURL= "https://g.hr.dmerej.info/";
export function _(path: string) {
    return baseURL + path;
}

export type Employee = {
    name: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    hiringDate: string;
    job: string;

};

export function getRandomString(length: number) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }
    return result;
}

export function getRandomEmail() {
    const username = getRandomString(8);
    const domain = getRandomString(5) + ".com";
    return `_${username}@_${domain}`;
}

// Function to fill form with a wrong email
export async function fillAddUserWithTestData(page: Page, testData: Partial<Employee>) {
    const idName = page.getByRole("textbox", {name: "name"});
    const idEmail = page.getByRole("textbox", {name: "email"});
    const idAddressLine1 = page.getByRole("textbox", {name: "address_line1"});
    const idAddressLine2 = page.getByRole("textbox", {name: "address_line2"});
    const idCity = page.getByRole("textbox", {name: "city"});
    const idZipCode = page.getByRole("textbox", {name: "zip_code"});
    const idHiringDate = page.getByRole("textbox", {name: "hiring_date"});
    const idJobTitle = page.getByRole("textbox", {name: "job_title"});

    const name = testData.name ?? getRandomString(10);
    const email = testData.email ?? getRandomEmail();
    const addressLine1 = testData.addressLine1 ?? getRandomString(15);
    const addressLine2 = testData.addressLine2 ?? getRandomString(10);
    const city = testData.city ?? getRandomString(8);
    const zipCode = testData.zipCode ?? String(Math.floor(Math.random() * 90000) + 10000);
    const hiringDate = testData.hiringDate ?? "2020-12-12";
    const job = testData.job ?? getRandomString(10);

    await idName.fill(name);
    await idEmail.fill(email);
    await idAddressLine1.fill(addressLine1);
    await idAddressLine2.fill(addressLine2);
    await idCity.fill(city);
    await idZipCode.fill(zipCode);
    await idHiringDate.fill(hiringDate);
    await idJobTitle.fill(job);

    return {
        name,
        email,
        addressLine1,
        addressLine2,
        city,
        zipCode,
        hiringDate,
        job
    }
}

export async function addUser(page: Page, testData: Partial<Employee>) {
    await page.goto(_("add_employee"));
    const user = await fillAddUserWithTestData(page, testData);
    await page.locator("button").getByText("Add").click();
    await page.waitForURL(_("employees"));
    return user;
}

export async function resetDB(page: Page) {
    await page.goto(_("reset_db"));
    await page.locator("button").getByText("Proceed").click();
    await page.waitForURL(_(""));
}
