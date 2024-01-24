import { test, expect, type Page } from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';
import { $ } from '../test-utils';

test.describe('Team management tests', () => {
  test.describe('Create a team', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto($('add_team'));
    })

    test('A team should be added', async ({ page }) => {
      const teamName = 'Newteam';
      const field = page.getByPlaceholder('Name');
      await field.fill(teamName);
      await field.press('Enter');

      await page.goto($('teams'));
      await page.waitForURL($('teams'));

      const texts = await page.getByRole('table').allInnerTexts();
      expect(texts[0]).toContain(teamName);
    });

    test('Should not allow a team to be created if the name is used', async ({ page }) => {
      const teamName = 'DuplicatedTeam'
      const first_add = page.getByPlaceholder('Name');
      await first_add.fill(teamName);
      await first_add.press('Enter')

      await page.goto($('add_team'));

      const second_add = page.getByPlaceholder('Name');
      await second_add.fill(teamName);
      await second_add.press('Enter')

      expect(page.url()).toBe('https://g.hr.dmerej.info/add_team');
      expect(await page.waitForSelector('.invalid-feedback')).toBeDefined();
    });
  });

  describe('Add employee to a team', () => {
    // const team = 'EmployeeTeam';
    // test.beforeEach(async ({ page }) => {
    //   await page.goto($('add_team'));
    //   const field = page.getByPlaceholder('Name');
    //   await field.fill(team);
    //   await field.press('Enter');
    //   await page.goto('employees');
    // })
  });

  test.describe('List all teams', () => {
    const teams = ['team1', 'team2', 'team3'];

    test.beforeEach(async ({ page }) => {
      for (const team of teams) {
        await page.goto($('add_team'));
        const field = page.getByPlaceholder('Name');
        await field.fill(team);
        await field.press('Enter');
      };
      await page.goto($('teams'));
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
      await page.goto($('add_team'));
      const field = page.getByPlaceholder('Name');
      await field.fill(team);
      await field.press('Enter');
      await page.goto($('teams'));
    });

    test('It should delete the seletected team', async ({ page }) => {
      const locator = page.locator('tr', { hasText: team }).locator('.btn');
      await locator.click();
      await page.getByRole('button').click();
      expect((await page.getByRole('table').allInnerTexts())[0]).not.toContain(team);
    });
  });
});