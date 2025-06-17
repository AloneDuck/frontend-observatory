import { describe, expect, it } from "vitest";
import { evaluateBudgets } from "../src/budgets/evaluate.js";
import { summarize } from "../src/telemetry/summarize.js";
import type { MetricObservation } from "../src/domain/telemetry.js";

const metric = (value: number): MetricObservation => ({ name: "LCP", value, rating: "good", route: "/", release: "r1", observedAt: "2026-01-01T00:00:00Z" });
describe("release budgets", () => {
  it("fails values above the explicit route budget", () => expect(evaluateBudgets([metric(2600)], { LCP: 2500, INP: 200, CLS: .1, TTFB: 800 })[0]?.status).toBe("fail"));
  it("computes a deterministic nearest-rank p75", () => expect(summarize([metric(100), metric(200), metric(300), metric(400)])[0]?.p75).toBe(300));
});
