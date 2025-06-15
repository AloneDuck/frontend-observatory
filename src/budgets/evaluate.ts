import type { MetricName, MetricObservation } from "../domain/telemetry.js";

export type MetricBudgets = Record<MetricName, number>;
export interface BudgetResult { metric: MetricName; value: number; budget: number; status: "pass" | "fail" }

export function evaluateBudgets(observations: MetricObservation[], budgets: MetricBudgets): BudgetResult[] {
  return observations.map(({ name, value }) => ({ metric: name, value, budget: budgets[name], status: value <= budgets[name] ? "pass" : "fail" }));
}
