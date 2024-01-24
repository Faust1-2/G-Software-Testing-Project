import { test, expect } from '@playwright/test';
import {  describe } from 'node:test';
import { Employee, _, addUser } from '../test-utils';
import dayjs from 'dayjs';

test.describe('Team management tests', () => {
  test.describe('Create a team', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(_('add_team'));
    })

    test('A team should be added', async ({ page }) => {
      const teamName = 'Newteam';
      const field = page.getByPlaceholder('Name');
      await field.fill(teamName);
      await field.press('Enter');

      await page.goto(_('teams'));
      await page.waitForURL(_('teams'));

      const texts = await page.getByRole('table').allInnerTexts();
      expect(texts[0]).toContain(teamName);
    });

    test('Should not allow a team to be created if the name is used', async ({ page }) => {
      const teamName = 'DuplicatedTeam'
      const first_add = page.getByPlaceholder('Name');
      await first_add.fill(teamName);
      await first_add.press('Enter')

      await page.goto(_('add_team'));

      const second_add = page.getByPlaceholder('Name');
      await second_add.fill(teamName);
      await second_add.press('Enter')

      expect(page.url()).toBe('https://g.hr.dmerej.info/add_team');
      expect(await page.waitForSelector('.invalid-feedback')).toBeDefined();
    });
  });

  test.describe('Add employee to a team', () => {
    const team = 'EmployeeTeam';
    const employeeData: Employee = {
      name: 'Employee in a team',
      email: 'emp.in@a.team',
      addressLine1: 'company',
      addressLine2: 'building',
      city: 'company city',
      hiringDate: dayjs().toString(),
      job: 'Being an employee (in a team)',
      zipCode: '42150'
    }

    test.beforeEach(async ({ page }) => {
      await addUser(page, employeeData);
      await page.goto(_('add_team'));
      const field = page.getByPlaceholder('Name');
      await field.fill(team);
      await field.press('Enter');
      await page.goto('employees');
    });

    test('it should add an employee to a team', async({ page }) => {
      const locator = page.locator('tr', { hasText: employeeData.name }).locator('.btn', { hasText: 'Edit'});
      console.log(await locator.innerHTML());
    });
  });

  test.describe('List all teams', () => {
    const teams = ['team1', 'team2', 'team3'];

    test.beforeEach(async ({ page }) => {
      for (const team of teams) {
        await page.goto(_('add_team'));
        const field = page.getByPlaceholder('Name');
        await field.fill(team);
        await field.press('Enter');
      };
      await page.goto(_('teams'));
    });

    test('It should list all teams', async ({ page }) => {
      const texts = await page.getByRole('table').allInnerTexts();

      for (const team of teams) {
        expect(texts[0]).toContain(team);
      }
    });
  });

  describe('Delete a team', () => {
    const team = 'teamToDelete';

    test.beforeEach(async ({ page }) => {
      await page.goto(_('add_team'));
      const field = page.getByPlaceholder('Name');
      await field.fill(team);
      await field.press('Enter');
      await page.goto(_('teams'));
    });

    test('It should delete the seletected team', async ({ page }) => {
      const locator = page.locator('tr', { hasText: team }).locator('.btn');
      await locator.click();
      await page.getByRole('button').click();
      expect((await page.getByRole('table').allInnerTexts())[0]).not.toContain(team);
    });
  });
});