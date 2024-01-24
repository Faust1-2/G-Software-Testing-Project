import { test, expect, type Page } from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';
import { $ } from '../test-utils';

describe('Team management tests',  () => {
  describe('Create a team', () => {

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

  });

  describe('List all teams', () => {
    
  });

  describe('Delete a team', () => {

  });
});