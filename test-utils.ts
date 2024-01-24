import {Page} from "@playwright/test";

export const baseURL= "https://g.hr.dmerej.info/";
export function $(path: string) {
    return baseURL + path;
}


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
    return `${username}@${domain}`;
}

// Function to fill form fields with random values
export function fillForm(page: Page) {
    const idName = document.getElementById("id_name") as HTMLInputElement;
    const idEmail = document.getElementById("id_email") as HTMLInputElement;
    const idAddressLine1 = document.getElementById("id_address_line1") as HTMLInputElement;
    const idAddressLine2 = document.getElementById("id_address_line2") as HTMLInputElement;
    const idCity = document.getElementById("id_city") as HTMLInputElement;
    const idZipCode = document.getElementById("id_zip_code") as HTMLInputElement;
    const idHiringDate = document.getElementById("id_hiring_date") as HTMLInputElement;
    const idJobTitle = document.getElementById("id_job_title") as HTMLInputElement;
    idName.value = getRandomString(10);
    idEmail.value = getRandomEmail();
    idAddressLine1.value = getRandomString(15);
    idAddressLine2.value = getRandomString(10);
    idCity.value = getRandomString(8);
    idZipCode.value = String(Math.floor(Math.random() * 90000) + 10000); // 5-digit zip code
    idHiringDate.valueAsDate = new Date(); // Set hiring date to today
    idJobTitle.value = getRandomString(10);
}