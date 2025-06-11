import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("filters metrics without losing the status announcement", async ({ page }) => { await page.goto("/"); await page.getByLabel("Route").selectOption("/checkout"); await expect(page.getByRole("status")).toContainText("2 observations"); });
test("dashboard has no automatically detectable accessibility violations", async ({ page }) => { await page.goto("/"); expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]); });
